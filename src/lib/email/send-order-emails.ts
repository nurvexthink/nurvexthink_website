import "server-only";

import { sendEmail, getEmailConfig } from "./client";
import { getLeadRecipients } from "./recipients";
import { renderTeamAlertEmail, renderCustomerReplyEmail, type OrderEmailData } from "./templates";

/**
 * Fires the two order emails: an alert to the team and a confirmation to the
 * customer.
 *
 * This is called from `after()` in the order action, so it runs AFTER the
 * customer already saw "thanks, we got it". Two consequences, both deliberate:
 *   1. It must never throw — a crash here would surface as an unhandled rejection.
 *   2. A failure must be swallowed and logged, never shown to the user. The lead
 *      is already safely in the database; a bounced notification email is a
 *      problem for us to notice in logs, not the customer's problem.
 *
 * Every send is independent — one failing must not stop the others — so they run
 * concurrently and each result is logged on its own.
 *
 * PRIVACY: the team alert is sent to each recipient in a SEPARATE email, so a
 * recipient's `To` field only ever contains their own address. No one sees who
 * else was notified. (This is why we don't put the whole list in one To, and why
 * we don't rely on BCC-header stripping behaviour.)
 */
export async function sendOrderEmails(order: OrderEmailData): Promise<void> {
  // If email isn't configured (e.g. local dev without the key), do nothing
  // rather than log a scary error for every submission.
  const config = getEmailConfig();
  if (!config) return;

  const teamAlert = renderTeamAlertEmail(order);
  const customerReply = renderCustomerReplyEmail(order);

  // Admin-editable list, falling back to EMAIL_TO. Internal recipients only.
  const teamRecipients = await getLeadRecipients(config.to);

  const jobs: { label: string; run: () => Promise<{ ok: boolean; error?: string }> }[] = [
    // One private copy per team member.
    ...teamRecipients.map((recipient) => ({
      label: `team alert -> ${recipient}`,
      run: () =>
        sendEmail({
          to: recipient,
          subject: teamAlert.subject,
          html: teamAlert.html,
          text: teamAlert.text,
          // Let the team hit reply and reach the customer directly.
          replyTo: order.email,
        }),
    })),
    // The customer's own confirmation.
    {
      label: "customer reply",
      run: () =>
        sendEmail({
          to: order.email,
          subject: customerReply.subject,
          html: customerReply.html,
          text: customerReply.text,
        }),
    },
  ];

  const results = await Promise.allSettled(jobs.map((job) => job.run()));
  results.forEach((result, i) => {
    const failed = result.status === "rejected" || !result.value.ok;
    if (!failed) return;
    const reason =
      result.status === "rejected" ? String(result.reason) : (result.value.error ?? "unknown");
    console.error(`[email] ${jobs[i].label} failed:`, reason);
  });
}

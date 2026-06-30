"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type OrderState =
  { status: "idle" } | { status: "success" } | { status: "error"; message: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  // Honeypot: bots fill hidden fields. Pretend success without saving.
  if (field(formData, "website")) {
    return { status: "success" };
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const details = field(formData, "details");
  const company = field(formData, "company") || null;
  const projectType = field(formData, "projectType") || null;
  const budget = field(formData, "budget") || null;

  if (!name || name.length > 200) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!details || details.length > 5000) {
    return { status: "error", message: "Please tell us a little about what you want to build." };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("orders")
      .insert({ name, email, details, company, project_type: projectType, budget });

    if (error) {
      return {
        status: "error",
        message: "We couldn't save your request just now. Please email us instead.",
      };
    }
    return { status: "success" };
  } catch {
    // Thrown when Supabase env vars aren't set yet (pre-launch of the backend).
    return {
      status: "error",
      message: "Submissions aren't connected yet — please email us directly for now.",
    };
  }
}

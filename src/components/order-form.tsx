"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

const labelClass = "flex flex-col gap-1.5 text-sm font-medium";

export function OrderForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "—"}`,
      `Project type: ${data.get("projectType")}`,
      `Budget: ${data.get("budget")}`,
      "",
      `${data.get("details")}`,
    ].join("\n");
    const subject = encodeURIComponent(`Project inquiry — ${data.get("name")}`);
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border-border bg-card flex flex-col items-start gap-3 rounded-2xl border p-8">
        <h3 className="font-heading text-xl font-semibold tracking-tight">Your email is ready</h3>
        <p className="text-muted-foreground text-sm">
          We opened your email app with the details pre-filled — just hit send and we&apos;ll reply
          within a business day. Prefer to write directly? Reach us at{" "}
          <a className="text-primary hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-primary mt-1 text-sm font-medium hover:underline"
        >
          Edit the form again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-card flex flex-col gap-5 rounded-2xl border p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input name="name" required placeholder="Your name" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Company <span className="text-muted-foreground font-normal">(optional)</span>
        <input name="company" placeholder="Company or project name" className={fieldClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Project type
          <select name="projectType" defaultValue="Web app" className={fieldClass}>
            <option>Web app</option>
            <option>Mobile app</option>
            <option>AI feature</option>
            <option>Internal tool</option>
            <option>Something else</option>
          </select>
        </label>
        <label className={labelClass}>
          Budget
          <select name="budget" defaultValue="Not sure yet" className={fieldClass}>
            <option>Not sure yet</option>
            <option>Under $5k</option>
            <option>$5k – $15k</option>
            <option>$15k – $40k</option>
            <option>$40k+</option>
          </select>
        </label>
      </div>

      <label className={labelClass}>
        What do you want to build?
        <textarea
          name="details"
          required
          rows={5}
          placeholder="A sentence or two about the problem, who it's for, and any deadline."
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      <button
        type="submit"
        className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}
      >
        Send project details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

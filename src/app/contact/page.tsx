import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GitBranch, Mail, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { faqs, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
};

const methods = [
  {
    icon: Mail,
    title: "Email us",
    description: "The fastest way to reach the team. We reply within a business day.",
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: GitBranch,
    title: "GitHub",
    description: "See what we build in the open and follow along.",
    label: "github.com/nurvexthink",
    href: "https://github.com/nurvexthink",
  },
  {
    icon: Rocket,
    title: "Start a project",
    description: "Have something specific in mind? Send us the details.",
    label: "Open the project form",
    href: "/order",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-border relative overflow-hidden border-b">
        <div aria-hidden className="bg-grid mask-fade-y absolute inset-0" />
        <div aria-hidden className="bg-glow absolute inset-x-0 top-0 h-72" />
        <Container className="relative py-20 sm:py-24">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s talk.
            </h1>
            <p className="text-muted-foreground text-lg text-pretty">
              Questions, ideas, or a project to build — we&apos;d love to hear from you. Pick
              whatever&apos;s easiest.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-4 md:grid-cols-3">
          {methods.map((m) => {
            const Icon = m.icon;
            const external = m.href.startsWith("http");
            return (
              <Link
                key={m.title}
                href={m.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group border-border bg-card hover:border-primary/40 flex flex-col gap-4 rounded-2xl border p-6 transition-colors"
              >
                <span className="bg-primary/10 text-primary inline-flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-heading text-lg font-semibold tracking-tight">{m.title}</h2>
                  <p className="text-muted-foreground text-sm">{m.description}</p>
                </div>
                <span className="text-primary mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium">
                  {m.label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </Container>
      </section>

      <section className="border-border border-t py-16 sm:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Common questions"
            className="max-w-xl"
          />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="flex flex-col gap-2">
                <h3 className="font-heading text-base font-semibold tracking-tight">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

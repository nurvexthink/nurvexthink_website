import { Code2, Cpu, Database, Rocket, Sparkles, Workflow, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Workflow,
  Code2,
  Sparkles,
  Database,
  Cpu,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}

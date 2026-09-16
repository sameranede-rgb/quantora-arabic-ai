import { Link } from "@tanstack/react-router";

import { ToolIcon } from "@/components/tool-icon";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={tool.to}
      className="group flex flex-col gap-3 rounded-3xl border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40"
    >
      <ToolIcon name={tool.icon} tone={tool.tone} />
      <span className="font-display text-lg font-bold">{tool.title}</span>
      <span className="text-sm text-muted-foreground">{tool.description}</span>
    </Link>
  );
}

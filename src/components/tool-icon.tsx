import {
  Bot,
  Calculator,
  CalendarDays,
  Coins,
  Gift,
  Globe,
  Percent,
  Plane,
  Ruler,
  Sparkle,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ToolTone } from "@/data/tools";

const icons: Record<string, LucideIcon> = {
  calculator: Calculator,
  coins: Coins,
  globe: Globe,
  bot: Bot,
  ruler: Ruler,
  "calendar-days": CalendarDays,
  plane: Plane,
  percent: Percent,
  gift: Gift,
  target: Target,
  zap: Zap,
  sparkle: Sparkle,
};

const tones: Record<ToolTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
};

export function ToolIcon({
  name,
  tone = "primary",
  className,
}: {
  name: string;
  tone?: ToolTone;
  className?: string;
}) {
  const Icon = icons[name] ?? Sparkle;
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-2xl",
        tones[tone],
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

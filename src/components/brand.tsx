import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  size = "md",
  asLink = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}) {
  const imgSize = size === "lg" ? "size-12" : size === "sm" ? "size-7" : "size-9";
  const textSize =
    size === "lg" ? "text-4xl md:text-5xl" : size === "sm" ? "text-base" : "text-xl";

  const content = (
    <span className={cn("flex items-center gap-2 font-bold", className)}>
      <img src={logo} alt="شعار Quantora" className={imgSize} width={64} height={64} />
      <span className={cn("font-display tracking-tight", textSize)}>Quantora</span>
    </span>
  );

  if (!asLink) return content;
  return <Link to="/">{content}</Link>;
}

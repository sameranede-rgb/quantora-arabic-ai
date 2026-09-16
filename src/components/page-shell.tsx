import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageShell({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-6xl px-4 py-10", className)}>
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
        {description ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

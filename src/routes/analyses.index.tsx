import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { analyses } from "@/data/analyses";

export const Route = createFileRoute("/analyses/")({
  head: () => ({
    meta: [
      { title: "تحليلاتي المحفوظة — Quantora" },
      {
        name: "description",
        content: "راجع حساباتك ومقارناتك المحفوظة في Quantora وافتح تفاصيل كل تحليل.",
      },
      { property: "og:title", content: "تحليلاتي المحفوظة — Quantora" },
      { property: "og:description", content: "كل حساباتك ومقارناتك في مكان واحد." },
    ],
  }),
  component: AnalysesPage,
});

function AnalysesPage() {
  return (
    <PageShell title="تحليلاتي المحفوظة" description="كل ما حسبته وحفظته في Quantora.">
      <div className="mx-auto max-w-3xl space-y-3">
        {analyses.map((analysis) => (
          <Link
            key={analysis.id}
            to="/analyses/$id"
            params={{ id: analysis.id }}
            className="flex items-center gap-4 rounded-3xl border bg-card p-4 shadow-card transition-colors hover:border-primary/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-2xl">
              {analysis.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{analysis.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {analysis.tool} — {analysis.savedAt}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-primary">
              {analysis.total.toLocaleString("ar-EG")} {analysis.currency}
            </span>
            <ChevronLeft className="size-5 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toolCategories, tools } from "@/data/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "جميع الأدوات — Quantora" },
      {
        name: "description",
        content: "استخدم أدوات Quantora المجانية للحساب والتحويل وتحليل الأسعار بسرعة وسهولة.",
      },
      { property: "og:title", content: "جميع الأدوات — Quantora" },
      {
        property: "og:description",
        content: "حاسبة، عملات، وحدات، تاريخ ووقت، أسعار عالمية ومساعد ذكي.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("كل الفئات");

  const filtered = useMemo(
    () =>
      tools.filter((tool) => {
        const matchesCategory = category === "كل الفئات" || tool.category === category;
        const matchesQuery =
          !query.trim() ||
          tool.title.includes(query.trim()) ||
          tool.description.includes(query.trim());
        return matchesCategory && matchesQuery;
      }),
    [query, category],
  );

  return (
    <PageShell
      title="جميع الأدوات"
      description="استخدم أدوات Quantora المجانية لحسابات وتحويلات دقيقة، وتصفّح ما تحتاجه بسرعة."
    >
      <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border bg-card p-2 shadow-card">
        <Search className="ms-3 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن أداة…"
          className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {toolCategories.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={category === item ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          لا توجد أدوات مطابقة لبحثك.
        </p>
      ) : null}
    </PageShell>
  );
}

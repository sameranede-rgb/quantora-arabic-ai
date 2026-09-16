import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productCategories, products } from "@/data/products";

export const Route = createFileRoute("/prices/")({
  head: () => ({
    meta: [
      { title: "الأسعار العالمية — Quantora" },
      {
        name: "description",
        content: "اعرف أسعار المنتجات في دول العالم وقارن أين يكون السعر الأرخص.",
      },
      { property: "og:title", content: "الأسعار العالمية — Quantora" },
      { property: "og:description", content: "مقارنة أسعار المنتجات بين الدول بلمسة واحدة." },
    ],
  }),
  component: PricesPage,
});

function PricesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("كل الفئات");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const byCategory = category === "كل الفئات" || product.category === category;
        const byQuery =
          !query.trim() || product.name.toLowerCase().includes(query.trim().toLowerCase());
        return byCategory && byQuery;
      }),
    [query, category],
  );

  return (
    <PageShell
      title="الأسعار العالمية"
      description="اعرف أسعار المنتجات في جميع دول العالم واختر أفضل مكان للشراء."
    >
      <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border bg-card p-2 shadow-card">
        <Search className="ms-3 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن منتج…"
          className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {productCategories.map((item) => (
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

      <div className="mt-8 space-y-4">
        {filtered.map((product) => {
          const cheapest = product.prices.reduce((min, p) => (p.price < min.price ? p : min));
          return (
            <Link
              key={product.id}
              to="/prices/$id"
              params={{ id: product.id }}
              className="flex items-center gap-4 rounded-3xl border bg-card p-4 shadow-card transition-colors hover:border-primary/40"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-muted text-3xl">
                {product.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold">{product.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  يبدأ من ${cheapest.price.toLocaleString("en-US")} — {cheapest.flag}{" "}
                  {cheapest.country}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {product.prices.slice(0, 4).map((price) => (
                    <span key={price.country} className="rounded-full bg-muted px-2 py-1">
                      {price.flag} ${price.price}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronLeft className="size-5 shrink-0 text-muted-foreground" />
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p>
      ) : null}
    </PageShell>
  );
}

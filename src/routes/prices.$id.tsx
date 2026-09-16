import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/prices/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "المنتج غير متوفر — Quantora" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.product.name} — الأسعار العالمية | Quantora`;
    const description = `أسعار ${loaderData.product.name} في مختلف الدول وأين تجده بأرخص سعر.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <PageShell title="المنتج غير موجود" description="ربما تم حذف هذا المنتج أو تغيّر رابطه.">
      <div className="text-center">
        <Button asChild className="rounded-full">
          <Link to="/prices">العودة إلى الأسعار العالمية</Link>
        </Button>
      </div>
    </PageShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cheapest = product.prices.reduce((min, p) => (p.price < min.price ? p : min));

  return (
    <PageShell title={product.name} description={`آخر تحديث: ${product.updatedAt}`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card p-6 text-center shadow-card">
          <span className="flex size-28 items-center justify-center rounded-3xl bg-muted text-6xl">
            {product.emoji}
          </span>
          <p className="font-display text-3xl font-bold text-primary">
            ${product.basePrice.toLocaleString("en-US")}
          </p>
          <p className="text-sm text-muted-foreground">
            أرخص سعر: {cheapest.flag} {cheapest.country} — {cheapest.localPrice}
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-bold">الأسعار حسب الدولة</h2>
          <ul className="mt-4 space-y-2">
            {product.prices.map((price) => (
              <li
                key={price.country}
                className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{price.flag}</span>
                  {price.country}
                </span>
                <span className="text-end">
                  <span className="block font-semibold">{price.localPrice}</span>
                  <span className="text-xs text-muted-foreground">
                    ≈ ${price.price.toLocaleString("en-US")}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/prices">
              <ArrowRight className="size-4" />
              كل المنتجات
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/ai" search={{ q: `قارن أسعار ${product.name} بين الدول` }}>
              اسأل المساعد عن هذا المنتج
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}

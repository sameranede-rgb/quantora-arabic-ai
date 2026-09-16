import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/tools/percentage")({
  head: () => ({
    meta: [
      { title: "حاسبة النِسب والخصومات — Quantora" },
      { name: "description", content: "احسب الخصم والضريبة والسعر النهائي ونسبة التغيير بسهولة." },
      { property: "og:title", content: "حاسبة النِسب والخصومات — Quantora" },
      { property: "og:description", content: "خصومات وضرائب ونِسب تغيير بنتيجة فورية." },
    ],
  }),
  component: PercentagePage,
});

function PercentagePage() {
  const [price, setPrice] = useState("500");
  const [discount, setDiscount] = useState("20");
  const [tax, setTax] = useState("15");

  const p = Number(price) || 0;
  const d = Number(discount) || 0;
  const t = Number(tax) || 0;

  const discountValue = (p * d) / 100;
  const afterDiscount = p - discountValue;
  const taxValue = (afterDiscount * t) / 100;
  const total = afterDiscount + taxValue;

  const fmt = (value: number) => value.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <PageShell title="حاسبة النِسب والخصومات" description="أدخل السعر ونسبة الخصم والضريبة.">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">الخصم %</Label>
            <Input
              id="discount"
              inputMode="decimal"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax">الضريبة %</Label>
            <Input
              id="tax"
              inputMode="decimal"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm">
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>قيمة الخصم</span>
            <span className="font-semibold">{fmt(discountValue)}</span>
          </li>
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>السعر بعد الخصم</span>
            <span className="font-semibold">{fmt(afterDiscount)}</span>
          </li>
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>قيمة الضريبة</span>
            <span className="font-semibold">{fmt(taxValue)}</span>
          </li>
        </ul>

        <div className="mt-5 rounded-2xl bg-primary-soft p-5 text-center">
          <p className="text-sm text-muted-foreground">السعر النهائي</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">{fmt(total)}</p>
        </div>
      </div>
    </PageShell>
  );
}

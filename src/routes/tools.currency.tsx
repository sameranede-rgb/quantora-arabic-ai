import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies, fetchRates } from "@/data/currencies";

export const Route = createFileRoute("/tools/currency")({
  head: () => ({
    meta: [
      { title: "تحويل العملات — Quantora" },
      {
        name: "description",
        content: "حوّل بين الدولار واليورو والريال والليرة وغيرها بأسعار صرف محدّثة.",
      },
      { property: "og:title", content: "تحويل العملات — Quantora" },
      { property: "og:description", content: "أسعار صرف محدّثة بين أهم العملات العالمية." },
    ],
  }),
  component: CurrencyPage,
});

function CurrencyPage() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const { data, isLoading } = useQuery({
    queryKey: ["rates", from],
    queryFn: () => fetchRates(from),
    staleTime: 1000 * 60 * 30,
  });

  const rate = data?.rates?.[to];
  const numeric = Number(amount.replace(/,/g, "")) || 0;
  const converted = rate ? numeric * rate : null;
  const toCurrency = currencies.find((c) => c.code === to);
  const fromCurrency = currencies.find((c) => c.code === from);

  return (
    <PageShell
      title="تحويل العملات"
      description="اختر العملتين وأدخل المبلغ لتحصل على النتيجة فورًا بسعر الصرف الحالي."
    >
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card">
        <div className="space-y-2">
          <Label htmlFor="amount">المبلغ</Label>
          <Input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <div className="mt-5 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-2">
            <Label>من</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="mb-1 rounded-full"
            aria-label="تبديل العملتين"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="space-y-2">
            <Label>إلى</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-primary-soft p-5 text-center">
          <p className="text-sm text-muted-foreground">
            {numeric.toLocaleString("ar-EG")} {fromCurrency?.name} تساوي
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">
            {isLoading || converted === null
              ? "…"
              : `${converted.toLocaleString("ar-EG", { maximumFractionDigits: 2 })} ${toCurrency?.symbol ?? ""}`}
          </p>
          {rate ? (
            <p className="mt-2 text-xs text-muted-foreground">
              1 {from} = {rate.toLocaleString("ar-EG", { maximumFractionDigits: 4 })} {to}
              {data?.live ? " — سعر مباشر" : " — سعر تقديري"}
            </p>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}

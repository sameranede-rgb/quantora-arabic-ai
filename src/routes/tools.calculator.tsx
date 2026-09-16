import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/calculator")({
  head: () => ({
    meta: [
      { title: "الآلة الحاسبة — Quantora" },
      { name: "description", content: "آلة حاسبة عربية سريعة مع سجل للعمليات السابقة." },
      { property: "og:title", content: "الآلة الحاسبة — Quantora" },
      { property: "og:description", content: "حسابات فورية ودقيقة مع سجل للعمليات." },
    ],
  }),
  component: CalculatorPage,
});

const keys = [
  ["C", "(", ")", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

function evaluate(expression: string): string {
  const normalized = expression.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");
  if (!/^[0-9+\-*/(). ]+$/.test(normalized)) throw new Error("invalid");
  // eslint-disable-next-line no-new-func
  const result = Function(`"use strict"; return (${normalized})`)() as number;
  if (typeof result !== "number" || !Number.isFinite(result)) throw new Error("invalid");
  return String(Math.round(result * 1e10) / 1e10);
}

function CalculatorPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const press = (key: string) => {
    if (key === "C") {
      setExpression("");
      setResult("0");
      return;
    }
    if (key === "⌫") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }
    if (key === "=") {
      if (!expression) return;
      try {
        const value = evaluate(expression);
        setResult(value);
        setHistory((prev) => [`${expression} = ${value}`, ...prev].slice(0, 8));
        setExpression(value);
      } catch {
        setResult("خطأ في العملية");
      }
      return;
    }
    setExpression((prev) => prev + key);
  };

  return (
    <PageShell title="الآلة الحاسبة" description="حسابات سريعة ودقيقة مع سجل لآخر العمليات.">
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border bg-card p-5 shadow-card">
          <div
            className="rounded-2xl bg-muted p-4 text-end"
            dir="ltr"
            aria-live="polite"
            aria-label="نتيجة الحساب"
          >
            <div className="min-h-6 text-sm text-muted-foreground">{expression || "\u00A0"}</div>
            <div className="mt-1 font-display text-3xl font-bold break-all">{result}</div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2" dir="ltr">
            {keys.flat().map((key) => (
              <Button
                key={key}
                variant={
                  key === "=" ? "default" : ["÷", "×", "−", "+"].includes(key) ? "secondary" : "outline"
                }
                className="h-14 rounded-2xl text-lg"
                onClick={() => press(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-bold">سجل العمليات</h2>
          {history.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">لا توجد عمليات بعد.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm" dir="ltr">
              {history.map((item, index) => (
                <li key={index} className="rounded-xl bg-muted px-3 py-2 text-end">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageShell>
  );
}

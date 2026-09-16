import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

import { Brand } from "@/components/brand";
import { ToolCard } from "@/components/tool-card";
import { ToolIcon } from "@/components/tool-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { features, tools } from "@/data/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantora — كل ما تحتاجه في مكان واحد" },
      {
        name: "description",
        content:
          "حاسبة، تحويل عملات، أسعار عالمية ومساعد ذكاء اصطناعي: أدوات عربية مجانية وسريعة في منصة واحدة.",
      },
      { property: "og:title", content: "Quantora — كل ما تحتاجه في مكان واحد" },
      {
        property: "og:description",
        content: "أدوات ذكية للحسابات والتحويلات ومقارنة الأسعار بين الدول.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const featured = tools.slice(0, 4);

  return (
    <div>
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <div className="flex justify-center">
            <Brand size="lg" asLink={false} />
          </div>
          <p className="mt-5 font-display text-2xl font-bold md:text-3xl">
            كل ما تحتاجه في مكان واحد
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            أدوات ذكية لحساباتك، وتحويلاتك، وتحليلاتك، وأسعار العالم — مجانًا وبدون تعقيد.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border bg-card p-2 shadow-soft"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/ai", search: { q: query || undefined } });
            }}
          >
            <Search className="ms-3 size-5 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ما الذي تريد حسابه أو معرفته؟"
              className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
            />
            <Button type="submit" className="h-11 rounded-full px-6">
              ابدأ الآن
            </Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center font-display text-2xl font-bold md:text-3xl">أدواتنا الرئيسية</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <a href="/tools">
              <Sparkles className="size-4" />
              تصفّح جميع الأدوات
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
          مميزات Quantora
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border bg-card p-5 text-center shadow-card"
            >
              <div className="flex justify-center">
                <ToolIcon name={feature.icon} tone="primary" />
              </div>
              <p className="mt-3 font-semibold">{feature.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

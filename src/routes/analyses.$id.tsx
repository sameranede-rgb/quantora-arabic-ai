import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { getAnalysis } from "@/data/analyses";

export const Route = createFileRoute("/analyses/$id")({
  loader: ({ params }) => {
    const analysis = getAnalysis(params.id);
    if (!analysis) throw notFound();
    return { analysis };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "التحليل غير متوفر — Quantora" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.analysis.title} — تفاصيل التحليل | Quantora`;
    const description = `تفاصيل ${loaderData.analysis.title} مع النتيجة النهائية وتفصيل البنود.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: AnalysisPage,
  notFoundComponent: () => (
    <PageShell title="التحليل غير موجود" description="لم نتمكن من العثور على هذا التحليل.">
      <div className="text-center">
        <Button asChild className="rounded-full">
          <Link to="/analyses">العودة إلى تحليلاتي</Link>
        </Button>
      </div>
    </PageShell>
  ),
});

function AnalysisPage() {
  const { analysis } = Route.useLoaderData();

  const download = () => {
    const lines = [
      analysis.title,
      analysis.tool,
      analysis.savedAt,
      "",
      ...analysis.lines.map((line) => `${line.label}: ${line.amount} ${analysis.currency}`),
      `الإجمالي: ${analysis.total} ${analysis.currency}`,
      "",
      analysis.note,
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${analysis.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("تم تنزيل التقرير");
  };

  return (
    <PageShell title="تفاصيل التحليل" description={`${analysis.tool} — ${analysis.savedAt}`}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-4 rounded-3xl border bg-card p-5 shadow-card">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-3xl">
            {analysis.productEmoji}
          </span>
          <div>
            <p className="font-display text-lg font-bold">{analysis.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{analysis.savedAt}</p>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-card">
          <div className="rounded-2xl bg-success/10 p-5 text-center">
            <p className="text-sm text-muted-foreground">النتيجة</p>
            <p className="mt-1 font-display text-3xl font-bold text-success">
              {analysis.total.toLocaleString("ar-EG")} {analysis.currency}
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-sm">
            {analysis.lines.map((line) => (
              <li
                key={line.label}
                className="flex items-center justify-between rounded-xl bg-muted px-4 py-3"
              >
                <span className="flex items-center gap-2">
                  <span>{line.emoji}</span>
                  {line.label}
                </span>
                <span className="font-semibold">
                  {line.amount.toLocaleString("ar-EG")} {analysis.currency}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-muted-foreground">{analysis.note}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button className="rounded-full" onClick={download}>
            تنزيل التقرير
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-destructive"
            onClick={() => toast.info("لحفظ التحليلات وحذفها نهائيًا نحتاج إلى تشغيل الحساب.")}
          >
            <Trash2 className="size-4" />
            حذف التحليل
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/analyses">
              <ArrowRight className="size-4" />
              كل التحليلات
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}

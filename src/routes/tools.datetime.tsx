import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tools/datetime")({
  head: () => ({
    meta: [
      { title: "محوّل التاريخ والوقت — Quantora" },
      {
        name: "description",
        content: "احسب الفرق بين تاريخين، واعرف التاريخ الهجري والميلادي وتوقيت المدن.",
      },
      { property: "og:title", content: "محوّل التاريخ والوقت — Quantora" },
      { property: "og:description", content: "فروق التواريخ، التقويم الهجري وتوقيت المدن." },
    ],
  }),
  component: DateTimePage,
});

const zones = [
  { id: "Asia/Riyadh", label: "الرياض" },
  { id: "Asia/Dubai", label: "دبي" },
  { id: "Africa/Cairo", label: "القاهرة" },
  { id: "Europe/Istanbul", label: "إسطنبول" },
  { id: "Europe/London", label: "لندن" },
  { id: "America/New_York", label: "نيويورك" },
];

function DateTimePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [zone, setZone] = useState("Asia/Riyadh");

  const diffDays = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24),
  );

  const gregorian = new Date(start).toLocaleDateString("ar-EG", { dateStyle: "full" });
  let hijri = "—";
  try {
    hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", { dateStyle: "full" }).format(
      new Date(start),
    );
  } catch {
    hijri = "غير متوفر";
  }

  const zoneTime = new Intl.DateTimeFormat("ar-EG", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
  }).format(new Date());

  return (
    <PageShell title="محوّل التاريخ والوقت" description="فروق التواريخ والتقويم الهجري وتوقيت المدن.">
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-bold">الفرق بين تاريخين</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start">من تاريخ</Label>
              <Input
                id="start"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">إلى تاريخ</Label>
              <Input id="end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-primary-soft p-4 text-center">
            <p className="text-sm text-muted-foreground">عدد الأيام</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {Number.isFinite(diffDays) ? diffDays.toLocaleString("ar-EG") : "—"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">التقويم</h2>
            <p className="mt-3 text-sm">
              <span className="text-muted-foreground">ميلادي: </span>
              {gregorian}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-muted-foreground">هجري: </span>
              {hijri}
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">توقيت المدن</h2>
            <div className="mt-4 space-y-2">
              <Label>المدينة</Label>
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-primary">{zoneTime}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

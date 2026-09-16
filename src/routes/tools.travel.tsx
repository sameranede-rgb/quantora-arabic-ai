import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/tools/travel")({
  head: () => ({
    meta: [
      { title: "حاسبة ميزانية السفر — Quantora" },
      {
        name: "description",
        content: "قدّر تكلفة رحلتك: التذكرة، الفندق، المواصلات، الطعام وعدد المسافرين.",
      },
      { property: "og:title", content: "حاسبة ميزانية السفر — Quantora" },
      { property: "og:description", content: "ميزانية رحلتك كاملة في أرقام واضحة." },
    ],
  }),
  component: TravelPage,
});

function TravelPage() {
  const [ticket, setTicket] = useState("400");
  const [hotel, setHotel] = useState("60");
  const [nights, setNights] = useState("5");
  const [daily, setDaily] = useState("40");
  const [travelers, setTravelers] = useState("2");

  const t = Number(ticket) || 0;
  const h = Number(hotel) || 0;
  const n = Number(nights) || 0;
  const d = Number(daily) || 0;
  const people = Number(travelers) || 1;

  const tickets = t * people;
  const stay = h * n;
  const living = d * n * people;
  const total = tickets + stay + living;

  const fmt = (value: number) => value.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  const fields = [
    { id: "ticket", label: "سعر التذكرة للشخص", value: ticket, set: setTicket },
    { id: "hotel", label: "سعر الفندق لليلة", value: hotel, set: setHotel },
    { id: "nights", label: "عدد الليالي", value: nights, set: setNights },
    { id: "daily", label: "مصروف يومي للشخص", value: daily, set: setDaily },
    { id: "travelers", label: "عدد المسافرين", value: travelers, set: setTravelers },
  ];

  return (
    <PageShell title="حاسبة ميزانية السفر" description="أدخل تفاصيل رحلتك لتحصل على التكلفة الكاملة.">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                inputMode="decimal"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
              />
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2 text-sm">
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>🎫 التذاكر</span>
            <span className="font-semibold">{fmt(tickets)}</span>
          </li>
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>🏨 الإقامة</span>
            <span className="font-semibold">{fmt(stay)}</span>
          </li>
          <li className="flex justify-between rounded-xl bg-muted px-4 py-3">
            <span>🚕 المصاريف اليومية</span>
            <span className="font-semibold">{fmt(living)}</span>
          </li>
        </ul>

        <div className="mt-5 rounded-2xl bg-primary-soft p-5 text-center">
          <p className="text-sm text-muted-foreground">التكلفة الإجمالية</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">{fmt(total)}</p>
        </div>
      </div>
    </PageShell>
  );
}

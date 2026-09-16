import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/tools/units")({
  head: () => ({
    meta: [
      { title: "محوّل الوحدات — Quantora" },
      {
        name: "description",
        content: "حوّل بين وحدات الطول والوزن والحجم ودرجة الحرارة بنتيجة فورية.",
      },
      { property: "og:title", content: "محوّل الوحدات — Quantora" },
      { property: "og:description", content: "الطول، الوزن، الحجم ودرجة الحرارة في أداة واحدة." },
    ],
  }),
  component: UnitsPage,
});

type UnitMap = Record<string, { label: string; factor: number }>;

const groups = {
  length: {
    label: "الطول",
    units: {
      mm: { label: "مليمتر", factor: 0.001 },
      cm: { label: "سنتيمتر", factor: 0.01 },
      m: { label: "متر", factor: 1 },
      km: { label: "كيلومتر", factor: 1000 },
      inch: { label: "إنش", factor: 0.0254 },
      ft: { label: "قدم", factor: 0.3048 },
      mile: { label: "ميل", factor: 1609.344 },
    },
  },
  weight: {
    label: "الوزن",
    units: {
      g: { label: "غرام", factor: 0.001 },
      kg: { label: "كيلوغرام", factor: 1 },
      ton: { label: "طن", factor: 1000 },
      lb: { label: "باوند", factor: 0.45359237 },
      oz: { label: "أونصة", factor: 0.02834952 },
    },
  },
  volume: {
    label: "الحجم",
    units: {
      ml: { label: "مليلتر", factor: 0.001 },
      l: { label: "لتر", factor: 1 },
      gal: { label: "غالون أمريكي", factor: 3.785411784 },
      cup: { label: "كوب", factor: 0.2365882 },
    },
  },
};

type GroupKey = keyof typeof groups;

const unitEntries = (key: GroupKey) => Object.entries(groups[key].units as UnitMap);

const unitOf = (key: GroupKey, code: string) => {
  const units = groups[key].units as UnitMap;
  return units[code] ?? Object.values(units)[0]!;
};

const tempUnits = { c: "مئوية", f: "فهرنهايت", k: "كلفن" } as const;
type TempUnit = keyof typeof tempUnits;

function convertTemp(value: number, from: TempUnit, to: TempUnit) {
  const celsius = from === "c" ? value : from === "f" ? ((value - 32) * 5) / 9 : value - 273.15;
  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

function UnitsPage() {
  const [group, setGroup] = useState<keyof typeof groups | "temperature">("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("cm");
  const [tempFrom, setTempFrom] = useState<TempUnit>("c");
  const [tempTo, setTempTo] = useState<TempUnit>("f");

  const numeric = Number(value) || 0;
  let result: number;
  let toLabel: string;

  if (group === "temperature") {
    result = convertTemp(numeric, tempFrom, tempTo);
    toLabel = tempUnits[tempTo];
  } else {
    const units = groups[group].units;
    const fromUnit = units[from] ?? Object.values(units)[0];
    const toUnit = units[to] ?? Object.values(units)[0];
    result = (numeric * fromUnit.factor) / toUnit.factor;
    toLabel = toUnit.label;
  }

  const changeGroup = (next: keyof typeof groups | "temperature") => {
    setGroup(next);
    if (next !== "temperature") {
      const codes = Object.keys(groups[next].units);
      setFrom(codes[0]);
      setTo(codes[1] ?? codes[0]);
    }
  };

  return (
    <PageShell title="محوّل الوحدات" description="اختر النوع والوحدتين لتحصل على النتيجة مباشرة.">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-6 shadow-card">
        <div className="flex flex-wrap gap-2">
          {(["length", "weight", "volume", "temperature"] as const).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={group === key ? "default" : "outline"}
              className="rounded-full"
              onClick={() => changeGroup(key)}
            >
              {key === "temperature" ? "درجة الحرارة" : groups[key].label}
            </Button>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="value">القيمة</Label>
          <Input
            id="value"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>من</Label>
            {group === "temperature" ? (
              <Select value={tempFrom} onValueChange={(v) => setTempFrom(v as TempUnit)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tempUnits).map(([code, label]) => (
                    <SelectItem key={code} value={code}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groups[group].units).map(([code, unit]) => (
                    <SelectItem key={code} value={code}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label>إلى</Label>
            {group === "temperature" ? (
              <Select value={tempTo} onValueChange={(v) => setTempTo(v as TempUnit)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tempUnits).map(([code, label]) => (
                    <SelectItem key={code} value={code}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groups[group].units).map(([code, unit]) => (
                    <SelectItem key={code} value={code}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-primary-soft p-5 text-center">
          <p className="text-sm text-muted-foreground">النتيجة</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">
            {result.toLocaleString("ar-EG", { maximumFractionDigits: 6 })} {toLabel}
          </p>
        </div>
      </div>
    </PageShell>
  );
}

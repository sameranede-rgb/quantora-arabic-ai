export type AnalysisLine = { label: string; amount: number; emoji: string };

export type Analysis = {
  id: string;
  title: string;
  tool: string;
  emoji: string;
  savedAt: string;
  total: number;
  currency: string;
  productEmoji: string;
  lines: AnalysisLine[];
  note: string;
};

export const analyses: Analysis[] = [
  {
    id: "istanbul-trip",
    title: "تكلفة السفر إلى تركيا",
    tool: "حاسبة ميزانية السفر",
    emoji: "✈️",
    savedAt: "2026-09-14 10:24",
    total: 1250,
    currency: "USD",
    productEmoji: "🧳",
    lines: [
      { label: "التذكرة", amount: 800, emoji: "🎫" },
      { label: "الفندق", amount: 300, emoji: "🏨" },
      { label: "المواصلات", amount: 150, emoji: "🚕" },
    ],
    note: "تقدير لرحلة 5 أيام لشخصين مع إقامة متوسطة.",
  },
  {
    id: "phones-compare",
    title: "مقارنة الأسعار بين الدول",
    tool: "الأسعار العالمية",
    emoji: "🌍",
    savedAt: "2026-09-13 18:45",
    total: 999,
    currency: "USD",
    productEmoji: "📱",
    lines: [
      { label: "سعر أمريكا", amount: 999, emoji: "🇺🇸" },
      { label: "سعر الإمارات", amount: 1029, emoji: "🇦🇪" },
      { label: "سعر تركيا", amount: 1319, emoji: "🇹🇷" },
    ],
    note: "أرخص سعر متوفر في الولايات المتحدة قبل الضرائب.",
  },
  {
    id: "shopping-budget",
    title: "حساب السفر النهائي للتسوق",
    tool: "الآلة الحاسبة",
    emoji: "🧮",
    savedAt: "2026-09-12 14:32",
    total: 640,
    currency: "USD",
    productEmoji: "🛍️",
    lines: [
      { label: "ملابس", amount: 320, emoji: "👕" },
      { label: "إلكترونيات", amount: 220, emoji: "🎧" },
      { label: "هدايا", amount: 100, emoji: "🎁" },
    ],
    note: "ميزانية تسوّق مقسّمة على ثلاثة أقسام.",
  },
  {
    id: "currency-run",
    title: "تحويل العملات",
    tool: "تحويل العملات",
    emoji: "💱",
    savedAt: "2026-09-11 09:17",
    total: 91.23,
    currency: "EUR",
    productEmoji: "💶",
    lines: [
      { label: "المبلغ الأصلي", amount: 100, emoji: "💵" },
      { label: "الناتج باليورو", amount: 91.23, emoji: "💶" },
    ],
    note: "تحويل 100 دولار أمريكي إلى اليورو بسعر اليوم.",
  },
];

export function getAnalysis(id: string) {
  return analyses.find((a) => a.id === id);
}

export type ToolTone = "primary" | "success" | "warning" | "info" | "destructive";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tone: ToolTone;
  category: "حسابات" | "تحويلات" | "أسعار" | "ذكاء اصطناعي" | "سفر وتنقل";
  to: string;
  ready: boolean;
};

export const tools: Tool[] = [
  {
    slug: "calculator",
    title: "الآلة الحاسبة",
    description: "حسابات سريعة ودقيقة مع سجل للعمليات",
    icon: "calculator",
    tone: "success",
    category: "حسابات",
    to: "/tools/calculator",
    ready: true,
  },
  {
    slug: "currency",
    title: "تحويل العملات",
    description: "أسعار صرف محدّثة بين أهم العملات العالمية",
    icon: "coins",
    tone: "warning",
    category: "تحويلات",
    to: "/tools/currency",
    ready: true,
  },
  {
    slug: "prices",
    title: "الأسعار العالمية",
    description: "قارن أسعار المنتجات في مختلف دول العالم",
    icon: "globe",
    tone: "info",
    category: "أسعار",
    to: "/prices",
    ready: true,
  },
  {
    slug: "ai",
    title: "مساعد الذكاء الاصطناعي",
    description: "اسأل عن أي حساب أو مقارنة واحصل على إجابة فورية",
    icon: "bot",
    tone: "primary",
    category: "ذكاء اصطناعي",
    to: "/ai",
    ready: true,
  },
  {
    slug: "units",
    title: "محوّل الوحدات",
    description: "الطول والوزن والحجم ودرجة الحرارة",
    icon: "ruler",
    tone: "success",
    category: "تحويلات",
    to: "/tools/units",
    ready: true,
  },
  {
    slug: "datetime",
    title: "محوّل التاريخ والوقت",
    description: "فروق التوقيت بين المدن والتقويم الهجري والميلادي",
    icon: "calendar-days",
    tone: "destructive",
    category: "تحويلات",
    to: "/tools/datetime",
    ready: true,
  },
  {
    slug: "travel",
    title: "حاسبة ميزانية السفر",
    description: "قدّر تكلفة رحلتك من التذكرة إلى الفندق والمواصلات",
    icon: "plane",
    tone: "info",
    category: "سفر وتنقل",
    to: "/tools/travel",
    ready: true,
  },
  {
    slug: "percentage",
    title: "حاسبة النِسب والخصومات",
    description: "احسب الخصم والضريبة ونسبة التغيير بسهولة",
    icon: "percent",
    tone: "warning",
    category: "حسابات",
    to: "/tools/percentage",
    ready: true,
  },
];

export const toolCategories = [
  "كل الفئات",
  "حسابات",
  "تحويلات",
  "أسعار",
  "ذكاء اصطناعي",
  "سفر وتنقل",
] as const;

export const features = [
  { title: "مجاني 100%", description: "كل الأدوات متاحة بدون رسوم", icon: "gift" },
  { title: "دقة عالية", description: "بيانات وأسعار محدّثة باستمرار", icon: "target" },
  { title: "سريع وخفيف", description: "نتائج فورية بدون انتظار", icon: "zap" },
  { title: "سهل الاستخدام", description: "واجهة عربية واضحة ومريحة", icon: "sparkle" },
];

export type Currency = { code: string; name: string; symbol: string; flag: string };

export const currencies: Currency[] = [
  { code: "USD", name: "دولار أمريكي", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "يورو", symbol: "€", flag: "🇪🇺" },
  { code: "SAR", name: "ريال سعودي", symbol: "ر.س", flag: "🇸🇦" },
  { code: "AED", name: "درهم إماراتي", symbol: "د.إ", flag: "🇦🇪" },
  { code: "EGP", name: "جنيه مصري", symbol: "ج.م", flag: "🇪🇬" },
  { code: "TRY", name: "ليرة تركية", symbol: "₺", flag: "🇹🇷" },
  { code: "GBP", name: "جنيه إسترليني", symbol: "£", flag: "🇬🇧" },
  { code: "DZD", name: "دينار جزائري", symbol: "د.ج", flag: "🇩🇿" },
  { code: "MAD", name: "درهم مغربي", symbol: "د.م", flag: "🇲🇦" },
  { code: "JPY", name: "ين ياباني", symbol: "¥", flag: "🇯🇵" },
  { code: "KWD", name: "دينار كويتي", symbol: "د.ك", flag: "🇰🇼" },
  { code: "QAR", name: "ريال قطري", symbol: "ر.ق", flag: "🇶🇦" },
];

/** Fallback rates relative to USD, used when the live rates service is unreachable. */
export const fallbackRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  SAR: 3.75,
  AED: 3.67,
  EGP: 48.5,
  TRY: 34.2,
  GBP: 0.78,
  DZD: 134.5,
  MAD: 9.9,
  JPY: 152.4,
  KWD: 0.307,
  QAR: 3.64,
};

export async function fetchRates(base: string): Promise<{
  rates: Record<string, number>;
  live: boolean;
}> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!res.ok) throw new Error("bad response");
    const json = (await res.json()) as { result?: string; rates?: Record<string, number> };
    if (json.result !== "success" || !json.rates) throw new Error("bad payload");
    return { rates: json.rates, live: true };
  } catch {
    const baseRate = fallbackRates[base] ?? 1;
    const rates: Record<string, number> = {};
    for (const [code, rate] of Object.entries(fallbackRates)) {
      rates[code] = rate / baseRate;
    }
    return { rates, live: false };
  }
}

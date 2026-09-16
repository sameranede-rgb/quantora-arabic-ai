import { createOpenAI } from "@ai-sdk/openai";

/** Creates the Lovable AI Gateway Responses provider. Server-side only. */
export function createLovableResponsesProvider(apiKey: string) {
  return createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export const QUANTORA_SYSTEM_PROMPT = `أنت "مساعد Quantora"، مساعد ذكي عربي متخصص في الحسابات والتحويلات ومقارنة الأسعار بين الدول وتخطيط ميزانيات السفر والتسوّق.
- أجب دائمًا بالعربية الفصحى المبسّطة وبأسلوب ودود وموجز.
- عند أي حساب، اعرض الخطوات القصيرة والنتيجة النهائية بشكل واضح (استخدم نقاطًا أو جدولًا عند الحاجة).
- لأسعار الصرف والأسعار العالمية، وضّح أن الأرقام تقديرية وقابلة للتغيّر.
- إذا كان السؤال ناقص المعلومات، اسأل سؤالًا واحدًا موجزًا للتوضيح.`;

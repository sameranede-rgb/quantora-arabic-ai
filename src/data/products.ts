export type CountryPrice = {
  country: string;
  flag: string;
  price: number;
  currency: string;
  localPrice: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  basePrice: number;
  updatedAt: string;
  prices: CountryPrice[];
};

export const productCategories = [
  "كل الفئات",
  "هواتف",
  "أحذية",
  "حواسيب",
  "سفر وطيران",
  "حقائب",
] as const;

export const products: Product[] = [
  {
    id: "iphone-16",
    name: "iPhone 16",
    category: "هواتف",
    emoji: "📱",
    basePrice: 999,
    updatedAt: "2026-09-14",
    prices: [
      { country: "الولايات المتحدة", flag: "🇺🇸", price: 999, currency: "USD", localPrice: "$999" },
      { country: "الإمارات", flag: "🇦🇪", price: 1029, currency: "AED", localPrice: "3,779 د.إ" },
      { country: "السعودية", flag: "🇸🇦", price: 1049, currency: "SAR", localPrice: "3,934 ر.س" },
      { country: "تركيا", flag: "🇹🇷", price: 1319, currency: "TRY", localPrice: "45,110 ₺" },
      { country: "مصر", flag: "🇪🇬", price: 1189, currency: "EGP", localPrice: "57,666 ج.م" },
    ],
  },
  {
    id: "galaxy-s24",
    name: "Samsung Galaxy S24",
    category: "هواتف",
    emoji: "📱",
    basePrice: 799,
    updatedAt: "2026-09-13",
    prices: [
      { country: "الولايات المتحدة", flag: "🇺🇸", price: 799, currency: "USD", localPrice: "$799" },
      { country: "الإمارات", flag: "🇦🇪", price: 819, currency: "AED", localPrice: "3,006 د.إ" },
      { country: "السعودية", flag: "🇸🇦", price: 835, currency: "SAR", localPrice: "3,131 ر.س" },
      { country: "المغرب", flag: "🇲🇦", price: 915, currency: "MAD", localPrice: "9,058 د.م" },
    ],
  },
  {
    id: "nike-air-force-1",
    name: "Nike Air Force 1",
    category: "أحذية",
    emoji: "👟",
    basePrice: 115,
    updatedAt: "2026-09-12",
    prices: [
      { country: "الولايات المتحدة", flag: "🇺🇸", price: 115, currency: "USD", localPrice: "$115" },
      { country: "فرنسا", flag: "🇫🇷", price: 125, currency: "EUR", localPrice: "115 €" },
      { country: "السعودية", flag: "🇸🇦", price: 132, currency: "SAR", localPrice: "495 ر.س" },
      { country: "الجزائر", flag: "🇩🇿", price: 148, currency: "DZD", localPrice: "19,906 د.ج" },
    ],
  },
  {
    id: "adidas-backpack",
    name: "Adidas Backpack",
    category: "حقائب",
    emoji: "🎒",
    basePrice: 45,
    updatedAt: "2026-09-11",
    prices: [
      { country: "الولايات المتحدة", flag: "🇺🇸", price: 45, currency: "USD", localPrice: "$45" },
      { country: "تركيا", flag: "🇹🇷", price: 39, currency: "TRY", localPrice: "1,334 ₺" },
      { country: "الإمارات", flag: "🇦🇪", price: 52, currency: "AED", localPrice: "191 د.إ" },
    ],
  },
  {
    id: "macbook-air",
    name: 'MacBook Air 13"',
    category: "حواسيب",
    emoji: "💻",
    basePrice: 1099,
    updatedAt: "2026-09-10",
    prices: [
      { country: "الولايات المتحدة", flag: "🇺🇸", price: 1099, currency: "USD", localPrice: "$1,099" },
      { country: "الإمارات", flag: "🇦🇪", price: 1139, currency: "AED", localPrice: "4,180 د.إ" },
      { country: "ألمانيا", flag: "🇩🇪", price: 1215, currency: "EUR", localPrice: "1,118 €" },
    ],
  },
  {
    id: "istanbul-flight",
    name: "تذكرة سفر إلى إسطنبول",
    category: "سفر وطيران",
    emoji: "✈️",
    basePrice: 320,
    updatedAt: "2026-09-09",
    prices: [
      { country: "من الرياض", flag: "🇸🇦", price: 320, currency: "SAR", localPrice: "1,200 ر.س" },
      { country: "من القاهرة", flag: "🇪🇬", price: 265, currency: "EGP", localPrice: "12,853 ج.م" },
      { country: "من دبي", flag: "🇦🇪", price: 298, currency: "AED", localPrice: "1,094 د.إ" },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

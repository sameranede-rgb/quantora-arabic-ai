import { Link } from "@tanstack/react-router";

import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Brand size="sm" />
          <p className="text-sm text-muted-foreground">أدوات ذكية لحياة أسهل.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            الرئيسية
          </Link>
          <Link to="/tools" className="hover:text-foreground">
            الأدوات
          </Link>
          <Link to="/prices" className="hover:text-foreground">
            الأسعار العالمية
          </Link>
          <Link to="/ai" className="hover:text-foreground">
            الذكاء الاصطناعي
          </Link>
          <Link to="/account" className="hover:text-foreground">
            حسابي
          </Link>
        </nav>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © 2026 Quantora — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

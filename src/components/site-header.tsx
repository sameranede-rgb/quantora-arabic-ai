import { Link } from "@tanstack/react-router";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";

import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/tools", label: "الأدوات" },
  { to: "/prices", label: "الأسعار العالمية" },
  { to: "/ai", label: "الذكاء الاصطناعي" },
  { to: "/analyses", label: "تحليلاتي" },
  { to: "/account", label: "حسابي" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Brand size="sm" />

        <nav className="mr-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mr-auto flex items-center gap-2 lg:mr-0">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/auth/login">
              <LogIn className="size-4" />
              تسجيل الدخول
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="القائمة">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">القائمة</SheetTitle>
              <div className="mt-2 px-4">
                <Brand size="sm" />
              </div>
              <nav className="mt-6 flex flex-col gap-1 px-2">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-accent"
                    activeProps={{ className: "bg-accent font-semibold" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link to="/auth/login" onClick={() => setOpen(false)}>
                    تسجيل الدخول
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

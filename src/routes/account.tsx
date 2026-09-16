import { Link, createFileRoute } from "@tanstack/react-router";
import { Bell, ChevronLeft, CreditCard, LogOut, Palette, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي — Quantora" },
      {
        name: "description",
        content: "إدارة ملفك الشخصي وأمان الحساب والإشعارات واللغة والمظهر في Quantora.",
      },
      { property: "og:title", content: "حسابي — Quantora" },
      { property: "og:description", content: "ملفك الشخصي وإعداداتك في مكان واحد." },
    ],
  }),
  component: AccountPage,
});

const items = [
  { icon: User, label: "الملف الشخصي", hint: "الاسم وصورة الحساب" },
  { icon: ShieldCheck, label: "أمان الحساب", hint: "كلمة المرور والجلسات" },
  { icon: Bell, label: "إعدادات الإشعارات", hint: "تنبيهات الأسعار والتحليلات" },
  { icon: CreditCard, label: "معلومات الاشتراك", hint: "الخطة المجانية" },
];

function AccountPage() {
  return (
    <PageShell title="حسابي" description="إعدادات ملفك الشخصي وتفضيلاتك في Quantora.">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center gap-4 rounded-3xl border bg-card p-5 shadow-card">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            أ
          </span>
          <div>
            <p className="font-display text-lg font-bold">مرحبًا، أنس</p>
            <p className="text-sm text-muted-foreground">anes@example.com</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-card shadow-card">
          {items.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 border-b px-5 py-4 text-start last:border-b-0 transition-colors hover:bg-accent"
              onClick={() => toast.info("هذه الإعدادات تحتاج إلى تشغيل الحساب لتصبح فعّالة.")}
            >
              <item.icon className="size-5 text-primary" />
              <span className="flex-1">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.hint}</span>
              </span>
              <ChevronLeft className="size-4 text-muted-foreground" />
            </button>
          ))}

          <div className="flex items-center gap-3 border-t px-5 py-4">
            <Palette className="size-5 text-primary" />
            <span className="flex-1">
              <span className="block text-sm font-semibold">اللغة والمظهر</span>
              <span className="block text-xs text-muted-foreground">
                العربية — الوضع النهاري أو الليلي
              </span>
            </span>
            <ThemeToggle />
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-card">
          <Button
            variant="outline"
            className="w-full rounded-2xl text-destructive"
            onClick={() => toast.info("لا توجد جلسة حقيقية بعد — تسجيل الخروج سيعمل عند تشغيل الحساب.")}
          >
            <LogOut className="size-4" />
            تسجيل الخروج
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link to="/auth/signup" className="text-primary hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

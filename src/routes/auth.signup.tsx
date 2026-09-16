import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "إنشاء حساب جديد — Quantora" },
      { name: "description", content: "انشئ حسابك في Quantora لحفظ تحليلاتك ومتابعة الأسعار." },
      { property: "og:title", content: "إنشاء حساب جديد — Quantora" },
      { property: "og:description", content: "انضم إلى Quantora وابدأ رحلتك." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-hero-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-card p-7 shadow-soft">
        <div className="flex justify-center">
          <Brand asLink={false} />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold">إنشاء حساب جديد</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          انضم إلى Quantora وابدأ رحلتك.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.name || !form.email || !form.password) {
              toast.error("أكمل جميع الحقول المطلوبة.");
              return;
            }
            if (form.password !== form.confirm) {
              toast.error("كلمتا المرور غير متطابقتين.");
              return;
            }
            toast.info("لإنشاء حسابات حقيقية نحتاج إلى تشغيل خدمة الحساب — أخبرني لأفعّلها.");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input
              id="name"
              placeholder="أدخل اسمك الكامل"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password")(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
            <Input
              id="confirm"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => set("confirm")(e.target.value)}
            />
          </div>

          <Button type="submit" className="h-11 w-full rounded-2xl">
            إنشاء حساب
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          بإنشاء حساب أنت توافق على الشروط وسياسة الخصوصية.
        </p>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

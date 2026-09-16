import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — Quantora" },
      { name: "description", content: "سجّل الدخول إلى Quantora للاستفادة من أدواتك وتحليلاتك." },
      { property: "og:title", content: "تسجيل الدخول — Quantora" },
      { property: "og:description", content: "دخول سريع إلى حسابك في Quantora." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-hero-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-card p-7 shadow-soft">
        <div className="flex justify-center">
          <Brand asLink={false} />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold">مرحبًا بعودتك</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          سجّل الدخول للاستفادة من أدوات Quantora وحفظ تحليلاتك.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-muted p-1 text-sm">
          <span className="rounded-full bg-card py-2 text-center font-semibold shadow-sm">
            تسجيل الدخول
          </span>
          <Link to="/auth/signup" className="rounded-full py-2 text-center text-muted-foreground">
            إنشاء حساب
          </Link>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) {
              toast.error("أدخل البريد الإلكتروني وكلمة المرور.");
              return;
            }
            toast.info("الحسابات الحقيقية تحتاج إلى تشغيل خدمة الحساب — أخبرني لأفعّلها.");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              dir="ltr"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <Checkbox id="remember" />
              تذكّرني
            </label>
            <Link to="/auth/reset" className="text-primary hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <Button type="submit" className="h-11 w-full rounded-2xl">
            تسجيل الدخول
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link to="/auth/signup" className="text-primary hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}

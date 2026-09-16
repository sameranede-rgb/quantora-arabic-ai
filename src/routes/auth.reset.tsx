import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset")({
  head: () => ({
    meta: [
      { title: "إعادة تعيين كلمة المرور — Quantora" },
      { name: "description", content: "أدخل بريدك الإلكتروني لاستعادة كلمة المرور في Quantora." },
      { property: "og:title", content: "إعادة تعيين كلمة المرور — Quantora" },
      { property: "og:description", content: "استعادة الوصول إلى حسابك في Quantora." },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-hero-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-card p-7 text-center shadow-soft">
        <div className="flex justify-center">
          <Brand asLink={false} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold">إعادة تعيين كلمة المرور</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          سنرسل لك رابطًا لإعادة تعيين كلمة المرور.
        </p>

        <form
          className="mt-6 space-y-4 text-start"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) {
              toast.error("أدخل بريدك الإلكتروني.");
              return;
            }
            toast.info("إرسال رسائل الاستعادة يحتاج إلى تشغيل خدمة الحساب — أخبرني لأفعّلها.");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">أدخل بريدك الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-11 w-full rounded-2xl">
            <Mail className="size-4" />
            إرسال الرابط
          </Button>
        </form>

        <div className="mt-8 flex justify-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-primary-soft text-3xl">
            ✉️
          </span>
        </div>

        <p className="mt-6 text-sm">
          <Link to="/auth/login" className="text-primary hover:underline">
            العودة إلى تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

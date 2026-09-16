import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import robot from "@/assets/ai-robot.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

const examples = [
  "ما هو أفضل وقت للتسوّق في دبي؟",
  "كم يساوي 750 دولارًا بالليرة التركية؟",
  "احسب تكلفة رحلة 5 أيام إلى إسطنبول",
  "قارن سعر iPhone 16 بين السعودية وأمريكا",
];

export const Route = createFileRoute("/ai")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "مساعد الذكاء الاصطناعي — Quantora" },
      {
        name: "description",
        content: "اسأل مساعد Quantora عن أي حساب أو تحويل أو مقارنة أسعار واحصل على إجابة فورية.",
      },
      { property: "og:title", content: "مساعد الذكاء الاصطناعي — Quantora" },
      {
        property: "og:description",
        content: "مساعد عربي ذكي للحسابات والتحويلات ومقارنة الأسعار.",
      },
    ],
  }),
  component: AiPage,
});

function AiPage() {
  const { q } = Route.useSearch();
  const [text, setText] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (error) => {
      console.error(error);
      toast.error("تعذّر الحصول على إجابة الآن. حاول مرة أخرى بعد قليل.");
    },
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (q && messages.length === 0) {
      void sendMessage({ text: q });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || busy) return;
    setText("");
    void sendMessage({ text: trimmed });
  };

  return (
    <div className="bg-hero-gradient min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-center">
          <img
            src={robot}
            alt="مساعد Quantora الذكي"
            width={816}
            height={816}
            className="mx-auto size-32 drop-shadow-xl md:size-40"
          />
          <h1 className="mt-4 font-display text-3xl font-bold">مساعد الذكاء الاصطناعي</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            اسأل عن أي شيء: حسابات، تحويلات، أسعار، وتخطيط رحلات.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border bg-card p-4 shadow-soft">
          {messages.length > 0 ? (
            <Conversation className="max-h-[52vh]">
              <ConversationContent>
                {(messages as UIMessage[]).map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent"
                      }
                    >
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          message.role === "user" ? (
                            <span key={index}>{part.text}</span>
                          ) : (
                            <MessageResponse key={index}>{part.text}</MessageResponse>
                          )
                        ) : null,
                      )}
                    </MessageContent>
                  </Message>
                ))}
                {status === "submitted" ? <Shimmer>يفكّر…</Shimmer> : null}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          ) : null}

          <PromptInput
            className="mt-2"
            onSubmit={(_message, event) => {
              event.preventDefault();
              send(text);
            }}
          >
            <PromptInputTextarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب سؤالك هنا…"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!text.trim() && !busy} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="mt-8">
          <p className="text-center text-sm font-semibold text-muted-foreground">أمثلة للأسئلة</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {examples.map((example) => (
              <Button
                key={example}
                variant="outline"
                className="h-auto justify-start rounded-2xl bg-card px-4 py-3 text-start text-sm whitespace-normal"
                onClick={() => send(example)}
                disabled={busy}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

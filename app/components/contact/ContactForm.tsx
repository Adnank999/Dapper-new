"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlowingCards, { GlowingCard } from "../glowing-card-cards";
import NeonBorder from "../NeonBorder";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "message" | null
  >(null);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactValues) {
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <GlowingCards
      enableGlow
      glowRadius={55}
      glowOpacity={1}
      gap="1.5rem"
      responsive
    >
      <GlowingCard
        glowColor="#720e9e"
        className="   w-full mx-auto max-w-5xl
    rounded-3xl shadow-2xl
    px-6 py-8 md:px-12 md:py-12
    min-h-[320px] md:min-h-[400px]
    flex items-start

    bg-white/70 border border-slate-200 text-slate-900
    dark:bg-black/90 dark:border-white/10 dark:text-white
    backdrop-blur-md"
      >
        <div className="w-full max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <NeonBorder
                          animationType="static"
                          duration={0}
                          isActive={focusedField === "name"}
                        >
                          <Input
                            className="border-none h-10"
                            placeholder="Your name"
                            {...field}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </NeonBorder>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <NeonBorder
                          animationType="static"
                          duration={0}
                          isActive={focusedField === "email"}
                        >
                          <Input
                            className="border-none h-10"
                            placeholder="you@example.com"
                            {...field}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </NeonBorder>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <NeonBorder
                        animationType="static"
                        duration={0}
                        isActive={focusedField === "message"}
                        className="h-full w-full"
                      >
                        <div className="w-full">
                          <Textarea
                            placeholder="Write your message..."
                            className="w-full min-h-[120px] md:min-h-[160px] px-4 py-3 text-base md:text-lg leading-relaxed resize-none border-none"
                            {...field}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </NeonBorder>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={status === "sending"}
                  className="
                    h-12 px-8 rounded-sm font-semibold tracking-wide
                    bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white
                    shadow-[0_12px_30px_-12px_rgba(168,85,247,0.9)]
                    transition-all duration-200
                    hover:scale-[1.03] hover:shadow-[0_18px_45px_-14px_rgba(168,85,247,1)]
                    active:scale-[0.97]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2
                    disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed
                  "
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </Button>

                {status === "sent" && (
                  <p className="text-sm text-emerald-500">Message sent!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Try again.
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </GlowingCard>
    </GlowingCards>
  );
}

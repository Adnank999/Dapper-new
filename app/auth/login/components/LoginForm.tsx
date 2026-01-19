"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NeonBorder from "@/app/components/NeonBorder";
import { useState } from "react";
import GlowingCards, { GlowingCard } from "@/app/components/glowing-card-cards";
import { authClient } from "@/src/lib/auth-client";


export function LoginForm() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const { data, error } = await authClient.signIn.email(
      { email, password, callbackURL: "/" },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          // You can rely on callbackURL, or redirect manually:
          window.location.href = "/";
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Invalid credentials");
          setIsPending(false);
        },
      }
    );

    // If your version doesn't always trigger onSuccess, handle fallback:
    if (!error) {
      window.location.href = "/";
      return;
    }

    setIsPending(false);
  }

  return (
    <div>
      <div className="relative z-10">
        <GlowingCards enableGlow glowRadius={55} glowOpacity={1} animationDuration={200} gap="1.5rem" responsive>
          <GlowingCard
            glowColor="#720e9e"
            className="min-h-8 flex items-center justify-center border-transparent hover:border-red-500 bg-black w-full mx-auto max-w-sm shadow-2xl p-6 rounded-xl"
          >
            <div className="relative z-10 w-full space-y-6">
              <h2 className="text-lg font-bold text-center text-white">Welcome Back</h2>
              <p className="text-center text-gray-200/80 text-sm">
                Enter your credentials to access your account
              </p>

              {/* ✅ client submit */}
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white/90 font-medium">
                      Email Address
                    </Label>

                    <NeonBorder animationType="static" duration={0} isActive={isEmailFocused}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none text-white placeholder:text-white/40"
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                      />
                    </NeonBorder>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white/90 font-medium">
                        Password
                      </Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs text-blue-300 hover:text-blue-200 transition-colors duration-300 underline underline-offset-2"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <NeonBorder animationType="static" duration={0} isActive={isPasswordFocused}>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none text-white placeholder:text-white/40"
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                      />
                    </NeonBorder>
                  </div>

                  {/* ✅ error */}
                  {error ? (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-200/80">Don't have an account? </span>
                <Link
                  href="/auth/signup"
                  className="text-blue-300 hover:text-blue-200 transition-colors duration-300 underline underline-offset-2 font-medium"
                >
                  Create one now
                </Link>
              </div>
            </div>
          </GlowingCard>
        </GlowingCards>
      </div>
    </div>
  );
}

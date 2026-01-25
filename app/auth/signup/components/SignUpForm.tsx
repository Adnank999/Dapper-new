"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import GlowingCards, { GlowingCard } from "@/app/components/glowing-card-cards";
import { useState } from "react";
import NeonBorder from "@/app/components/NeonBorder";
import { StarButton } from "@/app/components/StarButton";
import { authClient } from "@/src/lib/auth-client";


export function SignUpForm() {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);

    const firstName = String(form.get("first-name") || "").trim();
    const lastName = String(form.get("last-name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    const name = `${firstName} ${lastName}`.trim() || email.split("@")[0] || "User";

    if (!email || !password) return setErrorMsg("Email and password are required");
    if (password.length < 6) return setErrorMsg("Password must be at least 6 characters");
    if (password !== confirmPassword) return setErrorMsg("Passwords do not match");

    // optional image url (you don't have an input right now)
    const image: string | undefined = undefined;

    setLoading(true);

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          // you can also setLoading(true) here, but we already did
        },
        onSuccess: () => {
          // If your flow requires email verification, Better Auth may redirect after verification.
          // You can also do: window.location.href = "/auth/login";
        },
        onError: (ctx) => {
          setErrorMsg(ctx.error.message);
        },
      }
    );

    setLoading(false);

    // If no error and you want immediate redirect now:
    if (!error) {
      // If signup logs user in automatically, go dashboard:
      window.location.href = "/";
      // otherwise go login:
      // window.location.href = "/auth/login";
    }
  }

  return (
    <GlowingCards enableGlow glowRadius={70} glowOpacity={1} animationDuration={200} gap="1.5rem" responsive>
      <GlowingCard
        glowColor="#720e9e"
        className="min-h-8 flex items-center justify-center border-transparent bg-black w-full mx-auto max-w-sm shadow-2xl p-6 rounded-xl"
      >
        <div className="relative z-10 w-full space-y-6">
          <h1 className="text-xl font-bold text-center">Create Account</h1>
          <p className="text-center text-gray-200/80 text-sm">Join today and get started</p>

          {/* ✅ client submit */}
          <form onSubmit={onSubmit}>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="first-name" className="text-white/90 font-medium">
                    First name
                  </Label>
                  <NeonBorder duration={0} animationType="static" isActive={isFirstNameFocused}>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="John"
                      required
                      className="size-full h-10 rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                      onFocus={() => setIsFirstNameFocused(true)}
                      onBlur={() => setIsFirstNameFocused(false)}
                    />
                  </NeonBorder>
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="last-name" className="text-white/90 font-medium">
                    Last name
                  </Label>
                  <NeonBorder duration={0} animationType="static" isActive={isLastNameFocused}>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      placeholder="Doe"
                      required
                      className="size-full h-10 rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                      onFocus={() => setIsLastNameFocused(true)}
                      onBlur={() => setIsLastNameFocused(false)}
                    />
                  </NeonBorder>
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email" className="text-white/90 font-medium">
                  Email Address
                </Label>
                <NeonBorder duration={0} animationType="static" isActive={isEmailFocused}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="size-full h-10 rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </NeonBorder>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
                </Label>
                <NeonBorder duration={0} animationType="static" isActive={isPasswordFocused}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="size-full h-10 rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </NeonBorder>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="confirm-password" className="text-white/90 font-medium">
                  Confirm Password
                </Label>
                <NeonBorder duration={0} animationType="static" isActive={isPasswordFocused}>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter your confirm password"
                    required
                    className="size-full h-10 rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </NeonBorder>
              </div>

              {/* ✅ show errors */}
              {errorMsg ? <p className="text-sm text-red-400">{errorMsg}</p> : null}

              <StarButton type="submit" label={loading ? "Creating..." : "Create Account"} disabled={loading} />
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-200/80">Already have an account? </span>
            <Link
              href="/auth/login"
              className="text-red-300 hover:text-red-200 transition-colors duration-300 underline underline-offset-4 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </GlowingCard>
    </GlowingCards>
  );
}

"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import GlowingCards, { GlowingCard } from "@/app/components/glowing-card-cards";
import { useState } from "react";
import NeonBorder from "@/app/components/NeonBorder";
import { StarButton } from "@/app/components/StarButton";

import { signup } from "@/lib/auth-actions";

export function SignUpForm() {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  return (
    <GlowingCards
      enableGlow={true}
      glowRadius={70}
      glowOpacity={1}
      animationDuration={200}
      gap="1.5rem"
      responsive={true}
    >
      <GlowingCard
        glowColor="#720e9e" // Choose a custom glow color for the form
        className="min-h-8 flex items-center justify-center border-transparent bg-black w-full mx-auto max-w-sm shadow-2xl p-6 rounded-xl"
      >
        <div className="relative z-10 w-full space-y-6">
          <h1 className="text-xl font-bold text-center ">Create Account</h1>
          <p className="text-center text-gray-200/80 text-sm">
            Join today and get started
          </p>

          <form action="">
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label
                    htmlFor="first-name"
                    className="text-white/90 font-medium"
                  >
                    First name
                  </Label>
                  <NeonBorder
                    animation-type="none"
                    duration={0}
                    animationType="static"
                    isActive={isFirstNameFocused}
                  >
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="John"
                      required
                      className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                      onFocus={() => setIsFirstNameFocused(true)}
                      onBlur={() => setIsFirstNameFocused(false)}
                    />
                  </NeonBorder>
                </div>
                <div className="grid gap-1">
                  <Label
                    htmlFor="last-name"
                    className="text-white/90 font-medium"
                  >
                    Last name
                  </Label>
                  <NeonBorder
                    animation-type="none"
                    duration={0}
                    animationType="static"
                    isActive={isLastNameFocused}
                  >
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      placeholder="John"
                      required
                      className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
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
                <NeonBorder
                  animation-type="none"
                  duration={0}
                  animationType="static"
                  isActive={isEmailFocused}
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </NeonBorder>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
                </Label>
                <NeonBorder
                  animationType="static"
                  duration={0}
                  isActive={isPasswordFocused}
                >
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </NeonBorder>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="confirm-password" className="text-white/90 font-medium">
                  Confirm Password
                </Label>
                <NeonBorder
                  animationType="static"
                  duration={0}
                  isActive={isPasswordFocused}
                >
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter your confirm password"
                    required
                    className="size-full rounded-lg px-4 text-sm bg-transparent focus:outline-none border border-slate-800 focus:border-none"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </NeonBorder>
              </div>

              <StarButton
                type="submit"
                formAction={signup}
                label="Create Account"
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-300/80">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-200/80">Already have an account? </span>
            <Link
              href="/login"
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

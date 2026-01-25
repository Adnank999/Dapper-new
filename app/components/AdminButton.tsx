"use client";

import { Button } from "@/components/ui/button";
import {  useRouter } from "next/navigation";

export function AdminButton({
  redirectTo,
  className,
}: {
  redirectTo?: string; 
  className?: string;
}) {
  const router = useRouter();


  return (
    <Button
      type="button"
      variant="outline"
      className={
        className ??
        "border border-gray-300 text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 px-6 py-3 cursor-pointer"
      }
      onClick={() => router.push(redirectTo)}
    >
      Dashboard
    </Button>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function LoginButton({
  redirectTo,
  className,
}: {
  redirectTo?: string; // optional override
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // include current query string so user returns to exact page
  const current =
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

  const next = encodeURIComponent(redirectTo ?? current ?? "/");

  return (
    <Button
      type="button"
      variant="outline"
      className={
        className ??
        "border border-gray-300 text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 px-6 py-3 cursor-pointer"
      }
      onClick={() => router.push(`/auth/login?next=${next}`)}
    >
      Login
    </Button>
  );
}

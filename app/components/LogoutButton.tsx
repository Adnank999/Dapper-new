"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";

export function LogoutButton({
  redirectTo = "/auth/login",
}: {
  redirectTo?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Prefer callback-style if your version supports it
      await authClient.signOut(
        {},
        {
          onSuccess: () => {
            router.replace(redirectTo);
            router.refresh();
          },
          onError: (ctx) => {
            alert(ctx.error.message);
            setLoading(false);
          },
        }
      );
    } catch (e: any) {
      // Fallback for versions that don't use callbacks reliably
      console.error(e);
      setLoading(false);
      alert(e?.message ?? "Failed to logout");
    } finally {
      // If callbacks didn't run, still navigate away
      // (only if still loading = true)
      // Small safeguard: if signOut succeeded but callbacks didn't fire
      if (loading) {
        router.replace(redirectTo);
        router.refresh();
      }
    }
  };

  return (
    <Button type="button" onClick={onLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

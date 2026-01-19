"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);

    const { error } = await authClient.signOut(
      {},
      {
        onSuccess: () => {
          // redirect after logout
          window.location.href = "/auth/login"; // or "/"
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setLoading(false);
        },
      }
    );

    // fallback if callbacks aren't triggered by your version
    if (!error) window.location.href = "/auth/login";
    else setLoading(false);
  };

  return (
    <Button type="button" onClick={onLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/src/lib/auth-client"; 
import {User as typeUser} from "@/types/user"

type User = typeUser;

export function useCurrentUser() {
  const [user, setUser] = useState<User| null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const session = await authClient.getSession();
    setUser((session as any)?.data?.user ?? null);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetchSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const onFocus = () => fetchSession();
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    loading,
    isLoggedIn: !!user,
    refresh: fetchSession, // ✅ manual refresh when you want
  };
}

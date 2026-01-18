"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState = { error?: string };

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
    // credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.message ?? "Invalid credentials" };
  }
  redirect("/");
}


export async function signup(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // Call your API route (or do DB logic directly here)
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message ?? "Registration failed");
  }

  // Optional: auto-login after register
  // await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {...})

  redirect("/auth/login"); // or redirect("/dashboard") if you auto-login
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token"); 
  redirect("/auth/login");
}



// export async function signInWithGoogle() {

//   const { data, error } = await supabase?.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: redirectUrl,
//       queryParams: {
//         access_type: "offline",
//         prompt: "consent",
//       },
//     },
//   });



//   if (error) {
//     console.log(error);
//     redirect("/error");
//   }


  
//   if (data.url) {
//     redirect(data.url); // use the redirect API for your server framework
//   }
// }

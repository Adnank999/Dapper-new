// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwt } from "@/src/lib/jwt";
// import { cookies } from "next/headers";
// import { decrypt } from "./src/lib/session";

// const RULES: Array<{ prefix: string; roles?: string[] }> = [
//   { prefix: "/about" }, // logged-in users
//   { prefix: "/admin", roles: ["admin"] }, // admin only
// ];

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const rule = RULES.find((r) => pathname.startsWith(r.prefix));
//   if (!rule) return NextResponse.next();

//   const cookieStore = await cookies();
//   console.log("cookieStore",cookieStore)
//   const token = (await cookies()).get("session")?.value;
//   const session = await decrypt(token);
//   // const session = await verifyJwt(token);
//   console.log("token v", token);
//   console.log("session", session);
//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/auth/login";
//     return NextResponse.redirect(url);
//   }

//   try {
//     const user = await verifyJwt(token);

//     if (rule.roles && !rule.roles.some((r) => user.roles?.includes(r as any))) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/403";
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
//   } catch {
//     const url = req.nextUrl.clone();
//     url.pathname = "/auth/login";
//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: ["/about/:path*", "/admin/:path*"],
// };


import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./src/lib/session"

export default async function proxy(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value
  const session = await decrypt(cookie)

  console.log("middleware session", session)
  return NextResponse.next()
}

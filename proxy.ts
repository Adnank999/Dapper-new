import { NextRequest, NextResponse } from "next/server";
import { auth } from "./src/lib/auth"; // adjust if your auth path differs

export async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  // Not logged in
  if (!session?.user) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login"; // change if needed
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Logged in but not admin
  const roles = (session.user as any).roles as string[] | undefined;
  const isAdmin = Array.isArray(roles) && roles.includes("admin");

  if (!isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = "/403"; // change if needed
    return NextResponse.redirect(url);
    // or: return new NextResponse("Forbidden", { status: 403 });
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

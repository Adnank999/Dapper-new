import { NextResponse } from "next/server";
import { getDb } from "@/src/lib/mongodb";
import { verifyPassword } from "@/src/lib/password";
// import { signJwt, Role } from "@/src/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
import { createSession, decrypt, encrypt } from "@/src/lib/session";
import { Role } from "@/types/session-payload";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string"
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const roles = (user.roles ?? ["user"]) as Role[];

  const res = NextResponse.json({ ok: true });

  // await createSession({
  //   sub: user._id.toString(),
  //   email: email,
  //   roles: roles,
  // });

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  console.log("session in login",session)

  return res;
}

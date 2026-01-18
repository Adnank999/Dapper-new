import { getDb } from "@/src/lib/mongodb";
import { hashPassword } from "@/src/lib/password";
import { createSession } from "@/src/lib/session";
import { NextResponse } from "next/server";

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

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 chars" },
      { status: 400 },
    );
  }

  const db = await getDb();
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(password);

  const result = await users.insertOne({
    email,
    passwordHash,
    roles: ["user"],
    createdAt: new Date(),
  });

  const res = NextResponse.json(
    { ok: true, userId: result.insertedId.toString() },
    { status: 201 },
  );

  await createSession(res, {
    sub: result.insertedId.toString(),
    email,
    roles: ["user"],
  });

  return res;
}

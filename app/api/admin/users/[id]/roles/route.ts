import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/src/lib/mongodb";
import { getCurrentUser } from "@/src/lib/auth";
import { hasAnyRole } from "@/src/lib/rbac";
import type { Role } from "@/src/lib/jwt";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!hasAnyRole(me, ["admin"])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { roles } = await req.json();

  if (!Array.isArray(roles) || roles.some((r) => !["user", "admin", "editor"].includes(r))) {
    return NextResponse.json({ message: "Invalid roles" }, { status: 400 });
  }

  const userId = params.id;
  if (!ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { roles: roles as Role[] } }
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}

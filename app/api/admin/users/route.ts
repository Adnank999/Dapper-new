import { NextResponse } from "next/server";
import { getDb } from "@/src/lib/mongodb";
import { getCurrentUser } from "@/src/lib/auth";
import { hasAnyRole } from "@/src/lib/rbac";

export async function GET() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!hasAnyRole(me, ["admin"])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const db = await getDb();
  const users = await db
    .collection("users")
    .find({}, { projection: { passwordHash: 0 } })
    .limit(50)
    .toArray();

  return NextResponse.json({ users }, { status: 200 });
}

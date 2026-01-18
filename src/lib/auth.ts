import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";

export async function getCurrentUser() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    return await verifyJwt(token);
  } catch {
    return null;
  }
}

// import { SignJWT, jwtVerify } from "jose";

// const secretStr = process.env.JWT_SECRET;
// if (!secretStr) throw new Error("Missing JWT_SECRET");
// const secret = new TextEncoder().encode(secretStr);

// export type Role = "user" | "admin" | "editor";

// export type JwtPayload = {
//   sub: string;       // userId
//   email: string;
//   roles: Role[];
// };

// export async function signJwt(payload: JwtPayload) {
//   return new SignJWT(payload as unknown as Record<string, unknown>)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(secret);
// }

// export async function verifyJwt(token: string) {
//   const { payload } = await jwtVerify(token, secret);
//   // payload contains: sub, email, roles, iat, exp
//   return payload as unknown as JwtPayload & { iat: number; exp: number };
// }

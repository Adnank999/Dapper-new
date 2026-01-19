// import { cookies } from "next/headers";
// import { verifyJwt } from "./jwt";

// export async function getCurrentUser() {
//   const token = cookies().get("token")?.value;
//   if (!token) return null;

//   try {
//     return await verifyJwt(token);
//   } catch {
//     return null;
//   }
// }

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      roles: { type: "string[]", defaultValue: ["user"] },
    },
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL!, 
  ],
});

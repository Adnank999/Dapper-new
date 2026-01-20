import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, client } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      roles: { type: "string[]", defaultValue: ["user"] },
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
});

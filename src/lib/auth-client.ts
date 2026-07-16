import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        userRole: {
          type: "string",
        },
        verifiedWriter: {
          type: "boolean",
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

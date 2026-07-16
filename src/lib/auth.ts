import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClient) {
    (global as any)._mongoClient = new MongoClient(process.env.MONGODB_URI!);
  }
  client = (global as any)._mongoClient;
} else {
  client = new MongoClient(process.env.MONGODB_URI!);
}

const db = client.db("NextMart");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      userRole: {
        type: "string",
        defaultValue: "user",
      },
      verifiedWriter: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.userRole || "user",
            },
          };
        },
      },
    },
  },
  plugins: [admin()],
});

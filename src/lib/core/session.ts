import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
}

export async function getUserToken() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
}

export async function requireRole(allowedRole: string) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== allowedRole) {
    redirect("/unauthorized");
  }

  return user;
}

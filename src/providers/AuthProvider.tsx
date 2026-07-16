"use client";

import { TAuthContext } from "@/types/auth";
import { TUser } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role:
            (session.user as any).userRole ||
            (session.user as any).role ||
            "user",
          verifiedReporter: (session.user as any).verifiedWriter || false,
          image: session.user.image || undefined,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [session, isPending]);

  async function logout() {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

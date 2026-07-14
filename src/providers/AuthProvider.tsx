"use client";

import { TAuthContext } from "@/types/auth";
import { TUser } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function logout() {
    try {
      await fetch(`${SERVER_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
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

"use client";

import { useAuth } from "@/hooks/useAuth";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Verifying access..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-background">
      <DashboardSidebar userRole={user.role} />
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

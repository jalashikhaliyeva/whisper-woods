"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from "@/components/admin/AdminLogin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    setIsAuthenticated(adminToken === "admin-authenticated-2024");
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminToken", "admin-authenticated-2024");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-5 h-5 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex">
        <AdminSidebar onLogout={handleLogout} />
        <main className="flex-1 p-8 lg:p-12 overflow-auto">
          <div className="max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

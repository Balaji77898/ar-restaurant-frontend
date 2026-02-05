"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { isAuthenticated } from "@/app/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#FBF6EE" }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #7B1F1F, #3B0A0D)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
      }}
    >
      {/* HEADER */}
      <div
        className="px-6 py-5 text-lg font-semibold border-b"
        style={{
          borderColor: "rgba(200,169,81,0.4)",
          fontFamily: "var(--font-heading)",
          color: "#FFFFFF",
        }}
      >
        Super Admin
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
        <SidebarItem
          label="Dashboard"
          href="/dashboard"
          active={pathname === "/dashboard"}
        />
        <SidebarItem
          label="Restaurants"
          href="/dashboard/restaurants"
          active={pathname.startsWith("/dashboard/restaurants")}
        />
        <SidebarItem
          label="Owners"
          href="/dashboard/owners"
          active={pathname.startsWith("/dashboard/owners")}
        />
        <SidebarItem
          label="Analytics"
          href="/dashboard/analytics"
          active={pathname.startsWith("/dashboard/analytics")}
        />
        <SidebarItem
          label="Settings"
          href="/dashboard/settings"
          active={pathname.startsWith("/dashboard/settings")}
        />
      </nav>

      {/* FOOTER */}
      <div
        className="px-4 py-4 text-xs border-t"
        style={{
          borderColor: "rgba(200,169,81,0.4)",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        Logged in as <br />
        <span className="font-medium text-white">Super Admin</span>
      </div>
    </aside>
  );
}

function SidebarItem({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg transition relative"
      style={{
        color: "#FFFFFF",
        backgroundColor: active ? "rgba(200,169,81,0.15)" : "transparent",
        boxShadow: active
          ? "inset 3px 0 0 #C8A951"
          : "none",
      }}
    >
      <span
        style={{
          color: active ? "#C8A951" : "#FFFFFF",
          fontWeight: active ? 500 : 400,
        }}
      >
        {label}
      </span>
    </Link>
  );
}

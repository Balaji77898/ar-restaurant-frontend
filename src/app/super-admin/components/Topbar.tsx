"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    // 🔥 Remove token
    localStorage.removeItem("superadmin_token");

    // 🔁 Redirect to login
    router.replace("/login");
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#C8A951",
      }}
    >
      <h1
        className="text-lg font-semibold"
        style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
      >
        Dashboard
      </h1>

      <div className="flex items-center gap-6 text-sm">
        <span className="text-[#7B1F1F]">System Logs</span>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md text-sm font-medium border transition"
          style={{
            borderColor: "#C8A951",
            color: "#3B0A0D",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

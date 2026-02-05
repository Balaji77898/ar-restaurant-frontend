"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type OwnerStatus = "Active" | "Suspended";

type Owner = {
  id: number;
  name: string;
  email: string;
  phone: string;
  restaurantsCount: number;
  status: OwnerStatus;
};

/* ---------------- PAGE ---------------- */

export default function OwnersPage() {
  const router = useRouter();

  const [owners, setOwners] = useState<Owner[]>([
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      phone: "9876543210",
      restaurantsCount: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Sharma",
      email: "neha@gmail.com",
      phone: "9988776655",
      restaurantsCount: 1,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@gmail.com",
      phone: "9123456789",
      restaurantsCount: 1,
      status: "Suspended",
    },
  ]);

  /* ---------------- ACTIONS ---------------- */

  const toggleStatus = (id: number) => {
    setOwners((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: o.status === "Active" ? "Suspended" : "Active",
            }
          : o
      )
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1
          className="text-xl font-semibold"
          style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
        >
          Owners
        </h1>
        <p className="text-sm text-[#7B1F1F]">
          View and manage restaurant owners on the platform
        </p>
      </div>

      {/* TABLE */}
      <div
        className="bg-white rounded-xl overflow-hidden border"
        style={{
          borderColor: "#C8A951",
          boxShadow: "0 0 20px rgba(200,169,81,0.4)",
        }}
      >
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#FBF6EE" }}>
            <tr className="text-left font-semibold text-[#3B0A0D]">
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Restaurants</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y" style={{ borderColor: "#C8A951" }}>
            {owners.map((o) => (
              <tr key={o.id} className="hover:bg-[#FBF6EE]">

                <td className="px-6 py-5 font-medium text-[#3B0A0D]">
                  {o.name}
                </td>

                <td className="px-6 py-5 text-[#7B1F1F]">
                  {o.email}
                </td>

                <td className="px-6 py-5 text-[#7B1F1F]">
                  {o.phone}
                </td>

                <td className="px-6 py-5 text-[#7B1F1F]">
                  {o.restaurantsCount}
                </td>

                <td className="px-6 py-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        o.status === "Active"
                          ? "rgba(200,169,81,0.25)"
                          : "rgba(155,43,43,0.15)",
                      color:
                        o.status === "Active"
                          ? "#3B0A0D"
                          : "#7B1F1F",
                    }}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">

                    {/* VIEW */}
                    <button
                      onClick={() =>
                        router.push(`/dashboard/owners/${o.id}`)
                      }
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: "#7B1F1F" }}
                    >
                      View
                    </button>

                    {/* SUSPEND / ACTIVATE */}
                    <button
                      onClick={() => toggleStatus(o.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border"
                      style={{
                        borderColor: "#C8A951",
                        color: "#3B0A0D",
                      }}
                    >
                      {o.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

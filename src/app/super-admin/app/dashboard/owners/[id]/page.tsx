"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

/* ---------------- TYPES ---------------- */

type Status = "Active" | "Suspended";
type RestaurantStatus = "Active" | "Inactive";

type Restaurant = {
  id: number;
  name: string;
  city: string;
  status: RestaurantStatus;
};

type Owner = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
  joinedOn: string;
  restaurants: Restaurant[];
};

/* ---------------- MOCK DATA ---------------- */

const OWNERS: Owner[] = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@gmail.com",
    phone: "9876543210",
    status: "Active",
    joinedOn: "10 Jan 2024",
    restaurants: [
      {
        id: 1,
        name: "Spice Delight",
        city: "Bangalore",
        status: "Active",
      },
      {
        id: 4,
        name: "Spice Delight Express",
        city: "Bangalore",
        status: "Inactive",
      },
    ],
  },
  {
    id: 2,
    name: "Neha Sharma",
    email: "neha@gmail.com",
    phone: "9988776655",
    status: "Active",
    joinedOn: "18 Jan 2024",
    restaurants: [
      {
        id: 2,
        name: "Urban Diner",
        city: "Mumbai",
        status: "Active",
      },
    ],
  },
];

/* ---------------- PAGE ---------------- */

export default function OwnerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const ownerData = OWNERS.find((o) => o.id === id);

  if (!ownerData) {
    return (
      <p className="text-sm font-medium" style={{ color: "#7B1F1F" }}>
        Owner not found
      </p>
    );
  }

  const [owner, setOwner] = useState(ownerData);

  const toggleOwnerStatus = () => {
    setOwner((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Suspended" : "Active",
    }));
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1
            className="text-xl font-semibold"
            style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
          >
            {owner.name}
          </h1>
          <p className="text-sm text-[#7B1F1F]">
            Owner Details
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/owners")}
          className="px-4 py-2 rounded-md text-sm font-medium border"
          style={{ borderColor: "#C8A951", color: "#3B0A0D" }}
        >
          ← Back
        </button>
      </div>

      {/* OWNER OVERVIEW */}
      <Section title="Owner Information">
        <Info label="Name" value={owner.name} />
        <Info label="Email" value={owner.email} />
        <Info label="Phone" value={owner.phone} />
        <Info label="Joined On" value={owner.joinedOn} />
        <Info label="Status">
          <StatusBadge status={owner.status} />
        </Info>
      </Section>

      {/* LINKED RESTAURANTS */}
      <Section title="Linked Restaurants">
        <div
          className="bg-white rounded-lg overflow-hidden border"
          style={{ borderColor: "#C8A951" }}
        >
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#FBF6EE" }}>
              <tr className="text-left font-semibold text-[#3B0A0D]">
                <th className="px-5 py-3">Restaurant</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y" style={{ borderColor: "#C8A951" }}>
              {owner.restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-[#FBF6EE]">
                  <td className="px-5 py-4 font-medium text-[#3B0A0D]">
                    {r.name}
                  </td>
                  <td className="px-5 py-4 text-[#7B1F1F]">
                    {r.city}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          r.status === "Active"
                            ? "rgba(200,169,81,0.25)"
                            : "rgba(155,43,43,0.15)",
                        color:
                          r.status === "Active"
                            ? "#3B0A0D"
                            : "#7B1F1F",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/restaurants/${r.id}`)
                      }
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: "#7B1F1F" }}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* PLATFORM ACTIONS */}
      <Section title="Platform Actions">
        <button
          onClick={toggleOwnerStatus}
          className="px-4 py-2 rounded-md text-sm font-medium border"
          style={{
            borderColor: "#C8A951",
            color: "#3B0A0D",
          }}
        >
          {owner.status === "Active"
            ? "Suspend Owner"
            : "Activate Owner"}
        </button>
      </Section>

    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-xl p-5 border"
      style={{
        borderColor: "#C8A951",
        boxShadow: "0 0 16px rgba(200,169,81,0.4)",
      }}
    >
      <h2 className="text-sm font-semibold text-[#3B0A0D] mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#7B1F1F] font-medium">
        {label}
      </span>
      <span className="text-[#3B0A0D] font-semibold">
        {value ?? children}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor:
          status === "Active"
            ? "rgba(200,169,81,0.25)"
            : "rgba(155,43,43,0.15)",
        color: status === "Active" ? "#3B0A0D" : "#7B1F1F",
      }}
    >
      {status}
    </span>
  );
}

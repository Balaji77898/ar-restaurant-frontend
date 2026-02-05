"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

/* ---------------- TYPES ---------------- */

type Status = "Active" | "Inactive";

type Restaurant = {
  id: string;
  restaurantName: string;
  restaurantType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;

  gstRegistered: "Yes" | "No";
  gstNumber: string;
  gstPercent: string;

  billingMode: "Counter" | "Table" | "Both";
  tablesCount: string;
  qrEnabled: "Yes" | "No";

  status: Status;
  createdOn: string;
  lastActive: string;
};

/* ---------------- MOCK DATA ---------------- */

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    restaurantName: "Spice Delight",
    restaurantType: "Restaurant",
    address: "12 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",

    ownerName: "Ravi Kumar",
    ownerEmail: "ravi@gmail.com",
    ownerPhone: "9876543210",

    gstRegistered: "Yes",
    gstNumber: "29ABCDE1234F1Z5",
    gstPercent: "5",

    billingMode: "Both",
    tablesCount: "12",
    qrEnabled: "Yes",

    status: "Active",
    createdOn: "12 Jan 2024",
    lastActive: "Today, 10:32 AM",
  },
];

/* ---------------- PAGE ---------------- */

export default function ManageRestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const restaurant = RESTAURANTS.find((r) => r.id === id);
  if (!restaurant) {
    return <p className="text-red-700 font-medium">Restaurant not found</p>;
  }

  const [data, setData] = useState<Restaurant>(restaurant);

  const [editRestaurant, setEditRestaurant] = useState(false);
  const [editOwner, setEditOwner] = useState(false);
  const [editGST, setEditGST] = useState(false);
  const [editOps, setEditOps] = useState(false);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1
            className="text-xl font-semibold"
            style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
          >
            {data.restaurantName}
          </h1>
          <p className="text-sm text-[#7B1F1F]">
            {data.city}, {data.state}
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/restaurants")}
          className="px-4 py-2 rounded-md text-sm font-medium border"
          style={{ borderColor: "#C8A951", color: "#3B0A0D" }}
        >
          ← Back
        </button>
      </div>

      {/* OVERVIEW */}
      <Section title="Overview">
        <Info label="Created On" value={data.createdOn} />
        <Info label="Last Active" value={data.lastActive} />
        <Info label="Status">
          <StatusBadge status={data.status} />
        </Info>
      </Section>

      {/* RESTAURANT INFO */}
      <Section title="Restaurant Information" action={<EditBtn onClick={() => setEditRestaurant(!editRestaurant)} />}>
        <Editable label="Type" value={data.restaurantType} editing={editRestaurant}
          onChange={(v) => setData({ ...data, restaurantType: v })} />
        <Editable label="Address" value={data.address} editing={editRestaurant}
          onChange={(v) => setData({ ...data, address: v })} />
        <Editable label="City" value={data.city} editing={editRestaurant}
          onChange={(v) => setData({ ...data, city: v })} />
        <Editable label="State" value={data.state} editing={editRestaurant}
          onChange={(v) => setData({ ...data, state: v })} />
        <Editable label="Pincode" value={data.pincode} editing={editRestaurant}
          onChange={(v) => setData({ ...data, pincode: v })} />
      </Section>

      {/* OWNER */}
      <Section title="Owner Details" action={<EditBtn onClick={() => setEditOwner(!editOwner)} />}>
        <Editable label="Owner Name" value={data.ownerName} editing={editOwner}
          onChange={(v) => setData({ ...data, ownerName: v })} />
        <Editable label="Owner Email" value={data.ownerEmail} editing={editOwner}
          onChange={(v) => setData({ ...data, ownerEmail: v })} />
        <Editable label="Owner Phone" value={data.ownerPhone} editing={editOwner}
          onChange={(v) => setData({ ...data, ownerPhone: v })} />
      </Section>

      {/* GST */}
      <Section title="GST & Tax" action={<EditBtn onClick={() => setEditGST(!editGST)} />}>
        <Editable label="GST Registered" value={data.gstRegistered} editing={editGST}
          onChange={(v) => setData({ ...data, gstRegistered: v as any })} />
        {data.gstRegistered === "Yes" && (
          <>
            <Editable label="GST Number" value={data.gstNumber} editing={editGST}
              onChange={(v) => setData({ ...data, gstNumber: v })} />
            <Editable label="GST %" value={`${data.gstPercent}%`} editing={editGST}
              onChange={(v) => setData({ ...data, gstPercent: v.replace("%", "") })} />
          </>
        )}
      </Section>

      {/* OPERATIONS */}
      <Section title="Operations" action={<EditBtn onClick={() => setEditOps(!editOps)} />}>
        <Editable label="Billing Mode" value={data.billingMode} editing={editOps}
          onChange={(v) => setData({ ...data, billingMode: v as any })} />
        {data.billingMode !== "Counter" && (
          <Editable label="Tables" value={data.tablesCount} editing={editOps}
            onChange={(v) => setData({ ...data, tablesCount: v })} />
        )}
        <Editable label="QR Ordering Enabled" value={data.qrEnabled} editing={editOps}
          onChange={(v) => setData({ ...data, qrEnabled: v as any })} />
      </Section>

      {/* QR MANAGEMENT */}
      <Section title="QR Management">
        <div className="flex gap-6 items-center">
          <div
            className="w-36 h-36 flex items-center justify-center text-xs border border-dashed"
            style={{ borderColor: "#C8A951", color: "#7B1F1F" }}
          >
            QR Preview
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: "#7B1F1F" }}
            >
              Generate / Regenerate QR
            </button>

            <button
              className="px-4 py-2 rounded-md text-sm font-medium border"
              style={{ borderColor: "#C8A951", color: "#3B0A0D" }}
            >
              Download QR
            </button>
          </div>
        </div>
      </Section>

      {/* DANGER ZONE */}
      <Section title="Danger Zone">
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-md bg-yellow-100 text-yellow-800">
            {data.status === "Active" ? "Deactivate Restaurant" : "Activate Restaurant"}
          </button>

          <button className="px-4 py-2 rounded-md bg-red-100 text-red-800">
            Remove Restaurant
          </button>
        </div>
      </Section>

    </div>
  );
}

/* ---------------- UI ---------------- */

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 border bg-white"
      style={{ borderColor: "#C8A951", boxShadow: "0 0 16px rgba(200,169,81,0.4)" }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#3B0A0D]">
          {title}
        </h2>
        {action}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#7B1F1F] font-medium">{label}</span>
      <span className="text-[#3B0A0D] font-semibold">
        {value ?? children}
      </span>
    </div>
  );
}

function Editable({ label, value, editing, onChange }: { label: string; value: string; editing: boolean; onChange: (v: string) => void }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#7B1F1F] font-medium">{label}</span>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-2 py-1 rounded text-sm w-48 bg-white border"
          style={{ borderColor: "#C8A951", color: "#3B0A0D" }}
        />
      ) : (
        <span className="text-[#3B0A0D] font-semibold">{value}</span>
      )}
    </div>
  );
}

function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm font-medium transition"
      style={{ color: "#7B1F1F" }}
    >
      {/* Pencil Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>

      Edit
    </button>
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

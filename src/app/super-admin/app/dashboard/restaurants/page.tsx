"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

type Status = "ACTIVE" | "INACTIVE";

type Restaurant = {
  id: string;
  name: string;
  owner_name: string | null;
  city: string;
  status: Status;
};

type FormState = {
  restaurantName: string;
  restaurantType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
};

/* ================= PAGE ================= */

export default function RestaurantsPage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  /* ---------- LOAD TOKEN ---------- */
  useEffect(() => {
    const t = localStorage.getItem("superadmin_token");
    if (!t) {
      router.push("/login");
      return;
    }
    setToken(t);
  }, [router]);

  /* ---------- FETCH RESTAURANTS ---------- */
  const fetchRestaurants = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/super-admin/restaurants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch restaurants");
      }

      setRestaurants(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [token]);

  if (loading) {
    return <p className="text-[#7B1F1F]">Loading restaurants...</p>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#3B0A0D]">
            Restaurants
          </h1>
          <p className="text-sm text-[#7B1F1F]">
            Manage all onboarded restaurants
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{
            backgroundColor: "#7B1F1F",
            boxShadow: "0 0 12px rgba(176,48,48,0.8)",
          }}
        >
          + Add Restaurant
        </button>
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
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id} className="hover:bg-[#FBF6EE]">
                <td className="px-6 py-4 font-semibold text-[#3B0A0D]">
                  {r.name}
                </td>
                <td className="px-6 py-4 text-[#7B1F1F]">
                  {r.owner_name || "—"}
                </td>
                <td className="px-6 py-4 text-[#7B1F1F]">
                  {r.city}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        r.status === "ACTIVE"
                          ? "rgba(200,169,81,0.25)"
                          : "rgba(155,43,43,0.15)",
                      color:
                        r.status === "ACTIVE"
                          ? "#3B0A0D"
                          : "#7B1F1F",
                    }}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">
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

      {showAdd && (
        <AddRestaurantModal
          token={token!}
          onClose={() => setShowAdd(false)}
          onSuccess={fetchRestaurants}
        />
      )}
    </>
  );
}

/* ================= MODAL ================= */

function AddRestaurantModal({
  token,
  onClose,
  onSuccess,
}: {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormState>({
    restaurantName: "",
    restaurantType: "Restaurant",
    address: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const update = (k: keyof FormState, v: string) =>
    setForm({ ...form, [k]: v });

  const submit = async () => {
    if (!form.restaurantName || !form.city || !form.ownerName) {
      alert("Please fill required fields");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        "http://localhost:5000/api/super-admin/onboard-restaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            restaurant: {
              name: form.restaurantName,
              restaurantType: form.restaurantType,
              address: form.address,
              city: form.city,
              state: form.state,
              pincode: form.pincode,
              status: "INACTIVE",
            },
            admin: {
              name: form.ownerName,
              email: form.ownerEmail,
              phone: form.ownerPhone,
              password: "Temp@123",
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Onboarding failed");
      }

      onClose();
      onSuccess();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-6 text-[#3B0A0D]">
          Restaurant Onboarding
        </h2>

        <Section title="Restaurant Information">
          <Input label="Restaurant Name *" value={form.restaurantName} onChange={(v) => update("restaurantName", v)} />
          <Input label="Restaurant Type" value={form.restaurantType} onChange={(v) => update("restaurantType", v)} />
          <Input label="Address" value={form.address} onChange={(v) => update("address", v)} />
          <Input label="City *" value={form.city} onChange={(v) => update("city", v)} />
        </Section>

        <Section title="Owner Information">
          <Input label="Owner Name *" value={form.ownerName} onChange={(v) => update("ownerName", v)} />
          <Input label="Owner Email" value={form.ownerEmail} onChange={(v) => update("ownerEmail", v)} />
          <Input label="Owner Phone" value={form.ownerPhone} onChange={(v) => update("ownerPhone", v)} />
        </Section>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="text-[#7B1F1F]">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#7B1F1F" }}
          >
            {saving ? "Saving..." : "Complete Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-lg p-4 mb-5"
      style={{ borderColor: "#C8A951" }}
    >
      <h3 className="text-sm font-semibold text-[#3B0A0D] mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-[#7B1F1F]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md text-sm border"
        style={{ borderColor: "#C8A951" }}
      />
    </div>
  );
}

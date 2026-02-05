"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ---------------- MOCK DATA ---------------- */

const stats = {
  totalRestaurants: 128,
  activeRestaurants: 112,
  inactiveRestaurants: 16,
  totalOwners: 95,
};

const topRestaurants = [
  { name: "Spice Delight", city: "Bangalore", orders: 1240 },
  { name: "Urban Diner", city: "Mumbai", orders: 980 },
  { name: "Cafe Aroma", city: "Ahmedabad", orders: 760 },
  { name: "Royal Treat", city: "Delhi", orders: 640 },
];

/* ---------------- PAGE ---------------- */

export default function AnalyticsPage() {
  const chartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [
          stats.activeRestaurants,
          stats.inactiveRestaurants,
        ],
        backgroundColor: ["#7B1F1F", "rgba(200,169,81,0.35)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1
          className="text-xl font-semibold"
          style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
        >
          Analytics
        </h1>
        <p className="text-sm text-[#7B1F1F]">
          Platform-wide insights and performance overview
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Restaurants" value={stats.totalRestaurants} />
        <StatCard title="Active Restaurants" value={stats.activeRestaurants} />
        <StatCard title="Inactive Restaurants" value={stats.inactiveRestaurants} />
        <StatCard title="Total Owners" value={stats.totalOwners} />
      </div>

      {/* CHART + TOP RESTAURANTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* STATUS CHART */}
        <div
          className="bg-white rounded-xl p-6 border"
          style={{
            borderColor: "#C8A951",
            boxShadow: "0 0 18px rgba(200,169,81,0.4)",
          }}
        >
          <h2 className="text-sm font-semibold text-[#3B0A0D] mb-4">
            Restaurant Status
          </h2>

          <div className="h-64 flex items-center justify-center">
            <Doughnut data={chartData} />
          </div>

          <p className="text-xs text-[#7B1F1F] mt-4 text-center">
            Majority of restaurants on the platform are active
          </p>
        </div>

        {/* TOP RESTAURANTS */}
        <div
          className="bg-white rounded-xl p-6 border"
          style={{
            borderColor: "#C8A951",
            boxShadow: "0 0 18px rgba(200,169,81,0.4)",
          }}
        >
          <h2 className="text-sm font-semibold text-[#3B0A0D] mb-4">
            Top Restaurants
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-semibold text-[#7B1F1F]">
                <th className="pb-3">Restaurant</th>
                <th className="pb-3">City</th>
                <th className="pb-3 text-right">Orders</th>
              </tr>
            </thead>

            <tbody className="divide-y" style={{ borderColor: "#C8A951" }}>
              {topRestaurants.map((r) => (
                <tr key={r.name} className="hover:bg-[#FBF6EE]">
                  <td className="py-3 font-medium text-[#3B0A0D]">
                    {r.name}
                  </td>
                  <td className="py-3 text-[#7B1F1F]">
                    {r.city}
                  </td>
                  <td className="py-3 text-right font-semibold text-[#3B0A0D]">
                    {r.orders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-xs text-[#7B1F1F] mt-4">
            Spice Delight is currently the highest-performing restaurant.
          </p>
        </div>

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="bg-white rounded-xl p-5 border"
      style={{
        borderColor: "#C8A951",
        boxShadow: "0 0 16px rgba(200,169,81,0.4)",
      }}
    >
      <p className="text-sm text-[#7B1F1F] mb-1">
        {title}
      </p>
      <p className="text-2xl font-semibold text-[#3B0A0D]">
        {value}
      </p>
    </div>
  );
}

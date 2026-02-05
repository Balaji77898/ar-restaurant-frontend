"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PARCEL_CHARGE = 20;

export default function OrderStatusPage() {
  const router = useRouter();
  const [currentCart, setCurrentCart] = useState<any[]>([]);
  const [customer, setCustomer] = useState({ name: "", mobile: "", table: "" });
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
      label: "Order Placed", 
      icon: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
      description: "Your order has been received"
    },
    { 
      label: "Preparing", 
      icon: "M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z",
      description: "Chef is preparing your dishes"
    },
    { 
      label: "Ready", 
      icon: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
      description: "Your order is ready to serve"
    },
    { 
      label: "Completed", 
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      description: "Enjoy your meal!"
    }
  ];

  useEffect(() => {
    const name = localStorage.getItem("customerName") || "Guest";
    const mobile = localStorage.getItem("customerMobile") || "";
    const table = localStorage.getItem("tableNumber") || "1";

    const currentKey = `cart_${table}_${name}`;
    const storedCart = JSON.parse(localStorage.getItem(currentKey) || "[]");

    const ordersKey = `allOrders_${table}_${name}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");

    setCustomer({ name, mobile, table });
    setCurrentCart(storedCart);
    setAllOrders(orders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const subtotal = (cart: any[]) => cart.reduce(
    (sum, item) => sum + item.price * item.qty + (item.parcel ? PARCEL_CHARGE * item.qty : 0), 0
  );

  const gst = (amount: number) => amount * 0.05;
  const total = (amount: number) => amount + gst(amount);

  const handleContinue = () => router.push("/customer/menu");
  const handleDone = () => router.push("/customer/scan-qr");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF6EE] via-[#F5EFE0] to-[#FBF6EE] pb-32">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#5D1616] via-[#7B1F1F] to-[#5D1616] rounded-b-3xl shadow-2xl mb-6 p-6 animate-slide-down">
        <div className="flex items-center justify-center gap-3">
          <svg className="w-8 h-8 text-[#C8A951]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <h1 className="text-3xl font-bold text-white text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Order Tracking
          </h1>
        </div>
      </div>

      {/* CURRENT ORDER PROGRESS */}
      {currentCart.length > 0 && (
        <section className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 mx-4 mb-6 border-2 border-[#C8A951]/30 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <h2 className="text-xl font-bold text-[#5D1616]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Live Order Status
            </h2>
          </div>

          {/* STEPPER - Desktop */}
          <div className="hidden sm:flex justify-between items-center relative mb-8">
            <div className="absolute top-8 left-16 right-16 h-1 bg-[#E8DCC8] z-0 rounded-full">
              <div
                className="h-1 bg-gradient-to-r from-[#7B1F1F] to-[#C8A951] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              return (
                <div key={index} className="flex flex-col items-center relative z-10 flex-1">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-br from-[#7B1F1F] to-[#5D1616] shadow-xl scale-110"
                        : isActive
                        ? "bg-gradient-to-br from-[#C8A951] to-[#D4B76E] shadow-2xl scale-125 animate-pulse-glow"
                        : "bg-white border-4 border-[#E8DCC8]"
                    }`}
                  >
                    <svg className={`w-8 h-8 ${isCompleted || isActive ? 'text-white' : 'text-[#C8A951]'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d={step.icon} />
                    </svg>
                  </div>
                  <span className={`text-sm text-center font-semibold max-w-[100px] ${isCompleted || isActive ? "text-[#5D1616]" : "text-gray-500"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {step.label}
                  </span>
                  <span className={`text-xs text-center max-w-[120px] mt-1 ${isActive ? "text-[#7B1F1F]" : "text-gray-400"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {isActive && step.description}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEPPER - Mobile */}
          <div className="sm:hidden space-y-4 mb-6">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-br from-[#7B1F1F] to-[#5D1616] shadow-lg"
                        : isActive
                        ? "bg-gradient-to-br from-[#C8A951] to-[#D4B76E] shadow-xl animate-pulse-glow"
                        : "bg-white border-4 border-[#E8DCC8]"
                    }`}
                  >
                    <svg className={`w-7 h-7 ${isCompleted || isActive ? 'text-white' : 'text-[#C8A951]'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d={step.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isCompleted || isActive ? "text-[#5D1616]" : "text-gray-500"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {step.label}
                    </p>
                    <p className="text-xs text-[#7B1F1F]/60" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {step.description}
                    </p>
                    {isActive && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-[#C8A951] rounded-full animate-ping" />
                        <span className="text-xs text-[#C8A951] font-semibold">In Progress...</span>
                      </div>
                    )}
                    {isCompleted && <span className="text-xs text-green-600 font-semibold">✓ Completed</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#C8A951]/10 to-[#D4B76E]/10 rounded-xl border-2 border-[#C8A951]/30">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              <p className="text-sm text-[#5D1616] font-semibold text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Payment: <span className="text-[#C8A951]">Pay at Counter</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CUSTOMER DETAILS */}
      <section className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 mx-4 mb-6 border-2 border-[#C8A951]/30 animate-slide-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <h2 className="text-lg font-bold text-[#5D1616]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Guest Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#C8A951]/5 to-[#D4B76E]/5 rounded-lg border border-[#C8A951]/20">
            <svg className="w-5 h-5 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <div>
              <p className="text-xs text-[#7B1F1F]/60">Name</p>
              <p className="font-bold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>{customer.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#C8A951]/5 to-[#D4B76E]/5 rounded-lg border border-[#C8A951]/20">
            <svg className="w-5 h-5 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div>
              <p className="text-xs text-[#7B1F1F]/60">Mobile</p>
              <p className="font-bold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>{customer.mobile}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#C8A951]/5 to-[#D4B76E]/5 rounded-lg border border-[#C8A951]/20">
            <svg className="w-5 h-5 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z"/>
            </svg>
            <div>
              <p className="text-xs text-[#7B1F1F]/60">Table</p>
              <p className="font-bold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>#{customer.table}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT ORDER */}
      {currentCart.length > 0 && (
        <section className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 mx-4 mb-6 border-2 border-[#C8A951]/30 animate-slide-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <h2 className="text-lg font-bold text-[#5D1616]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Current Order
            </h2>
          </div>
          <div className="space-y-2 mb-4">
            {currentCart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-[#C8A951]/5 to-transparent rounded-lg hover:from-[#C8A951]/10 transition-colors duration-300">
                <span className="font-semibold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.name} × {item.qty}
                </span>
                <span className="font-bold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ₹{(item.price * item.qty + (item.parcel ? PARCEL_CHARGE * item.qty : 0)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 bg-gradient-to-br from-[#C8A951]/10 via-[#D4B76E]/10 to-[#C8A951]/10 rounded-xl border-2 border-[#C8A951]/40">
            <div className="space-y-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <div className="flex justify-between text-[#5D1616]">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal(currentCart).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5D1616]">
                <span>GST (5%)</span>
                <span className="font-semibold">₹{gst(subtotal(currentCart)).toFixed(2)}</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C8A951]/50 to-transparent my-2" />
              <div className="flex justify-between font-bold text-xl text-[#5D1616]">
                <span>Total</span>
                <span>₹{total(subtotal(currentCart)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PREVIOUS ORDERS */}
      {allOrders.length > 0 && (
        <section className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 mx-4 mb-6 border-2 border-[#C8A951]/30 animate-slide-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            <h2 className="text-lg font-bold text-[#5D1616]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order History
            </h2>
          </div>
          {allOrders.slice().reverse().map(order => (
            <div key={order.id} className="mb-3 border-2 border-[#C8A951]/30 rounded-xl p-4 bg-gradient-to-br from-white to-[#FBF6EE]/50 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#7B1F1F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <p className="text-xs text-[#7B1F1F]/60" style={{ fontFamily: "'Poppins', sans-serif" }}>{order.date}</p>
              </div>
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <span className="text-[#5D1616]">{item.name} × {item.qty}</span>
                  <span className="font-semibold text-[#5D1616]">₹{(item.price * item.qty + (item.parcel ? PARCEL_CHARGE * item.qty : 0)).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t-2 border-[#C8A951]/30 flex justify-between font-bold text-[#5D1616]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* FOOTER BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-[#C8A951]/50 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-50">
        <button
          onClick={handleContinue}
          className="flex-1 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #C8A951, #D4B76E)",
            color: "#2D0A0F"
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2D0A0F">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add More Items
        </button>
        <button
          onClick={handleDone}
          className="flex-1 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #059669, #047857)"
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          Complete
        </button>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700&display=swap');

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 169, 81, 0.5); }
          50% { box-shadow: 0 0 40px rgba(200, 169, 81, 0.8); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
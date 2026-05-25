"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Truck, Package, MapPin, Clock } from "lucide-react";

const STAGES = [
  { key: "placed", label: "Order Placed", icon: CheckCircle, done: true, sub: "Today, 10:42 AM" },
  { key: "packed", label: "Packed", icon: Package, done: true, sub: "Mumbai Warehouse" },
  { key: "shipped", label: "Shipped", icon: Truck, done: true, sub: "Via Bluedart · AWB BD-189827" },
  { key: "out", label: "Out for Delivery", icon: MapPin, done: false, sub: "Expected today by 7 PM" },
  { key: "delivered", label: "Delivered", icon: Clock, done: false, sub: "" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);

  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
      />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        Track Your Order
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!orderId.trim()) {
            toast.error("Enter your order ID");
            return;
          }
          setTracked(orderId.trim().toUpperCase());
        }}
        className="bg-white border border-tk-gray-lt rounded-xl p-5 max-w-2xl"
      >
        <label className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
          Order ID (e.g. TK-123456)
        </label>
        <div className="flex gap-2">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="TK-123456"
            className="flex-1 h-11 px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red font-poppins"
          />
          <Button type="submit" variant="primary">
            Track
          </Button>
        </div>
        <p className="text-xs text-tk-gray mt-2 font-poppins">
          You'll find your order ID in our WhatsApp confirmation, or in the
          email we sent after checkout.
        </p>
      </form>

      {tracked && (
        <div className="mt-8 bg-white border border-tk-gray-lt rounded-xl p-5 max-w-2xl">
          <div className="flex items-baseline justify-between">
            <h2 className="font-fredoka uppercase text-lg text-tk-black">
              Order {tracked}
            </h2>
            <span className="text-xs text-tk-gray font-poppins">
              Estimated delivery: today by 7 PM
            </span>
          </div>

          <ol className="mt-5 space-y-4">
            {STAGES.map((s, i) => (
              <li key={s.key} className="flex items-start gap-3">
                <div
                  className={
                    "h-9 w-9 grid place-items-center rounded-full shrink-0 " +
                    (s.done
                      ? "bg-tk-green text-white"
                      : "bg-tk-gray-lt text-tk-gray")
                  }
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div
                    className={
                      "font-fredoka uppercase " +
                      (s.done ? "text-tk-black" : "text-tk-gray")
                    }
                  >
                    {s.label}
                  </div>
                  {s.sub && (
                    <div className="text-xs text-tk-gray font-poppins">
                      {s.sub}
                    </div>
                  )}
                </div>
                {i < STAGES.length - 1 && (
                  <div className="hidden md:block w-px bg-tk-gray-lt h-8" />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

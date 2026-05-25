"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, Package, Truck, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { key: "placed",    label: "Order Placed",       icon: CheckCircle2, done: true,  sub: "Today, 10:42 AM",              progress: 20  },
  { key: "packed",    label: "Packed",              icon: Package,      done: true,  sub: "Mumbai Warehouse",             progress: 40  },
  { key: "shipped",   label: "Shipped",             icon: Truck,        done: true,  sub: "Via Bluedart · AWB BD-189827", progress: 60  },
  { key: "out",       label: "Out for Delivery",    icon: MapPin,       done: false, sub: "Expected today by 7 PM",       progress: 80  },
  { key: "delivered", label: "Delivered",           icon: Clock,        done: false, sub: "",                             progress: 100 },
];

const currentProgress = STAGES.filter((s) => s.done).length / STAGES.length * 100;

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
          toast.success("Order found!", { description: `Showing status for ${orderId.trim().toUpperCase()}` });
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
          Find your order ID in the WhatsApp confirmation or email after checkout.
        </p>
      </form>

      {tracked && (
        <div className="mt-8 bg-white border border-tk-gray-lt rounded-xl p-5 max-w-2xl space-y-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-fredoka uppercase text-lg text-tk-black">
              Order {tracked}
            </h2>
            <span className="text-xs text-tk-gray font-poppins bg-tk-offwhite px-2 py-1 rounded-full">
              Est. delivery: today by 7 PM
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-[10px] font-poppins text-tk-gray mb-1.5">
              <span>Placed</span>
              <span>Delivered</span>
            </div>
            <Progress
              value={currentProgress}
              className="h-2 bg-tk-gray-lt [&>div]:bg-tk-red"
            />
            <p className="text-xs font-poppins text-tk-gray mt-1.5">
              {currentProgress.toFixed(0)}% complete — out for delivery soon
            </p>
          </div>

          <Separator />

          {/* Stage list */}
          <ol className="space-y-4">
            {STAGES.map((s, i) => (
              <li key={s.key} className="flex items-start gap-3">
                <div
                  className={cn(
                    "h-9 w-9 grid place-items-center rounded-full shrink-0 transition-colors",
                    s.done
                      ? "bg-tk-red text-white"
                      : "bg-tk-gray-lt text-tk-gray"
                  )}
                >
                  {s.done ? (
                    <s.icon className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div
                    className={cn(
                      "font-fredoka uppercase text-sm",
                      s.done ? "text-tk-black" : "text-tk-gray"
                    )}
                  >
                    {s.label}
                  </div>
                  {s.sub && (
                    <div className="text-xs text-tk-gray font-poppins mt-0.5">
                      {s.sub}
                    </div>
                  )}
                </div>
                {s.done && (
                  <CheckCircle2 className="h-4 w-4 text-tk-red shrink-0 mt-1" />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

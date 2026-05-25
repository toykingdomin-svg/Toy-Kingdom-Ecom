"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  useCartStore,
  selectTotalItems,
  selectTotalMRP,
  selectSubtotal,
  selectCouponDiscount,
  selectTotalDiscount,
  selectDelivery,
  selectGrandTotal,
} from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "10-digit mobile"),
  email: z.string().email("Valid email"),
  pincode: z.string().regex(/^\d{6}$/, "6-digit PIN"),
  address: z.string().min(5, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  payment: z.enum(["upi", "card", "cod"]),
});

type FormData = z.infer<typeof schema>;

export function CheckoutView() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalMRP = useCartStore(selectTotalMRP);
  const subtotal = useCartStore(selectSubtotal);
  const couponDiscount = useCartStore(selectCouponDiscount);
  const totalDiscount = useCartStore(selectTotalDiscount);
  const delivery = useCartStore(selectDelivery);
  const grandTotal = useCartStore(selectGrandTotal);
  const coupon = useCartStore((s) => s.appliedCoupon);
  const clearCart = useCartStore((s) => s.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { payment: "upi" },
  });

  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl">🎉</div>
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4">
          Order Placed!
        </h2>
        <p className="font-poppins text-tk-gray mt-2">
          We'll send order updates on WhatsApp & email. Order #TK-
          {Math.floor(100000 + Math.random() * 900000)}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-tk-red text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk mt-6"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-tk-offwhite text-tk-gold mb-4">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="font-fredoka uppercase text-2xl text-tk-black">
          Nothing to Checkout
        </h2>
        <p className="text-tk-gray font-poppins mt-2">
          Your bag is empty. Add some toys first.
        </p>
        <Link
          href="/collection/all"
          className="inline-flex items-center bg-tk-red text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk mt-5"
        >
          Browse Toys
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    // Simulate place-order request
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Order placed successfully!");
    clearCart();
    setPlaced(true);
    // Could navigate to /orders here in a real app
  };

  const field =
    "h-11 w-full px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white font-poppins text-sm";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
    >
      <div className="space-y-6">
        {/* Address */}
        <div className="bg-white rounded-xl border border-tk-gray-lt p-5">
          <h3 className="font-fredoka uppercase text-tk-black mb-4">
            1. Shipping Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Full Name" error={errors.fullName?.message}>
              <input {...register("fullName")} className={field} placeholder="Your name" />
            </Field>
            <Field label="Phone (+91)" error={errors.phone?.message}>
              <input
                {...register("phone")}
                inputMode="numeric"
                maxLength={10}
                className={field}
                placeholder="98765 43210"
              />
            </Field>
            <Field label="Email" error={errors.email?.message} className="sm:col-span-2">
              <input
                type="email"
                {...register("email")}
                className={field}
                placeholder="you@email.com"
              />
            </Field>
            <Field label="Pincode" error={errors.pincode?.message}>
              <input
                {...register("pincode")}
                inputMode="numeric"
                maxLength={6}
                className={field}
                placeholder="400003"
              />
            </Field>
            <Field label="City" error={errors.city?.message}>
              <input {...register("city")} className={field} placeholder="Mumbai" />
            </Field>
            <Field label="State" error={errors.state?.message}>
              <input {...register("state")} className={field} placeholder="Maharashtra" />
            </Field>
            <Field
              label="Address (House no, Street, Area)"
              error={errors.address?.message}
              className="sm:col-span-2"
            >
              <input
                {...register("address")}
                className={field}
                placeholder="Flat 12, Maple Apartments, Andheri West"
              />
            </Field>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border border-tk-gray-lt p-5">
          <h3 className="font-fredoka uppercase text-tk-black mb-4">
            2. Payment Method
          </h3>
          <RadioGroup
            defaultValue="upi"
            onValueChange={(val) => register("payment").onChange({ target: { value: val, name: "payment" } })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {[
              { value: "upi",  label: "UPI",              icon: "📱" },
              { value: "card", label: "Credit/Debit Card", icon: "💳" },
              { value: "cod",  label: "Cash on Delivery",  icon: "💵" },
            ].map((opt) => (
              <Label
                key={opt.value}
                htmlFor={`pay-${opt.value}`}
                className="flex items-center gap-2 border border-tk-gray-lt rounded-lg p-3 cursor-pointer hover:border-tk-red has-[:checked]:border-tk-red has-[:checked]:bg-tk-red/5 transition-colors"
              >
                <RadioGroupItem
                  value={opt.value}
                  id={`pay-${opt.value}`}
                  className="text-tk-red border-tk-gray-lt"
                />
                <span className="text-lg">{opt.icon}</span>
                <span className="font-poppins text-sm font-medium text-tk-black">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
          <p className="text-xs text-tk-gray mt-3 font-poppins">
            This is a demo — no real payment is processed.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="bg-white border border-tk-gray-lt rounded-xl p-5 sticky top-24">
          <h3 className="font-fredoka uppercase text-tk-black mb-4">
            Order Summary
          </h3>
          <div className="space-y-2 text-sm font-poppins">
            <Row label={`MRP (${totalItems} items)`} value={formatPrice(totalMRP)} />
            <Row
              label="Discount"
              value={`- ${formatPrice(totalMRP - subtotal)}`}
              cls="text-tk-green"
            />
            {couponDiscount > 0 && (
              <Row
                label={`Coupon ${coupon?.code}`}
                value={`- ${formatPrice(couponDiscount)}`}
                cls="text-tk-green"
              />
            )}
            <Row
              label="Delivery"
              value={delivery === 0 ? "FREE ✓" : formatPrice(delivery)}
              cls={delivery === 0 ? "text-tk-green font-bold" : ""}
            />
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center">
            <span className="font-fredoka uppercase text-tk-black">Total</span>
            <span className="font-poppins font-bold text-lg">
              {formatPrice(grandTotal)}
            </span>
          </div>
          {totalDiscount > 0 && (
            <div className="mt-3 bg-green-50 text-tk-green text-xs font-poppins p-2 rounded">
              🎉 You save {formatPrice(totalDiscount)}!
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </Button>
          <Link
            href="/cart/bag"
            className="block text-center text-xs text-tk-red hover:underline mt-3"
          >
            ← Back to Bag
          </Link>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-tk-red mt-1">{error}</span>}
    </label>
  );
}

function Row({
  label,
  value,
  cls = "",
}: {
  label: string;
  value: string;
  cls?: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-tk-gray">{label}</span>
      <span className={cls}>{value}</span>
    </div>
  );
}


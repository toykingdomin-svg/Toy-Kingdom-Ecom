"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useCartStore,
  selectTotalMRP,
  selectSubtotal,
  selectCouponDiscount,
  selectTotalDiscount,
  selectDelivery,
  selectGrandTotal,
  selectTotalItems,
} from "@/store/cartStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";

export function CartSummary() {
  const [code, setCode] = useState("");
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalMRP = useCartStore(selectTotalMRP);
  const subtotal = useCartStore(selectSubtotal);
  const couponDiscount = useCartStore(selectCouponDiscount);
  const totalDiscount = useCartStore(selectTotalDiscount);
  const delivery = useCartStore(selectDelivery);
  const grandTotal = useCartStore(selectGrandTotal);
  const coupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  if (items.length === 0) return null;

  return (
    <div className="bg-white border border-tk-gray-lt rounded-lg p-5 sticky top-24">
      <h3 className="font-fredoka uppercase text-tk-black mb-4">Order Summary</h3>

      <div className="space-y-2 text-sm font-poppins">
        <Row label={`MRP (${totalItems} items)`} value={formatPrice(totalMRP)} />
        <Row
          label="Discount"
          value={`- ${formatPrice(totalMRP - subtotal)}`}
          valueClass="text-tk-green"
        />
        {couponDiscount > 0 && (
          <Row
            label={`Coupon (${coupon?.code})`}
            value={`- ${formatPrice(couponDiscount)}`}
            valueClass="text-tk-green"
          />
        )}
        <Row
          label="Delivery"
          value={delivery === 0 ? "FREE âœ“" : formatPrice(delivery)}
          valueClass={delivery === 0 ? "text-tk-green font-bold" : ""}
        />
      </div>

      <div className="border-t border-tk-gray-lt my-4" />

      <div className="flex justify-between items-center">
        <span className="font-fredoka uppercase text-tk-black">Total</span>
        <span className="font-poppins font-bold text-tk-black text-lg">
          {formatPrice(grandTotal)}
        </span>
      </div>
      {totalDiscount > 0 && (
        <div className="mt-3 bg-green-50 text-tk-green text-xs font-poppins p-2 rounded">
          ðŸŽ‰ You save {formatPrice(totalDiscount)} on this order!
        </div>
      )}

      {/* Coupon */}
      {coupon ? (
        <div className="mt-4 flex items-center justify-between bg-green-50 border border-tk-green/30 rounded-md p-2">
          <span className="text-sm font-poppins text-tk-green">
            âœ“ {coupon.code} applied
          </span>
          <button
            onClick={() => {
              removeCoupon();
              toast.success("Coupon removed");
            }}
            aria-label="Remove coupon"
            className="text-tk-gray hover:text-tk-red"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 h-10 px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red text-sm font-poppins"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const res = applyCoupon(code);
              if (res.ok) {
                toast.success(res.message);
                setCode("");
              } else toast.error(res.message);
            }}
          >
            Apply
          </Button>
        </div>
      )}

      <Link
        href="/checkout"
        className="mt-5 w-full inline-flex items-center justify-center bg-tk-red text-white h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk"
      >
        Proceed to Checkout
      </Link>

      <p className="text-[11px] text-tk-gray text-center mt-3">
        Try codes: <b>TK10</b> Â· <b>TK20</b> Â· <b>WELCOME15</b>
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-tk-gray">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}


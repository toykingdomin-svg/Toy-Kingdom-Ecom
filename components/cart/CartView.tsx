"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartView() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <div>
        <CartSummary />
      </div>
    </div>
  );
}

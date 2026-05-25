"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, PromoCode } from "@/types";
import promoCodes from "@/data/promoCodes.json";

interface CartState {
  items: CartItem[];
  appliedCoupon: PromoCode | null;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      addItem: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, product, qty }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQty: (productId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, qty } : i,
                ),
        })),
      clearCart: () => set({ items: [], appliedCoupon: null }),
      applyCoupon: (code) => {
        const promo = (promoCodes as PromoCode[]).find(
          (p) => p.code.toUpperCase() === code.toUpperCase(),
        );
        if (!promo) return { ok: false, message: "Invalid coupon code" };
        const subtotal = computeSubtotal(get().items);
        if (subtotal < promo.minOrder) {
          return {
            ok: false,
            message: `Add ₹${(promo.minOrder - subtotal).toLocaleString("en-IN")} more to use ${promo.code}`,
          };
        }
        set({ appliedCoupon: promo });
        return { ok: true, message: `Coupon ${promo.code} applied!` };
      },
      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    { name: "tk-cart" },
  ),
);

function computeSubtotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.product.price * i.qty, 0);
}

// ---- Selectors (derived state) ----
export const selectTotalItems = (s: CartState) =>
  s.items.reduce((n, i) => n + i.qty, 0);

export const selectTotalMRP = (s: CartState) =>
  s.items.reduce((n, i) => n + i.product.mrp * i.qty, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((n, i) => n + i.product.price * i.qty, 0);

export const selectCouponDiscount = (s: CartState) => {
  if (!s.appliedCoupon) return 0;
  const subtotal = selectSubtotal(s);
  const raw =
    s.appliedCoupon.type === "percent"
      ? (subtotal * s.appliedCoupon.value) / 100
      : s.appliedCoupon.value;
  const cap = s.appliedCoupon.maxDiscount ?? Infinity;
  return Math.min(raw, cap);
};

export const selectTotalDiscount = (s: CartState) =>
  selectTotalMRP(s) - selectSubtotal(s) + selectCouponDiscount(s);

export const selectDelivery = (s: CartState) => {
  const sub = selectSubtotal(s) - selectCouponDiscount(s);
  return sub >= 999 || sub === 0 ? 0 : 99;
};

export const selectGrandTotal = (s: CartState) => {
  const sub = selectSubtotal(s) - selectCouponDiscount(s);
  return sub + selectDelivery(s);
};

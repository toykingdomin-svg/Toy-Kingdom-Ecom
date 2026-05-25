"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((state) =>
          state.items.find((p) => p.id === product.id)
            ? { items: state.items.filter((p) => p.id !== product.id) }
            : { items: [...state.items, product] },
        ),
      addItem: (product) =>
        set((state) =>
          state.items.find((p) => p.id === product.id)
            ? state
            : { items: [...state.items, product] },
        ),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        })),
      isInWishlist: (productId) =>
        !!get().items.find((p) => p.id === productId),
      clear: () => set({ items: [] }),
    }),
    { name: "tk-wishlist" },
  ),
);

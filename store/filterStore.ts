"use client";

import { create } from "zustand";
import type { Product, SortBy } from "@/types";

interface FilterState {
  brands: string[];
  categories: string[];
  ageGroups: string[];
  genders: string[];
  priceRange: [number, number];
  minDiscount: number;
  sortBy: SortBy;
  toggleBrand: (b: string) => void;
  toggleCategory: (c: string) => void;
  toggleAgeGroup: (a: string) => void;
  toggleGender: (g: string) => void;
  setPriceRange: (r: [number, number]) => void;
  setMinDiscount: (d: number) => void;
  setSortBy: (s: SortBy) => void;
  clearAll: () => void;
}

const initial = {
  brands: [] as string[],
  categories: [] as string[],
  ageGroups: [] as string[],
  genders: [] as string[],
  priceRange: [0, 12000] as [number, number],
  minDiscount: 0,
  sortBy: "popularity" as SortBy,
};

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

export const useFilterStore = create<FilterState>((set) => ({
  ...initial,
  toggleBrand: (b) => set((s) => ({ brands: toggle(s.brands, b) })),
  toggleCategory: (c) => set((s) => ({ categories: toggle(s.categories, c) })),
  toggleAgeGroup: (a) => set((s) => ({ ageGroups: toggle(s.ageGroups, a) })),
  toggleGender: (g) => set((s) => ({ genders: toggle(s.genders, g) })),
  setPriceRange: (r) => set({ priceRange: r }),
  setMinDiscount: (d) => set({ minDiscount: d }),
  setSortBy: (s) => set({ sortBy: s }),
  clearAll: () => set({ ...initial }),
}));

export function applyFilters(
  products: Product[],
  state: Pick<
    FilterState,
    | "brands"
    | "categories"
    | "ageGroups"
    | "genders"
    | "priceRange"
    | "minDiscount"
    | "sortBy"
  >,
): Product[] {
  let result = products.filter((p) => {
    if (state.brands.length && !state.brands.includes(p.brandSlug)) return false;
    if (state.categories.length && !state.categories.includes(p.category)) return false;
    if (state.ageGroups.length && !state.ageGroups.includes(p.ageGroup)) return false;
    if (state.genders.length && !state.genders.includes(p.gender)) return false;
    if (p.price < state.priceRange[0] || p.price > state.priceRange[1]) return false;
    if (p.discount < state.minDiscount) return false;
    return true;
  });
  switch (state.sortBy) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "discount":
      result = [...result].sort((a, b) => b.discount - a.discount);
      break;
    case "new-arrival":
      result = [...result].sort(
        (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
      );
      break;
    case "popularity":
    default:
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return result;
}

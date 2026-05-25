"use client";

import { useFilterStore } from "@/store/filterStore";
import { SORT_OPTIONS } from "@/lib/constants";
import type { SortBy } from "@/types";

export function SortDropdown() {
  const sortBy = useFilterStore((s) => s.sortBy);
  const setSortBy = useFilterStore((s) => s.setSortBy);
  return (
    <label className="inline-flex items-center gap-2 text-sm font-poppins">
      <span className="text-tk-gray hidden sm:inline">Sort:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortBy)}
        className="h-9 px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

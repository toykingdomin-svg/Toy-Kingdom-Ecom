"use client";

import { X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import brands from "@/data/brands.json";
import categories from "@/data/categories.json";
import { AGE_GROUPS, GENDERS } from "@/lib/constants";

export function FilterChips() {
  const s = useFilterStore();
  const chips: { label: string; remove: () => void }[] = [];

  s.brands.forEach((b) => {
    const name = brands.find((x) => x.slug === b)?.name ?? b;
    chips.push({ label: name, remove: () => s.toggleBrand(b) });
  });
  s.categories.forEach((c) => {
    const name = categories.find((x) => x.id === c)?.label ?? c;
    chips.push({ label: name, remove: () => s.toggleCategory(c) });
  });
  s.ageGroups.forEach((a) => {
    const name = AGE_GROUPS.find((x) => x.value === a)?.label ?? a;
    chips.push({ label: name, remove: () => s.toggleAgeGroup(a) });
  });
  s.genders.forEach((g) => {
    const name = GENDERS.find((x) => x.value === g)?.label ?? g;
    chips.push({ label: name, remove: () => s.toggleGender(g) });
  });
  if (s.minDiscount > 0) {
    chips.push({
      label: `${s.minDiscount}%+ off`,
      remove: () => s.setMinDiscount(0),
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c, i) => (
        <button
          key={i}
          onClick={c.remove}
          className="inline-flex items-center gap-1 bg-tk-offwhite hover:bg-tk-red hover:text-white text-tk-black text-xs px-3 py-1.5 rounded-full transition-colors"
        >
          {c.label} <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={s.clearAll}
        className="text-xs text-tk-red hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}

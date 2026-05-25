"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import brands from "@/data/brands.json";
import categories from "@/data/categories.json";
import { AGE_GROUPS, GENDERS, DISCOUNT_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function Section({
  title,
  children,
  defaultOpen = true,
  count,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-tk-gray-lt py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between font-fredoka uppercase text-sm text-tk-black"
      >
        <span className="flex items-center gap-2">
          {title}
          {count ? (
            <span className="bg-tk-red text-white text-[10px] rounded-full px-1.5 h-4 grid place-items-center">
              {count}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-3 space-y-1.5">{children}</div>}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-poppins cursor-pointer text-tk-black hover:text-tk-red">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-tk-red"
      />
      {label}
    </label>
  );
}

export function FilterSidebar() {
  const s = useFilterStore();
  const [showAllBrands, setShowAllBrands] = useState(false);
  const brandsList = showAllBrands ? brands : brands.slice(0, 6);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-fredoka uppercase text-tk-black">Filter Toys</h3>
        <button
          onClick={s.clearAll}
          className="text-xs text-tk-red hover:underline font-poppins"
        >
          Clear All
        </button>
      </div>

      <Section title="Brand" count={s.brands.length}>
        {brandsList.map((b) => (
          <Checkbox
            key={b.slug}
            checked={s.brands.includes(b.slug)}
            onChange={() => s.toggleBrand(b.slug)}
            label={b.name}
          />
        ))}
        {brands.length > 6 && (
          <button
            onClick={() => setShowAllBrands((v) => !v)}
            className="text-xs text-tk-red hover:underline mt-1"
          >
            {showAllBrands ? "− Show Less" : "+ Show More"}
          </button>
        )}
      </Section>

      <Section title="Category" count={s.categories.length}>
        {categories.map((c) => (
          <Checkbox
            key={c.id}
            checked={s.categories.includes(c.id)}
            onChange={() => s.toggleCategory(c.id)}
            label={c.label}
          />
        ))}
      </Section>

      <Section title="Age Group" count={s.ageGroups.length}>
        {AGE_GROUPS.filter((a) => a.value !== "3-5").map((a) => (
          <Checkbox
            key={a.value}
            checked={s.ageGroups.includes(a.value)}
            onChange={() => s.toggleAgeGroup(a.value)}
            label={a.label}
          />
        ))}
      </Section>

      <Section title="Gender" count={s.genders.length}>
        {GENDERS.map((g) => (
          <Checkbox
            key={g.value}
            checked={s.genders.includes(g.value)}
            onChange={() => s.toggleGender(g.value)}
            label={g.label}
          />
        ))}
      </Section>

      <Section title="Price Range">
        <div className="flex items-center gap-2 text-sm font-poppins">
          <input
            type="number"
            min={0}
            value={s.priceRange[0]}
            onChange={(e) =>
              s.setPriceRange([Number(e.target.value || 0), s.priceRange[1]])
            }
            className="w-20 h-9 px-2 border border-tk-gray-lt rounded"
          />
          <span>to</span>
          <input
            type="number"
            min={0}
            value={s.priceRange[1]}
            onChange={(e) =>
              s.setPriceRange([s.priceRange[0], Number(e.target.value || 0)])
            }
            className="w-20 h-9 px-2 border border-tk-gray-lt rounded"
          />
        </div>
        <input
          type="range"
          min={0}
          max={12000}
          step={100}
          value={s.priceRange[1]}
          onChange={(e) =>
            s.setPriceRange([s.priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-tk-red mt-2"
        />
      </Section>

      <Section title="Discount" count={s.minDiscount > 0 ? 1 : 0}>
        {DISCOUNT_TIERS.map((d) => (
          <label
            key={d}
            className="flex items-center gap-2 text-sm font-poppins cursor-pointer text-tk-black hover:text-tk-red"
          >
            <input
              type="radio"
              name="discount"
              checked={s.minDiscount === d}
              onChange={() => s.setMinDiscount(d)}
              className="accent-tk-red"
            />
            {d}% and above
          </label>
        ))}
        {s.minDiscount > 0 && (
          <button
            onClick={() => s.setMinDiscount(0)}
            className="text-xs text-tk-red hover:underline mt-1"
          >
            Clear discount
          </button>
        )}
      </Section>
    </aside>
  );
}

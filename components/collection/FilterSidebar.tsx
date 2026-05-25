"use client";

import { useState } from "react";
import { useFilterStore } from "@/store/filterStore";
import brands from "@/data/brands.json";
import categories from "@/data/categories.json";
import { AGE_GROUPS, GENDERS, DISCOUNT_TIERS } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export function FilterSidebar() {
  const s = useFilterStore();
  const [showAllBrands, setShowAllBrands] = useState(false);
  const brandsList = showAllBrands ? brands : brands.slice(0, 6);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-fredoka uppercase text-tk-black text-sm">Filter Toys</h3>
        <button
          onClick={s.clearAll}
          className="text-xs text-tk-red hover:underline font-poppins"
        >
          Clear All
        </button>
      </div>

      <Accordion defaultValue={["brand", "category", "price"]} className="w-full">

        {/* Brand */}
        <AccordionItem value="brand">
          <AccordionTrigger className="font-fredoka uppercase text-sm text-tk-black py-3">
            Brand
            {s.brands.length > 0 && (
              <Badge className="ml-2 bg-tk-red text-white text-[10px] h-4 px-1.5 rounded-full">
                {s.brands.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-3">
            {brandsList.map((b) => (
              <div key={b.slug} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${b.slug}`}
                  checked={s.brands.includes(b.slug)}
                  onCheckedChange={() => s.toggleBrand(b.slug)}
                  className="border-tk-gray-lt data-[state=checked]:bg-tk-red data-[state=checked]:border-tk-red"
                />
                <Label
                  htmlFor={`brand-${b.slug}`}
                  className="text-sm font-poppins text-tk-black cursor-pointer hover:text-tk-red"
                >
                  {b.name}
                </Label>
              </div>
            ))}
            {brands.length > 6 && (
              <button
                onClick={() => setShowAllBrands((v) => !v)}
                className="text-xs text-tk-red hover:underline mt-1"
              >
                {showAllBrands ? "− Show Less" : `+ ${brands.length - 6} More`}
              </button>
            )}
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Category */}
        <AccordionItem value="category">
          <AccordionTrigger className="font-fredoka uppercase text-sm text-tk-black py-3">
            Category
            {s.categories.length > 0 && (
              <Badge className="ml-2 bg-tk-red text-white text-[10px] h-4 px-1.5 rounded-full">
                {s.categories.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-3">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${c.id}`}
                  checked={s.categories.includes(c.id)}
                  onCheckedChange={() => s.toggleCategory(c.id)}
                  className="border-tk-gray-lt data-[state=checked]:bg-tk-red data-[state=checked]:border-tk-red"
                />
                <Label
                  htmlFor={`cat-${c.id}`}
                  className="text-sm font-poppins text-tk-black cursor-pointer hover:text-tk-red"
                >
                  {c.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Age Group */}
        <AccordionItem value="age">
          <AccordionTrigger className="font-fredoka uppercase text-sm text-tk-black py-3">
            Age Group
            {s.ageGroups.length > 0 && (
              <Badge className="ml-2 bg-tk-red text-white text-[10px] h-4 px-1.5 rounded-full">
                {s.ageGroups.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pb-3">
            {AGE_GROUPS.filter((a) => a.value !== "3-5").map((a) => (
              <div key={a.value} className="flex items-center gap-2">
                <Checkbox
                  id={`age-${a.value}`}
                  checked={s.ageGroups.includes(a.value)}
                  onCheckedChange={() => s.toggleAgeGroup(a.value)}
                  className="border-tk-gray-lt data-[state=checked]:bg-tk-red data-[state=checked]:border-tk-red"
                />
                <Label
                  htmlFor={`age-${a.value}`}
                  className="text-sm font-poppins text-tk-black cursor-pointer hover:text-tk-red"
                >
                  {a.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Price Range — shadcn Slider */}
        <AccordionItem value="price">
          <AccordionTrigger className="font-fredoka uppercase text-sm text-tk-black py-3">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pb-4 px-1">
            <div className="flex justify-between text-xs font-poppins text-tk-gray mb-3">
              <span>{formatPrice(s.priceRange[0])}</span>
              <span>{formatPrice(s.priceRange[1])}</span>
            </div>
            <Slider
              min={0}
              max={12000}
              step={100}
              value={[s.priceRange[0], s.priceRange[1]]}
              onValueChange={(val: number | readonly number[]) => {
                const arr = Array.isArray(val) ? val : [val as number, val as number];
                s.setPriceRange([arr[0], arr[1]]);
              }}
              className="[&_[role=slider]]:bg-tk-red [&_[role=slider]]:border-tk-red [&_.range]:bg-tk-red"
            />
            <div className="flex justify-between text-[10px] font-poppins text-tk-gray mt-2">
              <span>₹0</span>
              <span>₹12,000</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Discount */}
        <AccordionItem value="discount">
          <AccordionTrigger className="font-fredoka uppercase text-sm text-tk-black py-3">
            Min Discount
            {s.minDiscount > 0 && (
              <Badge className="ml-2 bg-tk-red text-white text-[10px] h-4 px-1.5 rounded-full">
                {s.minDiscount}%+
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <RadioGroup
              value={String(s.minDiscount)}
              onValueChange={(val) => s.setMinDiscount(Number(val))}
              className="space-y-2"
            >
              {[0, ...DISCOUNT_TIERS].map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={String(d)}
                    id={`disc-${d}`}
                    className="border-tk-gray-lt text-tk-red"
                  />
                  <Label
                    htmlFor={`disc-${d}`}
                    className="text-sm font-poppins text-tk-black cursor-pointer"
                  >
                    {d === 0 ? "All discounts" : `${d}% and above`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </aside>
  );
}

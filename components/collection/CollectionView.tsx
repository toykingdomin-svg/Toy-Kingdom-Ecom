"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import { useFilterStore, applyFilters } from "@/store/filterStore";
import { FilterSidebar } from "./FilterSidebar";
import { FilterChips } from "./FilterChips";
import { SortDropdown } from "./SortDropdown";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filter as FilterIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 24;

export function CollectionView({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const filterState = useFilterStore();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(
    () => applyFilters(products, filterState),
    [
      products,
      filterState.brands,
      filterState.categories,
      filterState.ageGroups,
      filterState.genders,
      filterState.priceRange,
      filterState.minDiscount,
      filterState.sortBy,
    ],
  );

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filtered.length]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black">
                {title}
              </h1>
              <p className="text-sm text-tk-gray font-poppins">
                {filtered.length} products
              </p>
            </div>
            <SortDropdown />
          </div>

          <div className="mb-4">
            <FilterChips />
          </div>

          <ProductGrid products={filtered.slice(0, visible)} />

          {filtered.length > visible && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="border border-tk-red text-tk-red px-6 h-11 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red hover:text-white"
              >
                Load More — Showing {Math.min(visible, filtered.length)} of {filtered.length}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter FAB */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-30 bg-tk-red text-white px-5 h-12 rounded-full shadow-lg inline-flex items-center gap-2 font-fredoka uppercase"
      >
        <FilterIcon className="h-4 w-4" /> Filter
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-fredoka uppercase text-tk-black">Filters</h3>
                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setMobileOpen(false)}
                className="mt-4 w-full bg-tk-red text-white h-12 rounded-md font-fredoka uppercase"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import categories from "@/data/categories.json";
import brands from "@/data/brands.json";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

function searchProducts(q: string): Product[] {
  if (!q.trim()) return [];
  const needle = q.toLowerCase();
  return (productsData as Product[]).filter((p) => {
    return (
      p.name.toLowerCase().includes(needle) ||
      p.brand.toLowerCase().includes(needle) ||
      p.categoryLabel.toLowerCase().includes(needle) ||
      p.tags.some((t) => t.toLowerCase().includes(needle))
    );
  });
}

export function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => searchProducts(query), [query]);
  const trimmed = query.trim();

  if (!trimmed) {
    return (
      <div className="py-16 text-center">
        <h2 className="font-fredoka uppercase text-xl text-tk-black">
          Start typing to search
        </h2>
        <p className="text-tk-gray font-poppins mt-2">
          Try{" "}
          {["LEGO", "Hot Wheels", "Barbie", "dinosaurs", "RC", "Marvel"].map(
            (s, i) => (
              <span key={s}>
                {i > 0 ? ", " : ""}
                <Link
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="text-tk-red hover:underline"
                >
                  {s}
                </Link>
              </span>
            ),
          )}
        </p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="py-16 text-center">
        <div className="text-5xl">🔍</div>
        <h2 className="font-fredoka uppercase text-xl text-tk-black mt-3">
          No matches for "{trimmed}"
        </h2>
        <p className="text-tk-gray font-poppins mt-2">
          Try a brand or category name — or{" "}
          <Link href="/collection/all" className="text-tk-red hover:underline">
            browse all toys
          </Link>
          .
        </p>
      </div>
    );
  }

  // Group by category for nicer UX
  return (
    <>
      <p className="text-sm text-tk-gray font-poppins mb-4">
        {results.length} {results.length === 1 ? "result" : "results"} for{" "}
        <strong className="text-tk-black">"{trimmed}"</strong>
      </p>
      <ProductGrid products={results} />
    </>
  );
}

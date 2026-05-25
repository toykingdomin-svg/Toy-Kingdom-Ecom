import Link from "next/link";
import brands from "@/data/brands.json";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata = {
  title: "All Brands | Toy Kingdom Online",
};

export default function BrandsPage() {
  const products = productsData as Product[];
  const counts = brands.map((b) => ({
    ...b,
    count: products.filter((p) => p.brandSlug === b.slug).length,
  }));

  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        Shop by Brand
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {counts.map((b) => (
          <Link
            key={b.slug}
            href={`/brand/${b.slug}`}
            className="aspect-[3/2] rounded-lg bg-white border border-tk-gray-lt hover:border-tk-gold hover:-translate-y-0.5 hover:shadow transition-all grid place-items-center text-center p-3"
          >
            <div>
              <div className="font-fredoka uppercase text-tk-black">{b.name}</div>
              {b.count > 0 && (
                <div className="text-xs text-tk-gray font-poppins mt-1">
                  {b.count} {b.count === 1 ? "product" : "products"}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

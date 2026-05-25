import Link from "next/link";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

export function ProductSection({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: Product[];
}) {
  return (
    <section className="tk-container py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm text-tk-red hover:underline font-poppins"
        >
          View All →
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 8)} />
    </section>
  );
}

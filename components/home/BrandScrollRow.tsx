import Link from "next/link";
import brands from "@/data/brands.json";

export function BrandScrollRow() {
  return (
    <section className="tk-container py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black">
          Top Brands
        </h2>
        <Link href="/brands" className="text-sm text-tk-red hover:underline font-poppins">
          View All →
        </Link>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/collection/all?brand=${b.slug}`}
            className="shrink-0 w-32 md:w-40 h-20 md:h-24 rounded-lg bg-white border border-tk-gray-lt hover:border-tk-gold hover:-translate-y-0.5 transition-all shadow-sm grid place-items-center font-fredoka uppercase text-tk-black"
          >
            {b.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

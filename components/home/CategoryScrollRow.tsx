import Link from "next/link";
import categories from "@/data/categories.json";
import type { Category } from "@/types";

export function CategoryScrollRow() {
  return (
    <section className="tk-container py-10">
      <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mb-6">
        Most Loved Categories
      </h2>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
        {(categories as Category[]).map((cat) => (
          <Link
            key={cat.id}
            href={`/collection/${cat.slug}`}
            className="shrink-0 w-28 md:w-32 group"
          >
            <div
              className="aspect-square rounded-2xl grid place-items-center text-4xl md:text-5xl border-2 border-transparent group-hover:border-tk-gold group-hover:scale-105 transition-all shadow-sm"
              style={{ backgroundColor: `${cat.color}15` }}
            >
              <span>{cat.icon}</span>
            </div>
            <div className="mt-2 text-center text-xs md:text-sm font-poppins text-tk-black group-hover:text-tk-red">
              {cat.label}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

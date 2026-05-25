import Link from "next/link";

const AGE_CARDS = [
  { label: "0–2 Years", age: "0-2", color: "#F5D800", icon: "🍼" },
  { label: "2–5 Years", age: "2-5", color: "#E5961E", icon: "🎈" },
  { label: "5–8 Years", age: "5-8", color: "#E8231A", icon: "🚀" },
  { label: "8–12 Years", age: "8-12", color: "#1A5BB5", icon: "🎮" },
  { label: "12+ Years", age: "12+", color: "#4A7A2B", icon: "🎯" },
];

export function ShopByAge() {
  return (
    <section className="tk-container py-10">
      <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mb-6">
        Shop By Age
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {AGE_CARDS.map((c) => (
          <Link
            key={c.age}
            href={`/collection/all?age=${c.age}`}
            className="rounded-xl p-4 md:p-6 text-white text-center hover:-translate-y-1 transition-transform shadow"
            style={{ backgroundColor: c.color }}
          >
            <div className="text-3xl md:text-4xl mb-2">{c.icon}</div>
            <div className="font-fredoka uppercase text-base md:text-lg">
              {c.label}
            </div>
            <div className="mt-1 text-xs underline">Shop Now</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

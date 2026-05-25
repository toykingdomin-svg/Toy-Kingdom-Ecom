import Link from "next/link";

export function FeaturedBanner() {
  return (
    <section className="tk-container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-tk-black text-tk-gold rounded-xl p-8 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="font-fredoka uppercase text-2xl md:text-3xl mb-2">
              Wholesale Buyers
            </h3>
            <p className="font-poppins text-sm text-white/80">
              Best bulk rates in Mumbai. DM us for trade pricing & PAN India shipping.
            </p>
          </div>
          <Link
            href="/wholesale"
            className="self-start inline-flex items-center bg-tk-gold text-tk-black px-6 h-11 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-gold-lt"
          >
            Enquire Now
          </Link>
        </div>

        <div className="bg-tk-gold text-white rounded-xl p-8 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="font-fredoka uppercase text-2xl md:text-3xl mb-2">
              Free Delivery
            </h3>
            <p className="font-poppins text-sm text-white/90">
              On orders above ₹999. PAN India shipping. 30-day free returns.
            </p>
          </div>
          <Link
            href="/collection/all"
            className="self-start inline-flex items-center bg-tk-red text-white px-6 h-11 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

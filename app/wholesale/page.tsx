import Link from "next/link";
import { IndianRupee, Boxes, Truck, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WholesaleForm } from "@/components/wholesale/WholesaleForm";
import categories from "@/data/categories.json";
import { TK_BRAND } from "@/lib/constants";
import { whatsappOrderLink } from "@/lib/utils";

export const metadata = {
  title: "Wholesale | Toy Kingdom Online",
  description:
    "India's trusted toy wholesaler since 2020. Best rates from Mumbai. PAN India shipping. WhatsApp +91 77770 41555.",
};

const FEATURES = [
  {
    icon: IndianRupee,
    title: "Best Rates",
    desc: "Direct-from-Mumbai bulk pricing — better than any marketplace.",
  },
  {
    icon: Boxes,
    title: "Always in Stock",
    desc: "300+ SKUs available year-round from our Nagdevi warehouse.",
  },
  {
    icon: Truck,
    title: "PAN India Shipping",
    desc: "We ship to every pincode in India — Bombay to Imphal.",
  },
  {
    icon: MessageCircle,
    title: "Quick on WhatsApp",
    desc: "Catalogue, photos and quotes — all over a single chat.",
  },
];

export default function WholesalePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-tk-black text-white">
        <div className="tk-container py-14 md:py-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Wholesale" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-tk-gold font-fredoka uppercase tracking-wide text-sm">
              For Retailers · Resellers · Gifting Companies
            </p>
            <h1 className="mt-3 font-fredoka uppercase text-3xl md:text-5xl leading-tight">
              India's Trusted Toy Wholesaler Since 2020
            </h1>
            <p className="mt-4 text-white/80 font-poppins max-w-xl">
              From Hot Wheels and LEGO to RC, dinosaurs, dolls and dollhouses —
              we stock 300+ SKUs and ship them across India from our Mumbai
              warehouse.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappOrderLink(
                  "Hi! I'm interested in wholesale pricing — please share your catalogue.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-tk-gold text-tk-black px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-gold-lt"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Now
              </a>
              <a
                href={`tel:${TK_BRAND.whatsapp.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 border border-white text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-white hover:text-tk-black"
              >
                <Phone className="h-4 w-4" /> {TK_BRAND.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="tk-container py-12">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mb-6">
          Why Toy Kingdom Wholesale?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-tk-gray-lt rounded-xl p-5 hover:border-tk-gold hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 rounded-md bg-tk-gold/10 text-tk-gold grid place-items-center">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-fredoka uppercase text-lg text-tk-black mt-3">
                {f.title}
              </h3>
              <p className="text-sm text-tk-gray font-poppins mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories grid */}
      <section className="tk-container py-8">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mb-6">
          Categories Available for Wholesale
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/collection/${c.slug}`}
              className="rounded-xl p-4 text-center border-2 border-transparent hover:border-tk-gold transition-all"
              style={{ backgroundColor: `${c.color}15` }}
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-2 font-poppins text-sm text-tk-black">
                {c.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="tk-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black">
              Send a Wholesale Enquiry
            </h2>
            <p className="mt-3 text-tk-gray font-poppins">
              Tell us about your business and what categories interest you.
              We'll respond on WhatsApp with our latest pricelist and stock.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-poppins text-tk-black">
              <li>📍 {TK_BRAND.address}</li>
              <li>📱 WhatsApp: {TK_BRAND.whatsapp}</li>
              <li>📧 {TK_BRAND.email}</li>
              <li>🕒 Mon–Sat, 10am–9pm</li>
            </ul>
          </div>
          <WholesaleForm />
        </div>
      </section>
    </>
  );
}

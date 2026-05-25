import { MapPin, MessageCircle, Mail, Star, Truck, RotateCcw } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TK_BRAND } from "@/lib/constants";

export const metadata = {
  title: "About Toy Kingdom Online",
  description:
    "Toy Kingdom Online — Mumbai's trusted toy retailer & wholesaler since 2020. The Amazing Toy Store.",
};

export default function AboutPage() {
  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-fredoka uppercase text-tk-gold text-sm tracking-wide">
            Our Story
          </p>
          <h1 className="font-fredoka uppercase text-3xl md:text-4xl text-tk-black mt-2">
            The Amazing Toy Store
          </h1>
          <p className="mt-4 font-poppins text-tk-gray">
            Toy Kingdom Online started in 2020 from a small shop in Mumbai's
            Crawford Market. What began as a family-run toy counter is now one
            of India's most loved Instagram-first toy retailers — known for
            curated stock, honest pricing, and reels that make your kids beg
            you to shop with us.
          </p>
          <p className="mt-3 font-poppins text-tk-gray">
            We're proudly independent — not a franchise — and stock 300+ SKUs
            across RC, die-cast, action figures, dolls, board games and more.
            We ship to every pincode in India, and offer the best wholesale
            rates from our Nagdevi warehouse.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Stat value="2020" label="Founded" />
            <Stat value="2,175+" label="Happy customers" />
            <Stat value="300+" label="SKUs in stock" />
            <Stat value="4.3★" label="Google rating" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-tk-gold/10 rounded-xl p-6 text-center">
            <div className="text-5xl">🧸</div>
            <p className="mt-3 font-fredoka uppercase text-tk-black">Curated</p>
          </div>
          <div className="bg-tk-red/10 rounded-xl p-6 text-center">
            <div className="text-5xl">🚚</div>
            <p className="mt-3 font-fredoka uppercase text-tk-black">PAN India</p>
          </div>
          <div className="bg-tk-blue/10 rounded-xl p-6 text-center">
            <div className="text-5xl">📱</div>
            <p className="mt-3 font-fredoka uppercase text-tk-black">DM Orders</p>
          </div>
          <div className="bg-tk-green/10 rounded-xl p-6 text-center">
            <div className="text-5xl">↩️</div>
            <p className="mt-3 font-fredoka uppercase text-tk-black">30-day Returns</p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-tk-black text-white rounded-2xl p-8 md:p-10">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-gold">
          Visit Our Store
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          <Info icon={MapPin} title="Address" lines={[TK_BRAND.address]} />
          <Info
            icon={MessageCircle}
            title="WhatsApp / Phone"
            lines={[TK_BRAND.whatsapp, "Mon–Sat, 10am–9pm"]}
          />
          <Info
            icon={Mail}
            title="Email & Social"
            lines={[TK_BRAND.email, TK_BRAND.instagram]}
          />
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Policy
          icon={Truck}
          title="Shipping Policy"
          body="Free delivery across India on orders above ₹999. Ships from Mumbai in 1–2 business days. COD available on select pincodes."
        />
        <Policy
          icon={RotateCcw}
          title="Returns Policy"
          body="Free returns within 30 days. Item must be unused, in original packaging. Refund processed within 5–7 working days."
        />
        <Policy
          icon={Star}
          title="Quality Promise"
          body="All toys sold are genuine and conform to Indian toy safety standards. Damaged-on-arrival? We replace, no questions asked."
        />
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-tk-offwhite p-4">
      <div className="font-fredoka text-2xl text-tk-red">{value}</div>
      <div className="text-xs font-poppins text-tk-gray">{label}</div>
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-tk-gold mt-1 shrink-0" />
      <div>
        <div className="font-fredoka uppercase text-tk-gold">{title}</div>
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-white/80 font-poppins mt-1">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Policy({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border border-tk-gray-lt rounded-xl p-5">
      <div className="h-10 w-10 rounded-md bg-tk-red/10 text-tk-red grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-fredoka uppercase mt-3 text-tk-black">{title}</h3>
      <p className="text-sm text-tk-gray font-poppins mt-1">{body}</p>
    </div>
  );
}

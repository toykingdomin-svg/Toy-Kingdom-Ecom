import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export const metadata = { title: "My Account | Toy Kingdom Online" };

const TILES = [
  { href: "/orders", label: "My Orders", icon: Package, desc: "View past purchases & status" },
  { href: "/wishlist", label: "Wishlist", icon: Heart, desc: "Toys you've saved" },
  { href: "/about", label: "Saved Addresses", icon: MapPin, desc: "Manage shipping locations" },
  { href: "/auth/login", label: "Log Out", icon: LogOut, desc: "End your session" },
];

export default function AccountPage() {
  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
      <div className="mt-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-tk-gold text-white grid place-items-center">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-fredoka uppercase text-2xl text-tk-black">
            Hello, Guest
          </h1>
          <p className="text-sm text-tk-gray font-poppins">
            <Link href="/auth/login" className="text-tk-red hover:underline">
              Log in
            </Link>{" "}
            to access your dashboard.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TILES.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="bg-white border border-tk-gray-lt rounded-xl p-5 hover:border-tk-red hover:shadow-sm transition-all flex items-start gap-3"
          >
            <div className="h-10 w-10 rounded-md bg-tk-red/10 text-tk-red grid place-items-center shrink-0">
              <t.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-fredoka uppercase text-tk-black">{t.label}</div>
              <div className="text-xs text-tk-gray font-poppins">{t.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

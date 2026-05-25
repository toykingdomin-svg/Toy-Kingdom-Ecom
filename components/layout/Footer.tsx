import Link from "next/link";
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { TK_BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-tk-black text-white">
      {/* Trust strip */}
      <div className="bg-tk-red py-3">
        <div className="tk-container flex flex-wrap justify-center gap-x-12 gap-y-2 text-sm font-fredoka uppercase tracking-wide text-white">
          <span>✓ Free Returns within 30 days*</span>
          <span>✓ Free Delivery on cart above ₹999/-</span>
        </div>
      </div>

      <div className="tk-container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-full bg-tk-gold text-white grid place-items-center font-fredoka text-xl">
              TK
            </div>
            <div className="font-fredoka uppercase text-lg">Toy Kingdom</div>
          </div>
          <p className="text-sm text-tk-gray-lt mb-4">{TK_BRAND.tagline}</p>
          <ul className="space-y-2 text-sm text-tk-gray-lt">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-tk-gold shrink-0" />
              <span>{TK_BRAND.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-tk-gold" />
              <a href={`tel:${TK_BRAND.whatsapp.replace(/\s/g, "")}`}>
                {TK_BRAND.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-tk-gold" />
              <a href={`mailto:${TK_BRAND.email}`}>{TK_BRAND.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-fredoka uppercase text-tk-gold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-tk-gray-lt">
            <li><Link href="/collection/rc-battery" className="hover:text-tk-gold">RC & Battery</Link></li>
            <li><Link href="/collection/die-cast-vehicles" className="hover:text-tk-gold">Die-Cast</Link></li>
            <li><Link href="/collection/action-figures" className="hover:text-tk-gold">Action Figures</Link></li>
            <li><Link href="/collection/dinosaurs" className="hover:text-tk-gold">Dinosaurs</Link></li>
            <li><Link href="/collection/board-games" className="hover:text-tk-gold">Board Games</Link></li>
            <li><Link href="/collection/all" className="hover:text-tk-gold">All Categories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-fredoka uppercase text-tk-gold mb-3">About Us</h4>
          <ul className="space-y-2 text-sm text-tk-gray-lt">
            <li><Link href="/about" className="hover:text-tk-gold">Our Story</Link></li>
            <li><Link href="/about" className="hover:text-tk-gold">Store Locator</Link></li>
            <li><Link href="/wholesale" className="hover:text-tk-gold">Wholesale</Link></li>
            <li><Link href="/about" className="hover:text-tk-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-fredoka uppercase text-tk-gold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-tk-gray-lt">
            <li><Link href="/account" className="hover:text-tk-gold">My Account</Link></li>
            <li><Link href="/track-order" className="hover:text-tk-gold">Track Order</Link></li>
            <li><Link href="/track-order" className="hover:text-tk-gold">Cancel / Return</Link></li>
            <li>
              <a
                href={`https://wa.me/${TK_BRAND.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-tk-gold"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Most searched + socials */}
      <div className="border-t border-white/10">
        <div className="tk-container py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-tk-gray-lt">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-fredoka uppercase text-tk-gold">Most Searched:</span>
            {["LEGO", "Hot Wheels", "Barbie", "Nerf", "Die-Cast", "RC Cars", "Dinosaurs"].map((t) => (
              <Link key={t} href={`/collection/all?q=${t}`} className="hover:text-tk-gold">
                {t}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={TK_BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-tk-gold"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${TK_BRAND.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-tk-gold"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="tk-container py-4 text-xs text-tk-gray-lt flex flex-col md:flex-row md:justify-between gap-2">
          <span>© {new Date().getFullYear()} Toy Kingdom Online. All rights reserved.</span>
          <span className="space-x-3">
            <Link href="/about" className="hover:text-tk-gold">Privacy Policy</Link>
            <Link href="/about" className="hover:text-tk-gold">Terms</Link>
            <Link href="/about" className="hover:text-tk-gold">Delivery Policy</Link>
            <Link href="/about" className="hover:text-tk-gold">Returns Policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

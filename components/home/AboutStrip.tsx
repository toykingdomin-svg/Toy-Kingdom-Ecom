import { MapPin, MessageCircle, Star } from "lucide-react";
import { TK_BRAND } from "@/lib/constants";

export function AboutStrip() {
  return (
    <section className="bg-tk-black text-white py-10">
      <div className="tk-container grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex md:items-start gap-3 justify-center md:justify-start">
          <MapPin className="h-6 w-6 text-tk-gold shrink-0 mt-1" />
          <div>
            <div className="font-fredoka uppercase text-tk-gold">Visit Us</div>
            <p className="text-sm text-tk-gray-lt mt-1">{TK_BRAND.address}</p>
          </div>
        </div>
        <div className="flex md:items-start gap-3 justify-center md:justify-start">
          <MessageCircle className="h-6 w-6 text-tk-gold shrink-0 mt-1" />
          <div>
            <div className="font-fredoka uppercase text-tk-gold">WhatsApp Orders</div>
            <p className="text-sm text-tk-gray-lt mt-1">
              {TK_BRAND.whatsapp} — Orders via DM @toykingdomonline
            </p>
          </div>
        </div>
        <div className="flex md:items-start gap-3 justify-center md:justify-start">
          <Star className="h-6 w-6 text-tk-gold shrink-0 mt-1 fill-current" />
          <div>
            <div className="font-fredoka uppercase text-tk-gold">Customer Loved</div>
            <p className="text-sm text-tk-gray-lt mt-1">
              4.3★ on Google — 2,175+ happy customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

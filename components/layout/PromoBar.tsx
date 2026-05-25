"use client";

import { PROMO_MESSAGES } from "@/lib/constants";

export function PromoBar() {
  // Repeat messages so the marquee loop is seamless
  const stream = [...PROMO_MESSAGES, ...PROMO_MESSAGES];
  return (
    <div className="bg-tk-gold text-white py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee gap-12 font-poppins font-medium text-sm hover:[animation-play-state:paused]">
        {stream.map((msg, i) => (
          <span key={i} className="inline-flex items-center px-2">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

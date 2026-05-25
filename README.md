# Toy Kingdom Online — Ecommerce (MVP)

Next.js 14 + TypeScript + Tailwind + Zustand + Framer Motion. Brand: **Toy Kingdom Online** (@toykingdomonline), Mumbai.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's in this MVP

- ✅ **Homepage** — Hero carousel, promo strip, categories, brands, New Arrivals, Trending, Featured Banners, Shop By Age, About strip, Newsletter
- ✅ **Collection page** (`/collection/[slug]`) — Filter sidebar (Brand · Category · Age · Gender · Price · Discount), sort dropdown, filter chips, load-more pagination, mobile filter drawer
- ✅ **Product detail** (`/product/[slug]`) — Image gallery, info panel with qty, Add to Bag, Buy Now, **WhatsApp Order** CTA, accordions, related products
- ✅ **Cart** (`/cart/bag`) — Items, qty controls, move-to-wishlist, summary, coupon codes (TK10, TK20, WELCOME15, WHOLESALE50)
- ✅ **Wishlist** (`/wishlist`) — Heart toggle persists across pages
- ✅ **Header + Mega Menu** — Hover-open, full TK category tree + brands + age pills
- ✅ **Footer** — Mumbai address, WhatsApp, social, most-searched, policies
- ✅ **PromoBar** — Auto-scrolling marquee with TK promo messages
- ✅ **TK brand tokens** — Crown Gold `#E5961E`, TK Red `#E8231A`, Fredoka + Poppins fonts
- ✅ **60+ mock products** across all 10 TK categories

## Not in this MVP (stubs to add later)

- Checkout flow
- Account / Login / Register
- Order history / Track order
- Brand listing pages
- Search results page
- Wholesale enquiry form
- About page

## Project structure

```
app/                     # App Router pages
  layout.tsx             # Root layout
  page.tsx               # Homepage
  (shop)/
    collection/[slug]/   # Category pages
    product/[slug]/      # Product detail
  (account)/wishlist/    # Wishlist
  cart/bag/              # Cart
components/
  layout/                # Header, Footer, PromoBar, MegaMenu
  home/                  # Homepage sections
  product/               # ProductCard, gallery, info, etc.
  collection/            # Filter sidebar, chips, sort
  cart/                  # Cart item, summary, empty state
  ui/                    # Button, Badge, PriceDisplay, etc.
store/                   # Zustand: cart, wishlist, filters
data/                    # JSON mock data
types/                   # TypeScript types
lib/                     # utils, constants
```

## Brand rules (enforced in code)

| | |
|---|---|
| Crown Gold | `#E5961E` (`bg-tk-gold`) — secondary CTAs, promo banners |
| TK Red     | `#E8231A` (`bg-tk-red`) — primary CTAs, badges |
| Fonts      | Fredoka (display) + Poppins (body) |
| WhatsApp   | +91 77770 41555 (also `wa.me/917777041555`) |
| Address    | Ground Floor, 250/50 Nagdevi St, near Crawford Market, Mumbai 400003 |

## Try these flows

1. **Homepage → Collection** — Click "Most Loved Categories" tiles
2. **Filter** — Open `/collection/all`, tick a brand + age group, watch grid update
3. **Wishlist** — Click ♥ on any card, then visit `/wishlist`
4. **Cart + Coupon** — Add 2+ items, go to `/cart/bag`, enter `TK10`
5. **WhatsApp** — On any product detail page, click "Order on WhatsApp"

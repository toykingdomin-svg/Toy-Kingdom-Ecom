"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { MegaMenu } from "./MegaMenu";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCartStore(selectTotalItems);
  const wishCount = useWishlistStore((s) => s.items.length);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-tk-gray-lt">
      <div className="tk-container relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-tk-gold text-white grid place-items-center font-fredoka text-xl shadow">
              TK
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-fredoka text-tk-black text-lg uppercase">
                Toy Kingdom
              </span>
              <span className="text-[10px] tracking-widest text-tk-gold uppercase">
                The Amazing Toy Store
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            onMouseLeave={() => setMegaOpen(false)}
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => setMegaOpen(link.hasMegaMenu === true)}
              >
                <Link
                  href={link.href}
                  className="font-fredoka uppercase text-sm tracking-wide text-tk-black hover:text-tk-red transition-colors"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="p-2 hover:text-tk-red"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/auth/login" aria-label="Account" className="hidden sm:block p-2 hover:text-tk-red">
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 hover:text-tk-red"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-tk-red text-white text-[10px] rounded-full h-4 min-w-4 px-1 grid place-items-center font-bold">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart/bag"
              aria-label="Cart"
              className="relative p-2 hover:text-tk-red"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-tk-red text-white text-[10px] rounded-full h-4 min-w-4 px-1 grid place-items-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar (collapsible) */}
        {searchOpen && (
          <form onSubmit={submitSearch} className="pb-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toys, brands, categories..."
              className="w-full h-11 px-4 rounded-lg border border-tk-gray-lt focus:outline-none focus:border-tk-red"
              autoFocus
            />
          </form>
        )}

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <div onMouseEnter={() => setMegaOpen(true)}>
              <MegaMenu onClose={() => setMegaOpen(false)} />
            </div>
          )}
        </AnimatePresence>

        {/* Mobile dropdown menu (simple) */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-tk-gray-lt py-3">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-2 py-2 font-fredoka uppercase text-sm text-tk-black hover:text-tk-red hover:bg-tk-offwhite rounded",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Trust strip */}
      <div className="bg-tk-offwhite border-t border-tk-gray-lt">
        <div className="tk-container py-2 text-center text-xs font-poppins text-tk-gray uppercase tracking-wide">
          ✓ Free Returns within 30 days*  &nbsp;|&nbsp;  ✓ Free Delivery on cart above ₹999/-
        </div>
      </div>
    </header>
  );
}

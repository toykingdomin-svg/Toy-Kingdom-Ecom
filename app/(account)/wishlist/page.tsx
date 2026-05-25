"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        My Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-tk-offwhite text-tk-red mb-4">
            <Heart className="h-10 w-10" />
          </div>
          <h2 className="font-fredoka uppercase text-2xl text-tk-black">
            Your Wishlist is Empty
          </h2>
          <p className="font-poppins text-tk-gray mt-2">
            Tap the ♥ on any toy to save it for later.
          </p>
          <Link
            href="/collection/all"
            className="inline-flex items-center justify-center bg-tk-red text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk mt-5"
          >
            Browse Toys
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}

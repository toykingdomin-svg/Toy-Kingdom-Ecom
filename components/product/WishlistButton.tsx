"use client";

import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function WishlistButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const inWishlist = useWishlistStore((s) =>
    s.items.some((p) => p.id === product.id),
  );
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
        toast.success(
          inWishlist ? "Removed from wishlist" : "Added to wishlist ❤️",
        );
      }}
      aria-label="Toggle wishlist"
      className={cn(
        "p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors",
        inWishlist ? "text-tk-red" : "text-tk-gray hover:text-tk-red",
        className,
      )}
    >
      <Heart
        className={cn("h-5 w-5", inWishlist && "fill-tk-red")}
      />
    </button>
  );
}

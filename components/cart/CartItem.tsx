"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem as Item } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

export function CartItem({ item }: { item: Item }) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const { product, qty } = item;

  return (
    <div className="flex gap-3 p-3 bg-white border border-tk-gray-lt rounded-lg">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 bg-tk-offwhite rounded-md overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-xs text-tk-gray uppercase tracking-wide">
              {product.brand}
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="font-poppins text-sm font-medium text-tk-black line-clamp-2 hover:text-tk-red"
            >
              {product.name}
            </Link>
            <div className="text-xs text-tk-gray mt-0.5">
              Age: {product.ageLabel}
            </div>
          </div>
          <button
            onClick={() => {
              removeItem(product.id);
              toast.success("Removed from bag");
            }}
            aria-label="Remove"
            className="text-tk-gray hover:text-tk-red p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="font-poppins font-bold text-tk-black">
              {formatPrice(product.price)}
            </div>
            {product.mrp > product.price && (
              <div className="text-xs text-tk-gray line-through">
                {formatPrice(product.mrp)}
              </div>
            )}
          </div>
          <div className="inline-flex items-center border border-tk-gray-lt rounded-md">
            <button
              onClick={() => updateQty(product.id, qty - 1)}
              className="p-1.5 hover:text-tk-red"
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-poppins font-semibold">
              {qty}
            </span>
            <button
              onClick={() => updateQty(product.id, qty + 1)}
              className="p-1.5 hover:text-tk-red"
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            addToWishlist(product);
            removeItem(product.id);
            toast.success("Moved to Wishlist ❤️");
          }}
          className="mt-2 text-xs text-tk-red hover:underline"
        >
          Move to Wishlist
        </button>
      </div>
    </div>
  );
}

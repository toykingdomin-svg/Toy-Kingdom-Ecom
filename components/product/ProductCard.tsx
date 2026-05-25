"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { WishlistButton } from "./WishlistButton";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white border border-tk-gray-lt rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-tk-offwhite overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top-left badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge tone="blue">New</Badge>}
            {product.isBestseller && <Badge tone="gold">Bestseller</Badge>}
            {product.discount >= 30 && (
              <Badge tone="red">{product.discount}% Off</Badge>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute top-2 right-2">
            <WishlistButton product={product} />
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 grid place-items-center">
              <span className="font-fredoka uppercase text-tk-red text-lg">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="p-3 space-y-1">
          <div className="text-[11px] uppercase tracking-wide text-tk-gray font-poppins">
            {product.brand}
          </div>
          <h3 className="font-poppins text-sm font-medium text-tk-black line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="text-[11px] text-tk-gray">
            Age: {product.ageLabel}
          </div>
          <PriceDisplay
            price={product.price}
            mrp={product.mrp}
            discount={product.discount}
            size="md"
          />
        </div>
      </Link>
      <div className="px-3 pb-3">
        <AddToCartButton product={product} size="sm" />
      </div>
    </motion.div>
  );
}

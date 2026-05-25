"use client";

import { useState } from "react";
import Image from "next/image";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductImageGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const imgs = product.images.length ? product.images : ["/placeholder.png"];

  return (
    <div>
      <div className="relative aspect-square bg-tk-offwhite rounded-lg overflow-hidden group">
        <Image
          src={imgs[active]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <WishlistButton product={product} />
        </div>
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 rounded-md overflow-hidden shrink-0 border-2",
                i === active ? "border-tk-red" : "border-transparent",
              )}
            >
              <Image
                src={src}
                alt={`${product.name} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

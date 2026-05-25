"use client";

import Image from "next/image";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function ProductImageGallery({ product }: { product: Product }) {
  const imgs = product.images.length ? product.images : ["/placeholder.png"];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div>
      <div className="relative">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {imgs.map((src, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-square bg-tk-offwhite rounded-xl overflow-hidden group">
                  <Image
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imgs.length > 1 && (
            <>
              <CarouselPrevious className="left-2 bg-white/80 hover:bg-white border-tk-gray-lt" />
              <CarouselNext className="right-2 bg-white/80 hover:bg-white border-tk-gray-lt" />
            </>
          )}
        </Carousel>

        {/* Wishlist overlay */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
      </div>

      {/* Dot indicators */}
      {imgs.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === current ? "w-6 bg-tk-red" : "w-2 bg-tk-gray-lt"
              )}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {imgs.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "relative h-20 w-20 rounded-md overflow-hidden shrink-0 border-2 transition-all",
                i === current ? "border-tk-red" : "border-transparent opacity-60 hover:opacity-100"
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

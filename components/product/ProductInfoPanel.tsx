"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Minus, Plus, MessageCircle, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCartStore } from "@/store/cartStore";
import { whatsappOrderLink } from "@/lib/utils";

export function ProductInfoPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="space-y-4">
      <Link
        href={`/collection/all?brand=${product.brandSlug}`}
        className="text-sm text-tk-blue hover:underline font-poppins"
      >
        {product.brand}
      </Link>

      <h1 className="font-fredoka text-2xl md:text-3xl text-tk-black">
        {product.name}
      </h1>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge tone="gray">Age: {product.ageLabel}</Badge>
        {product.isNew && <Badge tone="blue">New</Badge>}
        {product.isBestseller && <Badge tone="gold">Bestseller</Badge>}
      </div>

      <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

      <PriceDisplay
        price={product.price}
        mrp={product.mrp}
        discount={product.discount}
        size="lg"
      />

      <Separator />

      {/* Qty */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-poppins text-tk-gray">Quantity</span>
        <div className="inline-flex items-center border border-tk-gray-lt rounded-md">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-2 hover:text-tk-red"
            aria-label="Decrease"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-poppins font-semibold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="p-2 hover:text-tk-red"
            aria-label="Increase"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="primary"
          size="lg"
          disabled={!product.inStock}
          onClick={() => {
            addItem(product, qty);
            toast.success(`Added to bag!`, {
              description: product.name,
            });
          }}
        >
          {product.inStock ? "Add to Bag" : "Sold Out"}
        </Button>
        <Button variant="secondary" size="lg" disabled={!product.inStock}>
          Buy Now
        </Button>
      </div>

      {/* WhatsApp CTA with Tooltip */}
      <Tooltip>
        <TooltipTrigger className="w-full">
          <a
            href={whatsappOrderLink(
              `Hi! I want to order: ${product.name} (${product.id})`,
            )}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-tk-green text-tk-green hover:bg-tk-green hover:text-white rounded-md h-12 font-fredoka uppercase tracking-wide transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-poppins text-xs">
          Chat directly with Toy Kingdom — +91 77770 41555
        </TooltipContent>
      </Tooltip>

      {/* Trust strip */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-poppins text-tk-gray">
        <div className="bg-tk-offwhite rounded-lg p-2 flex flex-col items-center gap-1">
          <Truck className="h-4 w-4 text-tk-gold" />
          <span>Free above ₹999</span>
        </div>
        <div className="bg-tk-offwhite rounded-lg p-2 flex flex-col items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-tk-gold" />
          <span>100% Genuine</span>
        </div>
        <div className="bg-tk-offwhite rounded-lg p-2 flex flex-col items-center gap-1">
          <RotateCcw className="h-4 w-4 text-tk-gold" />
          <span>30-day Returns</span>
        </div>
      </div>

      <Separator />

      {/* Tabs — Description / Specs / Reviews */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full bg-tk-offwhite">
          <TabsTrigger value="description" className="flex-1 font-fredoka uppercase data-[state=active]:bg-white data-[state=active]:text-tk-red">
            Description
          </TabsTrigger>
          <TabsTrigger value="specs" className="flex-1 font-fredoka uppercase data-[state=active]:bg-white data-[state=active]:text-tk-red">
            Specs
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1 font-fredoka uppercase data-[state=active]:bg-white data-[state=active]:text-tk-red">
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-3 font-poppins text-sm text-tk-gray leading-relaxed">
          {product.description ||
            `${product.name} by ${product.brand} — perfect for kids aged ${product.ageLabel}. High-quality materials, vibrant colours, and hours of imaginative play. Suitable for ${product.gender === "boys" ? "boys" : product.gender === "girls" ? "girls" : "all kids"}.`}
        </TabsContent>

        <TabsContent value="specs" className="pt-3">
          <ul className="space-y-2 text-sm font-poppins">
            {[
              ["Brand", product.brand],
              ["Age Group", product.ageLabel],
              ["Category", product.categoryLabel],
              ["SKU", product.id],
              ["In Stock", product.inStock ? "Yes" : "No"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between border-b border-tk-gray-lt pb-1.5">
                <span className="text-tk-gray">{k}</span>
                <span className="text-tk-black font-medium">{v}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="reviews" className="pt-3 font-poppins text-sm text-tk-gray">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl font-bold text-tk-black">{product.rating}</span>
            <div>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <p className="text-xs mt-0.5">{product.reviewCount} verified reviews</p>
            </div>
          </div>
          <p className="italic text-tk-gray">
            "Great toy! My kid absolutely loves it. Solid build quality and exactly as described." — Verified Buyer ⭐⭐⭐⭐⭐
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

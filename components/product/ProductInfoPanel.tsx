"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Minus, Plus, MessageCircle, Truck } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
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
            toast.success(`Added to bag — ${product.name}`);
          }}
        >
          {product.inStock ? "Add to Bag" : "Sold Out"}
        </Button>
        <Button variant="secondary" size="lg" disabled={!product.inStock}>
          Buy Now
        </Button>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={whatsappOrderLink(
          `Hi! I want to order: ${product.name} (${product.id})`,
        )}
        target="_blank"
        rel="noreferrer"
        className="block w-full text-center border border-tk-green text-tk-green hover:bg-tk-green hover:text-white rounded-md h-12 leading-[3rem] font-fredoka uppercase tracking-wide"
      >
        <MessageCircle className="h-4 w-4 inline -mt-0.5 mr-2" />
        Order on WhatsApp
      </a>

      <div className="bg-tk-offwhite rounded-md p-3 flex items-center gap-2 text-sm font-poppins text-tk-black">
        <Truck className="h-4 w-4 text-tk-gold shrink-0" />
        <span>
          🚚 Free delivery above ₹999 &nbsp;|&nbsp; PAN India &nbsp;|&nbsp; 30-day returns
        </span>
      </div>
    </div>
  );
}

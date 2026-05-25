"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({
  product,
  qty = 1,
  className,
  variant = "primary",
  size = "md",
}: {
  product: Product;
  qty?: number;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product.inStock) {
    return (
      <Button
        variant="outline"
        size={size}
        className={cn("w-full opacity-80", className)}
        onClick={(e) => {
          e.preventDefault();
          toast("We'll notify you when it's back in stock");
        }}
      >
        Notify Me
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("w-full gap-2", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, qty);
        toast.success(`Added to bag â€” ${product.name}`);
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      Add to Bag
    </Button>
  );
}


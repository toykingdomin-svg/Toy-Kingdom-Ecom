import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  mrp,
  discount,
  size = "md",
  className,
}: {
  price: number;
  mrp: number;
  discount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  } as const;
  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span className={cn("font-poppins font-bold text-tk-black", sizes[size])}>
        {formatPrice(price)}
      </span>
      {mrp > price && (
        <>
          <span className="text-tk-gray line-through text-sm">
            {formatPrice(mrp)}
          </span>
          {discount > 0 && (
            <span className="text-tk-red text-xs font-bold uppercase">
              {discount}% off
            </span>
          )}
        </>
      )}
    </div>
  );
}

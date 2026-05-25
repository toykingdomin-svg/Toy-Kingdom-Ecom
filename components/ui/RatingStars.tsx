import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className={cn("flex items-center gap-1 text-tk-gray", className)}>
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-tk-green text-white text-xs font-bold">
        {rating.toFixed(1)} <Star className="h-3 w-3 fill-current" />
      </span>
      {reviewCount != null && (
        <span className="text-xs text-tk-gray">
          ({reviewCount.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "default" | "destructive" | "link";
type Size = "sm" | "md" | "lg" | "default" | "xs" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  nativeButton?: boolean;
  render?: ReactElement;
}

const variantMap: Record<Variant, string> = {
  primary:     "bg-tk-red text-white hover:bg-tk-red-dk active:scale-[0.98] disabled:bg-tk-gray-lt disabled:text-tk-gray",
  secondary:   "bg-tk-gold text-white hover:bg-tk-gold/90 active:scale-[0.98] disabled:bg-tk-gray-lt disabled:text-tk-gray",
  outline:     "border border-tk-gray-lt bg-white text-tk-black hover:border-tk-red hover:text-tk-red",
  ghost:       "bg-transparent text-tk-black hover:bg-tk-offwhite",
  default:     "bg-tk-red text-white hover:bg-tk-red-dk",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  link:        "underline text-tk-red hover:opacity-80",
};

const sizeMap: Record<Size, string> = {
  sm:       "h-8 px-3 text-xs",
  md:       "h-10 px-4 text-sm",
  lg:       "h-11 px-6 text-sm",
  default:  "h-10 px-4 text-sm",
  xs:       "h-6 px-2 text-xs",
  icon:     "h-10 w-10 p-0",
  "icon-xs":"h-6 w-6 p-0",
  "icon-sm":"h-8 w-8 p-0",
  "icon-lg":"h-12 w-12 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild: _asChild, nativeButton: _nb, render: _render, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-fredoka uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tk-red/50",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

// Named export for shadcn compatibility
export const buttonVariants = ({ variant = "default", size = "default", className = "" }: { variant?: Variant; size?: Size; className?: string }) =>
  cn("inline-flex items-center justify-center rounded-md font-fredoka uppercase tracking-wide transition-all", variantMap[variant], sizeMap[size], className);

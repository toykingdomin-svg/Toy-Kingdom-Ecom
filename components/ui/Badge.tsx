import { cn } from "@/lib/utils";

type Tone = "red" | "gold" | "blue" | "green" | "gray";

const toneMap: Record<Tone, string> = {
  red:   "bg-tk-red/10 text-tk-red",
  gold:  "bg-tk-gold/10 text-tk-gold",
  blue:  "bg-tk-blue/10 text-tk-blue",
  green: "bg-tk-green/10 text-tk-green",
  gray:  "bg-tk-gray-lt text-tk-gray",
};

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = "gray", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-poppins font-medium",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

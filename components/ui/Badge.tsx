import { cn } from "@/lib/utils";

type Tone = "red" | "gold" | "blue" | "black" | "green" | "gray";

const tones: Record<Tone, string> = {
  red: "bg-tk-red text-white",
  gold: "bg-tk-gold text-white",
  blue: "bg-tk-blue text-white",
  black: "bg-tk-black text-white",
  green: "bg-tk-green text-white",
  gray: "bg-tk-gray-lt text-tk-black",
};

export function Badge({
  children,
  tone = "red",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-fredoka uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

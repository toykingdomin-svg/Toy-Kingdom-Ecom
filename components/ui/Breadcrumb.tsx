import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      className="flex items-center gap-1 text-sm text-tk-gray"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="hover:text-tk-red">
              {item.label}
            </Link>
          ) : (
            <span className="text-tk-black font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-4 w-4" />}
        </span>
      ))}
    </nav>
  );
}

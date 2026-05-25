"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-tk-gray-lt">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-4 flex items-center justify-between font-fredoka uppercase text-sm text-tk-black"
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm font-poppins text-tk-gray">{children}</div>
      )}
    </div>
  );
}

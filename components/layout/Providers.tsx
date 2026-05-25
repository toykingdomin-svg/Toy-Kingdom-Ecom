"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  const [qc] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={qc}>
      <TooltipProvider delay={300}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            classNames: {
              toast: "font-poppins text-sm",
            },
          }}
          richColors
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

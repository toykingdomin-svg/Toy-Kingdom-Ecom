"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banners from "@/data/banners.json";
import type { Banner } from "@/types";

export function HeroBanner() {
  const slides = banners as Banner[];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <section className="relative w-full h-[280px] md:h-[400px] lg:h-[480px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 grid place-items-center"
          style={{ background: slide.bg, color: slide.textColor }}
        >
          <div className="tk-container text-center px-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-fredoka uppercase text-3xl md:text-5xl lg:text-6xl tracking-tight"
            >
              {slide.title}
            </motion.h1>
            {slide.subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-3 md:mt-4 text-base md:text-lg max-w-xl mx-auto font-poppins"
              >
                {slide.subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 md:mt-6"
            >
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center justify-center bg-tk-red text-white px-8 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk transition-colors"
              >
                {slide.ctaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Prev slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronLeft className="h-5 w-5 text-tk-black" />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronRight className="h-5 w-5 text-tk-black" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === idx ? "bg-white w-8" : "bg-white/60 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

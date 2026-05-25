"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MEGA_MENU_COLUMNS, AGE_GROUPS } from "@/lib/constants";
import brands from "@/data/brands.json";

export function MegaMenu({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-0 right-0 top-full bg-white shadow-xl border-t-2 border-tk-red z-40"
      onMouseLeave={onClose}
    >
      <div className="tk-container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6">
          {MEGA_MENU_COLUMNS.map((col) => (
            <div key={col.slug}>
              <Link
                href={`/collection/${col.slug}`}
                onClick={onClose}
                className="font-fredoka uppercase text-sm text-tk-red hover:text-tk-red-dk block mb-2"
              >
                {col.title}
              </Link>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="font-poppins text-sm text-tk-gray hover:text-tk-red"
                    >
                      › {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-tk-gray-lt mt-6 pt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <span className="font-fredoka uppercase text-tk-black">Shop by Age:</span>
          {AGE_GROUPS.filter((a) => a.value !== "3-5").map((a) => (
            <Link
              key={a.value}
              href={`/collection/all?age=${a.value}`}
              onClick={onClose}
              className="px-3 py-1 rounded-full border border-tk-gray-lt hover:border-tk-red hover:text-tk-red font-poppins"
            >
              {a.label}
            </Link>
          ))}
        </div>

        <div className="border-t border-tk-gray-lt mt-4 pt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span className="font-fredoka uppercase text-tk-black">Brands:</span>
          {brands.slice(0, 8).map((b) => (
            <Link
              key={b.slug}
              href={`/collection/all?brand=${b.slug}`}
              onClick={onClose}
              className="font-poppins text-tk-gray hover:text-tk-red"
            >
              {b.name}
            </Link>
          ))}
          <Link
            href="/brands"
            onClick={onClose}
            className="font-poppins text-tk-red hover:underline"
          >
            More →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

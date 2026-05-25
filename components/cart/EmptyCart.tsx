import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-tk-offwhite text-tk-gold mb-4">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <h2 className="font-fredoka uppercase text-2xl text-tk-black">
        Your Bag is Empty
      </h2>
      <p className="font-poppins text-tk-gray mt-2">
        Looks like you haven't added any toys yet.
      </p>
      <Link
        href="/collection/all"
        className="inline-flex items-center justify-center bg-tk-red text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk mt-5"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

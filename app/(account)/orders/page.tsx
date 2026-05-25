import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Package } from "lucide-react";

export const metadata = { title: "My Orders | Toy Kingdom Online" };

export default function OrdersPage() {
  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Orders" }]} />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        My Orders
      </h1>

      <div className="text-center py-16 bg-white border border-tk-gray-lt rounded-xl">
        <div className="inline-grid place-items-center h-16 w-16 rounded-full bg-tk-offwhite text-tk-gold mb-3">
          <Package className="h-8 w-8" />
        </div>
        <h2 className="font-fredoka uppercase text-xl text-tk-black">
          No Orders Yet
        </h2>
        <p className="text-tk-gray font-poppins mt-1">
          Once you place an order, it'll show up here.
        </p>
        <Link
          href="/collection/all"
          className="inline-flex items-center bg-tk-red text-white px-6 h-11 rounded-md font-fredoka uppercase mt-4 hover:bg-tk-red-dk"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

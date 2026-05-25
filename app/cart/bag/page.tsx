import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CartView } from "@/components/cart/CartView";

export const metadata = {
  title: "Your Bag | Toy Kingdom Online",
};

export default function CartPage() {
  return (
    <div className="tk-container py-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Your Bag" }]} />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        Your Shopping Bag
      </h1>
      <CartView />
    </div>
  );
}

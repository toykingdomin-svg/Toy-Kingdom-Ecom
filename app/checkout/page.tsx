import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata = { title: "Checkout | Toy Kingdom Online" };

export default function CheckoutPage() {
  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Bag", href: "/cart/bag" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mt-4 mb-6">
        Checkout
      </h1>
      <CheckoutView />
    </div>
  );
}

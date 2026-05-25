import { notFound } from "next/navigation";
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfoPanel } from "@/components/product/ProductInfoPanel";
import { Accordion } from "@/components/product/Accordion";
import { ProductGrid } from "@/components/product/ProductGrid";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return (productsData as Product[]).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = (productsData as Product[]).find(
    (p) => p.slug === params.slug,
  );
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | Toy Kingdom Online`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = (productsData as Product[]).find(
    (p) => p.slug === params.slug,
  );
  if (!product) notFound();

  const related = (productsData as Product[])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop Toys", href: "/collection/all" },
          {
            label: product.categoryLabel,
            href: `/collection/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <ProductImageGallery product={product} />
        <ProductInfoPanel product={product} />
      </div>

      <div className="mt-10 max-w-3xl">
        <Accordion title="Product Description" defaultOpen>
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Age & Safety">
          <ul className="list-disc pl-5 space-y-1">
            <li>Recommended age: {product.ageLabel}</li>
            <li>Adult supervision recommended for kids under 3.</li>
            <li>Small parts may pose a choking hazard.</li>
            <li>Conforms to Indian toy safety standards.</li>
          </ul>
        </Accordion>
        <Accordion title="Returns & Shipping Policy">
          <ul className="list-disc pl-5 space-y-1">
            <li>Free returns within 30 days of delivery.</li>
            <li>Free PAN India delivery on orders above ₹999.</li>
            <li>Ships from Mumbai in 1–2 business days.</li>
            <li>Cash on Delivery available on select pincodes.</li>
          </ul>
        </Accordion>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black mb-6">
            You May Also Like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

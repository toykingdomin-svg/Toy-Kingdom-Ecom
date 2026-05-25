import { notFound } from "next/navigation";
import brands from "@/data/brands.json";
import productsData from "@/data/products.json";
import type { Product, Brand } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CollectionView } from "@/components/collection/CollectionView";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const b = (brands as Brand[]).find((x) => x.slug === params.slug);
  if (!b) return { title: "Brand not found" };
  return {
    title: `${b.name} Toys | Toy Kingdom Online`,
    description: `Shop ${b.name} toys at Toy Kingdom Online. PAN India shipping, free delivery above ₹999.`,
  };
}

export default function BrandPage({ params }: PageProps) {
  const brand = (brands as Brand[]).find((b) => b.slug === params.slug);
  if (!brand) notFound();

  const scoped = (productsData as Product[]).filter(
    (p) => p.brandSlug === brand.slug,
  );

  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      />
      <div className="mt-4">
        <CollectionView products={scoped} title={brand.name} />
      </div>
    </div>
  );
}

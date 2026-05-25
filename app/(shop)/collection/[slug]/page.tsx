import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CollectionView } from "@/components/collection/CollectionView";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const cats = (categoriesData as Category[]).map((c) => ({ slug: c.slug }));
  return [{ slug: "all" }, { slug: "sale" }, { slug: "new-arrivals" }, ...cats];
}

export function generateMetadata({ params }: PageProps) {
  const title =
    params.slug === "all"
      ? "All Toys"
      : (categoriesData as Category[]).find((c) => c.slug === params.slug)
          ?.label ?? params.slug;
  return {
    title: `${title} | Toy Kingdom Online`,
    description: `Shop ${title} at Toy Kingdom Online — Mumbai's trusted toy retailer. PAN India shipping, free delivery above ₹999.`,
  };
}

export default function CollectionPage({ params }: PageProps) {
  const products = productsData as Product[];
  const categories = categoriesData as Category[];

  let scoped: Product[] = [];
  let title = "All Toys";

  if (params.slug === "all") {
    scoped = products;
  } else if (params.slug === "sale") {
    scoped = products.filter((p) => p.discount >= 20);
    title = "Sale";
  } else if (params.slug === "new-arrivals") {
    scoped = products.filter((p) => p.isNew);
    title = "New Arrivals";
  } else if (params.slug === "return-gifts") {
    scoped = products.filter((p) => p.price <= 999);
    title = "Return Gifts";
  } else {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) notFound();
    scoped = products.filter((p) => p.category === cat.id);
    title = cat.label;
  }

  return (
    <div className="tk-container py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop Toys", href: "/collection/all" },
          { label: title },
        ]}
      />
      <div className="mt-4">
        <CollectionView products={scoped} title={title} />
      </div>
    </div>
  );
}

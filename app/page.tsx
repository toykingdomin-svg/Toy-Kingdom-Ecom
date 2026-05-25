import { HeroBanner } from "@/components/home/HeroBanner";
import { PromoCodeStrip } from "@/components/home/PromoCodeStrip";
import { CategoryScrollRow } from "@/components/home/CategoryScrollRow";
import { BrandScrollRow } from "@/components/home/BrandScrollRow";
import { ProductSection } from "@/components/home/ProductSection";
import { FeaturedBanner } from "@/components/home/FeaturedBanner";
import { ShopByAge } from "@/components/home/ShopByAge";
import { AboutStrip } from "@/components/home/AboutStrip";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export default function HomePage() {
  const products = productsData as Product[];
  const newArrivals = products.filter((p) => p.isNew);
  const trending = products.filter((p) => p.isTrending);

  return (
    <>
      <HeroBanner />
      <PromoCodeStrip />
      <CategoryScrollRow />
      <BrandScrollRow />
      <ProductSection
        title="New Arrivals"
        viewAllHref="/collection/all?sort=new-arrival"
        products={newArrivals}
      />
      <FeaturedBanner />
      <ProductSection
        title="Trending Now"
        viewAllHref="/collection/all?sort=popularity"
        products={trending}
      />
      <ShopByAge />
      <AboutStrip />
      <NewsletterSection />
    </>
  );
}

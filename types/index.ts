export type AgeGroup = "0-2" | "2-5" | "3-5" | "5-8" | "8-12" | "12+";
export type Gender = "boys" | "girls" | "unisex";
export type SortBy =
  | "popularity"
  | "new-arrival"
  | "price-asc"
  | "price-desc"
  | "discount";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: string;
  categoryLabel: string;
  ageGroup: AgeGroup;
  ageLabel: string;
  gender: Gender;
  mrp: number;
  price: number;
  discount: number;
  images: string[];
  description: string;
  isNew?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  bg: string;
  textColor: string;
  image?: string;
}

export interface PromoCode {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  maxDiscount: number | null;
  firstOrderOnly?: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  qty: number;
}

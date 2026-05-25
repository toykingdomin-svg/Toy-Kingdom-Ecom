export const TK_BRAND = {
  name: "Toy Kingdom Online",
  tagline: "The Amazing Toy Store",
  address:
    "Ground Floor, 250/50 Nagdevi St, near Crawford Market, Mumbai 400003",
  whatsapp: "+91 77770 41555",
  whatsappRaw: "917777041555",
  email: "info@toykingdom.in",
  instagram: "@toykingdomonline",
  instagramUrl: "https://instagram.com/toykingdomonline",
};

export const PROMO_MESSAGES = [
  "🎁 Use code TK10 for 10% off above ₹999",
  "🚚 FREE Delivery on orders above ₹999 — PAN India",
  "📦 Wholesale enquiries welcome — DM @toykingdomonline",
  "↩️ Free returns within 30 days*",
];

export const NAV_LINKS = [
  { label: "Shop Toys", href: "/collection/all", hasMegaMenu: true },
  { label: "Brands", href: "/brands" },
  { label: "Sale", href: "/collection/sale" },
  { label: "Return Gifts", href: "/collection/return-gifts" },
  { label: "Wholesale", href: "/wholesale" },
];

export const AGE_GROUPS = [
  { value: "0-2", label: "0–2 Years" },
  { value: "2-5", label: "2–5 Years" },
  { value: "3-5", label: "3–5 Years" },
  { value: "5-8", label: "5–8 Years" },
  { value: "8-12", label: "8–12 Years" },
  { value: "12+", label: "12+ Years" },
];

export const GENDERS = [
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
  { value: "unisex", label: "Unisex" },
];

export const DISCOUNT_TIERS = [10, 20, 30, 50];

export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "new-arrival", label: "New Arrival" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
] as const;

export const MEGA_MENU_COLUMNS = [
  {
    title: "RC & Battery Operated",
    slug: "rc-battery",
    links: [
      { label: "Remote Control Cars", href: "/collection/rc-battery?tag=cars" },
      { label: "RC Drones", href: "/collection/rc-battery?tag=drone" },
      { label: "Battery Toys", href: "/collection/rc-battery?tag=battery" },
    ],
  },
  {
    title: "Die-Cast & Vehicles",
    slug: "die-cast-vehicles",
    links: [
      { label: "Die-Cast Cars", href: "/collection/die-cast-vehicles?tag=cars" },
      { label: "Track Sets", href: "/collection/die-cast-vehicles?tag=track" },
      { label: "Model Vehicles", href: "/collection/die-cast-vehicles" },
    ],
  },
  {
    title: "Action Figures",
    slug: "action-figures",
    links: [
      { label: "Marvel & DC", href: "/collection/action-figures?brand=marvel" },
      { label: "WWE Figures", href: "/collection/action-figures?tag=wwe" },
      { label: "All Action Figures", href: "/collection/action-figures" },
    ],
  },
  {
    title: "Dinosaurs",
    slug: "dinosaurs",
    links: [
      { label: "Dino Figures", href: "/collection/dinosaurs?tag=mini" },
      { label: "Dino Playsets", href: "/collection/dinosaurs?tag=playset" },
      { label: "RC Dinosaurs", href: "/collection/dinosaurs?tag=rc" },
    ],
  },
  {
    title: "Dolls & Princess",
    slug: "dolls-princess",
    links: [
      { label: "Doll Houses", href: "/collection/dolls-princess?tag=dollhouse" },
      { label: "Princess Sets", href: "/collection/dolls-princess?tag=princess" },
      { label: "Barbie", href: "/collection/dolls-princess?brand=barbie" },
    ],
  },
  {
    title: "Kitchen & Role-Play",
    slug: "kitchen-roleplay",
    links: [
      { label: "Kitchen Sets", href: "/collection/kitchen-roleplay?tag=kitchen" },
      { label: "Doctor Sets", href: "/collection/kitchen-roleplay?tag=doctor" },
      { label: "All Role-Play", href: "/collection/kitchen-roleplay" },
    ],
  },
  {
    title: "Construction & Building",
    slug: "construction-building",
    links: [
      { label: "Building Blocks", href: "/collection/construction-building?tag=blocks" },
      { label: "LEGO Sets", href: "/collection/construction-building?brand=lego" },
      { label: "Magnetic Tiles", href: "/collection/construction-building?tag=magnetic" },
    ],
  },
  {
    title: "Board Games",
    slug: "board-games",
    links: [
      { label: "Family Games", href: "/collection/board-games?tag=board" },
      { label: "Card Games", href: "/collection/board-games?tag=cards" },
      { label: "Strategy Games", href: "/collection/board-games?tag=strategy" },
    ],
  },
  {
    title: "Scooters & Ride-Ons",
    slug: "scooters-ride-ons",
    links: [
      { label: "Kids Scooters", href: "/collection/scooters-ride-ons?tag=scooter" },
      { label: "Ride-On Cars", href: "/collection/scooters-ride-ons?tag=rideon" },
      { label: "Tricycles", href: "/collection/scooters-ride-ons?tag=tricycle" },
    ],
  },
  {
    title: "Educational & DIY",
    slug: "educational-diy",
    links: [
      { label: "STEM Kits", href: "/collection/educational-diy?tag=stem" },
      { label: "Art & Craft", href: "/collection/educational-diy?tag=craft" },
      { label: "Play-Doh", href: "/collection/educational-diy?brand=play-doh" },
    ],
  },
];

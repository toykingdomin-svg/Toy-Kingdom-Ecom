import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "./globals.css";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Toy Kingdom Online — The Amazing Toy Store | Mumbai",
  description:
    "India's trusted toy retailer & wholesaler. Hot Wheels, LEGO, Barbie, Nerf, RC, dinosaurs & more. PAN India shipping. Free delivery above ₹999. WhatsApp +91 77770 41555.",
  keywords: [
    "toys",
    "Hot Wheels India",
    "LEGO India",
    "Barbie",
    "kids toys Mumbai",
    "toy wholesale India",
    "Toy Kingdom",
    "@toykingdomonline",
  ],
  openGraph: {
    title: "Toy Kingdom Online — The Amazing Toy Store",
    description:
      "Mumbai's trusted toy retailer & wholesaler. PAN India shipping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <PromoBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

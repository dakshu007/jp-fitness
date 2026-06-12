import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { business, SITE_URL } from "@/lib/data";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JP Fitness Kalapatti | Best Unisex Gym in Coimbatore",
    template: "%s",
  },
  description:
    "Rated 5.0 on Google. Unisex gym on Kalapatti Main Road, Coimbatore with expert trainers, modern equipment and weight loss programs. Plans from ₹4,999.",
  openGraph: {
    siteName: "JP Fitness",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JP Fitness, unisex gym in Kalapatti, Coimbatore. Rated 5.0 on Google.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "PL6l6wNavv8tFdYibcvLcoAo66nIgV897JJdKlGwhZE",
  },
};

/** ExerciseGym structured data; facts verified 11 June 2026 (see lib/data.ts). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: business.name,
  description:
    "Unisex gym in Kalapatti, Coimbatore offering strength training, weight loss and weight gain programs, personal training and diet guidance.",
  url: SITE_URL,
  telephone: "+919965972440",
  image: `${SITE_URL}/images/og-image.jpg`,
  priceRange: "₹4,999 - ₹9,999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "DM Complex, 800/6, Kalapatti Main Rd, Indira Nagar, Nehru Nagar West",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641048",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  hasMap: business.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "05:00",
      closes: "11:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "05:00",
      closes: "12:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating.value,
    reviewCount: String(business.rating.count),
  },
  sameAs: [business.instagramUrl, business.playStoreUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-ink font-body text-white antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

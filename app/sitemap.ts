import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-12");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/pricing/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/events/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/success-stories/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/achievements/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/gallery/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}

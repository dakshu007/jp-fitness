import {
  Dumbbell,
  Flame,
  HeartHandshake,
  MonitorSmartphone,
  Salad,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * SINGLE SOURCE OF TRUTH for all site content.
 * Components only render this data; they never hardcode copy.
 * All facts verified against the Google Business listing and Play Store
 * on 11 June 2026. Anything unverified is a clearly visible TODO.
 */

/** Replace with the custom domain once purchased (see README, open item 9). */
export const SITE_URL = "https://jpfitness.netlify.app";

export const business = {
  name: "JP Fitness",
  displayName: "JP FITNESS",
  tagline: "Transform your body. Build your confidence.",
  type: "Unisex gym",
  phoneDisplay: "+91 99659 72440",
  phoneHref: "tel:+919965972440",
  whatsappHref:
    "https://wa.me/919965972440?text=Hi%20JP%20Fitness!%20I%20want%20to%20know%20about%20membership%20plans.",
  addressLines: [
    "JP Fitness, DM Complex, 800/6, Kalapatti Main Rd",
    "Indira Nagar, Periyar Nagar, Nehru Nagar West",
    "Coimbatore, Tamil Nadu 641048",
  ],
  // TODO: confirm landmark wording with client (mentioned in a Google review)
  landmark: "4th floor, above Grace and Bakes, near Nehru Nagar signal",
  geo: { lat: 11.0562424, lng: 77.0386703 },
  rating: { value: "5.0", count: 21 },
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJRZBs_5FXqDsRWqSqdEm3JyA",
  reviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJRZBs_5FXqDsRWqSqdEm3JyA",
  instagramUrl: "https://www.instagram.com/jpfitnesskalapatti/",
  instagramHandle: "@jpfitnesskalapatti",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.cofox.kahunas.JPFitness",
  appName: "JP Fitness & Online Coaching",
  // TODO: ask client if an App Store link exists
  iosAppUrl: null as string | null,
} as const;

export function waLink(message: string): string {
  return `https://wa.me/919965972440?text=${encodeURIComponent(message)}`;
}

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Achievements", href: "/achievements" },
  { label: "Gallery", href: "/gallery" },
];

export interface HoursRow {
  days: string;
  morning: string;
  evening: string;
}

/** Client-provided hours. NOTE: Google Business Profile currently differs; client must sync it. */
export const hours: HoursRow[] = [
  {
    days: "Monday to Saturday",
    morning: "5:00 AM - 11:00 AM",
    evening: "5:00 PM - 9:30 PM",
  },
  { days: "Sunday", morning: "5:00 AM - 12:00 PM", evening: "Closed" },
];

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 5, decimals: 1, label: "Google rating" },
  { value: 21, suffix: "+", label: "Five-star reviews" },
  { value: 6, suffix: "+", label: "Certified trainers" },
  { value: 7, label: "Days open a week" },
];

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyChooseUs: FeatureItem[] = [
  {
    icon: Dumbbell,
    title: "Modern equipment",
    description: "New machines for every muscle group, maintained daily.",
  },
  {
    icon: UserCheck,
    title: "Expert trainers",
    description:
      "6+ certified trainers who correct your form and track your progress.",
  },
  {
    icon: Flame,
    title: "Weight gain and fat loss programs",
    description: "Structured programs built around your goal, not a generic routine.",
  },
  {
    icon: HeartHandshake,
    title: "Friendly environment",
    description: "A motivating space where men and women train comfortably.",
  },
];

export const programs: FeatureItem[] = [
  {
    icon: Dumbbell,
    title: "Strength training",
    description: "Build muscle and raw strength with free weights and machines.",
  },
  {
    icon: Flame,
    title: "Weight loss",
    description: "Fat loss training paired with diet guidance that fits your routine.",
  },
  {
    icon: TrendingUp,
    title: "Weight gain",
    description: "Structured muscle and mass building plans for hard gainers.",
  },
  {
    icon: UserCheck,
    title: "Personal training",
    description: "One-on-one coaching with a plan made for your body.",
  },
  {
    icon: Salad,
    title: "Diet guidance",
    description: "Customised nutrition advice included with every membership.",
  },
  {
    icon: MonitorSmartphone,
    title: "Online coaching",
    description: "Train from anywhere with workouts and tracking in the JP Fitness app.",
  },
];

export interface Plan {
  id: string;
  duration: string;
  priceDisplay: string;
  best: boolean;
}

/**
 * Prices from the client's current offer poster.
 * TODO: confirm with client whether these are permanent or limited-time offer
 * prices. Never invent a regular price or strike-through price.
 */
export const plans: Plan[] = [
  { id: "3-months", duration: "3 months", priceDisplay: "₹4,999", best: false },
  { id: "6-months", duration: "6 months", priceDisplay: "₹6,999", best: false },
  { id: "12-months", duration: "12 months", priceDisplay: "₹9,999", best: true },
];

export const planInclusions: string[] = [
  "Full gym access",
  "All equipment",
  "Trainer guidance",
  "Diet guidance",
];

export function planWaLink(plan: Plan): string {
  return waLink(
    `Hi JP Fitness! I want to join the ${plan.duration} plan (${plan.priceDisplay}).`
  );
}

export interface Review {
  text: string;
  name: string;
  /** True until Bala replaces the card with verbatim review text + first name from the Google listing. */
  todo: boolean;
}

export const reviews: Review[] = [
  {
    text: "Well-maintained equipment and a motivating environment. Trainer John gives personalised attention and corrects form.",
    name: "TODO: reviewer first name",
    todo: true,
  },
  {
    text: "All machines and the gym are new.",
    name: "TODO: reviewer first name",
    todo: true,
  },
  {
    text: "Great equipment and a motivating atmosphere.",
    name: "TODO: reviewer first name",
    todo: true,
  },
  {
    text: "Excellent ambience.",
    name: "TODO: reviewer first name",
    todo: true,
  },
  {
    text: "TODO: copy verbatim review text from the Google listing.",
    name: "TODO: reviewer first name",
    todo: true,
  },
  {
    text: "TODO: copy verbatim review text from the Google listing.",
    name: "TODO: reviewer first name",
    todo: true,
  },
];

export interface Trainer {
  name: string;
  specialisation: string;
  todo: boolean;
}

export const trainers: Trainer[] = [
  {
    // Praised by name in Google reviews. TODO: confirm spelling, full name, photo.
    name: "John",
    specialisation: "Personal training",
    todo: true,
  },
  { name: "TODO: trainer name", specialisation: "TODO: specialisation", todo: true },
  { name: "TODO: trainer name", specialisation: "TODO: specialisation", todo: true },
  { name: "TODO: trainer name", specialisation: "TODO: specialisation", todo: true },
  { name: "TODO: trainer name", specialisation: "TODO: specialisation", todo: true },
  { name: "TODO: trainer name", specialisation: "TODO: specialisation", todo: true },
];

export interface Faq {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export const faqs: Faq[] = [
  {
    question: "How much does a gym membership cost at JP Fitness?",
    answer:
      "JP Fitness membership costs ₹4,999 for 3 months, ₹6,999 for 6 months and ₹9,999 for 12 months. Every plan includes full gym access, all equipment, trainer guidance and diet guidance.",
  },
  {
    question: "Is JP Fitness a unisex gym?",
    answer:
      "Yes. JP Fitness is a unisex gym where both men and women train, with separate guidance from our certified trainers whenever you need it.",
  },
  {
    question: "What are the gym timings in Kalapatti?",
    answer:
      "Monday to Saturday: 5:00 AM to 11:00 AM and 5:00 PM to 9:30 PM. Sunday: 5:00 AM to 12:00 PM. We are open 7 days a week.",
  },
  {
    question: "Do you provide diet plans?",
    answer:
      "Yes. Customised diet guidance is included with every membership, so your nutrition matches your training goal.",
  },
  {
    question: "Is personal training available?",
    answer:
      "Yes. Personal training and online coaching are available, with pricing on request. Call or WhatsApp +91 99659 72440 for details.",
    link: { href: "/success-stories", label: "See real member transformations" },
  },
  {
    question: "Where exactly is the gym located?",
    answer:
      "JP Fitness is at DM Complex, 800/6, Kalapatti Main Road, Coimbatore 641048, on the 4th floor above Grace and Bakes, near the Nehru Nagar signal.",
  },
];

export interface GalleryCategory {
  id: "all" | "equipment" | "workouts" | "events";
  label: string;
}

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "equipment", label: "Equipment" },
  { id: "workouts", label: "Workouts" },
  { id: "events", label: "Events" },
];

export interface GalleryImage {
  id: string;
  category: Exclude<GalleryCategory["id"], "all">;
  /** Visible placeholder label until the client's real photo replaces it. */
  label: string;
  alt: string;
  /** Tailwind aspect class so the masonry layout holds when real photos drop in. */
  aspect: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-01",
    category: "equipment",
    label: "Photo: dumbbell rack",
    alt: "Dumbbell rack at JP Fitness gym in Kalapatti",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gallery-02",
    category: "workouts",
    label: "Photo: member on chest press",
    alt: "Member training on the chest press at JP Fitness",
    aspect: "aspect-[3/4]",
  },
  {
    id: "gallery-03",
    category: "equipment",
    label: "Photo: cable machines",
    alt: "Cable crossover machines at JP Fitness Coimbatore",
    aspect: "aspect-square",
  },
  {
    id: "gallery-04",
    category: "events",
    label: "Photo: gym opening event",
    alt: "Opening event at JP Fitness in Kalapatti",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gallery-05",
    category: "workouts",
    label: "Photo: personal training session",
    alt: "Trainer guiding a member through a workout at JP Fitness",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gallery-06",
    category: "equipment",
    label: "Photo: cardio row",
    alt: "Treadmills and cardio equipment at JP Fitness",
    aspect: "aspect-[3/4]",
  },
  {
    id: "gallery-07",
    category: "workouts",
    label: "Photo: squat rack workout",
    alt: "Member squatting at the rack in JP Fitness gym",
    aspect: "aspect-square",
  },
  {
    id: "gallery-08",
    category: "equipment",
    label: "Photo: plate-loaded machines",
    alt: "Plate-loaded strength machines at JP Fitness",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gallery-09",
    category: "events",
    label: "Photo: member meet-up",
    alt: "Members at a JP Fitness community event",
    aspect: "aspect-[3/4]",
  },
  {
    id: "gallery-10",
    category: "workouts",
    label: "Photo: stretching area",
    alt: "Members warming up in the stretching area at JP Fitness",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gallery-11",
    category: "equipment",
    label: "Photo: free weights area",
    alt: "Free weights training area at JP Fitness Kalapatti",
    aspect: "aspect-square",
  },
  {
    id: "gallery-12",
    category: "events",
    label: "Photo: posing practice session",
    alt: "Bodybuilding posing practice at JP Fitness",
    aspect: "aspect-[3/4]",
  },
];

export interface InstaTile {
  id: string;
  label: string;
  alt: string;
}

export const instagramTiles: InstaTile[] = [
  { id: "insta-1", label: "Post: training video", alt: "JP Fitness Instagram post of a training video" },
  { id: "insta-2", label: "Post: transformation update", alt: "JP Fitness Instagram post of a member transformation" },
  { id: "insta-3", label: "Post: gym floor", alt: "JP Fitness Instagram post of the gym floor" },
  { id: "insta-4", label: "Post: workout reel", alt: "JP Fitness Instagram workout reel" },
  { id: "insta-5", label: "Post: member shout-out", alt: "JP Fitness Instagram post celebrating a member" },
  { id: "insta-6", label: "Post: offer poster", alt: "JP Fitness Instagram post with a membership offer" },
];

export const marqueeItems: string[] = [
  "JOIN NOW",
  "5.0 ON GOOGLE",
  "UNISEX GYM",
  "KALAPATTI, COIMBATORE",
  "6+ CERTIFIED TRAINERS",
  "OPEN 7 DAYS",
];

export const appBullets: string[] = [
  "Workout plans built by your trainer",
  "Diet tracking with daily targets",
  "Progress logging for every session",
];

export interface Transformation {
  id: string;
  /** Visible until client photos + written consent arrive. */
  todoLabel: string;
}

export const transformations: Transformation[] = [
  { id: "client-1", todoLabel: "TODO: client photos + written consent" },
  { id: "client-2", todoLabel: "TODO: client photos + written consent" },
  { id: "client-3", todoLabel: "TODO: client photos + written consent" },
];

export interface TimelineEntry {
  marker: string;
  title: string;
  detail: string;
  todo: boolean;
}

export const achievementsTimeline: TimelineEntry[] = [
  {
    marker: "TODO: year",
    title: "JP Fitness opens in Kalapatti",
    detail: "TODO: opening date and story from client.",
    todo: true,
  },
  {
    marker: "TODO: year",
    title: "Competition history",
    detail: "TODO: contests entered and placements, from client.",
    todo: true,
  },
  {
    marker: "TODO: year",
    title: "Trainer certifications",
    detail: "TODO: certification names and issuing bodies, from client.",
    todo: true,
  },
];

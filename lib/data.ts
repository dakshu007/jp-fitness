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
 * Business facts verified against the Google Business listing and Play Store
 * on 11 June 2026. Photos and event poster supplied by the client on
 * 12 June 2026. Anything still unverified is a clearly visible TODO.
 */

/** Replace with the custom domain once purchased (see README, open item 9). */
export const SITE_URL = "https://jpfitnesskalapatti.netlify.app";

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
  /** Client's logo (92px source with baked-in dark background). TODO: request a larger transparent master file. */
  logoSrc: "/images/logo.png",
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
  { label: "Events", href: "/events" },
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

/** A real photo with intrinsic dimensions (keeps CLS at 0). */
export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface GalleryPhoto extends Photo {
  category: "floor" | "equipment" | "events";
}

export interface GalleryCategory {
  id: "all" | GalleryPhoto["category"];
  label: string;
}

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "floor", label: "Gym floor" },
  { id: "equipment", label: "Equipment" },
  { id: "events", label: "Events" },
];

/** Client's own photos, imported 12 June 2026 (scripts/import-photos.mjs). */
export const galleryPhotos: GalleryPhoto[] = [
  { id: "gym-04", src: "/images/gallery/gym-04.webp", width: 765, height: 1020, category: "floor", alt: "JP Fitness training floor with red LED lighting and turf strip" },
  { id: "gym-05", src: "/images/gallery/gym-05.webp", width: 765, height: 1020, category: "equipment", alt: "Dumbbell racks along the mirror wall at JP Fitness" },
  { id: "meetup-02", src: "/images/gallery/meetup-02.webp", width: 1400, height: 1867, category: "events", alt: "Deadlift demonstration on the platform during a JP Fitness members workshop" },
  { id: "gym-01", src: "/images/gallery/gym-01.webp", width: 574, height: 1020, category: "equipment", alt: "Power rack with competition bumper plates at JP Fitness" },
  { id: "gym-09", src: "/images/gallery/gym-09.webp", width: 765, height: 1020, category: "floor", alt: "Rows of strength machines on the JP Fitness training floor" },
  { id: "meetup-01", src: "/images/gallery/meetup-01.webp", width: 1400, height: 1050, category: "events", alt: "Members gathered for a training workshop at JP Fitness Kalapatti" },
  { id: "gym-08", src: "/images/gallery/gym-08.webp", width: 574, height: 1020, category: "equipment", alt: "Smith machine and functional trainer cage at JP Fitness" },
  { id: "gym-15", src: "/images/gallery/gym-15.webp", width: 765, height: 1020, category: "floor", alt: "Strength machines under red LED lights at JP Fitness" },
  { id: "meetup-04", src: "/images/gallery/meetup-04.webp", width: 1400, height: 1050, category: "events", alt: "Coach addressing members at a JP Fitness meet-up" },
  { id: "gym-13", src: "/images/gallery/gym-13.webp", width: 765, height: 1020, category: "equipment", alt: "Free weights area with benches and dumbbells at JP Fitness" },
  { id: "gym-02", src: "/images/gallery/gym-02.webp", width: 765, height: 1020, category: "floor", alt: "Lat pulldown and machine floor under the red ceiling lights" },
  { id: "meetup-03", src: "/images/gallery/meetup-03.webp", width: 1400, height: 1867, category: "events", alt: "Members watching a lifting demonstration at JP Fitness" },
  { id: "gym-10", src: "/images/gallery/gym-10.webp", width: 574, height: 1020, category: "equipment", alt: "Treadmills by the windows at JP Fitness" },
  { id: "gym-11", src: "/images/gallery/gym-11.webp", width: 765, height: 1020, category: "floor", alt: "Hack squat and plate-loaded machines beside the turf at JP Fitness" },
  { id: "gym-03", src: "/images/gallery/gym-03.webp", width: 574, height: 1020, category: "equipment", alt: "Pec fly and rear delt machine at JP Fitness" },
  { id: "gym-07", src: "/images/gallery/gym-07.webp", width: 765, height: 1020, category: "floor", alt: "Plate-loaded machines lined up at JP Fitness Kalapatti" },
  { id: "meetup-05", src: "/images/gallery/meetup-05.webp", width: 1400, height: 1867, category: "events", alt: "JP Fitness members at a group training session" },
  { id: "gym-06", src: "/images/gallery/gym-06.webp", width: 571, height: 1020, category: "floor", alt: "Deadlift mural and red lighting inside JP Fitness" },
  { id: "gym-14", src: "/images/gallery/gym-14.webp", width: 576, height: 1020, category: "floor", alt: "Mirror wall and strength machines at JP Fitness" },
  { id: "gym-12", src: "/images/gallery/gym-12.webp", width: 765, height: 1020, category: "floor", alt: "Preacher curl and plate-loaded machines at JP Fitness" },
  { id: "gym-17", src: "/images/gallery/gym-17.webp", width: 576, height: 1020, category: "floor", alt: "Evening view of the JP Fitness machine floor" },
];

/** Hero background: the gym's own training floor (extra-compressed copy; the
 * ink overlay hides the compression, and a small file keeps LCP fast). */
export const heroPhoto: Photo = {
  id: "hero",
  src: "/images/hero-main.webp",
  width: 700,
  height: 933,
  alt: "Training floor with red LED lighting and turf strip at JP Fitness gym in Kalapatti, Coimbatore",
};

/** Street view of the building: the red JP Fitness board above Grace and Bakes. */
export const buildingPhoto: Photo = {
  id: "building",
  src: "/images/gallery/gym-16.webp",
  width: 1360,
  height: 1020,
  alt: "JP Fitness signboard on the DM Complex building, above Grace and Bakes on Kalapatti Main Road",
};

/** Member transformations: before/after collages supplied by the client. */
export const transformationPhotos: Photo[] = [
  { id: "transformation-01", src: "/images/transformations/transformation-01.webp", width: 1000, height: 1000, alt: "JP Fitness member weight loss transformation, before and after" },
  { id: "transformation-02", src: "/images/transformations/transformation-02.webp", width: 1000, height: 899, alt: "JP Fitness member transformation, before and after comparison" },
  { id: "transformation-03", src: "/images/transformations/transformation-03.webp", width: 1000, height: 1000, alt: "JP Fitness member body transformation, before and after" },
  { id: "transformation-04", src: "/images/transformations/transformation-04.webp", width: 1000, height: 1000, alt: "JP Fitness member fitness transformation, before and after" },
  { id: "transformation-05", src: "/images/transformations/transformation-05.webp", width: 899, height: 1600, alt: "JP Fitness member muscle gain transformation, before and after" },
  { id: "transformation-06", src: "/images/transformations/transformation-06.webp", width: 1000, height: 1000, alt: "JP Fitness member transformation result, before and after" },
  { id: "transformation-07", src: "/images/transformations/transformation-07.webp", width: 1000, height: 800, alt: "JP Fitness member progress photos, before and after" },
  { id: "transformation-08", src: "/images/transformations/transformation-08.webp", width: 1000, height: 1250, alt: "JP Fitness member transformation journey, before and after" },
  { id: "transformation-09", src: "/images/transformations/transformation-09.webp", width: 1000, height: 563, alt: "JP Fitness member weight gain transformation from 60 kg to 73 kg" },
  { id: "transformation-10", src: "/images/transformations/transformation-10.webp", width: 1000, height: 1000, alt: "JP Fitness member physique transformation, before and after" },
  { id: "transformation-11", src: "/images/transformations/transformation-11.webp", width: 1000, height: 563, alt: "JP Fitness member strength transformation, before and after" },
  { id: "transformation-12", src: "/images/transformations/transformation-12.webp", width: 1000, height: 1320, alt: "JP Fitness member fat loss transformation, before and after" },
  { id: "transformation-13", src: "/images/transformations/transformation-13.webp", width: 899, height: 1599, alt: "JP Fitness member muscle building transformation, before and after" },
];

/** Six real gym photos rendered as square tiles linking to Instagram. */
export const instagramTiles: Photo[] = [
  { id: "insta-1", src: "/images/gallery/gym-04.webp", width: 765, height: 1020, alt: "JP Fitness training floor with red lighting" },
  { id: "insta-2", src: "/images/gallery/gym-01.webp", width: 574, height: 1020, alt: "Power rack and bumper plates at JP Fitness" },
  { id: "insta-3", src: "/images/gallery/meetup-02.webp", width: 1400, height: 1867, alt: "Deadlift session at a JP Fitness members workshop" },
  { id: "insta-4", src: "/images/gallery/gym-05.webp", width: 765, height: 1020, alt: "Dumbbell racks at JP Fitness" },
  { id: "insta-5", src: "/images/gallery/gym-15.webp", width: 765, height: 1020, alt: "Machine floor under red LED lights at JP Fitness" },
  { id: "insta-6", src: "/images/gallery/gym-08.webp", width: 574, height: 1020, alt: "Functional trainer cage at JP Fitness" },
];

export const marqueeItems: string[] = [
  "JOIN NOW",
  "5.0 ON GOOGLE",
  "UNISEX GYM",
  "KALAPATTI, COIMBATORE",
  "JP STRENGTH CLASSIC · 28 JUNE 2026",
  "OPEN 7 DAYS",
];

export const appBullets: string[] = [
  "Workout plans built by your trainer",
  "Diet tracking with daily targets",
  "Progress logging for every session",
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
    marker: "28 June 2026",
    title: "JP Strength Classic 2026",
    detail:
      "JP Fitness Centre presents an open state and open district bench press and deadlift championship in Coimbatore.",
    todo: false,
  },
];

/** JP Strength Classic 2026. All facts from the client's official event poster. */
export const strengthClassic = {
  name: "JP Strength Classic 2026",
  shortName: "JP STRENGTH CLASSIC 2026",
  tagline: "Open State & Open District Bench Press and Deadlift Championship 2026",
  presenter: "JP Fitness Centre",
  organisers:
    "Amateur Powerlifting Association and Amateur Powerlifting Association of Coimbatore (registered sports associations)",
  affiliations: "Affiliated with WPF, EPC, UWSFF, APSFC and NSF",
  dateDisplay: "Sunday, 28 June 2026",
  timeDisplay: "8:00 AM",
  isoStart: "2026-06-28T08:00:00+05:30",
  venue: "Coimbatore",
  venueNote: "Championship venue details announced soon.",
  weighIn: {
    dateDisplay: "Saturday, 27 June 2026",
    timeDisplay: "5:00 PM to 8:00 PM",
    note: "Coimbatore district body-weight check; venue details update at the same time.",
  },
  fees: [
    { label: "State Championship", price: "₹600" },
    { label: "District Championship", price: "₹500" },
  ],
  contacts: [
    { role: "Organiser", phoneDisplay: "+91 99659 72440", href: "tel:+919965972440" },
    { role: "Organiser", phoneDisplay: "+91 95008 58109", href: "tel:+919500858109" },
    { role: "APA Secretary", phoneDisplay: "+91 98422 60023", href: "tel:+919842260023" },
  ],
  invite:
    "All athletes, coaches, referees, gym owners and sports enthusiasts are cordially invited to participate and support the championship.",
  motto: "Lift more. Be stronger. Be the champion!",
  poster: {
    id: "jp-strength-classic-2026",
    src: "/images/events/jp-strength-classic-2026.webp",
    width: 853,
    height: 1280,
    alt: "JP Strength Classic 2026 poster: open state and open district bench press and deadlift championship on 28 June 2026 in Coimbatore, entry ₹600 state and ₹500 district",
  } satisfies Photo,
} as const;

export const eventWaLink = waLink(
  "Hi JP Fitness! I want to know about the JP Strength Classic 2026 championship."
);

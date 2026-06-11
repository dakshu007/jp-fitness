# JP Fitness Website — Build Specification

**For: Claude Code** | Prepared: June 2026 | Status: Ready to build

## How to use this file

1. Create an empty project folder, place this file inside it.
2. Open Claude Code in that folder.
3. Kickoff prompt: `Read JP-FITNESS-SPEC.md fully before writing any code. Build Phase 1 only, then stop and show me the result.`
4. Proceed phase by phase (Section 12). Do not skip the QA checklist (Section 13).

**Golden rules for Claude Code:**
- NEVER invent facts, statistics, member counts, years in business, weight-loss numbers, or testimonials. Use only the verified data in Section 3. Anything unknown gets a clearly visible `TODO:` placeholder.
- All content lives in `lib/data.ts` (single source of truth). Components only render data, never hardcode copy.
- Every image needs descriptive alt text. Every icon-only button needs an aria-label.
- Do not use em dashes anywhere in site copy. No AI-sounding filler phrases ("unleash your potential", "elevate your fitness journey", "look no further").

---

## 1. Project overview

- **Client:** JP Fitness, a unisex gym in Kalapatti, Coimbatore, Tamil Nadu. Recently opened, rated 5.0 on Google (21 reviews). Run by a competitive bodybuilder with 6+ trainers.
- **Goal:** Lead generation. Every page should drive one of three actions: call, WhatsApp, or walk in. Secondary goal: app downloads and Instagram follows.
- **Audience:** Men and women in east Coimbatore (Kalapatti, Saravanampatti, Vilankurichi, Peelamedu, airport area) searching for a gym, weight loss, weight gain, or personal training. Mostly mobile users.
- **Pages (5):** Home `/`, Pricing `/pricing`, Success Stories `/success-stories`, Achievements `/achievements`, Gallery `/gallery`.
- **Definition of done:** Lighthouse mobile: SEO 100, Accessibility 100, Best Practices 100, Performance 95+. Fully responsive 360px to 1440px+. All schema validates in Google's Rich Results Test.

## 2. Tech stack

- Next.js 15+ (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme`)
- `motion` package (formerly framer-motion), imported from `motion/react`, wrapped in `LazyMotion` with `domAnimation` features
- `lucide-react` for icons
- `next/font/google` for fonts, `next/image` for all images
- No CMS, no database, no client-side data fetching. All pages statically generated.
- Deploy target: Vercel (free tier), custom domain.
- Keep dependencies minimal. Do not add UI kits, carousel libraries, or lightbox libraries; build those as small custom components.

## 3. Verified business data (copy into `lib/data.ts`)

All facts below were verified against the Google Business listing and Play Store on 11 June 2026.

```
Business name:   JP Fitness (display as "JP FITNESS" in display font contexts)
Tagline:         Transform your body. Build your confidence.   (from client's own poster)
Type:            Unisex gym
Phone (display): +91 99659 72440
Phone (href):    tel:+919965972440
WhatsApp:        https://wa.me/919965972440?text=Hi%20JP%20Fitness!%20I%20want%20to%20know%20about%20membership%20plans.
Address:         JP Fitness, DM Complex, 800/6, Kalapatti Main Rd, Indira Nagar,
                 Periyar Nagar, Nehru Nagar West, Coimbatore, Tamil Nadu 641048
Landmark:        4th floor, above Grace and Bakes, near Nehru Nagar signal
                 (mentioned in a Google review; TODO: confirm wording with client)
Geo:             11.0562424, 77.0386703
Google rating:   5.0 (21 reviews)  -> show as "5.0 ★ on Google" + "21+ happy reviews"
Maps link:       https://www.google.com/maps/place/?q=place_id:ChIJRZBs_5FXqDsRWqSqdEm3JyA
Review link:     https://search.google.com/local/writereview?placeid=ChIJRZBs_5FXqDsRWqSqdEm3JyA
Instagram:       https://www.instagram.com/jpfitnesskalapatti/
Android app:     "JP Fitness & Online Coaching" (by Kahunas)
                 https://play.google.com/store/apps/details?id=com.cofox.kahunas.JPFitness
iOS app:         TODO: ask client if an App Store link exists
Trainers:        6+ certified trainers (one trainer named John is praised in reviews;
                 TODO: full names, photos, specialisations from client)
```

**Opening hours (provided by client; use these on the site):**

| Day | Morning | Evening |
|---|---|---|
| Monday to Saturday | 5:00 AM - 11:00 AM | 5:00 PM - 9:30 PM |
| Sunday | 5:00 AM - 12:00 PM | Closed |

> **DATA CONFLICT (flag to client, do not silently resolve):** The Google Business Profile currently shows Mon-Sat 5:30 AM - 10:00 PM and Sunday 5:30 - 10:00 AM, which differs from the hours above. The site uses the client-provided hours, but the client MUST update the Google Business Profile to match. Mismatched hours hurt local rankings and trust.

**Membership plans (from the client's current offer poster):**

| Plan | Price | Notes |
|---|---|---|
| 3 months | ₹4,999 | |
| 6 months | ₹6,999 | |
| 12 months | ₹9,999 | Mark as "Best value" |

> **PRICING CAUTION:** The poster labels these "Limited time special offer". TODO: confirm with client whether these are permanent prices or offer prices. If offer prices, add an "Offer" badge and ask for the regular prices, or omit strike-through pricing entirely. Never invent a regular price.

**Services (all confirmed):** Strength training, weight loss programs, weight gain programs, personal training, customised diet guidance, online coaching (via the app), contest preparation.

**Real Google review themes for testimonials** (Claude Code: render these as placeholder cards; Bala will replace with verbatim review text + first names copied from the Google listing):
1. Well-maintained equipment, motivating environment, trainer John gives personalised attention and corrects form
2. All machines and gym are new
3. Great equipment, motivating atmosphere
4. Excellent ambience
5. TODO: 2 more reviews copied verbatim from the listing

## 4. Brand and design system

### 4.1 Colors (extracted from the client's actual logo)

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #E42439;        /* logo red: CTAs, highlights, accents only */
  --color-brand-dark: #B81C2D;   /* hover state for red elements */
  --color-ink: #0A0A0A;          /* page background */
  --color-surface: #161616;      /* cards, raised sections */
  --color-line: #262626;         /* borders, dividers */
  --color-muted: #9CA3AF;        /* secondary text */
  /* white #FFFFFF for primary text */
}
```

**Usage rules (strict):**
- Ratio roughly 60% ink backgrounds / 30% white and muted text / 10% brand red.
- Red is ONLY for: primary CTA buttons (white text on red), one highlighted word per headline, stat numbers, icons, active nav state, badges, the chevron motif.
- Red text on dark backgrounds only at 24px+ (large-text contrast). Never red body text.
- Body text: white on ink/surface. Secondary text: muted #9CA3AF (passes 4.5:1 on ink, do NOT use it on surface for text below 18px without checking contrast; prefer #B5BAC3 on surface if needed).
- White text on brand red passes AA; never put muted gray text on red.

### 4.2 Typography

- **Display (headings, stats, nav logo):** Anton via `next/font/google`, used uppercase with `letter-spacing: 0.01em`. Single weight. This matches the condensed bold caps on the client's own posters.
- **Body:** Inter via `next/font/google`, weights 400/500/600.
- Type scale: hero H1 clamp(2.5rem, 7vw, 5rem); section H2 clamp(1.75rem, 4vw, 2.75rem); body 1rem/1.7.
- One H1 per page. Logical H2/H3 hierarchy (Lighthouse SEO checks this).

### 4.3 Visual language (derived from the client's existing poster, not generic defaults)

The client's posters use: red chevron arrows (»»» «««), dumbbell-flanked section labels, a red brush-stroke highlight behind key words, star ratings, condensed caps type. Echo these:

- **Signature element:** a thin red chevron marquee strip (»  JOIN NOW  »  5.0 ON GOOGLE  »  UNISEX GYM  »  KALAPATTI  ») between the hero and the next section, slowly scrolling via CSS animation, paused for `prefers-reduced-motion`.
- Section eyebrows: small uppercase label flanked by a lucide `Dumbbell` icon on the left, e.g. `🏋 MEMBERSHIP PLANS` (icon, not emoji).
- One word per major headline gets a red SVG brush-slash underline (inline SVG, no images).
- Sharp, disciplined look: border-radius 8px max on cards, 6px on buttons. Flat surfaces, 1px #262626 borders. No glows, no gradients except a subtle ink-to-transparent overlay on hero imagery for text legibility.
- Spacing: generous. Section padding `py-20 md:py-28`. Never cramped.

### 4.4 Logo

- TODO (Bala): obtain transparent SVG or 512px+ transparent PNG from client. The current file is a 92px thumbnail with a baked-in background and will look broken on the dark site.
- Navbar: logo at 36-40px height + "JP FITNESS" wordmark in Anton.
- Generate favicon.ico, icon.png (512), apple-icon.png (180) from the logo once received. Use a red "JP" on black placeholder until then.

## 5. Page specifications

### 5.0 Global components

**Navbar (sticky):** transparent over hero, gains `bg-ink/90 backdrop-blur border-b border-line` on scroll. Logo left; links: Home, Pricing, Success Stories, Achievements, Gallery; right: red "Join now" button → WhatsApp link. Mobile: hamburger (aria-label "Open menu") opening a full-screen overlay menu with staggered link animation. Tap targets 44px+.

**Floating WhatsApp button:** bottom-right, green #25D366 circle, lucide `MessageCircle` icon, aria-label "Chat on WhatsApp", visible on all pages, above the fold on mobile but never covering CTAs.

**Footer:** 4 columns on desktop (brand + tagline + social icons / Quick links / Hours table / Contact: address, landmark, phone, "Get directions" link to Maps URL). Below: app download row ("Train with the JP Fitness app" + Google Play badge). Bottom bar: © 2026 JP Fitness · Built by TODO_BALA_CREDIT (optional portfolio credit with rel="nofollow").

**CTA band (reusable):** red background section, white Anton headline "Ready to start?", white-outline phone button + black WhatsApp button. Used at the bottom of every page above the footer.

### 5.1 Home `/`

Section order:

1. **Hero:** full-viewport. Background: `hero-main.jpg` via `next/image` with `priority` and a dark overlay (`bg-ink/60`). Eyebrow: "UNISEX GYM · KALAPATTI, COIMBATORE". H1: "TRANSFORM YOUR BODY. BUILD YOUR CONFIDENCE." with "CONFIDENCE" red-slashed. Subline: one sentence, plain. CTAs: red "Start with a free visit" (WhatsApp) + outline "View membership plans" (→ /pricing). Trust row beneath: ★ 5.0 on Google · 21+ reviews · 6+ certified trainers.
2. **Chevron marquee strip** (signature element).
3. **Stats band:** 4 animated counters: 5.0 Google rating, 21+ five-star reviews, 6+ trainers, 7 days open a week. (No invented member counts.)
4. **Why choose us:** 4 cards from the client's poster: Modern equipment, Expert trainers, Weight gain / fat loss programs, Friendly environment. Lucide icons, 1-line descriptions.
5. **Programs:** 6 cards: Strength training, Weight loss, Weight gain, Personal training, Diet guidance, Online coaching. Each links to /pricing with anchor text in the card CTA.
6. **Membership preview:** 3 plan cards (12-month highlighted with a 2px red border + "Best value" badge). Link: "See full gym membership plans in Coimbatore" → /pricing.
7. **Testimonials:** "Rated 5.0 by our members" + Google logo mark, grid of 4-6 review cards (5 red stars, review text, first name), button "Read all reviews on Google" → Maps link.
8. **Trainers strip:** horizontal scroll of 6 trainer cards (photo, name, specialisation). All TODO placeholders with visible labels until client provides.
9. **App section:** dark surface card. Left: phone mockup image `app-mockup.png`. Right: H2 "Carry your coach in your pocket", 3 bullets (workout plans, diet tracking, progress logging), Google Play badge → Play Store link. (Official badge from https://play.google.com/intl/en_us/badges/)
10. **Instagram:** H2 "Inside JP Fitness", static 6-tile image grid (local images, NOT an embed script), each tile links to the Instagram profile. Button "Follow @jpfitnesskalapatti".
11. **Visit us:** two columns: hours table + address with landmark, phone, and a red "Get directions" button → Maps URL. Below: map shown as a click-to-load facade (static dark panel with a "Load map" button that injects the Google Maps embed iframe on click; keeps Performance high).

### 5.2 Pricing `/pricing`

1. Hero (short): H1 "MEMBERSHIP PLANS", subline with location keyword: "Simple pricing for the best gym experience in Kalapatti, Coimbatore."
2. 3 plan cards, larger versions, each listing inclusions: full gym access, all equipment, trainer guidance, diet guidance. 12-month highlighted. Each card CTA: "Join via WhatsApp" with the plan name pre-filled in the wa.me text.
3. "Need something personal?" band: personal training and online coaching available, price on request → WhatsApp CTA. (No invented PT prices.)
4. FAQ (accordion, native `<details>` elements styled, no JS state needed): 6 questions:
   - How much does a gym membership cost at JP Fitness? (state the 3 plans)
   - Is JP Fitness a unisex gym? (yes, men and women train here)
   - What are the gym timings in Kalapatti? (hours table summary)
   - Do you provide diet plans? (yes, customised diet guidance is included)
   - Is personal training available? (yes, contact for details)
   - Where exactly is the gym located? (address + 4th floor above Grace and Bakes, near Nehru Nagar signal)
5. CTA band.

### 5.3 Success Stories `/success-stories`

1. Hero: H1 "REAL CLIENT TRANSFORMATIONS", subline "Results from real members of JP Fitness, Coimbatore."
2. Before/after comparison sliders: custom `BeforeAfterSlider` component (two stacked `next/image`s, draggable divider via pointer events, keyboard accessible with arrow keys, `aria-label` describing it). 3-4 slots, ALL marked `TODO: client photos + written consent` with visible placeholder styling.
   > **Consent requirement:** every transformation photo needs the member's written permission before going live. Do not launch this page with real photos until consent is confirmed.
3. Review wall: all available Google reviews as cards (verbatim text + first names, copied from the listing by Bala).
4. Reels row: 3 thumbnails linking out to Instagram reels (no embeds). TODO: pick reels with client.
5. CTA band: "Your transformation starts with one visit."

### 5.4 Achievements `/achievements`

1. Hero: H1 "OUR ACHIEVEMENTS".
2. Founder block: photo + short bio of the owner (competitive bodybuilder). TODO: name, titles, competition history from client.
3. Timeline: vertical timeline of milestones (gym opening, competitions, certifications). Structure built, all entries TODO from client.
4. Certification / credential cards for trainers. TODO content.
5. Recognition strip: "5.0 on Google", review count, any awards. Only verified items.
6. CTA band.

> This page ships with clearly structured TODO placeholders. Do not invent competition wins or certificates.

### 5.5 Gallery `/gallery`

1. Hero: H1 "INSIDE THE GYM".
2. Filter pills: All / Equipment / Workouts / Events (client-side filter on a static image array).
3. Masonry-style responsive grid (CSS columns), 12-16 images, all lazy `next/image` with real alt text per image.
4. Custom lightbox: full-screen `<dialog>` element, arrow-key navigation, Escape closes, focus trapped, close button with aria-label.
5. CTA band.

## 6. Animations (impressive but disciplined)

Use the `motion` package with `<LazyMotion features={domAnimation}>` and `m.` components to keep the bundle small. Wrap the app in `<MotionConfig reducedMotion="user">` so every animation automatically respects `prefers-reduced-motion` (required for Accessibility 100).

- **Hero load sequence:** eyebrow → H1 words (staggered 60ms) → subline → CTAs → trust row, fade-up 24px, 0.5s easeOut. The H1 must be visible within the first 300ms so LCP isn't delayed.
- **Scroll reveals:** `whileInView` fade-up with `viewport={{ once: true, margin: "-80px" }}` on section children, staggered. Never re-trigger.
- **Stat counters:** count up from 0 when in view (custom hook with `useInView` + `animate`), 1.2s.
- **Card hovers:** `translateY(-4px)` + border color shift line → brand. Transform and color only, no shadows/layout changes.
- **Chevron marquee:** pure CSS `@keyframes` translateX loop, `animation-play-state: paused` under reduced motion.
- **Pricing highlight:** the Best value card gets a one-time subtle scale-in (1.0 → 1.02 → 1.0) when scrolled into view.
- **Before/after slider:** pointer-driven, no animation library needed.
- **Page transitions:** simple opacity fade via `template.tsx` (0.25s). Nothing fancier; route transitions that move content hurt CLS.
- Hard rule: animate only `transform` and `opacity`. Never animate width/height/top/left.

## 7. Images

### 7.1 Sourcing (important, read carefully)

- Do NOT hotlink images from Google, Instagram, or any CDN. Instagram/Google image URLs are signed and expire, and scraping random Google Images results is a copyright problem.
- Correct source: the client's own photos. Bala: ask the owner to WhatsApp the original photos (Instagram compresses heavily) or share a Drive folder. The client owns these, so using them is clean.
- Until real photos arrive, Claude Code uses solid `#161616` placeholder blocks with a centered muted label (e.g. "Photo: gym floor"), sized exactly per the manifest so the layout doesn't shift when real images drop in.

### 7.2 Image manifest (`/public/images/`)

| Path | Size (px) | Content | Alt text |
|---|---|---|---|
| hero-main.jpg | 1920x1080 | Wide shot of gym floor or owner training | "Members training at JP Fitness gym in Kalapatti, Coimbatore" |
| about-equipment.jpg | 1200x900 | Machines row | "Modern gym equipment at JP Fitness" |
| trainers/trainer-1..6.jpg | 800x1000 | Individual trainers | "TODO name, trainer at JP Fitness" |
| transformations/client-1-before.jpg / -after.jpg (x4 pairs) | 800x1000 | Member transformations (consent required) | "Member transformation at JP Fitness, before/after" |
| gallery/gallery-01..16.jpg | 1200x900 | Equipment, workouts, events | Describe each specifically |
| insta/insta-1..6.jpg | 800x800 | Recent Instagram posts saved locally | Describe each |
| app-mockup.png | 600x1200 | Phone showing the JP Fitness app | "JP Fitness & Online Coaching app on a phone" |
| og-image.jpg | 1200x630 | Logo + tagline + "5.0 ★ on Google" on ink background | n/a (meta only) |
| logo.svg / logo.png | vector / 512 | Transparent logo from client | "JP Fitness logo" |

### 7.3 Optimisation rules

- `next/image` everywhere; `priority` + `fetchPriority="high"` on the hero only; `sizes` set correctly on every image; everything else lazy.
- Source files compressed before commit (target: hero < 250KB, others < 150KB). Next.js serves AVIF/WebP automatically.
- Fixed aspect-ratio containers so CLS stays at 0.

## 8. SEO

### 8.1 Keyword map

| Page | Primary keyword | Secondary |
|---|---|---|
| Home | best gym in Coimbatore | gym in Kalapatti, unisex gym in Coimbatore, fitness center Kalapatti |
| Pricing | gym membership fees in Coimbatore | gym membership plans Kalapatti, gym fees near me |
| Success Stories | gym transformation Coimbatore | weight loss gym Coimbatore, weight gain training |
| Achievements | personal trainer in Coimbatore | bodybuilding gym Coimbatore, certified gym trainers |
| Gallery | gym in Kalapatti photos | gym equipment Coimbatore |

Keywords appear naturally in H1/H2s, intro paragraphs, image alts, and FAQ answers. Never keyword-stuff; copy must read like a human wrote it for humans.

### 8.2 Metadata (exact strings)

Set `metadataBase: new URL("https://TODO_DOMAIN")` in the root layout. Find-and-replace TODO_DOMAIN once the domain is purchased.

- **Home** · title: `JP Fitness Kalapatti | Best Unisex Gym in Coimbatore` · description: `Rated 5.0 on Google. Unisex gym on Kalapatti Main Road, Coimbatore with expert trainers, modern equipment and weight loss programs. Plans from ₹4,999.`
- **Pricing** · title: `Gym Membership Fees in Coimbatore | JP Fitness Plans` · description: `JP Fitness membership: 3 months ₹4,999, 6 months ₹6,999, 12 months ₹9,999. Unisex gym in Kalapatti, Coimbatore. Call or WhatsApp 99659 72440 to join.`
- **Success Stories** · title: `Client Transformations | JP Fitness Coimbatore` · description: `Real weight loss and muscle gain results from JP Fitness members in Kalapatti, Coimbatore. Rated 5.0 on Google by our members.`
- **Achievements** · title: `Our Achievements & Trainers | JP Fitness Kalapatti` · description: `Meet the certified trainers and competitive bodybuilding background behind JP Fitness, a 5.0-rated unisex gym in Kalapatti, Coimbatore.`
- **Gallery** · title: `Gym Photos & Equipment Gallery | JP Fitness Kalapatti` · description: `Take a look inside JP Fitness: modern equipment, training floor and events at our unisex gym on Kalapatti Main Road, Coimbatore.`

Each page: canonical URL, Open Graph (title, description, og-image.jpg, type website, locale en_IN), Twitter card `summary_large_image`.

### 8.3 Structured data

**Root layout (all pages), JSON-LD `<script type="application/ld+json">`:**

```json
{
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "name": "JP Fitness",
  "description": "Unisex gym in Kalapatti, Coimbatore offering strength training, weight loss and weight gain programs, personal training and diet guidance.",
  "url": "https://TODO_DOMAIN",
  "telephone": "+919965972440",
  "image": "https://TODO_DOMAIN/images/og-image.jpg",
  "priceRange": "₹4,999 - ₹9,999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DM Complex, 800/6, Kalapatti Main Rd, Indira Nagar, Nehru Nagar West",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "postalCode": "641048",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 11.0562424, "longitude": 77.0386703 },
  "hasMap": "https://www.google.com/maps/place/?q=place_id:ChIJRZBs_5FXqDsRWqSqdEm3JyA",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "05:00", "closes": "11:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "17:00", "closes": "21:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "05:00", "closes": "12:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "21" },
  "sameAs": [
    "https://www.instagram.com/jpfitnesskalapatti/",
    "https://play.google.com/store/apps/details?id=com.cofox.kahunas.JPFitness"
  ]
}
```

(aggregateRating is allowed because the rating is visibly displayed on the page. Keep the count in sync with the live listing at launch.)

**Pricing page additionally:** `FAQPage` schema generated from the same FAQ data array used to render the accordion.

### 8.4 Technical SEO

- `app/sitemap.ts` listing all 5 routes; `app/robots.ts` allowing all + sitemap reference.
- Descriptive, hyphenated routes (already defined). Custom `not-found.tsx` (dark, on-brand, link home).
- All external links `rel="noopener"`; outbound social links `rel="noopener nofollow"` not required but fine.
- Internal linking with natural anchors: Home programs section → pricing ("see membership plans"); pricing FAQ → success-stories ("see real member transformations"); achievements → success-stories; every page CTA band → WhatsApp/phone.

### 8.5 Off-site local SEO checklist (for Bala + client; the site alone won't rank #1)

- Sync Google Business Profile hours with the site (see conflict flag), add website link, all 5 services, weekly photo posts.
- Review velocity: print a QR code of the review link (Section 3) at the front desk; aim 2-4 new reviews/month. Replying to every review helps.
- NAP consistency (exact same name/address/phone) on: Justdial, Sulekha, IndiaMART, Bing Places, Apple Maps.
- Instagram bio link → website; app listing already counts as a brand citation.
- Realistic expectation: "gym in Kalapatti" map-pack ranking is winnable in weeks with GBP + reviews; "best gym in Coimbatore" city-wide takes months of reviews and citations. Set this expectation with the client.

## 9. Accessibility (target: 100)

- Semantic landmarks: `header`, `nav`, `main`, `footer`; one `h1` per page; logical heading order.
- Skip-to-content link as the first focusable element.
- Visible `focus-visible` rings (2px brand red offset on dark) on all interactive elements.
- Contrast: follow Section 4.1 rules; verify every text/background pair at 4.5:1 (3:1 for 24px+).
- All images: meaningful alt; decorative SVGs `aria-hidden="true"`; icon buttons `aria-label`.
- Mobile menu: focus trapped while open, Escape closes, `aria-expanded` on the trigger.
- Lightbox: `<dialog>`, focus trap, Escape, arrow keys.
- `<html lang="en-IN">`. Tap targets 44px minimum. Reduced motion handled globally (Section 6).

## 10. Performance budget (target: 95+ mobile)

- LCP < 2.5s: hero image `priority`, correctly sized, < 250KB; fonts via next/font (self-hosted, swap).
- CLS < 0.05: aspect-ratio boxes on all media, no late-loading layout shifts, sticky navbar has fixed height.
- JS: LazyMotion, no carousel/lightbox libraries, no Instagram embed script, no Google Maps iframe until clicked.
- All pages SSG. No third-party scripts at launch (analytics can be added later via Vercel Analytics, which is lightweight).
- Run `npx lighthouse` (or Chrome DevTools) on every page, mobile preset, before calling any phase done.

## 11. Project structure

```
app/
  layout.tsx          (fonts, metadataBase, JSON-LD, MotionConfig, skip link)
  template.tsx        (page fade transition)
  page.tsx            (Home)
  pricing/page.tsx
  success-stories/page.tsx
  achievements/page.tsx
  gallery/page.tsx
  sitemap.ts  robots.ts  not-found.tsx
components/
  Navbar.tsx Footer.tsx CtaBand.tsx WhatsAppFloat.tsx
  Hero.tsx Marquee.tsx StatCounter.tsx SectionEyebrow.tsx
  PlanCard.tsx TestimonialCard.tsx TrainerCard.tsx
  BeforeAfterSlider.tsx GalleryGrid.tsx Lightbox.tsx
  AppDownload.tsx InstagramGrid.tsx VisitUs.tsx MapFacade.tsx Faq.tsx
lib/
  data.ts             (ALL content: business info, hours, plans, faqs, reviews,
                       trainers, gallery images, nav links — typed interfaces)
  motion.ts           (shared variants: fadeUp, stagger, counter)
public/images/...     (per Section 7.2)
```

## 12. Build phases (Claude Code: stop after each phase for review)

1. **Scaffold:** create-next-app (TS, Tailwind v4, App Router), fonts, globals.css theme, `lib/data.ts` fully populated from Section 3, layout with metadata + JSON-LD + skip link, Navbar, Footer, WhatsAppFloat, CtaBand, placeholder pages.
2. **Home page:** all 11 sections with animations and placeholder images.
3. **Inner pages:** Pricing (+FAQ schema), Success Stories, Achievements, Gallery (+lightbox).
4. **SEO wiring:** per-page metadata, sitemap, robots, not-found, OG image placeholder.
5. **QA pass:** Section 13 checklist, fix everything, Lighthouse runs on all 5 pages.

## 13. QA checklist (before showing the client)

- [ ] Lighthouse mobile on all 5 pages: SEO 100, A11y 100, Best Practices 100, Perf 95+
- [ ] Responsive at 360 / 390 / 768 / 1024 / 1440
- [ ] All tel:, wa.me, Maps, Play Store, Instagram links open correctly
- [ ] Keyboard-only navigation works end to end; focus visible everywhere
- [ ] prefers-reduced-motion: all animation stops, content fully readable
- [ ] Schema passes Google Rich Results Test (ExerciseGym + FAQPage)
- [ ] No fabricated content anywhere; all TODOs clearly visible in placeholder styling
- [ ] No console errors; no 404s; favicon set; custom 404 page works
- [ ] Hours on site match what client confirmed; client reminded to update Google Business Profile

## 14. Open items for Bala / client (blocking launch, not blocking build)

1. Transparent logo file (SVG or 512px+ PNG)
2. Confirm hours (site vs Google listing conflict) and update Google Business Profile
3. Confirm whether ₹4,999/6,999/9,999 are permanent or offer prices
4. Trainer names, photos, specialisations (6+); confirm "John" spelling
5. Verbatim Google review texts + reviewer first names (copy from listing)
6. Transformation photos WITH written member consent
7. Founder name, bio, competition history for Achievements
8. 16+ gym photos (originals via WhatsApp/Drive, not Instagram downloads)
9. Domain name decision (suggest: jpfitnesskalapatti.com or jpfitness.in) → replace TODO_DOMAIN
10. iOS app link, if one exists
11. Optional: confirm member count if the client wants a "members" stat

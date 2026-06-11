# JP Fitness — Website

Lead-generation website for **JP Fitness**, a unisex gym in Kalapatti, Coimbatore, Tamil Nadu. Rated 5.0 on Google (21 reviews). Every page drives one of three actions: **call**, **WhatsApp**, or **walk in**.

- **Live:** https://jpfitnesskalapatti.netlify.app (jpfitness.netlify.app was already taken by another Netlify account)
- **Spec:** [JP-FITNESS-SPEC.md](./JP-FITNESS-SPEC.md) (single source of truth for requirements)

## Stack

- Next.js 15 (App Router, TypeScript), fully static export (`output: "export"`)
- Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- `motion` (LazyMotion + `m.` components, reduced-motion aware)
- `lucide-react` icons, `next/font/google` (Anton + Inter)
- No CMS, no database, no third-party scripts. Deployed on Netlify.

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server
npm run build     # static export into out/
npm run assets    # regenerate placeholder icons + OG image (sharp)
```

## Editing content

**All copy and data live in [`lib/data.ts`](./lib/data.ts).** Components only render that data. To change prices, hours, reviews, trainers, FAQs, photos or the event details, edit `lib/data.ts` and redeploy. Per-page meta titles/descriptions live in each `app/**/page.tsx`.

When the custom domain is purchased, change `SITE_URL` in `lib/data.ts` (used by metadata, sitemap, robots and JSON-LD).

## Pages

Home `/`, Pricing `/pricing`, Success Stories `/success-stories`, Achievements `/achievements`, Gallery `/gallery`, **Events `/events`** (JP Strength Classic 2026 championship, all facts from the client's official poster, SportsEvent schema included).

## Images

Real client photos were imported on 12 June 2026 via `scripts/import-photos.mjs` (sources in `~/Downloads`; converted to webp with sharp):

- `public/images/logo.png` — client logo (92px master with dark background; navbar, footer, favicon, app icons, OG image all derive from it)
- `public/images/gallery/gym-*.webp` + `meetup-*.webp` — 21 gallery photos (also used for hero, Instagram tiles and the Visit Us building shot)
- `public/images/transformations/*.webp` — 13 member before/after collages (**confirm written member consent is on file with the client**)
- `public/images/events/jp-strength-classic-2026.webp` — championship poster

Still placeholders (visible TODO tags on site): trainer photos, founder photo, app phone mockup.

## ⚠️ Flags raised during the build (do not resolve silently)

1. **Hours conflict:** the site uses client-provided hours (Mon-Sat 5-11 AM and 5-9:30 PM, Sun 5 AM-12 PM), but the Google Business Profile currently shows different hours. The client must update the Google listing to match; mismatched hours hurt local rankings and trust.
2. **Pricing:** ₹4,999 / ₹6,999 / ₹9,999 come from a poster labelled "Limited time special offer". Confirm whether these are permanent. Never invent a regular/strike-through price.

## Open items (remaining)

1. Larger transparent logo master (current file is 92px with a baked-in background; fine at navbar size, soft at 512px icon size)
2. Confirm hours and update Google Business Profile (see flag above)
3. Confirm whether plan prices are permanent or offer prices
4. Trainer names, photos, specialisations (6+); confirm "John" spelling
5. Verbatim Google review texts + reviewer first names
6. Written member consent on file for the published transformation photos
7. Years for the founder's competition wins (timeline markers; titles + medals already live)
8. Domain decision (suggest jpfitnesskalapatti.com or jpfitness.in) → update `SITE_URL`
9. iOS App Store link, if one exists
10. App phone mockup screenshot for the app section
11. Championship venue announcement → update `strengthClassic.venueNote` in `lib/data.ts`

Everything awaiting client input is marked with a visible red **TODO** tag on the site itself.

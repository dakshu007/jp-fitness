# JP Fitness — Website

Lead-generation website for **JP Fitness**, a unisex gym in Kalapatti, Coimbatore, Tamil Nadu. Rated 5.0 on Google (21 reviews). Every page drives one of three actions: **call**, **WhatsApp**, or **walk in**.

- **Live:** https://jpfitness.netlify.app
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

**All copy and data live in [`lib/data.ts`](./lib/data.ts).** Components only render that data. To change prices, hours, reviews, trainers, FAQs or links, edit `lib/data.ts` and redeploy. Per-page meta titles/descriptions live in each `app/**/page.tsx`.

When the custom domain is purchased, change `SITE_URL` in `lib/data.ts` (used by metadata, sitemap, robots and JSON-LD).

## Replacing placeholder images

Placeholders are dark blocks with visible labels, sized exactly like the real images, so layouts will not shift. Source originals from the client via WhatsApp/Drive (never Instagram downloads or Google Images). Compress before commit (hero < 250KB, others < 150KB).

| Path (under `public/images/`) | Size | Used in |
|---|---|---|
| hero-main.jpg | 1920x1080 | Home hero (`components/Hero.tsx`) |
| trainers/trainer-1..6.jpg | 800x1000 | Trainer cards |
| transformations/client-N-before/-after.jpg | 800x1000 | Before/after sliders (**written consent required**) |
| gallery/gallery-01..16.jpg | 1200x900 | Gallery grid (`lib/data.ts` array) |
| insta/insta-1..6.jpg | 800x800 | Instagram grid |
| app-mockup.png | 600x1200 | App section |
| og-image.jpg | 1200x630 | Social sharing (placeholder generated) |
| logo.svg / logo.png | vector / 512px | Navbar + icons (placeholder "JP" mark generated) |

## ⚠️ Flags raised during the build (do not resolve silently)

1. **Hours conflict:** the site uses client-provided hours (Mon-Sat 5-11 AM and 5-9:30 PM, Sun 5 AM-12 PM), but the Google Business Profile currently shows different hours. The client must update the Google listing to match; mismatched hours hurt local rankings and trust.
2. **Pricing:** ₹4,999 / ₹6,999 / ₹9,999 come from a poster labelled "Limited time special offer". Confirm whether these are permanent. Never invent a regular/strike-through price.

## Open items blocking launch (not blocking build)

1. Transparent logo file (SVG or 512px+ PNG)
2. Confirm hours and update Google Business Profile (see flag above)
3. Confirm whether plan prices are permanent or offer prices
4. Trainer names, photos, specialisations (6+); confirm "John" spelling
5. Verbatim Google review texts + reviewer first names
6. Transformation photos **with written member consent**
7. Founder name, bio, competition history (Achievements page)
8. 16+ gym photos (originals, not Instagram downloads)
9. Domain decision (suggest jpfitnesskalapatti.com or jpfitness.in) → update `SITE_URL`
10. iOS App Store link, if one exists
11. Optional: member count stat if the client wants one

Everything awaiting client input is marked with a visible red **TODO** tag on the site itself.

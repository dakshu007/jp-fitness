/**
 * One-time import of the client's real photos into public/images/.
 * Sources (provided by the client via WhatsApp/Drive on 12 June 2026):
 *   ~/Downloads/jp images            -> gallery gym-NN.webp
 *   ~/Downloads/Meetup pics          -> gallery meetup-NN.webp
 *   ~/Downloads/Transformation pics  -> transformations/transformation-NN.webp
 *   ~/Downloads/jp.png               -> logo + icons + OG image
 *   ~/Downloads/WhatsApp ... .jpeg   -> events poster
 * Prints final dimensions for lib/data.ts. Run: node scripts/import-photos.mjs
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const HOME = "/Users/dakshu/Downloads";
const GYM_DIR = path.join(HOME, "jp images");
const MEETUP_DIR = path.join(HOME, "Meetup pics");
const TRANSFORM_DIR = path.join(HOME, "Transformation pics");
const LOGO_SRC = path.join(HOME, "jp.png");
const POSTER_SRC = path.join(HOME, "WhatsApp Image 2026-06-03 at 08.57.33.jpeg");
const EXTRA_GYM = path.join(HOME, "image.jpeg");

const INK = "#0A0A0A";
const LINE = "#262626";
const MUTED = "#9CA3AF";

async function convert(src, dest, { width = 1400, quality = 80 } = {}) {
  const img = sharp(src).rotate(); // respect EXIF orientation
  const meta = await img.metadata();
  if ((meta.width ?? 0) < 400) return null; // skip tiny thumbnails
  await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  const out = await sharp(dest).metadata();
  return { dest, width: out.width, height: out.height };
}

async function importDir(dir, destDir, prefix, opts) {
  const files = (await readdir(dir))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  const results = [];
  let n = 1;
  for (const file of files) {
    const dest = path.join(destDir, `${prefix}-${String(n).padStart(2, "0")}.webp`);
    const result = await convert(path.join(dir, file), dest, opts);
    if (result) {
      results.push(result);
      n += 1;
    } else {
      console.log("skipped (too small):", file);
    }
  }
  return results;
}

async function main() {
  await mkdir("public/images/gallery", { recursive: true });
  await mkdir("public/images/transformations", { recursive: true });
  await mkdir("public/images/events", { recursive: true });

  const gym = await importDir(GYM_DIR, "public/images/gallery", "gym", {
    width: 1400,
    quality: 80,
  });
  const extra = await convert(EXTRA_GYM, "public/images/gallery/gym-99.webp", {
    width: 1200,
    quality: 80,
  });
  if (extra) gym.push(extra);

  const meetup = await importDir(MEETUP_DIR, "public/images/gallery", "meetup", {
    width: 1400,
    quality: 80,
  });

  const transformations = await importDir(
    TRANSFORM_DIR,
    "public/images/transformations",
    "transformation",
    { width: 1000, quality: 80 }
  );

  // Poster: keep wide enough that the small text stays readable
  const poster = await convert(
    POSTER_SRC,
    "public/images/events/jp-strength-classic-2026.webp",
    { width: 1080, quality: 84 }
  );

  // Logo: copy original + generate icons from it
  const logo = sharp(LOGO_SRC);
  const logoMeta = await logo.metadata();
  await logo.clone().png().toFile("public/images/logo.png");
  await sharp(LOGO_SRC).resize(512, 512, { kernel: "lanczos3" }).png().toFile("app/icon.png");
  await sharp(LOGO_SRC).resize(180, 180, { kernel: "lanczos3" }).png().toFile("app/apple-icon.png");
  const png48 = await sharp(LOGO_SRC).resize(48, 48).png().toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = 48;
  entry[1] = 48;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png48.length, 8);
  entry.writeUInt32LE(22, 12);
  await writeFile("app/favicon.ico", Buffer.concat([header, entry, png48]));

  // OG image with the real logo
  const logoBig = await sharp(LOGO_SRC).resize(240, 240, { kernel: "lanczos3" }).png().toBuffer();
  const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${LINE}" stroke-width="2" rx="12"/>
  <text x="340" y="265" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900" fill="#FFFFFF" letter-spacing="2">JP FITNESS</text>
  <text x="343" y="330" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#FFFFFF">Transform your body. Build your confidence.</text>
  <rect x="340" y="378" width="430" height="64" rx="8" fill="#161616" stroke="${LINE}" stroke-width="1"/>
  <text x="364" y="422" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#E42439">&#9733;</text>
  <text x="400" y="422" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#FFFFFF">5.0 on Google &#183; 21+ reviews</text>
  <text x="340" y="505" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${MUTED}">Unisex gym &#183; Kalapatti Main Road, Coimbatore</text>
</svg>`;
  await sharp(Buffer.from(ogSvg))
    .composite([{ input: logoBig, left: 80, top: 195 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile("public/images/og-image.jpg");

  console.log("logo source:", logoMeta.width, "x", logoMeta.height);
  console.log("poster:", JSON.stringify(poster));
  console.log("\nGYM:");
  gym.forEach((g) => console.log(path.basename(g.dest), g.width, "x", g.height));
  console.log("\nMEETUP:");
  meetup.forEach((g) => console.log(path.basename(g.dest), g.width, "x", g.height));
  console.log("\nTRANSFORMATIONS:");
  transformations.forEach((g) => console.log(path.basename(g.dest), g.width, "x", g.height));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

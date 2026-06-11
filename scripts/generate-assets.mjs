/**
 * Generates placeholder brand assets with sharp:
 *  - public/images/og-image.jpg (1200x630)
 *  - app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (48, PNG payload)
 * All use the red "JP" on ink placeholder until the client's real logo arrives.
 * Run: npm run assets
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const BRAND = "#E42439";
const INK = "#0A0A0A";
const SURFACE = "#161616";
const LINE = "#262626";
const MUTED = "#9CA3AF";

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${INK}"/>
  <text x="256" y="338" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="224" font-weight="900" fill="${BRAND}" text-anchor="middle" letter-spacing="-8">JP</text>
</svg>`;

const chevrons = (x, y, dir = 1) =>
  [0, 1, 2]
    .map(
      (i) =>
        `<text x="${x + i * 34 * dir}" y="${y}" font-family="Arial Black, Arial, sans-serif" font-size="44" font-weight="900" fill="${BRAND}" text-anchor="middle">&#187;</text>`
    )
    .join("");

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${LINE}" stroke-width="2" rx="12"/>
  ${chevrons(120, 130)}
  ${chevrons(1080, 130, -1)}
  <rect x="100" y="170" width="120" height="120" rx="20" fill="${BRAND}"/>
  <text x="160" y="255" font-family="Arial Black, Arial, sans-serif" font-size="56" font-weight="900" fill="#FFFFFF" text-anchor="middle">JP</text>
  <text x="250" y="262" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900" fill="#FFFFFF" letter-spacing="2">JP FITNESS</text>
  <text x="103" y="360" font-family="Arial, Helvetica, sans-serif" font-size="38" fill="#FFFFFF">Transform your body. Build your confidence.</text>
  <rect x="100" y="408" width="430" height="64" rx="8" fill="${SURFACE}" stroke="${LINE}" stroke-width="1"/>
  <text x="124" y="452" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="${BRAND}">&#9733;</text>
  <text x="160" y="452" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#FFFFFF">5.0 on Google &#183; 21+ reviews</text>
  <text x="100" y="540" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${MUTED}">Unisex gym &#183; Kalapatti Main Road, Coimbatore</text>
</svg>`;

async function main() {
  await mkdir("public/images", { recursive: true });

  await sharp(Buffer.from(ogSvg), { density: 96 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile("public/images/og-image.jpg");
  console.log("wrote public/images/og-image.jpg");

  const iconBuffer = Buffer.from(iconSvg);
  await sharp(iconBuffer).resize(512, 512).png().toFile("app/icon.png");
  console.log("wrote app/icon.png");

  await sharp(iconBuffer).resize(180, 180).png().toFile("app/apple-icon.png");
  console.log("wrote app/apple-icon.png");

  // favicon.ico with a single 48x48 PNG entry (valid in all modern browsers)
  const png48 = await sharp(iconBuffer).resize(48, 48).png().toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  const entry = Buffer.alloc(16);
  entry[0] = 48; // width
  entry[1] = 48; // height
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png48.length, 8);
  entry.writeUInt32LE(22, 12); // data offset (6 + 16)
  await writeFile("app/favicon.ico", Buffer.concat([header, entry, png48]));
  console.log("wrote app/favicon.ico");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

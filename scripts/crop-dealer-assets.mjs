import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOCKUP = path.resolve(
  __dirname,
  "../../home page image/DEALER NETWORK.png"
);
const OUT = path.resolve(__dirname, "../src/assets/dealer-network");

fs.mkdirSync(OUT, { recursive: true });

const meta = await sharp(MOCKUP).metadata();
console.log("Mockup:", meta.width, "x", meta.height);

async function crop(name, left, top, width, height, opts = {}) {
  left = Math.max(0, Math.round(left));
  top = Math.max(0, Math.round(top));
  width = Math.min(Math.round(width), meta.width - left);
  height = Math.min(Math.round(height), meta.height - top);
  let pipeline = sharp(MOCKUP).extract({ left, top, width, height });
  if (opts.resize) {
    pipeline = pipeline.resize(opts.resize);
  }
  await pipeline.png().toFile(path.join(OUT, name));
  console.log(`✓ ${name} (${width}x${height})`);
}

// Full hero band (background for hero section) — strips 1–2
await crop("hero-bg.png", 0, 95, 864, 250);

// Hero right visual only (map + cables + box)
await crop("hero-visual.png", 340, 100, 510, 220);

// Why partner card icons — approximate icon boxes in strip 3
// Row of 6 cards ~ equal; icons near top of cards
const whyY = 410;
const whyH = 42;
const whyW = 48;
const whyStarts = [28, 168, 310, 452, 592, 732];
const whyNames = [
  "why-growing.png",
  "why-opportunity.png",
  "why-supply.png",
  "why-marketing.png",
  "why-training.png",
  "why-support.png",
];
for (let i = 0; i < 6; i++) {
  await crop(whyNames[i], whyStarts[i] + 40, whyY, whyW, whyH);
}

// Who can become — 4 cards (photos) strips 4–6
// Cards roughly span x:20–460, y:580–820
const whoW = 105;
const whoH = 220;
const whoY = 580;
const whoXs = [22, 132, 242, 352];
const whoNames = [
  "who-wholesalers.png",
  "who-retailers.png",
  "who-suppliers.png",
  "who-distributors.png",
];
for (let i = 0; i < 4; i++) {
  await crop(whoNames[i], whoXs[i], whoY, whoW, whoH);
}

// India map in Our Dealer Network panel
await crop("map-india.png", 480, 560, 220, 250);

// Benefits handshake photo (left column)
await crop("benefits-handshake.png", 20, 820, 420, 220);

// Process step icons (white in circles) — strip 8
const procY = 1095;
const procSize = 56;
const procXs = [70, 230, 390, 545];
const procNames = [
  "process-1.png",
  "process-2.png",
  "process-3.png",
  "process-4.png",
];
for (let i = 0; i < 4; i++) {
  await crop(procNames[i], procXs[i], procY, procSize, procSize);
}

// Testimonial avatars approximate
await crop("avatar-1.png", 200, 1410, 48, 48);
await crop("avatar-2.png", 420, 1410, 48, 48);
await crop("avatar-3.png", 640, 1410, 48, 48);

// Support card visuals
await crop("support-locator.png", 40, 1500, 180, 100);
await crop("support-login.png", 280, 1500, 180, 100);
await crop("support-support.png", 520, 1500, 180, 100);

// Bottom CTA warehouse / truck
await crop("bottom-cta-bg.png", 0, 1580, 864, 180);

// Trust ribbon strip
await crop("trust-ribbon.png", 0, 1745, 864, 70);

console.log("\nDone. Files:");
for (const f of fs.readdirSync(OUT).filter((n) => !n.startsWith("_"))) {
  console.log(" ", f, fs.statSync(path.join(OUT, f)).size);
}

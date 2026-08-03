const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const photosDir = String.raw`C:\Users\Technomantra\OneDrive\Desktop\radkadel (2)\radkadel (2)\photos`;
const outDir = String.raw`C:\Users\Technomantra\OneDrive\Desktop\radkadel (2)\radkadel (2)\rad-kabel-vite-setup\src\assets\product-boxes`;

fs.mkdirSync(outDir, { recursive: true });

/** Remove light / near-white / wood-beige backgrounds; keep dark box pixels. */
async function removeLightBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const brightness = (r + g + b) / 3;
    const saturation = max === 0 ? 0 : (max - min) / max;

    // Light wall / wood / soft blur
    const isLightBg = brightness > 168 && saturation < 0.28;
    // Soft warm wood tones
    const isWood =
      brightness > 140 &&
      r > g &&
      g >= b &&
      r - b < 90 &&
      saturation < 0.35;

    if (isLightBg || isWood) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 8 })
    .png()
    .toFile(outputPath);
}

async function main() {
  const jobs = [
    { src: "cf.jpeg", out: "rad-zero-box.png" },
    { src: "bf.jpeg", out: "rad-zero-box-side.png" },
    { src: "hm.jpeg", out: "rad-zero-box-panel.png" },
  ];

  for (const job of jobs) {
    const input = path.join(photosDir, job.src);
    const output = path.join(outDir, job.out);
    await removeLightBg(input, output);
    const meta = await sharp(output).metadata();
    console.log(`OK ${job.out} ${meta.width}x${meta.height}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

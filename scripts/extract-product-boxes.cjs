const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const photosDir = String.raw`C:\Users\Technomantra\OneDrive\Desktop\radkadel (2)\radkadel (2)\photos`;
const assetsDir = String.raw`C:\Users\Technomantra\OneDrive\Desktop\radkadel (2)\radkadel (2)\rad-kabel-vite-setup\src\assets`;
const outDir = path.join(assetsDir, "product-boxes");

fs.mkdirSync(outDir, { recursive: true });

function isBgPixel(r, g, b) {
  const brightness = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  // Studio white
  if (r > 232 && g > 232 && b > 232) return true;
  if (brightness > 215 && sat < 0.08) return true;
  // Soft light wall / table highlight
  if (brightness > 185 && sat < 0.18) return true;
  // Warm wood
  if (
    brightness > 145 &&
    r > g &&
    g >= b - 10 &&
    r - b < 100 &&
    sat < 0.4 &&
    brightness < 230
  ) {
    return true;
  }
  return false;
}

/** Flood-fill transparency from image edges so enclosed box stays opaque. */
function floodRemoveBg(data, width, height, channels) {
  const visited = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    const i = idx * channels;
    if (isBgPixel(data[i], data[i + 1], data[i + 2])) {
      data[i + 3] = 0;
      stack.push(x, y);
    }
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Soften remaining near-white fringe on already-transparent neighbors
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] === 0) continue;
      if (!isBgPixel(data[i], data[i + 1], data[i + 2])) continue;
      let nearTransparent = false;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const ni = ((y + dy) * width + (x + dx)) * channels;
        if (data[ni + 3] === 0) {
          nearTransparent = true;
          break;
        }
      }
      if (nearTransparent) data[i + 3] = 0;
    }
  }
}

async function processImage(inputPath, outputPath, extractRegion) {
  let img = sharp(inputPath);
  if (extractRegion) img = img.extract(extractRegion);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  floodRemoveBg(data, info.width, info.height, info.channels);
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .trim({ threshold: 12 })
    .png()
    .toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(`OK ${path.basename(outputPath)} ${meta.width}x${meta.height}`);
}

async function main() {
  const duo = path.join(assetsDir, "product-boxes.jpg");
  const duoMeta = await sharp(duo).metadata();
  const w = duoMeta.width;
  const h = duoMeta.height;

  await processImage(duo, path.join(outDir, "box-angle.png"), {
    left: 0,
    top: 0,
    width: Math.floor(w * 0.52),
    height: h,
  });
  await processImage(duo, path.join(outDir, "box-front.png"), {
    left: Math.floor(w * 0.48),
    top: 0,
    width: w - Math.floor(w * 0.48),
    height: h,
  });

  // Photos: front face is the clearest box shot
  await processImage(path.join(photosDir, "cf.jpeg"), path.join(outDir, "box-face.png"));
  await processImage(path.join(photosDir, "bf.jpeg"), path.join(outDir, "box-side.png"));
  await processImage(path.join(photosDir, "hm.jpeg"), path.join(outDir, "box-panel.png"));

  // Remove older noisy exports
  for (const name of ["rad-zero-box.png", "rad-zero-box-side.png", "rad-zero-box-panel.png"]) {
    const p = path.join(outDir, name);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

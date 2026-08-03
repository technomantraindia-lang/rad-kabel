const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(
  String.raw`C:\Users\Technomantra\OneDrive\Desktop\radkadel (2)\radkadel (2)\rad-kabel-vite-setup\src\assets\infrastructure`
);

const DIRS = [
  "warehousing-icons",
  "sustainability-icons",
  "stats-icons",
  "ecosystem-icons",
  "inside-icons",
];

async function knockBlack(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const bright = (r + g + b) / 3;
    // Keep red/colored strokes; clear near-black canvas
    if (bright < 28) data[i + 3] = 0;
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(file);
  console.log("cleared", path.relative(root, file));
}

async function main() {
  for (const dir of DIRS) {
    const full = path.join(root, dir);
    for (const name of fs.readdirSync(full).filter((f) => /\.png$/i.test(f))) {
      await knockBlack(path.join(full, name));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

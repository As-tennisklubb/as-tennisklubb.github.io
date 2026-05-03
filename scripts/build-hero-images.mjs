import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const categories = ["tennis", "padel", "bordtennis", "404"];
const sizes = [480, 960, 1440, 1920];

for (const category of categories) {
  const inputDir = `assets/heroes/originals/${category}`;
  const outputDir = `public/heroes/${category}`;

  await fs.mkdir(outputDir, { recursive: true });

  let files = [];

  try {
    files = await fs.readdir(inputDir);
  } catch {
    continue;
  }

  for (const file of files) {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

    const inputPath = path.join(inputDir, file);
    const name = path.parse(file).name;

    for (const width of sizes) {
      const height = Math.round((width * 9) / 16);

      const baseOutput = path.join(outputDir, `${name}-${width}`);

      await sharp(inputPath)
        .resize({
          width,
          height,
          fit: "cover",
          position: "center",
        })
        .avif({ quality: 55 })
        .toFile(`${baseOutput}.avif`);

      await sharp(inputPath)
        .resize({
          width,
          height,
          fit: "cover",
          position: "center",
        })
        .webp({ quality: 75 })
        .toFile(`${baseOutput}.webp`);
    }

    console.log(`✓ ${category}/${file}`);
  }
}

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const uploadsDir = path.join(root, "public", "uploads");

function extFromUrl(url) {
  const match = url.match(/\.(jpg|jpeg|png|webp)$/i);
  return match ? match[1].toLowerCase() : "jpg";
}

function deriveTags(name, categoryName) {
  const tags = new Set();
  const lower = name.toLowerCase();

  if (categoryName === "Cricket Balls") {
    if (lower.includes("red")) tags.add("Red Ball");
    if (lower.includes("white")) tags.add("White Ball");
    if (lower.includes("orange")) tags.add("Orange Ball");
  }

  return Array.from(tags);
}

function deriveSubcategory(name, categoryName) {
  const lower = name.toLowerCase();

  if (categoryName === "Batting Gloves" || categoryName === "Helmets") {
    if (
      lower.includes("test") ||
      lower.includes("reserve") ||
      lower.includes("platino") ||
      lower.includes("players") ||
      lower.includes("match") ||
      lower.includes("pro")
    ) {
      return "Match Pro";
    }
    return "Club";
  }

  if (categoryName === "Cricket Balls") {
    if (lower.includes("machine")) return "Machine Balls";
    if (lower.includes("hanging") || lower.includes("synthetic")) return "Practice Balls";
    if (
      lower.includes("test") ||
      lower.includes("tournament") ||
      lower.includes("crown") ||
      lower.includes("signature") ||
      lower.includes("club")
    ) {
      return "Match Balls";
    }
    return "Club Balls";
  }

  return null;
}

function blurbFor(name, categoryName) {
  if (categoryName === "Batting Gloves") return `${name} — durable cricket batting gloves built for confident, protected shots.`;
  if (categoryName === "Helmets") return `${name} — reliable head protection engineered for serious cricketers.`;
  return `${name} — quality cricket ball for practice and match play.`;
}

async function fetchGalleryUrls(slug) {
  const url = `https://grabgravity.com/product/${slug}/`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const html = await res.text();
    const matches = [...html.matchAll(/data-large_image="([^"]+)"/g)].map((m) => m[1]);
    return [...new Set(matches)];
  } catch {
    return [];
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(destPath, buf);
    return true;
  } catch (err) {
    console.warn(`    ! failed ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  await mkdir(uploadsDir, { recursive: true });
  const raw = JSON.parse(await readFile(path.join(__dirname, "raw-products.json"), "utf-8"));

  const categoryOrder = ["Batting Gloves", "Helmets", "Cricket Balls"];
  const subcategoriesByCategory = {
    "Batting Gloves": ["Match Pro", "Club"],
    Helmets: ["Match Pro", "Club"],
    "Cricket Balls": ["Match Balls", "Club Balls", "Practice Balls", "Machine Balls"],
  };

  const products = [];
  let i = 0;
  for (const item of raw) {
    i += 1;
    const categoryName = item.subcategory; // was subcategory, now top-level category
    process.stdout.write(`[${i}/${raw.length}] ${item.name}... `);

    const galleryUrls = await fetchGalleryUrls(item.slug);
    const urlsToUse = galleryUrls.length > 0 ? galleryUrls : [item.image.replace(/-300x300(?=\.[a-zA-Z]+$)/, "")];

    const localImages = [];
    for (const [idx, url] of urlsToUse.entries()) {
      const ext = extFromUrl(url);
      const fileName = `${item.slug}-${idx + 1}.${ext}`;
      const destPath = path.join(uploadsDir, fileName);
      const ok = await downloadImage(url, destPath);
      if (ok) localImages.push(`/uploads/${fileName}`);
    }

    console.log(`${localImages.length} image(s)`);

    products.push({
      slug: item.slug,
      name: item.name,
      blurb: blurbFor(item.name, categoryName),
      category: categoryName,
      subcategory: deriveSubcategory(item.name, categoryName),
      price: item.price,
      image: localImages[0] ?? "",
      images: localImages,
      tags: deriveTags(item.name, categoryName),
    });
  }

  const seedData = {
    categories: categoryOrder.map((name) => ({
      name,
      subcategories: subcategoriesByCategory[name],
    })),
    products,
  };

  await writeFile(path.join(root, "prisma", "seed-data.json"), JSON.stringify(seedData, null, 2));
  console.log(`\nWrote ${products.length} products to prisma/seed-data.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

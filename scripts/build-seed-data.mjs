import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const uploadsDir = path.join(root, "public", "uploads");

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extFromUrl(url) {
  const match = url.match(/\.(jpg|jpeg|png|webp)$/i);
  return match ? match[1].toLowerCase() : "jpg";
}

function fullResUrl(thumbUrl) {
  return thumbUrl.replace(/-300x300(?=\.[a-zA-Z]+$)/, "");
}

function deriveTags(name, subcategory) {
  const tags = new Set();
  const lower = name.toLowerCase();

  if (subcategory === "Batting Gloves") {
    if (lower.includes("test") || lower.includes("reserve") || lower.includes("platino") || lower.includes("players")) {
      tags.add("Match Pro");
    } else {
      tags.add("Club");
    }
  }

  if (subcategory === "Helmets") {
    if (lower.includes("match") || lower.includes("test") || lower.includes("pro")) tags.add("Match Pro");
    else tags.add("Club");
  }

  if (subcategory === "Cricket Balls") {
    if (lower.includes("machine")) tags.add("Bowling Machine");
    else if (lower.includes("tennis") || lower.includes("synthetic") || lower.includes("hanging")) tags.add("Practice");
    else if (lower.includes("test") || lower.includes("tournament") || lower.includes("crown") || lower.includes("signature")) tags.add("Match");
    else tags.add("Club");

    if (lower.includes("red")) tags.add("Red Ball");
    if (lower.includes("white") || lower.includes("orange")) tags.add("White/Orange Ball");
  }

  return Array.from(tags);
}

function blurbFor(name, subcategory) {
  if (subcategory === "Batting Gloves") return `${name} — durable cricket batting gloves built for confident, protected shots.`;
  if (subcategory === "Helmets") return `${name} — reliable head protection engineered for serious cricketers.`;
  return `${name} — quality cricket ball for practice and match play.`;
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(destPath, buf);
    return true;
  } catch (err) {
    console.warn(`  ! failed ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  await mkdir(uploadsDir, { recursive: true });
  const raw = JSON.parse(await readFile(path.join(__dirname, "raw-products.json"), "utf-8"));

  const products = [];
  let i = 0;
  for (const item of raw) {
    i += 1;
    const ext = extFromUrl(item.image);
    const fileName = `${item.slug}.${ext}`;
    const destPath = path.join(uploadsDir, fileName);
    const full = fullResUrl(item.image);

    process.stdout.write(`[${i}/${raw.length}] ${item.name}... `);
    let ok = await downloadImage(full, destPath);
    if (!ok) {
      ok = await downloadImage(item.image, destPath);
    }
    console.log(ok ? "OK" : "SKIPPED (no image)");

    products.push({
      slug: item.slug,
      name: item.name,
      blurb: blurbFor(item.name, item.subcategory),
      subcategory: item.subcategory,
      price: item.price,
      image: ok ? `/uploads/${fileName}` : "",
      tags: deriveTags(item.name, item.subcategory),
    });
  }

  const seedData = {
    category: { name: "Cricket", slug: "cricket" },
    subcategories: ["Batting Gloves", "Helmets", "Cricket Balls"],
    products,
  };

  await writeFile(
    path.join(root, "prisma", "seed-data.json"),
    JSON.stringify(seedData, null, 2)
  );
  console.log(`\nWrote ${products.length} products to prisma/seed-data.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { prisma } from "@/lib/db";

export type CatalogSubcategory = {
  id: number;
  name: string;
  slug: string;
};

export type CatalogCategory = {
  id: number;
  name: string;
  slug: string;
  sportId: number;
  sportName: string;
  sportSlug: string;
  subcategories: CatalogSubcategory[];
};

export type CatalogSport = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
};

export type CatalogProduct = {
  id: number;
  slug: string;
  name: string;
  blurb: string;
  description: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  sportId: number;
  sportName: string;
  sportSlug: string;
  subcategoryId: number | null;
  subcategoryName: string | null;
  subcategorySlug: string | null;
  price: number | null;
  priceUnit: string;
  image: string;
  images: string[];
  tags: string[];
};

export type CatalogData = {
  sports: CatalogSport[];
  categories: CatalogCategory[];
  products: CatalogProduct[];
};

export async function getCatalog(): Promise<CatalogData> {
  const [sports, categories, products] = await Promise.all([
    prisma.sport.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        sport: true,
        subcategories: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        category: { include: { sport: true } },
        subcategory: true,
        images: { orderBy: { sortOrder: "asc" } },
        tags: { include: { tag: true } },
      },
    }),
  ]);

  return {
    sports: sports.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      image: s.image ?? products.find((p) => p.category.sportId === s.id && p.image)?.image ?? null,
    })),
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sportId: c.sportId,
      sportName: c.sport.name,
      sportSlug: c.sport.slug,
      subcategories: c.subcategories.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
      })),
    })),
    products: products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      blurb: p.blurb,
      description: p.description,
      categoryId: p.categoryId,
      categoryName: p.category.name,
      categorySlug: p.category.slug,
      sportId: p.category.sportId,
      sportName: p.category.sport.name,
      sportSlug: p.category.sport.slug,
      subcategoryId: p.subcategoryId,
      subcategoryName: p.subcategory?.name ?? null,
      subcategorySlug: p.subcategory?.slug ?? null,
      price: p.price,
      priceUnit: p.priceUnit,
      image: p.image,
      images: p.images.map((img) => img.url),
      tags: p.tags.map((t) => t.tag.name),
    })),
  };
}

import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/catalog";
import { Nav } from "@/components/nav";
import { CatalogPage } from "@/components/catalog-page";
import { Footer } from "@/components/footer";
import { StickyBar } from "@/components/sticky-bar";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

export default async function SportPage({
  params,
}: {
  params: Promise<{ sport: string; slug?: string[] }>;
}) {
  const { sport: sportSlug, slug = [] } = await params;
  const data = await getCatalog();

  const sport = data.sports.find((s) => s.slug === sportSlug);
  if (!sport) notFound();

  const sportCategories = data.categories.filter((c) => c.sportId === sport.id);

  const [categorySlug, subcategorySlug] = slug;

  const category = categorySlug ? sportCategories.find((c) => c.slug === categorySlug) : undefined;
  if (categorySlug && !category) notFound();

  const subcategory = subcategorySlug
    ? category?.subcategories.find((s) => s.slug === subcategorySlug)
    : undefined;
  if (subcategorySlug && !subcategory) notFound();

  const scopedData = {
    sports: data.sports,
    categories: sportCategories,
    products: data.products.filter((p) => p.sportId === sport.id),
  };

  return (
    <>
      <Nav />
      <main>
        <CatalogPage
          key={`${sportSlug}/${categorySlug ?? ""}/${subcategorySlug ?? ""}`}
          initialData={scopedData}
          basePath={`/${sportSlug}`}
          initialCategoryId={category?.id ?? null}
          initialSubcategoryId={subcategory?.id ?? null}
        />
      </main>
      <Footer />
      <StickyBar />
      <FloatingWhatsapp />
      <Toaster />
    </>
  );
}

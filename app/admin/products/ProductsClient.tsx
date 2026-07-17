"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProductFormDialog } from "@/components/admin/product-form-dialog";
import { ProductTable } from "@/components/admin/product-table";
import type { AdminProduct, AdminTaxonomy } from "@/app/actions/admin";

export function ProductsClient({
  initialProducts,
  taxonomy,
}: {
  initialProducts: AdminProduct[];
  taxonomy: AdminTaxonomy;
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (product: AdminProduct) => {
    setEditing(product);
    setFormOpen(true);
  };

  const onChanged = () => router.refresh();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tighter text-ink">
            Products
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{initialProducts.length} in the catalog</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-ultra px-5 py-2.5 text-sm font-semibold text-paper transition active:scale-[0.98]"
        >
          + Add product
        </button>
      </div>

      <div className="mt-6">
        <ProductTable products={initialProducts} onEdit={openEdit} onChanged={onChanged} />
      </div>

      {formOpen && (
        <ProductFormDialog
          key={editing?.id ?? "new"}
          open={formOpen}
          onOpenChange={setFormOpen}
          product={editing}
          taxonomy={taxonomy}
          onSaved={onChanged}
        />
      )}
    </div>
  );
}

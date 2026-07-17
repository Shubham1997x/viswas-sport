import type { CatalogProduct } from "@/lib/catalog";
import { productWaLink } from "@/lib/site";

export function ProductCard({
  product,
  onInquire,
  onSelect,
}: {
  product: CatalogProduct;
  onInquire: (product: CatalogProduct) => void;
  onSelect: (product: CatalogProduct) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_1px_3px_rgba(16,20,43,0.05)]">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="flex flex-1 cursor-pointer flex-col text-left"
      >
        <div className="aspect-square w-full overflow-hidden bg-tint">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-ink-soft">
              No image
            </div>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col p-4 md:p-5">
          {product.subcategoryName && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ultra">
              {product.subcategoryName}
            </span>
          )}
          <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft line-clamp-2">
            {product.blurb}
          </p>
          {product.tags.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-tint px-2 py-0.5 text-[11px] font-semibold text-ultra"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 border-t border-hairline pt-3">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Price
            </dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums text-ink">
              {product.price != null ? (
                <>
                  &#8377;{product.price.toLocaleString("en-IN")}
                  <span className="ml-1 text-xs font-medium text-ink-soft">
                    /{product.priceUnit}
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold text-ultra">Ask for price</span>
              )}
            </dd>
          </div>
        </div>
      </button>
      <div className="grid grid-cols-2 divide-x divide-hairline border-t border-hairline">
        <a
          href={productWaLink(product.name)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] px-3 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1ebe5a] active:bg-[#159448]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => onInquire(product)}
          className="flex items-center justify-center gap-2 bg-white px-3 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-tint active:bg-hairline"
        >
          Send Inquiry
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path
              d="M2 8h11M9 3.5 13.5 8 9 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

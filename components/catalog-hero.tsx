import { waLink } from "@/lib/site";

const PROOF = [
  { figure: "44+", caption: "Products in stock" },
  { figure: "3", caption: "Categories: gloves, helmets, balls" },
  { figure: "24h", caption: "WhatsApp response time" },
];

const COLLAGE = [
  { src: "/uploads/gravity-platino-1.jpg", alt: "Gravity Platino batting gloves" },
  { src: "/uploads/gravity-max-helmets-1.jpg", alt: "Gravity Max cricket helmet" },
  { src: "/uploads/gravity-crown-red-ball-1.jpg", alt: "Gravity Crown red cricket ball" },
];

export function CatalogHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-plate">
      {/* Stitch-seam accent line, cricket-ball style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,var(--color-gold)_0,var(--color-gold)_10px,transparent_10px,transparent_20px)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ultra/25 blur-3xl md:-right-16 md:-top-16"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-10 pt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-8 md:pb-14 md:pt-24">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden="true">
              <circle cx="8" cy="8" r="7" />
            </svg>
            Viswas Sports Catalog
          </span>

          <h1 className="mt-4 max-w-[16ch] font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-paper md:text-5xl">
            Gear Up. <span className="text-gold">Play</span> Fearless.
          </h1>

          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-paper/75 md:text-base">
            Batting gloves, helmets, and cricket balls picked for club nets, academy
            training, and match day. Search the catalog, filter by category, and get the
            best price straight on WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-plate transition-transform active:scale-[0.98] hover:brightness-110"
            >
              Browse Catalog
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-paper/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: product photo collage */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md md:block">
          <div className="absolute left-[8%] top-[4%] aspect-square w-[62%] -rotate-6 overflow-hidden rounded-2xl border-4 border-paper/10 shadow-2xl transition-transform duration-300 hover:rotate-0">
            <img src={COLLAGE[0].src} alt={COLLAGE[0].alt} className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-[6%] left-0 aspect-square w-[50%] rotate-3 overflow-hidden rounded-2xl border-4 border-paper/10 shadow-2xl transition-transform duration-300 hover:rotate-0">
            <img src={COLLAGE[2].src} alt={COLLAGE[2].alt} className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-[2%] top-[26%] aspect-square w-[54%] rotate-[8deg] overflow-hidden rounded-2xl border-4 border-gold/70 shadow-2xl transition-transform duration-300 hover:rotate-0">
            <img src={COLLAGE[1].src} alt={COLLAGE[1].alt} className="h-full w-full object-cover" />
          </div>
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 flex h-16 w-16 rotate-12 items-center justify-center rounded-full bg-gold text-center font-display text-[11px] font-extrabold uppercase leading-tight tracking-wide text-plate shadow-lg"
          >
            In
            <br />
            Stock
          </span>
        </div>
      </div>
    </section>
  );
}

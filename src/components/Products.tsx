import { useMemo } from "react";
import { products, type Category } from "../data";
import { money, useShop, type Filter } from "../store";
import { cn } from "../utils/cn";
import { ArrowRight, Eye, Heart, Plus, Star } from "./Icons";
import { Reveal } from "./Reveal";

const filters: Filter[] = ["All", "Necklaces", "Earrings", "Bangles", "Rings", "Sarees"];

function ProductCard({ id, index }: { id: string; index: number }) {
  const product = products.find((item) => item.id === id);
  const { addToBag, toggleWishlist, isWishlisted, openQuickView } = useShop();
  if (!product) return null;

  const saved = isWishlisted(product.id);

  return (
    <Reveal delay={Math.min(index, 5) * 60} className="h-full">
      <article className="group flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[3px] border border-line/70 bg-[#edf5fc]">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => openQuickView(product)}
              className="absolute inset-0 cursor-zoom-in"
              aria-label={`Quick view ${product.name}`}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.badge && (
            <span
              className={cn(
                "absolute left-2.5 top-2.5 px-2 py-1 text-[7px] font-medium uppercase tracking-[0.16em] sm:left-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[8px] sm:tracking-[0.2em]",
                product.badge === "Bestseller" && "bg-navy text-white",
                product.badge === "New" && "bg-white text-navy",
                product.badge === "Limited" && "bg-sapphire text-white",
              )}
            >
              {product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            aria-pressed={saved}
            className={cn(
              "absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white sm:right-3 sm:top-3 sm:h-9 sm:w-9",
              saved ? "text-sapphire" : "text-navy/70 hover:text-sapphire",
            )}
          >
            <Heart filled={saved} className="h-[15px] w-[15px] sm:h-[17px] sm:w-[17px]" />
          </button>

          <div className="absolute inset-x-2 bottom-2 z-10 flex translate-y-0 gap-1 opacity-100 transition-all duration-300 sm:inset-x-3 sm:bottom-3 sm:gap-1.5 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={() => addToBag(product)}
              className="flex flex-1 items-center justify-center gap-1.5 bg-white/95 py-2.5 text-[8px] font-medium uppercase tracking-[0.12em] text-navy backdrop-blur-md transition-colors hover:bg-navy hover:text-white sm:gap-2 sm:py-3 sm:text-[9.5px] sm:tracking-[0.18em]"
            >
              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add to bag</span>
            </button>
            <button
              type="button"
              onClick={() => openQuickView(product)}
              aria-label={`View details for ${product.name}`}
              className="hidden w-11 place-items-center bg-white/95 text-navy backdrop-blur-md transition-colors hover:bg-navy hover:text-white sm:grid"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1 pt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:pt-4">
          <div className="min-w-0">
            <p className="truncate text-[7px] font-medium uppercase tracking-[0.12em] text-sapphire sm:text-[8px] sm:tracking-[0.2em]">
              {product.category} <span className="text-stone/40">· {product.collection}</span>
            </p>
            <button
              type="button"
              onClick={() => openQuickView(product)}
              className="mt-1.5 block text-left font-serif text-[17px] leading-[1.15] text-navy transition-colors hover:text-sapphire sm:text-[20px] sm:leading-tight lg:text-[22px]"
            >
              {product.name}
            </button>
            <p className="mt-0.5 hidden truncate text-[11.5px] font-light text-stone sm:block">{product.subtitle}</p>
            <div className="mt-1.5 hidden items-center gap-1.5 sm:flex sm:mt-2">
              <span className="flex items-center gap-0.5 text-champagne" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-[10px] w-[10px]"
                    filled={starIndex < Math.round(product.rating)}
                  />
                ))}
              </span>
              <span className="text-[9.5px] tracking-[0.06em] text-stone">
                {product.rating.toFixed(1)} <span className="text-stone/55">({product.reviews})</span>
              </span>
            </div>
          </div>
          <div className="shrink-0 text-left sm:pt-3.5 sm:text-right">
            <p className="text-[11.5px] font-medium tracking-[0.03em] text-navy sm:text-[13px]">
              {money(product.price)}
              <span className="text-[10px] text-stone/70 sm:text-[11px]">.00</span>
            </p>
            {product.compareAt && (
              <p className="mt-0.5 text-[9.5px] tracking-[0.03em] text-stone/60 line-through sm:text-[10.5px]">
                {money(product.compareAt)}
              </p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Products() {
  const { filter, setFilter, shopCategory } = useShop();
  const visible = useMemo(
    () => products.filter((product) => filter === "All" || product.category === (filter as Category)),
    [filter],
  );

  return (
    <section id="shop" className="scroll-mt-24 border-y border-line bg-mist py-14 sm:py-20">
      <div className="shell">
        <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sapphire">
              <span className="h-px w-7 bg-sapphire/50" /> The icons
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.04] text-navy sm:text-[43px]">
              Most loved, <span className="italic text-sapphire">season after season</span>
            </h2>
            <p className="mt-3 max-w-lg text-[13px] font-light leading-relaxed text-stone">
              The pieces our clients return for — hand-finished, heirloom-minded and ready for every day.
            </p>
          </div>
          <p className="hidden font-serif text-[15px] italic text-stone lg:block">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"} in this edit
          </p>
        </Reveal>

        <div className="mt-7 flex flex-col gap-3 border-b border-line-dark/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-0.5" role="group" aria-label="Filter pieces">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "shrink-0 border px-3.5 py-2 text-[9.5px] font-medium uppercase tracking-[0.16em] transition-all duration-200",
                  filter === item
                    ? "border-navy bg-navy text-white"
                    : "border-line-dark/60 bg-white/70 text-stone hover:border-sapphire/40 hover:text-sapphire",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => shopCategory("All")}
            className="group hidden w-fit items-center gap-2 text-[9.5px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:text-sapphire sm:flex"
          >
            Shop all pieces
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {visible.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-11">
            {visible.map((product, index) => (
              <ProductCard key={product.id} id={product.id} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-line-dark bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl text-navy">This edit is resting for a moment.</p>
            <p className="mt-2 text-[12px] text-stone">Explore all pieces, or join the waitlist at the bottom.</p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-5 bg-navy px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-white"
            >
              View all pieces
            </button>
          </div>
        )}

        <Reveal className="mt-11 flex flex-col items-center gap-4 border-t border-line-dark/60 pt-7 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-stone">
            <span className="h-1.5 w-1.5 rounded-full bg-sapphire" aria-hidden="true" />
            Every order arrives in our signature blue keepsake box
          </p>
          <button
            type="button"
            onClick={() => shopCategory("All")}
            className="group inline-flex items-center gap-2.5 border border-navy px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View the full collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

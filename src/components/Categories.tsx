import { categories } from "../data";
import { useShop } from "../store";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

export function Categories() {
  const { shopCategory } = useShop();

  return (
    <section id="new-in" className="relative scroll-mt-24 overflow-hidden bg-white py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sapphire">
              <span className="h-px w-7 bg-sapphire/50" /> Find your forever
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.05] text-navy sm:text-[43px]">
              Shop by <span className="italic text-sapphire">signature</span>
            </h2>
            <p className="mt-3 max-w-md text-[13px] font-light leading-relaxed text-stone">
              Four considered categories, one quiet point of view. Pieces designed to layer, live in and
              one day pass down.
            </p>
          </div>
          <button
            type="button"
            onClick={() => shopCategory("All")}
            className="group inline-flex w-fit items-center gap-2.5 border-b border-navy/25 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:border-sapphire hover:text-sapphire"
          >
            Explore everything
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 70}>
              <button
                type="button"
                onClick={() => shopCategory(category.name)}
                className="group block w-full text-left"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[228px] rounded-full border border-line p-[7px] transition-colors duration-500 group-hover:border-sapphire/40">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-mist">
                    <img
                      src={category.image}
                      alt={`${category.label} by Symmify`}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 grid h-7 min-w-7 place-items-center rounded-full bg-white/90 px-2 font-serif text-[11px] text-navy backdrop-blur-sm">
                      0{index + 1}
                    </span>
                    <span className="absolute bottom-4 right-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-navy opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-[22px] leading-none text-navy transition-colors group-hover:text-sapphire">
                    {category.label}
                  </h3>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-stone">
                    {category.copy}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-stone/60">{category.count}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

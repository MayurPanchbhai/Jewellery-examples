import { useEffect, useState } from "react";
import { heroSlides, products } from "../data";
import { useShop } from "../store";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Gift,
  Leaf,
  Plus,
  Sparkle,
  Truck,
} from "./Icons";
import { Monogram } from "./Logo";

const featuredIds = ["celeste-necklace", "aurora-drops", "indigo-saree"];

export function Hero() {
  const { shopCategory, openQuickView, addToBag } = useShop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];
  const featured = products.find((product) => product.id === featuredIds[index]) ?? products[0];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 7500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const step = (direction: 1 | -1) =>
    setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);

  return (
    <section id="top" className="hero-pattern relative overflow-hidden" aria-label="Featured collections">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-20 hidden h-[520px] w-[520px] rounded-full border border-white/80 lg:block" />
        <div className="absolute -right-10 top-24 hidden h-[420px] w-[420px] rounded-full border border-white/70 lg:block" />
        <Monogram className="absolute -bottom-24 -left-16 h-[340px] w-[340px] opacity-[0.045]" />
        <svg
          viewBox="0 0 300 300"
          className="absolute left-1/2 top-8 hidden h-[280px] w-[280px] -translate-x-1/2 text-sapphire/15 xl:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          aria-hidden="true"
        >
          <path d="M150 6c-38 35-58 68-58 104 0 44 26 78 58 104 32-26 58-60 58-104 0-36-20-69-58-104Z" />
          <path d="M46 210c30 44 64 69 104 78 40-9 74-34 104-78" />
        </svg>
      </div>

      <div
        className="shell relative grid items-center gap-10 pb-12 pt-9 lg:min-h-[640px] lg:grid-cols-[0.96fr_1.04fr] lg:gap-14 lg:pb-16 lg:pt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative z-10 max-w-xl">
          <div key={`copy-${index}`} className="animate-fade-up">
            <p className="eyebrow flex items-center gap-3 text-sapphire">
              <span className="h-px w-8 bg-sapphire/60" aria-hidden="true" />
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-[42px] font-light leading-[0.98] tracking-[-0.012em] text-navy sm:text-[56px] lg:text-[60px] xl:text-[71px]">
              {slide.titleTop}
              <span className="block italic text-sapphire">{slide.titleItalic}</span>
              <span className="block">{slide.titleEnd}</span>
            </h1>
            <p className="mt-6 max-w-[29rem] text-[13.5px] font-light leading-[1.85] text-stone sm:text-[14.5px]">
              {slide.copy}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => shopCategory(slide.filter)}
                className="group inline-flex items-center gap-3 bg-navy px-6 py-4 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-sapphire sm:px-7"
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("atelier")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2.5 border border-navy/15 bg-white/60 px-5 py-4 text-[10.5px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:border-sapphire hover:text-sapphire"
              >
                Our craft
                <span className="grid h-5 w-5 place-items-center rounded-full border border-current">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[10px] font-medium uppercase tracking-[0.13em] text-stone">
              <li className="flex items-center gap-1.5">
                <Diamond className="h-3.5 w-3.5 text-sapphire" /> 18k gold vermeil
              </li>
              <li className="flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-sapphire" /> Recycled metals
              </li>
              <li className="flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5 text-sapphire" /> Gift-ready packaging
              </li>
            </ul>
          </div>

          <div className="mt-9 flex items-center justify-between gap-4 border-t border-navy/10 pt-5">
            <div className="flex items-center gap-2.5">
              {heroSlides.map((item, slideIndex) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`View slide ${slideIndex + 1}: ${item.eyebrow}`}
                  aria-current={index === slideIndex}
                  className="group/dot -my-2 py-2"
                >
                  <span
                    className={cn(
                      "block h-[2px] transition-all duration-300",
                      index === slideIndex
                        ? "w-9 bg-navy"
                        : "w-4 bg-navy/25 group-hover/dot:bg-navy/50",
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 font-serif text-sm tabular-nums text-stone">
                0{index + 1} <span className="text-stone/50">/ 0{heroSlides.length}</span>
              </span>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous featured story"
                className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-sapphire hover:text-sapphire"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next featured story"
                className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-sapphire hover:text-sapphire"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div
            className="pointer-events-none absolute -right-5 top-12 hidden h-full w-full max-w-[430px] rounded-t-[220px] border border-sapphire/20 sm:block"
            aria-hidden="true"
          />
          <div className="relative ml-auto w-full max-w-[500px]">
            <div className="arch-frame relative overflow-hidden border-[6px] border-white/80 bg-sky shadow-[0_40px_90px_-50px_rgba(9,43,74,0.55)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/5.6]">
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="animate-fade-in h-full w-full object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                  <div className="max-w-[70%]">
                    <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/80">
                      Symmify campaign · {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-serif text-lg leading-tight text-white sm:text-xl">
                      {index === 0
                        ? "The Sapphire Edit"
                        : index === 1
                          ? "The Bridal Heirloom"
                          : "The Saree Atelier"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => shopCategory(slide.filter)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-navy"
                    aria-label={`Explore ${slide.eyebrow}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-5 hidden items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-2 shadow-soft backdrop-blur-md sm:flex lg:-right-4">
              <Sparkle className="h-3.5 w-3.5 text-champagne" />
              <span className="text-[8.5px] font-medium uppercase tracking-[0.18em] text-navy">
                Hand-finished in Jaipur
              </span>
            </div>

            <div className="animate-float absolute -bottom-5 -left-2 w-[236px] rounded-sm border border-white/80 bg-white/95 p-2.5 shadow-soft backdrop-blur-md sm:w-[266px] lg:-left-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openQuickView(featured)}
                  className="h-[64px] w-[58px] shrink-0 overflow-hidden rounded-sm bg-mist"
                  aria-label={`Quick view ${featured.name}`}
                >
                  <img src={featured.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[7.5px] font-medium uppercase tracking-[0.2em] text-sapphire">
                    {index === 2 ? "Saree atelier" : "The one everyone asks about"}
                  </p>
                  <button
                    type="button"
                    onClick={() => openQuickView(featured)}
                    className="mt-1 block max-w-full truncate text-left font-serif text-[16px] leading-tight text-navy hover:text-sapphire"
                  >
                    {featured.name}
                  </button>
                  <p className="mt-0.5 text-[10.5px] tracking-[0.06em] text-stone">
                    ${featured.price}.00
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addToBag(featured)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-white transition hover:bg-sapphire"
                  aria-label={`Add ${featured.name} to bag`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="absolute -left-7 bottom-24 hidden origin-bottom-left -rotate-90 text-[8px] font-medium uppercase tracking-[0.4em] text-navy/45 lg:block">
              Adorned in light
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/80 bg-white/55 backdrop-blur-sm">
        <div className="shell grid grid-cols-2 divide-line/80 sm:grid-cols-4 sm:divide-x">
          {[
            { icon: Truck, title: "Complimentary delivery", copy: "On orders over $150" },
            { icon: Sparkle, title: "Made to be kept", copy: "Lifetime care & repairs" },
            { icon: Leaf, title: "Consciously sourced", copy: "Recycled metals, lab stones" },
            { icon: Gift, title: "The blue box", copy: "Signature gift packaging" },
          ].map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="flex items-center gap-3 px-1 py-4 sm:justify-center sm:px-3 sm:py-5"
            >
              <Icon className="h-[21px] w-[21px] shrink-0 text-sapphire" />
              <p className="min-w-0">
                <span className="block truncate text-[9.5px] font-medium uppercase tracking-[0.15em] text-navy">
                  {title}
                </span>
                <span className="mt-0.5 block truncate text-[10px] font-light text-stone">{copy}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PressStrip() {
  return (
    <div className="border-b border-line bg-white">
      <div className="shell flex flex-col items-center justify-center gap-4 py-6 sm:flex-row sm:gap-9 lg:gap-14">
        <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-stone/80">As seen in</span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-serif text-[17px] tracking-[0.12em] text-navy/60 sm:text-[19px] lg:gap-x-14">
          <span>VOGUE</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>ELLE</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>Harper&rsquo;s BAZAAR</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>TATLER</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>GRAZIA</span>
        </div>
      </div>
    </div>
  );
}

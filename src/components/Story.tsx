import { testimonials } from "../data";
import { useShop } from "../store";
import { ArrowRight, ArrowUpRight, Check, Diamond, Leaf, Scissors, Sparkle, Star } from "./Icons";
import { Reveal } from "./Reveal";
import { Monogram } from "./Logo";

export function EditorialBand() {
  const { shopCategory } = useShop();

  return (
    <section id="sarees" className="scroll-mt-24 bg-white py-14 sm:py-20">
      <div className="shell">
        <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sapphire">
              <span className="h-px w-7 bg-sapphire/50" /> Two houses, one point of view
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.04] text-navy sm:text-[43px]">
              The <span className="italic text-sapphire">occasion</span> edits
            </h2>
          </div>
          <p className="max-w-sm text-[12.5px] font-light leading-relaxed text-stone">
            Handwoven heirlooms and modern jewellery, styled together for the celebrations that matter.
          </p>
        </Reveal>

        <div className="relative grid gap-3.5 lg:grid-cols-[1.06fr_0.94fr]">
          <Reveal>
            <article className="group relative min-h-[420px] overflow-hidden rounded-[3px] sm:min-h-[480px]">
              <img
                src="/images/collection-saree.jpg"
                alt="Indigo silk saree with a hand-finished silver zari border"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy/65 to-navy/10" />
              <div className="absolute right-5 top-5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white">
                  Small-batch · 9 pieces
                </span>
              </div>
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 sm:min-h-[480px] sm:p-10">
                <p className="eyebrow text-sky/85">The Saree Atelier</p>
                <h3 className="mt-3 max-w-sm font-serif text-[38px] font-light leading-[1.03] text-white sm:text-[46px]">
                  Indigo, woven with
                  <span className="italic"> intention.</span>
                </h3>
                <p className="mt-3 max-w-[27rem] text-[12.5px] font-light leading-[1.8] text-sky/85">
                  Pure mulberry silk, natural indigo dye and a silver zari border. Each saree is five days
                  on the loom and a lifetime in your wardrobe.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => shopCategory("Sarees")}
                    className="group/btn inline-flex items-center gap-2.5 bg-white px-5 py-3.5 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:bg-sky"
                  >
                    Shop sarees
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-sky/70">From $340</span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="group relative min-h-[420px] overflow-hidden rounded-[3px] bg-mist sm:min-h-[480px]">
              <img
                src="/images/editorial-hands.jpg"
                alt="Layered rings and bangles worn on a hand resting on blue silk"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/25 to-transparent" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-5 sm:min-h-[480px] sm:p-8">
                <div className="rounded-[2px] border border-white/90 bg-white/92 p-5 shadow-[0_20px_50px_-32px_rgba(9,43,74,0.5)] backdrop-blur-md sm:p-6">
                  <div className="flex items-center gap-2 text-sapphire">
                    <Sparkle className="h-4 w-4" />
                    <p className="eyebrow">The Bridal Appointment</p>
                  </div>
                  <h3 className="mt-2.5 font-serif text-[30px] font-light leading-[1.05] text-navy sm:text-[36px]">
                    Come sit with us.
                    <span className="block italic text-sapphire">Find your forever.</span>
                  </h3>
                  <p className="mt-2.5 max-w-[23rem] text-[12px] font-light leading-[1.8] text-stone">
                    A private, unhurried appointment with our stylists — jewellery and silk, chosen
                    together in our London atelier or over a video call.
                  </p>
                  <button
                    type="button"
                    onClick={() => shopCategory("Earrings")}
                    className="group/btn mt-4 inline-flex items-center gap-2.5 bg-navy px-5 py-3 text-[9.5px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-sapphire"
                  >
                    Explore bridal
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>

          <div
            className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-white/60 bg-white/95 px-6 py-5 shadow-soft backdrop-blur-sm lg:flex"
            aria-hidden="true"
          >
            <Monogram className="h-9 w-9" />
            <span className="text-[7px] font-medium uppercase tracking-[0.26em] text-sapphire">Symmify</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const words = ["Hand-finished", "Recycled silver", "Lab-grown stones", "Handwoven silk", "Made to last"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-line bg-mist py-4">
      <div className="animate-marquee flex w-max items-center gap-8 hover:[animation-play-state:paused]">
        {row.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex shrink-0 items-center gap-8 font-serif text-[17px] italic tracking-[0.02em] text-navy/70"
          >
            {word}
            <span className="h-1 w-1 rounded-full bg-sapphire/50" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Atelier() {
  const { notify } = useShop();

  return (
    <section id="atelier" className="scroll-mt-24 overflow-hidden bg-white py-16 sm:py-24">
      <div className="shell grid items-center gap-11 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="absolute -bottom-5 -left-4 hidden h-[62%] w-[78%] rounded-[3px] bg-sky sm:block" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[3px] border-[5px] border-white bg-mist shadow-soft">
            <img
              src="/images/atelier.jpg"
              alt="A Symmify jeweller hand-setting stones at the atelier bench"
              className="aspect-[5/4] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" />
          </div>
          <div className="relative -mt-7 ml-auto mr-4 w-[218px] border border-line bg-white p-4 shadow-card sm:-mt-10 sm:mr-8 sm:w-[246px] sm:p-5">
            <div className="flex items-center gap-2 text-sapphire">
              <Scissors className="h-4 w-4" />
              <span className="eyebrow">The atelier</span>
            </div>
            <p className="mt-2.5 font-serif text-[19px] leading-snug text-navy">
              A 21-point check before any piece leaves our bench.
            </p>
            <p className="mt-2 text-[10.5px] font-light leading-relaxed text-stone">
              Set, polished and finished by hand — never rushed.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow flex items-center gap-3 text-sapphire">
            <span className="h-px w-7 bg-sapphire/50" /> Inside the house
          </p>
          <h2 className="mt-4 font-serif text-[38px] font-light leading-[1.02] text-navy sm:text-[51px]">
            Made slowly.
            <span className="block italic text-sapphire">Worn forever.</span>
          </h2>
          <p className="mt-5 max-w-[32rem] text-[13px] font-light leading-[1.9] text-stone">
            Symmify began with a simple idea: jewellery should feel like you, not like a trend. We work
            with a small circle of artisans in Jaipur and weavers in Bengal to make pieces that are
            quietly beautiful — and made to outlive us.
          </p>

          <ul className="mt-7 divide-y divide-line">
            {[
              {
                icon: Diamond,
                title: "A considered hand",
                copy: "Hand-set stones, recycled metals and lab-grown sapphires of the highest grade.",
              },
              {
                icon: Leaf,
                title: "Lighter on the earth",
                copy: "100% recycled silver and gold, plastic-free packaging and carbon-neutral delivery.",
              },
              {
                icon: Check,
                title: "Kept for a lifetime",
                copy: "Complimentary annual cleaning, lifetime repairs and resizing on every piece.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <li key={title} className="flex gap-4 py-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-mist text-sapphire">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-serif text-[18px] leading-tight text-navy">{title}</span>
                  <span className="mt-1 block text-[11.5px] font-light leading-relaxed text-stone">{copy}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => notify("Our full atelier story is coming to the Journal soon.")}
              className="group inline-flex items-center gap-2.5 bg-navy px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-sapphire"
            >
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="mailto:atelier@symmify.com"
              className="group inline-flex items-center gap-2 border-b border-navy/20 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-navy transition-colors hover:border-sapphire hover:text-sapphire"
            >
              Book a private appointment
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="mt-7 font-serif text-[19px] italic text-sapphire/85">— The Symmify Atelier, Jaipur</p>

          <dl className="mt-7 grid grid-cols-3 divide-x divide-line border-t border-line pt-5">
            {[
              ["2014", "Founded in Jaipur"],
              ["38", "Artisan partners"],
              ["12k+", "Pieces rehomed"],
            ].map(([value, label]) => (
              <div key={label} className="px-3 first:pl-0">
                <dt className="font-serif text-[26px] leading-none text-navy">{value}</dt>
                <dd className="mt-1.5 text-[8.5px] uppercase leading-snug tracking-[0.16em] text-stone">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-sky py-14 sm:py-20">
      <Monogram className="pointer-events-none absolute -right-14 -top-10 h-[280px] w-[280px] opacity-[0.06]" />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-sapphire">Notes from our muses</p>
          <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.06] text-navy sm:text-[43px]">
            Loved, kept, <span className="italic text-sapphire">passed on</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2.5">
            <span className="flex gap-0.5 text-champagne" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5" />
              ))}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-stone">
              4.9 / 5 from 2,400+ reviews
            </span>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-3.5 md:grid-cols-3">
          {testimonials.map((review, index) => (
            <Reveal key={review.name} delay={index * 90} className="h-full">
              <figure className="flex h-full flex-col justify-between border border-white/80 bg-white/80 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-card sm:p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex gap-0.5 text-champagne" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-3 w-3" />
                      ))}
                    </span>
                    <span className="font-serif text-[34px] leading-none text-sapphire/25" aria-hidden="true">
                      &ldquo;
                    </span>
                  </div>
                  <blockquote className="mt-3.5 font-serif text-[18px] font-light italic leading-[1.55] text-navy/90">
                    {review.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-navy">{review.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[9.5px] tracking-[0.04em] text-stone">
                    <Check className="h-3 w-3 text-sapphire" /> {review.detail}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

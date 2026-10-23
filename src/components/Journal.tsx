import { gallery } from "../data";
import { useShop } from "../store";
import { ArrowRight, ArrowUpRight, Instagram } from "./Icons";
import { Reveal } from "./Reveal";

const stories = [
  {
    image: "/images/collection-saree.jpg",
    alt: "Indigo silk saree detail",
    category: "The Saree Atelier",
    title: "How to style an heirloom saree, three ways",
    read: "5 min read",
  },
  {
    image: "/images/atelier.jpg",
    alt: "Jeweller setting stones at the atelier bench",
    category: "Craft Notes",
    title: "The 21 checks behind every Symmify piece",
    read: "4 min read",
  },
  {
    image: "/images/editorial-earrings.jpg",
    alt: "Model wearing diamond chandelier earrings",
    category: "The Edit",
    title: "A quiet guide to sapphires and skin tones",
    read: "6 min read",
  },
];

export function Journal() {
  const { notify } = useShop();

  return (
    <section id="journal" className="scroll-mt-24 bg-white py-14 sm:py-20">
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sapphire">
              <span className="h-px w-7 bg-sapphire/50" /> The journal
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.04] text-navy sm:text-[43px]">
              Notes on <span className="italic text-sapphire">wearing well</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => notify("The Symmify Journal launches next month — join the letter for first access.")}
            className="group inline-flex w-fit items-center gap-2.5 border-b border-navy/25 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:border-sapphire hover:text-sapphire"
          >
            Read the journal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-5">
          {stories.map((story, index) => (
            <Reveal key={story.title} delay={index * 80}>
              <button
                type="button"
                onClick={() => notify("Journal story coming soon. Join the letter to be the first to read it.")}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-mist">
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3.5 flex items-center gap-2 text-[8.5px] font-medium uppercase tracking-[0.18em] text-sapphire">
                  {story.category}
                  <span className="h-0.5 w-0.5 rounded-full bg-stone/50" />
                  <span className="text-stone">{story.read}</span>
                </div>
                <h3 className="mt-1.5 max-w-[19rem] font-serif text-[22px] leading-[1.2] text-navy transition-colors group-hover:text-sapphire">
                  {story.title}
                </h3>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const { notify } = useShop();

  return (
    <section id="social" className="scroll-mt-24 bg-mist py-14 sm:py-16">
      <div className="shell">
        <Reveal className="mx-auto max-w-lg text-center">
          <p className="eyebrow flex items-center justify-center gap-2 text-sapphire">
            <Instagram className="h-3.5 w-3.5" /> @symmify.jewels
          </p>
          <h2 className="mt-3 font-serif text-[32px] font-light leading-[1.06] text-navy sm:text-[40px]">
            The world <span className="italic text-sapphire">through our lens</span>
          </h2>
          <p className="mt-3 text-[12.5px] font-light leading-relaxed text-stone">
            Styling notes, atelier moments and the pieces you keep tagging us in.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((image, index) => (
            <Reveal key={image.image + index} delay={index * 50}>
              <button
                type="button"
                onClick={() => notify("Follow @symmify.jewels — our social galleries are opening soon.")}
                className="group relative block aspect-square w-full overflow-hidden rounded-[2px] bg-line"
                aria-label={`View Instagram image: ${image.alt}`}
              >
                <img
                  src={image.image}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]"
                  style={{ objectPosition: image.position }}
                  loading="lazy"
                />
                <span className="absolute inset-0 grid place-items-center bg-navy/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/50 text-white">
                    <Instagram className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => notify("Follow @symmify.jewels — our social galleries are opening soon.")}
            className="inline-flex items-center gap-2.5 border border-navy/25 bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:border-sapphire hover:text-sapphire"
          >
            <Instagram className="h-4 w-4" /> Follow our journal
          </button>
        </div>
      </div>
    </section>
  );
}

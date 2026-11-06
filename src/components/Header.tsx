import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useShop } from "../store";
import { categories } from "../data";
import { Logo } from "./Logo";
import {
  ArrowRight,
  ArrowUpRight,
  Bag,
  ChevronDown,
  Close,
  Heart,
  Instagram,
  Menu,
  Pinterest,
  Search,
  Sparkle,
  User,
  Facebook,
} from "./Icons";

const navItems = [
  { label: "New In", action: "new" as const },
  { label: "Jewellery", action: "mega" as const },
  { label: "Sarees", action: "sarees" as const },
  { label: "The Atelier", action: "atelier" as const },
  { label: "Journal", action: "journal" as const },
];

function HeaderAction({
  label,
  onClick,
  children,
  count,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  count?: number;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-mist hover:text-sapphire",
        className,
      )}
    >
      {children}
      <span className="sr-only">{label}</span>
      {typeof count === "number" && count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-sapphire px-1 text-[9px] font-medium leading-none text-white ring-2 ring-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const { bagCount, wishlist, openOverlay, closeOverlay, overlay, shopCategory, notify } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: "new" | "sarees" | "atelier" | "journal") => {
    closeOverlay();
    if (target === "new") return shopCategory("All");
    if (target === "sarees") return shopCategory("Sarees");
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <>
      <div className="relative z-50 bg-navy text-white">
        <div className="shell flex h-9 items-center justify-center gap-4 text-[9px] font-normal uppercase tracking-[0.2em] sm:text-[10px] md:justify-between">
          <p className="hidden items-center gap-2 text-sky/85 md:flex">
            <Sparkle className="h-3.5 w-3.5 text-[#9fc6e8]" />
            Complimentary shipping over $150
          </p>
          <p className="flex items-center gap-2 text-sky">
            <span className="hidden text-sky/65 sm:inline">Just landed:</span>
            <span className="tracking-[0.16em] text-white">The Sapphire Edit</span>
            <button
              type="button"
              onClick={() => shopCategory("Necklaces")}
              className="inline-flex items-center gap-1.5 border-b border-white/30 pb-px tracking-[0.16em] text-white transition-colors hover:border-white"
            >
              Discover <ArrowRight className="h-3 w-3" />
            </button>
          </p>
          <div className="hidden items-center gap-5 text-sky/80 md:flex">
            <span>EN · USD $</span>
            <a href="mailto:symmify@gmail.com" className="underline-link">
              Private appointments
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-line/90 bg-white/95 backdrop-blur-xl transition-shadow duration-300",
          scrolled && "shadow-[0_18px_40px_-34px_rgba(9,43,74,0.65)]",
        )}
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between gap-3 transition-[height] duration-300",
              scrolled ? "h-[68px] lg:h-[74px]" : "h-[76px] lg:h-[88px]",
            )}
          >
            <div className="flex min-w-0 items-center gap-1 lg:gap-0">
              <button
                type="button"
                onClick={() => openOverlay("menu")}
                className="mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-mist hover:text-sapphire lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <a
                href="#top"
                onClick={closeOverlay}
                className="min-w-0 shrink-0"
                aria-label="Symmify — home"
              >
                <Logo />
              </a>
            </div>

            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navItems.map((item) =>
                item.action === "mega" ? (
                  <div key={item.label} className="group relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      className="flex items-center gap-1.5 py-8 text-[11px] font-medium uppercase tracking-[0.17em] text-ink transition-colors hover:text-sapphire"
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="invisible absolute left-1/2 top-full w-[610px] -translate-x-1/2 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="grid grid-cols-[1fr_238px] gap-6 rounded-b-md border border-line bg-white p-6 shadow-[0_30px_70px_-30px_rgba(9,43,74,0.35)]">
                        <div>
                          <p className="eyebrow mb-4 text-sapphire">Shop by signature</p>
                          <ul>
                            {categories.slice(0, 4).map((category) => (
                              <li key={category.name}>
                                <button
                                  type="button"
                                  onClick={() => shopCategory(category.name)}
                                  className="group/link flex w-full items-center justify-between border-b border-line/70 py-3 text-left last:border-none"
                                >
                                  <span>
                                    <span className="block font-serif text-[19px] leading-tight text-navy">
                                      {category.label}
                                    </span>
                                    <span className="mt-0.5 block text-[10.5px] uppercase tracking-[0.14em] text-stone">
                                      {category.copy}
                                    </span>
                                  </span>
                                  <ArrowUpRight className="h-4 w-4 text-stone transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-sapphire" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          type="button"
                          onClick={() => shopCategory("Necklaces")}
                          className="group/feature relative overflow-hidden rounded-sm bg-mist text-left"
                        >
                          <img
                            src="/images/p-necklace.jpg"
                            alt="The Celeste sapphire necklace"
                            className="h-[150px] w-full object-cover transition-transform duration-700 group-hover/feature:scale-105"
                            loading="lazy"
                          />
                          <span className="block p-4">
                            <span className="eyebrow block text-sapphire">Most loved</span>
                            <span className="mt-1.5 block font-serif text-lg leading-tight text-navy">
                              The Celeste Necklace
                              <span className="mt-1 block font-sans text-[11px] tracking-[0.08em] text-stone">
                                $248
                              </span>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item.action)}
                    className="py-8 text-[11px] font-medium uppercase tracking-[0.17em] text-ink transition-colors hover:text-sapphire"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </nav>

            <div className="flex items-center gap-0.5">
              <HeaderAction
                label="Search"
                onClick={() => openOverlay("search")}
                className="hidden sm:grid"
              >
                <Search className="h-[19px] w-[19px]" />
              </HeaderAction>
              <HeaderAction
                label="Client account"
                onClick={() => notify("Client accounts open soon. Join our letter for early access.")}
                className="hidden xl:grid"
              >
                <User className="h-[19px] w-[19px]" />
              </HeaderAction>
              <HeaderAction
                label="Wishlist"
                onClick={() => openOverlay("wishlist")}
                count={wishlist.length}
                className="hidden sm:grid"
              >
                <Heart className="h-[19px] w-[19px]" />
              </HeaderAction>
              <HeaderAction label="Shopping bag" onClick={() => openOverlay("cart")} count={bagCount}>
                <Bag className="h-[19px] w-[19px]" />
              </HeaderAction>
              <button
                type="button"
                onClick={() => openOverlay("search")}
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-mist hover:text-sapphire sm:hidden"
                aria-label="Search"
              >
                <Search className="h-[19px] w-[19px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {overlay === "menu" && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            onClick={closeOverlay}
            aria-label="Close menu"
            className="absolute inset-0 animate-fade-in bg-navy/45 backdrop-blur-[2px]"
          />
          <div className="animate-slide-in-left absolute inset-y-0 left-0 flex w-[90%] max-w-[380px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo withTagline={false} />
              <button
                type="button"
                onClick={closeOverlay}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy transition hover:bg-mist"
                aria-label="Close menu"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-8">
              <nav aria-label="Mobile" className="divide-y divide-line/80">
                {navItems.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.action === "mega") {
                        closeOverlay();
                        window.setTimeout(() => shopCategory("All"), 40);
                      } else {
                        go(item.action);
                      }
                    }}
                    className="flex w-full items-baseline justify-between py-4 text-left"
                  >
                    <span className="font-serif text-[25px] text-navy">{item.label}</span>
                    <span className="text-[10px] tracking-[0.22em] text-stone">
                      0{index + 1}
                    </span>
                  </button>
                ))}
              </nav>

              <p className="eyebrow mt-7 text-sapphire">Shop by category</p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => shopCategory(category.name)}
                    className="group overflow-hidden rounded-sm border border-line bg-mist text-left"
                  >
                    <img
                      src={category.image}
                      alt=""
                      className="h-20 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="block px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-navy">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openOverlay("wishlist")}
                  className="flex items-center justify-center gap-2 border border-line bg-white py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-navy"
                >
                  <Heart className="h-4 w-4" /> Wishlist
                </button>
                <button
                  type="button"
                  onClick={() => openOverlay("cart")}
                  className="flex items-center justify-center gap-2 border border-line bg-white py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-navy"
                >
                  <Bag className="h-4 w-4" /> Bag ({bagCount})
                </button>
              </div>

              <div className="mt-7 rounded-sm bg-mist p-4">
                <p className="eyebrow text-sapphire">Client care</p>
                <a href="mailto:symmify@gmail.com" className="mt-2 block font-serif text-lg text-navy">
                  symmify@gmail.com
                </a>
                <p className="mt-1 text-[11px] text-stone">Mon–Sat · 9am to 6pm GMT</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone">Follow us</span>
                <div className="flex gap-1">
                  {[Instagram, Facebook, Pinterest].map((Icon, index) => (
                    <a
                      key={index}
                      href={index === 0 ? "https://www.instagram.com/symmify" : "#social"}
                      target={index === 0 ? "_blank" : undefined}
                      rel={index === 0 ? "noreferrer" : undefined}
                      onClick={closeOverlay}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-navy transition hover:border-sapphire hover:text-sapphire"
                      aria-label={`Symmify on ${["Instagram", "Facebook", "Pinterest"][index]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-line bg-mist px-5 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-stone">
              Complimentary shipping over $150
            </div>
          </div>
        </div>
      )}
    </>
  );
}

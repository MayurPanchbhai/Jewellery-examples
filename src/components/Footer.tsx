/** @format */

import { useState, type FormEvent } from "react";
import { useShop } from "../store";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Facebook,
  Globe,
  Instagram,
  Lock,
  Mail,
  MapPin,
  Phone,
  Pinterest,
  Shield,
  Sparkle,
  Truck,
} from "./Icons";
import { Logo, Monogram } from "./Logo";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const { notify } = useShop();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("done");
    notify("Welcome to Symmify — your first letter is on its way.");
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-navy text-white">
      <div
        className="lining-texture pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Monogram
        tone="light"
        className="pointer-events-none absolute -bottom-16 right-4 h-[280px] w-[280px] opacity-[0.09] sm:right-24 sm:h-[340px] sm:w-[340px]"
      />
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div className="shell relative grid items-center gap-9 py-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:py-16">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-sky/80">
            <span className="h-px w-7 bg-sky/50" /> The Symmify letter
          </p>
          <h2 className="mt-3 max-w-lg font-serif text-[36px] font-light leading-[1.03] sm:text-[46px]">
            A little beauty,
            <span className="block italic text-[#a9ceef]">delivered.</span>
          </h2>
          <p className="mt-4 max-w-md text-[12.5px] font-light leading-[1.85] text-sky/75">
            New pieces, atelier notes and private invitation-only previews. One
            considered letter a month, never more.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.16em] text-sky/65">
            <li className="flex items-center gap-1.5">
              <Sparkle className="h-3.5 w-3.5 text-[#a9ceef]" /> Early access
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#a9ceef]" /> Atelier notes
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#a9ceef]" /> No noise
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {status === "done" ? (
            <div className="rounded-sm border border-white/25 bg-white/10 p-6 backdrop-blur-md sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy">
                <Check className="h-5 w-5" />
              </span>
              <p className="mt-4 font-serif text-[26px] leading-tight text-white">
                You&rsquo;re on the list.
              </p>
              <p className="mt-2 text-[12px] font-light leading-relaxed text-sky/80">
                Welcome to Symmify. Your first letter is on its way to{" "}
                <span className="text-white">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                }}
                className="mt-4 border-b border-white/40 pb-1 text-[9.5px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white">
                Add another email
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label
                htmlFor="newsletter-email"
                className="eyebrow block text-sky/70">
                Your email address
              </label>
              <div className="mt-2.5 flex border border-white/25 bg-white/10 p-1.5 backdrop-blur-md focus-within:border-white/60">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "invalid") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === "invalid"}
                  aria-describedby="newsletter-note"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[13px] font-light text-white placeholder:text-sky/45 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center gap-2 bg-white px-4 py-3 text-[9.5px] font-medium uppercase tracking-[0.16em] text-navy transition-colors hover:bg-sky sm:px-5">
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              {status === "invalid" && (
                <p role="alert" className="mt-2 text-[11px] text-[#ffd9b0]">
                  Please enter a valid email address.
                </p>
              )}
              <p
                id="newsletter-note"
                className="mt-3 flex items-start gap-2 text-[10px] font-light leading-relaxed text-sky/55">
                <Lock className="mt-px h-3 w-3 shrink-0" />
                By subscribing you agree to our privacy policy. Unsubscribe any
                time, in one click.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { shopCategory, notify } = useShop();

  const care = [
    {
      label: "Shipping & delivery",
      message:
        "Complimentary shipping over $150 · Express $12 · 3–5 working days.",
    },
    {
      label: "Returns & exchanges",
      message:
        "30-day returns on unworn pieces. Sarees must be uncut with tags.",
    },
    {
      label: "Jewellery care",
      message:
        "Store pieces separately in the blue pouch. Clean your sapphires annually with us.",
    },
    {
      label: "Ring sizing",
      message:
        "Order a ring sizer or visit our London atelier for complimentary sizing.",
    },
  ];

  return (
    <footer className="bg-[#f6faff]">
      <div className="shell py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.85fr_0.85fr_0.85fr] lg:gap-8">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label="Symmify — home">
              <Logo taglineOnMobile />
            </a>
            <p className="mt-5 text-[12px] font-light leading-[1.9] text-stone">
              Fine jewellery and handwoven sarees, made with a small circle of
              artisans in Jaipur and Bengal. Designed in London. Kept for a
              lifetime.
            </p>
            <div className="mt-5 flex gap-1.5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Pinterest, label: "Pinterest" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={`Symmify on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-dark/70 bg-white text-navy transition-colors hover:border-sapphire hover:text-sapphire">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-[11.5px] font-light text-stone">
              <a
                href="mailto:symmify@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-sapphire">
                <Mail className="h-3.5 w-3.5 text-sapphire" /> symmify@gmail.com
              </a>
              <a
                href="tel:+442079460018"
                className="flex items-center gap-2 transition-colors hover:text-sapphire">
                <Phone className="h-3.5 w-3.5 text-sapphire" /> +44 (0)20 7946
                0018
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sapphire" />
                27 Marylebone High Street, London · By appointment
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[9.5px] font-medium uppercase tracking-[0.24em] text-navy">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-[11.5px] font-light text-stone">
              {[
                "All pieces",
                "New in",
                "Necklaces",
                "Earrings",
                "Bangles",
                "Sarees",
              ].map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() =>
                      label === "All pieces" || label === "New in"
                        ? shopCategory("All")
                        : shopCategory(label as "Necklaces")
                    }
                    className="transition-colors hover:text-sapphire">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[9.5px] font-medium uppercase tracking-[0.24em] text-navy">
              The house
            </h3>
            <ul className="mt-4 space-y-2.5 text-[11.5px] font-light text-stone">
              <li>
                <a
                  href="#atelier"
                  className="transition-colors hover:text-sapphire">
                  Our story
                </a>
              </li>
              <li>
                <a
                  href="#atelier"
                  className="transition-colors hover:text-sapphire">
                  The atelier
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  className="transition-colors hover:text-sapphire">
                  The journal
                </a>
              </li>
              <li>
                <a
                  href="#social"
                  className="transition-colors hover:text-sapphire">
                  Follow along
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    notify(
                      "Private appointments: email atelier@symmify.com and we'll arrange a time.",
                    )
                  }
                  className="transition-colors hover:text-sapphire">
                  Private appointments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    notify(
                      "Gift cards are arriving soon — join the letter for early access.",
                    )
                  }
                  className="transition-colors hover:text-sapphire">
                  Gift cards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[9.5px] font-medium uppercase tracking-[0.24em] text-navy">
              Client care
            </h3>
            <ul className="mt-4 space-y-2.5 text-[11.5px] font-light text-stone">
              {care.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => notify(item.message)}
                    className="text-left transition-colors hover:text-sapphire">
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="mailto:care@symmify.com"
                  className="inline-flex items-center gap-1 transition-colors hover:text-sapphire">
                  Contact us <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-y border-line py-5 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {[
            {
              icon: Shield,
              title: "Secure checkout",
              copy: "256-bit encrypted payments",
            },
            {
              icon: Truck,
              title: "Carbon-neutral delivery",
              copy: "Tracked, insured & plastic-free",
            },
            {
              icon: Sparkle,
              title: "Lifetime care",
              copy: "Complimentary repairs & cleaning",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="flex items-center gap-3 sm:justify-center sm:px-4">
              <Icon className="h-5 w-5 shrink-0 text-sapphire" />
              <div>
                <p className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-navy">
                  {title}
                </p>
                <p className="mt-0.5 text-[10.5px] font-light text-stone">
                  {copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[9.5px] uppercase tracking-[0.15em] text-stone">
            <span>
              © {new Date().getFullYear()} Symmify. All rights reserved.
            </span>
            <button
              type="button"
              onClick={() =>
                notify(
                  "Privacy policy: we store only what we need to serve your order.",
                )
              }
              className="transition-colors hover:text-sapphire">
              Privacy
            </button>
            <button
              type="button"
              onClick={() =>
                notify(
                  "Terms of service: samples and made-to-order pieces are final sale.",
                )
              }
              className="transition-colors hover:text-sapphire">
              Terms
            </button>
            <button
              type="button"
              onClick={() =>
                notify(
                  "Cookies: we use essential cookies only in this demonstration.",
                )
              }
              className="transition-colors hover:text-sapphire">
              Cookies
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                notify(
                  "You're viewing our USD store. GBP and EUR are available at checkout soon.",
                )
              }
              className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.15em] text-stone transition-colors hover:text-sapphire">
              <Globe className="h-3.5 w-3.5" /> United States · USD $
            </button>
            <div className="flex items-center gap-1">
              {["VISA", "MC", "AMEX", "PayPal", "Klarna"].map((method) => (
                <span
                  key={method}
                  className="grid h-5 min-w-8 place-items-center rounded-[2px] border border-line-dark/60 bg-white px-1.5 text-[7px] font-semibold uppercase tracking-[0.05em] text-navy/60">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <p className="text-[8.5px] uppercase tracking-[0.26em] text-stone/70">
            Designed in London · Made in Jaipur
          </p>
          <a
            href="#top"
            className="group flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.22em] text-stone transition-colors hover:text-sapphire">
            Back to top
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

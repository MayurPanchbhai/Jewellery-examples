import { cn } from "../utils/cn";

export function Monogram({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const primary = tone === "dark" ? "#092b4a" : "#ffffff";
  const secondary = tone === "dark" ? "#1c5fa8" : "#a9ceef";
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M24 3.6c6.9 5.9 10.8 12.9 10.8 20.3 0 7.7-4.5 14.2-10.8 19.5-6.3-5.3-10.8-11.8-10.8-19.5C13.2 16.5 17.1 9.5 24 3.6Z"
        stroke={primary}
        strokeWidth="1"
      />
      <path
        d="M24 8.6c5 4.3 7.8 9.5 7.8 14.9 0 5.9-3.1 10.9-7.8 15.1-4.7-4.2-7.8-9.2-7.8-15.1 0-5.4 2.8-10.6 7.8-14.9Z"
        stroke={secondary}
        strokeWidth="0.8"
      />
      <path
        d="M24 15.5c2.7 2.3 4.2 5.1 4.2 8 0 3.2-1.7 5.9-4.2 8.2-2.5-2.3-4.2-5-4.2-8.2 0-2.9 1.5-5.7 4.2-8Z"
        fill={tone === "dark" ? "#f3f8fd" : "rgba(255,255,255,0.1)"}
        stroke={primary}
        strokeWidth="0.7"
      />
      <path d="M24 24.2c2-1.8 4-1.8 6 0-2 1.8-4 1.8-6 0Z" fill={secondary} />
      <path d="M18 24.2c2-1.8 4-1.8 6 0-2 1.8-4 1.8-6 0Z" fill={secondary} />
      <circle cx="24" cy="24.2" r="1.1" fill={primary} />
      <circle cx="24" cy="44.4" r="1.4" fill={secondary} />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  withTagline = true,
  taglineOnMobile = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  withTagline?: boolean;
  taglineOnMobile?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <Monogram
        tone={tone}
        className={cn("h-9 w-9 shrink-0 sm:h-11 sm:w-11", tone === "light" && "opacity-95")}
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-serif text-[24px] leading-none tracking-[0.14em] sm:text-[30px]",
            tone === "dark" ? "text-navy" : "text-white",
          )}
        >
          symmify
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-1.5 text-[7px] font-medium uppercase leading-none tracking-[0.34em] sm:text-[7.5px]",
              taglineOnMobile ? "block" : "hidden sm:block",
              tone === "dark" ? "text-sapphire" : "text-sky/80",
            )}
          >
            Fine Jewellery &amp; Sarees
          </span>
        )}
      </span>
    </span>
  );
}

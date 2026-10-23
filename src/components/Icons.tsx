import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Search = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Base>
);

export const User = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8.2" r="3.7" />
    <path d="M4.8 20.2c.8-3.6 3.6-5.6 7.2-5.6s6.4 2 7.2 5.6" />
  </Base>
);

export const Heart = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.1c-1-.8-7.7-5.1-7.7-10A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.7 2.7c0 4.9-6.7 9.2-7.7 10Z" />
  </Base>
);

export const Bag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.3 8.2h13.4l1 12.1H4.3l1-12.1Z" />
    <path d="M8.7 9.5V7a3.3 3.3 0 0 1 6.6 0v2.5" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Base>
);

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15.5M13.5 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Base>
);

export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="m14.5 5.5-6 6.5 6 6.5" />
  </Base>
);

export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9.5 5.5 6 6.5-6 6.5" />
  </Base>
);

export const Plus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Minus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </Base>
);

export const Trash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6.5h16M9 6.5V4.2h6v2.3M6.5 6.5 7.6 21h8.8l1.1-14.5" />
    <path d="M10 10.5v6.5M14 10.5v6.5" />
  </Base>
);

export const Star = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.2} aria-hidden="true" {...p}>
    <path d="m10 1.8 2.55 5.17 5.7.83-4.13 4.02.98 5.68L10 14.82 4.9 17.5l.98-5.68L1.75 7.8l5.7-.83L10 1.8Z" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2 20 6v5.4c0 4.6-3.2 7.8-8 9.4-4.8-1.6-8-4.8-8-9.4V6l8-2.8Z" />
    <path d="m8.6 11.8 2.3 2.3 4.5-4.6" />
  </Base>
);

export const Truck = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 6.2h10.4v10H2.8zM13.2 9.5h3.7l3.3 3.2v3.5h-7z" />
    <circle cx="6.5" cy="17.6" r="1.7" />
    <circle cx="17" cy="17.6" r="1.7" />
  </Base>
);

export const Sparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.8c.8 4.7 2.5 6.4 7.2 7.2-4.7.8-6.4 2.5-7.2 7.2-.8-4.7-2.5-6.4-7.2-7.2 4.7-.8 6.4-2.5 7.2-7.2Z" />
    <path d="M18.5 16.2c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9Z" />
  </Base>
);

export const Diamond = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 4h10l4 5.2L12 21 3 9.2 7 4Z" />
    <path d="M3 9.2h18M9 4l-2 5.2L12 21l5-11.8L15 4" />
  </Base>
);

export const Leaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 4C11 4 5 7.5 5 14a5.5 5.5 0 0 0 5.5 5.5C16.5 19.5 20 13 20 4Z" />
    <path d="M4 21c1-6 4.5-9.8 10-12" />
  </Base>
);

export const Gift = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 9.8h17V21h-17zM2.5 6.4h19v3.4h-19zM12 6.4V21" />
    <path d="M12 6.4C10 6.4 6.8 6 6.8 3.9c0-1.2 1-1.9 2.1-1.9C11 2 12 6.4 12 6.4ZM12 6.4c2 0 5.2-.4 5.2-2.5 0-1.2-1-1.9-2.1-1.9C13 2 12 6.4 12 6.4Z" />
  </Base>
);

export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
  </Base>
);

export const Facebook = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.8 21v-7.4h2.5l.4-3h-2.9V8.7c0-.9.3-1.5 1.6-1.5h1.5V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H9v3h2.5V21h3.3Z" />
  </Base>
);

export const Pinterest = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 20c.8-2.1 1.4-4.2 1.8-6.2-.5-.9-.5-2.3.3-3.1.8-.8 2-.3 2.1.8.1 1-.7 2.2-1 3.2-.3.9.4 1.6 1.3 1.6 1.6 0 2.7-2 2.7-4 0-1.8-1.4-3-3.3-3-2.4 0-3.9 1.9-3.9 3.8 0 .9.3 1.6.7 2" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.5 3.5 10 8l-2 1.8a12.5 12.5 0 0 0 6.2 6.2L16 14l4.5 2.5-1.2 3a2 2 0 0 1-2.2 1.2C10.4 19.4 4.6 13.6 3.3 6.9a2 2 0 0 1 1.2-2.2l3-1.2Z" />
  </Base>
);

export const MapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </Base>
);

export const Eye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 12S6.2 5.8 12 5.8 21.2 12 21.2 12 17.8 18.2 12 18.2 2.8 12 2.8 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);

export const Lock = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.8" y="10.2" width="14.4" height="10.4" rx="1.5" />
    <path d="M8.2 10.2V7.4a3.8 3.8 0 0 1 7.6 0v2.8M12 14.2v2.4" />
  </Base>
);

export const Scissors = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.2 7.8 20 18M8.2 16.2 20 6" />
  </Base>
);

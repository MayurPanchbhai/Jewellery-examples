export type Category = "Necklaces" | "Earrings" | "Bangles" | "Rings" | "Sarees";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  category: Category;
  collection: string;
  image: string;
  imageAlt: string;
  badge?: "Bestseller" | "New" | "Limited";
  rating: number;
  reviews: number;
  metal: string;
  stone: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "celeste-necklace",
    name: "The Celeste Necklace",
    subtitle: "Sapphire & diamond statement",
    price: 248,
    compareAt: 295,
    category: "Necklaces",
    collection: "The Sapphire Edit",
    image: "/images/p-necklace.jpg",
    imageAlt: "Sapphire and diamond statement necklace on an ivory bust",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 128,
    metal: "18k gold vermeil",
    stone: "Lab-grown sapphire",
    description:
      "A symmetrical cascade of hand-set stones, designed to catch the light from every angle. Celeste is the piece our atelier is asked about most.",
    details: [
      "18k gold vermeil over recycled sterling silver",
      "52 brilliant-cut lab-grown sapphires",
      "Adjustable 40–45cm chain with hidden clasp",
      "Arrives in our signature blue keepsake box",
    ],
  },
  {
    id: "aurora-drops",
    name: "Aurora Pearl Drops",
    subtitle: "Freshwater pearl chandeliers",
    price: 128,
    category: "Earrings",
    collection: "New In",
    image: "/images/p-earrings.jpg",
    imageAlt: "Pair of diamond and pearl chandelier earrings on a pale blue backdrop",
    badge: "New",
    rating: 4.8,
    reviews: 76,
    metal: "Sterling silver",
    stone: "Freshwater pearl",
    description:
      "Weightless chandeliers that move as you do. Each pearl is hand-selected for its lustre, then suspended on a fine diamond-set frame.",
    details: [
      "Rhodium-plated recycled sterling silver",
      "Two 8mm AA-grade freshwater pearls",
      "0.42ct lab-grown diamond pavé",
      "Butterfly closure with comfort backing",
    ],
  },
  {
    id: "eternity-bangles",
    name: "Eternity Bangle Stack",
    subtitle: "Set of three, sapphire pavé",
    price: 196,
    category: "Bangles",
    collection: "The Everyday Edit",
    image: "/images/p-bangles.jpg",
    imageAlt: "Stack of sapphire and diamond bangles resting on blue silk",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 201,
    metal: "18k gold vermeil",
    stone: "White sapphire",
    description:
      "Three slim bangles, made to be layered and lived in. Wear them together as a quiet statement, or one at a time as a daily ritual.",
    details: [
      "Set of three stackable bangles",
      "18k gold vermeil over recycled silver",
      "Hand-set white sapphire pavé",
      "Available in three inner diameters",
    ],
  },
  {
    id: "lyra-ring",
    name: "Lyra Sapphire Ring",
    subtitle: "Oval solitaire, white gold",
    price: 184,
    category: "Rings",
    collection: "The Sapphire Edit",
    image: "/images/p-ring.jpg",
    imageAlt: "Oval sapphire and diamond ring on an ivory ceramic pedestal",
    badge: "New",
    rating: 5,
    reviews: 54,
    metal: "14k white gold",
    stone: "Oval sapphire",
    description:
      "Our answer to the modern heirloom. A single oval sapphire, held by a whisper-thin band and framed with a halo of brilliant stones.",
    details: [
      "Solid 14k recycled white gold",
      "1.1ct lab-grown oval sapphire",
      "0.18ct diamond halo",
      "Complimentary resizing within 60 days",
    ],
  },
  {
    id: "solene-pendant",
    name: "Solene Pearl Pendant",
    subtitle: "Pearl & diamond whisper",
    price: 112,
    category: "Necklaces",
    collection: "Everyday Classics",
    image: "/images/p-pendant.jpg",
    imageAlt: "Delicate pearl and diamond pendant necklace on ivory linen",
    rating: 4.8,
    reviews: 89,
    metal: "14k gold fill",
    stone: "Freshwater pearl",
    description:
      "The necklace you will reach for without thinking. A luminous pearl on a barely-there chain, with a single diamond to catch the day.",
    details: [
      "14k gold-filled chain and setting",
      "One 9mm freshwater pearl",
      "Single 2mm lab-grown diamond",
      "42cm chain with 3cm extender",
    ],
  },
  {
    id: "indigo-saree",
    name: "The Indigo Heirloom Saree",
    subtitle: "Silk zari, hand-finished",
    price: 340,
    category: "Sarees",
    collection: "The Saree Atelier",
    image: "/images/collection-saree.jpg",
    imageAlt: "Indigo blue silk saree with fine silver zari border",
    badge: "Limited",
    rating: 4.9,
    reviews: 42,
    metal: "Pure mulberry silk",
    stone: "Silver zari border",
    description:
      "Woven over five days on a traditional handloom, our indigo saree is an heirloom in the making — fluid, luminous and quietly regal.",
    details: [
      "Pure mulberry silk, 5.5m with blouse piece",
      "Handwoven silver zari border",
      "Natural indigo dye, small-batch",
      "Dry clean only; store in the enclosed muslin",
    ],
  },
];

export const categories: {
  name: Category;
  label: string;
  copy: string;
  image: string;
  count: string;
}[] = [
  {
    name: "Necklaces",
    label: "Necklaces",
    copy: "Pendants & statements",
    image: "/images/p-necklace.jpg",
    count: "24 pieces",
  },
  {
    name: "Earrings",
    label: "Earrings",
    copy: "Drops & chandeliers",
    image: "/images/p-earrings.jpg",
    count: "18 pieces",
  },
  {
    name: "Bangles",
    label: "Bangles",
    copy: "Everyday stacks",
    image: "/images/p-bangles.jpg",
    count: "12 pieces",
  },
  {
    name: "Sarees",
    label: "Sarees",
    copy: "Handwoven silk",
    image: "/images/collection-saree.jpg",
    count: "9 pieces",
  },
];

export const heroSlides = [
  {
    eyebrow: "The Sapphire Edit · 2026",
    titleTop: "Adorned in light,",
    titleItalic: "made to be",
    titleEnd: "remembered.",
    copy: "Heirloom-minded jewellery and handwoven sarees, designed for the moments you will want to hold on to.",
    image: "/images/hero.jpg",
    imageAlt: "Woman in a sapphire blue silk saree wearing a diamond and pearl necklace",
    objectPosition: "center 32%",
    cta: "Shop the edit",
    filter: "Necklaces" as Category,
  },
  {
    eyebrow: "The Bridal Heirloom",
    titleTop: "For the promises",
    titleItalic: "you will wear",
    titleEnd: "forever.",
    copy: "A considered bridal collection of diamond, pearl and sapphire pieces — made to be passed down, not put away.",
    image: "/images/editorial-earrings.jpg",
    imageAlt: "Close-up of a bride wearing diamond chandelier earrings and a sapphire pendant",
    objectPosition: "center 30%",
    cta: "Explore bridal",
    filter: "Earrings" as Category,
  },
  {
    eyebrow: "The Saree Atelier",
    titleTop: "Woven in silk.",
    titleItalic: "Finished by",
    titleEnd: "hand.",
    copy: "Small-batch indigo, ivory and sky-blue silk sarees from our weavers in Bengal and Varanasi.",
    image: "/images/collection-saree.jpg",
    imageAlt: "Handwoven indigo silk saree with a silver zari border",
    objectPosition: "center",
    cta: "Discover sarees",
    filter: "Sarees" as Category,
  },
];

export const testimonials = [
  {
    quote:
      "The Celeste necklace arrived in the most beautiful blue box. It feels substantial and delicate at once — I have not taken it off since my wedding.",
    name: "Anaisha R.",
    detail: "Celeste Necklace · verified buyer",
  },
  {
    quote:
      "I ordered the indigo saree for my sister's engagement. The zari catches the light like nothing else, and the team helped me choose the blouse fabric over WhatsApp.",
    name: "Priya M.",
    detail: "Indigo Heirloom Saree · verified buyer",
  },
  {
    quote:
      "Beautifully packaged, beautifully made. The Eternity bangles are my everyday stack now, and the free resizing made gifting them effortless.",
    name: "Claire B.",
    detail: "Eternity Bangle Stack · verified buyer",
  },
];

export const gallery = [
  {
    image: "/images/hero.jpg",
    alt: "Symmify campaign portrait in blue silk",
    position: "center 25%",
  },
  {
    image: "/images/p-earrings.jpg",
    alt: "Pearl chandelier earrings",
    position: "center",
  },
  {
    image: "/images/editorial-hands.jpg",
    alt: "Stacked rings and bangles on blue silk",
    position: "center",
  },
  {
    image: "/images/editorial-earrings.jpg",
    alt: "Close-up jewellery portrait",
    position: "center 30%",
  },
  {
    image: "/images/collection-saree.jpg",
    alt: "Indigo silk saree detail",
    position: "center",
  },
  {
    image: "/images/p-necklace.jpg",
    alt: "Celeste sapphire necklace",
    position: "center",
  },
];

export const navLinks = [
  { label: "New In", href: "#new-in" },
  { label: "Jewellery", href: "#shop", children: ["Necklaces", "Earrings", "Bangles", "Rings"] },
  { label: "Sarees", href: "#sarees" },
  { label: "The Atelier", href: "#atelier" },
  { label: "Journal", href: "#journal" },
];

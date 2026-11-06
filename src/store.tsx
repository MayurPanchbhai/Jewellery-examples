import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products, type Category, type Product } from "./data";

export type Overlay = "cart" | "wishlist" | "search" | "menu" | null;
export type BagLine = { id: string; qty: number };
export type SavedOrder = {
  id: string;
  createdAt: string;
  items: Array<{ id: string; name: string; image: string; qty: number; unitPrice: number; variant?: string }>;
  subtotal: number;
  shipping: number;
  total: number;
  customer: { name: string; email: string; phone: string; address: string; city: string; postalCode: string; country: string };
};
export type Filter = "All" | Category;

type Toast = { id: number; message: string; action?: "bag" };

type ShopContextValue = {
  bag: BagLine[];
  bagCount: number;
  subtotal: number;
  addToBag: (product: Product, qty?: number, options?: { openBag?: boolean }) => void;
  removeFromBag: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearBag: () => void;
  orders: SavedOrder[];
  placeOrder: (shipping: number, customer: SavedOrder["customer"]) => SavedOrder | null;
  newsletterEmails: string[];
  subscribe: (email: string) => void;
  wishlist: string[];
  toggleWishlist: (product: Product, options?: { openWishlist?: boolean }) => void;
  isWishlisted: (id: string) => boolean;
  overlay: Overlay;
  openOverlay: (overlay: Overlay) => void;
  closeOverlay: () => void;
  quickView: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toast: Toast | null;
  notify: (message: string, action?: "bag") => void;
  dismissToast: () => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  shopCategory: (category?: Filter) => void;
  freeShippingThreshold: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const BAG_KEY = "symmify.bag.v1";
const WISH_KEY = "symmify.wishlist.v1";
const ORDERS_KEY = "symmify.orders.v1";
const NEWSLETTER_KEY = "symmify.newsletter.v1";

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = readStored<BagLine[]>(BAG_KEY, []);
    return Array.isArray(stored)
      ? stored.filter((line) => products.some((p) => p.id === line.id) && line.qty > 0)
      : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = readStored<string[]>(WISH_KEY, []);
    return Array.isArray(stored) ? stored.filter((id) => products.some((p) => p.id === id)) : [];
  });
  const [orders, setOrders] = useState<SavedOrder[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = readStored<SavedOrder[]>(ORDERS_KEY, []);
    return Array.isArray(stored) ? stored.filter((order) => order && typeof order.id === "string" && Array.isArray(order.items)) : [];
  });
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = readStored<string[]>(NEWSLETTER_KEY, []);
    return Array.isArray(stored) ? stored.filter((email) => typeof email === "string") : [];
  });
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    } catch {
      /* storage unavailable */
    }
  }, [bag]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [wishlist]);

  useEffect(() => {
    try { window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch { /* storage unavailable */ }
  }, [orders]);

  useEffect(() => {
    try { window.localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(newsletterEmails)); } catch { /* storage unavailable */ }
  }, [newsletterEmails]);

  const isLocked = overlay !== null || quickView !== null;

  useEffect(() => {
    if (!isLocked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverlay(null);
        setQuickView(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isLocked]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const notify = useCallback((message: string, action?: "bag") => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const addToBag = useCallback<ShopContextValue["addToBag"]>((product, qty = 1, options) => {
    setBag((current) => {
      const found = current.find((line) => line.id === product.id);
      if (found) {
        return current.map((line) =>
          line.id === product.id ? { ...line, qty: Math.min(line.qty + qty, 12) } : line,
        );
      }
      return [...current, { id: product.id, qty: Math.min(qty, 12) }];
    });
    notify(`${product.name} added to your bag`, "bag");
    if (options?.openBag) setOverlay("cart");
  }, [notify]);

  const removeFromBag = useCallback((id: string) => {
    setBag((current) => current.filter((line) => line.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setBag((current) =>
      qty <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) => (line.id === id ? { ...line, qty: Math.min(qty, 12) } : line)),
    );
  }, []);

  const clearBag = useCallback(() => setBag([]), []);

  const placeOrder = useCallback((shipping: number, customer: SavedOrder["customer"]) => {
    const items = bag.flatMap((line) => {
      const product = products.find((item) => item.id === line.id);
      return product ? [{ id: product.id, name: product.name, image: product.image, qty: line.qty, unitPrice: product.price }] : [];
    });
    if (!items.length) return null;
    const order: SavedOrder = {
      id: `SYM-${Math.floor(100000 + Math.random() * 899999)}`,
      createdAt: new Date().toISOString(),
      items,
      subtotal: items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
      shipping,
      total: items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0) + shipping,
      customer,
    };
    setOrders((current) => [order, ...current].slice(0, 50));
    setBag([]);
    return order;
  }, [bag]);

  const subscribe = useCallback((email: string) => {
    const normalized = email.trim().toLowerCase();
    if (normalized) setNewsletterEmails((current) => current.includes(normalized) ? current : [...current, normalized]);
  }, []);

  const toggleWishlist = useCallback<ShopContextValue["toggleWishlist"]>(
    (product, options) => {
      const alreadySaved = wishlist.includes(product.id);
      setWishlist((current) =>
        current.includes(product.id)
          ? current.filter((id) => id !== product.id)
          : [...current, product.id],
      );
      notify(
        alreadySaved
          ? `${product.name} removed from your wishlist`
          : `${product.name} saved to your wishlist`,
      );
      if (!alreadySaved && options?.openWishlist) setOverlay("wishlist");
    },
    [notify, wishlist],
  );

  const wishlistSet = useMemo(() => new Set(wishlist), [wishlist]);

  const bagCount = useMemo(() => bag.reduce((total, line) => total + line.qty, 0), [bag]);

  const subtotal = useMemo(
    () =>
      bag.reduce((total, line) => {
        const product = products.find((p) => p.id === line.id);
        return total + (product ? product.price * line.qty : 0);
      }, 0),
    [bag],
  );

  const openOverlay = useCallback((next: Overlay) => {
    setQuickView(null);
    setOverlay(next);
  }, []);

  const closeOverlay = useCallback(() => setOverlay(null), []);

  const openQuickView = useCallback((product: Product) => {
    setOverlay(null);
    setQuickView(product);
  }, []);

  const closeQuickView = useCallback(() => setQuickView(null), []);

  const shopCategory = useCallback((category: Filter = "All") => {
    setFilter(category);
    setOverlay(null);
    setQuickView(null);
    window.setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  const value: ShopContextValue = {
    bag,
    bagCount,
    subtotal,
    addToBag,
    removeFromBag,
    updateQty,
    clearBag,
    orders,
    placeOrder,
    newsletterEmails,
    subscribe,
    wishlist,
    toggleWishlist,
    isWishlisted: (id: string) => wishlistSet.has(id),
    overlay,
    openOverlay,
    closeOverlay,
    quickView,
    openQuickView,
    closeQuickView,
    toast,
    notify,
    dismissToast,
    filter,
    setFilter,
    shopCategory,
    freeShippingThreshold: 150,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside a ShopProvider");
  return context;
}

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

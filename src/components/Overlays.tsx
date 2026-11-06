import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { categories, products, type Product } from "../data";
import { money, useShop } from "../store";
import { cn } from "../utils/cn";
import {
  ArrowRight,
  Bag,
  Check,
  ChevronDown,
  Close,
  Eye,
  Heart,
  Lock,
  Minus,
  Plus,
  Search,
  Shield,
  Sparkle,
  Star,
  Trash,
  Truck,
} from "./Icons";

/* ---------------------------------- shared --------------------------------- */

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close overlay"
      className="animate-fade-in absolute inset-0 cursor-default bg-navy/45 backdrop-blur-[2px]"
    />
  );
}

function DrawerShell({
  title,
  eyebrow,
  onClose,
  children,
  footer,
}: {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={title}>
      <Backdrop onClick={onClose} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="eyebrow text-sapphire">{eyebrow}</p>
            <h2 className="mt-1 font-serif text-[24px] leading-none text-navy">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy transition hover:bg-mist hover:text-sapphire"
            aria-label="Close"
          >
            <Close className="h-4 w-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="border-t border-line bg-white px-5 pb-6 pt-4 sm:px-6">{footer}</div>}
      </aside>
    </div>
  );
}

function Quantity({
  qty,
  onChange,
  compact = false,
}: {
  qty: number;
  onChange: (qty: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-line-dark/70 bg-white",
        compact ? "h-8" : "h-10",
      )}
    >
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
        className={cn(
          "grid place-items-center text-navy transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-35",
          compact ? "h-8 w-7" : "h-10 w-9",
        )}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className={cn("text-center text-[11px] tabular-nums text-navy", compact ? "w-6" : "w-8")}>
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 12}
        aria-label="Increase quantity"
        className={cn(
          "grid place-items-center text-navy transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-35",
          compact ? "h-8 w-7" : "h-10 w-9",
        )}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  copy,
  primary,
  secondary,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-7 py-12 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-line bg-mist text-sapphire">
        {icon}
      </span>
      <h3 className="mt-5 font-serif text-[27px] leading-tight text-navy">{title}</h3>
      <p className="mt-2 max-w-[17rem] text-[12px] font-light leading-relaxed text-stone">{copy}</p>
      <button
        type="button"
        onClick={primary.onClick}
        className="mt-6 inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-sapphire"
      >
        {primary.label}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
      {secondary && (
        <button
          type="button"
          onClick={secondary.onClick}
          className="mt-3 text-[9.5px] font-medium uppercase tracking-[0.16em] text-sapphire underline underline-offset-4"
        >
          {secondary.label}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- cart ---------------------------------- */

export function CartDrawer() {
  const {
    overlay,
    closeOverlay,
    bag,
    bagCount,
    subtotal,
    updateQty,
    removeFromBag,
    clearBag,
    addToBag,
    openQuickView,
    shopCategory,
    freeShippingThreshold,
    placeOrder,
    orders,
  } = useShop();
  const [placed, setPlaced] = useState<ReturnType<typeof placeOrder>>(null);
  const [showOrders, setShowOrders] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "", postalCode: "", country: "" });

  useEffect(() => {
    if (overlay !== "cart") { setPlaced(null); setShowOrders(false); setCheckout(false); }
  }, [overlay]);

  if (overlay !== "cart") return null;

  const shipping = subtotal >= freeShippingThreshold ? 0 : 12;
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const lines = bag
    .map((line) => ({ line, product: products.find((product) => product.id === line.id) }))
    .filter((entry): entry is { line: typeof bag[number]; product: Product } => Boolean(entry.product));
  const recommendation = products.find((product) => !bag.some((line) => line.id === product.id));

  const close = () => {
    closeOverlay();
    setPlaced(null);
  };

  const beginCheckout = () => {
    if (lines.length === 0) return;
    setCheckout(true);
  };

  const submitCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = placeOrder(shipping, customer);
    if (order) { setPlaced(order); setCheckout(false); }
  };

  return (
    <DrawerShell
      title={placed ? "Your order" : checkout ? "Delivery details" : showOrders ? "Order history" : "Your bag"}
      eyebrow={placed ? "With pleasure" : checkout ? "Where should we send it?" : showOrders ? `${orders.length} saved ${orders.length === 1 ? "order" : "orders"}` : `${bagCount} ${bagCount === 1 ? "piece" : "pieces"} selected`}
      onClose={close}
      footer={
        placed ? (
          <button
            type="button"
            onClick={close}
            className="w-full bg-navy px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-sapphire"
          >
            Continue exploring
          </button>
        ) : checkout ? (
          <div className="flex gap-3"><button type="button" onClick={() => setCheckout(false)} className="flex-1 border border-line py-3 text-[9px] font-medium uppercase tracking-[0.16em] text-navy">Back to bag</button><button form="checkout-form" type="submit" className="flex-[2] bg-navy py-3 text-[9px] font-medium uppercase tracking-[0.16em] text-white hover:bg-sapphire">Place order · {money(subtotal + shipping)}</button></div>
        ) : lines.length > 0 ? (
          <div>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between text-stone">
                <span>Subtotal</span>
                <span className="font-medium text-navy">{money(subtotal)}.00</span>
              </div>
              <div className="flex items-center justify-between text-stone">
                <span>Delivery</span>
                <span className={shipping === 0 ? "text-sapphire" : "text-navy"}>
                  {shipping === 0 ? "Complimentary" : `${money(shipping)}.00`}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-2.5">
                <span className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-navy">Total</span>
                <span className="font-serif text-[23px] leading-none text-navy">
                  {money(subtotal + shipping)}
                  <span className="font-sans text-[11px] text-stone">.00</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={beginCheckout}
              className="group mt-4 flex w-full items-center justify-center gap-2.5 bg-navy px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-sapphire"
            >
              <Lock className="h-3.5 w-3.5" />
              Secure checkout
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[9px] uppercase tracking-[0.1em] text-stone">
              <Shield className="h-3 w-3" /> 256-bit encrypted · Card, Apple Pay & PayPal
            </p>
          </div>
        ) : undefined
      }
    >
      {placed ? (
        <div className="flex min-h-[500px] flex-col items-center justify-center px-7 py-12 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-sky text-sapphire">
            <Check className="h-7 w-7" />
          </span>
          <p className="eyebrow mt-5 text-sapphire">Order {placed.id}</p>
          <h3 className="mt-2 font-serif text-[29px] leading-tight text-navy">Your pieces are reserved.</h3>
          <p className="mt-2 max-w-[19rem] text-[12px] font-light leading-relaxed text-stone">
            {placed.items.reduce((sum, item) => sum + item.qty, 0)} {placed.items.reduce((sum, item) => sum + item.qty, 0) === 1 ? "piece" : "pieces"} · {money(placed.total)}. A confirmation
            would normally reach your inbox within a few minutes.
          </p>
          <div className="mt-5 w-full rounded-sm border border-line bg-mist p-4 text-left">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-navy">
              <Sparkle className="h-3.5 w-3.5 text-sapphire" /> The blue box is on us
            </p>
            <p className="mt-1.5 text-[10.5px] font-light leading-relaxed text-stone">
              Each piece is hand-checked and wrapped in our signature keepsake box before it leaves the
              atelier.
            </p>
          </div>
          <p className="mt-4 text-[9px] uppercase leading-relaxed tracking-[0.12em] text-stone/70">
            Preview checkout · no payment has been taken
          </p>
        </div>
      ) : checkout ? (
        <form id="checkout-form" onSubmit={submitCheckout} className="space-y-4 px-5 py-5 sm:px-6">
          <p className="text-[11px] leading-relaxed text-stone">Enter your contact and delivery details. Your order will be saved on this device.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {([ ["name", "Full name", "text"], ["email", "Email address", "email"], ["phone", "Phone number", "tel"], ["address", "Street address", "text"], ["city", "City", "text"], ["postalCode", "Postal code", "text"], ["country", "Country", "text"] ] as const).map(([key, label, type]) => <label key={key} className={key === "address" ? "sm:col-span-2" : ""}><span className="mb-1 block text-[9px] font-medium uppercase tracking-[0.13em] text-navy">{label}</span><input required autoComplete={key === "postalCode" ? "postal-code" : key} type={type} value={customer[key]} onChange={(event) => setCustomer((current) => ({ ...current, [key]: event.target.value }))} className="w-full border border-line-dark/70 bg-white px-3 py-2.5 text-[12px] text-navy outline-none transition focus:border-sapphire" /></label>)}
          </div>
          <div className="border-t border-line pt-3 text-[11px] text-stone"><div className="flex justify-between"><span>{bagCount} items</span><span>{money(subtotal)}.00</span></div><div className="mt-1 flex justify-between"><span>Delivery</span><span>{shipping ? `${money(shipping)}.00` : "Complimentary"}</span></div><div className="mt-2 flex justify-between font-medium text-navy"><span>Total</span><span>{money(subtotal + shipping)}.00</span></div></div>
          <p className="text-center text-[9px] uppercase tracking-[0.1em] text-stone">Demo checkout · no payment is taken</p>
        </form>
      ) : showOrders ? (
        <div className="px-5 py-4">{orders.length ? <div className="divide-y divide-line">{orders.map((order) => <article key={order.id} className="py-4"><div className="flex items-start gap-3">{order.items[0] && <img src={order.items[0].image} alt="" className="h-16 w-14 object-cover" />}<div className="min-w-0 flex-1"><p className="text-[9px] uppercase tracking-[0.14em] text-sapphire">{order.id}</p><p className="mt-1 font-serif text-lg text-navy">{money(order.total)}.00</p><p className="mt-1 text-[10px] leading-relaxed text-stone">{order.items.map((item) => `${item.name} × ${item.qty}`).join(" · ")}</p><p className="mt-1 text-[9px] text-stone">{new Date(order.createdAt).toLocaleString()}</p></div></div></article>)}</div> : <p className="py-12 text-center text-[12px] text-stone">Your placed orders will appear here.</p>}<button type="button" onClick={() => setShowOrders(false)} className="mt-3 text-[9px] font-medium uppercase tracking-[0.15em] text-sapphire">Back to bag</button></div>
      ) : lines.length === 0 ? (
        <EmptyState
          icon={<Bag className="h-7 w-7" />}
          title="Your bag is waiting."
          copy="Discover quietly beautiful pieces, made to be worn every day and kept for a lifetime."
          primary={{ label: "Discover the collection", onClick: () => shopCategory("All") }}
          secondary={{ label: `Order history (${orders.length})`, onClick: () => setShowOrders(true) }}
        />
      ) : (
        <div>
          <div className="flex justify-end px-5 pt-3 sm:px-6"><button type="button" onClick={() => setShowOrders(true)} className="text-[9px] font-medium uppercase tracking-[0.14em] text-sapphire">Order history ({orders.length})</button></div>
          <div className="border-b border-line bg-mist px-5 py-3.5 sm:px-6">
            <p className="flex items-center gap-2 text-[10.5px] font-light text-navy">
              <Truck className="h-4 w-4 shrink-0 text-sapphire" />
              {remaining === 0
                ? "Your delivery is complimentary — beautifully wrapped."
                : `You are ${money(remaining)} away from complimentary delivery.`}
            </p>
            <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-line-dark/60">
              <div
                className="h-full rounded-full bg-sapphire transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line px-5 sm:px-6">
            {lines.map(({ line, product }) => (
              <li key={product.id} className="flex gap-3.5 py-4">
                <button
                  type="button"
                  onClick={() => openQuickView(product)}
                  className="h-[98px] w-[80px] shrink-0 overflow-hidden rounded-[2px] bg-mist"
                  aria-label={product.name}
                >
                  <img src={product.image} alt={product.imageAlt} className="h-full w-full object-cover" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-sapphire">
                        {product.category}
                      </p>
                      <p className="mt-1 truncate font-serif text-[18px] leading-tight text-navy">
                        {product.name}
                      </p>
                      <p className="mt-0.5 truncate text-[10.5px] font-light text-stone">{product.metal}</p>
                    </div>
                    <p className="shrink-0 text-[12px] font-medium text-navy">
                      {money(product.price * line.qty)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <Quantity qty={line.qty} onChange={(qty) => updateQty(product.id, qty)} compact />
                    <button
                      type="button"
                      onClick={() => removeFromBag(product.id)}
                      className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-stone transition hover:text-sapphire"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {recommendation && (
            <div className="mx-5 mt-1 border-t border-line py-4 sm:mx-6">
              <p className="eyebrow text-sapphire">Complete the ritual</p>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="h-14 w-12 shrink-0 overflow-hidden rounded-[2px] bg-mist">
                  <img src={recommendation.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[16px] leading-tight text-navy">{recommendation.name}</p>
                  <p className="mt-0.5 text-[10px] text-stone">{money(recommendation.price)}.00</p>
                </div>
                <button
                  type="button"
                  onClick={() => addToBag(recommendation)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line text-navy transition hover:border-sapphire hover:text-sapphire"
                  aria-label={`Add ${recommendation.name} to bag`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          <p className="px-5 pb-4 text-[9.5px] font-light leading-relaxed text-stone/80 sm:px-6">
            Complimentary gift wrapping included. Taxes and duties calculated at checkout.
          </p>
        </div>
      )}
    </DrawerShell>
  );
}

/* -------------------------------- wishlist -------------------------------- */

export function WishlistDrawer() {
  const { overlay, closeOverlay, wishlist, toggleWishlist, addToBag, shopCategory } = useShop();
  if (overlay !== "wishlist") return null;

  const saved = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <DrawerShell
      title="Your wishlist"
      eyebrow={`${saved.length} ${saved.length === 1 ? "piece" : "pieces"} saved`}
      onClose={closeOverlay}
      footer={
        saved.length > 0 ? (
          <div>
            <button
              type="button"
              onClick={() => shopCategory("All")}
              className="w-full border border-navy px-6 py-3.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-white"
            >
              Continue exploring
            </button>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.1em] text-stone">
              <Heart className="h-3 w-3" /> Saved on this device
            </p>
          </div>
        ) : undefined
      }
    >
      {saved.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-7 w-7" />}
          title="Nothing saved yet."
          copy="Tap the heart on any piece to keep it here while you consider it."
          primary={{ label: "Find your forever", onClick: () => shopCategory("All") }}
        />
      ) : (
        <ul className="divide-y divide-line px-5 sm:px-6">
          {saved.map((product) => (
            <li key={product.id} className="flex gap-3.5 py-4">
              <div className="h-[104px] w-[84px] shrink-0 overflow-hidden rounded-[2px] bg-mist">
                <img src={product.image} alt={product.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-sapphire">
                      {product.category}
                    </p>
                    <p className="mt-1 truncate font-serif text-[18px] leading-tight text-navy">{product.name}</p>
                    <p className="mt-0.5 text-[10.5px] font-light text-stone">{product.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="grid h-7 w-7 place-items-center rounded-full text-sapphire transition hover:bg-mist"
                  >
                    <Close className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1.5 text-[12px] font-medium text-navy">{money(product.price)}.00</p>
                <button
                  type="button"
                  onClick={() => addToBag(product)}
                  className="mt-auto flex w-fit items-center gap-1.5 border border-navy px-3 py-2 text-[8.5px] font-medium uppercase tracking-[0.14em] text-navy transition hover:bg-navy hover:text-white"
                >
                  <Bag className="h-3 w-3" /> Add to bag
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DrawerShell>
  );
}

/* --------------------------------- search --------------------------------- */

export function SearchPanel() {
  const { overlay, closeOverlay, openQuickView, addToBag, shopCategory } = useShop();
  const [query, setQuery] = useState("");
  const [recent] = useState<string[]>(["Sapphire", "Pearl", "Bangles", "Sarees"]);

  useEffect(() => {
    if (overlay !== "search") setQuery("");
  }, [overlay]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products.slice(0, 3);
    return products
      .filter((product) =>
        [product.name, product.subtitle, product.category, product.collection, product.stone, product.description]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [query]);

  if (overlay !== "search") return null;
  const trimmed = query.trim();

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Search">
      <Backdrop onClick={closeOverlay} />
      <div className="animate-fade-in relative mx-auto max-h-[92vh] w-full overflow-y-auto bg-white shadow-2xl sm:mt-10 sm:max-w-[820px]">
        <div className="border-b border-line px-5 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-sapphire">Search Symmify</p>
            <button
              type="button"
              onClick={closeOverlay}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-navy transition hover:bg-mist"
              aria-label="Close search"
            >
              <Close className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3 border-b border-navy/25 pb-2">
            <Search className="h-5 w-5 shrink-0 text-sapphire" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sapphires, sarees, gifts…"
              aria-label="Search products"
              autoFocus
              className="w-full bg-transparent font-serif text-[24px] font-light text-navy placeholder:font-serif placeholder:text-stone/50 focus:outline-none sm:text-[30px]"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[8.5px] uppercase tracking-[0.18em] text-stone">Popular</span>
            {recent.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="border border-line px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] text-stone transition hover:border-sapphire hover:text-sapphire"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-navy">
              {trimmed ? `${results.length} results for “${trimmed}”` : "Trending now"}
            </p>
            <button
              type="button"
              onClick={() => shopCategory("All")}
              className="text-[9px] uppercase tracking-[0.14em] text-sapphire underline underline-offset-4"
            >
              View all
            </button>
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-sm border border-dashed border-line-dark bg-mist px-6 py-10 text-center">
              <p className="font-serif text-[24px] text-navy">No pieces found.</p>
              <p className="mt-1.5 text-[11.5px] font-light text-stone">
                Try “necklace”, “sapphire” or “sarees” — or explore the full collection.
              </p>
              <button
                type="button"
                onClick={() => shopCategory("All")}
                className="mt-4 bg-navy px-5 py-3 text-[9px] uppercase tracking-[0.16em] text-white"
              >
                Browse all pieces
              </button>
            </div>
          ) : (
            <ul className="mt-3.5 divide-y divide-line">
              {results.map((product) => (
                <li key={product.id} className="flex items-center gap-3.5 py-3">
                  <button
                    type="button"
                    onClick={() => openQuickView(product)}
                    className="h-16 w-14 shrink-0 overflow-hidden rounded-[2px] bg-mist"
                    aria-label={`View ${product.name}`}
                  >
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openQuickView(product)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="text-[8px] uppercase tracking-[0.16em] text-sapphire">{product.category}</p>
                    <p className="mt-0.5 truncate font-serif text-[18px] leading-tight text-navy">{product.name}</p>
                    <p className="mt-0.5 truncate text-[10.5px] font-light text-stone">{product.subtitle}</p>
                  </button>
                  <p className="shrink-0 text-[11.5px] font-medium text-navy">{money(product.price)}</p>
                  <button
                    type="button"
                    onClick={() => addToBag(product)}
                    aria-label={`Add ${product.name} to bag`}
                    className="grid h-8 w-8 shrink-0 place-items-center border border-line text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!trimmed && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => shopCategory(category.name)}
                  className="flex items-center gap-2 border border-line bg-mist px-2.5 py-2 text-left transition hover:border-sapphire/40"
                >
                  <img src={category.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-navy">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-mist px-5 py-3 sm:px-8">
          <p className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-stone">
            <Sparkle className="h-3.5 w-3.5 text-sapphire" /> Need help? symmify@gmail.com
          </p>
          <span className="hidden text-[9px] uppercase tracking-[0.12em] text-stone sm:block">
            Press esc to close
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- quick view ------------------------------- */

const variants: Record<string, string[]> = {
  Rings: ["US 5", "US 6", "US 7", "US 8"],
  Bangles: ["Small", "Medium", "Large"],
  Sarees: ["With blouse piece", "Saree only"],
  Necklaces: ["40 cm", "45 cm", "50 cm"],
};

export function QuickView() {
  const { quickView, closeQuickView, addToBag, toggleWishlist, isWishlisted, shopCategory, openOverlay } =
    useShop();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string>("");
  const product = quickView;

  useEffect(() => {
    setQty(1);
    setVariant(product ? (variants[product.category]?.[0] ?? "") : "");
  }, [product]);

  if (!product) return null;
  const saved = isWishlisted(product.id);
  const options = variants[product.category] ?? [];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={product.name}>
      <Backdrop onClick={closeQuickView} />
      <div className="animate-fade-in relative max-h-[100dvh] w-full max-w-[980px] overflow-y-auto bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[3px]">
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-white/90 text-navy shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-sapphire"
          aria-label="Close product details"
        >
          <Close className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-[46%_54%]">
          <div className="relative bg-mist">
            <div className="relative aspect-[4/5] w-full overflow-hidden md:h-full md:aspect-auto">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-navy backdrop-blur">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-4 right-4 hidden items-center justify-center gap-2 bg-white/85 py-2.5 text-[8.5px] font-medium uppercase tracking-[0.16em] text-navy backdrop-blur-md sm:flex">
                <Sparkle className="h-3.5 w-3.5 text-sapphire" /> Hand-finished in our Jaipur atelier
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="eyebrow text-sapphire">
              {product.category} · {product.collection}
            </p>
            <h2 className="mt-2 font-serif text-[30px] leading-[1.05] text-navy sm:text-[37px]">{product.name}</h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="flex gap-0.5 text-champagne" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3 w-3" filled={index < Math.round(product.rating)} />
                  ))}
                </span>
                <span className="ml-1 text-[10px] tracking-[0.06em] text-stone">
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </span>
              </div>
              <span className="h-3 w-px bg-line-dark" aria-hidden="true" />
              <span className="text-[9px] uppercase tracking-[0.14em] text-sapphire">In stock · ships in 1–2 days</span>
            </div>

            <div className="mt-3.5 flex items-baseline gap-2.5">
              <span className="font-serif text-[27px] leading-none text-navy">
                {money(product.price)}
                <span className="font-sans text-[12px] text-stone">.00</span>
              </span>
              {product.compareAt && (
                <span className="text-[12px] text-stone/60 line-through">{money(product.compareAt)}.00</span>
              )}
              {product.compareAt && (
                <span className="bg-sky px-2 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-sapphire">
                  Save {money(product.compareAt - product.price)}
                </span>
              )}
            </div>

            <p className="mt-3.5 border-t border-line pt-3.5 text-[12px] font-light leading-[1.85] text-stone">
              {product.description}
            </p>

            <dl className="mt-4 grid grid-cols-2 gap-2 border-y border-line py-3">
              <div>
                <dt className="text-[8px] uppercase tracking-[0.16em] text-stone">Material</dt>
                <dd className="mt-0.5 text-[11px] font-medium text-navy">{product.metal}</dd>
              </div>
              <div>
                <dt className="text-[8px] uppercase tracking-[0.16em] text-stone">Stone</dt>
                <dd className="mt-0.5 text-[11px] font-medium text-navy">{product.stone}</dd>
              </div>
            </dl>

            {options.length > 0 && (
              <div className="mt-3.5">
                <p className="text-[8.5px] font-medium uppercase tracking-[0.16em] text-navy">
                  {product.category === "Sarees" ? "Finish" : "Choose a size"}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVariant(option)}
                      className={cn(
                        "border px-3 py-2 text-[9.5px] uppercase tracking-[0.08em] transition",
                        variant === option
                          ? "border-navy bg-navy text-white"
                          : "border-line-dark/70 text-stone hover:border-sapphire hover:text-sapphire",
                      )}
                      aria-pressed={variant === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-stretch gap-2">
              <Quantity qty={qty} onChange={setQty} />
              <button
                type="button"
                onClick={() => {
                  addToBag(product, qty);
                  closeQuickView();
                }}
                className="group flex flex-1 items-center justify-center gap-2 bg-navy px-4 py-3 text-[9.5px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-sapphire"
              >
                <Bag className="h-4 w-4" /> Add to bag · {money(product.price * qty)}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={saved}
                className={cn(
                  "grid w-11 shrink-0 place-items-center border transition",
                  saved
                    ? "border-sapphire bg-sky text-sapphire"
                    : "border-line-dark/70 text-navy hover:border-sapphire hover:text-sapphire",
                )}
              >
                <Heart filled={saved} className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[8.5px] uppercase tracking-[0.1em] text-stone">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-sapphire" /> Free over $150
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-sapphire" /> 30-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkle className="h-3.5 w-3.5 text-sapphire" /> Gift wrapped
              </span>
            </div>

            <div className="mt-4 divide-y divide-line border-t border-line">
              <details open className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-navy marker:content-none">
                  Details & dimensions
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-3 space-y-1.5">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-[10.5px] font-light leading-relaxed text-stone">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-sapphire" /> {detail}
                    </li>
                  ))}
                </ul>
              </details>
              <details className="group/del">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-[9.5px] font-medium uppercase tracking-[0.14em] text-navy marker:content-none">
                  Care & delivery
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open/del:rotate-180" />
                </summary>
                <p className="pb-3 text-[10.5px] font-light leading-relaxed text-stone">
                  Delivered in 1–2 working days within the UK and 3–5 days internationally. Keep away
                  from perfume and store in the enclosed pouch. Complimentary annual cleaning at our
                  atelier.
                </p>
              </details>
            </div>

            <button
              type="button"
              onClick={() => shopCategory(product.category)}
              className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-sapphire"
            >
              More {product.category.toLowerCase()} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="hidden items-center justify-between border-t border-line bg-mist px-8 py-3 sm:flex">
          <p className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-stone">
            <Eye className="h-3.5 w-3.5" /> Discovered {product.reviews} times this month
          </p>
          <button
            type="button"
            onClick={() => {
              closeQuickView();
              openOverlay("wishlist");
            }}
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-navy transition hover:text-sapphire"
          >
            <Heart className="h-3.5 w-3.5" /> View wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- toast --------------------------------- */

export function Toast() {
  const { toast, dismissToast, openOverlay } = useShop();
  if (!toast) return null;

  return (
    <div
      className="animate-toast fixed bottom-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 border border-white/15 bg-navy px-4 py-3.5 text-white shadow-[0_25px_60px_-20px_rgba(9,43,74,0.7)]">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sky">
          <Check className="h-3.5 w-3.5" />
        </span>
        <p className="min-w-0 flex-1 text-[11.5px] font-light leading-snug">{toast.message}</p>
        {toast.action === "bag" && (
          <button
            type="button"
            onClick={() => {
              dismissToast();
              openOverlay("cart");
            }}
            className="shrink-0 border-b border-white/40 pb-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-white"
          >
            View bag
          </button>
        )}
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-sky/70 transition hover:bg-white/10 hover:text-white"
        >
          <Close className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

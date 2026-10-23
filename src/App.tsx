import { ShopProvider } from "./store";
import { Header } from "./components/Header";
import { Hero, PressStrip } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { Atelier, EditorialBand, Marquee, Testimonials } from "./components/Story";
import { Gallery, Journal } from "./components/Journal";
import { Newsletter, Footer } from "./components/Footer";
import { CartDrawer, QuickView, SearchPanel, Toast, WishlistDrawer } from "./components/Overlays";

function Storefront() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:bg-navy focus:px-4 focus:py-2 focus:text-xs focus:text-white"
      >
        Skip to shop
      </a>
      <Header />
      <main>
        <Hero />
        <PressStrip />
        <Categories />
        <Products />
        <Marquee />
        <EditorialBand />
        <Atelier />
        <Testimonials />
        <Journal />
        <Gallery />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <SearchPanel />
      <QuickView />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Storefront />
    </ShopProvider>
  );
}

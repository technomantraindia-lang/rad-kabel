import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import logoImg from "../assets/rad-kabel-logo.png";

/** Add your file as `public/brochure.pdf` */
const BROCHURE_URL = "/brochure.pdf";

const PRODUCT_LINKS = [
  { label: "RAD ZERO (E-BEAM)", href: "/products/rad-zero" },
  { label: "Multi Core Control Cable", href: "/products/multi-core-control-cable" },
  { label: "All Products", href: "/#products" },
];

const NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "PRODUCTS", href: "/products/rad-zero", hasDropdown: true },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "INFRASTRUCTURE", href: "/infrastructure" },
  { label: "APPLICATIONS", href: "/applications" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "DEALER NETWORK", href: "/dealer-network" },
  { label: "ELECTRICIAN PROGRAM", href: "/electrician-program" },
  { label: "CONTACT US", href: "/#contact" },
];

function isNavActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/about-us") return pathname === "/about-us";
  if (href === "/technology") return pathname === "/technology";
  if (href === "/infrastructure") return pathname === "/infrastructure";
  if (href === "/applications") return pathname === "/applications";
  if (href === "/certifications") return pathname === "/certifications";
  if (href === "/dealer-network") return pathname === "/dealer-network";
  if (href === "/electrician-program") return pathname === "/electrician-program";
  if (href.startsWith("/products")) return pathname.startsWith("/products");
  return false;
}

function NavAnchor({ href, className, children, onClick }) {
  const isInternalRoute = href.startsWith("/") && !href.includes("#");

  if (isInternalRoute) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

const navLinkInactive =
  "font-heading flex min-h-[44px] items-center justify-center whitespace-nowrap px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white antialiased transition-colors duration-150 lg:px-2 lg:text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-sm border-b-[3px] border-transparent hover:border-transparent hover:text-[#e50914]";
const navLinkProducts =
  "font-heading flex min-h-[44px] flex-nowrap items-center justify-center gap-1 px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white antialiased transition-colors duration-150 lg:px-2 lg:text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-sm border-b-[3px] border-transparent group-hover:text-[#e50914]";
const navLinkActive =
  "font-heading flex min-h-[44px] items-center justify-center whitespace-nowrap px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white antialiased lg:px-2 lg:text-[11px] xl:px-2.5 xl:text-xs 2xl:px-3 2xl:text-sm border-b-[3px] border-[#e50914]";

export default function Header() {
  const location = useLocation();
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Keep hero padding + sticky sections aligned with real header height. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty("--site-header-h", `${el.offsetHeight}px`);
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header fixed inset-x-0 top-0 z-[200] bg-black font-sans text-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.85)]" : "shadow-[0_1px_0_rgba(255,255,255,0.06)]"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="w-full">
        {/* Top row — full width */}
        <div className="flex flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-3.5 xl:px-12 2xl:px-16">
          <Link to="/" className="flex w-fit shrink-0 items-center">
            <img
              src={logoImg}
              alt="RAD Kabel"
              className="block h-[52px] w-auto max-w-[260px] object-contain object-left sm:h-[58px] sm:max-w-[300px] lg:h-[64px] lg:max-w-[340px] xl:h-[72px] xl:max-w-[380px] 2xl:h-[76px] 2xl:max-w-[400px]"
            />
          </Link>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-3 lg:w-auto lg:flex-nowrap lg:gap-x-3">
            <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
              <a
                href={BROCHURE_URL}
                download
                onClick={() => setMobileOpen(false)}
                className="au-header-cta inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-md border border-[#e50914] bg-[#e50914] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#c40812] sm:w-auto lg:px-7 lg:py-3.5 lg:text-sm"
              >
                Download Brochure<span className="text-lg font-light leading-none">→</span>
              </a>

              <Link
                to="/electrician-program"
                onClick={() => setMobileOpen(false)}
                className="au-header-cta inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-md border border-white/80 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[#e50914] hover:bg-[#e50914] sm:w-auto lg:px-7 lg:py-3.5 lg:text-sm"
              >
                Partner With Us<span className="text-lg font-light leading-none">→</span>
              </Link>

              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-white/35 text-white transition hover:border-[#e50914] hover:text-[#e50914] lg:hidden"
                onClick={() => setMobileOpen((o) => !o)}
                aria-expanded={mobileOpen}
                aria-controls="rad-mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2a2a2a]" />

        {/* Bottom nav — wraps so all items stay visible on every screen width */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex w-full flex-wrap items-stretch justify-center gap-x-1 gap-y-0 px-2 py-2.5 lg:gap-x-2 lg:px-3 lg:py-3 xl:gap-x-3 xl:px-5 2xl:gap-x-4 2xl:px-8 2xl:py-3.5">
            {NAV.map((item) =>
              item.hasDropdown ? (
                <li key={item.label} className="group relative flex items-center justify-center">
                  <NavAnchor
                    href={item.href}
                    className={
                      isNavActive(location.pathname, item.href)
                        ? `${navLinkActive} au-nav-active`
                        : navLinkProducts
                    }
                  >
                    {item.label}
                    <ChevronDown size={16} strokeWidth={2.5} className="shrink-0 text-white transition-colors group-hover:text-[#e50914]" aria-hidden />
                  </NavAnchor>
                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-[220] w-[240px] -translate-x-1/2 pt-1 opacity-0 transition-opacity duration-150 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-[''] group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-sm border border-neutral-700 bg-[#070707] py-1.5 shadow-2xl">
                      {PRODUCT_LINKS.map((p) => (
                        <li key={p.label}>
                          <NavAnchor
                            href={p.href}
                            className="block px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/93 transition-colors hover:bg-white/[0.07] hover:text-[#e50914] xl:text-[11px]"
                          >
                            {p.label}
                          </NavAnchor>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="flex items-center justify-center">
                  <NavAnchor
                    href={item.href}
                    className={
                      isNavActive(location.pathname, item.href)
                        ? `${navLinkActive} au-nav-active`
                        : navLinkInactive
                    }
                  >
                    {item.label}
                  </NavAnchor>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <div className="h-px bg-[#222]" />
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[210] bg-black/55 lg:hidden"
            aria-label="Dismiss menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="rad-mobile-nav"
            role="navigation"
            aria-label="Mobile primary"
            className="fixed left-4 right-4 top-[calc(var(--site-header-h,8.5rem)+env(safe-area-inset-top))] z-[220] max-h-[calc(100dvh-var(--site-header-h,8.5rem)-1rem)] overflow-y-auto rounded-md border border-[#333] bg-black py-1.5 shadow-2xl lg:hidden"
          >
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/[0.05]"
                        onClick={() => setMobileProductsOpen((p) => !p)}
                        aria-expanded={mobileProductsOpen}
                      >
                        {item.label}
                        <ChevronDown size={16} className={mobileProductsOpen ? "rotate-180" : ""} aria-hidden />
                      </button>
                      {mobileProductsOpen ? (
                        <ul className="border-y border-neutral-800 bg-neutral-950/80">
                          {PRODUCT_LINKS.map((p) => (
                            <li key={p.label}>
                              <NavAnchor
                                href={p.href}
                                className="block py-2.5 pl-9 pr-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-300 hover:text-[#e50914]"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                              >
                                {p.label}
                              </NavAnchor>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <NavAnchor
                      href={item.href}
                      className="block px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-white/[0.05]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {isNavActive(location.pathname, item.href) ? (
                        <span className="border-b-[3px] border-[#e50914] text-[#f5f5f5]">{item.label}</span>
                      ) : (
                        <span className="text-white">{item.label}</span>
                      )}
                    </NavAnchor>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}

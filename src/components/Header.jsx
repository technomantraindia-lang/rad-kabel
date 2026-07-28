import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import logoImg from "../assets/rad-kabel-logo.png";
import { handleDownloadBrochure } from "../utils/downloadBrochure";

/** Add your file as `public/brochure.pdf` */
const BROCHURE_URL = "/brochure.pdf";

const PRODUCT_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "RAD ZERO (E-BEAM)", href: "/products/rad-zero" },
  { label: "RAD POWER", href: "/products/rad-power" },
  { label: "RAD FLEX", href: "/products/rad-flex" },
  { label: "RAD TAPE PRO", href: "/products/rad-tape-pro" },
];

const NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "PRODUCTS", href: "/products", hasDropdown: true },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "INFRASTRUCTURE", href: "/infrastructure" },
  { label: "APPLICATIONS", href: "/applications" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "DEALER NETWORK", href: "/dealer-network" },
  { label: "ELECTRICIAN PROGRAM", href: "/electrician-program" },
  { label: "CONTACT US", href: "/contact-us" },
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
  if (href === "/contact-us") return pathname === "/contact-us";
  if (href.startsWith("/products")) return pathname.startsWith("/products");
  return false;
}

function NavAnchor({ href, className, children, onClick }) {
  const isInternalRoute = href.startsWith("/");

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
  "font-heading flex min-h-[48px] items-center justify-center whitespace-nowrap px-2 py-2.5 text-center text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white antialiased transition-colors duration-150 lg:px-2 lg:text-[10px] xl:px-2.5 xl:text-[11px] 2xl:px-3 2xl:text-[12px] border-b-[3px] border-transparent hover:border-transparent hover:text-[#e01921]";
const navLinkProducts =
  "font-heading flex min-h-[48px] flex-nowrap items-center justify-center gap-1.5 px-2 py-2.5 text-center text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white antialiased transition-colors duration-150 lg:px-2 lg:text-[10px] xl:px-2.5 xl:text-[11px] 2xl:px-3 2xl:text-[12px] border-b-[3px] border-transparent group-hover:text-[#e01921]";
const navLinkActive =
  "font-heading flex min-h-[48px] items-center justify-center whitespace-nowrap px-2 py-2.5 text-center text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white antialiased lg:px-2 lg:text-[10px] xl:px-2.5 xl:text-[11px] 2xl:px-3 2xl:text-[12px] border-b-[3px] border-[#e01921]";

export default function Header() {
  const location = useLocation();
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  /** Professional scroll-aware header hiding and showing with threshold */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY <= 10;
      setIsAtTop(atTop);

      // Keep header visible when mobile menu is open or mouse is hovering header
      if (mobileOpen || isHovered) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (atTop) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) >= SCROLL_THRESHOLD) {
        if (diff > 0) {
          // Scroll DOWN -> Smoothly hide complete header
          setVisible(false);
        } else {
          // Scroll UP -> Smoothly show header
          setVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen, isHovered]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /** Red scroll progress indicator along the bottom of the header */
  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, next)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header
      ref={headerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`site-header fixed inset-x-0 top-0 z-[200] font-sans text-white transition-all duration-300 ease-in-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isAtTop
          ? "bg-black shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-black/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.85)] border-b border-white/10"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="w-full">
        {/* Top row — full width */}
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-5 lg:py-3 xl:px-6 2xl:px-8">
          <Link to="/" className="flex w-fit shrink-0 items-center">
            <img
              src={logoImg}
              alt="RAD Kabel"
              className="block h-[52px] w-auto max-w-[260px] object-contain object-left sm:h-[58px] sm:max-w-[300px] lg:h-[64px] lg:max-w-[340px] xl:h-[72px] xl:max-w-[380px] 2xl:h-[76px] 2xl:max-w-[400px]"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-2.5 lg:gap-3">
            <div className="hidden shrink-0 flex-wrap items-center gap-2.5 lg:flex lg:justify-end">
              <a
                href={BROCHURE_URL}
                download="RAD_KABEL_BROCHURE.pdf"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleDownloadBrochure(e);
                }}
                className="au-header-cta inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-md border border-[#e01921] bg-[#e01921] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#c0151c] sm:w-auto lg:px-6 lg:py-3 lg:text-[12px]"
              >
                Download Brochure<span className="text-lg font-light leading-none">→</span>
              </a>

              <Link
                to="/electrician-program"
                onClick={() => setMobileOpen(false)}
                className="au-header-cta inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-md border border-white/80 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[#e01921] hover:bg-[#e01921] sm:w-auto lg:px-6 lg:py-3 lg:text-[12px]"
              >
                Partner With Us<span className="text-lg font-light leading-none">→</span>
              </Link>
            </div>

            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-white/35 text-white transition hover:border-[#e01921] hover:text-[#e01921] lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="rad-mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2a2a2a]" />

        {/* Bottom nav — visible on desktop */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex w-full flex-nowrap items-stretch justify-center gap-x-0.5 gap-y-0 px-2 py-2.5 lg:gap-x-1 lg:px-3 lg:py-2.5 xl:gap-x-1.5 xl:px-5 2xl:gap-x-2 2xl:px-8 2xl:py-3">
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
                    <ChevronDown size={16} strokeWidth={2.5} className="shrink-0 text-white transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#e01921]" aria-hidden />
                  </NavAnchor>
                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-[300] w-[270px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="overflow-hidden rounded-xl border border-red-600/30 bg-[#090909]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                      {PRODUCT_LINKS.map((p) => (
                        <li key={p.label}>
                          <NavAnchor
                            href={p.href}
                            className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white/90 transition-all hover:bg-red-600/15 hover:text-red-500"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                            <span>{p.label}</span>
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
            <div className="grid gap-2 border-b border-white/10 px-4 py-4">
              <a
                href={BROCHURE_URL}
                download="RAD_KABEL_BROCHURE.pdf"
                onClick={(e) => {
                  setMobileOpen(false);
                  handleDownloadBrochure(e);
                }}
                className="au-header-cta inline-flex w-full items-center justify-center gap-2.5 rounded-md border border-[#e01921] bg-[#e01921] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#c0151c]"
              >
                Download Brochure<span className="text-lg font-light leading-none">→</span>
              </a>

              <Link
                to="/electrician-program"
                onClick={() => setMobileOpen(false)}
                className="au-header-cta inline-flex w-full items-center justify-center gap-2.5 rounded-md border border-white/80 bg-transparent px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[#e01921] hover:bg-[#e01921]"
              >
                Partner With Us<span className="text-lg font-light leading-none">→</span>
              </Link>
            </div>

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
                                className="block py-2.5 pl-9 pr-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-300 hover:text-[#e01921]"
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
                        <span className="border-b-[3px] border-[#e01921] text-[#f5f5f5]">{item.label}</span>
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

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[3px] overflow-hidden bg-white/10"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full origin-left bg-[#e01921] transition-[width] duration-100 ease-out motion-reduce:transition-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}

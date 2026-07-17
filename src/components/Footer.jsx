import isiCertifiedLogo from "../assets/isi-certified.png";
import imgRohs from "../assets/certifications/rohs.png";
import imgReach from "../assets/certifications/reach.png";
import imgCpr from "../assets/certifications/cpr.png";
import imgMadeInIndia from "../assets/certifications/made-in-india.png";
import footerLogo from "../assets/rad-footer-logo.png";

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Certifications", href: "/certifications" },
  { label: "Dealer Network", href: "#electrician-program" },
  { label: "Contact", href: "tel:18001237070" },
];

const PRODUCTS = [
  { label: "All Products", href: "/products" },
  { label: "RAD Zero", href: "/products/rad-zero" },
  { label: "RAD Power", href: "/products" },
  { label: "RAD Flex", href: "/products" },
  { label: "RAD Tape Pro", href: "/products" },
];

const SUPPORT = [
  { label: "Downloads", href: "/brochure.pdf" },
  { label: "FAQs", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

const CERT_MARKS = [
  { id: "isi", src: isiCertifiedLogo, alt: "ISI Certified", wide: false },
  { id: "rohs", src: imgRohs, alt: "RoHS Compliant", wide: false },
  { id: "reach", src: imgReach, alt: "REACH Compliant", wide: false },
  { id: "made-in-india", src: imgMadeInIndia, alt: "Make in India", wide: false },
  { id: "cpr", src: imgCpr, alt: "CPR Compliant", wide: false },
];

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] [word-spacing:0.1em] text-white sm:text-base">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="site-footer__link text-sm leading-snug [word-spacing:0.06em] text-zinc-200 transition-colors hover:text-[#e50914] focus-visible:text-[#e50914] focus-visible:outline-none sm:text-[0.95rem]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="site-footer__social inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-[#111] text-white/80 transition-all hover:border-[#e50914]/60 hover:text-white hover:shadow-[0_0_16px_rgba(229,9,20,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e50914] sm:size-10"
    >
      {children}
    </a>
  );
}

function CertLogoBadge({ src, alt }) {
  return (
    <div className="flex h-[58px] w-full items-center justify-center rounded border border-white/15 bg-black px-2 sm:h-16">
      <img
        src={src}
        alt={alt}
        className="h-11 w-auto max-w-[100px] object-contain brightness-0 invert opacity-95 sm:h-12 sm:max-w-[112px]"
        decoding="async"
      />
    </div>
  );
}

function IconFacebook() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6H17V4.1c-.4-.1-1.6-.2-3.1-.2-3 0-5.1 1.8-5.1 5.2v2.5H6v3.2h2.8V22h4.7z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.2 9H3.5v12.5h2.7V9zM4.8 3.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM20.5 21.5h-2.7v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.2h-2.7V9h2.6v1.7h.1c.4-.7 1.4-2 3.3-2 3.5 0 4.1 2.3 4.1 5.2v7.6z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.8a2.5 2.5 0 0 0 1.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15.5V8.5l6 3.5-6 3.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-30 mt-auto w-full shrink-0 border-t border-white/15 bg-black font-sans text-white"
    >
      <div className="w-full px-0 pt-10 pb-5 sm:pt-12 sm:pb-6 lg:pt-12 lg:pb-6">
        <div className="grid grid-cols-1 gap-7 px-6 sm:grid-cols-2 sm:gap-8 sm:px-10 lg:grid-cols-5 lg:gap-8 lg:px-14">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="inline-block">
              <img
                src={footerLogo}
                alt="RAD Kabel"
                className="h-11 w-auto max-w-[190px] object-contain object-left sm:h-12 sm:max-w-[220px] lg:h-[3.25rem] lg:max-w-[250px]"
                decoding="async"
              />
            </a>
            <div className="flex gap-2.5">
              <SocialIcon href="#" label="Facebook">
                <IconFacebook />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <IconInstagram />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <IconLinkedIn />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <IconYouTube />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Quick Links" links={QUICK_LINKS} />
          <FooterColumn title="Products" links={PRODUCTS} />
          <FooterColumn title="Support" links={SUPPORT} />

          {/* Certifications — 3 top, 2 bottom (reference) */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] [word-spacing:0.1em] text-white sm:text-base">Certifications</h3>
            <div className="max-w-[min(100%,360px)] sm:max-w-[360px]">
              <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
                <CertLogoBadge src={CERT_MARKS[0].src} alt={CERT_MARKS[0].alt} />
                <CertLogoBadge src={CERT_MARKS[1].src} alt={CERT_MARKS[1].alt} />
                <CertLogoBadge src={CERT_MARKS[2].src} alt={CERT_MARKS[2].alt} />

                <CertLogoBadge src={CERT_MARKS[3].src} alt={CERT_MARKS[3].alt} />
                <CertLogoBadge src={CERT_MARKS[4].src} alt={CERT_MARKS[4].alt} />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-white/10 px-6 pt-5 pb-1 text-center text-sm text-zinc-400 sm:px-10 sm:text-[0.95rem] lg:px-14">
          © {new Date().getFullYear()} RAD Kabel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

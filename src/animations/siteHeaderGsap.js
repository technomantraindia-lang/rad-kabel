import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "power3.out";

/**
 * Site header behavior matching About Us:
 * stays fixed at top (no slide-from-above), softens on scroll.
 */
export function setupSiteHeaderLikeAboutUs({
  className = "site-header--page-au",
  isMobile = false,
  reducedMotion = false,
} = {}) {
  const header = document.querySelector(".site-header");
  if (!header) return () => {};

  header.classList.add(className);
  gsap.set(header, { clearProps: "transform,opacity,y", opacity: 1, y: 0 });

  if (reducedMotion) {
    return () => {
      header.classList.remove(className);
      gsap.set(header, { clearProps: "all" });
    };
  }

  const topRow = header.querySelector(".w-full > .flex");
  const logo = header.querySelector("img[alt='RAD Kabel']");
  const navBar = header.querySelector("nav");

  const trigger = ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: () => {
      const y = window.scrollY;
      const t = Math.min(y / 140, 1);
      gsap.to(header, {
        duration: 0.35,
        ease: EASE_OUT,
        backgroundColor: `rgba(0,0,0,${0.72 + t * 0.22})`,
        backdropFilter: t > 0.05 ? "blur(12px)" : "blur(0px)",
        boxShadow: t > 0.05 ? "0 8px 32px rgba(0,0,0,0.75)" : "0 1px 0 rgba(255,255,255,0.06)",
        overwrite: "auto",
      });
      if (topRow && !isMobile) {
        gsap.to(topRow, {
          duration: 0.35,
          ease: EASE_OUT,
          paddingTop: `${14 - t * 4}px`,
          paddingBottom: `${14 - t * 4}px`,
          overwrite: "auto",
        });
      }
      if (logo && !isMobile) {
        gsap.to(logo, {
          duration: 0.35,
          ease: EASE_OUT,
          height: `${72 - t * 12}px`,
          overwrite: "auto",
        });
      }
      if (navBar && !isMobile) {
        gsap.to(navBar, {
          duration: 0.35,
          ease: EASE_OUT,
          paddingTop: `${14 - t * 6}px`,
          paddingBottom: `${14 - t * 6}px`,
          overwrite: "auto",
        });
      }
    },
  });

  return () => {
    trigger.kill();
    header.classList.remove(className);
    gsap.set(header, { clearProps: "all" });
    if (topRow) gsap.set(topRow, { clearProps: "paddingTop,paddingBottom" });
    if (logo) gsap.set(logo, { clearProps: "height" });
    if (navBar) gsap.set(navBar, { clearProps: "paddingTop,paddingBottom" });
  };
}

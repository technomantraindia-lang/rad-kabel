import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupSiteHeaderLikeAboutUs } from "./siteHeaderGsap.js";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
const ST_START = "top 82%";

function q(root, sel) {
  return root?.querySelector(sel) ?? null;
}

function qa(root, sel) {
  return gsap.utils.toArray(root?.querySelectorAll(sel) ?? []);
}

function resetVisible(targets) {
  gsap.set(targets, { clearProps: "all", opacity: 1, scale: 1, x: 0, y: 0 });
}

function setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur) {
  const section = q(root, ".rtp-hero");
  if (!section) return () => {};

  const bg = q(section, ".rtp-hero__bg img");
  const breadcrumb = q(section, ".rtp-breadcrumb");
  const titleLines = qa(section, ".rtp-hero__title-line");
  const accents = qa(section, ".rtp-accent");
  const desc = q(section, ".rtp-hero__desc");
  const actions = q(section, ".rtp-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, breadcrumb, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.08, opacity: 0.75, transformOrigin: "center right" });
  gsap.set(breadcrumb, { opacity: 0, y: -10 });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(bg, { scale: 1, opacity: 1, duration: 1.1 }, 0)
    .to(breadcrumb, { opacity: 1, y: 0, duration: 0.55 }, 0.15)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.22)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.45")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.5");

  if (accents.length) {
    gsap.fromTo(
      accents,
      { textShadow: "0 0 0 rgba(224, 25, 33, 0)" },
      {
        textShadow: "0 0 18px rgba(224, 25, 33, 0.5), 0 0 36px rgba(224, 25, 33, 0.2)",
        duration: 0.55,
        yoyo: true,
        repeat: 1,
        delay: 0.45,
        onComplete: () => gsap.set(accents, { clearProps: "textShadow" }),
      },
    );
  }

  if (disableParallax || !bg) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(bg, {
      x: relX * 10,
      y: relY * 8,
      duration: 0.45,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(bg, { x: 0, y: 0, duration: 0.5, ease: EASE, overwrite: "auto" });
  };

  section.addEventListener("mousemove", onMove);
  section.addEventListener("mouseleave", onLeave);

  return () => {
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
    gsap.set(bg, { clearProps: "x,y" });
  };
}

function setupProductCards(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".rtp-cards");
  if (!section) return;

  const header = q(section, ".rtp-cards__header");
  const cards = qa(section, ".rtp-cards__item");

  if (reducedMotion) {
    resetVisible([header, ...cards]);
    return;
  }

  gsap.set(header, { opacity: 0, y: moveY * 0.7 });
  gsap.set(cards, { opacity: 0, y: moveY, scale: 0.96 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(header, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.12,
      });
    },
  });
}

function setupChoose(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".rtp-choose");
  if (!section) return;

  const title = q(section, ".rtp-choose__title");
  const items = qa(section, ".rtp-choose__item");

  if (reducedMotion) {
    resetVisible([title, ...items]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY * 0.6 });
  gsap.set(items, { opacity: 0, y: moveY * 0.85, x: -12 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: dur,
        stagger: stagger * 0.9,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupCompare(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".rtp-compare");
  if (!section) return;

  const title = q(section, ".rtp-compare__title");
  const frame = q(section, ".rtp-compare__frame");
  const rows = qa(section, ".rtp-compare__table tbody tr");

  if (reducedMotion) {
    resetVisible([title, frame, ...rows]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY * 0.55 });
  gsap.set(frame, { opacity: 0, y: moveY * 0.4 });
  gsap.set(rows, { opacity: 0, x: -16 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(frame, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.08 });
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: dur * 0.85,
        stagger: stagger * 0.75,
        ease: EASE,
        delay: 0.2,
      });
    },
  });
}

function setupCta(root, reducedMotion, disableParallax, moveX, moveY, dur) {
  const section = q(root, ".rtp-cta");
  if (!section) return () => {};

  const bg = q(section, ".rtp-cta__bg img");
  const content = q(section, ".rtp-cta__content");
  const titleLines = qa(section, ".rtp-cta__title-line");
  const desc = q(section, ".rtp-cta__desc");
  const actions = q(section, ".rtp-cta__actions");

  if (reducedMotion) {
    resetVisible([bg, content, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.06, opacity: 0.8, transformOrigin: "right center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX * 0.7 });
  gsap.set(desc, { opacity: 0, y: moveY * 0.7 });
  gsap.set(actions, { opacity: 0, y: moveY * 0.7 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 78%",
    once: true,
    onEnter: () => {
      gsap.to(bg, { scale: 1, opacity: 1, duration: 1, ease: EASE });
      gsap.to(titleLines, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: 0.08,
        ease: EASE,
        delay: 0.1,
      });
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(actions, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.32 });
    },
  });

  if (disableParallax || !bg) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(bg, {
      x: relX * 8,
      y: relY * 6,
      duration: 0.45,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(bg, { x: 0, y: 0, duration: 0.5, ease: EASE, overwrite: "auto" });
  };

  section.addEventListener("mousemove", onMove);
  section.addEventListener("mouseleave", onLeave);

  return () => {
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
    gsap.set(bg, { clearProps: "x,y" });
  };
}

export function initProductsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("products-animated");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 18 : 32;
  const stagger = isMobile ? 0.07 : 0.12;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroCleanup = () => {};
  let ctaCleanup = () => {};
  let headerCleanup = () => {};

  const ctx = gsap.context(() => {
    headerCleanup = setupSiteHeaderLikeAboutUs({
      className: "site-header--products-page",
      isMobile,
      reducedMotion,
    });
    heroCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupProductCards(root, reducedMotion, moveY, stagger, dur);
    setupChoose(root, reducedMotion, moveY, stagger, dur);
    setupCompare(root, reducedMotion, moveY, stagger, dur);
    ctaCleanup = setupCta(root, reducedMotion, disableParallax, moveX, moveY, dur);
    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroCleanup();
    ctaCleanup();
    headerCleanup();
    ctx.revert();
    document.documentElement.classList.remove("products-animated");
  };
}

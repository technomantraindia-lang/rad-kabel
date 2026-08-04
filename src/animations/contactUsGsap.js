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
  const section = q(root, ".cu-hero");
  if (!section) return () => {};

  const bg = q(section, ".cu-hero__bg img");
  const breadcrumb = q(section, ".cu-breadcrumb");
  const titleLines = qa(section, ".cu-hero__title-line");
  const desc = q(section, ".cu-hero__desc");
  const actions = q(section, ".cu-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, breadcrumb, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.08, opacity: 0.75 });
  gsap.set(breadcrumb, { opacity: 0, y: -10 });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  gsap
    .timeline({ defaults: { ease: EASE } })
    .to(bg, { scale: 1, opacity: 1, duration: 1.1 }, 0)
    .to(breadcrumb, { opacity: 1, y: 0, duration: 0.5 }, 0.12)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.22)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.45")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.5");

  if (disableParallax || !bg) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(bg, { x: relX * 8, y: relY * 6, duration: 0.45, ease: EASE, overwrite: "auto" });
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

function setupTouch(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".cu-touch");
  if (!section) return;

  const formPanel = q(section, ".cu-form-panel");
  const fields = qa(section, ".cu-field, .cu-form__submit, .cu-form__secure");
  const channels = qa(section, ".cu-channel");

  if (reducedMotion) {
    resetVisible([formPanel, ...fields, ...channels]);
    return;
  }

  gsap.set(formPanel, { opacity: 0, x: -moveX * 0.5 });
  gsap.set(fields, { opacity: 0, y: 14 });
  gsap.set(channels, { opacity: 0, x: moveX * 0.45 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(formPanel, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(fields, {
        opacity: 1,
        y: 0,
        duration: dur * 0.85,
        stagger: stagger * 0.55,
        ease: EASE,
        delay: 0.12,
      });
      gsap.to(channels, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.15,
      });
    },
  });
}

function setupUtility(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".cu-utility");
  if (!section) return;

  const items = qa(section, ".cu-utility__item");
  if (reducedMotion) {
    resetVisible(items);
    return;
  }

  gsap.set(items, { opacity: 0, y: moveY * 0.45 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger: stagger * 0.7,
        ease: EASE,
      });
    },
  });
}

function setupNetwork(root, reducedMotion, moveX, moveY, dur) {
  const section = q(root, ".cu-network");
  if (!section) return;

  const map = q(section, ".cu-network__map");
  const copy = q(section, ".cu-network__copy");

  if (reducedMotion) {
    resetVisible([map, copy]);
    return;
  }

  gsap.set(map, { opacity: 0, x: -moveX * 0.55, scale: 0.97 });
  gsap.set(copy, { opacity: 0, x: moveX * 0.45 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(map, { opacity: 1, x: 0, scale: 1, duration: dur, ease: EASE });
      gsap.to(copy, { opacity: 1, x: 0, duration: dur, ease: EASE, delay: 0.12 });
    },
  });
}

export function initContactUsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("contact-us-animated");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 18 : 32;
  const stagger = isMobile ? 0.07 : 0.12;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroCleanup = () => {};
  let headerCleanup = () => {};

  const ctx = gsap.context(() => {
    headerCleanup = setupSiteHeaderLikeAboutUs({
      className: "site-header--contact-page",
      isMobile,
      reducedMotion,
    });
    heroCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupTouch(root, reducedMotion, moveX, moveY, stagger, dur);
    setupUtility(root, reducedMotion, moveY, stagger, dur);
    setupNetwork(root, reducedMotion, moveX, moveY, dur);
    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroCleanup();
    headerCleanup();
    ctx.revert();
    document.documentElement.classList.remove("contact-us-animated");
  };
}

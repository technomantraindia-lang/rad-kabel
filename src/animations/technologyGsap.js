import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "power3.out";
const EASE_EXPO = "expo.out";

function qa(root, sel) {
  return gsap.utils.toArray(root.querySelectorAll(sel));
}

function q(root, sel) {
  return root.querySelector(sel);
}

function setupButtonShine(selector) {
  qa(document, selector).forEach((btn) => {
    if (btn.querySelector(".tech-btn-shine")) return;
    const shine = document.createElement("span");
    shine.className = "tech-btn-shine";
    shine.setAttribute("aria-hidden", "true");
    btn.classList.add("tech-btn--shine");
    btn.appendChild(shine);
  });
}

function setupHero(root, reducedMotion) {
  const section = q(root, ".tech-hero");
  if (!section) return;

  const bg = q(section, ".tech-hero__bg");
  const energy = q(section, ".tech-hero__energy");
  const titleLines = qa(section, ".tech-hero__title-line");
  const desc = q(section, ".tech-hero__desc");
  const actions = q(section, ".tech-hero__actions");

  if (reducedMotion) {
    gsap.set([bg, energy, ...titleLines, desc, actions], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(bg, { scale: 1.08, x: 48, opacity: 0, transformOrigin: "center right" });
  gsap.set(energy, { opacity: 0.35, scale: 1.05 });
  gsap.set(titleLines, { opacity: 0, y: 42 });
  gsap.set(desc, { opacity: 0, y: 28 });
  gsap.set(actions, { opacity: 0, y: 36 });

  const loadTl = gsap.timeline({ defaults: { ease: EASE_EXPO } });

  loadTl
    .to(bg, { opacity: 1, x: 0, scale: 1, duration: 1.35, ease: EASE_OUT }, 0)
    .to(titleLines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 }, 0.25)
    .to(desc, { opacity: 1, y: 0, duration: 0.75, ease: EASE_OUT }, "-=0.35")
    .to(actions, { opacity: 1, y: 0, duration: 0.75, ease: EASE_OUT }, "-=0.45");

  gsap.to(energy, {
    x: 18,
    y: -10,
    scale: 1.12,
    duration: 14,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  gsap.to(bg, {
    y: -22,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });
}

function setupCableInside(root, reducedMotion) {
  const section = q(root, ".tech-cable");
  if (!section) return;

  const visual = q(section, ".tech-cable__visual-img");
  const hotspots = qa(section, ".tech-cable__hotspot");
  const connectorPaths = qa(section, ".tech-cable__connector-line");
  const cols = qa(section, ".tech-cable__col");
  const head = q(section, ".tech-cable__head");

  if (reducedMotion) {
    gsap.set([visual, head, ...hotspots, ...cols], { clearProps: "all", opacity: 1 });
    connectorPaths.forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
    return;
  }

  gsap.set(visual, { opacity: 0, x: -56, scale: 0.96, transformOrigin: "center left" });
  gsap.set(hotspots, { opacity: 0, scale: 0.4 });
  gsap.set(cols, { opacity: 0, y: 36 });
  gsap.set(head, { opacity: 0, y: 24 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT });
      gsap.to(visual, { opacity: 1, x: 0, scale: 1, duration: 1.05, ease: EASE_OUT });
      gsap.to(hotspots, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.12,
        ease: "back.out(2)",
        delay: 0.35,
      });
      connectorPaths.forEach((path, index) => {
        const length = path.getTotalLength?.() ?? 120;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: EASE_OUT,
          delay: 0.45 + index * 0.1,
        });
      });
      gsap.to(cols, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: EASE_OUT,
        delay: 0.55,
      });
    },
  });
}

function setupScienceGrid(root, reducedMotion) {
  const section = q(root, ".tech-science");
  if (!section) return;

  const panels = qa(section, ".tech-science__panel");

  if (reducedMotion) {
    gsap.set(panels, { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(panels, { opacity: 0, y: 48, scale: 0.98 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 75%",
    once: true,
    onEnter: () => {
      gsap.to(panels, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: EASE_OUT,
      });
    },
  });
}

function setupManufacturingFlow(root, reducedMotion) {
  const section = q(root, ".tech-flow");
  if (!section) return;

  const head = q(section, ".tech-section-head");
  const steps = qa(section, ".tech-flow__step");
  const media = qa(section, ".tech-flow__media");
  const nums = qa(section, ".tech-flow__num");
  const connectors = qa(section, ".tech-flow__connector-line");

  if (reducedMotion) {
    gsap.set([head, ...steps, ...media, ...nums], { clearProps: "all", opacity: 1, scale: 1 });
    connectors.forEach((line) => gsap.set(line, { scaleX: 1 }));
    return;
  }

  gsap.set(head, { opacity: 0, y: 28 });
  gsap.set(steps, { opacity: 0, y: 32 });
  gsap.set(media, { opacity: 0, scale: 0.94 });
  gsap.set(nums, { opacity: 0, scale: 0.5 });
  gsap.set(connectors, { scaleX: 0, transformOrigin: "left center" });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT });
      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: EASE_OUT,
        delay: 0.1,
      });
      gsap.to(media, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: EASE_OUT,
        delay: 0.15,
      });
      gsap.to(nums, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.1,
        ease: "back.out(2.5)",
        delay: 0.25,
      });
      gsap.to(connectors, {
        scaleX: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: EASE_OUT,
        delay: 0.35,
      });
    },
  });
}

function setupTesting(root, reducedMotion) {
  const section = q(root, ".tech-testing");
  if (!section) return;

  const head = q(section, ".tech-section-head");
  const cards = qa(section, ".tech-testing__card");
  const images = qa(section, ".tech-testing__media img");

  if (reducedMotion) {
    gsap.set([head, ...cards], { clearProps: "all", opacity: 1 });
    gsap.set(images, { clearProps: "all", clipPath: "none" });
    return;
  }

  gsap.set(head, { opacity: 0, y: 28 });
  gsap.set(cards, { opacity: 0, y: 36 });
  gsap.set(images, { clipPath: "inset(0 0 100% 0)" });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: EASE_OUT,
        delay: 0.1,
      });
      gsap.to(images, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.85,
        stagger: 0.08,
        ease: EASE_OUT,
        delay: 0.2,
      });
    },
  });
}

function setupWhyMatters(root, reducedMotion) {
  const section = q(root, ".tech-matters");
  if (!section) return;

  const head = q(section, ".tech-section-head");
  const cards = qa(section, ".tech-matters__card");
  const wave = q(section, ".tech-matters__wave");

  if (reducedMotion) {
    gsap.set([head, ...cards, wave], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(head, { opacity: 0, y: 28 });
  gsap.set(cards, { opacity: 0, y: 40 });
  gsap.set(wave, { opacity: 0 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(wave, { opacity: 1, duration: 1.2, ease: EASE_OUT });
      gsap.to(head, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: EASE_OUT,
        delay: 0.15,
      });
    },
  });
}

function setupComparison(root, reducedMotion) {
  const section = q(root, ".tech-compare-table");
  if (!section) return;

  const head = q(section, ".tech-section-head");
  const rows = qa(section, ".tech-compare-table__table tbody tr");

  if (reducedMotion) {
    gsap.set([head, ...rows], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(head, { opacity: 0, y: 28 });
  gsap.set(rows, { opacity: 0, x: -24 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT });
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: EASE_OUT,
        delay: 0.12,
      });
    },
  });
}

function setupBottomCTA(root, reducedMotion) {
  const section = q(root, ".tech-bottom-cta");
  if (!section) return;

  const bg = q(section, ".tech-bottom-cta__bg");
  const title = q(section, ".tech-bottom-cta__title");
  const actions = q(section, ".tech-bottom-cta__actions");

  if (reducedMotion) {
    gsap.set([bg, title, actions], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(title, { opacity: 0, x: 48 });
  gsap.set(actions, { opacity: 0, x: 36 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 75%",
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: 0.85, ease: EASE_OUT });
      gsap.to(actions, { opacity: 1, x: 0, duration: 0.75, ease: EASE_OUT, delay: 0.15 });
    },
  });

  if (bg) {
    gsap.to(bg, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4,
      },
    });
  }
}

function setupStatsStrip(root, reducedMotion) {
  const section = q(root, ".tech-stats");
  if (!section) return;

  const items = qa(section, ".tech-stats__item");
  if (reducedMotion) {
    gsap.set(items, { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(items, { opacity: 0, y: 24 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: EASE_OUT,
      });
    },
  });
}

export function initTechnologyAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("technology-animated");

  const ctx = gsap.context(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setupButtonShine(".technology-page .tech-btn");
    setupHero(root, reducedMotion);
    setupCableInside(root, reducedMotion);
    setupScienceGrid(root, reducedMotion);
    setupManufacturingFlow(root, reducedMotion);
    setupTesting(root, reducedMotion);
    setupWhyMatters(root, reducedMotion);
    setupComparison(root, reducedMotion);
    setupBottomCTA(root, reducedMotion);
    setupStatsStrip(root, reducedMotion);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    ctx.revert();
    document.documentElement.classList.remove("technology-animated");
  };
}

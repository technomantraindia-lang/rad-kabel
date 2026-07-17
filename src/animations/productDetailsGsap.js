import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function accentGlow(targets) {
  if (!targets.length) return;
  gsap.fromTo(
    targets,
    { textShadow: "0 0 0 rgba(229, 9, 20, 0)" },
    {
      textShadow: "0 0 18px rgba(229, 9, 20, 0.5), 0 0 36px rgba(229, 9, 20, 0.2)",
      duration: 0.55,
      yoyo: true,
      repeat: 1,
      onComplete: () => gsap.set(targets, { clearProps: "textShadow" }),
    },
  );
}

function setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur) {
  const section = q(root, ".pp-hero");
  if (!section) return () => {};

  const bg = q(section, ".pp-hero__bg img");
  const breadcrumb = q(section, ".pp-breadcrumb");
  const eyebrow = q(section, ".pp-hero__eyebrow");
  const titleLines = qa(section, ".pp-hero__title-line");
  const accents = qa(section, ".pp-hero__copy .pp-accent");
  const desc = q(section, ".pp-hero__desc");
  const actions = q(section, ".pp-hero__actions");
  const stripItems = qa(section, ".pp-hero__strip-item");

  if (reducedMotion) {
    resetVisible([bg, breadcrumb, eyebrow, ...titleLines, desc, actions, ...stripItems]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.08, opacity: 0.75, transformOrigin: "center right" });
  gsap.set(breadcrumb, { opacity: 0, y: -10 });
  gsap.set(eyebrow, { opacity: 0, y: -8 });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });
  gsap.set(stripItems, { opacity: 0, y: 16 });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(bg, { scale: 1, opacity: 1, duration: 1.1 }, 0)
    .to(breadcrumb, { opacity: 1, y: 0, duration: 0.55 }, 0.12)
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.28)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.45")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.5")
    .to(stripItems, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 }, "-=0.35");

  accentGlow(accents);

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

function setupWhy(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".pp-why");
  if (!section) return;

  const title = q(section, ".pp-section-title");
  const cards = qa(section, ".pp-why__card");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY * 0.6 });
  gsap.set(cards, { opacity: 0, y: moveY, scale: 0.96 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupFeatures(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".pp-features");
  if (!section) return;

  const visual = q(section, ".pp-features__visual");
  const phrases = qa(section, ".pp-features__tagline-phrase");
  const body = q(section, ".pp-features__body");
  const checks = qa(section, ".pp-features__checks li");
  const application = q(section, ".pp-features__application");
  const closing = q(section, ".pp-features__closing");
  const uniqueTitle = q(section, ".pp-unique__title");
  const uniqueItems = qa(section, ".pp-unique__item");

  if (reducedMotion) {
    resetVisible([
      visual,
      ...phrases,
      body,
      ...checks,
      application,
      closing,
      uniqueTitle,
      ...uniqueItems,
    ]);
    return;
  }

  gsap.set(visual, { opacity: 0, x: -moveX * 0.7, scale: 0.97 });
  gsap.set(phrases, { opacity: 0, x: moveX * 0.5 });
  gsap.set([body, application, closing].filter(Boolean), { opacity: 0, y: moveY * 0.55 });
  gsap.set(checks, { opacity: 0, x: 14 });
  gsap.set(uniqueTitle, { opacity: 0, y: moveY * 0.45 });
  gsap.set(uniqueItems, { opacity: 0, y: moveY * 0.7, scale: 0.95 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(visual, { opacity: 1, x: 0, scale: 1, duration: dur, ease: EASE });
      gsap.to(phrases, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: 0.08,
        ease: EASE,
        delay: 0.08,
      });
      gsap.to(body, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.18 });
      gsap.to(checks, {
        opacity: 1,
        x: 0,
        duration: dur * 0.85,
        stagger: stagger * 0.7,
        ease: EASE,
        delay: 0.28,
      });
      gsap.to(application, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.4 });
      gsap.to(closing, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.48 });
      gsap.to(uniqueTitle, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.2 });
      gsap.to(uniqueItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger: stagger * 0.75,
        ease: EASE,
        delay: 0.32,
      });
    },
  });
}

function setupSafety(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".pp-safety");
  if (!section) return;

  const title = q(section, ".pp-safety__title");
  const cards = qa(section, ".pp-safety__card");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY * 0.55 });
  gsap.set(cards, { opacity: 0, y: moveY * 0.8, scale: 0.97 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger: stagger * 0.7,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupDatasheet(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".pp-datasheet");
  if (!section) return;

  const panel = q(section, ".pp-datasheet__panel");
  const specs = q(section, ".pp-datasheet__specs");
  const capacity = q(section, ".pp-datasheet__capacity");
  const compareTitle = q(section, ".pp-datasheet__compare-title");
  const compareRows = qa(section, ".pp-compare__table tbody tr");

  if (reducedMotion) {
    resetVisible([panel, specs, capacity, compareTitle, ...compareRows]);
    return;
  }

  gsap.set(specs, { opacity: 0, x: -18 });
  gsap.set(capacity, { opacity: 0, x: 18 });
  gsap.set(compareTitle, { opacity: 0, y: moveY * 0.5 });
  gsap.set(compareRows, { opacity: 0, x: -14 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(specs, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(capacity, { opacity: 1, x: 0, duration: dur, ease: EASE, delay: 0.1 });
      gsap.to(compareTitle, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.2 });
      gsap.to(compareRows, {
        opacity: 1,
        x: 0,
        duration: dur * 0.85,
        stagger: stagger * 0.55,
        ease: EASE,
        delay: 0.3,
      });
    },
  });
}

function setupCertDl(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".pp-cert-dl");
  if (!section) return;

  const panels = qa(section, ".pp-cert-dl__panel");
  const certItems = qa(section, ".pp-cert__item");
  const dlCards = qa(section, ".pp-dl__card");

  if (reducedMotion) {
    resetVisible([...panels, ...certItems, ...dlCards]);
    return;
  }

  gsap.set(panels, { opacity: 0, y: moveY * 0.55 });
  gsap.set(certItems, { opacity: 0, y: 16, scale: 0.96 });
  gsap.set(dlCards, { opacity: 0, y: 16, scale: 0.96 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(panels, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger: 0.12,
        ease: EASE,
      });
      gsap.to(certItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger: stagger * 0.7,
        ease: EASE,
        delay: 0.15,
      });
      gsap.to(dlCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger: stagger * 0.7,
        ease: EASE,
        delay: 0.22,
      });
    },
  });
}

function setupCta(root, reducedMotion, disableParallax, moveY, dur) {
  const section = q(root, ".pp-cta");
  if (!section) return () => {};

  const bg = q(section, ".pp-cta__bg img");
  const title = q(section, ".pp-cta__title");
  const desc = q(section, ".pp-cta__desc");
  const actions = q(section, ".pp-cta__actions");

  if (reducedMotion) {
    resetVisible([bg, title, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.06, opacity: 0.8, transformOrigin: "center center" });
  gsap.set(title, { opacity: 0, y: moveY * 0.6 });
  gsap.set(desc, { opacity: 0, y: moveY * 0.5 });
  gsap.set(actions, { opacity: 0, y: moveY * 0.5 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 78%",
    once: true,
    onEnter: () => {
      gsap.to(bg, { scale: 1, opacity: 1, duration: 1, ease: EASE });
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.1 });
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.2 });
      gsap.to(actions, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.3 });
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

function setupRelated(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".pp-related");
  if (!section) return;

  const title = q(section, ".pp-related__title");
  const cards = qa(section, ".pp-related__card");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY * 0.5 });
  gsap.set(cards, { opacity: 0, y: moveY * 0.75, scale: 0.97 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

export function initProductDetailsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("product-details-animated");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 18 : 32;
  const stagger = isMobile ? 0.07 : 0.12;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroCleanup = () => {};
  let ctaCleanup = () => {};

  const ctx = gsap.context(() => {
    heroCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupWhy(root, reducedMotion, moveY, stagger, dur);
    setupFeatures(root, reducedMotion, moveX, moveY, stagger, dur);
    setupSafety(root, reducedMotion, moveY, stagger, dur);
    setupDatasheet(root, reducedMotion, moveY, stagger, dur);
    setupCertDl(root, reducedMotion, moveY, stagger, dur);
    ctaCleanup = setupCta(root, reducedMotion, disableParallax, moveY, dur);
    setupRelated(root, reducedMotion, moveY, stagger, dur);
    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroCleanup();
    ctaCleanup();
    ctx.revert();
    document.documentElement.classList.remove("product-details-animated");
  };
}

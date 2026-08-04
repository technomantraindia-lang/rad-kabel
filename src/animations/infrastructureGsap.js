import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupSiteHeaderLikeAboutUs } from "./siteHeaderGsap.js";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
const ST_START = "top 85%";

function q(root, sel) {
  return root?.querySelector(sel) ?? null;
}

function qa(root, sel) {
  return gsap.utils.toArray(root?.querySelectorAll(sel) ?? []);
}

function parseStatValue(raw) {
  const value = String(raw).trim();
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { end: 0, suffix: value, decimals: 0 };
  const end = parseFloat(match[1]);
  const suffix = match[2] ?? "";
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { end, suffix, decimals };
}

function animateCounter(el, raw, duration = 1.1) {
  const { end, suffix, decimals } = parseStatValue(raw);
  const state = { val: 0 };
  el.textContent = `${(0).toFixed(decimals)}${suffix}`;
  gsap.to(state, {
    val: end,
    duration,
    ease: EASE,
    onUpdate: () => {
      el.textContent = `${state.val.toFixed(decimals)}${suffix}`;
    },
  });
}

function resetVisible(targets) {
  gsap.set(targets, { clearProps: "all", opacity: 1, scale: 1, x: 0, y: 0 });
}

function setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-hero");
  if (!section) return () => {};

  const bg = q(section, ".infra-hero__bg");
  const copy = q(section, ".infra-hero__copy");
  const titleLines = qa(section, ".infra-hero__title-line");
  const accents = qa(section, ".infra-hero__title .infra-accent");
  const desc = q(section, ".infra-hero__desc");
  const actions = q(section, ".infra-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, copy, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.05, transformOrigin: "center center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(bg, { scale: 1, duration: 1.1, ease: EASE }, 0)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.2)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.4")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.55");

  gsap.fromTo(
    accents,
    { textShadow: "0 0 0 rgba(224, 25, 33, 0)" },
    {
      textShadow: "0 0 16px rgba(224, 25, 33, 0.42), 0 0 32px rgba(224, 25, 33, 0.18)",
      duration: 0.55,
      delay: 0.55,
      yoyo: true,
      repeat: 1,
      onComplete: () => gsap.set(accents, { clearProps: "textShadow" }),
    },
  );

  if (disableParallax || !copy) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(copy, {
      x: relX * 8,
      y: relY * 8,
      duration: 0.45,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(copy, { x: 0, y: 0, duration: 0.5, ease: EASE, overwrite: "auto" });
  };

  section.addEventListener("mousemove", onMove);
  section.addEventListener("mouseleave", onLeave);

  return () => {
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
    gsap.set(copy, { clearProps: "x,y" });
  };
}

function setupEcosystem(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-ecosystem");
  if (!section) return;

  const head = q(section, ".infra-ecosystem__head");
  const cards = qa(section, ".infra-ecosystem__card");
  const images = qa(section, ".infra-ecosystem__media img");

  if (reducedMotion) {
    resetVisible([head, ...cards]);
    images.forEach((img) => gsap.set(img, { clearProps: "clipPath" }));
    return;
  }

  gsap.set(head, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });
  images.forEach((img) =>
    gsap.set(img, { clipPath: "inset(0 100% 0 0)", transformOrigin: "left center" }),
  );

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.08,
      });
      gsap.to(images, {
        clipPath: "inset(0 0% 0 0)",
        duration: dur + 0.1,
        stagger,
        ease: EASE,
        delay: 0.15,
        onComplete: () => images.forEach((img) => gsap.set(img, { clearProps: "clipPath" })),
      });
    },
  });
}

const INSIDE_DIRS = [
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function setupInside(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-inside");
  if (!section) return;

  const cards = qa(section, ".infra-inside__card");

  if (reducedMotion) {
    resetVisible(cards);
    return;
  }

  cards.forEach((card, i) => {
    const dir = INSIDE_DIRS[i] ?? { x: 0, y: 1 };
    gsap.set(card, {
      opacity: 0,
      x: dir.x * moveX,
      y: dir.y * moveY,
    });
  });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
      });
    },
  });
}

function setupProcess(root, reducedMotion, moveX, moveY, dur) {
  const section = q(root, ".infra-process");
  if (!section) return;

  const head = q(section, ".infra-section-head");
  const visuals = q(section, ".infra-process__visuals");
  const labels = qa(section, ".infra-process__title");

  if (!visuals) return;

  const sequence = Array.from(visuals.children);

  if (reducedMotion) {
    resetVisible([head, ...sequence, ...labels]);
    qa(section, ".infra-process__num").forEach((n) => gsap.set(n, { scale: 1 }));
    return;
  }

  gsap.set(head, { opacity: 0, y: moveY });
  sequence.forEach((el) => {
    if (el.classList.contains("infra-process__media")) {
      gsap.set(el, { opacity: 0, x: -moveX });
      const num = q(el, ".infra-process__num");
      if (num) gsap.set(num, { scale: 0.7, opacity: 0 });
    } else {
      gsap.set(el, { opacity: 0, scale: 0.85 });
    }
  });
  gsap.set(labels, { opacity: 0 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: dur, ease: EASE });

      const tl = gsap.timeline({ delay: 0.1 });
      let labelIndex = 0;

      sequence.forEach((el) => {
        if (el.classList.contains("infra-process__media")) {
          const num = q(el, ".infra-process__num");
          tl.to(el, { opacity: 1, x: 0, duration: dur * 0.85, ease: EASE }, ">-0.05");
          if (num) {
            tl.to(num, { scale: 1, opacity: 1, duration: 0.55, ease: EASE }, "<+=0.12");
          }
          const label = labels[labelIndex];
          if (label) {
            tl.to(label, { opacity: 1, duration: 0.45, ease: EASE }, "<+=0.05");
            labelIndex += 1;
          }
        } else {
          tl.to(el, { opacity: 1, scale: 1, duration: 0.45, ease: EASE }, ">-0.02");
        }
      });
    },
  });
}

function setupStats(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".infra-stats");
  if (!section) return;

  const panel = q(section, ".infra-stats__panel");
  const items = qa(section, ".infra-stats__item");
  const icons = qa(section, ".infra-stats__icon-wrap");
  const values = qa(section, ".infra-stats__value");

  if (reducedMotion) {
    resetVisible([panel, ...items]);
    values.forEach((el, i) => {
      const raw = ["100%", "25+", "99.97%", "24/7", "PAN INDIA"][i];
      if (raw) el.textContent = raw;
    });
    return;
  }

  gsap.set(panel, { opacity: 0, y: moveY });
  gsap.set(items, { opacity: 0, y: moveY * 0.75 });

  const countRaw = ["100%", "25+", "99.97%", "24/7"];
  values.slice(0, 4).forEach((el, i) => {
    const raw = countRaw[i];
    if (raw === "24/7") {
      el.textContent = "0/7";
    } else {
      const { suffix, decimals } = parseStatValue(raw);
      el.textContent = `${(0).toFixed(decimals)}${suffix}`;
    }
  });
  if (values[4]) {
    gsap.set(values[4], { opacity: 0, scale: 0.92 });
  }

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(panel, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.12,
        onComplete: () => {
          const countTargets = values.slice(0, 4);
          countTargets.forEach((el, i) => {
            const raw = countRaw[i];
            if (raw === "24/7") {
              const state = { val: 0 };
              gsap.to(state, {
                val: 24,
                duration: 1,
                ease: EASE,
                onUpdate: () => {
                  el.textContent = `${Math.round(state.val)}/7`;
                },
              });
            } else {
              animateCounter(el, raw, 1);
            }
          });

          const panIndia = values[4];
          if (panIndia) {
            gsap.to(panIndia, { opacity: 1, scale: 1, duration: 0.7, ease: EASE, delay: 0.15 });
          }

          icons.forEach((icon, i) => {
            gsap.fromTo(
              icon,
              { scale: 1 },
              {
                scale: 1.08,
                duration: 0.35,
                ease: EASE,
                yoyo: true,
                repeat: 1,
                delay: 0.2 + i * 0.08,
              },
            );
          });
        },
      });
    },
  });
}

function setupQuality(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-quality");
  if (!section) return;

  const titleLines = qa(section, ".infra-quality__title-line");
  const cards = qa(section, ".infra-quality__card");
  const images = qa(section, ".infra-quality__media img");

  if (reducedMotion) {
    resetVisible([...titleLines, ...cards]);
    images.forEach((img) => gsap.set(img, { clearProps: "clipPath" }));
    return;
  }

  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });
  images.forEach((img) => gsap.set(img, { clipPath: "inset(0 100% 0 0)" }));

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(titleLines, { opacity: 1, x: 0, duration: dur, stagger: stagger * 0.9, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
      gsap.to(images, {
        clipPath: "inset(0 0% 0 0)",
        duration: dur + 0.05,
        stagger: stagger * 0.85,
        ease: EASE,
        delay: 0.18,
        onComplete: () => images.forEach((img) => gsap.set(img, { clearProps: "clipPath" })),
      });
    },
  });
}

const GALLERY_DIRS = [
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function setupGallery(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-gallery");
  if (!section) return;

  const title = q(section, ".infra-gallery__title");
  const items = qa(section, ".infra-gallery__item");

  if (reducedMotion) {
    resetVisible([title, ...items]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  items.forEach((item, i) => {
    const dir = GALLERY_DIRS[i] ?? { x: 0, y: 1 };
    gsap.set(item, { opacity: 0, x: dir.x * moveX, y: dir.y * moveY });
  });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupDual(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".infra-dual");
  if (!section) return;

  const panels = qa(section, ".infra-dual__panel");

  if (reducedMotion) {
    resetVisible(panels);
    panels.forEach((panel) => {
      resetVisible([q(panel, ".infra-dual__title"), ...qa(panel, ".infra-dual__feature")]);
    });
    return;
  }

  panels.forEach((panel, i) => {
    const fromX = i === 0 ? -moveX : moveX;
    gsap.set(panel, { opacity: 0, x: fromX });

    const title = q(panel, ".infra-dual__title");
    const features = qa(panel, ".infra-dual__feature");
    gsap.set(title, { opacity: 0, y: moveY * 0.65 });
    gsap.set(features, { opacity: 0, y: moveY * 0.5 });

    ScrollTrigger.create({
      trigger: panel,
      start: ST_START,
      once: true,
      onEnter: () => {
        gsap.to(panel, { opacity: 1, x: 0, duration: dur, ease: EASE });
        gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.08 });
        gsap.to(features, {
          opacity: 1,
          y: 0,
          duration: dur * 0.9,
          stagger,
          ease: EASE,
          delay: 0.14,
        });
      },
    });
  });
}

function setupBottomCTA(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".infra-bottom-cta");
  if (!section) return null;

  const bg = q(section, ".infra-bottom-cta__bg");
  const titleLines = qa(section, ".infra-bottom-cta__title-line");
  const actions = qa(section, ".infra-bottom-cta__actions .infra-btn");
  let floatTween = null;

  if (reducedMotion) {
    resetVisible([bg, ...titleLines, ...actions]);
    return null;
  }

  gsap.set(bg, { opacity: 0, scale: 1.04 });
  gsap.set(titleLines, { opacity: 0, x: -24 });
  gsap.set(actions, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(bg, { opacity: 1, scale: 1, duration: dur + 0.1, ease: EASE });
      gsap.to(titleLines, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: stagger * 0.95,
        ease: EASE,
        delay: 0.12,
      });
      gsap.to(actions, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.28,
      });

      floatTween = gsap.to(bg, {
        y: 4,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  return () => {
    floatTween?.kill();
    gsap.set(bg, { clearProps: "y" });
  };
}

function setupFooter(reducedMotion, moveY, stagger, dur) {
  const footer = document.querySelector("footer#contact");
  if (!footer) return;

  const grid = footer.querySelector(".grid");
  if (!grid) return;

  const columns = Array.from(grid.children);
  const brandCol = columns[0];
  const linkCols = columns.slice(1, -1);
  const certCol = columns[columns.length - 1];
  const certCards = certCol ? qa(certCol, ".grid > div") : [];

  if (reducedMotion) {
    resetVisible([brandCol, ...linkCols, certCol, ...certCards]);
    return;
  }

  gsap.set(brandCol, { opacity: 0, y: moveY * 0.6 });
  gsap.set(linkCols, { opacity: 0, y: moveY });
  gsap.set(certCol, { opacity: 0, y: moveY });
  gsap.set(certCards, { opacity: 0, y: moveY * 0.75 });

  ScrollTrigger.create({
    trigger: footer,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(brandCol, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(linkCols, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
      gsap.to(certCol, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(certCards, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger: stagger * 0.85,
        ease: EASE,
        delay: 0.32,
      });
    },
  });
}

export function initInfrastructureAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("infrastructure-animated");
  document.body.classList.add("is-infrastructure-page");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 16 : 28;
  const stagger = isMobile ? 0.06 : 0.1;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroParallaxCleanup = () => {};
  let ctaFloatCleanup = () => {};
  let headerCleanup = () => {};

  const ctx = gsap.context(() => {
    headerCleanup = setupSiteHeaderLikeAboutUs({
      className: "site-header--infra-page",
      isMobile,
      reducedMotion,
    });
    heroParallaxCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupEcosystem(root, reducedMotion, moveX, moveY, stagger, dur);
    setupInside(root, reducedMotion, moveX, moveY, stagger, dur);
    setupProcess(root, reducedMotion, moveX, moveY, dur);
    setupStats(root, reducedMotion, moveY, stagger, dur);
    setupQuality(root, reducedMotion, moveX, moveY, stagger, dur);
    setupGallery(root, reducedMotion, moveX, moveY, stagger, dur);
    setupDual(root, reducedMotion, moveX, moveY, stagger, dur);
    ctaFloatCleanup = setupBottomCTA(root, reducedMotion, moveY, stagger, dur) ?? (() => {});
    setupFooter(reducedMotion, moveY, stagger, dur);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroParallaxCleanup();
    ctaFloatCleanup();
    headerCleanup();
    ctx.revert();
    document.documentElement.classList.remove("infrastructure-animated");
    document.body.classList.remove("is-infrastructure-page");
  };
}

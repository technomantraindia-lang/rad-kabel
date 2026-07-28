import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
const ST_START = "top 85%";

function q(root, sel) {
  return root?.querySelector(sel) ?? null;
}

function qa(root, sel) {
  return gsap.utils.toArray(root?.querySelectorAll(sel) ?? []);
}

function resetVisible(targets) {
  gsap.set(targets, { clearProps: "all", opacity: 1, scale: 1, x: 0, y: 0 });
}

function setupHeader(reducedMotion, moveY) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.classList.add("site-header--applications-page");

  if (reducedMotion) {
    gsap.set(header, { clearProps: "all", opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    header,
    { y: -moveY, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, ease: EASE, delay: 0.05 },
  );
}

function setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur) {
  const section = q(root, ".app-hero");
  if (!section) return () => {};

  const bg = q(section, ".app-hero__bg");
  const copy = q(section, ".app-hero__copy");
  const titleLines = qa(section, ".app-hero__title-line");
  const accents = qa(section, ".app-hero__accent");
  const desc = q(section, ".app-hero__desc");
  const actions = q(section, ".app-hero__actions");

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

function setupEcosystem(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".app-ecosystem");
  if (!section) return;

  const diagram = q(section, ".app-ecosystem__diagram");
  const diagramInner = q(section, ".app-ecosystem__diagram-inner");
  const nodes = qa(section, ".app-ecosystem__node");
  const center = q(section, ".app-ecosystem__center");
  const cards = qa(section, ".app-ecosystem__card");

  if (reducedMotion) {
    resetVisible([diagram, diagramInner, center, ...nodes, ...cards]);
    return;
  }

  gsap.set(diagramInner, { opacity: 0, scale: 0.94, transformOrigin: "center center" });
  gsap.set(nodes, { opacity: 0, scale: 0.85 });
  gsap.set(center, { opacity: 0, scale: 0.8 });
  gsap.set(cards, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(diagramInner, { opacity: 1, scale: 1, duration: dur + 0.1, ease: EASE });
      gsap.to(nodes, {
        opacity: 1,
        scale: 1,
        duration: dur * 0.85,
        stagger: stagger * 0.9,
        ease: EASE,
        delay: 0.12,
      });
      gsap.to(center, {
        opacity: 1,
        scale: 1,
        duration: dur,
        ease: EASE,
        delay: 0.12 + nodes.length * stagger * 0.9,
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.18,
      });
    },
  });
}

const DETAIL_DIRS = [
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
];

function setupDetailCards(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".app-details");
  if (!section) return;

  const cards = qa(section, ".app-detail-card");

  if (reducedMotion) {
    cards.forEach((card) => {
      resetVisible(card);
      resetVisible(qa(card, ".app-detail-card__bullet, .app-detail-card__product"));
    });
    return;
  }

  cards.forEach((card, i) => {
    const dir = DETAIL_DIRS[i] ?? { x: 0, y: 1 };
    const bullets = qa(card, ".app-detail-card__bullet");
    const products = qa(card, ".app-detail-card__product");

    gsap.set(card, { opacity: 0, x: dir.x * moveX, y: dir.y * moveY });
    gsap.set(bullets, { opacity: 0, x: -12 });
    gsap.set(products, { opacity: 0, scale: 0.9 });

    ScrollTrigger.create({
      trigger: card,
      start: ST_START,
      once: true,
      onEnter: () => {
        gsap.to(card, { opacity: 1, x: 0, y: 0, duration: dur, ease: EASE });
        gsap.to(bullets, {
          opacity: 1,
          x: 0,
          duration: dur * 0.85,
          stagger: stagger * 0.75,
          ease: EASE,
          delay: 0.12,
        });
        gsap.to(products, {
          opacity: 1,
          scale: 1,
          duration: dur * 0.8,
          stagger: stagger,
          ease: EASE,
          delay: 0.22,
        });
      },
    });
  });
}

function setupCableFinder(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".app-cable-finder");
  if (!section) return;

  const title = q(section, ".app-cable-finder__title");
  const buttons = qa(section, ".app-cable-finder__btn");
  const infraBtn = q(section, '[data-app-selector="infrastructure"]');

  if (reducedMotion) {
    resetVisible([title, ...buttons]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  gsap.set(buttons, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(buttons, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
        onComplete: () => {
          if (infraBtn) {
            gsap.fromTo(
              infraBtn,
              { scale: 1 },
              { scale: 1.03, duration: 0.35, ease: EASE, yoyo: true, repeat: 1 },
            );
          }
        },
      });
    },
  });
}

function setupRecommended(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".app-recommended");
  if (!section) return;

  const heading = q(section, ".app-recommended__heading");
  const products = qa(section, ".app-recommended__product");
  const specs = qa(section, ".app-recommended__spec");
  const datasheet = q(section, ".app-recommended__datasheet");

  if (reducedMotion) {
    resetVisible([heading, ...products, ...specs, datasheet]);
    return;
  }

  gsap.set(heading, { opacity: 0, y: moveY });
  gsap.set(products, { opacity: 0, y: moveY * 0.75 });
  gsap.set(specs, { opacity: 0, y: moveY * 0.65 });
  if (datasheet) gsap.set(datasheet, { opacity: 0, y: moveY * 0.65 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(heading, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(products, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
      gsap.to(specs, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger: stagger * 0.85,
        ease: EASE,
        delay: 0.18,
      });
      if (datasheet) {
        gsap.to(datasheet, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.28 });
      }
    },
  });
}

function setupProjects(root, reducedMotion, moveX, dur, stagger) {
  const section = q(root, ".app-projects");
  if (!section) return;

  const title = q(section, ".app-projects__title");
  const arrows = qa(section, ".app-projects__arrow");
  const cards = qa(section, ".app-projects__card");

  if (reducedMotion) {
    resetVisible([title, ...arrows, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  gsap.set(arrows, { opacity: 0, scale: 0.85 });
  gsap.set(cards, { opacity: 0, x: moveX });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(arrows, {
        opacity: 1,
        scale: 1,
        duration: dur * 0.85,
        stagger: 0.1,
        ease: EASE,
        delay: 0.1,
      });
      gsap.to(cards, {
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

function setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".app-bottom-cta");
  if (!section) return;

  const bg = q(section, ".app-bottom-cta__bg");
  const titleLines = qa(section, ".app-bottom-cta__title-line");
  const accent = q(section, ".app-bottom-cta__accent");
  const desc = q(section, ".app-bottom-cta__desc");
  const actions = qa(section, ".app-bottom-cta__actions .app-btn");
  const features = qa(section, ".app-bottom-cta__feature");

  if (reducedMotion) {
    resetVisible([bg, ...titleLines, desc, ...actions, ...features]);
    return;
  }

  gsap.set(bg, { opacity: 0, scale: 1.04, transformOrigin: "center center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });
  gsap.set(features, { opacity: 0, y: moveY * 0.65 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(bg, { opacity: 1, scale: 1, duration: dur + 0.15, ease: EASE });
      gsap.to(titleLines, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: stagger * 0.95,
        ease: EASE,
        delay: 0.12,
      });

      if (accent) {
        gsap.fromTo(
          accent,
          { textShadow: "0 0 0 rgba(224, 25, 33, 0)" },
          {
            textShadow: "0 0 16px rgba(224, 25, 33, 0.42), 0 0 32px rgba(224, 25, 33, 0.18)",
            duration: 0.55,
            delay: 0.45,
            yoyo: true,
            repeat: 1,
            onComplete: () => gsap.set(accent, { clearProps: "textShadow" }),
          },
        );
      }

      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(actions, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.3,
      });
      gsap.to(features, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.38,
        onComplete: () => {
          features.forEach((feature, i) => {
            const icon = feature.querySelector("img");
            if (!icon) return;
            gsap.fromTo(
              icon,
              { scale: 1 },
              {
                scale: 1.08,
                duration: 0.35,
                ease: EASE,
                yoyo: true,
                repeat: 1,
                delay: i * 0.06,
              },
            );
          });
        },
      });
    },
  });
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

export function initApplicationsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("applications-animated");
  document.body.classList.add("is-applications-page");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 16 : 28;
  const stagger = isMobile ? 0.06 : 0.1;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroParallaxCleanup = () => {};

  const ctx = gsap.context(() => {
    setupHeader(reducedMotion, moveY);
    heroParallaxCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupEcosystem(root, reducedMotion, moveY, stagger, dur);
    setupDetailCards(root, reducedMotion, moveX, moveY, stagger, dur);
    setupCableFinder(root, reducedMotion, moveX, moveY, stagger, dur);
    setupRecommended(root, reducedMotion, moveY, stagger, dur);
    setupProjects(root, reducedMotion, moveX, dur, stagger);
    setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur);
    setupFooter(reducedMotion, moveY, stagger, dur);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroParallaxCleanup();
    ctx.revert();
    document.documentElement.classList.remove("applications-animated");
    document.body.classList.remove("is-applications-page");
    document.querySelector(".site-header")?.classList.remove("site-header--applications-page");
  };
}

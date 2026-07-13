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

function accentGlow(targets) {
  if (!targets.length) return;
  gsap.fromTo(
    targets,
    { textShadow: "0 0 0 rgba(229, 9, 20, 0)" },
    {
      textShadow: "0 0 16px rgba(229, 9, 20, 0.42), 0 0 32px rgba(229, 9, 20, 0.18)",
      duration: 0.55,
      yoyo: true,
      repeat: 1,
      onComplete: () => gsap.set(targets, { clearProps: "textShadow" }),
    },
  );
}

function setupHeader(reducedMotion, moveY) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.classList.add("site-header--electrician-page");

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
  const section = q(root, ".ep-hero");
  if (!section) return () => {};

  const bg = q(section, ".ep-hero__bg");
  const titleLines = qa(section, ".ep-hero__title-line");
  const accents = qa(section, ".ep-accent");
  const desc = q(section, ".ep-hero__desc");
  const actions = q(section, ".ep-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, {
    scale: 1.05,
    opacity: 0.75,
    y: moveY,
    transformOrigin: "65% 75%",
  });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(
      bg,
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: EASE,
        onComplete: () => {
          gsap.fromTo(
            bg,
            { filter: "drop-shadow(0 0 0 rgba(229, 9, 20, 0))" },
            {
              filter: "drop-shadow(0 0 24px rgba(229, 9, 20, 0.22))",
              duration: 0.55,
              yoyo: true,
              repeat: 1,
              onComplete: () => gsap.set(bg, { clearProps: "filter" }),
            },
          );
        },
      },
      0,
    )
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.22)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.42")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.5");

  accentGlow(accents);

  if (disableParallax || !bg) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(bg, {
      x: relX * 8,
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
  const section = q(root, ".ep-why");
  if (!section) return;

  const title = q(section, ".ep-section-title");
  const cards = qa(section, ".ep-why__card");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(cards, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.12,
      });
    },
  });
}

function setupHow(root, reducedMotion, moveX, moveY, dur) {
  const section = q(root, ".ep-how");
  if (!section) return;

  const title = q(section, ".ep-how__main .ep-section-title");
  const steps = qa(section, ".ep-how__step");
  const arrows = qa(section, ".ep-how__arrow");

  if (reducedMotion) {
    resetVisible([title, ...steps, ...arrows]);
    steps.forEach((step) => {
      const icon = q(step, ".ep-how__step-icon");
      if (icon) gsap.set(icon, { scale: 1 });
    });
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  steps.forEach((step) => {
    gsap.set(step, { opacity: 0, x: -moveX });
    const icon = q(step, ".ep-how__step-icon");
    if (icon) gsap.set(icon, { scale: 0.8, opacity: 0 });
  });
  gsap.set(arrows, { opacity: 0, scale: 0.85 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });

      const tl = gsap.timeline({ delay: 0.1 });
      steps.forEach((step, i) => {
        const icon = q(step, ".ep-how__step-icon");
        const arrow = q(step, ".ep-how__arrow");
        tl.to(step, { opacity: 1, x: 0, duration: dur * 0.85, ease: EASE }, i === 0 ? 0 : "-=0.28");
        if (icon) {
          tl.to(icon, { scale: 1, opacity: 1, duration: 0.55, ease: EASE }, "<+=0.05");
        }
        if (arrow) {
          tl.to(arrow, { opacity: 1, scale: 1, duration: 0.45, ease: EASE }, "-=0.1");
        }
      });
    },
  });
}

function setupWhoJoin(root, reducedMotion, moveX, moveY, stagger, dur) {
  const aside = q(root, ".ep-how__aside");
  if (!aside) return;

  const panel = q(aside, ".ep-how__aside-panel");
  const bg = q(aside, ".ep-how__aside-bg");
  const items = qa(aside, ".ep-how__aside li");
  const checks = qa(aside, ".ep-how__check");

  if (reducedMotion) {
    resetVisible([panel, bg, ...items]);
    return;
  }

  gsap.set(panel, { opacity: 0, x: moveX });
  gsap.set(bg, { opacity: 0, y: moveY });
  gsap.set(items, { opacity: 0, y: moveY * 0.7 });

  ScrollTrigger.create({
    trigger: aside,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(panel, { opacity: 1, x: 0, duration: dur + 0.05, ease: EASE });
      gsap.to(bg, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.1 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.2,
        onComplete: () => {
          checks.forEach((check, i) => {
            gsap.fromTo(
              check,
              { scale: 1 },
              { scale: 1.2, duration: 0.28, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.08 },
            );
          });
        },
      });
    },
  });
}

function setupRewards(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".ep-rewards");
  if (!section) return;

  const intro = q(section, ".ep-rewards__intro");
  const title = q(intro, ".ep-rewards__title");
  const text = q(intro, "p");
  const cta = q(intro, ".ep-rewards__cta");
  const cards = qa(section, ".ep-rewards__card");
  const dots = q(section, ".ep-rewards__dots");

  if (reducedMotion) {
    resetVisible([title, text, cta, ...cards, dots]);
    return;
  }

  gsap.set([title, text, cta], { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, x: moveX });
  gsap.set(dots, { opacity: 0 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(text, { opacity: 1, x: 0, duration: dur, ease: EASE, delay: 0.08 });
      gsap.to(cta, { opacity: 1, x: 0, duration: dur, ease: EASE, delay: 0.14 });
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.18,
      });
      gsap.to(dots, { opacity: 1, duration: dur * 0.85, ease: EASE, delay: 0.35 });
    },
  });
}

function setupSupport(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".ep-support");
  if (!section) return;

  const certPanel = q(section, ".ep-support__panel--cert");
  const certImage = q(certPanel, ".ep-support__cert-image");
  const iconPanels = qa(section, ".ep-support__panel--icons");
  const trainingPanel = iconPanels[0];
  const marketingPanel = iconPanels[1];
  const trainingIcons = trainingPanel ? qa(trainingPanel, ".ep-support__list-icon") : [];
  const marketingIcons = marketingPanel ? qa(marketingPanel, ".ep-support__list-icon") : [];

  if (reducedMotion) {
    resetVisible([certPanel, certImage, trainingPanel, marketingPanel]);
    return;
  }

  if (certPanel) {
    gsap.set(certPanel, { opacity: 0, x: -28 });
    gsap.set(certImage, { opacity: 0, scale: 0.94 });
  }
  if (trainingPanel) {
    gsap.set(trainingPanel, { opacity: 0, y: moveY });
    gsap.set(trainingIcons, { opacity: 0, y: moveY * 0.65 });
  }
  if (marketingPanel) {
    gsap.set(marketingPanel, { opacity: 0, x: 28 });
    gsap.set(marketingIcons, { opacity: 0, x: 18 });
  }

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      if (certPanel) {
        gsap.to(certPanel, { opacity: 1, x: 0, duration: dur, ease: EASE });
        gsap.to(certImage, { opacity: 1, scale: 1, duration: dur + 0.05, ease: EASE, delay: 0.12 });
      }
      if (trainingPanel) {
        gsap.to(trainingPanel, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.08 });
        gsap.to(trainingIcons, {
          opacity: 1,
          y: 0,
          duration: dur * 0.85,
          stagger,
          ease: EASE,
          delay: 0.2,
        });
      }
      if (marketingPanel) {
        gsap.to(marketingPanel, { opacity: 1, x: 0, duration: dur, ease: EASE, delay: 0.14 });
        gsap.to(marketingIcons, {
          opacity: 1,
          x: 0,
          duration: dur * 0.85,
          stagger,
          ease: EASE,
          delay: 0.26,
        });
      }
    },
  });
}

function setupStories(root, reducedMotion, moveX, moveY, stagger, dur) {
  const block = q(root, ".ep-stories");
  if (!block) return;

  const title = q(block, ".ep-section-title");
  const cards = qa(block, ".ep-story");
  const quotes = qa(block, ".ep-story__quote");
  const avatars = qa(block, ".ep-story__avatar");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });
  gsap.set(quotes, { scale: 0.88, opacity: 0 });
  gsap.set(avatars, { opacity: 0, x: -10 });

  ScrollTrigger.create({
    trigger: block,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, x: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.12,
      });
      gsap.to(quotes, {
        scale: 1,
        opacity: 1,
        duration: dur * 0.85,
        stagger: stagger * 0.9,
        ease: EASE,
        delay: 0.2,
      });
      gsap.to(avatars, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: EASE,
        delay: 0.32,
      });
    },
  });
}

function setupJoinBand(root, reducedMotion, moveX, moveY, stagger, dur) {
  const band = q(root, ".ep-join-band");
  if (!band) return;

  const copy = q(band, ".ep-join-band__copy");
  const heading = q(copy, "h2");
  const desc = q(copy, "p");
  const btn = q(copy, ".ep-btn");
  const product = q(band, ".ep-join-band__product");

  if (reducedMotion) {
    resetVisible([band, heading, desc, btn, product]);
    return;
  }

  gsap.set(band, { opacity: 0, x: moveX });
  gsap.set([heading, desc], { opacity: 0, y: moveY * 0.75 });
  gsap.set(btn, { opacity: 0, y: moveY * 0.6 });
  gsap.set(product, { opacity: 0, scale: 0.92 });

  ScrollTrigger.create({
    trigger: band,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(band, { opacity: 1, x: 0, duration: dur + 0.05, ease: EASE });
      gsap.to(heading, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.1 });
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.16 });
      gsap.to(product, { opacity: 1, scale: 1, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(btn, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.3 });
    },
  });
}

function setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".ep-cta");
  if (!section) return;

  const bgImage = q(section, ".ep-cta__bg-image");
  const titleLines = qa(section, ".ep-cta__title-line");
  const accent = q(section, ".ep-cta__title .ep-accent");
  const desc = q(section, ".ep-cta__copy p");
  const actions = qa(section, ".ep-cta__actions .ep-btn");
  const trustItems = qa(section, ".ep-cta__trust li");

  if (reducedMotion) {
    resetVisible([bgImage, ...titleLines, desc, ...actions, ...trustItems]);
    return;
  }

  gsap.set(bgImage, { opacity: 0, x: -moveX, scale: 1.03, transformOrigin: "left center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });
  gsap.set(trustItems, { opacity: 0, y: moveY * 0.75 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(bgImage, { opacity: 1, x: 0, scale: 1, duration: dur + 0.1, ease: EASE });
      gsap.to(titleLines, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: stagger * 0.95,
        ease: EASE,
        delay: 0.12,
      });
      if (accent) accentGlow([accent]);
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(actions, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.28,
      });
      gsap.to(trustItems, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.35,
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

export function initElectricianAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("electrician-animated");
  document.body.classList.add("is-electrician-page");

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
    setupWhy(root, reducedMotion, moveY, stagger, dur);
    setupHow(root, reducedMotion, moveX, moveY, dur);
    setupWhoJoin(root, reducedMotion, moveX, moveY, stagger, dur);
    setupRewards(root, reducedMotion, moveX, moveY, stagger, dur);
    setupSupport(root, reducedMotion, moveY, stagger, dur);
    setupStories(root, reducedMotion, moveX, moveY, stagger, dur);
    setupJoinBand(root, reducedMotion, moveX, moveY, stagger, dur);
    setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur);
    setupFooter(reducedMotion, moveY, stagger, dur);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroParallaxCleanup();
    ctx.revert();
    document.documentElement.classList.remove("electrician-animated");
    document.body.classList.remove("is-electrician-page");
    document.querySelector(".site-header")?.classList.remove("site-header--electrician-page");
  };
}

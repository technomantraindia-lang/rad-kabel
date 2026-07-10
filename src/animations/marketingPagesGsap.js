import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "power3.out";
const EASE_EXPO = "expo.out";
const EASE_BACK = "back.out(1.7)";

const PAGE_CONFIGS = {
  "infrastructure-page": {
    hero: ".infra-hero",
    heroTitle: ".infra-hero__title",
    heroDesc: ".infra-hero__desc, .infra-hero__lead",
    heroActions: ".infra-hero__actions",
    heroBg: ".infra-hero__bg",
    sectionHeads: ".infra-section-head",
    cards: [
      ".infra-ecosystem__card",
      ".infra-inside__card",
      ".infra-quality__card",
      ".infra-gallery__item",
      ".infra-dual__panel",
      ".infra-dual__feature",
      ".infra-stats__item",
      ".infra-process__media",
    ],
    stats: ".infra-stats__value",
    buttons: ".infra-btn",
    revealOnly: [],
    carouselGroups: [],
  },
  "app-page": {
    hero: ".app-hero",
    heroTitle: ".app-hero h1",
    heroDesc: ".app-hero p",
    heroActions: ".app-hero .flex.flex-wrap",
    heroBg: ".app-hero img",
    sectionHeads: ".app-section-head, .app-ecosystem h2, .app-selector h2, .app-projects h2, .app-cta h2",
    cards: [
      ".app-eco-card",
      ".app-detail-card",
      ".app-selector__btn",
      ".app-project-card",
      ".app-cta__feature",
    ],
    revealOnly: [".app-eco-diagram", ".app-eco-node"],
    carouselGroups: [],
    stats: null,
    buttons: ".app-hero a, .app-cta a, .app-cta button",
  },
  "cert-page": {
    hero: ".cert-hero",
    heroTitle: ".cert-hero__title",
    heroDesc: ".cert-hero__desc, .cert-hero__lead",
    heroActions: ".cert-hero__actions",
    heroBg: ".cert-hero__bg",
    sectionHeads:
      ".cert-our-section__head, .cert-journey__head, .cert-testing__head, .cert-meanings__head, .cert-lab__head, .cert-download__head, .cert-verify__head",
    cards: [
      ".cert-our-section__card",
      ".cert-our-section__feature",
      ".cert-journey__item",
      ".cert-journey__step",
      ".cert-testing__card",
      ".cert-meanings__col",
      ".cert-lab__card",
      ".cert-stats__item",
      ".cert-download__card",
      ".cert-trust__item",
    ],
    stats: ".cert-stats__num",
    buttons: ".cert-hero__btn, .cert-bottom-cta__btn",
    revealOnly: [".cert-trust__item"],
    carouselGroups: [],
  },
  "dn-page": {
    hero: ".dn-hero",
    heroTitle: ".dn-hero__title",
    heroDesc: ".dn-hero__desc, .dn-hero__lead",
    heroActions: ".dn-hero__actions",
    heroBg: ".dn-hero__bg",
    sectionHeads: ".dn-section-title, .dn-cta__title",
    cards: [
      ".dn-why__card",
      ".dn-who__card",
      ".dn-network__panel",
      ".dn-process__step",
      ".dn-story",
      ".dn-support__card",
      ".dn-benefits__list > li",
      ".dn-faq__list > li",
    ],
    revealOnly: [".dn-trust__item"],
    carouselGroups: [],
    stats: null,
    buttons: ".dn-btn",
  },
  "ep-page": {
    hero: ".ep-hero",
    heroTitle: ".ep-hero__title",
    heroDesc: ".ep-hero__desc, .ep-hero__lead",
    heroActions: ".ep-hero__actions",
    heroBg: ".ep-hero__bg",
    sectionHeads: ".ep-section-title, .ep-cta__title",
    cards: [
      ".ep-why__card",
      ".ep-how__step",
      ".ep-how__aside-panel",
      ".ep-support__panel",
      ".ep-story",
    ],
    revealOnly: [".ep-cta__trust li", ".ep-join-band"],
    carouselGroups: [".ep-rewards__grid .ep-rewards__card"],
    stats: null,
    buttons: ".ep-btn",
  },
};

function qa(root, sel) {
  return gsap.utils.toArray(root.querySelectorAll(sel));
}

function q(root, sel) {
  return root.querySelector(sel);
}

function getPageConfig(root) {
  const key = Object.keys(PAGE_CONFIGS).find((cls) => root.classList.contains(cls));
  return key ? PAGE_CONFIGS[key] : null;
}

function parseStatValue(raw) {
  const value = String(raw).trim();
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return { end: 0, suffix: value, decimals: 0 };
  const numStr = match[1].replace(/,/g, "");
  const end = parseFloat(numStr);
  const suffix = match[2] ?? "";
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { end, suffix, decimals };
}

function animateCounter(el, raw) {
  const { end, suffix, decimals } = parseStatValue(raw);
  if (Number.isNaN(end)) return;
  const state = { val: 0 };
  el.textContent = `${(0).toFixed(decimals)}${suffix}`;
  gsap.to(state, {
    val: end,
    duration: 1.35,
    ease: EASE_OUT,
    onUpdate: () => {
      el.textContent = `${state.val.toFixed(decimals)}${suffix}`;
    },
  });
}

function setupButtonShine(selector) {
  qa(document, selector).forEach((btn) => {
    if (btn.querySelector(".mkt-btn-shine")) return;
    const shine = document.createElement("span");
    shine.className = "mkt-btn-shine";
    shine.setAttribute("aria-hidden", "true");
    btn.classList.add("mkt-btn--shine");
    btn.appendChild(shine);
  });
}

function markInteractiveCards(root, cardSelectors) {
  cardSelectors.forEach((sel) => {
    qa(root, sel).forEach((el) => {
      el.classList.add("mkt-interactive-card");
      if (!el.querySelector(".mkt-card-glow")) {
        const glow = document.createElement("span");
        glow.className = "mkt-card-glow";
        glow.setAttribute("aria-hidden", "true");
        el.prepend(glow);
      }
      if (!el.querySelector(".mkt-card-sweep")) {
        const sweep = document.createElement("span");
        sweep.className = "mkt-card-sweep";
        sweep.setAttribute("aria-hidden", "true");
        el.prepend(sweep);
      }
    });
  });
}

function revealSimpleCards(cards, reducedMotion) {
  if (!cards.length) return;

  cards.forEach((card) => card.classList.add("mkt-reveal-card"));

  if (reducedMotion) {
    gsap.set(cards, { clearProps: "all", opacity: 1 });
    return;
  }

  cards.forEach((card, index) => {
    const preserveLayout =
      card.classList.contains("app-eco-node") || Boolean(card.style.transform?.includes("translate"));

    if (preserveLayout) {
      gsap.set(card, { opacity: 0 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 94%",
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            duration: 0.65,
            ease: EASE_OUT,
            delay: (index % 8) * 0.04,
          });
        },
      });
      return;
    }

    gsap.set(card, { opacity: 0, y: 20 });
    ScrollTrigger.create({
      trigger: card,
      start: "top 94%",
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: EASE_OUT,
          delay: (index % 5) * 0.05,
        });
      },
    });
  });
}

function revealCarouselGroup(root, selector, reducedMotion) {
  const cards = qa(root, selector);
  if (!cards.length) return;

  const trigger = cards[0].parentElement ?? cards[0];
  cards.forEach((card) => card.classList.add("mkt-carousel-card"));

  if (reducedMotion) {
    gsap.set(cards, { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 24 });
  ScrollTrigger.create({
    trigger,
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: EASE_OUT,
      });
    },
  });
}

function setupHero(root, config, reducedMotion) {
  const section = q(root, config.hero);
  if (!section) return;

  const title = qa(section, config.heroTitle);
  const desc = qa(section, config.heroDesc);
  const actions = q(section, config.heroActions);
  const bg = q(section, config.heroBg);

  if (reducedMotion) {
    gsap.set([...title, ...desc, actions, bg], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(bg, { scale: 1.12, opacity: 0, transformOrigin: "center right" });
  gsap.set(title, { opacity: 0, y: 48, rotateX: 12, transformPerspective: 900 });
  gsap.set(desc, { opacity: 0, y: 32 });
  if (actions) gsap.set(actions, { opacity: 0, y: 28 });

  const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });
  tl.to(bg, { opacity: 1, scale: 1, duration: 1.4, ease: EASE_OUT }, 0)
    .to(title, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 }, 0.2)
    .to(desc, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, "-=0.5");

  if (actions) {
    tl.to(actions, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
  }

  if (bg) {
    gsap.to(bg, {
      y: -28,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  }
}

function setupSectionHeads(root, config, reducedMotion) {
  const heads = qa(root, config.sectionHeads);
  if (!heads.length) return;

  heads.forEach((head) => {
    head.classList.add("mkt-section-head");
    if (!head.querySelector(".mkt-energy-line")) {
      const line = document.createElement("span");
      line.className = "mkt-energy-line";
      line.setAttribute("aria-hidden", "true");
      head.appendChild(line);
    }
  });

  if (reducedMotion) {
    gsap.set(heads, { clearProps: "all", opacity: 1 });
    return;
  }

  heads.forEach((head) => {
    gsap.set(head, { opacity: 0, x: -36 });
    ScrollTrigger.create({
      trigger: head,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(head, { opacity: 1, x: 0, duration: 0.85, ease: EASE_OUT });
        const line = head.querySelector(".mkt-energy-line");
        if (line) {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: EASE_OUT, delay: 0.15 });
        }
      },
    });
  });
}

function setupCardReveals(root, config, reducedMotion) {
  const revealOnly = config.revealOnly ?? [];
  const carouselGroups = config.carouselGroups ?? [];
  const interactiveCards = config.cards.flatMap((sel) => qa(root, sel));
  const simpleCards = revealOnly.flatMap((sel) => qa(root, sel));

  if (!interactiveCards.length && !simpleCards.length && !carouselGroups.length) return;

  markInteractiveCards(root, config.cards);

  if (reducedMotion) {
    gsap.set([...interactiveCards, ...simpleCards], { clearProps: "all", opacity: 1 });
    carouselGroups.forEach((sel) => gsap.set(qa(root, sel), { clearProps: "all", opacity: 1 }));
    return interactiveCards;
  }

  interactiveCards.forEach((card, index) => {
    const fromX = index % 2 === 0 ? -40 : 40;
    gsap.set(card, {
      opacity: 0,
      y: 48,
      x: fromX * 0.3,
      rotateY: fromX > 0 ? -6 : 6,
      scale: 0.96,
      transformPerspective: 1000,
    });

    ScrollTrigger.create({
      trigger: card,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.85,
          ease: EASE_BACK,
          delay: (index % 4) * 0.06,
        });
      },
    });
  });

  revealSimpleCards(simpleCards, reducedMotion);
  carouselGroups.forEach((sel) => revealCarouselGroup(root, sel, reducedMotion));

  return interactiveCards;
}

function setupCardTilt(cards, reducedMotion) {
  if (reducedMotion || !cards.length) return () => {};

  const cleanups = cards.map((card) => {
    card.classList.add("mkt-tilt-card");
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 14,
        rotateX: -y * 10,
        scale: 1.03,
        transformPerspective: 900,
        duration: 0.35,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        ease: EASE_OUT,
      });
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  });

  return () => cleanups.forEach((fn) => fn());
}

function setupStats(root, config, reducedMotion) {
  if (!config.stats) return;
  const statEls = qa(root, config.stats);
  if (!statEls.length) return;

  statEls.forEach((el) => {
    const raw = el.textContent;
    if (reducedMotion) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => animateCounter(el, raw),
    });
  });
}

function setupSectionsParallax(root, reducedMotion) {
  if (reducedMotion) return;
  const sections = qa(root, "section");
  sections.forEach((section, i) => {
    if (i === 0) return;
    const imgs = qa(section, "img");
    imgs.slice(0, 2).forEach((img) => {
      gsap.to(img, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    });
  });
}

export function initMarketingPageAnimations(root) {
  if (!root) return () => {};

  const config = getPageConfig(root);
  if (!config) return () => {};

  document.documentElement.classList.add("marketing-animated");

  let tiltCleanup = () => {};

  const ctx = gsap.context(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setupButtonShine(config.buttons);
    setupHero(root, config, reducedMotion);
    setupSectionHeads(root, config, reducedMotion);
    const interactiveCards = setupCardReveals(root, config, reducedMotion) ?? [];
    setupStats(root, config, reducedMotion);
    setupSectionsParallax(root, reducedMotion);

    tiltCleanup = setupCardTilt(interactiveCards, reducedMotion);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    tiltCleanup();
    ctx.revert();
    document.documentElement.classList.remove("marketing-animated");
  };
}

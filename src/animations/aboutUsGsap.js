import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "power3.out";
const EASE_EXPO = "expo.out";

function q(root, sel) {
  return root.querySelector(sel);
}

function qa(root, sel) {
  return gsap.utils.toArray(root.querySelectorAll(sel));
}

function drawStroke(path, config = {}) {
  if (!path) return;
  const length = path.getTotalLength?.() ?? 120;
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: config.duration ?? 1,
    ease: config.ease ?? EASE_OUT,
    delay: config.delay ?? 0,
    scrollTrigger: config.scrollTrigger,
  });
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

function animateCounter(el, raw) {
  const { end, suffix, decimals } = parseStatValue(raw);
  const state = { val: 0 };
  el.textContent = `${(0).toFixed(decimals)}${suffix}`;
  gsap.to(state, {
    val: end,
    duration: 1.1,
    ease: EASE_OUT,
    onUpdate: () => {
      el.textContent = `${state.val.toFixed(decimals)}${suffix}`;
    },
  });
}

function setupButtonShine(selector) {
  qa(document, selector).forEach((btn) => {
    if (btn.querySelector(".au-btn-shine")) return;
    const shine = document.createElement("span");
    shine.className = "au-btn-shine";
    shine.setAttribute("aria-hidden", "true");
    btn.classList.add("au-btn-shine-wrap");
    btn.appendChild(shine);
  });
}

function setupHeaderAnimations(isMobile) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.classList.add("site-header--about-au");
  setupButtonShine(".about-us-hero__btn");

  const topRow = header.querySelector(".w-full > .flex");
  const logo = header.querySelector("img[alt='RAD Kabel']");
  const navBar = header.querySelector("nav");

  gsap.set(header, { clearProps: "all" });

  ScrollTrigger.create({
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
}

function setupHero(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="hero"]');
  if (!section) return;

  const bg = q(section, ".about-us-hero__bg");
  const shade = q(section, ".about-us-hero__shade");
  const titleLines = qa(section, ".about-us-hero__title span");
  const accent = q(section, ".about-us-hero__title-accent");
  const divider = q(section, ".about-us-hero__divider");
  const desc = q(section, ".about-us-hero__desc");
  const actions = q(section, ".about-us-hero__actions");
  const features = qa(section, ".about-us-hero__feature");
  const featureRings = qa(section, ".au-icon-ring__path");
  const featurePulses = qa(section, ".au-icon-pulse");

  setupButtonShine(".about-us-hero__btn");

  if (reducedMotion) {
    gsap.set([bg, shade, ...titleLines, desc, actions, ...features], { clearProps: "all", opacity: 1 });
    return;
  }

  gsap.set(section, { opacity: 1 });
  gsap.set(bg, { scale: isMobile ? 1.04 : 1.1, transformOrigin: "center center" });
  gsap.set([shade, ...titleLines, divider, desc, actions], { opacity: 0 });
  gsap.set(titleLines, { y: 36 });
  gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(actions, { y: 28 });
  gsap.set(features, { opacity: 0, y: 24 });
  gsap.set(featureRings, { strokeDashoffset: (i, el) => el.getTotalLength?.() ?? 160 });
  gsap.set(featurePulses, { scale: 0.6, opacity: 0 });

  const loadTl = gsap.timeline({ defaults: { ease: EASE_EXPO } });
  loadTl
    .to(bg, { scale: 1, duration: 1.2, ease: EASE_OUT }, 0)
    .to(shade, { opacity: 1, duration: 0.8 }, 0.15)
    .to(titleLines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 }, 0.35)
    .to(
      accent,
      {
        textShadow: "0 0 24px rgba(224,25,33,0.95), 0 0 48px rgba(224,25,33,0.45)",
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      0.75,
    )
    .to(divider, { opacity: 1, scaleX: 1, duration: 0.75, ease: EASE_OUT }, 0.65)
    .to(desc, { opacity: 1, duration: 0.8 }, 0.85)
    .to(actions, { opacity: 1, y: 0, duration: 0.85, ease: EASE_OUT }, 1);

  if (!isMobile) {
    gsap.to(bg, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }

  ScrollTrigger.create({
    trigger: q(section, ".about-us-hero__features"),
    start: "top 92%",
    once: true,
    onEnter: () => {
      gsap.to(features, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: EASE_OUT,
      });
      gsap.to(featurePulses, {
        scale: 1,
        opacity: 0.35,
        duration: 0.8,
        stagger: 0.12,
        ease: EASE_OUT,
      });
      gsap.to(featureRings, {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.12,
        ease: EASE_OUT,
      });
    },
  });
}

function setupWhoWeAre(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="who-we-are"]');
  if (!section) return;

  const media = q(section, ".who-we-are__media");
  const image = q(section, ".who-we-are__image");
  const kicker = q(section, ".who-we-are__kicker");
  const titleLines = qa(section, ".who-we-are__title span");
  const paragraphs = qa(section, ".who-we-are__body p");
  const highlights = qa(section, ".who-we-are__highlight");
  const lines = qa(section, ".au-highlight-line");

  if (reducedMotion) return;

  gsap.set([kicker, ...titleLines, ...paragraphs, ...highlights], { opacity: 0, y: 28 });

  ScrollTrigger.create({
    trigger: media,
    start: "top 78%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        image,
        { clipPath: "polygon(0 100%, 0 100%, 0 0, 0 0)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
          duration: 1.1,
          ease: EASE_EXPO,
          onComplete: () => {
            gsap.set(image, { clearProps: "clipPath" });
          },
        },
      );
    },
  });

  if (!isMobile) {
    gsap.to(image, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: media,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  }

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: "top 68%", once: true },
      defaults: { ease: EASE_OUT, duration: 0.75 },
    })
    .to(kicker, { opacity: 1, y: 0 })
    .to(titleLines, { opacity: 1, y: 0, stagger: 0.12 }, "-=0.45")
    .to(paragraphs, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.35")
    .to(highlights, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.2");

  lines.forEach((line) => {
    gsap.set(line, { "--au-line-scale": 0 });
    gsap.to(line, {
      "--au-line-scale": 1,
      duration: 0.8,
      ease: EASE_OUT,
      scrollTrigger: { trigger: line.closest(".who-we-are__highlight"), start: "top 88%", once: true },
    });
  });
}

function setupMissionVision(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="mission-vision"]');
  if (!section) return;

  const visionBg = q(section, ".mission-vision__vision-bg");
  const visionHeading = q(section, ".mission-vision__panel--vision .mission-vision__heading");
  const visionRule = q(section, ".mission-vision__panel--vision .mission-vision__rule");
  const visionText = q(section, ".mission-vision__text");
  const missionHeading = q(section, ".mission-vision__panel--mission .mission-vision__heading");
  const missionRule = q(section, ".mission-vision__panel--mission .mission-vision__rule");
  const cards = qa(section, ".mission-vision__card");
  const cardRings = qa(section, ".mission-vision__card .au-icon-ring__path");

  if (reducedMotion) return;

  gsap.set([visionHeading, missionHeading, visionText, ...cards], { opacity: 0, y: 24 });
  gsap.set([visionRule, missionRule], { scaleX: 0, transformOrigin: "left center" });
  gsap.set(cards, { scale: 0.94 });
  gsap.set(cardRings, { strokeDashoffset: (i, el) => el.getTotalLength?.() ?? 160 });

  if (!isMobile) {
    gsap.to(visionBg, {
      y: 24,
      scale: 1.06,
      transformOrigin: "center center",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.9,
      },
    });
  }

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: "top 70%", once: true },
      defaults: { ease: EASE_OUT, duration: 0.8 },
    })
    .to(visionHeading, { opacity: 1, y: 0 })
    .to(visionRule, { scaleX: 1, duration: 0.65 }, "-=0.5")
    .to(visionText, { opacity: 1, y: 0 }, "-=0.45")
    .to(missionHeading, { opacity: 1, y: 0 }, "-=0.55")
    .to(missionRule, { scaleX: 1, duration: 0.65 }, "-=0.55")
    .to(
      cards,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.14,
        duration: 0.85,
      },
      "-=0.35",
    )
    .to(
      cardRings,
      {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.12,
      },
      "-=0.55",
    );
}

function setupWhyChoose(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="why-choose"]');
  if (!section) return;

  const header = q(section, ".why-choose__header");
  const cards = qa(section, ".why-choose__card");
  const rings = qa(section, ".why-choose__card .au-icon-ring__path");
  const energyLine = q(section, ".au-energy-line");

  if (reducedMotion) return;

  gsap.set(header, { opacity: 0, y: 24 });
  gsap.set(cards, { opacity: 0, x: isMobile ? 0 : -36, y: isMobile ? 24 : 0 });
  gsap.set(rings, { strokeDashoffset: (i, el) => el.getTotalLength?.() ?? 160 });
  gsap.set(energyLine, { scaleX: 0, transformOrigin: "left center" });

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: "top 72%", once: true },
      defaults: { ease: EASE_OUT, duration: 0.8 },
    })
    .to(header, { opacity: 1, y: 0 })
    .to(energyLine, { scaleX: 1, duration: 1.1, ease: EASE_EXPO }, "-=0.4")
    .to(
      cards,
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.1,
        duration: 0.75,
      },
      "-=0.75",
    )
    .to(
      rings,
      {
        strokeDashoffset: 0,
        duration: 0.95,
        stagger: 0.08,
      },
      "-=0.55",
    );
}

function setupManufacturing(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="manufacturing"]');
  if (!section) return;

  const image = q(section, ".manufacturing-excellence__image");
  const playIcon = q(section, ".manufacturing-excellence__play-icon");
  const copyBits = qa(section, ".manufacturing-excellence__copy > *:not(.manufacturing-excellence__stats)");
  const stats = qa(section, ".manufacturing-excellence__stat");
  const statValues = qa(section, ".manufacturing-excellence__stat-value");

  if (reducedMotion) return;

  gsap.set(image, { scale: isMobile ? 1 : 1.08, transformOrigin: "center center" });
  gsap.set(copyBits, { opacity: 0, y: 22 });
  gsap.set(stats, { opacity: 0, y: 18 });
  gsap.set(qa(section, ".manufacturing-excellence__stat"), { "--au-divider-scale": 0 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 72%",
    once: true,
    onEnter: () => {
      gsap.to(image, { scale: 1, duration: 1.15, ease: EASE_OUT });
      gsap.to(copyBits, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: EASE_OUT });
      gsap.to(stats, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: EASE_OUT });
      stats.forEach((stat, i) => {
        gsap.to(stat, {
          "--au-divider-scale": 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: EASE_OUT,
        });
      });
      statValues.forEach((el) => {
        animateCounter(el, el.dataset.auValue ?? el.textContent);
      });
    },
  });

  gsap.to(playIcon, {
    boxShadow: "0 0 0 12px rgba(224,25,33,0.18), 0 0 32px rgba(224,25,33,0.35)",
    repeat: -1,
    yoyo: true,
    duration: 1.4,
    ease: "sine.inOut",
    scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play pause resume pause" },
  });
}

function setupValues(root, reducedMotion) {
  const section = q(root, '[data-au-section="values"]');
  if (!section) return;

  const header = q(section, ".our-values__header");
  const cards = qa(section, ".our-values__card");
  const rings = qa(section, ".our-values__card .au-icon-ring__path");

  if (reducedMotion) return;

  gsap.set(header, { opacity: 0, y: 20 });
  gsap.set(cards, { opacity: 0, y: 36 });
  gsap.set(qa(section, ".our-values__card-icon"), { opacity: 0, scale: 0.85 });
  gsap.set(qa(section, ".our-values__card-copy"), { opacity: 0, y: 12 });
  gsap.set(rings, { strokeDashoffset: (i, el) => el.getTotalLength?.() ?? 160 });

  gsap.to(header, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    ease: EASE_OUT,
    scrollTrigger: { trigger: section, start: "top 78%", once: true },
  });

  cards.forEach((card, index) => {
    const icon = q(card, ".our-values__card-icon");
    const copy = q(card, ".our-values__card-copy");
    const ring = rings[index];

    ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: EASE_OUT });
        gsap.to(ring, { strokeDashoffset: 0, duration: 0.95, ease: EASE_OUT });
        gsap.to(icon, { opacity: 1, scale: 1, duration: 0.65, delay: 0.08, ease: EASE_OUT });
        gsap.to(copy, { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: EASE_OUT });
      },
    });
  });
}

function setupCTA(root, isMobile, reducedMotion) {
  const section = q(root, '[data-au-section="cta"]');
  if (!section) return;

  const bg = q(section, ".about-cta__bg");
  const energy = q(section, ".au-cta-energy");
  const maskWords = qa(section, ".au-mask-word__inner");
  const text = q(section, ".about-cta__text");
  const actions = q(section, ".about-cta__actions");

  setupButtonShine(".about-cta__btn");

  if (reducedMotion) return;

  gsap.set(maskWords, { y: "110%" });
  gsap.set([text, actions], { opacity: 0, y: 22 });

  if (!isMobile) {
    gsap.to(bg, {
      y: 28,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.7,
      },
    });
  }

  if (energy) {
    gsap.to(energy, {
      backgroundPosition: "200% 50%",
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  }

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: "top 72%", once: true },
      defaults: { ease: EASE_EXPO },
    })
    .to(maskWords, { y: "0%", duration: 0.85, stagger: 0.045 })
    .to(text, { opacity: 1, y: 0, duration: 0.75, ease: EASE_OUT }, "-=0.35")
    .to(actions, { opacity: 1, y: 0, duration: 0.75, ease: EASE_OUT }, "-=0.45");
}

export function initAboutUsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("about-us-animated");

  let cleanupHeader = () => {
    document.querySelector(".site-header")?.classList.remove("site-header--about-au");
    document.documentElement.classList.remove("about-us-animated");
  };

  const ctx = gsap.context(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        setupHeaderAnimations(isMobile);
        setupButtonShine(".au-header-cta");
        setupHero(root, isMobile, reducedMotion);
        setupWhoWeAre(root, isMobile, reducedMotion);
        setupMissionVision(root, isMobile, reducedMotion);
        setupWhyChoose(root, isMobile, reducedMotion);
        setupManufacturing(root, isMobile, reducedMotion);
        setupValues(root, reducedMotion);
        setupCTA(root, isMobile, reducedMotion);

        return () => {
          cleanupHeader();
        };
      },
    );

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      cleanupHeader();
    };
  }, root);

  return () => {
    ctx.revert();
    cleanupHeader();
  };
}

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

function setupHeader(reducedMotion, moveY) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.classList.add("site-header--certifications-page");

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
  const section = q(root, ".cert-hero");
  if (!section) return () => {};

  const bg = q(section, ".cert-hero__bg");
  const shield = q(section, ".cert-hero__shield") ?? bg;
  const copy = q(section, ".cert-hero__copy");
  const titleLines = qa(section, ".cert-hero__title-line");
  const accents = qa(section, ".cert-hero__accent");
  const desc = q(section, ".cert-hero__desc");
  const actions = q(section, ".cert-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, shield, copy, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.05, transformOrigin: "center center" });
  gsap.set(shield, { opacity: 0, scale: 0.92, transformOrigin: "right center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(bg, { scale: 1, duration: 1.1, ease: EASE }, 0)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.18)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.42")
    .to(actions, { opacity: 1, y: 0, duration: dur }, "-=0.52")
    .to(
      shield,
      {
        opacity: 1,
        scale: 1,
        duration: dur + 0.15,
        ease: EASE,
        onStart: () => {
          gsap.fromTo(
            shield,
            { filter: "drop-shadow(0 0 0 rgba(229, 9, 20, 0))" },
            {
              filter: "drop-shadow(0 0 28px rgba(229, 9, 20, 0.35))",
              duration: 0.6,
              yoyo: true,
              repeat: 1,
              onComplete: () => gsap.set(shield, { clearProps: "filter" }),
            },
          );
        },
      },
      "-=0.75",
    );

  gsap.fromTo(
    accents,
    { textShadow: "0 0 0 rgba(229, 9, 20, 0)" },
    {
      textShadow: "0 0 16px rgba(229, 9, 20, 0.42), 0 0 32px rgba(229, 9, 20, 0.18)",
      duration: 0.55,
      delay: 0.5,
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

function setupOurCertifications(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".cert-our-section");
  if (!section) return;

  const feature = q(section, ".cert-our-section__feature");
  const featureImg = q(section, ".cert-our-section__feature-img");
  const featureCopy = q(section, ".cert-our-section__feature-copy");
  const cards = qa(section, ".cert-our-section__card");

  if (reducedMotion) {
    resetVisible([feature, featureCopy, ...cards]);
    if (featureImg) gsap.set(featureImg, { clearProps: "clipPath" });
    return;
  }

  gsap.set(featureImg, { opacity: 0, x: -moveX, clipPath: "inset(0 100% 0 0)" });
  gsap.set(featureCopy, { opacity: 0, y: moveY });
  gsap.set(cards, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(featureImg, {
        opacity: 1,
        x: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: dur + 0.1,
        ease: EASE,
        onComplete: () => gsap.set(featureImg, { clearProps: "clipPath" }),
      });
      gsap.to(featureCopy, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.12 });
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

function setupJourney(root, reducedMotion, moveX, moveY, dur) {
  const section = q(root, ".cert-journey");
  if (!section) return;

  const head = q(section, ".cert-journey__head");
  const steps = qa(section, ".cert-journey__step");
  const desktopArrows = qa(section, ".cert-journey__arrow--desktop");
  const mobileArrows = qa(section, ".cert-journey__arrow--mobile");

  if (reducedMotion) {
    resetVisible([head, ...steps, ...desktopArrows, ...mobileArrows]);
    qa(section, ".cert-journey__circle").forEach((c) => gsap.set(c, { scale: 1 }));
    return;
  }

  gsap.set(head, { opacity: 0, y: moveY });
  steps.forEach((step) => {
    gsap.set(step, { opacity: 0, x: -moveX });
    const circle = q(step, ".cert-journey__circle");
    if (circle) gsap.set(circle, { scale: 0.8, opacity: 0 });
  });
  gsap.set(desktopArrows, { opacity: 0, scale: 0.85, visibility: "visible" });
  gsap.set(mobileArrows, { opacity: 0, scale: 0.85, visibility: "visible" });

  const revealArrows = () => {
    gsap.to(desktopArrows, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: EASE,
      overwrite: "auto",
    });
    if (mobileArrows.length) {
      gsap.to(mobileArrows, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: EASE,
        overwrite: "auto",
      });
    }
  };

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: dur, ease: EASE });

      const tl = gsap.timeline({ delay: 0.1, onComplete: revealArrows });
      steps.forEach((step, i) => {
        const circle = q(step, ".cert-journey__circle");
        tl.to(
          step,
          { opacity: 1, x: 0, duration: dur * 0.85, ease: EASE },
          i === 0 ? 0 : "-=0.32",
        );
        if (circle) {
          tl.to(circle, { scale: 1, opacity: 1, duration: 0.55, ease: EASE }, "<+=0.06");
        }
      });
    },
  });
}

function setupTesting(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".cert-testing");
  if (!section) return;

  const head = q(section, ".cert-testing__head");
  const cards = qa(section, ".cert-testing__card");
  const images = qa(section, ".cert-testing__img");

  if (reducedMotion) {
    resetVisible([head, ...cards]);
    images.forEach((img) => gsap.set(img, { clearProps: "clipPath" }));
    return;
  }

  gsap.set(head, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });
  images.forEach((img) => gsap.set(img, { clipPath: "inset(0 100% 0 0)" }));

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
        delay: 0.1,
      });
      gsap.to(images, {
        clipPath: "inset(0 0% 0 0)",
        duration: dur + 0.05,
        stagger,
        ease: EASE,
        delay: 0.15,
        onComplete: () => images.forEach((img) => gsap.set(img, { clearProps: "clipPath" })),
      });
    },
  });
}

function setupMeanings(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".cert-meanings");
  if (!section) return;

  const titleLines = qa(section, ".cert-meanings__title-line");
  const cols = qa(section, ".cert-meanings__col");

  if (reducedMotion) {
    resetVisible([...titleLines, ...cols]);
    return;
  }

  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(cols, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(titleLines, { opacity: 1, x: 0, duration: dur, stagger: stagger * 0.95, ease: EASE });
      gsap.to(cols, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.12,
        onComplete: () => {
          cols.forEach((col, i) => {
            const icon = q(col, ".cert-meanings__icon");
            if (!icon) return;
            gsap.fromTo(
              icon,
              { scale: 1 },
              { scale: 1.06, duration: 0.32, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.05 },
            );
          });
        },
      });
    },
  });
}

function setupLab(root, reducedMotion, moveX, moveY, dur, stagger) {
  const section = q(root, ".cert-lab");
  if (!section) return;

  const head = q(section, ".cert-lab__head");
  const cards = qa(section, ".cert-lab__card");

  if (reducedMotion) {
    resetVisible([head, ...cards]);
    return;
  }

  gsap.set(head, { opacity: 0, y: moveY });
  gsap.set(cards, { opacity: 0, x: moveX });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(head, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupStats(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".cert-stats");
  if (!section) return;

  const inner = q(section, ".cert-stats__inner");
  const items = qa(section, ".cert-stats__item");
  const nums = qa(section, ".cert-stats__num");
  const icons = qa(section, ".cert-stats__icon");

  const countRaw = ["100%", "25+", "99.97%", "1000+"];

  if (reducedMotion) {
    resetVisible([inner, ...items]);
    nums.forEach((el, i) => {
      if (countRaw[i]) el.textContent = countRaw[i];
    });
    return;
  }

  gsap.set(inner, { opacity: 0, y: moveY });
  gsap.set(items, { opacity: 0, y: moveY * 0.75 });
  nums.forEach((el, i) => {
    const raw = countRaw[i];
    if (!raw) return;
    const { suffix, decimals } = parseStatValue(raw);
    el.textContent = `${(0).toFixed(decimals)}${suffix}`;
  });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(inner, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.1,
        onComplete: () => {
          nums.forEach((el, i) => {
            const raw = countRaw[i];
            if (raw) animateCounter(el, raw, 1);
          });
          icons.forEach((icon, i) => {
            gsap.fromTo(
              icon,
              { scale: 1 },
              { scale: 1.08, duration: 0.35, ease: EASE, yoyo: true, repeat: 1, delay: 0.15 + i * 0.08 },
            );
          });
        },
      });
    },
  });
}

function setupDownload(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".cert-download");
  if (!section) return;

  const title = q(section, ".cert-download__title");
  const desc = q(section, ".cert-download__desc");
  const cards = qa(section, ".cert-download__card");
  const allBtn = q(section, ".cert-download__all-btn");

  if (reducedMotion) {
    resetVisible([title, desc, ...cards, allBtn]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(desc, { opacity: 0, y: moveY * 0.75 });
  gsap.set(cards, { opacity: 0, y: moveY });
  if (allBtn) gsap.set(allBtn, { opacity: 0, y: moveY * 0.65 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.08 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.14,
      });
      if (allBtn) {
        gsap.to(allBtn, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.28 });
      }
    },
  });
}

function setupVerify(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".cert-verify");
  if (!section) return () => {};

  const title = q(section, ".cert-verify__title");
  const desc = q(section, ".cert-verify__desc");
  const fields = qa(section, ".cert-verify__field");
  const submit = q(section, ".cert-verify__submit");
  const badge = q(section, ".cert-verify__badge");
  let badgeObserver = null;
  let badgePulsed = false;

  if (reducedMotion) {
    resetVisible([title, desc, ...fields, submit, badge]);
    return () => {};
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(desc, { opacity: 0, y: moveY * 0.75 });
  gsap.set(fields, { opacity: 0, y: moveY * 0.65 });
  if (submit) gsap.set(submit, { opacity: 0, y: moveY * 0.65 });
  gsap.set(badge, { opacity: 0, scale: 0.92 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.08 });
      gsap.to(fields, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger: stagger * 0.9,
        ease: EASE,
        delay: 0.12,
      });
      if (submit) {
        gsap.to(submit, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      }
      gsap.to(badge, { opacity: 1, scale: 1, duration: dur + 0.05, ease: EASE, delay: 0.18 });
    },
  });

  if (badge) {
    badgeObserver = new MutationObserver(() => {
      if (badgePulsed) return;
      if (badge.classList.contains("cert-verify__badge--active")) {
        badgePulsed = true;
        gsap.fromTo(
          badge,
          { scale: 1 },
          { scale: 1.06, duration: 0.38, ease: EASE, yoyo: true, repeat: 1 },
        );
      }
    });
    badgeObserver.observe(badge, { attributes: true, attributeFilter: ["class"] });
  }

  return () => {
    badgeObserver?.disconnect();
  };
}

function setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".cert-bottom-cta");
  if (!section) return;

  const bg = q(section, ".cert-bottom-cta__bg");
  const icon = q(section, ".cert-bottom-cta__icon");
  const titleLines = qa(section, ".cert-bottom-cta__title-line");
  const accent = q(section, ".cert-bottom-cta__accent");
  const desc = q(section, ".cert-bottom-cta__desc");
  const actions = qa(section, ".cert-bottom-cta__actions .cert-btn");

  if (reducedMotion) {
    resetVisible([bg, icon, ...titleLines, desc, ...actions]);
    return;
  }

  gsap.set(bg, { opacity: 0, scale: 1.04, transformOrigin: "center center" });
  gsap.set(icon, { opacity: 0, scale: 0.88 });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(bg, {
        opacity: 1,
        scale: 1,
        duration: dur + 0.15,
        ease: EASE,
        onComplete: () => {
          gsap.fromTo(
            bg,
            { filter: "drop-shadow(0 0 0 rgba(229, 9, 20, 0))" },
            {
              filter: "drop-shadow(0 0 24px rgba(229, 9, 20, 0.28))",
              duration: 0.65,
              yoyo: true,
              repeat: 1,
              onComplete: () => gsap.set(bg, { clearProps: "filter" }),
            },
          );
        },
      });
      gsap.to(icon, {
        opacity: 1,
        scale: 1,
        duration: dur,
        ease: EASE,
        delay: 0.1,
        onStart: () => {
          gsap.fromTo(
            icon,
            { boxShadow: "0 0 0 rgba(229, 9, 20, 0)" },
            {
              boxShadow: "0 0 28px rgba(229, 9, 20, 0.4)",
              duration: 0.55,
              yoyo: true,
              repeat: 1,
            },
          );
        },
      });
      gsap.to(titleLines, {
        opacity: 1,
        x: 0,
        duration: dur,
        stagger: stagger * 0.95,
        ease: EASE,
        delay: 0.15,
      });
      if (accent) {
        gsap.fromTo(
          accent,
          { textShadow: "0 0 0 rgba(229, 9, 20, 0)" },
          {
            textShadow: "0 0 16px rgba(229, 9, 20, 0.42), 0 0 32px rgba(229, 9, 20, 0.18)",
            duration: 0.55,
            delay: 0.45,
            yoyo: true,
            repeat: 1,
            onComplete: () => gsap.set(accent, { clearProps: "textShadow" }),
          },
        );
      }
      gsap.to(desc, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.25 });
      gsap.to(actions, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        delay: 0.32,
      });
    },
  });
}

function setupTrust(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".cert-trust");
  if (!section) return;

  const items = qa(section, ".cert-trust__item");

  if (reducedMotion) {
    resetVisible(items);
    return;
  }

  gsap.set(items, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
        onComplete: () => {
          items.forEach((item, i) => {
            const icon = q(item, ".cert-trust__icon");
            if (!icon) return;
            gsap.fromTo(
              icon,
              { scale: 1 },
              { scale: 1.07, duration: 0.35, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.07 },
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

export function initCertificationsAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("certifications-animated");
  document.body.classList.add("is-certifications-page");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 16 : 28;
  const stagger = isMobile ? 0.06 : 0.1;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroParallaxCleanup = () => {};
  let verifyObserverCleanup = () => {};

  const ctx = gsap.context(() => {
    setupHeader(reducedMotion, moveY);
    heroParallaxCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupOurCertifications(root, reducedMotion, moveX, moveY, stagger, dur);
    setupJourney(root, reducedMotion, moveX, moveY, dur);
    setupTesting(root, reducedMotion, moveX, moveY, stagger, dur);
    setupMeanings(root, reducedMotion, moveX, moveY, stagger, dur);
    setupLab(root, reducedMotion, moveX, moveY, dur, stagger);
    setupStats(root, reducedMotion, moveY, stagger, dur);
    setupDownload(root, reducedMotion, moveY, stagger, dur);
    verifyObserverCleanup = setupVerify(root, reducedMotion, moveY, stagger, dur) ?? (() => {});
    setupBottomCTA(root, reducedMotion, moveX, moveY, stagger, dur);
    setupTrust(root, reducedMotion, moveY, stagger, dur);
    setupFooter(reducedMotion, moveY, stagger, dur);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroParallaxCleanup();
    verifyObserverCleanup();
    ctx.revert();
    document.documentElement.classList.remove("certifications-animated");
    document.body.classList.remove("is-certifications-page");
    document.querySelector(".site-header")?.classList.remove("site-header--certifications-page");
  };
}

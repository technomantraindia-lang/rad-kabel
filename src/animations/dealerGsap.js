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

  header.classList.add("site-header--dealer-page");

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
  const section = q(root, ".dn-hero");
  if (!section) return () => {};

  const bg = q(section, ".dn-hero__bg");
  const titleLines = qa(section, ".dn-hero__title-line");
  const accents = qa(section, ".dn-accent");
  const desc = q(section, ".dn-hero__desc");
  const actions = q(section, ".dn-hero__actions");

  if (reducedMotion) {
    resetVisible([bg, ...titleLines, desc, actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.05, opacity: 0.85, transformOrigin: "center center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  const loadTl = gsap.timeline({ defaults: { ease: EASE } });
  loadTl
    .to(bg, { scale: 1, opacity: 1, duration: 1.05, ease: EASE }, 0)
    .to(titleLines, { opacity: 1, x: 0, duration: dur, stagger }, 0.2)
    .to(desc, { opacity: 1, y: 0, duration: dur }, "-=0.4")
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
  const section = q(root, ".dn-why");
  if (!section) return;

  const title = q(section, ".dn-section-title");
  const cards = qa(section, ".dn-why__card");

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

function setupWho(root, reducedMotion, moveX, moveY, stagger, dur) {
  const block = q(root, ".dn-who");
  if (!block) return;

  const title = q(block, ".dn-section-title");
  const cards = qa(block, ".dn-who__card");

  if (reducedMotion) {
    resetVisible([title, ...cards]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });

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
        delay: 0.14,
      });
    },
  });
}

function setupNetwork(root, reducedMotion, moveY, stagger, dur) {
  const block = q(root, ".dn-network");
  if (!block) return;

  const title = q(block, ".dn-section-title");
  const map = q(block, ".dn-network__map");
  const cta = q(block, ".dn-network__cta");
  const states = qa(block, ".dn-network__states li:not(.dn-network__more)");
  const pins = states.map((li) => q(li, "svg")).filter(Boolean);

  if (reducedMotion) {
    resetVisible([title, map, cta, ...states]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(map, { opacity: 0, scale: 0.94, transformOrigin: "center center" });
  gsap.set(cta, { opacity: 0, y: moveY * 0.6 });
  gsap.set(states, { opacity: 0, x: -14 });

  ScrollTrigger.create({
    trigger: block,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(map, { opacity: 1, scale: 1, duration: dur + 0.1, ease: EASE, delay: 0.1 });
      gsap.to(cta, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.22 });
      gsap.to(states, {
        opacity: 1,
        x: 0,
        duration: dur * 0.85,
        stagger: stagger * 0.65,
        ease: EASE,
        delay: 0.28,
        onComplete: () => {
          pins.forEach((pin, i) => {
            gsap.fromTo(
              pin,
              { scale: 1 },
              { scale: 1.35, duration: 0.28, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.07 },
            );
          });
        },
      });
    },
  });
}

function setupBenefits(root, reducedMotion, moveX, moveY, stagger, dur) {
  const section = q(root, ".dn-benefits");
  if (!section) return;

  const media = q(section, ".dn-benefits__media");
  const mediaImg = q(media, "img");
  const panel = q(section, ".dn-benefits__panel");
  const title = q(panel, ".dn-section-title");
  const items = qa(section, ".dn-benefits__list li");
  const checks = qa(section, ".dn-benefits__check");

  if (reducedMotion) {
    resetVisible([media, panel, title, ...items]);
    return;
  }

  gsap.set(media, { opacity: 0, x: -moveX });
  gsap.set(panel, { opacity: 0, x: moveX });
  gsap.set(title, { opacity: 0, y: moveY * 0.6 });
  gsap.set(items, { opacity: 0, y: moveY * 0.75 });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(media, { opacity: 1, x: 0, duration: dur + 0.05, ease: EASE });
      if (mediaImg) {
        gsap.fromTo(
          mediaImg,
          { scale: 1.04 },
          { scale: 1, duration: dur + 0.15, ease: EASE, delay: 0.08 },
        );
      }
      gsap.to(panel, { opacity: 1, x: 0, duration: dur + 0.05, ease: EASE, delay: 0.1 });
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.18 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.24,
        onComplete: () => {
          checks.forEach((check, i) => {
            gsap.fromTo(
              check,
              { scale: 1 },
              { scale: 1.2, duration: 0.3, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.08 },
            );
          });
        },
      });
    },
  });
}

function setupProcess(root, reducedMotion, moveX, moveY, dur) {
  const block = q(root, ".dn-process");
  if (!block) return;

  const title = q(block, ".dn-section-title");
  const steps = qa(block, ".dn-process__step");

  if (reducedMotion) {
    resetVisible([title, ...steps]);
    steps.forEach((step) => {
      const num = q(step, ".dn-process__num");
      const conn = q(step, ".dn-process__connector");
      if (num) gsap.set(num, { scale: 1 });
      if (conn) gsap.set(conn, { opacity: 1, scaleX: 1 });
    });
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  steps.forEach((step) => {
    gsap.set(step, { opacity: 0, x: -moveX });
    const num = q(step, ".dn-process__num");
    const conn = q(step, ".dn-process__connector");
    if (num) gsap.set(num, { scale: 0.8, opacity: 0 });
    if (conn) gsap.set(conn, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
  });

  ScrollTrigger.create({
    trigger: block,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });

      const tl = gsap.timeline({ delay: 0.12 });
      steps.forEach((step, i) => {
        const num = q(step, ".dn-process__num");
        const conn = q(step, ".dn-process__connector");
        tl.to(step, { opacity: 1, x: 0, duration: dur * 0.85, ease: EASE }, i === 0 ? 0 : "-=0.28");
        if (num) {
          tl.to(num, { scale: 1, opacity: 1, duration: 0.5, ease: EASE }, "<+=0.05");
        }
        if (conn) {
          tl.to(conn, { opacity: 1, scaleX: 1, duration: 0.45, ease: EASE }, "-=0.12");
        }
      });
    },
  });
}

function setupForm(root, reducedMotion, moveY, stagger, dur) {
  const wrap = q(root, ".dn-form-wrap");
  if (!wrap) return;

  const title = q(wrap, ".dn-section-title");
  const rows = qa(wrap, ".dn-form__row, .dn-field--full");
  const submit = q(wrap, ".dn-form__submit");
  const secure = q(wrap, ".dn-form__secure");

  if (reducedMotion) {
    resetVisible([title, ...rows, submit, secure]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(rows, { opacity: 0, y: moveY * 0.75 });
  gsap.set(submit, { opacity: 0, y: moveY * 0.6 });
  gsap.set(secure, { opacity: 0 });

  ScrollTrigger.create({
    trigger: wrap,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.12,
      });
      gsap.to(submit, { opacity: 1, y: 0, duration: dur, ease: EASE, delay: 0.28 });
      gsap.to(secure, { opacity: 1, duration: dur * 0.85, ease: EASE, delay: 0.38 });
    },
  });
}

function setupStories(root, reducedMotion, moveX, moveY, stagger, dur) {
  const block = q(root, ".dn-stories");
  if (!block) return;

  const title = q(block, ".dn-section-title");
  const cards = qa(block, ".dn-story");
  const quotes = qa(block, ".dn-story__quote");
  const stars = qa(block, ".dn-story__stars svg");
  const dots = q(block, ".dn-stories__dots");

  if (reducedMotion) {
    resetVisible([title, ...cards, dots]);
    return;
  }

  gsap.set(title, { opacity: 0, x: -moveX });
  gsap.set(cards, { opacity: 0, y: moveY });
  gsap.set(quotes, { scale: 0.88, opacity: 0 });
  gsap.set(stars, { opacity: 0, x: -10 });
  gsap.set(dots, { opacity: 0, y: moveY * 0.5 });

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
      gsap.to(stars, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: EASE,
        delay: 0.35,
      });
      gsap.to(dots, { opacity: 1, y: 0, duration: dur * 0.85, ease: EASE, delay: 0.42 });
    },
  });
}

function setupSupport(root, reducedMotion, moveY, stagger, dur) {
  const block = q(root, ".dn-support");
  if (!block) return;

  const cards = qa(block, ".dn-support__card");

  if (reducedMotion) {
    resetVisible(cards);
    return;
  }

  gsap.set(cards, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: block,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger,
        ease: EASE,
      });
    },
  });
}

function setupFaq(root, reducedMotion, moveY, stagger, dur) {
  const block = q(root, ".dn-faq");
  if (!block) return;

  const title = q(block, ".dn-section-title");
  const items = qa(block, ".dn-faq__list > li");

  if (reducedMotion) {
    resetVisible([title, ...items]);
    return;
  }

  gsap.set(title, { opacity: 0, y: moveY });
  gsap.set(items, { opacity: 0, y: moveY * 0.75 });

  ScrollTrigger.create({
    trigger: block,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(title, { opacity: 1, y: 0, duration: dur, ease: EASE });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: dur * 0.9,
        stagger,
        ease: EASE,
        delay: 0.1,
      });
    },
  });
}

function setupBottomCTA(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur) {
  const section = q(root, ".dn-cta");
  if (!section) return () => {};

  const bg = q(section, ".dn-cta__bg");
  const titleLines = qa(section, ".dn-cta__title-line");
  const accent = q(section, ".dn-cta__accent");
  const desc = q(section, ".dn-cta__inner p");
  const actions = qa(section, ".dn-cta__actions .dn-btn");

  if (reducedMotion) {
    resetVisible([bg, ...titleLines, desc, ...actions]);
    return () => {};
  }

  gsap.set(bg, { scale: 1.04, opacity: 0.9, x: moveX, transformOrigin: "right center" });
  gsap.set(titleLines, { opacity: 0, x: -moveX });
  gsap.set(desc, { opacity: 0, y: moveY });
  gsap.set(actions, { opacity: 0, y: moveY });

  ScrollTrigger.create({
    trigger: section,
    start: ST_START,
    once: true,
    onEnter: () => {
      gsap.to(bg, { scale: 1, opacity: 1, x: 0, duration: dur + 0.15, ease: EASE });
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
        delay: 0.3,
      });
    },
  });

  if (disableParallax || !bg) return () => {};

  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    gsap.to(bg, {
      x: relX * 6,
      duration: 0.45,
      ease: EASE,
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(bg, { x: 0, duration: 0.5, ease: EASE, overwrite: "auto" });
  };

  section.addEventListener("mousemove", onMove);
  section.addEventListener("mouseleave", onLeave);

  return () => {
    section.removeEventListener("mousemove", onMove);
    section.removeEventListener("mouseleave", onLeave);
    gsap.set(bg, { clearProps: "x" });
  };
}

function setupTrust(root, reducedMotion, moveY, stagger, dur) {
  const section = q(root, ".dn-trust");
  if (!section) return;

  const items = qa(section, ".dn-trust__item");

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
            const icon = q(item, ".dn-trust__icon");
            if (!icon) return;
            gsap.fromTo(
              icon,
              { scale: 1 },
              { scale: 1.08, duration: 0.32, ease: EASE, yoyo: true, repeat: 1, delay: i * 0.07 },
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

export function initDealerAnimations(root) {
  if (!root) return () => {};

  document.documentElement.classList.add("dealer-animated");
  document.body.classList.add("is-dealer-page");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const disableParallax = window.matchMedia("(max-width: 1023px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveX = isMobile ? 14 : 28;
  const moveY = isMobile ? 16 : 28;
  const stagger = isMobile ? 0.06 : 0.1;
  const dur = reducedMotion ? 0.35 : 0.8;

  let heroParallaxCleanup = () => {};
  let ctaParallaxCleanup = () => {};

  const ctx = gsap.context(() => {
    setupHeader(reducedMotion, moveY);
    heroParallaxCleanup = setupHero(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupWhy(root, reducedMotion, moveY, stagger, dur);
    setupWho(root, reducedMotion, moveX, moveY, stagger, dur);
    setupNetwork(root, reducedMotion, moveY, stagger, dur);
    setupBenefits(root, reducedMotion, moveX, moveY, stagger, dur);
    setupProcess(root, reducedMotion, moveX, moveY, dur);
    setupForm(root, reducedMotion, moveY, stagger, dur);
    setupStories(root, reducedMotion, moveX, moveY, stagger, dur);
    setupSupport(root, reducedMotion, moveY, stagger, dur);
    setupFaq(root, reducedMotion, moveY, stagger, dur);
    ctaParallaxCleanup = setupBottomCTA(root, reducedMotion, disableParallax, moveX, moveY, stagger, dur);
    setupTrust(root, reducedMotion, moveY, stagger, dur);
    setupFooter(reducedMotion, moveY, stagger, dur);

    ScrollTrigger.refresh();
  }, root);

  return () => {
    heroParallaxCleanup();
    ctaParallaxCleanup();
    ctx.revert();
    document.documentElement.classList.remove("dealer-animated");
    document.body.classList.remove("is-dealer-page");
    document.querySelector(".site-header")?.classList.remove("site-header--dealer-page");
  };
}

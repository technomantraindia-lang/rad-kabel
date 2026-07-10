import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ReferenceVideoScrollSection.css";

gsap.registerPlugin(ScrollTrigger);

/** Reference clip in `public/videos/` */
export const REFERENCE_PROMO_VIDEO = "c_e_ec_a_ba_f_f_cmp_.mp4";

/** Five cable “opens” synced to scroll (tune titles to match your film). */
export const WIRE_LAYERS = [
  {
    step: 1,
    title: "Outer black jacket",
    subtitle: "Corrugated sheath — heavy-duty mechanical protection.",
  },
  {
    step: 2,
    title: "Red insulation",
    subtitle: "High-grade insulation — dielectric barrier and safety.",
  },
  {
    step: 3,
    title: "Conductor tier 1",
    subtitle: "First layer of stranded electrolytic copper.",
  },
  {
    step: 4,
    title: "Conductor tier 2",
    subtitle: "Stacked stranding for stable current flow.",
  },
  {
    step: 5,
    title: "Core — 100% copper",
    subtitle: "Electrolytic copper heart — maximum conductivity.",
  },
];

function layerIndexForProgress(p) {
  const clamped = Math.min(1, Math.max(0, p));
  return Math.min(WIRE_LAYERS.length - 1, Math.floor(clamped * WIRE_LAYERS.length + 1e-6));
}

export default function ReferenceVideoScrollSection({
  anchorId = "technology",
  videoFilename = REFERENCE_PROMO_VIDEO,
}) {
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const videoRef = useRef(null);
  const railFillRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoSrc = `/videos/${encodeURIComponent(videoFilename)}`;

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    const railFill = railFillRef.current;

    if (!track || !pin || !video || videoError) return;

    let st = null;
    const mq = gsap.matchMedia();

    const setBodyActive = (on) => {
      document.body.classList.toggle("wire-story-active", on);
    };

    const seekToProgress = (p) => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      const t = Math.min(Math.max((p ?? 0) * d, 0), Math.max(d - 0.03, 0));
      /** Skip redundant seeks — fewer decodes while scrolling feels smoother */
      if (Math.abs(video.currentTime - t) < 0.035) return;
      try {
        video.currentTime = t;
      } catch {
        /* Safari quirks */
      }
    };

    const onMeta = () => ScrollTrigger.refresh();

    const onLoadedData = () => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        seekToProgress(0);
      });
    };

    video.pause();
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onLoadedData);

    mq.add(
      {
        isMobile: "(max-width: 860px)",
        isDesktop: "(min-width: 861px)",
      },
      (ctx) => {
        const mult = ctx.conditions.isMobile ? 4.25 : 5.25;
        let lastLayerIdx = -1;

        st = ScrollTrigger.create({
          trigger: track,
          pin: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * mult}`,
          /** Tie directly to scroll (no tween lag vs `scrub: 0.xx`) */
          scrub: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onEnter: () => setBodyActive(true),
          onLeave: () => setBodyActive(false),
          onEnterBack: () => setBodyActive(true),
          onLeaveBack: () => setBodyActive(false),
          onUpdate: (self) => {
            const p = self.progress;
            seekToProgress(p);
            if (railFill) railFill.style.width = `${Math.round(p * 10000) / 100}%`;
            const idx = layerIndexForProgress(p);
            if (idx !== lastLayerIdx) {
              lastLayerIdx = idx;
              setActiveLayer(idx);
            }
          },
        });

        return () => {
          st?.kill();
          st = null;
        };
      },
    );

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onLoadedData);
      setBodyActive(false);
      mq.revert();
    };
  }, [videoFilename, videoError]);

  const layer = WIRE_LAYERS[activeLayer];

  return (
    <section
      ref={trackRef}
      className="section wire-story-track"
      id={anchorId}
      aria-label="Cable construction — scroll to explore layers"
    >
      <div ref={pinRef} className="wire-story-pin">
        {videoError ? (
          <div className="wire-story-error" role="alert">
            <p>
              Could not load video. Add <strong>{videoFilename}</strong> to <code>public/videos/</code> (path{" "}
              <code>/videos/{videoFilename}</code>).
            </p>
          </div>
        ) : null}

        <video
          key={videoFilename}
          ref={videoRef}
          className="wire-story-video"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          decoding="async"
          aria-hidden
          onError={() => setVideoError(true)}
        >
          Your browser doesn’t support HTML5 video.
        </video>

        <div className="wire-story-vignette" aria-hidden />

        {/* Softens baked-in watermark / corner sparkle (Gemini-type) — re‑export clean MP4 to remove entirely */}
        <div className="wire-story-corner-mask" aria-hidden />

        <div className="wire-story-ui">
          <div className="wire-story-callout" role="status" aria-live="polite">
            <span className="wire-callout-step">
              {layer.step} / {WIRE_LAYERS.length}
            </span>
            <h3>{layer.title}</h3>
            <p>{layer.subtitle}</p>
          </div>

          <div className="wire-story-rail-wrap" aria-hidden>
            <div className="wire-story-rail">
              <span ref={railFillRef} className="wire-story-rail-fill" />
            </div>
            <ul className="wire-story-dots">
              {WIRE_LAYERS.map((_, i) => (
                <li key={i}>
                  <span className={i <= activeLayer ? "wire-dot wire-dot--on" : "wire-dot"} />
                </li>
              ))}
            </ul>
            <p className="wire-story-hint">Scroll — peel each element in sequence</p>
          </div>
        </div>
      </div>

      <div className="evo-cert-row wire-story-after" style={{ justifyContent: "center", gap: "12px 20px", marginTop: 48 }}>
        {["CE", "REACH", "RoHS", "CPR", "IS 694"].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <p className="evo-foot-line wire-story-after-foot" style={{ textAlign: "center", marginTop: 22 }}>
        RAD Wire &amp; Cable Ke Sath — <em>Zero Tension, Full Protection</em>
      </p>
    </section>
  );
}

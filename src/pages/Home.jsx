import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import CertificationBanner from "../components/CertificationBanner.jsx";
import RadIdentitySection from "../components/RadIdentitySection.jsx";
import WhyRadKabel from "../components/WhyRadKabel.jsx";
import ScienceOfSafety from "../components/ScienceOfSafety.jsx";
import EBeamTechnology from "../components/EBeamTechnology.jsx";
import ApplicationsSection from "../components/ApplicationsSection.jsx";
import ElectricianProgramBanner from "../components/ElectricianProgramBanner.jsx";
import PrecisionTestingSection from "../components/PrecisionTestingSection.jsx";
import SafeWiringCTA from "../components/SafeWiringCTA.jsx";
import CableVideosSection from "../components/CableVideosSection.jsx";
import { ProductCardsSection } from "./ProductsPage.jsx";

/** Home banner videos served from `public/videos/`. */
const HERO_BANNER_VIDEOS = [
  { filename: "banner.mp4", label: "RAD Kabel banner video" },
  { filename: "home-banner-9127.MOV", label: "RAD Kabel showcase video one" },
  { filename: "home-banner-9158.MOV", label: "RAD Kabel showcase video two" },
];
const HERO_SLIDE_DURATION = 8000;

function Hero() {
  const heroVideoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [muted, setMuted] = useState(true);
  const currentVideo = HERO_BANNER_VIDEOS[activeVideo];
  const heroSrc = `/videos/${encodeURIComponent(currentVideo.filename)}`;

  const showVideo = (index) => {
    setActiveVideo((index + HERO_BANNER_VIDEOS.length) % HERO_BANNER_VIDEOS.length);
  };

  const showPrevious = () => showVideo(activeVideo - 1);
  const showNext = () => showVideo(activeVideo + 1);

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;

    const play = () => {
      void el.play().catch(() => {});
    };

    el.load();
    play();
    el.addEventListener("loadeddata", play);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [heroSrc]);

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;
    el.muted = muted;
    el.defaultMuted = muted;
  }, [muted, activeVideo]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveVideo((current) => (current + 1) % HERO_BANNER_VIDEOS.length);
    }, HERO_SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeVideo]);

  return (
    <section className="hero-shell home-hero-shell" aria-label="RAD Kabel">
      <div className="hero-media">
        <video
          ref={heroVideoRef}
          className="hero-bg-video"
          src={heroSrc}
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={showNext}
          onError={showNext}
          aria-label={currentVideo.label}
        >
          Your browser does not support HTML5 video.
        </video>
      </div>

      <div className="home-hero-controls" aria-label="Home banner video controls">
        <button
          type="button"
          className="home-hero-control home-hero-control--sound"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "Turn banner sound on" : "Turn banner sound off"}
          title={muted ? "Sound on" : "Sound off"}
        >
          {muted ? <VolumeX aria-hidden /> : <Volume2 aria-hidden />}
        </button>

        <button
          type="button"
          className="home-hero-control"
          onClick={showPrevious}
          aria-label="Previous banner video"
        >
          <ChevronLeft aria-hidden />
        </button>

        <div className="home-hero-dots" role="group" aria-label="Choose banner video">
          {HERO_BANNER_VIDEOS.map((video, index) => (
            <button
              key={video.filename}
              type="button"
              className={`home-hero-dot${index === activeVideo ? " is-active" : ""}`}
              onClick={() => showVideo(index)}
              aria-label={`Show banner video ${index + 1}`}
              aria-current={index === activeVideo ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="home-hero-control"
          onClick={showNext}
          aria-label="Next banner video"
        >
          <ChevronRight aria-hidden />
        </button>
      </div>
    </section>
  );
}

const SHOWCASE_RINGS = [
  { scale: 0.28, opacity: 0.62, duration: 22 },
  { scale: 0.46, opacity: 0.78, duration: 26, reverse: true },
  { scale: 0.64, opacity: 0.95, hero: true, duration: 30 },
  { scale: 0.82, opacity: 0.72, duration: 34, reverse: true },
  { scale: 1, opacity: 0.58, duration: 38 },
  { scale: 1.18, opacity: 0.48, duration: 42, reverse: true },
];

function ShowcaseRings() {
  return (
    <div className="home-showcase-rings" aria-hidden="true">
      <div className="home-showcase-rings__stage">
        {SHOWCASE_RINGS.map((ring) => (
          <span
            key={ring.scale}
            className={`home-showcase-ring-orbit${ring.reverse ? " is-reverse" : ""}`}
            style={{
              "--ring-scale": ring.scale,
              "--orbit-duration": `${ring.duration}s`,
            }}
          >
            <span
              className={`home-showcase-ring${ring.hero ? " is-hero" : ""}`}
              style={{ "--ring-opacity": ring.opacity }}
            />
          </span>
        ))}
        <div className="home-showcase-router">
          <span className="home-showcase-router-soft" />
          <span className="home-showcase-router-ring" />
        </div>
      </div>
    </div>
  );
}

function FullWidthHomeImage() {
  return (
    <section className="home-full-width-image" aria-label="RAD Kabel product showcase">
      <div className="home-showcase-copy">
        <h2>
          <span className="home-showcase-line-nowrap">
            ZERO SMOKE. <span className="is-red">ZERO FIRE.</span>
          </span>
          <span className="home-showcase-line-nowrap">ZERO COMPROMISE.</span>
        </h2>
        <p>Advanced E-Beam technology wires engineered for modern electrical safety.</p>
      </div>
      <ShowcaseRings />
      <img src="/images/home-banner-followup.png" alt="RAD Kabel product showcase" />
    </section>
  );
}

export default function Home() {
  return (
    <main className="site-main relative z-0 font-sans">
      <Hero />
      <FullWidthHomeImage />
      <CertificationBanner />
      <RadIdentitySection />
      <WhyRadKabel />
      <ScienceOfSafety />
      <ProductCardsSection />
      <EBeamTechnology />
      <ApplicationsSection />
      <PrecisionTestingSection />
      <ElectricianProgramBanner />
      <CableVideosSection />
      <SafeWiringCTA />
    </main>
  );
}

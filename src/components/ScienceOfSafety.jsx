import { useLayoutEffect, useRef, useState } from "react";
import cableRender from "../assets/science-cable-render.png";

const LAYER_CALLOUTS = [
  {
    id: 1,
    label: "100% Electrolytic Copper",
    dot: { cx: 30, cy: 56 },
  },
  {
    id: 2,
    label: "High Grade Insulation Layer",
    dot: { cx: 44, cy: 50 },
  },
  {
    id: 3,
    label: "Flame Retardant Inner Sheath",
    dot: { cx: 58, cy: 46 },
  },
  {
    id: 4,
    label: "Durable Outer Sheath",
    dot: { cx: 76, cy: 38 },
  },
];

function buildConnectorPath(badgeX, badgeY, dotX, dotY, railY) {
  return `M ${dotX} ${dotY} L ${dotX} ${railY} L ${badgeX} ${railY} L ${badgeX} ${badgeY}`;
}

function CablePanelLines({ paths }) {
  return (
    <svg className="science-cable-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {paths.map(({ id, path, dot }) => (
        <g key={id}>
          <path className="science-connector-line" d={path} />
          <circle
            className="science-connector-dot"
            cx={dot.cx}
            cy={dot.cy}
            r="0.85"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

function LayerCallout({ id, label, badgeRef }) {
  return (
    <div className="science-layer-callout" role="note" aria-label={label}>
      <span ref={badgeRef} className="science-layer-badge">
        {id}
      </span>
      <p className="science-layer-text">{label}</p>
    </div>
  );
}

export default function ScienceOfSafety() {
  const visualRef = useRef(null);
  const badgeRefs = useRef([]);
  const [connectorPaths, setConnectorPaths] = useState(
    LAYER_CALLOUTS.map((item) => ({
      ...item,
      path: buildConnectorPath(item.dot.cx, 88, item.dot.cx, item.dot.cy, 82),
    })),
  );

  useLayoutEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const measure = () => {
      const visualRect = visual.getBoundingClientRect();
      if (!visualRect.width || !visualRect.height) return;

      const badgePoints = LAYER_CALLOUTS.map((item, index) => {
        const badge = badgeRefs.current[index];
        if (!badge) {
          return {
            id: item.id,
            dot: item.dot,
            x: item.dot.cx,
            y: 88,
          };
        }

        const badgeRect = badge.getBoundingClientRect();
        return {
          id: item.id,
          dot: item.dot,
          x: ((badgeRect.left + badgeRect.width / 2 - visualRect.left) / visualRect.width) * 100,
          y: ((badgeRect.top + badgeRect.height / 2 - visualRect.top) / visualRect.height) * 100,
        };
      });

      const railY = Math.min(...badgePoints.map((point) => point.y)) - 4.5;

      const nextPaths = badgePoints.map((point) => ({
        id: point.id,
        dot: point.dot,
        path: buildConnectorPath(point.x, point.y, point.dot.cx, point.dot.cy, railY),
      }));

      setConnectorPaths(nextPaths);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(visual);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="science-of-safety-section" aria-labelledby="science-of-safety-heading">
      <div className="science-of-safety-frame">
        <div className="science-of-safety-grid">
          <div className="science-of-safety-copy">
            <h2 id="science-of-safety-heading" className="science-of-safety-title">
              The Science of{" "}
              <span className="science-of-safety-title-accent">Safety</span>
            </h2>
            <p className="science-of-safety-desc">
              Every layer is engineered for maximum protection and performance.
            </p>
            <a href="#technology" className="science-of-safety-cta">
              Explore Technology
            </a>
          </div>

          <div ref={visualRef} className="science-of-safety-visual">
            <div className="science-cable-glow" aria-hidden />
            <img
              src={cableRender}
              alt="Cross-section of RAD Kabel showing copper core and insulation layers"
              className="science-cable-image"
              decoding="async"
            />
            <CablePanelLines paths={connectorPaths} />
            <div className="science-layer-row">
              {LAYER_CALLOUTS.map((item, index) => (
                <LayerCallout
                  key={item.id}
                  {...item}
                  badgeRef={(node) => {
                    badgeRefs.current[index] = node;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

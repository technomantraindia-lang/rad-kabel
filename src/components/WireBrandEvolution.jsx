import { useId, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const W = 720;
const H = 560;
const CX = 360;
const CY = 276;

/** Tilted-face anchor (three-quarter cable cross-section). */
const FX = 352;
const FY = 278;
const FACE_ROT = -8;

/** ~4 centre + ~12 mid + ~20 outer copper rods (poster reference). */
function useRealWireStrands() {
  return useMemo(() => {
    const out = [];
    const rings = [
      { R: 13.6, n: 7, r0: 8.95 },
      { R: 29.8, n: 12, r0: 8.4 },
      { R: 48.8, n: 20, r0: 7.5 },
    ];
    rings.forEach(({ R, n, r0 }, ri) => {
      for (let i = 0; i < n; i++) {
        const phase = ri === 0 ? 0 : 0;
        const a = phase + (i / n) * Math.PI * 2 + (ri === 0 ? 0 : Math.PI / n);
        out.push({
          x: Math.cos(a) * R,
          y: Math.sin(a) * R,
          r: r0 - ri * 0.32 + (i % 3) * 0.12,
          ySort: Math.sin(a) * R,
        });
      }
    });
    out.sort((a, b) => a.ySort - b.ySort);
    return out;
  }, []);
}

const STRAND_FINAL = [
  [0, 0],
  [22, 0],
  [-22, 0],
  [11, -19],
  [-11, -19],
  [11, 19],
  [-11, 19],
  [33.5, -11],
  [-33.5, -11],
  [33.5, 11],
  [-33.5, 11],
];

const BLOB_D =
  "M 362 92 " +
  "Q 478 104 548 176 Q 604 274 582 378 Q 552 478 446 498 " +
  "Q 356 510 274 478 Q 168 430 154 336 Q 136 246 174 174 " +
  "Q 220 112 294 94 Q 330 84 362 92 Z";

const RED_RING_RS = [];
for (let r = 36; r <= 202; r += 10) RED_RING_RS.push(r);

const STRAND_REAL_MINI = [
  [0, 0],
  [10, 0],
  [-10, 0],
  [5, -8.5],
  [-5, -8.5],
  [5, 8.5],
  [-5, 8.5],
  [18, 0],
  [-18, 0],
  [13, -12],
  [-13, -12],
  [13, 12],
  [-13, 12],
  [0, -16],
  [0, 16],
  [9.5, -15.5],
  [-9.5, -15.5],
  [9.5, 15.5],
  [-9.5, 15.5],
];

function RealWire3DGraphic({ cid, strands, fx, fy }) {
  return (
    <>
      <path
        d={`M ${fx - 52} ${fy + 74} Q ${fx + 128} ${fy + 94} ${fx + 282} ${fy + 226} Q ${fx + 250} ${fy + 246} ${fx - 18} ${fy + 182} Z`}
        fill={`url(#${cid("cyl")})`}
      />
      <path
        d={`M ${fx - 26} ${fy + 62} L ${fx + 234} ${fy + 206} L ${fx + 216} ${fy + 218} ${fx - 32} ${fy + 74} Z`}
        fill="#010101"
        opacity={0.42}
      />

      <motion.g
        animate={{ y: [0, -5, 0, 6, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform={`rotate(${FACE_ROT} ${fx} ${fy})`}>
          <ellipse
            cx={fx + 14}
            cy={fy + 17}
            rx={174}
            ry={158}
            fill={`url(#${cid("shellOut")})`}
            stroke="#45454a"
            strokeWidth={2.8}
          />
          <ellipse
            cx={fx - 38}
            cy={fy - 48}
            rx={118}
            ry={96}
            fill="rgba(255,255,255,0.09)"
          />
          <ellipse cx={fx + 28} cy={fy + 28} rx={178} ry={162} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={9} />

          <ellipse
            cx={fx + 9}
            cy={fy + 12}
            rx={134}
            ry={124}
            fill={`url(#${cid("shellIn")})`}
            stroke="#101012"
            strokeWidth={2.6}
          />
          <ellipse
            cx={fx + 4}
            cy={fy + 6}
            rx={128}
            ry={118}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1.1}
          />

          <ellipse cx={fx + 7} cy={fy + 8} rx={122} ry={112} fill="#050507" />

          {strands.map((s, i) => {
            const sx = fx + s.x * 0.96 + 4;
            const sy = fy + s.y * 0.94 + 4;
            const rad = s.r * 1.02;
            return (
              <g key={`st-${i}`}>
                <circle
                  cx={sx}
                  cy={sy}
                  r={rad}
                  fill={`url(#${cid("cuRod")})`}
                  stroke="#1a0c05"
                  strokeWidth={0.45}
                  strokeOpacity={0.9}
                  filter={`url(#${cid("beadMetal")})`}
                />
                <circle
                  cx={sx - rad * 0.32}
                  cy={sy - rad * 0.36}
                  r={rad * 0.22}
                  fill="rgba(255,252,246,0.45)"
                  opacity={0.88}
                  pointerEvents="none"
                />
              </g>
            );
          })}

          <ellipse cx={fx - 74} cy={fy - 70} rx={68} ry={52} fill="rgba(255,255,255,0.045)" />
        </g>
      </motion.g>

      <text x={40} y={48} fill="rgba(253,251,246,0.97)" fontSize={13} fontWeight={800} letterSpacing="0.26em">
        1 · REAL WIRE (3D)
      </text>
    </>
  );
}

export function WireBrandEvolution({ scrollProgress } = {}) {
  const raw = useId().replace(/:/g, "");
  const cid = (n) => `evo-${raw}-${n}`;
  const fallback = useMotionValue(0);
  const p = scrollProgress ?? fallback;
  const strands3d = useRealWireStrands();

  const opReal = useTransform(p, [0, 0.2, 0.46], [1, 1, 0]);
  const opBridge = useTransform(p, [0.24, 0.42, 0.56, 0.76], [0, 1, 1, 0]);
  const opFinal = useTransform(p, [0.55, 0.74, 1], [0, 1, 1]);

  const labReal = useTransform(p, [0, 0.06, 0.44, 0.54], [1, 1, 1, 0]);
  const labBridge = useTransform(p, [0.28, 0.42, 0.62, 0.76], [0, 1, 1, 0]);
  const labFinal = useTransform(p, [0.56, 0.72, 1], [0, 1, 1]);

  return (
    <div className="wire-brand-evo-visual">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={cid("bg")} cx="50%" cy="42%" r="72%">
            <stop offset="0%" stopColor="#101012" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id={cid("cu")} cx="34%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#f9eeda" />
            <stop offset="42%" stopColor="#d9a66a" />
            <stop offset="100%" stopColor="#673812" />
          </radialGradient>
          <radialGradient id={cid("cuRod")} cx="30%" cy="26%" r="68%" fx="22%" fy="16%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="6%" stopColor="#fff8e8" />
            <stop offset="18%" stopColor="#ffd798" />
            <stop offset="38%" stopColor="#d7843a" />
            <stop offset="62%" stopColor="#935522" />
            <stop offset="85%" stopColor="#3f1a07" />
            <stop offset="100%" stopColor="#0f0502" />
          </radialGradient>
          <filter id={cid("beadMetal")} x="-80%" y="-80%" width="260%" height="260%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.85" result="blur" />
            <feOffset in="blur" dx="2" dy="3.5" result="shadeMask" />
            <feFlood floodColor="#0a0503" floodOpacity={0.78} result="flood" />
            <feComposite in="flood" in2="shadeMask" operator="in" result="shade" />
            <feMerge>
              <feMergeNode in="shade" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={cid("shellOut")} x1="16%" y1="8%" x2="90%" y2="94%">
            <stop offset="0%" stopColor="#45454a" />
            <stop offset="32%" stopColor="#171718" />
            <stop offset="100%" stopColor="#010102" />
          </linearGradient>
          <linearGradient id={cid("shellIn")} x1="20%" y1="5%" x2="84%" y2="92%">
            <stop offset="0%" stopColor="#2c2c2f" />
            <stop offset="42%" stopColor="#0c0c0e" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id={cid("cyl")} x1="0%" y1="35%" x2="100%" y2="62%">
            <stop offset="0%" stopColor="#070707" />
            <stop offset="48%" stopColor="#121214" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${cid("bg")})`} rx={28} />

        <motion.g style={{ opacity: opReal }}>
          <RealWire3DGraphic cid={cid} strands={strands3d} fx={FX} fy={FY} />
        </motion.g>

        <motion.g style={{ opacity: opBridge }}>
          <text x={40} y={48} fill="rgba(245,243,239,0.95)" fontSize={13} fontWeight={800} letterSpacing="0.32em">
            TRANSFORMATION
          </text>
          <g transform={`translate(${152}, ${CY}) scale(0.68)`}>
            <circle r={132} fill="#181818" stroke="#3f3f41" strokeWidth={5} />
            <circle r={100} fill="#060606" stroke="#292929" strokeWidth={4} />
            {STRAND_REAL_MINI.map(([dx, dy], i) => (
              <circle key={`m-${i}`} cx={dx} cy={dy} r={i === 0 ? 14 : 10} fill={`url(#${cid("cu")})`} stroke="#573216" strokeWidth={1} />
            ))}
          </g>
          {[0, -26, 26, -13].map((dy, i) => (
            <line
              key={`ln-${i}`}
              x1={248}
              y1={CY + dy}
              x2={430}
              y2={CY + dy * 0.45}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={i === 0 ? 2 : 1.2}
            />
          ))}
          <g transform={`translate(${CX + 152}, ${CY})`}>
            <circle r={124} fill="none" stroke="rgba(120,18,34,0.55)" strokeWidth={2} />
            <circle r={96} fill="none" stroke="rgba(120,18,34,0.55)" strokeWidth={1.5} />
            <circle r={70} fill="none" stroke="rgba(120,18,34,0.6)" strokeWidth={1.25} />
            {STRAND_FINAL.map(([dx, dy], i) => (
              <circle key={`b-${i}`} cx={dx} cy={dy} r={13} fill="#dfd0b8" stroke="#9d7f58" strokeWidth={1} />
            ))}
          </g>
        </motion.g>

        <motion.g style={{ opacity: opFinal }}>
          <text x={40} y={48} fill="rgba(245,243,239,0.95)" fontSize={13} fontWeight={800} letterSpacing="0.32em">
            FINAL DESIGN · 2D
          </text>
          <g transform={`translate(${CX}, ${CY})`}>
            {RED_RING_RS.map((r) => (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke={`rgba(${96 + Math.min(r, 170) * 0.35}, ${14 + r * 0.04}, ${22 + r * 0.05}, ${0.22 + r * 0.0025})`}
                strokeWidth={1.2}
              />
            ))}
            {STRAND_FINAL.map(([dx, dy], i) => (
              <circle
                key={`f-${i}`}
                cx={dx}
                cy={dy}
                r={i === 0 ? 14 : 11.8}
                fill="#e9dfbf"
                stroke="#b08960"
                strokeWidth={1.15}
              />
            ))}
          </g>
          <motion.path
            d={BLOB_D}
            fill="rgba(255,255,255,0.035)"
            stroke="#ffffff"
            strokeWidth={2.85}
            strokeLinejoin="round"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            animate={{ rotate: [0, 2.8, -2.2, 0], scale: [1, 1.042, 1.018, 1] }}
            transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>

      <div className="wire-brand-label-stack" aria-live="polite">
        <motion.figure className="wire-brand-quote" style={{ opacity: labReal }}>
          <figcaption>1 · REAL WIRE (3D)</figcaption>
          <blockquote>Stepped matte black sheaths with multi-ring stranded copper conductors — top-left keyed light.</blockquote>
        </motion.figure>
        <motion.figure className="wire-brand-quote" style={{ opacity: labBridge }}>
          <figcaption>TRANSFORMATION</figcaption>
          <blockquote>3D to 2D conversion — simplified for clarity.</blockquote>
        </motion.figure>
        <motion.figure className="wire-brand-quote" style={{ opacity: labFinal }}>
          <figcaption>FINAL DESIGN · 2D</figcaption>
          <blockquote>The mark used across RAD visuals — radial protection rings &amp; white perimeter.</blockquote>
        </motion.figure>
      </div>
    </div>
  );
}

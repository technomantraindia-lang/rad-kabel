function IconBase({ children, className = "", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function InfraIconRing({ children, className = "", tone = "red" }) {
  return (
    <span className={`infra-icon-ring infra-icon-ring--${tone} ${className}`.trim()} aria-hidden>
      {children}
    </span>
  );
}

export function IconCopperDiscs({ className }) {
  return (
    <IconBase className={className}>
      <ellipse cx="12" cy="8" rx="7" ry="2.5" />
      <path d="M5 8v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V8" />
      <path d="M5 11v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" />
      <path d="M5 14v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" />
    </IconBase>
  );
}

export function IconWireSpool({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
    </IconBase>
  );
}

export function IconMicroscope({ className }) {
  return (
    <IconBase className={className}>
      <path d="M6 18h12" />
      <path d="M8 18l2-8h4l2 8" />
      <path d="M10 10V6a2 2 0 0 1 4 0v4" />
      <circle cx="16" cy="7" r="2" />
    </IconBase>
  );
}

export function IconBox({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" />
      <path d="M12 4v16M4 8l8 4 8-4" />
    </IconBase>
  );
}

export function IconFactory({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3 20V10l5 3V10l5 3V6l8 4v10" />
      <path d="M3 20h18" />
      <path d="M9 16h2M14 16h2" />
    </IconBase>
  );
}

export function IconProduction({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <path d="M10 12h4" />
      <path d="M7 9V5M17 9V5" />
    </IconBase>
  );
}

export function IconBeaker({ className }) {
  return (
    <IconBase className={className}>
      <path d="M9 3h6l-2 14H11L9 3z" />
      <path d="M8 10h8" />
    </IconBase>
  );
}

export function IconTruck({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3 8h11v8H3z" />
      <path d="M14 11h4l3 3v2h-7v-5z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </IconBase>
  );
}

export function IconBuilding({ className }) {
  return (
    <IconBase className={className}>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </IconBase>
  );
}

export function IconQuality({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7 0.9 5.3L12 15.8 7.2 17.6l0.9-5.3L4.3 8.6l5.3-.8L12 3z" />
    </IconBase>
  );
}

export function IconHexCheck({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 2l8 4.5v7L12 20l-8-6.5v-7L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

export function IconTarget({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </IconBase>
  );
}

export function IconClock({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}

export function IconNetwork({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7v4M8.5 14.5L6.8 16.2M15.5 14.5l1.7 1.7M12 11v3" />
    </IconBase>
  );
}

export function IconInventory({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16v12H4z" />
      <path d="M4 11h16M8 7V5h8v2" />
    </IconBase>
  );
}

export function IconDispatch({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h10l3-3v6l-3-3H5z" />
      <path d="M5 12V8h8" />
    </IconBase>
  );
}

export function IconMapIndia({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 4c2 3 5 3 6 6s-1 5-3 6-2 3-5 3-3-2-4-4-1-4 1-6 2-3 4-3 1-2 3-2 2 2 4 2 2-1 3-3 1-3-1-5-2-2-4-2z" />
    </IconBase>
  );
}

export function IconDealer({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 10h16v10H4z" />
      <path d="M8 10V6h8v4" />
      <path d="M12 14v4" />
    </IconBase>
  );
}

export function IconHardHat({ className, color = "currentColor" }) {
  return (
    <IconBase className={className} color={color}>
      <path d="M4 14c0-4 3.5-7 8-7s8 3 8 7" />
      <path d="M3 14h18v3H3z" />
      <path d="M12 7V4" />
    </IconBase>
  );
}

export function IconEfficient({ className, color = "currentColor" }) {
  return (
    <IconBase className={className} color={color}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </IconBase>
  );
}

export function IconWaste({ className, color = "currentColor" }) {
  return (
    <IconBase className={className} color={color}>
      <path d="M4 7h16l-1.5 12H5.5L4 7z" />
      <path d="M9 7V5h6v2M10 11v5M14 11v5" />
    </IconBase>
  );
}

export function IconLeaf({ className, color = "currentColor" }) {
  return (
    <IconBase className={className} color={color}>
      <path d="M12 21c5-4 7-9 7-14a7 7 0 0 0-14 0c0 5 2 10 7 14z" />
      <path d="M12 21V10" />
    </IconBase>
  );
}

export function IconPlay({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8l6 4-6 4V8z" />
    </svg>
  );
}

export function IconDownload({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 4v10M8 10l4 4 4-4" />
      <path d="M4 18h16" />
    </IconBase>
  );
}

export function IconArrowCircle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

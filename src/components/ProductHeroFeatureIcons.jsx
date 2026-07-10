const iconProps = {
  className: "pp-hero__strip-svg",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function IconStripFireResistant() {
  return (
    <svg {...iconProps}>
      <path
        d="M24 7 35 12 V23 C35 31.5 30.5 37.5 24 41 17.5 37.5 13 31.5 13 23 V12Z"
        stroke="#e50914"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 23 22 26.5 29.5 19"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStripThermal() {
  return (
    <svg {...iconProps}>
      <path
        d="M24 8v26"
        stroke="#e50914"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20 12c0 6 4 8 4 14s-4 8-4 14M28 12c0 6-4 8-4 14s4 8 4 14"
        stroke="#e50914"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="36" r="4" fill="#e50914" />
      <rect x="22" y="6" width="4" height="4" rx="1" fill="#e50914" />
    </svg>
  );
}

export function IconStripLongLife() {
  return (
    <svg {...iconProps}>
      <circle cx="24" cy="24" r="14" stroke="#e50914" strokeWidth="2.2" />
      <path
        d="M24 14v10l7 4"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStripPremiumCopper() {
  return (
    <svg {...iconProps}>
      <path d="M10 30h28v6H10z" fill="#b87333" stroke="#d4925a" strokeWidth="1.2" />
      <path d="M13 22h22v6H13z" fill="#c88442" stroke="#d4925a" strokeWidth="1.2" />
      <path d="M16 14h16v6H16z" fill="#d4954f" stroke="#e8a86a" strokeWidth="1.2" />
    </svg>
  );
}

export function IconStripConductivity() {
  return (
    <svg {...iconProps}>
      <circle cx="24" cy="24" r="14" stroke="#e50914" strokeWidth="2.2" />
      <path
        d="M26 14l-8 12h6l-2 10 10-14h-6l2-8z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuIconRing({ className = "" }) {
  return (
    <svg className={`au-icon-ring ${className}`.trim()} viewBox="0 0 60 60" aria-hidden>
      <circle className="au-icon-ring__path" cx="30" cy="30" r="26" />
    </svg>
  );
}

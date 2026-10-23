/** ✓ dentro de um círculo que se desenha ao aparecer (confirmações de envio). */
export function CheckDesenhado({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`anim-check ${className}`}
    >
      <circle cx="12" cy="12" r="10" pathLength={1} />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" pathLength={1} />
    </svg>
  );
}

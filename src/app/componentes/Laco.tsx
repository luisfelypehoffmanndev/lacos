import { useId } from 'react';

/** As cores da fita do logo, na ordem do letreiro. */
const FITA = ['#0C2E8B', '#2B79F6', '#6ACAF2', '#D6AFF8', '#FAA048', '#F9BB2D'];

function Gradiente({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.4">
      {FITA.map((cor, i) => (
        <stop key={cor} offset={i / (FITA.length - 1)} stopColor={cor} />
      ))}
    </linearGradient>
  );
}

/**
 * O laço: a fita do logo dando voltas. É o único elemento decorativo do app.
 * - `grande`: fundo da tela de boas-vindas (ref. 02).
 * - `fina`: um fio atrás da saudação do Início.
 */
export function Laco({ variante, className = '' }: { variante: 'grande' | 'fina'; className?: string }) {
  const id = useId();
  if (variante === 'fina') {
    return (
      <svg aria-hidden viewBox="0 0 240 240" fill="none" className={className}>
        <defs>
          <Gradiente id={id} />
        </defs>
        <path
          d="M20 -10 C 40 90, 200 40, 170 120 C 140 200, 60 150, 110 100 C 160 50, 250 120, 260 200"
          stroke={`url(#${id})`}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" fill="none" className={className}>
      <defs>
        <Gradiente id={id} />
      </defs>
      <g strokeLinecap="round">
        <path d="M-60 150 C 90 -30 330 20 300 190 C 270 340 40 300 80 170 C 110 70 330 60 460 230" stroke="#3D72F2" strokeWidth="30" />
        <path d="M310 -40 C 450 70 430 270 330 360" stroke="#8ED7EE" strokeWidth="16" opacity="0.55" />
        <path
          d="M-50 700 C 60 560 260 590 250 700 C 240 810 70 790 110 690 C 150 590 340 590 450 740"
          stroke={`url(#${id})`}
          strokeWidth="24"
        />
      </g>
    </svg>
  );
}

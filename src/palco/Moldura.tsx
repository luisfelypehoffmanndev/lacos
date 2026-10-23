import type { ReactNode } from 'react';

export const LARGURA_TELA = 390;
export const ALTURA_TELA = 844;
const BORDA = 12;
export const LARGURA_MOLDURA = LARGURA_TELA + BORDA * 2;
export const ALTURA_MOLDURA = ALTURA_TELA + BORDA * 2;

function Sinal() {
  return (
    <svg aria-hidden width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function Bateria() {
  return (
    <svg aria-hidden width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
      <path d="M24.5 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** Celular de 390 × 844 com ilha dinâmica, barra de status e indicador de início. */
export function Moldura({ children, topoEscuro, escala = 1 }: { children: ReactNode; topoEscuro: boolean; escala?: number }) {
  const cor = topoEscuro ? 'text-white' : 'text-tinta';
  return (
    <div style={{ width: LARGURA_MOLDURA * escala, height: ALTURA_MOLDURA * escala }} className="shrink-0">
      <div
        style={{ width: LARGURA_MOLDURA, height: ALTURA_MOLDURA, padding: BORDA, transform: `scale(${escala})` }}
        className="origin-top-left rounded-[62px] bg-[#06143f] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.08)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[50px] bg-fundo" style={{ transform: 'translateZ(0)' }}>
          {children}
          <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 z-[60] flex h-[54px] items-center justify-between px-8 pt-1 ${cor}`}>
            <span className="w-14 text-center text-[16px] font-semibold">9:41</span>
            <span className="h-[37px] w-[124px] rounded-full bg-black" />
            <span className="flex w-14 items-center justify-center gap-1.5">
              <Sinal />
              <Bateria />
            </span>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-2 z-[60] flex justify-center">
            <span className={`h-[5px] w-[134px] rounded-full ${topoEscuro ? 'bg-white/80' : 'bg-tinta/80'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

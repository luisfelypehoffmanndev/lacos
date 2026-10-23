import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useNavegacao } from '../navegacao';

interface Props {
  aberta: boolean;
  aoFechar: () => void;
  titulo: string;
  children: ReactNode;
}

/** Folha que sobe da base. Desenhada na camada do app para não sair da moldura do celular. */
export function Folha({ aberta, aoFechar, titulo, children }: Props) {
  const { camada } = useNavegacao();
  const idTitulo = useId();
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberta) return;
    painel.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && aoFechar();
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberta, aoFechar]);

  if (!aberta || !camada) return null;

  return createPortal(
    <div className="absolute inset-0 flex flex-col justify-end">
      <div aria-hidden className="anim-surgir absolute inset-0 bg-tinta/45" onClick={aoFechar} />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        className="anim-subir relative flex max-h-[88%] flex-col rounded-t-[28px] bg-superficie shadow-[0_-12px_40px_-12px_rgba(18,24,74,0.35)] outline-none"
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-linha" />
        <div className="flex items-start gap-3 px-5 pt-3 pb-3">
          <h2 id={idTitulo} className="t-md flex-1 pt-1.5">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-fundo text-tinta-suave"
          >
            <X size={20} />
          </button>
        </div>
        <div className="sem-barra overflow-y-auto px-5 pb-[calc(24px+var(--base-segura))]">{children}</div>
      </div>
    </div>,
    camada,
  );
}

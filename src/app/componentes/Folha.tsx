import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useNavegacao } from '../navegacao';
import { movimentoReduzido } from '../vibrar';

interface Props {
  aberta: boolean;
  aoFechar: () => void;
  titulo: string;
  children: ReactNode;
}

const DURACAO_SAIDA = 200;

/** Folha que sobe da base. Desenhada na camada do app para não sair da moldura do celular. */
export function Folha({ aberta, aoFechar, titulo, children }: Props) {
  const { camada } = useNavegacao();
  const idTitulo = useId();
  const painel = useRef<HTMLDivElement>(null);
  const foiAberta = useRef(false);
  // Guarda o último conteúdo: quem abriu a folha costuma limpar o estado ao fechar.
  const ultimo = useRef({ titulo, children });
  const [saindo, setSaindo] = useState(false);

  if (aberta) ultimo.current = { titulo, children };

  useEffect(() => {
    if (aberta) {
      foiAberta.current = true;
      setSaindo(false);
      // Sem rolar: a folha ainda está fora da tela, subindo, e o navegador puxaria o app junto.
      painel.current?.focus({ preventScroll: true });
      const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && aoFechar();
      document.addEventListener('keydown', aoTeclar);
      return () => document.removeEventListener('keydown', aoTeclar);
    }
    if (!foiAberta.current || movimentoReduzido()) return;
    // Ao fechar, a folha desce antes de sumir. Ela já não é um diálogo nem recebe toques.
    setSaindo(true);
    const t = setTimeout(() => setSaindo(false), DURACAO_SAIDA);
    return () => clearTimeout(t);
  }, [aberta, aoFechar]);

  if (!camada || (!aberta && !saindo)) return null;
  const { titulo: tituloVisivel, children: conteudo } = aberta ? { titulo, children } : ultimo.current;

  return createPortal(
    <div className="absolute inset-0 flex flex-col justify-end" aria-hidden={!aberta || undefined} {...(aberta ? {} : { inert: '' })}>
      <div aria-hidden className={`absolute inset-0 bg-tinta/45 ${aberta ? 'anim-surgir' : 'anim-sumir'}`} onClick={aoFechar} />
      <div
        ref={painel}
        role={aberta ? 'dialog' : undefined}
        aria-modal={aberta || undefined}
        aria-labelledby={idTitulo}
        tabIndex={-1}
        className={`relative flex max-h-[88%] flex-col rounded-t-[28px] bg-superficie shadow-[0_-12px_40px_-12px_rgba(14,31,85,0.35)] outline-none ${
          aberta ? 'anim-subir' : 'anim-descer'
        }`}
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-linha" />
        <div className="flex items-start gap-3 px-5 pt-3 pb-3">
          <h2 id={idTitulo} className="t-md flex-1 pt-1.5">
            {tituloVisivel}
          </h2>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar"
            className="tocavel grid size-11 shrink-0 place-items-center rounded-full bg-fundo text-tinta-suave"
          >
            <X size={20} />
          </button>
        </div>
        <div className="sem-barra overflow-y-auto px-5 pb-[calc(24px+var(--base-segura))]">{conteudo}</div>
      </div>
    </div>,
    camada,
  );
}

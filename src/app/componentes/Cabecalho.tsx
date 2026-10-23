import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavegacao } from '../navegacao';

interface Props {
  titulo: string;
  /** Use false quando o título principal da tela estiver no conteúdo (ex.: nome do psicólogo). */
  comoTitulo?: boolean;
  direita?: ReactNode;
}

export function Cabecalho({ titulo, comoTitulo = true, direita }: Props) {
  const { voltar, podeVoltar } = useNavegacao();
  const Titulo = comoTitulo ? 'h1' : 'p';
  return (
    <header className="sticky top-0 z-10 bg-fundo/95 pt-[var(--topo-seguro)] backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-3">
        {podeVoltar ? (
          <button
            type="button"
            onClick={voltar}
            aria-label="Voltar"
            className="grid size-11 place-items-center rounded-full border border-linha bg-superficie"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <span className="size-11" />
        )}
        <Titulo className="t-md flex-1 truncate text-center">{titulo}</Titulo>
        <div className="flex size-11 items-center justify-center">{direita}</div>
      </div>
    </header>
  );
}

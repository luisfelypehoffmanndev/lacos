import { UserRound } from 'lucide-react';
import type { CorFita } from '../../estado/tipos';

const CORES: Record<CorFita, string> = {
  azul: 'bg-azul text-white',
  lilas: 'bg-lilas text-tinta',
  laranja: 'bg-laranja text-tinta',
  ciano: 'bg-ciano-claro text-tinta',
  amarelo: 'bg-amarelo-claro text-tinta',
};

interface Props {
  nome: string;
  foto?: string | null;
  cor?: CorFita;
  tamanho?: number;
  className?: string;
}

/** Foto, ou a inicial sobre uma cor da fita. Decorativo: o nome sempre aparece ao lado. */
export function Avatar({ nome, foto, cor = 'azul', tamanho = 44, className = '' }: Props) {
  const estilo = { width: tamanho, height: tamanho, fontSize: tamanho * 0.42 };
  if (foto) {
    return <img src={foto} alt="" style={estilo} className={`shrink-0 rounded-full object-cover ${className}`} />;
  }
  return (
    <span
      aria-hidden
      style={estilo}
      className={`grid shrink-0 place-items-center rounded-full font-titulo font-bold ${CORES[cor]} ${className}`}
    >
      {nome.trim().replace('?', '') ? nome.trim()[0].toUpperCase() : <UserRound size={tamanho * 0.5} />}
    </span>
  );
}

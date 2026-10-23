import { HeartHandshake, Home, MessagesSquare, Newspaper, UserRound, type LucideIcon } from 'lucide-react';
import { rotaParaHash, useNavegacao, type Aba, type Rota } from '../navegacao';

const ABAS: { aba: Aba; rotulo: string; Icone: LucideIcon; ativa: string }[] = [
  { aba: 'inicio', rotulo: 'Início', Icone: Home, ativa: 'text-tinta bg-amarelo-claro' },
  { aba: 'comunidade', rotulo: 'Comunidade', Icone: MessagesSquare, ativa: 'text-lilas-forte bg-lilas-claro' },
  { aba: 'conteudos', rotulo: 'Conteúdos', Icone: Newspaper, ativa: 'text-laranja-forte bg-laranja-claro' },
  { aba: 'psicoterapia', rotulo: 'Terapia', Icone: HeartHandshake, ativa: 'text-azul bg-azul-claro' },
  { aba: 'perfil', rotulo: 'Perfil', Icone: UserRound, ativa: 'text-tinta bg-ciano-claro' },
];

export function BarraAbas({ ativa }: { ativa: Aba }) {
  const { recomecar } = useNavegacao();
  return (
    <nav aria-label="Seções" className="shrink-0 border-t border-linha bg-superficie pb-[var(--base-segura)]">
      <ul className="grid grid-cols-5 px-1.5 pt-1.5 pb-1">
        {ABAS.map(({ aba, rotulo, Icone, ativa: cores }) => {
          const atual = aba === ativa;
          const rota = { tela: aba } as Rota;
          return (
            <li key={aba}>
              <a
                href={rotaParaHash(rota)}
                aria-current={atual ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  recomecar(rota);
                }}
                className={`flex flex-col items-center gap-0.5 rounded-2xl py-1.5 ${atual ? 'text-tinta' : 'text-tinta-suave'}`}
              >
                <span className={`grid h-8 w-12 place-items-center rounded-full ${atual ? cores : ''}`}>
                  <Icone size={21} strokeWidth={atual ? 2.3 : 1.8} />
                </span>
                <span className={`text-[11.5px] leading-4 ${atual ? 'font-semibold' : ''}`}>{rotulo}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

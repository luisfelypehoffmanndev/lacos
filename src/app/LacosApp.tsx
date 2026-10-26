import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { abaDaRota, corDoTopo, mostraAbas, NavegacaoContexto, reduzirPilha, rotaParaHash, type Navegacao, type Rota } from './navegacao';
import { BarraAbas } from './componentes/BarraAbas';
import { BoasVindas } from './telas/BoasVindas';
import { Cadastro } from './telas/Cadastro';
import { Inicio } from './telas/Inicio';
import { Comunidade } from './telas/Comunidade';
import { RelatoTela } from './telas/RelatoTela';
import { Conteudos } from './telas/Conteudos';
import { ConteudoTela } from './telas/ConteudoTela';
import { Psicoterapia } from './telas/Psicoterapia';
import { Psicologo } from './telas/Psicologo';
import { Perfil } from './telas/Perfil';

function Tela({ rota }: { rota: Rota }) {
  switch (rota.tela) {
    case 'boas-vindas':
      return <BoasVindas />;
    case 'cadastro':
      return <Cadastro modo={rota.modo} />;
    case 'inicio':
      return <Inicio />;
    case 'comunidade':
      return <Comunidade />;
    case 'relato':
      return <RelatoTela id={rota.id} />;
    case 'conteudos':
      return <Conteudos />;
    case 'conteudo':
      return <ConteudoTela id={rota.id} />;
    case 'psicoterapia':
      return <Psicoterapia />;
    case 'psicologo':
      return <Psicologo id={rota.id} />;
    case 'perfil':
      return <Perfil abrir={rota.abrir} />;
  }
}

interface Props {
  rotaInicial?: Rota;
  /** Dentro da moldura de celular do palco (define as áreas seguras). */
  moldura?: boolean;
  aoMudarRota?: (rota: Rota) => void;
}

/** O aplicativo Laços. Cada instância tem sua própria navegação; os dados são compartilhados. */
export function LacosApp({ rotaInicial = { tela: 'boas-vindas' }, moldura = false, aoMudarRota }: Props) {
  const [pilha, despachar] = useReducer(reduzirPilha, [rotaInicial]);
  /** Define a animação da próxima tela: entrar (frente), voltar (tras) ou trocar de aba. */
  const [direcao, setDirecao] = useState<'nenhuma' | 'frente' | 'tras' | 'aba'>('nenhuma');
  const [camada, setCamada] = useState<HTMLElement | null>(null);
  const [aviso, setAviso] = useState<{ texto: string; n: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rota = pilha[pilha.length - 1];

  useEffect(() => {
    aoMudarRota?.(rota);
  }, [rota, aoMudarRota]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const nav = useMemo<Navegacao>(
    () => ({
      rota,
      podeVoltar: pilha.length > 1,
      ir: (r) => {
        setDirecao('frente');
        despachar({ tipo: 'ir', rota: r });
      },
      voltar: () => {
        setDirecao('tras');
        despachar({ tipo: 'voltar' });
      },
      recomecar: (r) => {
        setDirecao('aba');
        despachar({ tipo: 'recomecar', rota: r });
      },
      avisar: (texto) => {
        clearTimeout(timer.current);
        setAviso((a) => ({ texto, n: (a?.n ?? 0) + 1 }));
        timer.current = setTimeout(() => setAviso(null), 3200);
      },
      camada,
    }),
    [rota, pilha.length, camada],
  );

  const aba = abaDaRota(rota);

  return (
    <NavegacaoContexto.Provider value={nav}>
      <div
        className={`lacos-app relative flex h-full w-full flex-col overflow-hidden ${corDoTopo(rota)} text-tinta ${moldura ? 'rounded-[50px]' : ''}`}
        data-moldura={moldura || undefined}
      >
        <div key={`${rotaParaHash(rota)}:${pilha.length}`} data-direcao={direcao} className="relative flex min-h-0 flex-1 flex-col">
          <Tela rota={rota} />
        </div>
        {aba && mostraAbas(rota) && <BarraAbas ativa={aba} />}
        <div ref={setCamada} className="pointer-events-none absolute inset-0 z-40 *:pointer-events-auto" />
        <div aria-live="polite" className="pointer-events-none absolute inset-x-4 bottom-[calc(96px+var(--base-segura))] z-50 flex justify-center">
          {aviso && (
            <p key={aviso.n} role="status" className="anim-aviso t-sm rounded-[16px] bg-tinta px-4 py-3 text-center text-white shadow-lg">
              {aviso.texto}
            </p>
          )}
        </div>
      </div>
    </NavegacaoContexto.Provider>
  );
}

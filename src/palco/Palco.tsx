import { useCallback, useEffect, useState } from 'react';
import { LayoutGrid, RotateCcw, Smartphone } from 'lucide-react';
import { LacosApp } from '../app/LacosApp';
import { hashParaRota, rotaParaHash, topoEscuro, type Rota } from '../app/navegacao';
import { useLoja } from '../estado/loja';
import { ALTURA_MOLDURA, Moldura } from './Moldura';

/** A jornada do usuário, na ordem do painel do grupo e do design.md. */
const JORNADA: { rotulo: string; rota: Rota; telas: Rota['tela'][] }[] = [
  { rotulo: 'Boas-vindas', rota: { tela: 'boas-vindas' }, telas: ['boas-vindas'] },
  { rotulo: 'Cadastro', rota: { tela: 'cadastro' }, telas: ['cadastro'] },
  { rotulo: 'Menu principal', rota: { tela: 'inicio' }, telas: ['inicio'] },
  { rotulo: 'Comunidade', rota: { tela: 'comunidade' }, telas: ['comunidade', 'relato'] },
  { rotulo: 'Conteúdos', rota: { tela: 'conteudos' }, telas: ['conteudos', 'conteudo'] },
  { rotulo: 'Psicoterapia breve', rota: { tela: 'psicoterapia' }, telas: ['psicoterapia', 'psicologo'] },
  { rotulo: 'Perfil', rota: { tela: 'perfil' }, telas: ['perfil'] },
];

const HASH_TELAS = '#/telas';

function rotaDoEndereco(): Rota {
  return hashParaRota(location.hash) ?? (useLoja.getState().usuario.cadastrado ? { tela: 'inicio' } : { tela: 'boas-vindas' });
}

function useCelular() {
  const consulta = '(max-width: 600px)';
  const [celular, setCelular] = useState(() => matchMedia(consulta).matches);
  useEffect(() => {
    const m = matchMedia(consulta);
    const mudar = () => setCelular(m.matches);
    m.addEventListener('change', mudar);
    return () => m.removeEventListener('change', mudar);
  }, []);
  return celular;
}

function useEscala(margem: number) {
  const calcular = () => Math.min(1, (innerHeight - margem) / ALTURA_MOLDURA);
  const [escala, setEscala] = useState(calcular);
  useEffect(() => {
    const mudar = () => setEscala(calcular());
    addEventListener('resize', mudar);
    return () => removeEventListener('resize', mudar);
  });
  return escala;
}

const atualizarEndereco = (rota: Rota) => history.replaceState(null, '', rotaParaHash(rota));

function Botao({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-11 w-full items-center gap-3 rounded-full bg-white/10 px-4 text-left text-sm font-medium hover:bg-white/15">
      {children}
    </button>
  );
}

function Creditos() {
  return (
    <p className="text-xs leading-5 text-white/55">
      Projeto do curso de Psicologia (4º semestre), Faculdade Santo Ângelo, para o FASA Summit 2026. Joiciele Nascimento de Oliveira,
      Karen de Castro Kotlewski, Lucas Daniel Jung e Natalia Santiago. Pessoas, relatos e profissionais do protótipo são fictícios.
    </p>
  );
}

function TelasLadoALado({ aoVoltar }: { aoVoltar: () => void }) {
  const escala = useEscala(150);
  return (
    <div className="flex h-full flex-col text-white">
      <header className="flex items-center gap-4 px-8 pt-6">
        <img src={`${import.meta.env.BASE_URL}marca/letreiro-branco.png`} alt="laços" className="h-8" />
        <p className="flex-1 text-sm text-white/70">As 7 telas da jornada. Cada celular pode ser usado normalmente.</p>
        <div className="w-56">
          <Botao onClick={aoVoltar}>
            <Smartphone size={18} aria-hidden /> Voltar ao modo celular
          </Botao>
        </div>
      </header>
      <ol className="flex flex-1 items-start gap-8 overflow-x-auto px-8 pt-6 pb-8">
        {JORNADA.map((j, i) => (
          <li key={j.rotulo} className="shrink-0">
            <p className="mb-3 text-sm font-semibold">
              <span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-white text-xs text-noite">{i + 1}</span>
              {j.rotulo}
            </p>
            <Moldura topoEscuro={topoEscuro(j.rota)} escala={escala}>
              <LacosApp rotaInicial={j.rota} moldura />
            </Moldura>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Onde o app é apresentado: moldura de celular no computador, tela cheia no celular real. */
export function Palco() {
  const celular = useCelular();
  const escala = useEscala(48);
  const reiniciar = useLoja((s) => s.reiniciar);
  const [ladoALado, setLadoALado] = useState(() => location.hash === HASH_TELAS);
  const [inicio, setInicio] = useState(() => ({ rota: rotaDoEndereco(), chave: 0 }));
  const [rota, setRota] = useState<Rota>(inicio.rota);

  const aoMudarRota = useCallback((r: Rota) => {
    setRota(r);
    atualizarEndereco(r);
  }, []);

  const pular = (r: Rota) => setInicio((i) => ({ rota: r, chave: i.chave + 1 }));

  if (celular) {
    return (
      <div className="h-dvh">
        <LacosApp key={inicio.chave} rotaInicial={inicio.rota} aoMudarRota={aoMudarRota} />
      </div>
    );
  }

  if (ladoALado) {
    return (
      <TelasLadoALado
        aoVoltar={() => {
          setLadoALado(false);
          atualizarEndereco(rota);
        }}
      />
    );
  }

  return (
    <div className="flex h-full items-center justify-center gap-14 overflow-auto p-6 text-white">
      <aside className="flex max-h-full w-72 shrink-0 flex-col gap-7 self-stretch overflow-y-auto py-4">
        <div>
          <img src={`${import.meta.env.BASE_URL}marca/letreiro-branco.png`} alt="laços" className="h-12" />
          <p className="mt-3 text-sm text-white/70">Protótipo navegável. Toque no celular como num aparelho de verdade.</p>
        </div>

        <nav aria-label="Jornada do usuário">
          <h2 className="font-titulo text-lg font-bold">Jornada do usuário</h2>
          <ol className="mt-3 space-y-1">
            {JORNADA.map((j, i) => {
              const atual = j.telas.includes(rota.tela);
              return (
                <li key={j.rotulo}>
                  <button
                    type="button"
                    onClick={() => pular(j.rota)}
                    aria-current={atual ? 'step' : undefined}
                    className={`flex h-11 w-full items-center gap-3 rounded-full px-2 text-left text-sm ${atual ? 'bg-white font-semibold text-noite' : 'text-white/85 hover:bg-white/10'}`}
                  >
                    <span className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${atual ? 'bg-azul text-white' : 'bg-white/12'}`}>{i + 1}</span>
                    {j.rotulo}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="space-y-2">
          <Botao
            onClick={() => {
              setLadoALado(true);
              history.replaceState(null, '', HASH_TELAS);
            }}
          >
            <LayoutGrid size={18} aria-hidden /> Ver as 7 telas lado a lado
          </Botao>
          <Botao
            onClick={() => {
              reiniciar();
              pular({ tela: 'boas-vindas' });
            }}
          >
            <RotateCcw size={18} aria-hidden /> Reiniciar demonstração
          </Botao>
        </div>

        <div className="mt-auto">
          <Creditos />
        </div>
      </aside>

      <Moldura topoEscuro={topoEscuro(rota)} escala={escala}>
        <LacosApp key={inicio.chave} rotaInicial={inicio.rota} moldura aoMudarRota={aoMudarRota} />
      </Moldura>
    </div>
  );
}

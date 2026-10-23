import { useState, type ReactNode } from 'react';
import { ChevronRight, MessagesSquare, Newspaper, ShieldAlert } from 'lucide-react';
import { useLoja } from '../../estado/loja';
import { mensagemDoDia } from '../../dados/textos';
import { psicologoPorId } from '../../dados/psicologos';
import { useNavegacao, type Rota } from '../navegacao';
import { Avatar } from '../componentes/Avatar';
import { ApoioCrise } from '../componentes/Avisos';
import { Folha } from '../componentes/Folha';
import { FormMensagem } from '../componentes/FormMensagem';
import { Laco } from '../componentes/Laco';

/** Linhas de contorno da ref. 04, por baixo de cada bloco. */
function Textura() {
  return (
    <svg aria-hidden viewBox="0 0 200 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-white/25">
      {Array.from({ length: 7 }, (_, i) => {
        const y = 20 + i * 26;
        return <path key={i} d={`M-10 ${y} C 50 ${y - 22}, 110 ${y + 22}, 210 ${y - 6}`} fill="none" stroke="currentColor" strokeWidth="1.2" />;
      })}
    </svg>
  );
}

/** Ícone do pilar de psicoterapia no painel do grupo: duas pessoas sentadas e dois elos. */
function IconeSessao({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="52" cy="14" r="9" />
      <circle cx="66" cy="14" r="9" />
      <circle cx="28" cy="38" r="8" />
      <circle cx="92" cy="38" r="8" />
      <path d="M14 96 V70 C14 58 20 52 28 52 C36 52 42 58 42 66 V74 H54 L60 96" />
      <path d="M106 96 V70 C106 58 100 52 92 52 C84 52 78 58 78 66 V74 H66 L60 96" />
    </svg>
  );
}

interface Pilar {
  titulo: string;
  descricao: string;
  rota: Rota;
  cores: string;
  icone: ReactNode;
  largo?: boolean;
}

function BlocoPilar({ titulo, descricao, rota, cores, icone, largo }: Pilar) {
  const { recomecar } = useNavegacao();
  return (
    <button
      type="button"
      onClick={() => recomecar(rota)}
      className={`relative isolate flex overflow-hidden rounded-[28px] p-5 text-left ${cores} ${
        largo ? 'col-span-2 min-h-[150px] items-end pr-32' : 'min-h-[200px] flex-col justify-start'
      }`}
    >
      <Textura />
      <span className={`pointer-events-none absolute text-white/75 ${largo ? '-top-3 -right-4' : '-right-5 -bottom-5'}`}>{icone}</span>
      <span className="relative block">
        <span className="t-md block">{titulo}</span>
        <span className="t-sm mt-1 block opacity-90">{descricao}</span>
      </span>
    </button>
  );
}

/** Tela 3 — ref. 04: saudação, mensagem do dia, os três pilares, apoio em crise e perfil. */
export function Inicio() {
  const { ir } = useNavegacao();
  const usuario = useLoja((s) => s.usuario);
  const proxima = useLoja((s) => s.solicitacoes[0]);
  const [mensagemAberta, setMensagemAberta] = useState(false);
  const psi = proxima && psicologoPorId(proxima.psicologoId);

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="relative overflow-hidden px-5 pt-[var(--topo-seguro)]">
        <Laco variante="fina" className="pointer-events-none absolute top-16 -right-20 h-56 w-56" />
        <div className="relative flex h-14 items-center justify-between">
          <img src="/marca/letreiro.png" alt="laços" className="h-8 w-auto" />
          <button type="button" onClick={() => ir({ tela: 'perfil' })} aria-label="Abrir meu perfil" className="rounded-full">
            <Avatar nome={usuario.nome || '?'} foto={usuario.foto} tamanho={42} />
          </button>
        </div>
        <h1 className="t-xl relative mt-7">{usuario.nome ? `Olá, ${usuario.nome}.` : 'Olá.'}</h1>
        <p className="t-corpo relative mt-2 max-w-[26ch] text-tinta-suave">{mensagemDoDia()}</p>
      </header>

      <section aria-label="O que você quer fazer agora?" className="mt-7 grid grid-cols-2 gap-3 px-5">
        <BlocoPilar
          titulo="Comunidade"
          descricao="Troque vivências com outras famílias."
          rota={{ tela: 'comunidade' }}
          cores="bg-lilas text-tinta"
          icone={<MessagesSquare size={92} strokeWidth={1.4} />}
        />
        <BlocoPilar
          titulo="Conteúdos"
          descricao="Textos de psicólogos sobre o cuidado."
          rota={{ tela: 'conteudos' }}
          cores="bg-laranja text-tinta"
          icone={<Newspaper size={92} strokeWidth={1.4} />}
        />
        <BlocoPilar
          largo
          titulo="Agende uma sessão de psicoterapia breve"
          descricao="Escuta profissional para você, que cuida."
          rota={{ tela: 'psicoterapia' }}
          cores="sobre-azul bg-azul text-white"
          icone={<IconeSessao className="mt-6 mr-4 h-32 w-36" />}
        />
      </section>

      {proxima && psi && (
        <button
          type="button"
          onClick={() => ir({ tela: 'perfil', abrir: 'sessoes' })}
          className="mx-5 mt-3 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-[20px] border border-linha bg-superficie p-3 text-left"
        >
          <img src={psi.foto} alt="" className="size-12 rounded-[14px] object-cover" />
          <span className="min-w-0 flex-1">
            <span className="t-sm block font-semibold">Sessão solicitada</span>
            <span className="t-legenda block text-tinta-suave">
              {psi.nome}, {proxima.dia.toLowerCase()} às {proxima.hora}. Aguardando confirmação.
            </span>
          </span>
          <ChevronRight size={20} className="text-tinta-suave" aria-hidden />
        </button>
      )}

      <div className="mt-5 px-5">
        <ApoioCrise />
      </div>

      <div className="mt-3 px-5 pb-6">
        <button
          type="button"
          onClick={() => setMensagemAberta(true)}
          className="flex w-full items-center gap-3 rounded-[20px] border border-linha bg-superficie p-4 text-left"
        >
          <span className="grid size-10 place-items-center rounded-full bg-fundo">
            <ShieldAlert size={20} aria-hidden />
          </span>
          <span className="flex-1">
            <span className="t-sm block font-semibold">Sugestões e denúncias</span>
            <span className="t-legenda block text-tinta-suave">Ajude a manter este espaço seguro.</span>
          </span>
          <ChevronRight size={20} className="text-tinta-suave" aria-hidden />
        </button>
      </div>

      <Folha aberta={mensagemAberta} aoFechar={() => setMensagemAberta(false)} titulo="Sugestões e denúncias">
        <FormMensagem />
      </Folha>
    </div>
  );
}

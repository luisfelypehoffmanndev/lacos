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

/** Ícone do pilar de psicoterapia no painel do grupo: duas pessoas sentadas e dois elos. */
function IconeSessao({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

/**
 * Formas geométricas do quadro de inspirações do grupo (semicírculos e quartos de círculo),
 * em tons da cor de cada pilar.
 */
const FORMAS: Record<'comunidade' | 'conteudos' | 'psicoterapia', ReactNode> = {
  // Dois círculos que se encostam: duas pessoas conversando.
  comunidade: (
    <>
      <circle cx="74" cy="22" r="36" fill="#BF8CF2" />
      <circle cx="108" cy="62" r="26" fill="#EBDAFC" />
    </>
  ),
  // Quartos de círculo concêntricos, como páginas abertas no canto.
  conteudos: (
    <>
      <path d="M110 0 V86 A86 86 0 0 1 24 0 Z" fill="#FBB873" />
      <path d="M110 0 V44 A44 44 0 0 1 66 0 Z" fill="#E57E26" />
    </>
  ),
  // Meia-lua, quarto de círculo e os dois elos do ícone do grupo.
  psicoterapia: (
    <>
      <path d="M150 0 V72 A72 72 0 0 1 78 0 Z" fill="#1440B8" />
      <path d="M36 180 A56 56 0 0 1 148 180 Z" fill="#3D72F2" />
      <circle cx="64" cy="98" r="22" fill="none" stroke="#6ACAF2" strokeWidth="8" />
      <circle cx="94" cy="98" r="22" fill="none" stroke="#F9BB2D" strokeWidth="8" />
    </>
  ),
};

/** Bloco do pilar: cor chapada, composição geométrica no canto, ícone em círculo branco, texto embaixo. */
function BlocoPilar({ titulo, descricao, rota, cores, icone, forma, largo }: Pilar & { forma: keyof typeof FORMAS }) {
  const { recomecar } = useNavegacao();
  return (
    <button
      type="button"
      onClick={() => recomecar(rota)}
      className={`tocavel relative isolate flex overflow-hidden rounded-[28px] p-5 text-left ${cores} ${
        largo ? 'col-span-2 min-h-[170px] flex-col justify-between pr-36' : 'min-h-[200px] flex-col justify-between'
      }`}
    >
      <svg
        aria-hidden
        viewBox={largo ? '0 0 150 180' : '0 0 110 110'}
        preserveAspectRatio="xMaxYMin slice"
        className={`absolute top-0 right-0 -z-10 ${largo ? 'h-full w-[150px]' : 'size-[110px]'}`}
      >
        {FORMAS[forma]}
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(14,31,85,0.5)]">{icone}</span>
      <span className="mt-6 block">
        <span className="t-md block">{titulo}</span>
        <span className="t-sm mt-1 block opacity-85">{descricao}</span>
      </span>
    </button>
  );
}

/** Tela 3 — ref. 04: saudação, mensagem do dia, os três pilares (na ordem das cores do letreiro), apoio em crise e perfil. */
export function Inicio() {
  const { ir } = useNavegacao();
  const usuario = useLoja((s) => s.usuario);
  const proxima = useLoja((s) => s.solicitacoes[0]);
  const [mensagemAberta, setMensagemAberta] = useState(false);
  const psi = proxima && psicologoPorId(proxima.psicologoId);

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="relative overflow-x-clip px-5 pt-[var(--topo-seguro)]">
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
          largo
          titulo="Agende uma sessão de psicoterapia breve"
          descricao="Escuta profissional para você, que cuida."
          rota={{ tela: 'psicoterapia' }}
          cores="sobre-azul bg-azul text-white"
          forma="psicoterapia"
          icone={<IconeSessao className="h-7 w-8 text-azul" />}
        />
        <BlocoPilar
          titulo="Comunidade"
          descricao="Troque vivências com outras famílias."
          rota={{ tela: 'comunidade' }}
          cores="bg-lilas text-tinta"
          forma="comunidade"
          icone={<MessagesSquare size={22} strokeWidth={2} className="text-lilas-forte" />}
        />
        <BlocoPilar
          titulo="Conteúdos"
          descricao="Textos de psicólogos sobre o cuidado."
          rota={{ tela: 'conteudos' }}
          cores="bg-laranja text-tinta"
          forma="conteudos"
          icone={<Newspaper size={22} strokeWidth={2} className="text-laranja-forte" />}
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

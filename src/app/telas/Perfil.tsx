import { useState, type ReactNode } from 'react';
import { ArrowLeft, Bookmark, CalendarDays, ChevronRight, Lock, Mail, MessagesSquare, Pencil, ShieldAlert, type LucideIcon } from 'lucide-react';
import { CONTEUDOS } from '../../dados/conteudos';
import { nomeCompleto, psicologoPorId } from '../../dados/psicologos';
import { papelDoUsuario, useLoja } from '../../estado/loja';
import { useNavegacao } from '../navegacao';
import { mesEAno, tempoRelativo } from '../formato';
import { Avatar } from '../componentes/Avatar';
import { Folha } from '../componentes/Folha';
import { FormMensagem } from '../componentes/FormMensagem';

type Secao = 'sessoes' | 'salvos' | 'relatos' | 'mensagens' | 'privacidade';

const TITULOS: Record<Secao, string> = {
  sessoes: 'Minhas sessões',
  salvos: 'Conteúdos salvos',
  relatos: 'Meus relatos',
  mensagens: 'Sugestões e denúncias',
  privacidade: 'Privacidade e dados',
};

function Vazio({ texto, acao, aoAgir }: { texto: string; acao: string; aoAgir: () => void }) {
  return (
    <div className="py-6 text-center">
      <p className="t-corpo text-tinta-suave">{texto}</p>
      <button type="button" onClick={aoAgir} className="mt-4 h-12 rounded-full bg-tinta px-6 font-semibold text-white">
        {acao}
      </button>
    </div>
  );
}

function Sessoes({ ir }: { ir: (tela: 'psicoterapia') => void }) {
  const solicitacoes = useLoja((s) => s.solicitacoes);
  const cancelar = useLoja((s) => s.cancelarSolicitacao);
  if (solicitacoes.length === 0) {
    return <Vazio texto="Você ainda não solicitou nenhuma sessão." acao="Conhecer a psicoterapia breve" aoAgir={() => ir('psicoterapia')} />;
  }
  return (
    <ul className="space-y-3">
      {solicitacoes.map((s) => {
        const psi = psicologoPorId(s.psicologoId);
        return (
          <li key={s.id} className="rounded-[20px] border border-linha p-4">
            <div className="flex items-center gap-3">
              {psi && <img src={psi.foto} alt="" className="size-12 rounded-[14px] object-cover" />}
              <div className="min-w-0 flex-1">
                <p className="t-sm font-semibold">{psi ? nomeCompleto(psi) : 'Profissional'}</p>
                <p className="t-sm">{`${s.dia}, ${s.hora}`}</p>
                <p className="t-legenda text-laranja-forte">Aguardando confirmação</p>
              </div>
            </div>
            <button type="button" onClick={() => cancelar(s.id)} className="t-sm mt-3 h-11 w-full rounded-full border border-linha font-semibold text-erro">
              Cancelar solicitação
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Privacidade() {
  return (
    <div className="t-sm space-y-3">
      <p>
        Dados de saúde são dados pessoais sensíveis (LGPD, Lei nº 13.709/2018, art. 5º, II) e exigem medidas de segurança
        contra acesso indevido (art. 46).
      </p>
      <p>
        A comunidade e o atendimento psicológico ficam separados: o que você conversa na sessão é sigiloso (Código de Ética do
        Psicólogo, art. 9º) e nunca aparece na comunidade nem é usado para divulgação.
      </p>
      <p>
        Na versão real: criptografia dos dados armazenados, conexão segura (HTTPS/TLS), controle de acesso, autenticação em dois
        fatores e plano de resposta a incidentes.
      </p>
      <p className="rounded-[14px] bg-ciano-claro p-3">
        Nesta demonstração nada é enviado pela internet: tudo fica guardado no navegador deste aparelho.
      </p>
    </div>
  );
}

function Linha({ rotulo, Icone, cores, contagem, aoTocar }: { rotulo: string; Icone: LucideIcon; cores: string; contagem?: number; aoTocar: () => void }) {
  return (
    <button type="button" onClick={aoTocar} className="flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left">
      <span className={`grid size-10 shrink-0 place-items-center rounded-full ${cores}`}>
        <Icone size={19} aria-hidden />
      </span>
      <span className="flex-1 font-medium">{rotulo}</span>
      {contagem !== undefined && contagem > 0 && (
        <span className="t-legenda rounded-full bg-tinta px-2 py-0.5 text-white">{contagem}</span>
      )}
      <ChevronRight size={20} className="text-tinta-suave" aria-hidden />
    </button>
  );
}

/** Tela 7 — ref. 06: topo colorido, cartão sobreposto com foto e nome, dados e atalhos em pílula. */
export function Perfil({ abrir }: { abrir?: 'sessoes' }) {
  const { ir, recomecar, voltar, podeVoltar } = useNavegacao();
  const usuario = useLoja((s) => s.usuario);
  const sair = useLoja((s) => s.sair);
  const nSessoes = useLoja((s) => s.solicitacoes.length);
  const salvos = useLoja((s) => s.salvos);
  const relatos = useLoja((s) => s.relatos);
  const meus = relatos.filter((r) => r.deUsuario);
  const [secao, setSecao] = useState<Secao | null>(abrir ?? null);

  const conteudo: Record<Secao, ReactNode> = {
    sessoes: <Sessoes ir={() => recomecar({ tela: 'psicoterapia' })} />,
    salvos:
      salvos.length === 0 ? (
        <Vazio texto="Toque no marcador de um conteúdo para guardá-lo aqui." acao="Ver conteúdos" aoAgir={() => recomecar({ tela: 'conteudos' })} />
      ) : (
        <ul className="divide-y divide-linha">
          {CONTEUDOS.filter((c) => salvos.includes(c.id)).map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => { setSecao(null); ir({ tela: 'conteudo', id: c.id }); }} className="flex w-full items-center gap-3 py-3 text-left">
                <img src={c.capa} alt="" className="size-14 rounded-[14px] object-cover" />
                <span className="t-sm flex-1 font-semibold">{c.titulo}</span>
              </button>
            </li>
          ))}
        </ul>
      ),
    relatos:
      meus.length === 0 ? (
        <Vazio texto="Você ainda não publicou na comunidade." acao="Ir para a comunidade" aoAgir={() => recomecar({ tela: 'comunidade' })} />
      ) : (
        <ul className="divide-y divide-linha">
          {meus.map((r) => (
            <li key={r.id}>
              <button type="button" onClick={() => { setSecao(null); ir({ tela: 'relato', id: r.id }); }} className="w-full py-3 text-left">
                <span className="t-sm line-clamp-2 block">{r.texto}</span>
                <span className="t-legenda mt-1 block text-tinta-suave">
                  {tempoRelativo(r.criadaEm)}, {r.respostas.length} {r.respostas.length === 1 ? 'resposta' : 'respostas'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ),
    mensagens: <FormMensagem />,
    privacidade: <Privacidade />,
  };

  const botaoTopo = 'grid size-11 place-items-center rounded-full bg-white';

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="rounded-b-[36px] bg-amarelo-claro px-4 pt-[var(--topo-seguro)] pb-24">
        <div className="flex h-14 items-center">
          {podeVoltar ? (
            <button type="button" onClick={voltar} aria-label="Voltar" className={botaoTopo}>
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span className="size-11" />
          )}
          <h1 className="t-md flex-1 text-center">Perfil</h1>
          <button type="button" onClick={() => ir({ tela: 'cadastro', modo: 'editar' })} aria-label="Editar perfil" className={botaoTopo}>
            <Pencil size={18} />
          </button>
        </div>
      </header>

      <div className="relative -mt-20 space-y-3 px-5 pb-8">
        <section className="rounded-[24px] bg-superficie p-6 text-center shadow-[0_14px_32px_-16px_rgba(14,31,85,0.3)]">
          <Avatar nome={usuario.nome || '?'} foto={usuario.foto} tamanho={88} className="mx-auto ring-4 ring-amarelo-claro" />
          <p className="t-md mt-3">{usuario.nome || 'Visitante'}</p>
          <p className="t-sm text-tinta-suave">{papelDoUsuario(usuario.genero)}</p>
          {usuario.desde > 0 && (
            <p className="t-legenda mt-4 border-t border-linha pt-4 text-tinta-suave">No Laços desde {mesEAno(usuario.desde)}</p>
          )}
        </section>

        <section className="space-y-3 rounded-[24px] bg-superficie p-5 shadow-[0_14px_32px_-20px_rgba(14,31,85,0.25)]">
          <p className="t-sm flex items-center gap-3">
            <Mail size={18} className="shrink-0 text-tinta-suave" aria-hidden />
            <span className="sr-only">E-mail: </span>
            <span className="truncate">{usuario.email || 'Sem e-mail'}</span>
          </p>
          <p className="t-sm flex items-center gap-3 text-tinta-suave">
            <Lock size={18} className="shrink-0 text-tinta-suave" aria-hidden />
            Seus dados ficam só neste aparelho.
          </p>
        </section>

        <nav aria-label="Minha conta" className="divide-y divide-linha overflow-hidden rounded-[24px] bg-superficie shadow-[0_14px_32px_-20px_rgba(14,31,85,0.25)]">
          <Linha rotulo="Minhas sessões" Icone={CalendarDays} cores="bg-azul-claro text-azul" contagem={nSessoes} aoTocar={() => setSecao('sessoes')} />
          <Linha rotulo="Conteúdos salvos" Icone={Bookmark} cores="bg-laranja-claro text-laranja-forte" contagem={salvos.length} aoTocar={() => setSecao('salvos')} />
          <Linha rotulo="Meus relatos" Icone={MessagesSquare} cores="bg-lilas-claro text-lilas-forte" contagem={meus.length} aoTocar={() => setSecao('relatos')} />
          <Linha rotulo="Sugestões e denúncias" Icone={ShieldAlert} cores="bg-amarelo-claro text-tinta" aoTocar={() => setSecao('mensagens')} />
          <Linha rotulo="Privacidade e dados" Icone={Lock} cores="bg-ciano-claro text-tinta" aoTocar={() => setSecao('privacidade')} />
        </nav>

        <button
          type="button"
          onClick={() => {
            sair();
            recomecar({ tela: 'boas-vindas' });
          }}
          className="h-12 w-full rounded-full font-semibold text-erro"
        >
          Sair
        </button>
      </div>

      <Folha aberta={secao !== null} aoFechar={() => setSecao(null)} titulo={secao ? TITULOS[secao] : ''}>
        {secao && conteudo[secao]}
      </Folha>
    </div>
  );
}

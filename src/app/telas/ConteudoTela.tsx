import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, Square, Volume2 } from 'lucide-react';
import { conteudoPorId } from '../../dados/conteudos';
import { nomeCompleto, psicologoPorId } from '../../dados/psicologos';
import { useLoja } from '../../estado/loja';
import type { Conteudo } from '../../estado/tipos';
import { useNavegacao } from '../navegacao';
import { dataPorExtenso } from '../formato';
import { AvisoEtico } from '../componentes/Avisos';
import { NaoEncontrado } from './NaoEncontrado';

/** Lê o conteúdo em voz alta com a voz em português do próprio aparelho. */
function BotaoOuvir({ conteudo }: { conteudo: Conteudo }) {
  const suportado = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [tocando, setTocando] = useState(false);

  useEffect(() => () => {
    if (suportado) window.speechSynthesis.cancel();
  }, [suportado]);

  if (!suportado) return null;

  const alternar = () => {
    window.speechSynthesis.cancel();
    if (tocando) return setTocando(false);
    const fala = new SpeechSynthesisUtterance([conteudo.titulo, ...conteudo.paragrafos].join('. '));
    fala.lang = 'pt-BR';
    fala.onend = fala.onerror = () => setTocando(false);
    window.speechSynthesis.speak(fala);
    setTocando(true);
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={tocando}
      className="t-sm mt-5 flex h-11 items-center gap-2 rounded-full border border-linha bg-superficie px-4 font-semibold"
    >
      {tocando ? <Square size={16} aria-hidden /> : <Volume2 size={18} aria-hidden />}
      {tocando ? 'Parar áudio' : 'Ouvir conteúdo'}
    </button>
  );
}

/** Leitura — ref. 07, à direita: capa, autoria com CRP, texto, aviso ético e referências. */
export function ConteudoTela({ id }: { id: string }) {
  const { voltar, recomecar } = useNavegacao();
  const salvo = useLoja((s) => s.salvos.includes(id));
  const alternarSalvo = useLoja((s) => s.alternarSalvo);
  const conteudo = conteudoPorId(id);
  if (!conteudo) return <NaoEncontrado titulo="Conteúdos" texto="Não encontramos este conteúdo." />;
  const autor = psicologoPorId(conteudo.psicologoId);

  const botaoRedondo = 'tocavel grid size-11 place-items-center rounded-full border border-linha bg-superficie';

  return (
    <>
      <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
        <header className="flex h-14 items-center justify-between px-4 mt-[var(--topo-seguro)]">
          <button type="button" onClick={voltar} aria-label="Voltar" className={botaoRedondo}>
            <ArrowLeft size={20} />
          </button>
          <p className="t-sm font-medium">Conteúdos</p>
          <button
            type="button"
            onClick={() => alternarSalvo(id)}
            aria-pressed={salvo}
            aria-label="Salvar conteúdo"
            className={`${botaoRedondo} ${salvo ? 'text-laranja-forte' : ''}`}
          >
            <Bookmark key={String(salvo)} size={20} fill={salvo ? 'currentColor' : 'none'} className={salvo ? 'anim-pulsar' : undefined} />
          </button>
        </header>

        <div className="px-4 pt-2">
          <div className="relative h-60 overflow-hidden rounded-[24px] bg-laranja-claro">
            <img src={conteudo.capa} alt={conteudo.capaAlt} className="h-full w-full object-cover" />
            <span className="t-legenda absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5">{conteudo.categoria}</span>
          </div>
        </div>

        <article className="px-5 pt-5 pb-8">
          <h1 className="t-lg text-laranja-forte">{conteudo.titulo}</h1>
          {autor && (
            <div className="mt-4 flex items-center gap-3">
              <img src={autor.foto} alt="" className="size-11 rounded-full object-cover" />
              <div>
                <p className="t-sm font-semibold">{nomeCompleto(autor)}</p>
                <p className="t-legenda text-tinta-suave">{autor.crp}</p>
              </div>
            </div>
          )}
          <p className="t-legenda mt-3 text-tinta-suave">
            Publicado em {dataPorExtenso(conteudo.publicadoEm)}. Leitura de {conteudo.minutos} min.
          </p>
          <BotaoOuvir conteudo={conteudo} />
          <div className="t-corpo mt-6 space-y-4">
            {conteudo.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <AvisoEtico />
          </div>
          <h2 className="t-sm mt-6 font-semibold">Referências</h2>
          <ul className="t-legenda mt-2 space-y-2 text-tinta-suave">
            {conteudo.referencias.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="flex items-center gap-4 border-t border-linha bg-superficie px-5 pt-3 pb-[calc(12px+var(--base-segura))]">
        <p className="t-sm flex-1">Quer conversar sobre isso com um profissional?</p>
        <button type="button" onClick={() => recomecar({ tela: 'psicoterapia' })} className="tocavel h-12 shrink-0 rounded-full bg-azul px-5 font-semibold text-white">
          Ver psicoterapia
        </button>
      </div>
    </>
  );
}

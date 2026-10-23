import { useId, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { LIMITE_RELATO, useLoja } from '../../estado/loja';
import { useNavegacao } from '../navegacao';
import { tempoRelativo } from '../formato';
import { Avatar } from '../componentes/Avatar';
import { Cabecalho } from '../componentes/Cabecalho';
import { AcoesRelato, CabecaRelato } from '../componentes/Relato';
import { NaoEncontrado } from './NaoEncontrado';

/** Conversa de um relato — ref. 05, à direita. */
export function RelatoTela({ id }: { id: string }) {
  const { voltar } = useNavegacao();
  const relato = useLoja((s) => s.relatos.find((r) => r.id === id));
  const responder = useLoja((s) => s.responder);
  const [texto, setTexto] = useState('');
  const idCampo = useId();

  if (!relato || relato.denunciado) return <NaoEncontrado titulo="Relato" texto="Este relato não está mais disponível." />;

  const n = relato.respostas.length;

  return (
    <>
      <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
        <Cabecalho titulo="Relato" />
        <article className="border-b border-linha bg-superficie px-5 pt-4 pb-2">
          <CabecaRelato relato={relato} tamanho={48} />
          <p className="mt-4 text-[19px] leading-7">{relato.texto}</p>
          <p className="t-legenda mt-3 text-tinta-suave">
            {relato.apoios} {relato.apoios === 1 ? 'apoio' : 'apoios'}, {n} {n === 1 ? 'resposta' : 'respostas'}
          </p>
          <AcoesRelato relato={relato} aoDenunciar={voltar} />
        </article>

        <section aria-label="Respostas" className="pb-6">
          {n === 0 ? (
            <p className="t-sm px-5 py-8 text-center text-tinta-suave">Ninguém respondeu ainda. Sua resposta pode ser a primeira.</p>
          ) : (
            <ul>
              {relato.respostas.map((r, i) => (
                <li key={r.id} className="relative flex gap-3 px-5 pt-4">
                  {i < n - 1 && <span aria-hidden className="absolute top-14 bottom-0 left-[38px] w-0.5 bg-linha" />}
                  <Avatar nome={r.autor.nome} cor={r.autor.cor} tamanho={36} />
                  <div className="min-w-0 flex-1 pb-2">
                    <div className="flex items-baseline gap-2">
                      <p className="t-sm truncate font-semibold">{r.autor.nome}</p>
                      <span className="t-legenda ml-auto shrink-0 text-tinta-suave">{tempoRelativo(r.criadaEm)}</span>
                    </div>
                    <p className="t-legenda truncate text-tinta-suave">{r.autor.papel}</p>
                    <p className="t-corpo mt-1">{r.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (responder(relato.id, texto)) setTexto('');
        }}
        className="flex items-end gap-2 border-t border-linha bg-superficie px-3 py-2"
      >
        <label htmlFor={idCampo} className="sr-only">
          Sua resposta
        </label>
        <textarea
          id={idCampo}
          rows={1}
          maxLength={LIMITE_RELATO}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva uma resposta acolhedora"
          className="t-corpo max-h-28 min-h-11 flex-1 resize-none rounded-[22px] bg-fundo px-4 py-2.5 outline-none focus:ring-2 focus:ring-lilas-forte"
        />
        <button
          type="submit"
          disabled={!texto.trim()}
          aria-label="Enviar resposta"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-lilas-forte text-white disabled:opacity-40"
        >
          <SendHorizontal size={19} />
        </button>
      </form>
    </>
  );
}

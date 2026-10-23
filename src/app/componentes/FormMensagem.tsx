import { useId, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLoja } from '../../estado/loja';
import type { Mensagem } from '../../estado/tipos';
import { Opcoes } from './Opcoes';

/** Canal de sugestões e denúncias (fichamento, item 14: aba "sugestões"). */
export function FormMensagem() {
  const enviarMensagem = useLoja((s) => s.enviarMensagem);
  const [tipo, setTipo] = useState<Mensagem['tipo']>('sugestao');
  const [texto, setTexto] = useState('');
  const [enviada, setEnviada] = useState(false);
  const id = useId();

  if (enviada) {
    return (
      <div className="py-4 text-center">
        <CheckCircle2 size={40} className="mx-auto text-lilas-forte" aria-hidden />
        <p className="t-md mt-3">Mensagem enviada.</p>
        <p className="t-sm mt-1 text-tinta-suave">
          A moderação lê todas as mensagens. Denúncias são analisadas primeiro.
        </p>
        <button type="button" onClick={() => { setTexto(''); setEnviada(false); }} className="mt-5 h-11 rounded-full px-5 font-semibold text-tinta underline underline-offset-4">
          Escrever outra
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (enviarMensagem(tipo, texto)) setEnviada(true);
      }}
      className="space-y-4"
    >
      <p className="t-sm text-tinta-suave">
        Sugira melhorias ou conte algo que deixou a comunidade menos segura. Sua identidade não é mostrada a ninguém.
      </p>
      <Opcoes
        rotulo="Tipo de mensagem"
        valor={tipo}
        aoMudar={(v) => setTipo(v as Mensagem['tipo'])}
        opcoes={[
          { valor: 'sugestao', rotulo: 'Sugestão' },
          { valor: 'denuncia', rotulo: 'Denúncia' },
        ]}
      />
      <div>
        <label htmlFor={id} className="t-sm font-semibold">
          Sua mensagem
        </label>
        <textarea
          id={id}
          rows={4}
          maxLength={500}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="t-corpo mt-2 w-full resize-none rounded-[14px] border border-linha bg-fundo p-3 outline-none focus:border-tinta"
        />
      </div>
      <button type="submit" disabled={!texto.trim()} className="h-12 w-full rounded-full bg-tinta font-semibold text-white disabled:opacity-40">
        Enviar
      </button>
    </form>
  );
}

import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { useLoja } from '../../estado/loja';
import type { Relato } from '../../estado/tipos';
import { MOTIVOS_DE_DENUNCIA } from '../../dados/textos';
import { useNavegacao } from '../navegacao';
import { tempoRelativo } from '../formato';
import { Avatar } from './Avatar';
import { Folha } from './Folha';
import { Opcoes } from './Opcoes';

const botaoAcao = 'flex h-11 min-w-11 items-center gap-1.5 rounded-full px-2.5 t-sm text-tinta-suave';

/** Responder, apoiar, compartilhar e denunciar. */
export function AcoesRelato({ relato, aoDenunciar }: { relato: Relato; aoDenunciar?: () => void }) {
  const { ir, rota, avisar } = useNavegacao();
  const apoiar = useLoja((s) => s.apoiar);
  const compartilhar = useLoja((s) => s.compartilhar);
  const [denunciando, setDenunciando] = useState(false);
  const n = relato.respostas.length;

  return (
    <div className="-ml-2.5 mt-1 flex items-center">
      {rota.tela !== 'relato' && (
        <button type="button" onClick={() => ir({ tela: 'relato', id: relato.id })} aria-label={`Responder, ${n} ${n === 1 ? 'resposta' : 'respostas'}`} className={botaoAcao}>
          <MessageCircle size={18} aria-hidden />
          <span aria-hidden>{n}</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => apoiar(relato.id)}
        aria-pressed={relato.apoiado}
        aria-label={`Apoiar, ${relato.apoios} ${relato.apoios === 1 ? 'apoio' : 'apoios'}`}
        className={`${botaoAcao} ${relato.apoiado ? 'font-semibold text-lilas-forte' : ''}`}
      >
        <Heart size={18} fill={relato.apoiado ? 'currentColor' : 'none'} aria-hidden />
        <span aria-hidden>{relato.apoios}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          compartilhar(relato.id);
          avisar('Compartilhamento simulado: nesta demonstração nada sai do aparelho.');
        }}
        aria-label="Compartilhar"
        className={botaoAcao}
      >
        <Share2 size={18} aria-hidden />
      </button>
      {!relato.deUsuario && (
        <button type="button" onClick={() => setDenunciando(true)} aria-label="Mais opções" className={`${botaoAcao} ml-auto`}>
          <MoreHorizontal size={20} aria-hidden />
        </button>
      )}
      <FolhaDenuncia
        aberta={denunciando}
        relatoId={relato.id}
        aoFechar={() => setDenunciando(false)}
        aoEnviar={() => {
          setDenunciando(false);
          avisar('Denúncia enviada à moderação.');
          aoDenunciar?.();
        }}
      />
    </div>
  );
}

function FolhaDenuncia({ aberta, relatoId, aoFechar, aoEnviar }: { aberta: boolean; relatoId: string; aoFechar: () => void; aoEnviar: () => void }) {
  const denunciar = useLoja((s) => s.denunciar);
  const [motivo, setMotivo] = useState<string | null>(null);
  return (
    <Folha aberta={aberta} aoFechar={aoFechar} titulo="Denunciar relato">
      <p className="t-sm mb-4 text-tinta-suave">
        O relato some do seu feed e vai para a moderação. Quem escreveu não fica sabendo quem denunciou.
      </p>
      <Opcoes
        rotulo="Motivo"
        valor={motivo}
        aoMudar={setMotivo}
        empilhado
        opcoes={MOTIVOS_DE_DENUNCIA.map((m) => ({ valor: m, rotulo: m }))}
      />
      <button
        type="button"
        disabled={!motivo}
        onClick={() => {
          if (!motivo) return;
          denunciar(relatoId, motivo);
          aoEnviar();
        }}
        className="mt-5 h-12 w-full rounded-full bg-azul font-semibold text-white disabled:opacity-40"
      >
        Enviar denúncia
      </button>
    </Folha>
  );
}

export function CabecaRelato({ relato, tamanho = 44 }: { relato: Relato; tamanho?: number }) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <Avatar nome={relato.autor.nome} cor={relato.autor.cor} tamanho={tamanho} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="t-sm truncate font-semibold">{relato.autor.nome}</p>
          <time dateTime={new Date(relato.criadaEm).toISOString()} className="t-legenda ml-auto shrink-0 text-tinta-suave">
            {tempoRelativo(relato.criadaEm)}
          </time>
        </div>
        <p className="t-legenda truncate text-tinta-suave">{relato.autor.papel}</p>
      </div>
    </div>
  );
}

/** Linha do feed (ref. 05): sem cartão, separada por divisor. */
export function ItemRelato({ relato }: { relato: Relato }) {
  const { ir } = useNavegacao();
  if (relato.denunciado) {
    return (
      <li className="t-sm px-5 py-4 text-tinta-suave">
        Você denunciou este relato. Ele foi ocultado e será analisado pela moderação.
      </li>
    );
  }
  return (
    <li className="px-5 pt-4 pb-2">
      <CabecaRelato relato={relato} />
      <button
        type="button"
        onClick={() => ir({ tela: 'relato', id: relato.id })}
        className="t-corpo mt-2 block w-full pl-14 text-left"
      >
        {relato.texto}
      </button>
      <div className="pl-14">
        <AcoesRelato relato={relato} />
      </div>
    </li>
  );
}

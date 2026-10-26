import { useId, useState } from 'react';
import { PenLine, ShieldCheck } from 'lucide-react';
import { LIMITE_RELATO, useLoja } from '../../estado/loja';
import { REGRAS_DE_CONVIVENCIA } from '../../dados/textos';
import { useNavegacao } from '../navegacao';
import { vibrar } from '../vibrar';
import { Avatar } from '../componentes/Avatar';
import { Folha } from '../componentes/Folha';
import { ItemRelato } from '../componentes/Relato';

export function FolhaRegras({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  return (
    <Folha aberta={aberta} aoFechar={aoFechar} titulo="Regras de convivência">
      <ul className="space-y-3">
        {REGRAS_DE_CONVIVENCIA.map((r) => (
          <li key={r} className="t-corpo flex gap-3">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-lilas-forte" aria-hidden />
            {r}
          </li>
        ))}
      </ul>
      <p className="t-sm mt-5 text-tinta-suave">
        Quem desrespeitar as regras pode ser bloqueado temporária ou permanentemente, conforme a gravidade.
        A comunidade é um espaço de troca entre familiares: não substitui atendimento psicológico.
      </p>
    </Folha>
  );
}

function FolhaNovoRelato({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  const publicar = useLoja((s) => s.publicar);
  const { avisar } = useNavegacao();
  const [texto, setTexto] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const id = useId();

  return (
    <Folha aberta={aberta} aoFechar={aoFechar} titulo="Novo relato">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!publicar(texto)) return;
          vibrar();
          setTexto('');
          setConfirmado(false);
          aoFechar();
          avisar('Relato publicado.');
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor={id} className="t-sm font-semibold">
            Seu relato
          </label>
          <textarea
            id={id}
            rows={5}
            maxLength={LIMITE_RELATO}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="O que você quer compartilhar hoje?"
            className="t-corpo mt-2 w-full resize-none rounded-[14px] border border-linha bg-fundo p-3 outline-none focus:border-lilas-forte"
          />
          <p className="t-legenda text-right text-tinta-suave">
            {texto.length}/{LIMITE_RELATO}
          </p>
        </div>
        <label className="flex cursor-pointer gap-3 rounded-[14px] bg-lilas-claro p-3">
          <input
            type="checkbox"
            checked={confirmado}
            onChange={(e) => setConfirmado(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-lilas-forte"
          />
          <span className="t-sm">
            Meu relato não traz nome, foto, escola, documentos ou localização de crianças ou de outras pessoas.
          </span>
        </label>
        <button
          type="submit"
          disabled={!texto.trim() || !confirmado}
          className="tocavel h-12 w-full rounded-full bg-lilas-forte font-semibold text-white disabled:opacity-40"
        >
          Publicar relato
        </button>
      </form>
    </Folha>
  );
}

/** Tela 4 — ref. 05: feed em formato de microblog, regras visíveis e botão de novo relato. */
export function Comunidade() {
  const { ir } = useNavegacao();
  const relatos = useLoja((s) => s.relatos);
  const usuario = useLoja((s) => s.usuario);
  const [regras, setRegras] = useState(false);
  const [escrevendo, setEscrevendo] = useState(false);

  return (
    <>
      <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 rounded-t-[inherit] bg-fundo/95 pt-[var(--topo-seguro)] backdrop-blur">
          <div className="flex h-14 items-center px-4">
            <button type="button" onClick={() => ir({ tela: 'perfil' })} aria-label="Abrir meu perfil" className="rounded-full">
              <Avatar nome={usuario.nome || '?'} foto={usuario.foto} tamanho={36} />
            </button>
            <h1 className="t-md flex-1 text-center">Comunidade</h1>
            <span className="size-9" />
          </div>
        </header>
        <button
          type="button"
          onClick={() => setRegras(true)}
          className="mx-4 mb-3 flex w-[calc(100%-2rem)] gap-3 rounded-[18px] bg-lilas-claro p-3 text-left"
        >
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-lilas-forte" aria-hidden />
          <span className="t-sm">
            Espaço seguro: sem julgamentos, sem diagnósticos e sem expor crianças.{' '}
            <span className="font-semibold text-lilas-forte underline underline-offset-2">Ver regras</span>
          </span>
        </button>
        <ul className="divide-y divide-linha border-y border-linha bg-superficie pb-24">
          {relatos.map((r) => (
            <ItemRelato key={r.id} relato={r} />
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setEscrevendo(true)}
        className="tocavel absolute right-4 bottom-4 flex h-14 items-center gap-2 rounded-full bg-lilas-forte pr-5 pl-4 font-semibold text-white shadow-[0_12px_24px_-10px_rgba(122,69,207,0.8)]"
      >
        <PenLine size={20} aria-hidden />
        Novo relato
      </button>

      <FolhaRegras aberta={regras} aoFechar={() => setRegras(false)} />
      <FolhaNovoRelato aberta={escrevendo} aoFechar={() => setEscrevendo(false)} />
    </>
  );
}

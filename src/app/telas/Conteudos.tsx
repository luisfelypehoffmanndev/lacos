import { useState } from 'react';
import { ArrowRight, Check, Quote } from 'lucide-react';
import { AVISO_ETICO, CONTEUDOS, ehTexto } from '../../dados/conteudos';
import { nomeCompleto, psicologoPorId } from '../../dados/psicologos';
import { useLoja } from '../../estado/loja';
import { CATEGORIAS, type Conteudo, type ConteudoCartoes, type ConteudoReflexao, type ConteudoTexto } from '../../estado/tipos';
import { useNavegacao } from '../navegacao';
import { Opcoes } from '../componentes/Opcoes';

const TODOS = 'Todos';

const autoria = (c: Conteudo) => {
  const p = psicologoPorId(c.psicologoId);
  return p ? nomeCompleto(p) : 'equipe Laços';
};

function SeloLido() {
  return (
    <span className="t-legenda inline-flex items-center gap-1 rounded-full bg-laranja-claro px-2 py-0.5 text-laranja-forte">
      <Check size={13} strokeWidth={2.5} aria-hidden />
      Lido
    </span>
  );
}

/** Capa grande no topo (ref. 07, ao centro). */
function Destaque({ c, lido }: { c: ConteudoTexto; lido: boolean }) {
  const { ir } = useNavegacao();
  return (
    <section aria-label="Em destaque" className="px-5">
      <button type="button" onClick={() => ir({ tela: 'conteudo', id: c.id })} className="tocavel block w-full text-left">
        <span className="relative block h-[300px] overflow-hidden rounded-[24px] bg-laranja-claro">
          <img src={c.capa} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/25 to-transparent" />
          <span className="absolute top-3 left-3 flex gap-2">
            <span className="t-legenda rounded-full bg-white/90 px-3 py-1.5 text-tinta">{c.minutos} min de leitura</span>
            {lido && <SeloLido />}
          </span>
          <span className="absolute right-4 bottom-4 left-4 block pr-16 text-white">
            <span className="t-legenda block text-white/80">{c.categoria}</span>
            <span className="t-lg mt-1 block">{c.titulo}</span>
            <span className="t-sm mt-2 block text-white/85">{c.resumo}</span>
          </span>
          <span aria-hidden className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-white text-tinta">
            <ArrowRight size={20} />
          </span>
        </span>
      </button>
      <p className="t-legenda mt-2 text-tinta-suave">Por {autoria(c)}</p>
    </section>
  );
}

/** Linha compacta: foto pequena à esquerda, título e tempo à direita. */
function LinhaTexto({ c, lido }: { c: ConteudoTexto; lido: boolean }) {
  const { ir } = useNavegacao();
  return (
    <button type="button" onClick={() => ir({ tela: 'conteudo', id: c.id })} className="tocavel flex w-full items-center gap-4 text-left">
      <img src={c.capa} alt="" className="size-[84px] shrink-0 rounded-[18px] object-cover" />
      <span className="min-w-0 flex-1">
        <span className="t-legenda block text-laranja-forte">{c.categoria}</span>
        <span className="mt-0.5 block text-[16px] leading-5 font-semibold">{c.titulo}</span>
        <span className="t-legenda mt-1.5 flex items-center gap-2 text-tinta-suave">
          {c.minutos} min de leitura
          {lido && <SeloLido />}
        </span>
      </span>
    </button>
  );
}

/** Reflexão: a frase grande sobre o laranja, como um post. */
function CartaoReflexao({ c, lido }: { c: ConteudoReflexao; lido: boolean }) {
  const { ir } = useNavegacao();
  return (
    <button
      type="button"
      onClick={() => ir({ tela: 'conteudo', id: c.id })}
      className="tocavel relative block w-full overflow-hidden rounded-[24px] bg-laranja p-6 text-left text-tinta"
    >
      <Quote aria-hidden size={88} strokeWidth={1.2} className="absolute -top-3 -right-3 text-white/45" />
      <span className="t-legenda flex items-center gap-2 font-semibold">
        Reflexão
        {lido && <SeloLido />}
      </span>
      <span className="t-lg mt-3 block pr-6">{c.frase}</span>
      <span className="t-sm mt-4 block opacity-80">{autoria(c)}</span>
    </button>
  );
}

/** Informativo em cartões que deslizam para o lado; o último traz o aviso ético. */
function Carrossel({ c }: { c: ConteudoCartoes }) {
  const total = c.cartoes.length;
  const fundos = ['bg-laranja-claro', 'bg-amarelo-claro'];
  return (
    <section aria-label={c.titulo}>
      <h2 className="t-md px-5">{c.titulo}</h2>
      <p className="t-legenda px-5 text-tinta-suave">
        {c.categoria}, por {autoria(c)}. Deslize para o lado.
      </p>
      <div tabIndex={0} className="sem-barra mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 outline-offset-[-2px]">
        {c.cartoes.map((cartao, i) => (
          <article key={cartao.titulo} className={`flex min-h-[176px] w-[76%] shrink-0 snap-start flex-col rounded-[22px] p-5 ${fundos[i % 2]}`}>
            <span className="t-legenda text-laranja-forte">
              {i + 1} de {total}
            </span>
            <h3 className="t-md mt-auto">{cartao.titulo}</h3>
            <p className="t-sm mt-1.5">{cartao.texto}</p>
          </article>
        ))}
        <aside className="flex min-h-[176px] w-[76%] shrink-0 snap-start items-end rounded-[22px] border border-linha bg-superficie p-5">
          <p className="t-legenda text-tinta-suave">{AVISO_ETICO}</p>
        </aside>
      </div>
    </section>
  );
}

/** Tela 5 — ref. 07: título grande, filtros, um destaque e formatos variados (fichamento, item 10). */
export function Conteudos() {
  const lidos = useLoja((s) => s.lidos);
  const [filtro, setFiltro] = useState<string>(TODOS);
  const lista = filtro === TODOS ? CONTEUDOS : CONTEUDOS.filter((c) => c.categoria === filtro);

  // O destaque é o texto mais recente que a pessoa ainda não leu.
  const textos = lista.filter(ehTexto);
  const destaque = textos.find((c) => !lidos.includes(c.id)) ?? textos[0];
  const resto = lista.filter((c) => c !== destaque);

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="rounded-t-[inherit] px-5 pt-[calc(var(--topo-seguro)+12px)]">
        <p className="t-sm text-tinta-suave">Escritos por psicólogas e psicólogos com CRP ativo</p>
        <h1 className="t-xl mt-1">Conteúdos</h1>
      </header>

      <div className="sem-barra overflow-x-auto px-5 py-4 [&_fieldset>div]:flex-nowrap [&_label]:shrink-0">
        <Opcoes
          rotulo="Filtrar por tema"
          rotuloOculto
          valor={filtro}
          aoMudar={setFiltro}
          corAtiva="has-checked:bg-laranja has-checked:border-laranja has-checked:font-semibold"
          opcoes={[TODOS, ...CATEGORIAS].map((c) => ({ valor: c, rotulo: c }))}
        />
      </div>

      {destaque && <Destaque c={destaque} lido={lidos.includes(destaque.id)} />}

      <ul className="mt-7 space-y-7 pb-10">
        {resto.map((c) => (
          <li key={c.id} className={c.formato === 'cartoes' ? '' : 'px-5'}>
            {c.formato === 'texto' && <LinhaTexto c={c} lido={lidos.includes(c.id)} />}
            {c.formato === 'reflexao' && <CartaoReflexao c={c} lido={lidos.includes(c.id)} />}
            {c.formato === 'cartoes' && <Carrossel c={c} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTEUDOS } from '../../dados/conteudos';
import { nomeCompleto, psicologoPorId } from '../../dados/psicologos';
import { CATEGORIAS } from '../../estado/tipos';
import { useNavegacao } from '../navegacao';
import { Opcoes } from '../componentes/Opcoes';

const TODOS = 'Todos';

/** Tela 5 — ref. 07, ao centro: título grande, filtros em pílulas e capas com foto. */
export function Conteudos() {
  const { ir } = useNavegacao();
  const [filtro, setFiltro] = useState<string>(TODOS);
  const lista = filtro === TODOS ? CONTEUDOS : CONTEUDOS.filter((c) => c.categoria === filtro);

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="px-5 pt-[calc(var(--topo-seguro)+12px)]">
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

      <ul className="space-y-6 px-5 pb-8">
        {lista.map((c) => {
          const autor = psicologoPorId(c.psicologoId);
          return (
            <li key={c.id}>
              <button type="button" onClick={() => ir({ tela: 'conteudo', id: c.id })} className="block w-full text-left">
                <span className="relative block h-[232px] overflow-hidden rounded-[20px] bg-laranja-claro">
                  <img src={c.capa} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent" />
                  <span className="t-legenda absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-tinta">
                    {c.minutos} min de leitura
                  </span>
                  <span className="t-md absolute right-20 bottom-4 left-4 text-white">{c.titulo}</span>
                  <span aria-hidden className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-white text-tinta">
                    <ArrowRight size={20} />
                  </span>
                </span>
                <span className="t-legenda mt-2 block text-tinta-suave">
                  {c.categoria}, por {autor ? nomeCompleto(autor) : 'equipe Laços'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

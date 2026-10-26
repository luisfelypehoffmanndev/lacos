import { ChevronDown, ChevronRight } from 'lucide-react';
import { PSICOLOGOS, nomeCompleto, valorDaSessao } from '../../dados/psicologos';
import { useNavegacao } from '../navegacao';
import { ApoioCrise } from '../componentes/Avisos';

const PASSOS = [
  'Você escolhe um profissional e um horário.',
  'O profissional confirma a sessão pelo seu e-mail.',
  'No primeiro encontro, vocês combinam objetivos e número de sessões. É o contrato terapêutico (Resolução CFP nº 13/2022).',
];

/** Tela 6 — fichamento, itens 11 e 13: o que é, limites, valor social e profissionais com CRP. */
export function Psicoterapia() {
  const { ir } = useNavegacao();

  return (
    <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
      <header className="sobre-azul rounded-t-[inherit] rounded-b-[32px] bg-azul px-5 pt-[calc(var(--topo-seguro)+16px)] pb-7 text-white">
        <h1 className="t-xl">Psicoterapia breve</h1>
        <p className="t-corpo mt-3 text-white/90">
          Um espaço de escuta para você, que cuida. Atendimento online, focado em uma questão sua do momento, com duração limitada.
        </p>
        <p className="t-sm mt-5 inline-block rounded-full bg-white/15 px-4 py-2 font-medium">Valor social: R$ 80 a R$ 180 por sessão</p>
      </header>

      <div className="bg-fundo pt-7 pb-8 text-tinta">
        <section className="px-5">
        <h2 className="t-md">Como funciona</h2>
        <ol className="mt-3 space-y-3">
          {PASSOS.map((p, i) => (
            <li key={p} className="t-sm flex gap-3">
              <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-azul-claro font-semibold text-azul">
                {i + 1}
              </span>
              <span className="pt-0.5">{p}</span>
            </li>
          ))}
        </ol>

        <details className="group mt-5 rounded-[20px] border border-linha bg-superficie">
          <summary className="t-sm flex min-h-14 cursor-pointer list-none items-center justify-between px-4 font-semibold">
            Quando a psicoterapia breve não é indicada
            <ChevronDown size={20} className="text-tinta-suave transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <div className="t-sm space-y-2 px-4 pb-4">
            <ul className="list-disc space-y-2 pl-5">
              <li>Quando a busca é por atendimento ou orientação para a pessoa cuidada. Aqui, o atendimento é para você.</li>
              <li>Quando o assunto não tem relação com o seu papel de familiar ou cuidador(a).</li>
              <li>Em emergências. Nesse caso, ligue 188 (CVV) ou 192 (SAMU).</li>
            </ul>
            <p className="text-tinta-suave">
              Se a sua demanda ultrapassar os limites da modalidade, o profissional orienta e faz o encaminhamento adequado.
            </p>
          </div>
        </details>
      </section>

      <section className="mt-8 px-5">
        <h2 className="t-md">Profissionais</h2>
        <p className="t-sm text-tinta-suave">Todos com CRP ativo. Atendimento online, por vídeo.</p>
        <ul className="mt-3 space-y-3">
          {PSICOLOGOS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => ir({ tela: 'psicologo', id: p.id })}
                className="flex w-full items-center gap-4 rounded-[20px] border border-linha bg-superficie p-3 text-left"
              >
                <img src={p.foto} alt="" className="size-16 shrink-0 rounded-[16px] object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] leading-5 font-semibold">{nomeCompleto(p)}</span>
                  <span className="t-legenda mt-0.5 block text-azul">{p.crp}</span>
                  <span className="t-legenda mt-0.5 block text-tinta-suave">{p.formacao}</span>
                  <span className="t-legenda mt-1 block font-semibold">{valorDaSessao(p)} por sessão</span>
                </span>
                <ChevronRight size={20} className="shrink-0 text-tinta-suave" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </section>

        <div className="mt-7 px-5">
          <ApoioCrise nota="O agendamento não é atendimento de urgência." />
        </div>
      </div>
    </div>
  );
}

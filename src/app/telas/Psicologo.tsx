import { useState } from 'react';
import { Video } from 'lucide-react';
import { nomeCompleto, psicologoPorId, valorDaSessao } from '../../dados/psicologos';
import { useLoja } from '../../estado/loja';
import type { DiaSemana, Psicologo as TipoPsicologo } from '../../estado/tipos';
import { useNavegacao } from '../navegacao';
import { Cabecalho } from '../componentes/Cabecalho';
import { CheckDesenhado } from '../componentes/CheckDesenhado';
import { Folha } from '../componentes/Folha';
import { vibrar } from '../vibrar';
import { NaoEncontrado } from './NaoEncontrado';

interface Horario {
  dia: DiaSemana;
  hora: string;
}

function FolhaSolicitacao({ psicologo, horario, aoFechar }: { psicologo: TipoPsicologo; horario: Horario | null; aoFechar: () => void }) {
  const { recomecar } = useNavegacao();
  const solicitarSessao = useLoja((s) => s.solicitarSessao);
  const email = useLoja((s) => s.usuario.email);
  const [aceite, setAceite] = useState(false);
  const [resultado, setResultado] = useState<'ok' | 'duplicada' | null>(null);

  const fechar = () => {
    setAceite(false);
    setResultado(null);
    aoFechar();
  };

  return (
    <Folha aberta={horario !== null} aoFechar={fechar} titulo="Confirmar solicitação">
      {horario &&
        (resultado === 'ok' ? (
          <div className="pt-2 text-center">
            <CheckDesenhado className="mx-auto size-11 text-azul" />
            <h3 className="t-md mt-3">Solicitação enviada</h3>
            <p className="t-sm mt-2 text-tinta-suave">
              {nomeCompleto(psicologo)} vai confirmar o horário{email ? ` pelo e-mail ${email}` : ''}. Tudo o que você conversar na
              sessão é sigiloso (Código de Ética do Psicólogo, art. 9º).
            </p>
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => {
                  fechar();
                  recomecar({ tela: 'perfil', abrir: 'sessoes' });
                }}
                className="tocavel h-12 w-full rounded-full bg-azul font-semibold text-white"
              >
                Ver minhas sessões
              </button>
              <button type="button" onClick={fechar} className="tocavel h-12 w-full rounded-full font-semibold text-azul">
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <dl className="t-sm divide-y divide-linha rounded-[18px] border border-linha">
              {[
                ['Profissional', `${nomeCompleto(psicologo)}, ${psicologo.crp}`],
                ['Horário', `${horario.dia}, ${horario.hora}`],
                ['Formato', 'Online, por vídeo'],
                ['Valor', `${valorDaSessao(psicologo)} por sessão`],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3 px-4 py-3">
                  <dt className="w-24 shrink-0 text-tinta-suave">{t}</dt>
                  <dd className="font-medium">{d}</dd>
                </div>
              ))}
            </dl>
            <label className="flex cursor-pointer gap-3 rounded-[14px] bg-azul-claro p-3">
              <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-azul" />
              <span className="t-sm">
                Entendo que o atendimento é para mim, como familiar ou cuidador(a); que objetivos e número de sessões são
                combinados na primeira sessão; e que este não é um serviço de emergência.
              </span>
            </label>
            {resultado === 'duplicada' && (
              <p role="alert" className="t-sm text-erro">
                Você já solicitou este horário. Acompanhe em Perfil, Minhas sessões.
              </p>
            )}
            <button
              type="button"
              disabled={!aceite}
              onClick={() => {
                const r = solicitarSessao(psicologo.id, horario.dia, horario.hora);
                if (r === 'ok') vibrar();
                setResultado(r);
              }}
              className="tocavel h-12 w-full rounded-full bg-azul font-semibold text-white disabled:opacity-40"
            >
              Enviar solicitação
            </button>
          </div>
        ))}
    </Folha>
  );
}

/** Detalhe do profissional — ref. 07, à direita: foto, CRP, minicurrículo, horários e barra de ação. */
export function Psicologo({ id }: { id: string }) {
  const psicologo = psicologoPorId(id);
  const [escolha, setEscolha] = useState<Horario | null>(null);
  const [confirmando, setConfirmando] = useState(false);
  if (!psicologo) return <NaoEncontrado titulo="Psicoterapia breve" texto="Não encontramos este profissional." />;

  return (
    <>
      <div className="sem-barra min-h-0 flex-1 overflow-y-auto">
        <Cabecalho titulo="Psicoterapia breve" comoTitulo={false} />
        <div className="px-5 pb-8">
          <img src={psicologo.foto} alt={`Foto de ${nomeCompleto(psicologo)}`} className="h-64 w-full rounded-[24px] object-cover object-top" />
          <h1 className="t-lg mt-5">{nomeCompleto(psicologo)}</h1>
          <p className="t-sm mt-1 font-semibold text-azul">{psicologo.crp}</p>
          <p className="t-sm text-tinta-suave">{psicologo.formacao}</p>
          <p className="t-corpo mt-4">{psicologo.minicurriculo}</p>
          <p className="t-sm mt-4 flex items-center gap-2 text-tinta-suave">
            <Video size={18} aria-hidden /> Atendimento online, por vídeo
          </p>

          <section className="mt-7">
            <h2 className="t-md">Horários disponíveis</h2>
            <div role="radiogroup" aria-label="Horários disponíveis">
              {psicologo.horarios.map(({ dia, horas }) => (
                <div key={dia} className="mt-4">
                  <p className="t-sm font-semibold">{dia}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {horas.map((hora) => {
                      const ativo = escolha?.dia === dia && escolha.hora === hora;
                      return (
                        <button
                          key={hora}
                          type="button"
                          role="radio"
                          aria-checked={ativo}
                          aria-label={`${dia}, ${hora}`}
                          onClick={() => setEscolha({ dia, hora })}
                          className={`tocavel t-sm h-11 min-w-20 rounded-full border px-4 font-medium transition-colors duration-150 ${
                            ativo ? 'border-azul bg-azul text-white' : 'border-linha bg-superficie'
                          }`}
                        >
                          {hora}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-b-[inherit] border-t border-linha bg-superficie px-5 pt-3 pb-[calc(12px+var(--base-segura))]">
        <div>
          <p className="t-md">{valorDaSessao(psicologo)}</p>
          <p className="t-legenda text-tinta-suave">por sessão, valor social</p>
        </div>
        <button
          type="button"
          disabled={!escolha}
          onClick={() => setConfirmando(true)}
          className="tocavel ml-auto h-12 rounded-full bg-azul px-6 font-semibold text-white disabled:opacity-40"
        >
          Solicitar sessão
        </button>
      </div>

      <FolhaSolicitacao psicologo={psicologo} horario={confirmando ? escolha : null} aoFechar={() => setConfirmando(false)} />
    </>
  );
}

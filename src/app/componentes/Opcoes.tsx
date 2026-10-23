import { useId } from 'react';

interface Props {
  rotulo: string;
  /** Esconde o rótulo visualmente (continua lido por leitores de tela). */
  rotuloOculto?: boolean;
  valor: string | null;
  aoMudar: (valor: string) => void;
  opcoes: { valor: string; rotulo: string }[];
  /** Classes da pílula selecionada. */
  corAtiva?: string;
  empilhado?: boolean;
}

/** Grupo de escolha única em pílulas, com radios nativos por baixo. */
export function Opcoes({ rotulo, rotuloOculto, valor, aoMudar, opcoes, corAtiva = 'has-checked:bg-tinta has-checked:text-white has-checked:border-tinta', empilhado }: Props) {
  const nome = useId();
  return (
    <fieldset>
      <legend className={rotuloOculto ? 'sr-only' : 't-sm mb-2 font-semibold'}>{rotulo}</legend>
      <div className={empilhado ? 'space-y-2' : 'flex flex-wrap gap-2'}>
        {opcoes.map((o) => (
          <label
            key={o.valor}
            className={`tocavel t-sm flex min-h-11 cursor-pointer items-center rounded-full border transition-colors duration-150 border-linha bg-superficie px-4 has-focus-visible:outline-2 has-focus-visible:outline-azul ${empilhado ? 'rounded-[14px] py-2.5' : ''} ${corAtiva}`}
          >
            <input
              type="radio"
              name={nome}
              value={o.valor}
              checked={valor === o.valor}
              onChange={() => aoMudar(o.valor)}
              className="sr-only"
            />
            {o.rotulo}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

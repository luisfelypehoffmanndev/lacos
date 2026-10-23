import { useNavegacao } from '../navegacao';
import { Cabecalho } from '../componentes/Cabecalho';

export function NaoEncontrado({ titulo, texto }: { titulo: string; texto: string }) {
  const { recomecar } = useNavegacao();
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Cabecalho titulo={titulo} />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <img src="/marca/mascote.png" alt="" className="w-28 opacity-80" />
        <p className="t-corpo mt-4">{texto}</p>
        <button type="button" onClick={() => recomecar({ tela: 'inicio' })} className="tocavel mt-5 h-12 rounded-full bg-tinta px-6 font-semibold text-white">
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}

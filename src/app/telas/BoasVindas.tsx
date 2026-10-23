import { useEffect, useState } from 'react';
import { useLoja } from '../../estado/loja';
import { useNavegacao } from '../navegacao';
import { Laco } from '../componentes/Laco';

/** A abertura (laço se desenhando, mascote subindo) toca uma vez por carregamento da página. */
let aberturaTocada = false;

/** Tela 1 — ref. 02 e painel do grupo: logo, mensagem de acolhimento, objetivo e botão para continuar. */
export function BoasVindas() {
  const { ir, recomecar } = useNavegacao();
  const cadastrado = useLoja((s) => s.usuario.cadastrado);
  const [abrir] = useState(() => !aberturaTocada);
  useEffect(() => {
    aberturaTocada = true;
  }, []);

  return (
    <div className={`sobre-azul relative flex min-h-0 flex-1 flex-col overflow-hidden bg-azul text-white ${abrir ? 'abertura' : ''}`}>
      <Laco variante="grande" className="absolute inset-0 h-full w-full" />
      <div className="sem-barra relative flex flex-1 flex-col overflow-y-auto px-6 pt-[calc(var(--topo-seguro)+16px)] pb-[calc(20px+var(--base-segura))] text-center">
        <img src="/marca/letreiro-branco.png" alt="laços" className="mx-auto h-12 w-auto" />
        <img src="/marca/mascote.png" alt="" className="mascote mx-auto mt-5 w-40 drop-shadow-[0_12px_24px_rgba(10,36,128,0.35)]" />
        <h1 className="mt-6 font-titulo text-[32px] leading-[36px] tracking-[-0.02em] text-balance">
          <span className="font-light">Conectando histórias,</span> <span className="font-extrabold">fortalecendo famílias.</span>
        </h1>
        <p className="t-corpo mx-auto mt-4 max-w-[32ch] text-white/90">
          Uma rede de apoio para quem cuida de pessoas neurodivergentes ou com transtornos psicológicos.
        </p>
        <div className="mt-auto space-y-1 pt-8">
          <button
            type="button"
            onClick={() => ir({ tela: 'cadastro' })}
            className="tocavel h-14 w-full rounded-full bg-white text-[17px] font-semibold text-azul shadow-[0_10px_24px_-10px_rgba(10,36,128,0.6)]"
          >
            Criar meu cadastro
          </button>
          <button
            type="button"
            onClick={() => (cadastrado ? recomecar({ tela: 'inicio' }) : ir({ tela: 'cadastro', modo: 'entrar' }))}
            className="tocavel h-12 w-full rounded-full font-medium text-white"
          >
            Já tenho cadastro
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-7 bg-[#1D4ED8] text-white relative overflow-hidden select-none">
      
      {/* SVG de Curvas e Laços Orgânicos Entrelaçados (Fiel à Referência 02-ref-boas-vindas.jpeg) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 -z-0"
        viewBox="0 0 390 844" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M-50,180 C120,40 280,10 320,160 C360,310 80,360 40,480 C0,600 280,720 440,680" 
          stroke="rgba(255, 255, 255, 0.45)" 
          strokeWidth="16" 
          strokeLinecap="round"
        />
        <path 
          d="M420,120 C240,160 120,320 200,440 C280,560 380,520 340,660 C300,800 120,820 -20,800" 
          stroke="rgba(56, 189, 248, 0.55)" 
          strokeWidth="14" 
          strokeLinecap="round"
        />
        <path 
          d="M80,80 C260,200 360,400 180,520 C0,640 100,780 240,820" 
          stroke="rgba(255, 255, 255, 0.25)" 
          strokeWidth="10" 
        />
      </svg>

      {/* Topo: Logo "laços" com cérebro e cores em degradê (Referência 01-painel-geral-briefing.jpeg) */}
      <div className="pt-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {/* Logo Ícone Laços (Cérebro + Balão de fala) */}
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <path 
                d="M30 40 C20 40 15 50 20 65 C25 80 40 85 50 85 C60 85 75 80 80 65 C85 50 80 40 70 40 C75 30 65 15 50 20 C35 15 25 30 30 40 Z" 
                stroke="url(#logo-grad)" 
                strokeWidth="8" 
                strokeLinecap="round"
              />
              <circle cx="40" cy="55" r="4" fill="#3B82F6" />
              <circle cx="50" cy="55" r="4" fill="#8B5CF6" />
              <circle cx="60" cy="55" r="4" fill="#FB923C" />
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="35%" stopColor="#3B82F6" />
                  <stop offset="70%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white font-display">
            laços
          </span>
        </div>

        <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-white/90">
          Rede de Apoio
        </span>
      </div>

      {/* Meio: Tipografia Fiel à Imagem de Referência 02 */}
      <div className="my-auto py-6 z-10 space-y-4">
        {/* Mascote Acolhedor integrado com carinho */}
        <div className="inline-block bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg mb-2">
          <img 
            src="/mascote.jpeg" 
            alt="Mascote Laços" 
            className="w-20 h-20 object-contain rounded-xl"
          />
        </div>

        {/* Frase em destaque exatamente como na ref 02 */}
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight font-display">
            Aqui<br />
            começa a<br />
            nossa<br />
            história!
          </h1>
          <p className="text-sm font-medium text-white/85 pt-2 leading-snug max-w-xs">
            ¡Te acompanhamos onde quer que você vá!
          </p>
        </div>

        <div className="pt-2 text-xs text-white/70 max-w-xs leading-relaxed">
          Apoio emocional, troca comunitária e psicoterapia breve para famílias atípicas e cuidadores.
        </div>
      </div>

      {/* Rodapé: Botão de ação e Logo Marca d'água */}
      <div className="pt-4 pb-2 z-10 space-y-3">
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-full bg-white text-[#1D4ED8] hover:bg-white/95 font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-black/20 active:scale-[0.98] transition-all"
        >
          <span>Avançar para a Rede</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        {/* Marca d'água "H" / "laços" sutil no rodapé (como na ref 02) */}
        <div className="text-center pt-2">
          <span className="text-2xl font-black opacity-40 font-display tracking-widest text-white">
            laços
          </span>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { MockStatusBar, LogoLacos, MascotVector } from './common';
import { useMockStore } from '../../store/mockStore';

export const Screen1Welcome: React.FC = () => {
  const { setActiveScreen, user } = useMockStore();

  const handleStart = () => {
    if (user.isRegistered) {
      setActiveScreen('screen-3');
    } else {
      setActiveScreen('screen-2');
    }
  };

  return (
    <div className="w-full h-full bg-[#1D4ED8] text-white flex flex-col justify-between p-6 relative overflow-hidden select-none">
      
      {/* Linhas de fita curvas azul-claras que se cruzam no fundo */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 -z-0"
        viewBox="0 0 375 780" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M-40,160 C100,40 260,20 300,160 C340,300 80,340 40,460 C0,580 260,700 420,660" 
          stroke="#93C5FD" 
          strokeWidth="18" 
          strokeLinecap="round"
        />
        <path 
          d="M400,100 C220,140 100,300 180,420 C260,540 360,500 320,640 C280,780 100,800 -40,780" 
          stroke="#60A5FA" 
          strokeWidth="14" 
          strokeLinecap="round"
        />
      </svg>

      {/* Topo com StatusBar e Logo */}
      <div className="z-10 -mx-6 -mt-6">
        <MockStatusBar light />
        <div className="px-6 pt-2 flex justify-center">
          <LogoLacos light size="md" />
        </div>
      </div>

      {/* Centro: Mascote + Textos Especificados */}
      <div className="my-auto py-2 z-10 flex flex-col items-center text-center space-y-4">
        {/* Mascote 2D */}
        <MascotVector className="w-36 h-36" />

        {/* Textos exatos especificados */}
        <div className="space-y-2 px-2">
          <h1 className="text-2xl font-bold font-sans text-white leading-tight">
            Conectando histórias e fortalecendo famílias.
          </h1>
          <p className="text-xs text-blue-100 font-normal leading-relaxed">
            Um espaço seguro de acolhimento, informação e rede de apoio para famílias atípicas e cuidadores.
          </p>
        </div>
      </div>

      {/* Rodapé: Botão Pill Branco */}
      <div className="pt-2 pb-3 z-10">
        <button 
          type="button"
          onClick={handleStart}
          className="w-full py-3.5 px-6 rounded-full bg-[#FFFFFF] text-[#1D4ED8] font-bold text-sm text-center shadow-md hover:bg-gray-50 active:scale-98 transition-all cursor-pointer"
        >
          Começar
        </button>
      </div>

    </div>
  );
};

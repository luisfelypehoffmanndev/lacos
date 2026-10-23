import React from 'react';
import { Screen1Welcome } from './screens/mockup/Screen1Welcome';
import { Screen2Register } from './screens/mockup/Screen2Register';
import { Screen3Dashboard } from './screens/mockup/Screen3Dashboard';
import { Screen4Community } from './screens/mockup/Screen4Community';
import { Screen5Content } from './screens/mockup/Screen5Content';
import { Screen6Booking } from './screens/mockup/Screen6Booking';
import { Screen7Profile } from './screens/mockup/Screen7Profile';
import { useMockStore, ScreenId } from './store/mockStore';
import { Smartphone, LayoutGrid, RotateCcw } from 'lucide-react';

interface ScreenDef {
  id: ScreenId;
  number: number;
  title: string;
  component: React.ComponentType;
  accent: string;
}

const ALL_SCREENS: ScreenDef[] = [
  { id: 'screen-1', number: 1, title: 'Boas-Vindas', component: Screen1Welcome, accent: '#1D4ED8' },
  { id: 'screen-2', number: 2, title: 'Cadastro', component: Screen2Register, accent: '#1D4ED8' },
  { id: 'screen-3', number: 3, title: 'Menu Principal', component: Screen3Dashboard, accent: '#C084FC' },
  { id: 'screen-4', number: 4, title: 'Comunidade', component: Screen4Community, accent: '#C084FC' },
  { id: 'screen-5', number: 5, title: 'Conteúdos', component: Screen5Content, accent: '#E07A38' },
  { id: 'screen-6', number: 6, title: 'Psicoterapia', component: Screen6Booking, accent: '#2563EB' },
  { id: 'screen-7', number: 7, title: 'Perfil', component: Screen7Profile, accent: '#1D4ED8' },
];

export const App: React.FC = () => {
  const { 
    activeScreen, 
    setActiveScreen, 
    presentationMode, 
    setPresentationMode, 
    resetDemoData 
  } = useMockStore();

  const currentScreenDef = ALL_SCREENS.find((s) => s.id === activeScreen) || ALL_SCREENS[2];
  const CurrentActiveComponent = currentScreenDef.component;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col font-sans select-none">
      
      {/* Barra Superior de Apresentação e Controles */}
      <header className="sticky top-0 z-50 bg-[#1E293B]/95 backdrop-blur-md border-b border-white/10 px-6 py-2.5 shrink-0 flex flex-wrap items-center justify-between gap-3">
        
        {/* Identificação da Aplicação */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-0.5 shadow-sm shrink-0">
            <img src="/logo.jpeg" alt="Logo Laços" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide flex items-center gap-2">
              <span>Laços • Protótipo Funcional Front-End</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                ASD-STE100
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">
              Estado local em memória • Sem conexões de backend ou banco de dados
            </p>
          </div>
        </div>

        {/* Alternador de Modo de Exibição */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setPresentationMode('interactive')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                presentationMode === 'interactive'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone size={14} />
              <span>Modo Interativo</span>
            </button>

            <button
              type="button"
              onClick={() => setPresentationMode('side-by-side')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                presentationMode === 'side-by-side'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span>6 Telas Lado a Lado</span>
            </button>
          </div>

          {/* Botão de Reset */}
          <button
            type="button"
            onClick={() => {
              if (confirm('Restaurar dados iniciais da demonstração?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
            title="Reiniciar Dados"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </header>

      {/* RENDERIZAÇÃO DO MODO SELECIONADO */}
      {presentationMode === 'interactive' ? (
        /* ================= MODO APLICATIVO INTERATIVO ================= */
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto">
          
          {/* Navegador Rápido de Telas no Topo do Celular */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto max-w-md w-full no-scrollbar py-1">
            {ALL_SCREENS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScreen(s.id)}
                className={`py-1 px-2.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeScreen === s.id
                    ? 'bg-white text-[#0F172A] shadow-md scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                S{s.number}: {s.title}
              </button>
            ))}
          </div>

          {/* Moldura do Celular com a Tela Ativa Interativa */}
          <div className="w-[360px] h-[750px] bg-white rounded-[40px] border-[8px] border-[#334155] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative shrink-0">
            {/* Dynamic Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0F172A] rounded-full z-40 pointer-events-none" />

            {/* Conteúdo Dinâmico Interativo da Tela Ativa */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <CurrentActiveComponent />
            </div>

            {/* Home Indicator */}
            <div className="w-full h-3 bg-white flex items-center justify-center shrink-0 pointer-events-none">
              <div className="w-24 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-3 text-center">
            Navegue tocando nos botões, cards e abas inferiores como em um celular real.
          </p>
        </main>
      ) : (
        /* ================= MODO 6 TELAS LADO A LADO ================= */
        <main className="flex-1 p-6 md:p-8 overflow-x-auto overflow-y-hidden flex items-start gap-8 no-scrollbar scroll-smooth">
          {ALL_SCREENS.slice(0, 6).map((screen) => {
            const ScreenComponent = screen.component;

            return (
              <section 
                key={screen.id} 
                id={screen.id} 
                className="flex flex-col items-center shrink-0 space-y-3"
              >
                {/* Badge de Identificação da Tela no Topo */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-white/10 shadow-sm text-xs font-bold">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: screen.accent }} 
                  />
                  <span className="text-gray-300">SCREEN {screen.number}:</span>
                  <span className="text-white">{screen.title}</span>
                </div>

                {/* Moldura de Smartphone (360x750) */}
                <div 
                  className="w-[360px] h-[750px] bg-white rounded-[40px] border-[8px] border-[#334155] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col relative"
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0F172A] rounded-full z-40 pointer-events-none" />

                  <div className="flex-1 overflow-hidden flex flex-col">
                    <ScreenComponent />
                  </div>

                  <div className="w-full h-3 bg-white flex items-center justify-center shrink-0 pointer-events-none">
                    <div className="w-24 h-1 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      )}

      {/* Rodapé Informativo */}
      <footer className="bg-[#1E293B]/70 border-t border-white/10 py-2.5 px-6 text-center text-xs text-gray-400 shrink-0">
        Laços • Protótipo de Psicologia FASA (4º Sem.) • Anti-AI Slop • Cores da marca (#C084FC, #E07A38, #2563EB, #1D4ED8)
      </footer>

    </div>
  );
};

export default App;

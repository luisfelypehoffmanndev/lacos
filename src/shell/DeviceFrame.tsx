import React, { useState, useEffect, ReactNode } from 'react';
import { StatusBar } from './StatusBar';
import { Notch } from './Notch';
import { HomeIndicator } from './HomeIndicator';
import { ScreenPortalProvider } from './ScreenPortal';
import { DeviceToolbar } from './DeviceToolbar';
import { useAppStore } from '../store';

interface DeviceFrameProps {
  children: ReactNode;
  statusTheme?: 'dark' | 'light';
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, statusTheme = 'dark' }) => {
  const { preferences } = useAppStore();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Aplica atributos no body/html para data-calm e data-font-size
  useEffect(() => {
    document.documentElement.setAttribute('data-calm', preferences.isCalmMode ? 'true' : 'false');
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
  }, [preferences.isCalmMode, preferences.fontSize]);

  const forceFullscreen = preferences.deviceMode === 'fullscreen' || isSmallScreen;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6 lg:p-8 bg-[#181D20] selection:bg-[#336C63]/30">
      <div className="flex items-start justify-center gap-6 max-w-7xl w-full">
        
        {/* Painel de Controles Lateral (Desktop) */}
        {!isSmallScreen && <DeviceToolbar />}

        {/* Moldura do Aparelho */}
        <div
          className={`relative transition-all duration-300 flex flex-col ${
            forceFullscreen
              ? 'w-full h-[100dvh] max-w-md mx-auto sm:h-[844px] sm:rounded-[44px] sm:border-[8px] sm:border-[#2D3539] sm:shadow-2xl overflow-hidden'
              : 'w-[390px] h-[844px] rounded-[52px] border-[10px] border-[#22282C] ring-1 ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden shrink-0'
          }`}
          style={{
            background: '#FFFFFF',
          }}
        >
          {/* Notch / Dynamic Island */}
          <Notch type={preferences.phoneType} />

          {/* Barra de Status no Topo */}
          <StatusBar theme={statusTheme} />

          {/* Área da Tela do Celular com Portal para Modais */}
          <ScreenPortalProvider>
            <main className="flex-1 overflow-hidden flex flex-col relative w-full h-full">
              {children}
            </main>
          </ScreenPortalProvider>

          {/* Indicador de Gestos no Rodapé */}
          <HomeIndicator />
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { format } from 'date-fns';

interface StatusBarProps {
  theme?: 'dark' | 'light';
}

export const StatusBar: React.FC<StatusBarProps> = ({ theme = 'dark' }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => setTimeStr(format(new Date(), 'HH:mm'));
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = theme === 'light' ? 'text-white' : 'text-[#1A2826]';

  return (
    <header className={`w-full h-11 px-6 pt-1 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${textColor}`}>
      {/* Horário */}
      <span className="tracking-tight text-[13px] font-sans font-medium">{timeStr || '10:45'}</span>

      {/* Ícones de Rede e Bateria */}
      <div className="flex items-center gap-1.5 opacity-90">
        {/* Barras de sinal de celular */}
        <div className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 h-1 bg-current rounded-full"></span>
          <span className="w-0.5 h-1.5 bg-current rounded-full"></span>
          <span className="w-0.5 h-2 bg-current rounded-full"></span>
          <span className="w-0.5 h-2.5 bg-current rounded-full"></span>
        </div>
        
        {/* Wi-Fi */}
        <Wifi size={13} strokeWidth={2.5} />
        
        {/* Bateria com ícone nativo */}
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-mono leading-none">94%</span>
          <Battery size={15} strokeWidth={2.2} className="rotate-90 -mr-0.5" />
        </div>
      </div>
    </header>
  );
};

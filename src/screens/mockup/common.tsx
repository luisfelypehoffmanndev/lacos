import React from 'react';
import { Home, MessageSquare, BookOpen, User, Wifi, Battery } from 'lucide-react';
import { useMockStore, ScreenId } from '../../store/mockStore';

export const LogoLacos: React.FC<{ 
  light?: boolean; 
  size?: 'sm' | 'md' | 'lg';
  showLetter?: boolean;
}> = ({ light = false, size = 'md', showLetter = true }) => {
  const iconH = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-10' : 'h-8';
  const letterH = size === 'sm' ? 'h-5' : size === 'lg' ? 'h-8' : 'h-6';

  if (light) {
    return (
      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm select-none border border-white/40">
        <img 
          src="/logo.jpeg" 
          alt="Logo Laços" 
          className={`${iconH} w-auto object-contain mix-blend-multiply`} 
        />
        {showLetter && (
          <img 
            src="/letter.jpeg" 
            alt="Laços" 
            className={`${letterH} w-auto object-contain mix-blend-multiply`} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <img 
        src="/logo.jpeg" 
        alt="Logo Laços" 
        className={`${iconH} w-auto object-contain mix-blend-multiply`} 
      />
      {showLetter && (
        <img 
          src="/letter.jpeg" 
          alt="Laços" 
          className={`${letterH} w-auto object-contain mix-blend-multiply`} 
        />
      )}
    </div>
  );
};

export const MockStatusBar: React.FC<{ light?: boolean }> = ({ light = false }) => {
  return (
    <div className={`w-full h-8 px-6 flex items-center justify-between text-[11px] font-semibold select-none shrink-0 ${light ? 'text-white' : 'text-[#0F172A]'}`}>
      <span className="font-sans font-medium">9:41</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <div className="flex items-end gap-0.5 h-2">
          <span className="w-0.5 h-1 bg-current rounded-full" />
          <span className="w-0.5 h-1.5 bg-current rounded-full" />
          <span className="w-0.5 h-2 bg-current rounded-full" />
        </div>
        <Wifi size={12} strokeWidth={2.5} />
        <Battery size={14} strokeWidth={2.5} className="rotate-90 -mr-0.5" />
      </div>
    </div>
  );
};

interface MockNavBarProps {
  activeTab?: 'inicio' | 'comunidade' | 'conteudos' | 'perfil';
}

export const MockNavBar: React.FC<MockNavBarProps> = ({ activeTab = 'inicio' }) => {
  const { setActiveScreen } = useMockStore();

  const tabs: Array<{
    id: 'inicio' | 'comunidade' | 'conteudos' | 'perfil';
    label: string;
    icon: any;
    target: ScreenId;
  }> = [
    { id: 'inicio', label: 'Início', icon: Home, target: 'screen-3' },
    { id: 'comunidade', label: 'Comunidade', icon: MessageSquare, target: 'screen-4' },
    { id: 'conteudos', label: 'Conteúdos', icon: BookOpen, target: 'screen-5' },
    { id: 'perfil', label: 'Perfil', icon: User, target: 'screen-7' },
  ];

  return (
    <nav className="w-full bg-[#FFFFFF] border-t border-[#F4F6F9] px-4 py-2 flex items-center justify-around shrink-0 select-none z-20">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveScreen(tab.target)}
            className={`flex flex-col items-center justify-center p-1 transition-colors cursor-pointer active:scale-95 ${
              isActive ? 'text-[#2563EB] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export const MascotVector: React.FC<{ className?: string }> = ({ className = "w-28 h-28" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img 
        src="/mascote.jpeg" 
        alt="Mascote Laços — Celular sorridente com nuvem cérebro colorida e fita do infinito"
        className="w-full h-full object-contain filter drop-shadow-sm"
      />
    </div>
  );
};

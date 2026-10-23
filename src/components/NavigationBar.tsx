import React from 'react';
import { Home, Heart, Calendar, User, MessageCircle } from 'lucide-react';
import { useAppStore } from '../store';

export const NavigationBar: React.FC = () => {
  const { currentTab, setCurrentTab } = useAppStore();

  const navItems = [
    {
      id: 'inicio' as const,
      label: 'Início',
      icon: Home,
    },
    {
      id: 'comunidade' as const,
      label: 'Comunidade',
      icon: MessageCircle,
    },
    {
      id: 'conteudos' as const,
      label: 'Conteúdos',
      icon: Heart,
    },
    {
      id: 'terapia' as const,
      label: 'Terapia',
      icon: Calendar,
    },
    {
      id: 'perfil' as const,
      label: 'Perfil',
      icon: User,
    },
  ];

  return (
    <nav 
      aria-label="Navegação Principal"
      className="w-full bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-around z-20 shrink-0"
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 transition-all select-none ${
              isActive 
                ? 'text-[#0F1419] font-extrabold scale-110' 
                : 'text-[#8A96A3] hover:text-[#0F1419]'
            }`}
          >
            <Icon 
              size={22} 
              strokeWidth={isActive ? 2.5 : 1.8} 
              fill={isActive && item.id === 'conteudos' ? 'currentColor' : 'none'} 
            />
            <span className="text-[10px] tracking-tight mt-0.5 font-sans leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

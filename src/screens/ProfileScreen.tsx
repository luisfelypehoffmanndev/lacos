import React from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Phone, 
  Mail, 
  ChevronRight, 
  RotateCcw, 
  Eye, 
  Calendar, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';
import { useAppStore } from '../store';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    setCurrentTab, 
    scheduledSessions, 
    savedArticleIds, 
    preferences, 
    toggleCalmMode, 
    resetDemo 
  } = useAppStore();

  return (
    <div className="flex-1 flex flex-col bg-[#F3F4F6] relative overflow-y-auto no-scrollbar">
      
      {/* Topo Azul Real com Curva, Título "PERFIL" e Botões (Fiel à Referência 06-ref-perfil.jpeg) */}
      <div className="bg-[#1D4ED8] pt-3 pb-16 px-5 text-white rounded-b-[36px] relative shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentTab('inicio')}
            className="p-1 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Voltar para Início"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="font-extrabold text-sm tracking-wider uppercase text-white font-display">
            PERFIL
          </h1>

          <button 
            className="p-1 text-white hover:bg-white/10 rounded-full transition-colors"
            title="Editar perfil"
          >
            <Edit3 size={18} />
          </button>
        </div>
      </div>

      {/* Conteúdo com os Cards Flutuantes (Fiel à Referência 06) */}
      <div className="px-5 -mt-10 space-y-4 pb-8 z-10">
        
        {/* Card Principal: Avatar Transpassando o Topo + Nome + Bio */}
        <div className="bg-white rounded-3xl p-5 pt-0 text-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] border border-gray-100 relative">
          {/* Avatar Protrudindo no Topo */}
          <div className="-mt-10 mb-3 inline-block">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mx-auto"
            />
          </div>

          <h2 className="font-extrabold text-lg text-[#0F1419] font-display">
            {user.name}
          </h2>
          <p className="text-xs font-bold text-[#1D4ED8] mt-0.5">
            {user.role}
          </p>
          <p className="text-xs text-[#536471] mt-2 leading-relaxed max-w-xs mx-auto">
            {user.bio || 'Mãe em tempo integral, aprendendo a cada dia sobre neurodiversidade e buscando equilíbrio.'}
          </p>
        </div>

        {/* Segundo Card: Telefone e E-mail (Fiel à Referência 06) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 space-y-3">
          <div className="flex items-center gap-3 text-xs text-[#0F1419]">
            <Phone size={16} className="text-[#1D4ED8] shrink-0" />
            <span className="font-medium">+55 (55) 99824-3310</span>
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center gap-3 text-xs text-[#0F1419]">
            <Mail size={16} className="text-[#1D4ED8] shrink-0" />
            <span className="font-medium truncate">{user.email}</span>
          </div>
        </div>

        {/* Botões de Navegação com Seta para a Direita (Fiel à Referência 06) */}
        <div className="space-y-2.5">
          
          {/* Sessões Agendadas */}
          <button
            onClick={() => setCurrentTab('terapia')}
            className="w-full bg-[#E5E7EB]/70 hover:bg-[#E5E7EB] p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-[#0F1419] transition-all"
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#1D4ED8]" />
              <span>Minhas Sessões de Terapia ({scheduledSessions.length})</span>
            </div>
            <ChevronRight size={18} className="text-[#536471]" />
          </button>

          {/* Artigos Salvos */}
          <button
            onClick={() => setCurrentTab('conteudos')}
            className="w-full bg-[#E5E7EB]/70 hover:bg-[#E5E7EB] p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-[#0F1419] transition-all"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#FB923C]" />
              <span>Artigos Salvos ({savedArticleIds.length})</span>
            </div>
            <ChevronRight size={18} className="text-[#536471]" />
          </button>

          {/* Toggle Modo Calmo */}
          <button
            onClick={toggleCalmMode}
            className="w-full bg-[#E5E7EB]/70 hover:bg-[#E5E7EB] p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-[#0F1419] transition-all"
          >
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-[#8B5CF6]" />
              <div className="text-left">
                <span>Modo Calmo (Sensory Safe)</span>
                <span className="text-[10px] text-[#536471] block font-normal">
                  {preferences.isCalmMode ? 'Ativado (cores suaves)' : 'Desativado'}
                </span>
              </div>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${preferences.isCalmMode ? 'bg-[#1D4ED8]' : 'bg-gray-400'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${preferences.isCalmMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </button>

        </div>

        {/* Nota LGPD e Ética */}
        <div className="p-3 bg-white rounded-2xl border border-gray-100 flex items-start gap-2 text-[11px] text-[#536471]">
          <ShieldCheck size={16} className="text-[#1D4ED8] shrink-0 mt-0.5" />
          <p>
            Privacidade protegida nos termos da LGPD e normas do Conselho Federal de Psicologia (CFP).
          </p>
        </div>

        {/* Reiniciar Demonstração */}
        <button
          onClick={() => {
            if (confirm('Deseja reiniciar a demonstração e restaurar o protótipo?')) {
              resetDemo();
            }
          }}
          className="w-full py-3 px-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw size={14} />
          <span>Reiniciar Dados da Demonstração</span>
        </button>

      </div>

    </div>
  );
};

import React from 'react';
import { MockStatusBar, MockNavBar } from './common';
import { ArrowLeft, Phone, Mail, Calendar, RotateCcw, ShieldCheck, CheckCircle2, Edit3 } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

export const Screen7Profile: React.FC = () => {
  const { 
    user, 
    bookedSessions, 
    resetDemoData, 
    setActiveScreen 
  } = useMockStore();

  return (
    <div className="w-full h-full bg-[#F4F6F9] text-[#0F172A] flex flex-col justify-between overflow-hidden select-none relative">
      
      {/* Topo Azul com Curva (Fiel à Referência 06-ref-perfil.jpeg) */}
      <div className="bg-[#1D4ED8] text-white pt-0 pb-12 px-6 rounded-b-[28px] shrink-0 shadow-sm relative">
        <div className="-mx-6">
          <MockStatusBar light />
        </div>
        
        <div className="pt-2 flex items-center justify-between">
          <button 
            type="button"
            onClick={() => setActiveScreen('screen-3')}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Voltar para Início"
          >
            <ArrowLeft size={16} />
          </button>
          
          <h1 className="text-xs font-bold uppercase tracking-widest text-white">
            PROFILE
          </h1>
          
          <button
            type="button"
            onClick={() => setActiveScreen('screen-2')}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Editar cadastro"
          >
            <Edit3 size={15} />
          </button>
        </div>
      </div>

      {/* Conteúdo com Rolagem Suave sem qualquer corte de avatar */}
      <div className="flex-1 overflow-y-auto px-5 -mt-6 space-y-3.5 z-10 no-scrollbar pb-5">
        
        {/* Card Principal: Foto 100% visível + Nome + Subtítulo + Bio (Fiel à Ref 06) */}
        <div className="bg-white rounded-[20px] p-5 text-center shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] border border-gray-100">
          
          {/* Foto de Perfil Centralizada com Moldura Limpa (sem margem negativa cortada) */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-18 h-18 rounded-full object-cover border-3 border-blue-50 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
          </div>

          <h2 className="font-bold text-base text-[#0F172A] leading-snug">
            {user.name}
          </h2>
          <p className="text-xs text-[#2563EB] font-semibold mt-0.5">
            Familiar cuidador(a) • {user.gender}
          </p>

          <div className="border-t border-gray-100 my-3" />

          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Espaço de acolhimento mútuo, informação segura e rede de apoio para cuidadores e famílias de neurodivergentes.
          </p>
        </div>

        {/* Segundo Card: Telefone e E-mail (Fiel à Referência 06) */}
        <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center gap-3 text-xs text-[#0F172A]">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Phone size={14} />
            </div>
            <span className="font-medium">+55 (55) 99824-3310</span>
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center gap-3 text-xs text-[#0F172A]">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Mail size={14} />
            </div>
            <span className="font-medium truncate">{user.email}</span>
          </div>
        </div>

        {/* Botões de Ação no estilo Pill Cinza (Fiel à Referência 06) */}
        <div className="space-y-2">
          {/* Sessões Agendadas */}
          <div className="bg-white rounded-[16px] p-3.5 shadow-sm border border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-2">
                <Calendar size={14} className="text-[#2563EB]" />
                Sessões Agendadas
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB]">
                {bookedSessions.length} ativa(s)
              </span>
            </div>

            {bookedSessions.length === 0 ? (
              <div className="p-2.5 bg-[#F4F6F9] rounded-[8px] text-center text-xs text-[#64748B]">
                Nenhuma sessão agendada no momento.
                <button
                  type="button"
                  onClick={() => setActiveScreen('screen-6')}
                  className="block text-[#2563EB] font-bold mt-1 text-[11px] hover:underline mx-auto cursor-pointer"
                >
                  Agendar psicoterapia breve →
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                {bookedSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="p-2.5 bg-[#EFF6FF] rounded-[10px] border border-blue-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#0F172A] block">{session.psychologist}</span>
                      <span className="text-[10px] text-[#2563EB] font-semibold">{session.slot}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Confirmada
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Termos LGPD e Privacidade */}
          <div className="p-3 bg-white rounded-[16px] border border-gray-100 flex items-start gap-2.5 text-[10px] text-[#64748B] leading-tight">
            <ShieldCheck size={15} className="text-[#1D4ED8] shrink-0 mt-0.5" />
            <p>
              Privacidade em total conformidade com a LGPD e normativas CFP 13/2022 e 09/2024. Seus dados não são compartilhados com terceiros.
            </p>
          </div>
        </div>

        {/* Reiniciar Demonstração */}
        <button
          type="button"
          onClick={() => {
            if (confirm('Deseja restaurar todos os dados iniciais do protótipo?')) {
              resetDemoData();
            }
          }}
          className="w-full py-2.5 rounded-[10px] bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reiniciar Dados da Demonstração</span>
        </button>

      </div>

      {/* Barra de Navegação Inferior (Perfil Ativo) */}
      <MockNavBar activeTab="perfil" />

    </div>
  );
};

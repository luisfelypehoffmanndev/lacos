import React from 'react';
import { MockStatusBar, MockNavBar } from './common';
import { Info, Calendar, CheckCircle2, X, ArrowLeft } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

export const Screen6Booking: React.FC = () => {
  const { 
    selectedSlot, 
    selectSlot, 
    confirmBooking, 
    bookingSuccess, 
    clearBookingSuccess, 
    setActiveScreen 
  } = useMockStore();

  const isSlotActive = (slotId: string) => selectedSlot === slotId;

  return (
    <div className="w-full h-full bg-[#F4F6F9] text-[#0F172A] flex flex-col justify-between overflow-hidden select-none relative">
      
      {/* Topo com StatusBar e Barra com a Letter 'laços' */}
      <div className="shrink-0 bg-white border-b border-gray-100">
        <MockStatusBar />
        
        <div className="px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('screen-3')}
              className="p-1 -ml-1 rounded-full text-gray-500 hover:text-[#0F172A] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Voltar"
            >
              <ArrowLeft size={16} />
            </button>
            <img 
              src="/letter.jpeg" 
              alt="laços" 
              className="h-7 w-auto object-contain mix-blend-multiply select-none" 
            />
          </div>
          <span className="text-[11px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full">
            Psicoterapia Breve
          </span>
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        
        {/* Top Info Box (Azul Claro) */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-[16px] flex items-start gap-2.5 shadow-2xs">
          <Info size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-xs text-[#1E40AF] font-medium leading-snug">
            Psicoterapia Breve: Atendimento focado nas necessidades emocionais do familiar/cuidador. Valor social: R$ 80,00 a R$ 180,00.
          </p>
        </div>

        {/* Psychologist Profile Card: border-radius 16px */}
        <div className="bg-[#FFFFFF] rounded-[16px] p-4 shadow-sm border border-gray-100 space-y-4">
          
          {/* Foto e Títulos da Psicóloga */}
          <div className="flex items-start gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
              alt="Psicóloga Ana Souza"
              className="w-13 h-13 rounded-full object-cover border-2 border-blue-50 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm text-[#0F172A] leading-tight truncate">
                Psicóloga Ana Souza | CRP 00/00000
              </h2>
              <p className="text-xs text-[#2563EB] font-medium mt-0.5 leading-tight">
                Pós-Graduada em Psicologia Social e Comunitária
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-1">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Atendimento online via TDICs</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Available Time Slots (Selectable pills) */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1">
              <Calendar size={13} className="text-[#2563EB]" />
              Horários Disponíveis:
            </span>

            {/* Segunda-feira */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] block">Segunda-feira:</span>
              <div className="flex flex-wrap gap-1.5">
                {['14:00', '15:30', '17:00'].map((time) => {
                  const slotLabel = `Segunda-feira: ${time}`;
                  const active = isSlotActive(slotLabel);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => selectSlot(slotLabel)}
                      className={`text-xs py-1.5 px-3 rounded-full border transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-xs' 
                          : 'bg-[#F4F6F9] text-[#0F172A] border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quarta-feira */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] block">Quarta-feira:</span>
              <div className="flex flex-wrap gap-1.5">
                {['09:00', '19:00'].map((time) => {
                  const slotLabel = `Quarta-feira: ${time}`;
                  const active = isSlotActive(slotLabel);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => selectSlot(slotLabel)}
                      className={`text-xs py-1.5 px-3 rounded-full border transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-xs' 
                          : 'bg-[#F4F6F9] text-[#0F172A] border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sexta-feira */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] block">Sexta-feira:</span>
              <div className="flex flex-wrap gap-1.5">
                {['11:00'].map((time) => {
                  const slotLabel = `Sexta-feira: ${time}`;
                  const active = isSlotActive(slotLabel);
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => selectSlot(slotLabel)}
                      className={`text-xs py-1.5 px-3 rounded-full border transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-xs' 
                          : 'bg-[#F4F6F9] text-[#0F172A] border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Primary Button (Royal Blue #2563EB com border-radius 8px) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={confirmBooking}
              className="w-full py-3 rounded-[8px] bg-[#2563EB] hover:bg-blue-700 active:scale-98 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Solicitar Agendamento ({selectedSlot})
            </button>
          </div>

        </div>

      </div>

      {/* Modal de Confirmação de Agendamento */}
      {bookingSuccess && (
        <div className="absolute inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-[24px] p-5 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#0F172A]">
                Agendamento Confirmado
              </h3>
              <button 
                type="button"
                onClick={clearBookingSuccess}
                className="p-1 text-gray-400 hover:text-[#0F172A] rounded-full"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-4 text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-[#0F172A]">
                Sua solicitação foi enviada (simulação).
              </h4>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Horário reservado: <strong>{selectedSlot}</strong> com a Psicóloga Ana Souza (CRP 00/00000).
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  clearBookingSuccess();
                  setActiveScreen('screen-7');
                }}
                className="w-full py-2.5 rounded-[8px] bg-[#2563EB] text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Ver minhas sessões no perfil
              </button>
              
              <button
                type="button"
                onClick={clearBookingSuccess}
                className="w-full py-2.5 rounded-[8px] bg-gray-100 text-[#0F172A] font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Continuar navegando
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior */}
      <MockNavBar activeTab="inicio" />

    </div>
  );
};

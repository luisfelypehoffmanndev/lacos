import React, { useState } from 'react';
import { HeartHandshake, Calendar, Clock, Info, CheckCircle2 } from 'lucide-react';
import { INITIAL_PSYCHOLOGISTS, useAppStore } from '../store';
import { Psychologist, PsychologistSlot } from '../store/types';
import { BookingModal } from '../components/BookingModal';

export const TherapyScreen: React.FC = () => {
  const { setCurrentTab } = useAppStore();
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<PsychologistSlot | null>(null);

  const handleSelectSlot = (psych: Psychologist, slot: PsychologistSlot) => {
    setSelectedPsychologist(psych);
    setSelectedSlot(slot);
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      
      {/* Topo Display (Fiel à Identidade das Referências) */}
      <div className="p-5 pb-2 shrink-0 space-y-1">
        <span className="text-[11px] font-semibold text-[#536471] block">
          Acolhimento Individualizado
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#0F1419] font-display uppercase tracking-tight">
            PSICOTERAPIA
          </h1>
          <div className="w-9 h-9 rounded-full bg-[#EDE9FE] text-[#8B5CF6] flex items-center justify-center">
            <HeartHandshake size={20} />
          </div>
        </div>
      </div>

      {/* Conteúdo com Rolagem */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar pb-16">
        
        {/* Banner Informativo sobre a Psicoterapia Breve (FASA Summit & CFP) */}
        <div className="bg-[#EDE9FE]/50 p-4 rounded-3xl border border-[#8B5CF6]/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6]">
            <Info size={16} />
            <span>Sobre a Psicoterapia Breve no Laços</span>
          </div>
          <p className="text-xs text-[#536471] leading-relaxed">
            Uma abordagem focada no <strong>presente e em demandas delimitadas</strong> (sobrecarga, ansiedade, culpa, isolamento). O atendimento é centrado na saúde mental do <strong>familiar ou cuidador</strong>, sem exigir processos longos imediatos.
          </p>
          <div className="text-[11px] text-[#8B5CF6] font-semibold pt-1 border-t border-[#8B5CF6]/15 flex items-center justify-between">
            <span>• Atendimento online via TDICs</span>
            <span>• Valor Social (R$ 80 a 180)</span>
          </div>
        </div>

        {/* Lista de Psicólogos Credenciados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#0F1419] uppercase tracking-wider font-display">
              Profissionais Disponíveis
            </h2>
            <span className="text-[11px] text-[#536471]">Registro CRP Ativo</span>
          </div>

          {INITIAL_PSYCHOLOGISTS.map((psych) => (
            <div
              key={psych.id}
              className="bg-[#F8FAFC] p-4 rounded-3xl border border-gray-100 shadow-2xs space-y-3"
            >
              {/* Header do Card */}
              <div className="flex items-start gap-3">
                <img
                  src={psych.avatar}
                  alt={psych.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-sm text-[#0F1419] font-display truncate">
                      {psych.name}
                    </h3>
                    <CheckCircle2 size={14} className="text-[#1D9BF0] fill-[#1D9BF0] text-white shrink-0" />
                  </div>
                  <span className="inline-block text-[10px] font-bold text-[#8B5CF6] bg-[#EDE9FE] px-2 py-0.5 rounded-md mt-0.5">
                    {psych.crp}
                  </span>
                  <p className="text-xs font-semibold text-[#1D4ED8] mt-1 truncate">
                    {psych.approach}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#536471] leading-relaxed line-clamp-2">
                {psych.bio}
              </p>

              {/* Faixa de Valor Social */}
              <div className="text-[11px] bg-white p-2.5 rounded-2xl flex items-center justify-between border border-gray-100">
                <span className="text-[#536471]">Valor Social acordado:</span>
                <span className="font-extrabold text-[#0F1419]">{psych.socialPriceRange}</span>
              </div>

              {/* Horários para Agendamento */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#0F1419] flex items-center gap-1">
                  <Calendar size={12} className="text-[#8B5CF6]" />
                  Próximos horários disponíveis:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {psych.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSelectSlot(psych, slot)}
                      className="py-1.5 px-3 rounded-full border border-gray-200 bg-white hover:bg-[#EDE9FE] hover:border-[#8B5CF6] text-[#0F1419] hover:text-[#8B5CF6] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
                    >
                      <Clock size={11} className="text-[#8B5CF6]" />
                      <span>{slot.dayOfWeek.split('-')[0]}, {slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal de Agendamento */}
      <BookingModal
        psychologist={selectedPsychologist}
        selectedSlot={selectedSlot}
        onClose={() => {
          setSelectedPsychologist(null);
          setSelectedSlot(null);
        }}
        onSuccess={() => {
          setCurrentTab('perfil');
        }}
      />

    </div>
  );
};

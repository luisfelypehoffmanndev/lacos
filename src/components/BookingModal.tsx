import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ScreenPortal } from '../shell/ScreenPortal';
import { Psychologist, PsychologistSlot } from '../store/types';
import { useAppStore } from '../store';

interface BookingModalProps {
  psychologist: Psychologist | null;
  selectedSlot: PsychologistSlot | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  psychologist,
  selectedSlot,
  onClose,
  onSuccess,
}) => {
  const { bookSession } = useAppStore();
  const [acceptedEthicalTerms, setAcceptedEthicalTerms] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!psychologist || !selectedSlot) return null;

  const handleConfirm = () => {
    if (!acceptedEthicalTerms) return;
    const ok = bookSession(psychologist.id, selectedSlot.id);
    if (ok) {
      setIsConfirmed(true);
    }
  };

  const handleFinish = () => {
    setIsConfirmed(false);
    onSuccess();
    onClose();
  };

  return (
    <ScreenPortal>
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
        <div className="bg-white rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden shadow-2xl border-t border-gray-100 animate-in slide-in-from-bottom duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] text-[#8B5CF6] flex items-center justify-center">
                <HeartHandshake size={18} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0F1419] font-display">
                  Agendar Psicoterapia Breve
                </h2>
                <p className="text-[11px] text-[#536471]">Atendimento online demonstrativo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-[#536471] transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto no-scrollbar space-y-4">
            
            {/* Estado de Sucesso */}
            {isConfirmed ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#0F1419] font-display">
                  Sessão Demonstrativa Confirmada!
                </h3>
                <p className="text-xs text-[#536471] max-w-xs mx-auto leading-relaxed">
                  Seu horário com <strong>{psychologist.name}</strong> para <strong>{selectedSlot.dayOfWeek} ({selectedSlot.dateStr}) às {selectedSlot.time}</strong> foi reservado no seu perfil.
                </p>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-left text-xs text-[#536471] space-y-1">
                  <p>• <strong>Duração da sessão:</strong> 50 minutos via link de videoconferência.</p>
                  <p>• <strong>Contrato terapêutico:</strong> Acordado na 1ª sessão (Res. CFP nº 13/2022).</p>
                  <p>• <strong>Faixa de valor social:</strong> {psychologist.socialPriceRange}.</p>
                </div>
                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-full bg-[#1D4ED8] text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
                >
                  Concluir e Ver Meus Agendamentos
                </button>
              </div>
            ) : (
              <>
                {/* Resumo do Profissional */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <img
                    src={psychologist.avatar}
                    alt={psychologist.name}
                    className="w-12 h-12 rounded-full object-cover border border-white shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0F1419] font-display">
                      {psychologist.name}
                    </h4>
                    <span className="text-[11px] text-[#8B5CF6] font-bold block">
                      {psychologist.crp}
                    </span>
                    <span className="text-[11px] text-[#536471] block">
                      {psychologist.specialty}
                    </span>
                  </div>
                </div>

                {/* Horário Selecionado */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#8B5CF6]" />
                    <span className="text-xs font-semibold text-[#0F1419]">
                      {selectedSlot.dayOfWeek}, {selectedSlot.dateStr}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6] bg-[#EDE9FE] px-2.5 py-1 rounded-lg">
                    <Clock size={13} />
                    <span>{selectedSlot.time}</span>
                  </div>
                </div>

                {/* Faixa de Valor Social */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6]">
                    Valor do Atendimento
                  </span>
                  <p className="text-sm font-extrabold text-[#0F1419]">
                    {psychologist.socialPriceRange}
                  </p>
                  <p className="text-[11px] text-[#536471] leading-snug">
                    O valor social e a forma de acerto são combinados diretamente com o profissional na primeira sessão de acolhimento.
                  </p>
                </div>

                {/* Termo Ético Obrigatório (CFP & FASA) */}
                <div className="bg-[#EDE9FE]/40 p-3.5 rounded-2xl border border-[#8B5CF6]/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6]">
                    <ShieldCheck size={16} />
                    <span>Consentimento Ético (Resolução CFP 09/2024)</span>
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#536471] leading-snug">
                    <input
                      type="checkbox"
                      checked={acceptedEthicalTerms}
                      onChange={(e) => setAcceptedEthicalTerms(e.target.checked)}
                      className="mt-0.5 rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
                    />
                    <span>
                      Declaro que este atendimento é voltado às <strong>minhas demandas emocionais como cuidador(a)</strong> e estou ciente de que a psicoterapia breve <strong>não substitui tratamento de emergência nem pronto-socorro</strong>.
                    </span>
                  </label>
                </div>

                {/* Botão de Confirmação */}
                <div className="pt-2">
                  <button
                    onClick={handleConfirm}
                    disabled={!acceptedEthicalTerms}
                    className="w-full py-3.5 px-4 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition-all active:scale-98"
                  >
                    Confirmar Solicitação de Sessão
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </ScreenPortal>
  );
};

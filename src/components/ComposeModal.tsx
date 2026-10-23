import React, { useState } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import { ScreenPortal } from '../shell/ScreenPortal';
import { useAppStore } from '../store';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_TAGS = [
  'MaternidadeAtípica',
  'PaternidadeAtípica',
  'EscolaInclusiva',
  'Desabafo',
  'DireitosELaudo',
  'VitoriaDoDia',
  'Sensorialidade',
];

export const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const { addPost, user } = useAppStore();
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Desabafo']);
  const [hasSensitive, setHasSensitive] = useState(false);
  const [sensitiveReason, setSensitiveReason] = useState('');

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPost(
      content.trim(),
      selectedTags,
      hasSensitive,
      hasSensitive ? (sensitiveReason.trim() || 'Relato sobre exaustão e sobrecarga emocional') : undefined
    );

    setContent('');
    setSelectedTags(['Desabafo']);
    setHasSensitive(false);
    setSensitiveReason('');
    onClose();
  };

  return (
    <ScreenPortal>
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
        <div className="bg-white rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden shadow-2xl border-t border-gray-100 animate-in slide-in-from-bottom duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-base font-extrabold text-[#0F1419] font-display">
                Novo Relato na Comunidade
              </h2>
              <p className="text-[11px] text-[#536471]">
                Compartilhando como <span className="font-semibold text-[#1D9BF0]">{user.name}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-[#536471] transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 flex-1 flex flex-col gap-3.5 overflow-y-auto no-scrollbar">
            
            {/* Campo de Texto */}
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 focus-within:border-[#1D9BF0] focus-within:bg-white transition-colors">
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="O que está acontecendo no seu dia? Este é um espaço seguro de escuta..."
                className="w-full text-sm text-[#0F1419] placeholder-[#536471]/60 resize-none focus:outline-none bg-transparent leading-relaxed font-sans"
              />
            </div>

            {/* Aviso Ético de Proteção à Criança (ECA & FASA) */}
            <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 flex items-start gap-2">
              <ShieldAlert size={16} className="text-[#1D9BF0] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#536471] leading-snug">
                <strong className="text-[#0F1419]">Lembrete Ético:</strong> Preserve a intimidade, nome completo e rosto de crianças e dependentes vulneráveis.
              </p>
            </div>

            {/* Seleção de Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F1419]">
                Temas relacionados:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs py-1 px-2.5 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-[#1D9BF0] border-[#1D9BF0] text-white font-bold'
                          : 'bg-white border-gray-200 text-[#536471] hover:text-[#0F1419]'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opção de Conteúdo Sensível */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 space-y-2">
              <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-[#0F1419]">
                <span>Marcar como relato sensível (CW)?</span>
                <input
                  type="checkbox"
                  checked={hasSensitive}
                  onChange={(e) => setHasSensitive(e.target.checked)}
                  className="rounded text-[#1D9BF0] focus:ring-[#1D9BF0]"
                />
              </label>
              {hasSensitive && (
                <input
                  type="text"
                  value={sensitiveReason}
                  onChange={(e) => setSensitiveReason(e.target.value)}
                  placeholder="Motivo (Ex: Crise de pânico, exaustão aguda...)"
                  className="w-full text-xs py-1.5 px-2 bg-white rounded-lg border border-gray-200 focus:outline-none"
                />
              )}
            </div>

            {/* Botão de Envio Twitter-Style */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!content.trim()}
                className="w-full py-3.5 px-4 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-400/20 transition-all active:scale-98"
              >
                <Send size={15} />
                <span>Publicar Relato</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </ScreenPortal>
  );
};

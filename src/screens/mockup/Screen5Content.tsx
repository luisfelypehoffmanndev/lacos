import React, { useState, useEffect } from 'react';
import { MockStatusBar, MockNavBar } from './common';
import { ShieldAlert, Volume2, VolumeX, ArrowLeft, Bookmark } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

export const Screen5Content: React.FC = () => {
  const { 
    isArticleReaderOpen, 
    openArticleReader, 
    closeArticleReader 
  } = useMockStore();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta reprodução de áudio nativa.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `Sobrecarga materna e o direito ao autocuidado. Por Psicóloga Karen Kotlewski. A sobrecarga de mães e cuidadores de pessoas atípicas é um fenômeno frequente e legítimo. O autocuidado não é um luxo, mas uma necessidade essencial para a sustentabilidade da família. Fazer pausas conscientes e buscar escuta psicológica reduz o adoecimento e fortalece os vínculos.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    closeArticleReader();
  };

  return (
    <div className="w-full h-full bg-[#F4F6F9] text-[#0F172A] flex flex-col justify-between overflow-hidden select-none relative">
      
      {/* Topo com StatusBar e Barra estilo Instagram/X com a Letter 'laços' */}
      <div className="shrink-0 bg-white border-b border-gray-100">
        <MockStatusBar />
        
        <div className="px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/letter.jpeg" 
              alt="laços" 
              className="h-7 w-auto object-contain mix-blend-multiply select-none" 
            />
          </div>
          <span className="text-[11px] font-semibold text-[#E07A38] bg-[#E07A38]/10 px-2.5 py-0.5 rounded-full">
            Artigos & Guias
          </span>
        </div>
      </div>

      {/* Feed Vertical de Artigos Educativos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        
        {/* Card 1 Especificado: border-radius 16px, interativo */}
        <article 
          onClick={openArticleReader}
          className="bg-[#FFFFFF] rounded-[16px] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:border-[#E07A38]/50 transition-all cursor-pointer group"
        >
          {/* Imagem de uma xícara calma de chá */}
          <div className="h-40 w-full overflow-hidden bg-amber-50 relative">
            <img 
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600" 
              alt="Xícara de chá calma e acolhedora"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-[10px] font-bold bg-white/95 text-[#E07A38] px-2.5 py-0.5 rounded-[8px] shadow-xs">
                Autocuidado
              </span>
              <span className="text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-[8px] backdrop-blur-xs flex items-center gap-1">
                <Volume2 size={11} /> Com áudio
              </span>
            </div>
          </div>

          {/* Conteúdo do Card */}
          <div className="p-4 space-y-2">
            <h2 className="text-sm font-bold text-[#0F172A] leading-snug group-hover:text-[#E07A38] transition-colors">
              Sobrecarga materna e o direito ao autocuidado
            </h2>
            
            <p className="text-[11px] font-medium text-[#64748B]">
              Por Psicóloga Karen Kotlewski - CRP Ativo
            </p>

            <p className="text-xs text-[#0F172A] leading-relaxed pt-1">
              Reflexões práticas sobre a desconstrução da maternidade infalível, validação da exaustão e estratégias simples de pausa para a preservação da saúde mental.
            </p>

            <div className="pt-1 flex items-center justify-between text-xs text-[#E07A38] font-bold">
              <span>Ler artigo completo →</span>
              <span className="text-[11px] text-gray-400 font-normal">⏱️ 3 min</span>
            </div>

            {/* Aviso Ético Obrigatório dentro do Card (Small gray box) */}
            <div className="mt-2 p-2.5 bg-[#F4F6F9] rounded-[8px] border border-gray-200/80 flex items-start gap-2">
              <ShieldAlert size={14} className="text-gray-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-600 leading-tight">
                <strong>Aviso Ético:</strong> Este conteúdo tem finalidade informativa e educativa. Ele não substitui uma avaliação ou um acompanhamento psicológico individualizado.
              </p>
            </div>
          </div>

        </article>

      </div>

      {/* Barra de Navegação Inferior (Conteúdos Ativo) */}
      <MockNavBar activeTab="conteudos" />

      {/* Leitor Completo do Artigo (Sheet / Modal) */}
      {isArticleReaderOpen && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
          
          {/* Header do Leitor */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-[#0F172A] transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-xs font-bold text-[#0F172A]">Leitura do Artigo</span>
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-full transition-colors ${isBookmarked ? 'text-[#E07A38]' : 'text-gray-400'}`}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Corpo do Artigo com Scroll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#E07A38] uppercase tracking-wider">
                Autocuidado e Parentalidade
              </span>
              <h2 className="text-lg font-bold text-[#0F172A] leading-tight font-display">
                Sobrecarga materna e o direito ao autocuidado
              </h2>
              <p className="text-xs text-[#64748B]">
                Por Psicóloga Karen Kotlewski - CRP Ativo • 20 Out 2026
              </p>
            </div>

            {/* Player de Áudio em Voz Alta */}
            <div className="p-3 bg-[#F4F6F9] rounded-[12px] border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlayingAudio ? 'bg-[#E07A38] text-white animate-pulse' : 'bg-gray-200 text-[#0F172A]'}`}>
                  {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block leading-tight">
                    {isPlayingAudio ? 'Reproduzindo áudio...' : 'Ouvir artigo em áudio'}
                  </span>
                  <span className="text-[10px] text-gray-500 block leading-tight">
                    Voz nativa do sistema em português
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className="py-1 px-3 text-xs font-bold rounded-[8px] bg-[#E07A38] text-white hover:bg-orange-700 transition-colors cursor-pointer"
              >
                {isPlayingAudio ? 'Pausar' : 'Ouvir'}
              </button>
            </div>

            {/* Texto Completo */}
            <div className="space-y-3 text-xs text-[#0F172A] leading-relaxed font-sans">
              <p>
                A sobrecarga vivida por familiares e cuidadores no contexto da neurodiversidade não é apenas física; é uma carga cognitiva contínua de gerenciamento de terapias, reuniões escolares e imprevisibilidade de crises.
              </p>
              <p>
                A literatura em Psicologia evidencia que o autocuidado não é um ato de vaidade ou abandono das responsabilidades parentais. Pelo contrário: é o alicerce biológico e emocional que viabiliza a continuação do cuidado de forma equilibrada e respeitosa.
              </p>
              <p>
                Pausas diárias de 15 minutos, respiração diafragmática consciente e o compartilhamento de sentimentos sem filtro com outros familiares reduzem significativamente os índices de burnout parental.
              </p>
            </div>

            {/* Caixa de Aviso Ético Obrigatória */}
            <div className="p-3 bg-[#F4F6F9] rounded-[8px] border border-gray-200 flex items-start gap-2">
              <ShieldAlert size={15} className="text-gray-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-600 leading-tight">
                <strong>Aviso Ético:</strong> Este conteúdo tem finalidade informativa e educativa. Ele não substitui uma avaliação ou um acompanhamento psicológico individualizado.
              </p>
            </div>

          </div>

          {/* Rodapé com botão fechar */}
          <div className="p-3 border-t border-gray-100 bg-white shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 rounded-[8px] bg-[#0F172A] text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

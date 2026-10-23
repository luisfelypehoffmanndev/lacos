import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Volume2, VolumeX, Star, BookOpen, ShieldCheck } from 'lucide-react';
import { ScreenPortal } from '../shell/ScreenPortal';
import { Article } from '../store/types';
import { useAppStore } from '../store';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ article, onClose }) => {
  const { savedArticleIds, toggleSaveArticle, setCurrentTab } = useAppStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!article) return null;

  const isSaved = savedArticleIds.includes(article.id);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta reprodução de áudio nativa.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. ${article.summary}. ${article.paragraphs.join(' ')}`;
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
    onClose();
  };

  return (
    <ScreenPortal>
      <div className="absolute inset-0 z-50 bg-black/60 flex flex-col justify-end animate-in fade-in duration-200">
        
        {/* Foto Hero no Topo com Botões Flutuantes (Fiel à Referência 07: Mount Fuji Tour) */}
        <div className="relative h-60 w-full shrink-0">
          <img
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />

          {/* Botão Voltar no Topo Esquerdo */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#0F1419] flex items-center justify-center hover:bg-white transition-colors shadow-md"
            aria-label="Voltar"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Botão Favoritar no Topo Direito */}
          <button
            onClick={() => toggleSaveArticle(article.id)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-red-500 flex items-center justify-center hover:bg-white transition-colors shadow-md"
            aria-label="Favoritar"
          >
            <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Tag em Pílula Flutuante na Foto (como o "Hot ticket" da Ref 07) */}
          <div className="absolute top-16 left-4">
            <span className="bg-white text-[#0F1419] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
              {article.tag}
            </span>
          </div>
        </div>

        {/* Sheet Branco com Bordas Superiores Arredondadas (Fiel à Ref 07) */}
        <div className="bg-white rounded-t-[36px] -mt-8 z-10 flex-1 flex flex-col overflow-hidden shadow-2xl">
          
          {/* Conteúdo com Rolagem */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            
            {/* Título Display em Caixa Alta (Fiel à Ref 07: "MOUNT FUJI TOUR") */}
            <div>
              <h2 className="text-2xl font-black font-display text-[#0F1419] uppercase leading-tight tracking-tight">
                {article.title}
              </h2>
              
              {/* Avaliação e Local / Especialidade com Estrela (Fiel à Ref 07) */}
              <div className="flex items-center gap-2 text-xs text-[#536471] mt-2 font-medium">
                <span className="flex items-center gap-1 text-[#0F1419] font-bold">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  4.9
                </span>
                <span>•</span>
                <span>{article.authorName} ({article.authorCRP})</span>
              </div>
            </div>

            {/* Divisor */}
            <div className="border-t border-gray-100" />

            {/* Seção "Programa / Resumo" (Fiel à Ref 07: "Tour program") */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-[#0F1419] uppercase tracking-wider font-display">
                Resumo e Orientações Clínicas
              </h3>
              <p className="text-xs text-[#536471] italic leading-relaxed">
                "{article.summary}"
              </p>
            </div>

            {/* Parágrafos da Leitura */}
            <div className="space-y-3 text-sm text-[#0F1419] leading-relaxed font-sans">
              {article.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Referências Científicas Acadêmicas (FASA) */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0F1419] flex items-center gap-1">
                <BookOpen size={13} className="text-[#1D4ED8]" />
                Fundamentação Teórica
              </h4>
              <ul className="space-y-1">
                {article.references.map((ref, idx) => (
                  <li key={idx} className="text-[11px] text-[#536471]">
                    • {ref}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer Obrigatório do CFP */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2 text-[11px] text-[#536471]">
              <ShieldCheck size={16} className="text-[#1D4ED8] shrink-0 mt-0.5" />
              <p>{article.disclaimer}</p>
            </div>

          </div>

          {/* Rodapé Fiel à Referência 07: Preço/Valor na Esquerda + Botão Preto Grande na Direita */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-4 shrink-0 shadow-lg">
            <div>
              <span className="text-[10px] text-[#536471] uppercase font-bold block">
                Valor Social Sugerido
              </span>
              <span className="text-sm font-extrabold text-[#0F1419]">
                R$ 80 - 180 <span className="text-xs font-normal text-[#536471]">/ sessão</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Botão de Áudio */}
              <button
                onClick={toggleAudio}
                className={`py-3 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isPlayingAudio ? 'bg-red-500 text-white' : 'bg-gray-100 text-[#0F1419] hover:bg-gray-200'
                }`}
                title="Ouvir em áudio"
              >
                {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isPlayingAudio ? 'Pausar' : 'Áudio'}</span>
              </button>

              {/* Botão Preto com Seta (Fiel à Ref 07: "Book tour >") */}
              <button
                onClick={() => {
                  handleClose();
                  setCurrentTab('terapia');
                }}
                className="py-3 px-5 rounded-full bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>Agendar Sessão &gt;</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </ScreenPortal>
  );
};

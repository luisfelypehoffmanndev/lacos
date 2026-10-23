import React, { useState, useId } from 'react';
import { MockStatusBar, MockNavBar } from './common';
import { MessageSquare, Newspaper, ShieldAlert, X, Send, CheckCircle2 } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

interface CardTextureProps {
  tone: 'light-on-color' | 'dark-on-light';
  children?: React.ReactNode;
  variant?: 1 | 2 | 3 | 4;
}

const CardTexture: React.FC<CardTextureProps> = ({ tone, children, variant = 1 }) => {
  const gradientId = useId();
  const strokeColor = tone === 'light-on-color' ? 'text-white/20' : 'text-slate-900/[0.08]';

  // Linhas topográficas / contorno ondulado conforme referência 04 (Secret Santa / Arounda)
  const getLines = () => {
    switch (variant) {
      case 1: // Comunidade: ondas suaves
        return Array.from({ length: 7 }, (_, i) => {
          const y = 25 + i * 16;
          return `M-20 ${y} C 50 ${y - 28}, 110 ${y + 24}, 180 ${y - 8} S 290 ${y - 18}, 350 ${y + 10}`;
        });
      case 2: // Conteúdos: ondas diagonais fluidas
        return Array.from({ length: 7 }, (_, i) => {
          const y = 15 + i * 18;
          return `M-20 ${y + 15} C 60 ${y - 12}, 140 ${y + 32}, 220 ${y} S 300 ${y - 12}, 350 ${y + 20}`;
        });
      case 3: // Psicoterapia: laços amplos e contínuos
        return Array.from({ length: 8 }, (_, i) => {
          const y = 20 + i * 15;
          return `M-20 ${y} C 70 ${y - 25}, 160 ${y + 28}, 240 ${y - 10} S 320 ${y - 15}, 400 ${y + 12}`;
        });
      default: // Sugestões: linhas retilíneas suaves
        return Array.from({ length: 6 }, (_, i) => {
          const y = 20 + i * 18;
          return `M-20 ${y} C 80 ${y - 15}, 180 ${y + 15}, 280 ${y - 8} S 340 ${y + 8}, 400 ${y}`;
        });
    }
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg 
        className="absolute inset-0 h-full w-full" 
        viewBox="0 0 320 180" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={gradientId} cx="85%" cy="90%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={tone === 'light-on-color' ? '0.25' : '0.7'} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        <g 
          className={strokeColor} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.25" 
          strokeLinecap="round"
        >
          {getLines().map((d, idx) => (
            <path key={idx} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>

      {/* Silhueta vetorial 2D flat vazando pelo canto inferior direito */}
      {children && (
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rotate-[-6deg] opacity-25 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

export const Screen3Dashboard: React.FC = () => {
  const { 
    user, 
    setActiveScreen, 
    isFeedbackOpen, 
    openFeedback, 
    closeFeedback 
  } = useMockStore();

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Ajuste gramatical conforme sugestão F5 (ASD-STE100)
  const solitaryWord = user.gender === 'Homem' ? 'sozinho' : user.gender === 'Não-binário' ? 'só' : 'sozinha';
  const firstName = user.name ? user.name.split(' ')[0] : 'Joiciele';

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackText('');
      setFeedbackSent(false);
      closeFeedback();
    }, 1400);
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col justify-between overflow-hidden select-none relative">
      
      {/* Topo com StatusBar e Barra estilo Instagram/X com a Letter 'laços' */}
      <div className="shrink-0 bg-white">
        <MockStatusBar />
        
        {/* Barra Superior estilo Instagram / X: Lettering "laços" à esquerda + Avatar à direita */}
        <div className="px-5 py-2 flex items-center justify-between border-b border-[#F4F6F9]">
          <div className="flex items-center gap-2">
            <img 
              src="/letter.jpeg" 
              alt="laços" 
              className="h-7 w-auto object-contain mix-blend-multiply select-none" 
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('screen-7')}
            className="cursor-pointer active:scale-95 transition-transform"
            title="Ver meu perfil"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
            />
          </button>
        </div>

        {/* Saudação especificada: "Olá, {firstName}. Você não está {word}." */}
        <div className="px-5 pt-3 pb-2.5">
          <h1 className="text-base font-bold text-[#0F172A] leading-tight">
            Olá, {firstName}. Você não está {solitaryWord}.
          </h1>
          <p className="text-[11px] text-[#64748B] mt-0.5">
            Rede de Apoio Laços • Acolhimento e Informação
          </p>
        </div>
      </div>

      {/* Conteúdo Central: 2-Column Grid com border-radius 16px e Texturas 2D (Ref 04) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        
        <div className="grid grid-cols-2 gap-3">
          
          {/* Card 1 (Lilás #C084FC): Comunidade -> Screen 4 */}
          <button
            type="button"
            onClick={() => setActiveScreen('screen-4')}
            className="relative isolate overflow-hidden text-left bg-[#C084FC] text-white p-4 rounded-[16px] flex flex-col justify-between min-h-[135px] shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <CardTexture tone="light-on-color" variant={1}>
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-white w-full h-full">
                <circle cx="35" cy="40" r="14" />
                <circle cx="65" cy="40" r="14" />
                <path d="M12 90 C12 72 24 62 35 62 C46 62 52 68 56 75 C60 68 66 62 77 62 C88 62 98 72 98 90 Z" />
                <path d="M25 22 C20 22 16 26 16 32 C16 40 28 46 32 46 C34 46 36 44 36 40 C36 34 31 22 25 22 Z" opacity="0.6" />
              </svg>
            </CardTexture>

            <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare size={17} strokeWidth={2.2} />
            </div>
            <div className="relative z-10">
              <h2 className="font-bold text-sm leading-tight text-white drop-shadow-sm">
                Comunidade
              </h2>
              <p className="text-[10px] text-white/95 leading-tight mt-1 font-medium">
                Troca de experiências e acolhimento
              </p>
            </div>
          </button>

          {/* Card 2 (Laranja #E07A38): Conteúdos -> Screen 5 */}
          <button
            type="button"
            onClick={() => setActiveScreen('screen-5')}
            className="relative isolate overflow-hidden text-left bg-[#E07A38] text-white p-4 rounded-[16px] flex flex-col justify-between min-h-[135px] shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <CardTexture tone="light-on-color" variant={2}>
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-white w-full h-full">
                <path d="M15 30 C30 25 45 30 50 35 C55 30 70 25 85 30 L85 80 C70 75 55 80 50 85 C45 80 30 75 15 80 Z" />
                <circle cx="75" cy="22" r="8" />
              </svg>
            </CardTexture>

            <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Newspaper size={17} strokeWidth={2.2} />
            </div>
            <div className="relative z-10">
              <h2 className="font-bold text-sm leading-tight text-white drop-shadow-sm">
                Conteúdos
              </h2>
              <p className="text-[10px] text-white/95 leading-tight mt-1 font-medium">
                Textos e vídeos de psicólogos
              </p>
            </div>
          </button>

          {/* Card 3 (Azul Royal #2563EB, largura total / col-span-2): Psicoterapia Breve -> Screen 6 */}
          <button
            type="button"
            onClick={() => setActiveScreen('screen-6')}
            className="col-span-2 relative isolate overflow-hidden text-left bg-[#2563EB] text-white p-4 rounded-[16px] flex items-center gap-3.5 shadow-sm hover:bg-blue-700 active:scale-98 transition-all cursor-pointer min-h-[90px]"
          >
            <CardTexture tone="light-on-color" variant={3}>
              <svg viewBox="0 0 120 100" fill="currentColor" className="text-white w-full h-full">
                <path d="M35 30 C20 30 20 50 35 50 C50 50 70 30 85 30 C100 30 100 50 85 50 C70 50 50 30 35 30 Z" fill="none" stroke="currentColor" strokeWidth="8" />
                <circle cx="35" cy="72" r="12" />
                <circle cx="85" cy="72" r="12" />
                <path d="M20 95 C20 85 28 82 35 82 C42 82 50 85 50 95 Z" />
                <path d="M70 95 C70 85 78 82 85 82 C92 82 100 85 100 95 Z" />
              </svg>
            </CardTexture>

            <div className="relative z-10 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="6">
                <path d="M35 25 C25 25 25 35 35 35 C45 35 55 25 65 25 C75 25 75 35 65 35 C55 35 45 25 35 25 Z" strokeWidth="4" />
                <circle cx="32" cy="50" r="7" />
                <path d="M25 75 L25 62 C25 60 30 60 32 60 L39 60 L39 75" />
                <circle cx="68" cy="50" r="7" />
                <path d="M75 75 L75 62 C75 60 70 60 68 60 L61 60 L61 75" />
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="font-bold text-sm leading-tight text-white drop-shadow-sm">
                Agende uma sessão de psicoterapia breve
              </h2>
              <p className="text-[11px] text-blue-100 leading-tight mt-0.5 font-medium">
                Escuta profissional focada em você
              </p>
            </div>
          </button>

          {/* Card 4 (Cinza Claro #F4F6F9, col-span-2): Sugestões e Denúncias -> Bottom Sheet */}
          <button
            type="button"
            onClick={openFeedback}
            className="col-span-2 relative isolate overflow-hidden text-left bg-[#F4F6F9] border border-gray-200/80 p-3.5 rounded-[16px] flex items-center gap-3 hover:bg-gray-100 active:scale-98 transition-all cursor-pointer"
          >
            <CardTexture tone="dark-on-light" variant={4}>
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#0F172A] w-full h-full opacity-15">
                <path d="M50 15 L80 28 V52 C80 72 65 85 50 90 C35 85 20 72 20 52 V28 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                <path d="M44 48 L50 54 L62 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </CardTexture>

            <div className="relative z-10 w-8 h-8 rounded-full bg-gray-200 text-[#0F172A] flex items-center justify-center shrink-0">
              <ShieldAlert size={16} />
            </div>
            <div className="relative z-10">
              <h2 className="font-bold text-xs text-[#0F172A] leading-tight">
                Sugestões e Denúncias
              </h2>
              <p className="text-[10px] text-[#64748B] leading-tight">
                Ajude a manter este espaço seguro
              </p>
            </div>
          </button>

        </div>

      </div>

      {/* Barra de Navegação Inferior (Início Ativo) */}
      <MockNavBar activeTab="inicio" />

      {/* Bottom Sheet de Sugestões e Denúncias */}
      {isFeedbackOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-[24px] p-5 space-y-4 max-h-[85%] overflow-y-auto shadow-2xl border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <ShieldAlert size={16} />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">
                  Sugestões e Denúncias
                </h3>
              </div>
              <button 
                type="button"
                onClick={closeFeedback}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Este canal é direto, sigiloso e acolhedor. Se você observou alguma conduta inadequada na comunidade ou tem sugestões para melhorar a plataforma Laços, compartilhe abaixo:
            </p>

            {feedbackSent ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                <CheckCircle2 size={36} className="text-green-600 animate-bounce" />
                <h4 className="font-bold text-xs text-[#0F172A]">
                  Mensagem enviada com sucesso!
                </h4>
                <p className="text-[11px] text-[#64748B]">
                  Agradecemos por contribuir para um ambiente seguro e protetor.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Escreva sua sugestão ou relate uma preocupação de forma segura..."
                  required
                  rows={4}
                  className="w-full text-xs p-3 bg-[#F4F6F9] rounded-[12px] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#2563EB] resize-none"
                />

                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>Identificação protegida</span>
                  <span>{feedbackText.length}/500</span>
                </div>

                <button
                  type="submit"
                  disabled={!feedbackText.trim()}
                  className="w-full py-2.5 px-4 rounded-[8px] bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Send size={13} />
                  <span>Enviar com Sigilo</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

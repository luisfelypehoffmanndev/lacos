import React, { useState } from 'react';
import { Sparkles, Feather } from 'lucide-react';
import { useCommunityPosts, useAppStore } from '../store';
import { PostCard } from '../components/PostCard';
import { ComposeModal } from '../components/ComposeModal';

export const CommunityScreen: React.FC = () => {
  const posts = useCommunityPosts();
  const { user, setCurrentTab } = useAppStore();
  const [feedTab, setFeedTab] = useState<'foryou' | 'following'>('foryou');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      
      {/* Topo do Twitter/X (Fiel à Referência 05-ref-comunidade-twitter.jpeg) */}
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="px-4 py-2.5 flex items-center justify-between">
          
          {/* Avatar do Usuário na Esquerda */}
          <button
            onClick={() => setCurrentTab('perfil')}
            className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-black/5 hover:opacity-90 transition-opacity"
            aria-label="Meu Perfil"
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </button>

          {/* Logo do Laços no Centro (como o pássaro do Twitter na ref 05) */}
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl text-[#1D9BF0] font-display tracking-tight">
              laços
            </span>
          </div>

          {/* Ícone de Brilho / Filtro na Direita (como na ref 05) */}
          <button 
            className="p-1.5 text-[#0F1419] hover:bg-gray-100 rounded-full transition-colors"
            title="Destaques"
          >
            <Sparkles size={18} className="text-[#0F1419]" />
          </button>

        </div>

        {/* Abas Superiores "Para você" e "Seguindo" com Linha Azul Ativa */}
        <div className="grid grid-cols-2 text-center text-sm font-bold border-t border-gray-100">
          <button
            onClick={() => setFeedTab('foryou')}
            className={`py-3 relative transition-colors ${
              feedTab === 'foryou' ? 'text-[#0F1419]' : 'text-[#536471] hover:bg-gray-50'
            }`}
          >
            <span>Para você</span>
            {feedTab === 'foryou' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1D9BF0] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedTab('following')}
            className={`py-3 relative transition-colors ${
              feedTab === 'following' ? 'text-[#0F1419]' : 'text-[#536471] hover:bg-gray-50'
            }`}
          >
            <span>Seguindo</span>
            {feedTab === 'following' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1D9BF0] rounded-full" />
            )}
          </button>
        </div>

      </div>

      {/* Feed com Rolagem */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20 divide-y divide-gray-100">
        {posts.map((post, idx) => (
          <PostCard 
            key={post.id} 
            post={post} 
            hasThreadReply={idx === 0} // simula a linha de thread no primeiro post como na ref 05
          />
        ))}

        {/* Thread Mockada como na Referência 05 (Direita) */}
        <div className="border-b border-gray-100 px-4 py-3 bg-white pl-12 flex items-start gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="Brie"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-black/5 shrink-0"
          />
          <div className="flex-1 text-xs space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0F1419]">Brie Camargo</span>
              <span className="text-[#536471]">@brie_psico · 40m</span>
            </div>
            <p className="text-[11px] text-[#536471]">
              Respondendo a <span className="text-[#1D9BF0]">@ana_paula_ferreira</span>
            </p>
            <p className="text-[13px] text-[#0F1419] leading-relaxed">
              Você foi impecável, Ana. A desregulação do Theo não define os limites dele. Seu cansaço é legítimo e a escola precisa urgentemente de letramento sensorial. Estamos com você! 💙
            </p>
          </div>
        </div>
      </div>

      {/* Botão Flutuante Circular Azul com Pena (Pixel-Fiel à Referência 05) */}
      <button
        onClick={() => setIsComposeOpen(true)}
        className="absolute bottom-4 right-4 z-30 w-13 h-13 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white flex items-center justify-center shadow-lg shadow-blue-400/40 active:scale-95 transition-all"
        aria-label="Publicar novo tweet / relato"
      >
        <Feather size={22} strokeWidth={2.2} />
      </button>

      {/* Modal de Publicação */}
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />

    </div>
  );
};

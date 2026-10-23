import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';
import { useAppStore, INITIAL_ARTICLES } from '../store';

export const HomeScreen: React.FC = () => {
  const { user, setCurrentTab, savedArticleIds, toggleSaveArticle } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'routine' | 'crisis'>('all');

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar p-5 space-y-5">
      
      {/* Topo: Menu Hambúrguer + Avatares da Comunidade (Fiel à Referência 04-ref-menu-principal.jpeg) */}
      <div className="flex items-center justify-between pt-1">
        <button 
          onClick={() => setCurrentTab('perfil')}
          className="p-1 text-[#0F1419] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Abrir Menu"
        >
          {/* Ícone de duas linhas = como na referência 04 */}
          <div className="space-y-1 w-5">
            <span className="block w-5 h-0.5 bg-[#0F1419] rounded-full"></span>
            <span className="block w-3.5 h-0.5 bg-[#0F1419] rounded-full"></span>
          </div>
        </button>

        {/* Grupo de Avatares Sobrepostos com Contador "+14" (Fiel à Ref 04) */}
        <div 
          onClick={() => setCurrentTab('comunidade')}
          className="flex items-center -space-x-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
            alt="Membro" 
            className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-black/5"
          />
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
            alt="Membro" 
            className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-black/5"
          />
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
            alt="Membro" 
            className="w-7 h-7 rounded-full object-cover border-2 border-white ring-1 ring-black/5"
          />
          <div className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
            +14
          </div>
        </div>
      </div>

      {/* Título Display em Duas Linhas (Fiel à Referência 04: "Secret Santa in Arounda") */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-[#0F1419] font-display leading-[1.1] tracking-tight">
          Rede Laços<br />
          em Família
        </h1>
        <p className="text-xs text-[#536471] font-medium">
          Olá, {user.name.split(' ')[0]} • {user.role}
        </p>
      </div>

      {/* Pílulas de Filtro (Fiel à Ref 04: "All cards 17", "Left", "Taken") */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#0F1419] text-white shadow-sm'
              : 'bg-gray-100 text-[#536471] hover:text-[#0F1419]'
          }`}
        >
          <span>Todos os pilares</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            activeFilter === 'all' ? 'bg-white text-black' : 'bg-gray-200 text-gray-700'
          }`}>
            4
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('routine')}
          className={`py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'routine'
              ? 'bg-[#0F1419] text-white shadow-sm'
              : 'bg-gray-100 text-[#536471] hover:text-[#0F1419]'
          }`}
        >
          Minha rotina
        </button>

        <button
          onClick={() => setActiveFilter('crisis')}
          className={`py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'crisis'
              ? 'bg-[#0F1419] text-white shadow-sm'
              : 'bg-gray-100 text-[#536471] hover:text-[#0F1419]'
          }`}
        >
          Urgências
        </button>
      </div>

      {/* Grid 2x2 de Cards Coloridos (Pixel-Fiel à Referência 04-ref-menu-principal.jpeg) */}
      <div className="grid grid-cols-2 gap-3.5">
        
        {/* Card 1: Azul (Comunidade) */}
        <button
          onClick={() => setCurrentTab('comunidade')}
          className="relative text-left p-4 rounded-3xl bg-[#3B82F6] text-white h-36 flex flex-col justify-between overflow-hidden shadow-md shadow-blue-500/20 active:scale-97 transition-all group"
        >
          {/* Ilustração sutil de linhas em vetor no fundo (como na ref 04) */}
          <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
              <rect x="20" y="20" width="60" height="60" rx="10" />
              <line x1="50" y1="20" x2="50" y2="80" />
              <line x1="20" y1="50" x2="80" y2="50" />
            </svg>
          </div>
          <span className="text-[11px] font-medium opacity-80">Pilar Nº 1</span>
          <div>
            <h3 className="font-extrabold text-base font-display leading-tight">
              Comunidade
            </h3>
            <span className="text-[11px] opacity-90 block mt-0.5">Troca de relatos</span>
          </div>
        </button>

        {/* Card 2: Laranja / Pêssego (Conteúdos) */}
        <button
          onClick={() => setCurrentTab('conteudos')}
          className="relative text-left p-4 rounded-3xl bg-[#FB923C] text-white h-36 flex flex-col justify-between overflow-hidden shadow-md shadow-orange-500/20 active:scale-97 transition-all group"
        >
          <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
              <circle cx="50" cy="50" r="30" />
              <line x1="20" y1="50" x2="80" y2="50" />
            </svg>
          </div>
          <span className="text-[11px] font-medium opacity-80">Pilar Nº 2</span>
          <div>
            <h3 className="font-extrabold text-base font-display leading-tight">
              Conteúdos
            </h3>
            <span className="text-[11px] opacity-90 block mt-0.5">Artigos e áudio</span>
          </div>
        </button>

        {/* Card 3: Roxo / Violeta (Psicoterapia Breve) */}
        <button
          onClick={() => setCurrentTab('terapia')}
          className="relative text-left p-4 rounded-3xl bg-[#8B5CF6] text-white h-36 flex flex-col justify-between overflow-hidden shadow-md shadow-purple-500/20 active:scale-97 transition-all group"
        >
          <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
              <path d="M20 50 C20 30 50 30 50 50 C50 70 80 70 80 50" />
            </svg>
          </div>
          <span className="text-[11px] font-medium opacity-80">Pilar Nº 3</span>
          <div>
            <h3 className="font-extrabold text-base font-display leading-tight">
              Psicoterapia
            </h3>
            <span className="text-[11px] opacity-90 block mt-0.5">Agendar CRP</span>
          </div>
        </button>

        {/* Card 4: Coral / Vermelho Suave (Plantão de Apoio 24h) */}
        <a
          href="tel:188"
          className="relative text-left p-4 rounded-3xl bg-[#F87171] text-white h-36 flex flex-col justify-between overflow-hidden shadow-md shadow-red-500/20 active:scale-97 transition-all group"
        >
          <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
              <path d="M30 50 L50 70 L70 30" />
            </svg>
          </div>
          <span className="text-[11px] font-medium opacity-80">Plantão 24h</span>
          <div>
            <h3 className="font-extrabold text-base font-display leading-tight">
              Apoio CVV 188
            </h3>
            <span className="text-[11px] opacity-90 block mt-0.5">Ligação gratuita</span>
          </div>
        </a>

      </div>

      {/* Seção Wishlist / Destaques (Fiel à Subtela da Referência 04-ref-menu-principal.jpeg) */}
      <div className="pt-2 space-y-3 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#0F1419] font-display">
            Destaques de Cuidado
          </h2>
          <button 
            onClick={() => setCurrentTab('conteudos')}
            className="text-xs font-semibold text-[#536471] hover:text-[#0F1419] transition-colors"
          >
            Ver todos
          </button>
        </div>

        {/* Lista de Cards Horizontais com Ícone em Caixa Lilás à Esquerda (Fiel à Ref 04) */}
        <div className="space-y-2.5">
          {INITIAL_ARTICLES.slice(0, 3).map((art, idx) => {
            const isSaved = savedArticleIds.includes(art.id);
            return (
              <div
                key={art.id}
                onClick={() => setCurrentTab('conteudos')}
                className="cursor-pointer bg-[#F8FAFC] hover:bg-gray-100 p-3 rounded-2xl border border-gray-100 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Caixa Lilás com Ilustração à Esquerda (Como na Ref 04) */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#8B5CF6] shrink-0">
                    {idx === 0 ? <Sparkles size={24} /> : idx === 1 ? <HeartHandshake size={24} /> : <BookOpen size={24} />}
                  </div>

                  {/* Textos e Tags */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#0F1419] font-display leading-tight truncate max-w-[190px]">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-[#536471] truncate max-w-[190px]">
                      {art.summary}
                    </p>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] font-medium px-2 py-0.2 rounded-md bg-white text-[#536471] border border-gray-200">
                        {art.tag}
                      </span>
                      <span className="text-[10px] text-[#536471]">
                        ⏱️ {art.readTimeMinutes} min
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ícone de Coração à Direita (Como na Ref 04) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveArticle(art.id);
                  }}
                  className={`p-2 transition-colors ${
                    isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                  aria-label={isSaved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Search, ArrowRight, Bookmark } from 'lucide-react';
import { INITIAL_ARTICLES, useAppStore } from '../store';
import { Article } from '../store/types';
import { ArticleReaderModal } from '../components/ArticleReaderModal';

export const ContentScreen: React.FC = () => {
  const { savedArticleIds, toggleSaveArticle } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const filteredArticles = INITIAL_ARTICLES.filter((art) => {
    const matchCat = selectedCategory === 'todos' || art.category === selectedCategory;
    const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const ARTICLE_IMAGES = [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      
      {/* Topo Display (Fiel à Referência 07-ref-conteudos-agendamento.jpeg: "Start now / EXPLORING WORLD") */}
      <div className="p-5 pb-2 shrink-0 space-y-3">
        <div>
          <span className="text-[11px] font-semibold text-[#536471] block">
            Comece agora
          </span>
          <h1 className="text-3xl font-black text-[#0F1419] font-display uppercase tracking-tight">
            CONTEÚDOS & MURAL
          </h1>
        </div>

        {/* Barra de Pesquisa + Pílulas de Filtro (Fiel à Referência 07) */}
        <div className="flex items-center gap-2">
          {/* Caixa de Pesquisa com Ícone Q */}
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-xs">
            <Search size={15} className="text-[#536471] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conteúdos..."
              className="w-full bg-transparent text-[#0F1419] placeholder-[#536471] focus:outline-none"
            />
          </div>

          {/* Chips Horizontais */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'todos', label: 'Destaques' },
              { id: 'crise', label: 'Crises' },
              { id: 'direitos', label: 'Direitos' },
              { id: 'autocuidado', label: 'Autocuidado' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F1419] text-white shadow-sm'
                    : 'bg-gray-100 text-[#536471] hover:text-[#0F1419]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista com os Grandes Cards Visuais (Fiel à Referência 07-ref-conteudos-agendamento.jpeg) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar pb-16">
        {filteredArticles.map((art, idx) => {
          const imageUrl = ARTICLE_IMAGES[idx % ARTICLE_IMAGES.length];
          const isSaved = savedArticleIds.includes(art.id);

          return (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="cursor-pointer relative h-64 rounded-3xl overflow-hidden shadow-md group active:scale-98 transition-all"
            >
              {/* Imagem de Fundo de Alta Qualidade */}
              <img
                src={imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradiente Escuro de Sobreposição para Contraste */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              {/* Pílula de Data no Topo Esquerdo (Fiel à Ref 07: "Sep 16 - Sep 26") */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/80 backdrop-blur-md text-[#0F1419] text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {art.readTimeMinutes} min de leitura • Com Áudio
                </span>
              </div>

              {/* Botão de Salvar no Topo Direito */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveArticle(art.id);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                title={isSaved ? 'Remover' : 'Salvar'}
              >
                <Bookmark size={16} fill={isSaved ? 'white' : 'none'} />
              </button>

              {/* Título Display Branco no Rodapé + Botão Circular com Seta (Fiel à Ref 07) */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div className="space-y-1 max-w-[75%]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                    {art.tag}
                  </span>
                  <h3 className="text-lg font-black text-white font-display uppercase leading-tight line-clamp-2">
                    {art.title}
                  </h3>
                </div>

                {/* Botão Circular Branco com Seta para a Direita */}
                <div className="w-10 h-10 rounded-full bg-white text-[#0F1419] flex items-center justify-center shadow-lg group-hover:bg-gray-100 transition-colors shrink-0">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Leitor de Artigo / Detalhe (Fiel ao Sheet da Referência 07) */}
      <ArticleReaderModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
      />

    </div>
  );
};

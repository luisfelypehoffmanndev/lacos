import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Post } from '../store/types';
import { useAppStore } from '../store';

interface PostCardProps {
  post: Post;
  hasThreadReply?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, hasThreadReply }) => {
  const { toggleReaction } = useAppStore();
  const [showSensitive, setShowSensitive] = useState(!post.hasSensitiveContent);
  const [retweeted, setRetweeted] = useState(false);

  const handleRetweet = () => setRetweeted((prev) => !prev);

  // Gera um @handle realista baseado no nome
  const handle = `@${post.authorName.toLowerCase().replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`;

  return (
    <article className="border-b border-gray-100 px-4 py-3 bg-white hover:bg-gray-50/50 transition-colors">
      <div className="flex items-start gap-3 relative">
        
        {/* Coluna da Esquerda: Avatar + Linha de Thread Conectora (Fiel à Referência 05) */}
        <div className="flex flex-col items-center shrink-0">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-11 h-11 rounded-full object-cover ring-1 ring-black/5"
          />
          {hasThreadReply && (
            <div className="w-0.5 flex-1 bg-gray-200 mt-2 mb-1" />
          )}
        </div>

        {/* Coluna da Direita: Conteúdo do Tweet/Post */}
        <div className="flex-1 min-w-0 space-y-1.5">
          
          {/* Cabeçalho do Tweet */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 truncate">
              <span className="font-bold text-[#0F1419] truncate font-sans text-[13px]">
                {post.authorName}
              </span>
              {/* Selo azul de verificado/cuidador verificado */}
              <CheckCircle2 size={13} className="text-[#1D9BF0] shrink-0 fill-[#1D9BF0] text-white" />
              <span className="text-[#536471] truncate text-[12px]">{handle}</span>
              <span className="text-[#536471]">·</span>
              <span className="text-[#536471] shrink-0 text-[12px]">{post.timeAgo}</span>
            </div>

            <button 
              className="text-[#536471] hover:text-[#0F1419] p-1 rounded-full hover:bg-gray-100"
              aria-label="Mais opções"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>

          {/* Tag de Papel de Cuidado em Pílula Rosa Suave (Como o "Super Followers" da Ref 05) */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 text-[10px] font-semibold border border-pink-100">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
            <span>{post.authorRole}</span>
          </div>

          {/* Conteúdo do Post */}
          {post.hasSensitiveContent && !showSensitive ? (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5">
              <p className="font-semibold text-gray-700 flex items-center gap-1">
                <ShieldAlert size={14} className="text-amber-500" />
                Aviso de Conteúdo Sensível
              </p>
              <p className="text-[#536471] text-[11px]">{post.sensitiveReason}</p>
              <button
                onClick={() => setShowSensitive(true)}
                className="text-[#1D9BF0] font-bold text-xs hover:underline"
              >
                Tocar para visualizar relato
              </button>
            </div>
          ) : (
            <p className="text-[13px] text-[#0F1419] leading-relaxed whitespace-pre-line font-sans">
              {post.content}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[#1D9BF0] text-[12px] hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Barra de Ações do Twitter / Threads (Fiel à Referência 05: Balão, Retweet, Coração, Share) */}
          <div className="flex items-center justify-between text-[#536471] pt-2 text-xs max-w-xs">
            {/* Responder */}
            <button 
              className="flex items-center gap-1 hover:text-[#1D9BF0] group transition-colors"
              title="Responder"
            >
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <MessageCircle size={15} />
              </div>
              <span className="text-[11px]">{post.commentsCount}</span>
            </button>

            {/* Retweet / Repost */}
            <button 
              onClick={handleRetweet}
              className={`flex items-center gap-1 group transition-colors ${retweeted ? 'text-emerald-500' : 'hover:text-emerald-500'}`}
              title="Compartilhar"
            >
              <div className="p-1.5 rounded-full group-hover:bg-emerald-50">
                <Repeat2 size={15} />
              </div>
              <span className="text-[11px]">{retweeted ? 19 : 18}</span>
            </button>

            {/* Curtir / Apoiar (Coração) */}
            <button 
              onClick={() => toggleReaction(post.id, 'abraco')}
              className={`flex items-center gap-1 group transition-colors ${
                post.userReactions.abraco ? 'text-pink-600' : 'hover:text-pink-600'
              }`}
              title="Apoiar com carinho"
            >
              <div className="p-1.5 rounded-full group-hover:bg-pink-50">
                <Heart size={15} fill={post.userReactions.abraco ? 'currentColor' : 'none'} />
              </div>
              <span className="text-[11px]">{post.reactions.abraco}</span>
            </button>

            {/* Compartilhar */}
            <button 
              className="p-1.5 rounded-full hover:bg-blue-50 hover:text-[#1D9BF0] transition-colors"
              title="Compartilhar"
            >
              <Share size={15} />
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};

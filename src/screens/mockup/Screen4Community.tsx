import React, { useState } from 'react';
import { MockStatusBar, MockNavBar } from './common';
import { MessageSquare, Heart, ShieldCheck, Repeat2, Plus, X, Send } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

export const Screen4Community: React.FC = () => {
  const { 
    posts, 
    toggleLike, 
    expandedThreadId, 
    toggleThread, 
    addPost, 
    user,
    setActiveScreen
  } = useMockStore();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    addPost(newPostText);
    setNewPostText('');
    setIsComposerOpen(false);
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col justify-between overflow-hidden select-none relative">
      
      {/* Topo com StatusBar e Barra estilo Instagram/X com a Letter 'laços' */}
      <div className="shrink-0 border-b border-gray-100 bg-white">
        <MockStatusBar />
        
        {/* Barra Superior estilo Instagram/X */}
        <div className="px-5 py-2 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-2">
            <img 
              src="/letter.jpeg" 
              alt="laços" 
              className="h-7 w-auto object-contain mix-blend-multiply select-none" 
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-[#C084FC] bg-[#C084FC]/10 px-2.5 py-1 rounded-full hover:bg-[#C084FC]/20 cursor-pointer transition-colors"
            >
              <Plus size={12} strokeWidth={3} />
              <span>Novo Relato</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen('screen-7')}
              className="cursor-pointer active:scale-95 transition-transform"
              title="Meu perfil"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
            </button>
          </div>
        </div>

        {/* Top Banner (Lilás Claro): "Regras de convivência: Espaço seguro..." */}
        <div className="bg-[#FAF5FF] border-b border-[#C084FC]/25 px-4 py-2 flex items-start gap-2">
          <ShieldCheck size={14} className="text-[#C084FC] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#581C87] font-medium leading-snug">
            Regras de convivência: Espaço seguro. Sem julgamentos, diagnósticos ou exposição de crianças.
          </p>
        </div>
      </div>

      {/* Feed Estilo Microblogging (Twitter/Threads limpo 2D) */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 no-scrollbar">
        
        {posts.map((post) => {
          const isThreadExpanded = expandedThreadId === post.id;

          return (
            <article key={post.id} className="p-4 space-y-2 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start gap-3">
                <img 
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A] truncate">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-[#64748B]">{post.timeAgo}</span>
                  </div>

                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    {post.text}
                  </p>

                  {/* Métricas Interativas */}
                  <div className="flex items-center gap-6 pt-1 text-[11px] text-[#64748B]">
                    {/* Botão de Respostas com toggle da thread */}
                    <button
                      type="button"
                      onClick={() => toggleThread(post.id)}
                      className="flex items-center gap-1.5 hover:text-[#2563EB] cursor-pointer transition-colors"
                      title="Ver respostas"
                    >
                      <MessageSquare size={13} />
                      <span>{post.replies} replies</span>
                    </button>

                    {/* Botão de Curtir com incremento/decremento real */}
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                        post.userLiked ? 'text-pink-600 font-bold' : 'hover:text-pink-600'
                      }`}
                      title="Apoiar relato"
                    >
                      <Heart size={13} fill={post.userLiked ? 'currentColor' : 'none'} />
                      <span>{post.likes} likes</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Repeat2 size={13} />
                    </div>
                  </div>

                  {/* Thread de Respostas Expandida (Fiel ao design conector do Twitter) */}
                  {isThreadExpanded && post.threadReplies && (
                    <div className="mt-3 pt-2 pl-3 border-l-2 border-gray-200 space-y-2.5 animate-in fade-in duration-150">
                      {post.threadReplies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2 text-xs">
                          <img 
                            src={reply.avatar} 
                            alt={reply.author} 
                            className="w-6 h-6 rounded-full object-cover mt-0.5"
                          />
                          <div className="bg-gray-50 p-2 rounded-[8px] flex-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
                              <span className="font-bold text-[#0F172A]">{reply.author}</span>
                              <span>{reply.timeAgo}</span>
                            </div>
                            <p className="text-[11px] text-[#0F172A] leading-tight">
                              {reply.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </article>
          );
        })}

      </div>

      {/* Modal/Drawer de Novo Relato */}
      {isComposerOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-[24px] p-5 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#0F172A]">
                Novo Relato na Comunidade
              </h3>
              <button 
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="p-1 text-gray-400 hover:text-[#0F172A] rounded-full"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="flex items-center gap-2">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-[#0F172A]">{user.name}</span>
              </div>

              <textarea
                rows={3}
                required
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Compartilhe como foi seu dia ou um desabafo acolhedor..."
                className="w-full text-xs p-2.5 bg-[#F4F6F9] rounded-[8px] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#C084FC] resize-none"
              />

              <p className="text-[10px] text-gray-500">
                • Espaço seguro: Não exponha rostos, nomes completos ou dados sensíveis de crianças.
              </p>

              <button
                type="submit"
                className="w-full py-2.5 rounded-[8px] bg-[#C084FC] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 cursor-pointer"
              >
                <Send size={13} />
                <span>Publicar Relato</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior (Comunidade Ativa) */}
      <MockNavBar activeTab="comunidade" />

    </div>
  );
};

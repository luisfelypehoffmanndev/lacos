import React, { useState } from 'react';
import { MockStatusBar, LogoLacos } from './common';
import { Camera, ArrowLeft } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';

const AVATAR_LIST = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
];

export const Screen2Register: React.FC = () => {
  const { user, updateUser, setActiveScreen } = useMockStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [avatarIndex, setAvatarIndex] = useState(0);

  const handleAvatarCycle = () => {
    const nextIndex = (avatarIndex + 1) % AVATAR_LIST.length;
    setAvatarIndex(nextIndex);
    updateUser({ avatar: AVATAR_LIST[nextIndex] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: name.trim() || 'Joiciele Nascimento',
      email: email.trim() || 'joiciele@exemplo.com',
      gender,
      isRegistered: true,
    });
    setActiveScreen('screen-3');
  };

  return (
    <div className="w-full h-full bg-[#F4F6F9] text-[#0F172A] overflow-y-auto overscroll-contain no-scrollbar relative select-none">
      
      {/* Container flexível que garante visualização total sem cortes */}
      <div className="min-h-full flex flex-col justify-between relative">
        
        {/* Header: Onda Azul Sólida (#1D4ED8) com o Logo Laços e Curva da Ref 03 */}
        <div className="bg-[#1D4ED8] text-white pt-0 pb-10 px-5 rounded-b-[28px] shrink-0 shadow-sm relative">
          <div className="-mx-5">
            <MockStatusBar light />
          </div>
          
          <div className="pt-1 flex items-center justify-between">
            <button 
              type="button"
              onClick={() => setActiveScreen('screen-1')}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Voltar"
            >
              <ArrowLeft size={16} />
            </button>
            
            <LogoLacos light size="md" />
            
            <div className="w-7" />
          </div>

          <div className="text-center mt-3">
            <p className="text-xs text-blue-100 font-medium">
              Preencha os dados abaixo para ingressar na rede
            </p>
          </div>
        </div>

        {/* Centro: Card Branco Flutuante (Ref 03) */}
        <div className="px-5 -mt-6 z-10 shrink-0 my-auto">
          <div className="bg-[#FFFFFF] rounded-[20px] p-5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.18)] border border-gray-100/90 space-y-3.5">
            
            <h2 className="text-base font-bold text-[#0F172A] text-center">
              Cadastro
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Input 1: Nome completo */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A] block">
                  Nome completo
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className="w-full text-xs py-2 px-3 bg-[#F4F6F9] rounded-[8px] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* Input 2: E-mail */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A] block">
                  E-mail
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  required
                  className="w-full text-xs py-2 px-3 bg-[#F4F6F9] rounded-[8px] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* Input 3: Foto de perfil (Opcional) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A] block">
                  Foto de perfil (Opcional)
                </label>
                <button
                  type="button"
                  onClick={handleAvatarCycle}
                  className="w-full flex items-center justify-between p-2 bg-[#F4F6F9] rounded-[8px] border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={user.avatar} 
                      alt="Preview" 
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                    <span className="text-xs text-[#0F172A] font-medium">Toque para alternar avatar</span>
                  </div>
                  <div className="text-gray-500 pr-1">
                    <Camera size={14} />
                  </div>
                </button>
              </div>

              {/* Input 4: Gênero (Com opção: Prefiro não informar) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#0F172A] block">
                  Gênero (Com opção: Prefiro não informar)
                </label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full text-xs py-2 px-2.5 bg-[#F4F6F9] rounded-[8px] border border-gray-200 text-[#0F172A] focus:outline-none focus:border-[#1D4ED8] cursor-pointer"
                >
                  <option value="Mulher">Mulher</option>
                  <option value="Homem">Homem</option>
                  <option value="Não-binário">Não-binário</option>
                  <option value="Prefiro não informar">Prefiro não informar</option>
                </select>
              </div>

              {/* Bottom Element: Botão Azul Sólido com border-radius 8px */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-[8px] bg-[#1D4ED8] text-white font-bold text-xs text-center shadow-sm hover:bg-blue-800 active:scale-98 transition-all cursor-pointer"
                >
                  Concluir cadastro e avançar
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* Rodapé Fiel à Ref 03: "Já possui conta? Entrar" + Onda Decorativa Inferior */}
        <div className="py-4 px-5 text-center relative shrink-0">
          <p className="text-xs text-[#64748B]">
            Já possui cadastro?{' '}
            <button
              type="button"
              onClick={() => setActiveScreen('screen-3')}
              className="font-bold text-[#1D4ED8] hover:underline cursor-pointer"
            >
              Entrar
            </button>
          </p>

          {/* Onda decorativa curva azul no canto inferior direito conforme Ref 03 */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-20">
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
              <path d="M0 50 C30 40 50 25 80 0 V50 H0 Z" fill="#1D4ED8" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
};

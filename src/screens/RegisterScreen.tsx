import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useAppStore } from '../store';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
];

interface RegisterScreenProps {
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack }) => {
  const { user, completeOnboarding } = useAppStore();

  const [name, setName] = useState(user.name || 'Mariana Duarte');
  const [email, setEmail] = useState(user.email || 'mariana.duarte@email.com');
  const [role, setRole] = useState(user.role || 'Mãe atípica • TEA');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || AVATAR_OPTIONS[0]);
  const [isRegisterMode, setIsRegisterMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOnboarding({
      name: name.trim() || 'Familiar Cuidador(a)',
      email: email.trim() || 'cuidador@lacos.org',
      avatar: selectedAvatar,
      role,
      gender: 'Mulher',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F3F4F6] relative overflow-y-auto no-scrollbar">
      
      {/* Topo Azul Real Curvado (Fiel à Referência 03-ref-login-cadastro.jpeg) */}
      <div className="bg-[#1D4ED8] pt-4 pb-20 px-6 text-white text-center rounded-b-[40px] relative shadow-md">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Logo do App no Topo */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-3xl font-extrabold font-display tracking-tight text-white">
            laços
          </span>
        </div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-white/70 mt-0.5">
          Conectando e Fortalecendo Famílias
        </p>

        <p className="text-xs text-white/85 mt-4 font-medium max-w-xs mx-auto">
          {isRegisterMode ? 'Preencha abaixo para cadastrar-se' : 'Preencha abaixo para acessar sua conta'}
        </p>
      </div>

      {/* Card Branco Flutuante Centralizado (Fiel à Referência 03) */}
      <div className="px-5 -mt-14 z-10">
        <div className="bg-white rounded-3xl p-6 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] border border-gray-100 space-y-4">
          
          <h2 className="text-center font-extrabold text-xl text-[#0F1419] font-display">
            {isRegisterMode ? 'Criar Conta' : 'Acessar Conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nome */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#536471]">
                Nome completo ou apelido
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Mariana Duarte"
                className="w-full text-sm font-medium py-2 px-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#1D4ED8] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Input E-mail */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#536471]">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full text-sm font-medium py-2 px-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#1D4ED8] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Papel de Cuidado */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#536471]">
                Realidade de Cuidado
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm font-medium py-2 px-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#1D4ED8] focus:bg-white focus:outline-none transition-all"
              >
                <option value="Mãe atípica • TEA">Mãe atípica • TEA</option>
                <option value="Pai de criança com TOD e TEA">Pai de criança com TOD e TEA</option>
                <option value="Cuidador(a) • TDAH">Cuidador(a) • TDAH</option>
                <option value="Familiar de pessoa com Depressão">Familiar de pessoa com Depressão</option>
                <option value="Outro familiar cuidador">Outro familiar cuidador</option>
              </select>
            </div>

            {/* Escolha Rápida de Avatar */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-[#536471] block">
                Escolha seu avatar:
              </label>
              <div className="flex items-center justify-between gap-2">
                {AVATAR_OPTIONS.map((avatarUrl, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedAvatar(avatarUrl)}
                    className={`relative rounded-full transition-transform ${
                      selectedAvatar === avatarUrl
                        ? 'ring-3 ring-[#1D4ED8] scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={avatarUrl}
                      alt={`Avatar ${idx + 1}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedAvatar === avatarUrl && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1D4ED8] rounded-full text-white flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Pill Azul Real (Fiel à Referência 03) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#1D4ED8]/30 active:scale-98 transition-all"
              >
                {isRegisterMode ? 'CADASTRAR' : 'ENTRAR'}
              </button>
            </div>

            {/* Divisor "OU" */}
            <div className="relative flex items-center justify-center py-1">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-[11px] font-bold text-gray-400 uppercase">
                OU
              </span>
            </div>

            {/* Botões Sociais F e G+ (Como na Ref 03) */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-10 h-10 rounded-full bg-[#3B5998] text-white font-bold flex items-center justify-center shadow-sm hover:opacity-90 active:scale-95 transition-all"
                title="Acessar com Facebook"
              >
                f
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-10 h-10 rounded-full bg-[#EA4335] text-white font-bold flex items-center justify-center shadow-sm hover:opacity-90 active:scale-95 transition-all text-xs"
                title="Acessar com Google"
              >
                G+
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Rodapé Alternador (Fiel à Ref 03) */}
      <div className="py-6 text-center text-xs text-[#536471]">
        {isRegisterMode ? (
          <p>
            Já possui uma conta?{' '}
            <button
              onClick={() => setIsRegisterMode(false)}
              className="text-[#1D4ED8] font-extrabold hover:underline"
            >
              ENTRAR
            </button>
          </p>
        ) : (
          <p>
            Não tem uma conta?{' '}
            <button
              onClick={() => setIsRegisterMode(true)}
              className="text-[#1D4ED8] font-extrabold hover:underline"
            >
              CADASTRAR
            </button>
          </p>
        )}
      </div>

    </div>
  );
};

import React from 'react';
import { 
  Smartphone, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Type, 
  HeartHandshake 
} from 'lucide-react';
import { useAppStore } from '../store';

export const DeviceToolbar: React.FC = () => {
  const { preferences, toggleDeviceMode, toggleCalmMode, setFontSize, setPhoneType, resetDemo } = useAppStore();

  return (
    <aside aria-label="Controles do Protótipo" className="hidden lg:flex flex-col gap-3 p-4 bg-[#1E2528] text-white/90 rounded-2xl shadow-2xl border border-white/10 w-72 text-sm backdrop-blur-md">
      {/* Cabeçalho do App & Evento */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-[#336C63] flex items-center justify-center text-white shadow-md shadow-[#336C63]/30">
          <HeartHandshake size={18} />
        </div>
        <div>
          <h2 className="font-semibold text-white tracking-wide text-sm leading-tight">Laços • FASA</h2>
          <p className="text-[11px] text-white/60">Psicologia (4º Sem.) • Summit 2026</p>
        </div>
      </div>

      {/* Modo de Visualização */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium uppercase tracking-wider text-white/50">Visualização</label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/30 rounded-xl border border-white/5">
          <button
            onClick={() => { if (preferences.deviceMode !== 'frame') toggleDeviceMode(); }}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
              preferences.deviceMode === 'frame'
                ? 'bg-[#336C63] text-white shadow'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Smartphone size={14} /> Moldura
          </button>
          <button
            onClick={() => { if (preferences.deviceMode !== 'fullscreen') toggleDeviceMode(); }}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
              preferences.deviceMode === 'fullscreen'
                ? 'bg-[#336C63] text-white shadow'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Maximize2 size={14} /> Tela Cheia
          </button>
        </div>
      </div>

      {/* Tipo de Celular (se em moldura) */}
      {preferences.deviceMode === 'frame' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium uppercase tracking-wider text-white/50">Aparelho</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/30 rounded-xl border border-white/5">
            <button
              onClick={() => setPhoneType('iphone')}
              className={`py-1 px-2 rounded-lg text-xs transition-all ${
                preferences.phoneType === 'iphone' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
              }`}
            >
              iPhone 16
            </button>
            <button
              onClick={() => setPhoneType('android')}
              className={`py-1 px-2 rounded-lg text-xs transition-all ${
                preferences.phoneType === 'android' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
              }`}
            >
              Pixel / Galaxy
            </button>
          </div>
        </div>
      )}

      {/* Acessibilidade & Modo Calmo */}
      <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
        <label className="text-[11px] font-medium uppercase tracking-wider text-white/50 flex items-center justify-between">
          Acessibilidade Sensorial
          {preferences.isCalmMode && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">ATIVADO</span>
          )}
        </label>
        
        {/* Toggle Modo Calmo */}
        <button
          onClick={toggleCalmMode}
          className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
            preferences.isCalmMode
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-inner'
              : 'bg-black/20 border-white/10 text-white/80 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <Eye size={15} className={preferences.isCalmMode ? 'text-emerald-400' : 'text-white/60'} />
            <div className="text-left">
              <span className="font-medium block leading-tight">Modo Calmo</span>
              <span className="text-[10px] text-white/50 block">Desatura cores & pausa animação</span>
            </div>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${preferences.isCalmMode ? 'bg-emerald-500' : 'bg-white/20'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${preferences.isCalmMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </button>

        {/* Tamanho da Fonte */}
        <div className="flex items-center justify-between gap-1 p-1 bg-black/30 rounded-xl border border-white/5">
          <span className="text-[11px] text-white/60 pl-2 flex items-center gap-1">
            <Type size={12} /> Texto:
          </span>
          <div className="flex gap-1">
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 text-xs rounded-md transition-all ${
                  preferences.fontSize === size 
                    ? 'bg-[#336C63] text-white font-bold' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {size === 'normal' ? '1x' : size === 'large' ? '1.1x' : '1.2x'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ações de Demonstração */}
      <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
        <button
          onClick={() => {
            if (confirm('Deseja restaurar todos os dados para o estado inicial da apresentação?')) {
              resetDemo();
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-all"
        >
          <RotateCcw size={13} /> Reiniciar Demonstração
        </button>

        <p className="text-[10px] text-white/40 text-center leading-tight">
          Protótipo acadêmico interativo sem backend real • Dados salvos em LocalStorage
        </p>
      </div>
    </aside>
  );
};

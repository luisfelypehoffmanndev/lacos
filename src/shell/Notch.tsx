import React from 'react';

interface NotchProps {
  type?: 'iphone' | 'android';
}

export const Notch: React.FC<NotchProps> = ({ type = 'iphone' }) => {
  if (type === 'android') {
    return (
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#121619] rounded-full z-40 pointer-events-none ring-1 ring-white/10" />
    );
  }

  // Dynamic Island (iPhone)
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0E1214] rounded-full z-40 pointer-events-none flex items-center justify-between px-2 shadow-inner">
      <div className="w-2.5 h-2.5 rounded-full bg-[#05080A] ring-1 ring-white/5" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#18232F]/50 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-[#274463]" />
      </div>
    </div>
  );
};

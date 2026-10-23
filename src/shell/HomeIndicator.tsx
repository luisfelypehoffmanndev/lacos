import React from 'react';

export const HomeIndicator: React.FC = () => {
  return (
    <div className="w-full h-6 pb-2 flex items-center justify-center pointer-events-none select-none z-30">
      <div className="w-32 h-1 bg-[#1A2826]/30 rounded-full" />
    </div>
  );
};

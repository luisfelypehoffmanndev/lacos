import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const ScreenPortalContext = createContext<HTMLElement | null>(null);

export const ScreenPortalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  return (
    <ScreenPortalContext.Provider value={portalNode}>
      <div 
        ref={setPortalNode} 
        id="device-screen-root" 
        className="device-screen-container relative w-full h-full overflow-hidden flex flex-col bg-white"
      >
        {children}
      </div>
    </ScreenPortalContext.Provider>
  );
};

export const ScreenPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const portalNode = useContext(ScreenPortalContext);
  if (!portalNode) {
    return <>{children}</>;
  }
  return createPortal(children, portalNode);
};

// src/components/common/scroll-context.tsx
import React, { createContext, useContext, useState } from 'react';

interface ScrollContextType {
  isTransitioning: boolean;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScrollContext = createContext<ScrollContextType>({
  isTransitioning: false,
  setIsTransitioning: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <ScrollContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </ScrollContext.Provider>
  );
};

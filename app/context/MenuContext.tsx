'use client';

import React, { createContext, useContext, useState } from 'react';
import CurvedNavbar from '../components/CurvedNavbar';
import { usePathname } from 'next/navigation';

// Context Types
export type MenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth')
  
  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
       {/* {!isAuthPage && <CurvedNavbar />} */}
       <CurvedNavbar/>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

"use client";

import React, { createContext, useContext, useState } from "react";
import CurvedNavbar from "../components/CurvedNavbar";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const SlidingLogo = dynamic(
  () => import("@/app/components/globalComponents/FooterWrapper"),
  {
    loading: () => <div className="h-40 w-full" />,
  },
);

// Context Types
export type MenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
    
        {/* {!isAuthPage && <CurvedNavbar />} */}
      

        {/* main content */}
        <main className="flex-1">{children}</main>

     
    
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};

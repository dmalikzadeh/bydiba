"use client";

import { createContext, useContext, useState } from "react";

type NavKey = "projects" | "about" | "skills" | "contact";

const NavContext = createContext<{
  activeKey: NavKey | null;
  setActiveKey: (key: NavKey) => void;
}>({
  activeKey: null,
  setActiveKey: () => {},
});

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [activeKey, setActiveKey] = useState<NavKey | null>(null);

  return (
    <NavContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);

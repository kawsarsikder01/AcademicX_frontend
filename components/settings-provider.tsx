'use client';
 import { createContext, useContext } from "react";
 
 const SettingsContext = createContext(null);

export  const SettingsProvider = ({ settings, children }: { settings: any; children: React.ReactNode }) => {
    return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

 
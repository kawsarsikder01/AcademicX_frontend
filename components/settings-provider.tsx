'use client';
 import { createContext, useContext } from "react";
 import { Settings } from "@/lib/types";
 
const SettingsContext = createContext<Settings>({
  site_name: '',
  site_logo: null,
  site_favicon: null,
  storage_type: null,
  site_email: null,
  site_phone: null,
  site_address: null,
  base_currency: null,
  currency_symbol: null,
  site_charge: 0,
  currency_position: null,
  has_space: null,
  email_notifications: '0',
  sms_notifications: '0',
  in_app_notification: '0',
  firebase_notification: '0',
});


export  const SettingsProvider = ({ settings, children }: { settings: Settings; children: React.ReactNode }) => {
    return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

 
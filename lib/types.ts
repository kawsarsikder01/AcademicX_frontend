export type Settings = {
    site_name: string;
    site_logo: string | null;
    site_favicon: string | null;
    storage_type: string | null;
    site_email: string | null;
    site_phone: string | null;
    site_address: string | null;
    base_currency: string | null;
    currency_symbol: string | null;
    site_charge: string | number;
    currency_position: string | null;
    has_space: string | number | null;
    email_notifications: string;
    sms_notifications: string;
    in_app_notification: string;
    firebase_notification: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
}
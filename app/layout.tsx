import { SettingsProvider } from "@/components/settings-provider";
import { getFile } from "@/lib/utils";
import type { Metadata } from "next"; 
import { Toaster } from "sonner";


 

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSettings();
  const settings = data.data;

  // Use site_favicon
  const faviconUrl = settings.site_favicon ? getFile(settings.site_favicon) : "/favicon.ico";

  return {
    title: settings.site_name,
    description: settings.description || "My Next.js App",
    icons: {
      icon: [{ url: faviconUrl, type: "image/png" }],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}


async function getSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
    // Cache for 1 minute (adjust as needed)
    next: { revalidate: 60 }
  });

  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const settings = await getSettings();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <SettingsProvider settings={settings.data}>
          {children}
        </SettingsProvider>
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}

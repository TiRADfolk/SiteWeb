import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchGeneralConfig, fetchStyleConfig } from '@/utils/fetchSheets';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [config, style] = await Promise.all([
    fetchGeneralConfig(),
    fetchStyleConfig(),
  ]);

  const cssVars = `
    :root {
      --bg-primary: ${style.bg || '#FAF7F2'};
      --text-primary: ${style.text || '#2C221E'};
      --accent-folk: ${style.primary || '#A0522D'};
      --accent-folk-hover: ${style['primary-hover'] || '#804020'};
      --accent-secondary: ${style.secondary || '#D97706'};
      --nav-padding-y: ${style['nav-padding-y'] || '16px'};
      --nav-padding-x: ${style['nav-padding-x'] || '16px'};
      --brand-font-size: ${style['brand-font-size'] || '20px'};
      --nav-font-size: ${style['nav-font-size'] || '14px'};
      --nav-icon-size: ${style['nav-icon-size'] || '24px'};
      --nav-gap: ${style['nav-gap'] || '24px'};
      --nav-menu-radius: ${style['nav-menu-radius'] || '8px'};
    }
  `;

  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-[var(--bg-primary)] overflow-x-hidden w-full">
        <Navbar
          siteName={config.nom}
          sticky={style['nav-sticky'] !== 'FALSE'}
          shadow={style['nav-shadow'] !== 'FALSE'}
          showContact={style['nav-show-contact'] === 'TRUE'}
          privateLabel={style['nav-private-label'] || 'Privé'}
          linksDesktop={style['nav-links-desktop']}
        />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 overflow-x-hidden">
          {children}
        </main>
        <Footer 
          email={config.email} 
          phone={config.telephone} 
          address={config.adresse} 
        />
      </body>
    </html>
  );
}
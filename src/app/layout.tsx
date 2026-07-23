import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchGeneralConfig, fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig } from '@/constants/siteConfig';
import { NewsItem } from '@/types';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await fetchGeneralConfig();
  const news = await fetchSheetData<NewsItem>(siteConfig.sheetTabs.news);

  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] overflow-x-hidden w-full">
        <Navbar siteName={config.nom} />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 overflow-x-hidden">
          {children}
        </main>
        <Footer 
          email={config.email} 
          phone={config.telephone} 
          address={config.adresse} 
          news={news}
        />
      </body>
    </html>
  );
}

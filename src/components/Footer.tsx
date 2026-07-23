

import { NewsItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { formatDateFR } from '@/utils/formatters';
import { uiText } from '@/constants/siteConfig';

interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
  news?: NewsItem[];
}

export default function Footer({ email, phone, address, news = [] }: FooterProps) {
  const homeNews = news.filter(n => n.afficherSurAccueil === 'Oui').slice(0, 3);

  return (
    <footer className="bg-[#2C221E] text-[#FAF7F2] mt-16 border-t-4 border-[#A0522D]">
      {homeNews.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-[#D97706] mb-6">{uiText.home.latestNews}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeNews.map((item) => (
              <div key={item.id} className="bg-[#3A2D28] rounded-lg overflow-hidden shadow-sm flex flex-col">
                {item.image && (
                  <div className="aspect-video w-full overflow-hidden bg-black/20">
                    <img
                      src={formatDriveImageUrl(item.image)}
                      alt={item.titre}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = uiText.common.fallbackImage; }}
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs text-[#D97706] font-semibold mb-1">{formatDateFR(item.date)}</span>
                  <h4 className="font-bold text-lg mb-2 text-white">{item.titre}</h4>
                  <p className="text-xs text-gray-300 line-clamp-3 whitespace-pre-line flex-grow">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h4 className="text-lg font-bold text-[#D97706] mb-2">{uiText.nav.contact}</h4>
          {email && <p className="text-sm">Email : {email}</p>}
          {phone && <p className="text-sm">Tél : {phone}</p>}
          {address && <p className="text-sm whitespace-pre-line mt-1">{address}</p>}
        </div>
        <div className="text-left md:text-right text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

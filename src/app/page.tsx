import Link from 'next/link';
import { fetchGeneralConfig, fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { EventItemType } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { isFutureDate, formatDateFR } from '@/utils/formatters';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function HomePage() {
  const config = await fetchGeneralConfig();
  const events = await fetchSheetData<EventItemType>(siteConfig.sheetTabs.agenda);

  const upcomingEvents = events
    .filter(e => isFutureDate(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const heroBg = formatDriveImageUrl(config.lienBandeau) || uiText.common.fallbackImage;

  return (
    <div className="space-y-12">
      <section 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-[450px] flex items-center justify-center text-center text-white shadow-lg"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroBg})` }}
      >
        <div className="p-6 max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{config.nom || uiText.home.heroTitle}</h1>
          <p className="text-lg md:text-xl text-gray-200">{config.slogan || uiText.home.heroSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/agenda" className="bg-[#D97706] hover:bg-[#b56305] text-white font-bold py-3 px-6 rounded-lg transition shadow">
              {uiText.home.agendaBtn}
            </Link>
            <Link href="/medias" className="bg-[#A0522D] hover:bg-[#804020] text-white font-bold py-3 px-6 rounded-lg transition shadow">
              {uiText.home.mediasBtn}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        {config.logo && (
          <ImageWithFallback 
            src={formatDriveImageUrl(config.logo)} 
            alt={config.nom} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#A0522D]"
          />
        )}
        <div className="space-y-3 text-center md:text-left flex-grow">
          <h2 className="text-2xl font-bold text-[#2C221E]">{config.presentationTitre}</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed line-clamp-4">{config.presentationTexte}</p>
          <Link href="/presentation" className="inline-block text-[#A0522D] font-bold hover:underline pt-2">
            {uiText.common.readMore} →
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-[#A0522D] pb-2">
            <h2 className="text-2xl font-bold text-[#2C221E]">{uiText.home.upcomingEvents}</h2>
            <Link href="/agenda" className="text-xs text-[#A0522D] font-bold hover:underline">{uiText.common.seeAll}</Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500 py-4">{uiText.home.noEvents}</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-[#D97706] block">{formatDateFR(event.date)}</span>
                    <h3 className="font-bold text-[#2C221E]">{event.title}</h3>
                    <p className="text-xs text-gray-600">{event.location}</p>
                  </div>
                  <Link href="/agenda" className="text-xs bg-[#A0522D] text-white px-3 py-1.5 rounded hover:bg-[#804020] transition">
                    Voir
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2C221E] border-b-2 border-[#A0522D] pb-2 mb-4">{uiText.home.quickContact}</h2>
            <div className="space-y-3 text-gray-700">
              {config.email && <p className="text-sm"><strong className="text-[#2C221E]">Email :</strong> {config.email}</p>}
              {config.telephone && <p className="text-sm"><strong className="text-[#2C221E]">Téléphone :</strong> {config.telephone}</p>}
              {config.adresse && <p className="text-sm whitespace-pre-line"><strong className="text-[#2C221E]">Adresse :</strong> {config.adresse}</p>}
            </div>
          </div>
          <Link href="/contact" className="mt-6 block text-center bg-[#2C221E] hover:bg-[#42332d] text-white font-bold py-3 px-4 rounded-lg transition">
            {uiText.common.contactUs}
          </Link>
        </section>
      </div>
    </div>
  );
}
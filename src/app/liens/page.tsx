import { fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { UsefulLink } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function LiensPage() {
  const links = await fetchSheetData<UsefulLink>(siteConfig.sheetTabs.liensUtiles);

  const categories = Array.from(new Set(links.map((l) => l.lienCategorie || 'Général')));

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        {uiText.nav.links}
      </h1>

      {categories.map((category) => {
        const categoryLinks = links.filter((l) => (l.lienCategorie || 'Général') === category);

        return (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-bold text-[#A0522D] border-b border-gray-200 pb-1">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.lienUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#D97706] transition flex items-center gap-4 group"
                >
                  {link.lienLogoUrl && (
                    <ImageWithFallback
                      src={formatDriveImageUrl(link.lienLogoUrl)}
                      alt={link.lienTitre}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-[#2C221E] group-hover:text-[#D97706] transition">
                      {link.lienTitre}
                    </h3>
                    {link.lienDescription && (
                      <p className="text-xs text-gray-600 whitespace-pre-line mt-1">{link.lienDescription}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
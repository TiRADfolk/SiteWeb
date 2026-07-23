import { NewsItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { formatDateFR } from '@/utils/formatters';
import { uiText } from '@/constants/siteConfig';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function NewsCard({ item }: { item: NewsItem }) {
  const imageUrl = formatDriveImageUrl(item.image) || uiText.common.fallbackImage;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transition hover:shadow-lg">
      {item.image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={imageUrl}
            alt={item.titre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <span className="text-xs font-bold text-[#D97706]">{formatDateFR(item.date)}</span>
        <h3 className="text-xl font-bold text-[#2C221E]">{item.titre}</h3>
        <p className="text-gray-700 text-sm whitespace-pre-line flex-grow leading-relaxed">
          {item.description}
        </p>
        {item.lien && (
          <a
            href={item.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-[#A0522D] hover:underline pt-2 self-start"
          >
            {uiText.common.readMore} →
          </a>
        )}
      </div>
    </article>
  );
}
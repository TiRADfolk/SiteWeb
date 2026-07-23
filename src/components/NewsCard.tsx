

import { NewsItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { formatDateFR } from '@/utils/formatters';
import { uiText } from '@/constants/siteConfig';

export default function NewsCard({ item }: { item: NewsItem }) {
  const imageUrl = formatDriveImageUrl(item.image) || uiText.common.fallbackImage;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transition hover:shadow-lg">
      {item.image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={item.titre}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = uiText.common.fallbackImage;
            }}
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

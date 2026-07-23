

'use client';

import { useState } from 'react';
import { MediaItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { uiText } from '@/constants/siteConfig';

export default function MediaClientContent({ medias }: { medias: MediaItem[] }) {
  const [filter, setFilter] = useState<'Tous' | 'Image' | 'Video' | 'Audio'>('Tous');

  const filteredMedias = filter === 'Tous' 
    ? medias 
    : medias.filter(m => m.type?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {(['Tous', 'Image', 'Video', 'Audio'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === category
                ? 'bg-[#A0522D] text-white shadow'
                : 'bg-white text-[#2C221E] hover:bg-amber-50 border border-gray-200'
            }`}
          >
            {category === 'Tous' ? 'Tous les médias' : category + 's'}
          </button>
        ))}
      </div>

      {filteredMedias.length === 0 ? (
        <p className="text-gray-500 italic bg-white p-6 rounded-lg">Aucun média disponible dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedias.map((media) => {
            const isVideo = media.type?.toLowerCase() === 'video';
            const isAudio = media.type?.toLowerCase() === 'audio';
            const isImage = media.type?.toLowerCase() === 'image';

            return (
              <div key={media.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                <div className="p-4 bg-[#2C221E] text-white font-bold text-sm truncate">
                  {media.titre}
                </div>

                <div className="p-4 flex-grow flex items-center justify-center bg-gray-50">
                  {isImage && (
                    <img
                      src={formatDriveImageUrl(media.url)}
                      alt={media.titre}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = uiText.common.fallbackImage;
                      }}
                    />
                  )}

                  {isVideo && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                      <iframe
                        src={media.url}
                        title={media.titre}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {isAudio && (
                    <div className="w-full py-4">
                      <iframe
                        src={media.url}
                        title={media.titre}
                        className="w-full h-20 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

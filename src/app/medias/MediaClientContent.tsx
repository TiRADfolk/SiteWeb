'use client';

import { useState } from 'react';
import { MediaItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { uiText } from '@/constants/siteConfig';
import ImageWithFallback from '@/components/ImageWithFallback';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function MediaClientContent({ medias }: { medias: MediaItem[] }) {
  const [filter, setFilter] = useState<'Tous' | 'Image' | 'Video' | 'Audio'>('Tous');
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  const filteredMedias = filter === 'Tous' 
    ? medias 
    : medias.filter(m => m.type?.toLowerCase() === filter.toLowerCase());

  const handleLoad = (id: string) => {
    setLoadedIds(prev => new Set(prev).add(id));
  };

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
            const isLoaded = loadedIds.has(media.id);
            const thumbnail = formatDriveImageUrl(media.miniature) || uiText.common.fallbackImage;

            return (
              <div key={media.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                <div className="p-4 bg-[#2C221E] text-white font-bold text-sm truncate">
                  {media.titre}
                </div>

                <div className="p-4 flex-grow flex items-center justify-center bg-gray-50">
                  {isImage && (
                    <ImageWithFallback
                      src={formatDriveImageUrl(media.url)}
                      alt={media.titre}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}

                  {isVideo && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black relative">
                      {isLoaded ? (
                        <iframe
                          src={media.url}
                          title={media.titre}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          onClick={() => handleLoad(media.id)}
                          className="w-full h-full relative group"
                          aria-label={`Lire la vidéo : ${media.titre}`}
                        >
                          <ImageWithFallback
                            src={thumbnail}
                            alt={media.titre}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                            <span className="bg-white/90 text-[#2C221E] rounded-full p-4 shadow-lg group-hover:scale-110 transition">
                              <PlayIcon />
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  )}

                  {isAudio && (
                    <div className="w-full py-4">
                      {isLoaded ? (
                        <iframe
                          src={media.url}
                          title={media.titre}
                          className="w-full h-20 rounded-lg"
                        />
                      ) : (
                        <button
                          onClick={() => handleLoad(media.id)}
                          className="w-full flex items-center justify-center gap-2 bg-[#A0522D] hover:bg-[#804020] text-white font-semibold py-3 rounded-lg transition"
                        >
                          <PlayIcon />
                          Écouter
                        </button>
                      )}
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
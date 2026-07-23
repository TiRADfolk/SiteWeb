'use client';

import { uiText } from '@/constants/siteConfig';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageWithFallback({ src, alt, className }: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = uiText.common.fallbackImage;
      }}
    />
  );
}
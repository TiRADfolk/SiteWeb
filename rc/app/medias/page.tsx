//rc/app/medias/page.tsx

import { fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { MediaItem } from '@/types';
import MediaClientContent from './MediaClientContent';

export default async function MediasPage() {
  const medias = await fetchSheetData<MediaItem>(siteConfig.sheetTabs.medias);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        {uiText.nav.medias}
      </h1>

      <MediaClientContent medias={medias} />
    </div>
  );
}

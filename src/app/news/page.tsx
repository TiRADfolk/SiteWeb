

import { fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { NewsItem } from '@/types';
import NewsCard from '@/components/NewsCard';

export default async function NewsPage() {
  const newsList = await fetchSheetData<NewsItem>(siteConfig.sheetTabs.news);

  const sortedNews = newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        {uiText.nav.news}
      </h1>

      {sortedNews.length === 0 ? (
        <p className="text-gray-500 italic bg-white p-6 rounded-lg">{uiText.home.noNews}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

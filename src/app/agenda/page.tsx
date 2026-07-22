//src/app/agenda/page.tsx

import { fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { EventItemType } from '@/types';
import EventItem from '@/components/EventItem';
import { isFutureDate } from '@/utils/formatters';

export default async function AgendaPage() {
  const events = await fetchSheetData<EventItemType>(siteConfig.sheetTabs.agenda);

  const upcoming = events
    .filter(e => isFutureDate(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter(e => !isFutureDate(e.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        {uiText.agenda.title}
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#A0522D]">{uiText.agenda.upcoming}</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500 italic bg-white p-6 rounded-lg">{uiText.home.noEvents}</p>
        ) : (
          upcoming.map(event => <EventItem key={event.id} event={event} />)
        )}
      </section>

      {past.length > 0 && (
        <section className="space-y-4 pt-8 border-t border-gray-300">
          <h2 className="text-xl font-bold text-gray-500">{uiText.agenda.past}</h2>
          <div className="opacity-80 space-y-4">
            {past.map(event => <EventItem key={event.id} event={event} />)}
          </div>
        </section>
      )}
    </div>
  );
}

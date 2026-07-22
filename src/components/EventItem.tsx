//src/components/EventItem.tsx

import { EventItemType } from '@/types';
import { formatDateFR } from '@/utils/formatters';
import { uiText } from '@/constants/siteConfig';

export default function EventItem({ event }: { event: EventItemType }) {
  const isConfirmed = event.statut?.toLowerCase().includes('confirm');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#A0522D] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#D97706]">{formatDateFR(event.date)}</span>
          
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${isConfirmed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {event.statut || 'Projet'}
          </span>

          {event.estPublic && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
              {event.estPublic.toLowerCase() === 'oui' ? uiText.agenda.public : uiText.agenda.private}
            </span>
          )}

          <span className="text-xs bg-amber-50 text-[#A0522D] border border-[#A0522D]/30 px-2 py-0.5 rounded font-bold">
            {event.tarif && event.tarif.trim() !== '' ? event.tarif : uiText.agenda.free}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#2C221E]">{event.title}</h3>
        <p className="text-sm text-gray-600 font-medium">
          {event.location} {event.lieuPrecise ? `- ${event.lieuPrecise}` : ''}
        </p>
        
        {event.description && (
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{event.description}</p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 w-full md:w-auto self-end md:self-center">
        {event.lienResa && (
          <a href={event.lienResa} target="_blank" rel="noopener noreferrer" className="bg-[#A0522D] hover:bg-[#804020] text-white px-4 py-2 rounded text-sm transition">
            {uiText.agenda.bookBtn}
          </a>
        )}
        {event.lienInfo && (
          <a href={event.lienInfo} target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-gray-300 text-[#2C221E] px-4 py-2 rounded text-sm transition">
            {uiText.agenda.infoBtn}
          </a>
        )}
        {event.lienPlan && (
          <a href={event.lienPlan} target="_blank" rel="noopener noreferrer" className="bg-amber-100 hover:bg-amber-200 text-[#A0522D] px-4 py-2 rounded text-sm transition">
            {uiText.agenda.mapBtn}
          </a>
        )}
      </div>
    </div>
  );
}

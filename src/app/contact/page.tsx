//src/app/contact/page.tsx

import { fetchGeneralConfig } from '@/utils/fetchSheets';
import { uiText } from '@/constants/siteConfig';

export default async function ContactPage() {
  const config = await fetchGeneralConfig();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-[#2C221E] border-b-4 border-[#A0522D] pb-2 inline-block">
        {uiText.nav.contact}
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#2C221E]">{config.nom}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            Pour toute demande de réservation, concert, bal folk ou renseignement, n'hésitez pas à nous contacter directement.
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6 space-y-4 text-gray-800">
          {config.email && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50/50 rounded-lg">
              <span className="font-bold text-[#2C221E]">Email :</span>
              <a href={`mailto:${config.email}`} className="text-[#A0522D] hover:underline font-medium">
                {config.email}
              </a>
            </div>
          )}

          {config.telephone && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50/50 rounded-lg">
              <span className="font-bold text-[#2C221E]">Téléphone :</span>
              <a href={`tel:${config.telephone}`} className="text-[#A0522D] hover:underline font-medium">
                {config.telephone}
              </a>
            </div>
          )}

          {config.adresse && (
            <div className="p-4 bg-amber-50/50 rounded-lg space-y-1">
              <span className="font-bold text-[#2C221E] block">Adresse & Siège :</span>
              <p className="text-gray-700 whitespace-pre-line text-sm">{config.adresse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

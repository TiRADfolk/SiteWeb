//src/app/presentation/page.tsx

import { fetchGeneralConfig, fetchSheetData } from '@/utils/fetchSheets';
import { siteConfig, uiText } from '@/constants/siteConfig';
import { MemberItem } from '@/types';
import MemberCard from '@/components/MemberCard';
import { formatDriveImageUrl } from '@/utils/driveHelper';

export default async function PresentationPage() {
  const config = await fetchGeneralConfig();
  const members = await fetchSheetData<MemberItem>(siteConfig.sheetTabs.trombinoscope);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-[#2C221E]">{config.presentationTitre || uiText.presentation.title}</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-gray-700 whitespace-pre-line leading-relaxed">
          <p className="font-medium text-lg text-[#A0522D]">{config.presentationTexte}</p>
          <p>{config.descriptionLongue}</p>
        </div>
        {config.logo && (
          <div className="rounded-lg overflow-hidden shadow-inner border-2 border-[#A0522D]/20">
            <img src={formatDriveImageUrl(config.logo)} alt={config.nom} className="w-full h-auto object-cover" />
          </div>
        )}
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[#2C221E] text-center">{uiText.presentation.membersTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}

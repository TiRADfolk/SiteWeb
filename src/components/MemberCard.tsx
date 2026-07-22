//src/components/MemberCard.tsx

import { MemberItem } from '@/types';
import { formatDriveImageUrl } from '@/utils/driveHelper';
import { uiText } from '@/constants/siteConfig';

export default function MemberCard({ member }: { member: MemberItem }) {
  const imageUrl = formatDriveImageUrl(member.photoUrl) || uiText.common.fallbackImage;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#D97706]/20 flex flex-col">
      <div className="aspect-video w-full relative bg-gray-200">
        <img
          src={imageUrl}
          alt={member.nom}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = uiText.common.fallbackImage;
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#2C221E]">{member.nom}</h3>
        <span className="inline-block bg-[#A0522D]/10 text-[#A0522D] text-xs font-semibold px-2 py-1 rounded mt-1 mb-3 self-start">
          {member.role}
        </span>
        <p className="text-gray-700 text-sm whitespace-pre-line flex-grow">{member.description}</p>
      </div>
    </div>
  );
}

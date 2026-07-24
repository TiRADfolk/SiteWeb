import { uiText } from '@/constants/siteConfig';

interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
}

export default function Footer({ email, phone, address }: FooterProps) {
  return (
    <footer className="bg-[#2C221E] text-[#FAF7F2] mt-16 border-t-4 border-[#A0522D]">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h4 className="text-lg font-bold text-[#D97706] mb-2">{uiText.nav.contact}</h4>
          {email && <p className="text-sm">Email : {email}</p>}
          {phone && <p className="text-sm">Tél : {phone}</p>}
          {address && <p className="text-sm whitespace-pre-line mt-1">{address}</p>}
        </div>
        <div className="text-left md:text-right text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
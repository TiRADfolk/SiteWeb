import Link from 'next/link';
import { uiText } from '@/constants/siteConfig';

interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
}

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 10-8 0" />
  </svg>
);

const NewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h9l7 7v7a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 4v6h6M9 13h6M9 17h4" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
  </svg>
);

const LinkChainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.5 4.5M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07L12.5 19.5" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const navItems = [
  { href: '/', label: uiText.nav.home, Icon: HomeIcon },
  { href: '/presentation', label: uiText.nav.presentation, Icon: UsersIcon },
  { href: '/news', label: uiText.nav.news, Icon: NewsIcon },
  { href: '/agenda', label: uiText.nav.agenda, Icon: CalendarIcon },
  { href: '/medias', label: uiText.nav.medias, Icon: ImageIcon },
  { href: '/liens', label: uiText.nav.links, Icon: LinkChainIcon },
  { href: '/membres', label: 'Membres', Icon: LockIcon },
];

export default function Footer({ email, phone, address }: FooterProps) {
  return (
    <footer className="bg-[#2C221E] text-[#FAF7F2] mt-16 border-t-4 border-[#A0522D]">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bloc Contact */}
        <div>
          <h4 className="text-lg font-bold text-[#D97706] mb-2">{uiText.nav.contact}</h4>
          {email && (
            <p className="text-sm">
              Email :{' '}
              <a href={`mailto:${email}`} className="hover:text-[#D97706] underline underline-offset-2 transition">
                {email}
              </a>
            </p>
          )}
          {phone && (
            <p className="text-sm">
              Tél :{' '}
              <a href={`tel:${phone}`} className="hover:text-[#D97706] underline underline-offset-2 transition">
                {phone}
              </a>
            </p>
          )}
          {address && <p className="text-sm whitespace-pre-line mt-1">{address}</p>}
        </div>

        {/* Bloc mini-menu avec icônes */}
        <div>
          <h4 className="text-lg font-bold text-[#D97706] mb-3 md:text-right">Navigation</h4>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 justify-items-center">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 text-gray-300 hover:text-[#D97706] transition text-[11px] text-center w-14"
              >
                <Icon />
                <span className="leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
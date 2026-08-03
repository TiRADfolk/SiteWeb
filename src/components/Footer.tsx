import Link from 'next/link';
import { uiText } from '@/constants/siteConfig';
import { HomeIcon, UsersIcon, NewsIcon, CalendarIcon, ImageIcon, LinkChainIcon, LockIcon } from './NavIcons';

interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
}

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
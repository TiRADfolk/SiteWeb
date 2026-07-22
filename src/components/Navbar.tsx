//src/components/Navbar.tsx

import Link from 'next/link';
import { uiText } from '@/constants/siteConfig';

interface NavbarProps {
  siteName?: string;
}

export default function Navbar({ siteName }: NavbarProps) {
  return (
    <nav className="bg-[#2C221E] text-[#FAF7F2] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wide text-[#D97706]">
          {siteName || 'Folk Group'}
        </Link>
        <div className="flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-[#D97706] transition">{uiText.nav.home}</Link>
          <Link href="/presentation" className="hover:text-[#D97706] transition">{uiText.nav.presentation}</Link>
          <Link href="/news" className="hover:text-[#D97706] transition">{uiText.nav.news}</Link>
          <Link href="/agenda" className="hover:text-[#D97706] transition">{uiText.nav.agenda}</Link>
          <Link href="/medias" className="hover:text-[#D97706] transition">{uiText.nav.medias}</Link>
          <Link href="/liens" className="hover:text-[#D97706] transition">{uiText.nav.links}</Link>
          <Link href="/contact" className="hover:text-[#D97706] transition">{uiText.nav.contact}</Link>
        </div>
      </div>
    </nav>
  );
}

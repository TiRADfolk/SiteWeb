'use client';

import { useState } from 'react';
import Link from 'next/link';
import { uiText } from '@/constants/siteConfig';

interface NavbarProps {
  siteName?: string;
}

export default function Navbar({ siteName }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#2C221E] text-[#FAF7F2] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link href="/" className="text-xl font-bold tracking-wide text-[#D97706]">
          {siteName || 'Folk Group'}
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/presentation" className="hover:text-[#D97706] transition hidden sm:inline">{uiText.nav.presentation}</Link>
          <Link href="/news" className="hover:text-[#D97706] transition hidden sm:inline">{uiText.nav.news}</Link>
          <Link href="/agenda" className="hover:text-[#D97706] transition hidden sm:inline">{uiText.nav.agenda}</Link>
          <Link href="/medias" className="hover:text-[#D97706] transition hidden sm:inline">{uiText.nav.medias}</Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="text-2xl leading-none hover:text-[#D97706] transition px-1"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 bg-[#2C221E] border border-[#A0522D]/40 rounded-lg shadow-lg flex flex-col min-w-[180px] overflow-hidden">
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.home}
            </Link>
            <Link href="/presentation" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.presentation}
            </Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.news}
            </Link>
            <Link href="/agenda" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.agenda}
            </Link>
            <Link href="/medias" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.medias}
            </Link>
            <Link href="/liens" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              {uiText.nav.links}
            </Link>
            <Link href="/membres" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-[#42332d] hover:text-[#D97706] transition text-sm">
              Privé
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
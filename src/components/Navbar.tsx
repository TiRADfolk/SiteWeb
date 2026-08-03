'use client';

import { useState } from 'react';
import Link from 'next/link';
import { uiText } from '@/constants/siteConfig';
import { UsersIcon, NewsIcon, CalendarIcon, ImageIcon, MailIcon } from './NavIcons';

interface NavbarProps {
  siteName?: string;
  sticky?: boolean;
  shadow?: boolean;
  showContact?: boolean;
  privateLabel?: string;
  linksDesktop?: string;
}

const ALL_LINKS: Record<string, { href: string; label: string; Icon: () => JSX.Element }> = {
  presentation: { href: '/presentation', label: uiText.nav.presentation, Icon: UsersIcon },
  news: { href: '/news', label: uiText.nav.news, Icon: NewsIcon },
  agenda: { href: '/agenda', label: uiText.nav.agenda, Icon: CalendarIcon },
  medias: { href: '/medias', label: uiText.nav.medias, Icon: ImageIcon },
  contact: { href: '/contact', label: uiText.nav.contact, Icon: MailIcon },
};

export default function Navbar({
  siteName,
  sticky = true,
  shadow = true,
  showContact = false,
  privateLabel = 'Privé',
  linksDesktop,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopKeys = linksDesktop
    ? linksDesktop.split(',').map(s => s.trim().toLowerCase()).filter(k => ALL_LINKS[k])
    : ['presentation', 'news', 'agenda', 'medias'];

  if (showContact && !desktopKeys.includes('contact')) {
    desktopKeys.push('contact');
  }

  return (
    <nav
      className={`bg-[var(--text-primary)] text-[var(--bg-primary)] ${sticky ? 'sticky top-0' : ''} z-50 ${shadow ? 'shadow-md' : ''}`}
    >
      <div
        className="max-w-7xl mx-auto flex justify-between items-center relative"
        style={{
          paddingTop: 'var(--nav-padding-y)',
          paddingBottom: 'var(--nav-padding-y)',
          paddingLeft: 'var(--nav-padding-x)',
          paddingRight: 'var(--nav-padding-x)',
        }}
      >
        <Link
          href="/"
          className="font-bold tracking-wide text-[var(--accent-secondary)]"
          style={{ fontSize: 'var(--brand-font-size)' }}
        >
          {siteName || 'Folk Group'}
        </Link>

        <div
          className="flex items-center font-medium"
          style={{ gap: 'var(--nav-gap)', fontSize: 'var(--nav-font-size)' }}
        >
          {desktopKeys.map((key) => {
            const { href, label, Icon } = ALL_LINKS[key];
            return (
              <Link
                key={key}
                href={href}
                title={label}
                aria-label={label}
                className="hover:text-[var(--accent-secondary)] transition hidden sm:flex flex-col items-center gap-0.5"
              >
                <Icon />
                <span className="text-[10px] leading-none">{label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="leading-none hover:text-[var(--accent-secondary)] transition px-1"
            style={{ fontSize: 'var(--nav-icon-size)' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div
            className="absolute top-full right-4 mt-2 bg-[var(--text-primary)] border border-[var(--accent-folk)]/40 shadow-lg flex flex-col min-w-[180px] overflow-hidden"
            style={{ borderRadius: 'var(--nav-menu-radius)' }}
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.home}
            </Link>
            <Link href="/presentation" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.presentation}
            </Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.news}
            </Link>
            <Link href="/agenda" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.agenda}
            </Link>
            <Link href="/medias" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.medias}
            </Link>
            {showContact && (
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
                {uiText.nav.contact}
              </Link>
            )}
            <Link href="/liens" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {uiText.nav.links}
            </Link>
            <Link href="/membres" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-black/20 hover:text-[var(--accent-secondary)] transition text-sm">
              {privateLabel}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
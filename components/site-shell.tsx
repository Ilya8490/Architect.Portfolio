"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Container } from '@/components/container';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { getLocalizedHomePath, getLocalizedSectionPath, type Dictionary, type Locale } from '@/lib/i18n';

type SiteShellProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
  mode?: 'home' | 'project';
  slug?: string;
};

export function SiteShell({ locale, dictionary, children, mode = 'home', slug }: SiteShellProps) {
  const isProjectPage = mode === 'project';
  const homeHref = getLocalizedHomePath(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const navLinks = isProjectPage
    ? [
        { label: dictionary.nav.home, href: homeHref },
        { label: dictionary.nav.projects, href: getLocalizedSectionPath(locale, 'projects') },
        { label: dictionary.nav.contact, href: getLocalizedSectionPath(locale, 'contact') }
      ]
    : [
        { label: dictionary.nav.about, href: getLocalizedSectionPath(locale, 'about') },
        { label: dictionary.nav.projects, href: getLocalizedSectionPath(locale, 'projects') },
        { label: dictionary.nav.services, href: getLocalizedSectionPath(locale, 'services') },
        { label: dictionary.nav.testimonials, href: getLocalizedSectionPath(locale, 'testimonials') },
        { label: dictionary.nav.contact, href: getLocalizedSectionPath(locale, 'contact') }
      ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-paper/75 backdrop-blur-xl">
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link href={homeHref} className="group flex items-baseline gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.35em]">{dictionary.site.name}</span>
            <span className="hidden text-xs uppercase tracking-[0.28em] text-muted sm:inline">{dictionary.site.role}</span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-xs uppercase tracking-[0.28em] text-muted transition hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} slug={slug} isProjectPage={isProjectPage} />
            <ThemeToggle
              themeToggleLabel={dictionary.ui.themeToggle}
              lightModeLabel={dictionary.ui.lightMode}
              darkModeLabel={dictionary.ui.darkMode}
            />
          </div>
        </Container>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/50 bg-paper/80">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="max-w-2xl text-xl leading-8 text-ink sm:text-2xl">{dictionary.footer.line}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm text-muted lg:items-end lg:text-right">
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-ink">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-ink">
                Instagram
              </a>
              <a href="mailto:studio@aureline.com" className="transition hover:text-ink">
                studio@aureline.com
              </a>
            </div>
            <p>
              {new Date().getFullYear()} {dictionary.site.name}. {dictionary.footer.copyright}
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

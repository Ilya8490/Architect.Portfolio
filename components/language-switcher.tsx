"use client";

import Link from 'next/link';
import { locales, type Locale, getLocalizedHomePath, getLocalizedProjectPath } from '@/lib/i18n';
import { cn } from '@/lib/cn';

type LanguageSwitcherProps = {
  locale: Locale;
  slug?: string;
  isProjectPage?: boolean;
};

export function LanguageSwitcher({ locale, slug, isProjectPage }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/70 p-1 text-[11px] font-medium uppercase tracking-[0.28em]">
      {locales.map((candidate) => {
        const href = isProjectPage && slug ? getLocalizedProjectPath(candidate, slug) : getLocalizedHomePath(candidate);
        const active = candidate === locale;
        return (
          <Link
            key={candidate}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-full px-3 py-2 transition',
              active ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
            )}
          >
            {candidate.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

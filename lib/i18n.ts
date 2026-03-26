import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import uk from '@/locales/uk.json';

export const locales = ['en', 'ru', 'uk'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
  uk
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function normalizeLocale(value?: string): Locale {
  return isLocale(value) ? value : 'en';
}

export function getDictionary(locale?: string) {
  return dictionaries[normalizeLocale(locale)];
}

export function getLocalizedHomePath(locale: Locale) {
  return locale === 'en' ? '/' : `/${locale}`;
}

export function getLocalizedSectionPath(locale: Locale, section: string) {
  return locale === 'en' ? `/#${section}` : `/${locale}#${section}`;
}

export function getLocalizedProjectPath(locale: Locale, slug: string) {
  return locale === 'en' ? `/projects/${slug}` : `/${locale}/projects/${slug}`;
}

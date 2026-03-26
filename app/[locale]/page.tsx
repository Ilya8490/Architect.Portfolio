import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';
import { HomePage } from '@/components/home-page';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const dictionary = getDictionary(params.locale);
  return {
    title: `${dictionary.site.name} | ${dictionary.hero.title}`,
    description: dictionary.hero.subtitle
  };
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = getDictionary(locale);
  return <HomePage locale={locale} dictionary={dictionary} />;
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';
import { projectMeta } from '@/data/projects';
import { ProjectPage } from '@/components/project-page';

export function generateStaticParams() {
  return locales.flatMap((locale) => projectMeta.map((project) => ({ locale, slug: project.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const dictionary = getDictionary(params.locale);
  const project = dictionary.portfolio.projects.find((item) => item.slug === params.slug);

  if (!project) {
    return {
      title: dictionary.projectPage.notFound
    };
  }

  return {
    title: `${project.title} | ${dictionary.site.name}`,
    description: project.description
  };
}

export default function LocalizedProjectRoute({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = getDictionary(locale);
  const exists = projectMeta.some((project) => project.slug === params.slug);

  if (!exists) {
    notFound();
  }

  return <ProjectPage locale={locale} dictionary={dictionary} slug={params.slug} />;
}

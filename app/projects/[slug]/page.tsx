import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, type Locale } from '@/lib/i18n';
import { projectMeta } from '@/data/projects';
import { ProjectPage } from '@/components/project-page';

export function generateStaticParams() {
  return projectMeta.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dictionary = getDictionary('en');
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

export default function ProjectRoute({ params }: { params: { slug: string } }) {
  const dictionary = getDictionary('en');
  const exists = projectMeta.some((project) => project.slug === params.slug);

  if (!exists) {
    notFound();
  }

  return <ProjectPage locale={'en' as Locale} dictionary={dictionary} slug={params.slug} />;
}

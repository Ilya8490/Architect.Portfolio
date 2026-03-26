"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { getLocalizedSectionPath } from '@/lib/i18n';
import { SiteShell } from '@/components/site-shell';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { Button } from '@/components/button';
import { Reveal } from '@/components/reveal';
import { projectMeta } from '@/data/projects';

type ProjectPageProps = {
  locale: Locale;
  dictionary: Dictionary;
  slug: string;
};

export function ProjectPage({ locale, dictionary, slug }: ProjectPageProps) {
  const project = dictionary.portfolio.projects.find((item) => item.slug === slug);
  const meta = projectMeta.find((item) => item.slug === slug);

  if (!project || !meta) {
    return (
      <SiteShell locale={locale} dictionary={dictionary} mode="project" slug={slug}>
        <Container className="py-24">
          <p className="text-sm uppercase tracking-[0.35em] text-muted">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter">{dictionary.projectPage.notFound}</h1>
          <Button href={getLocalizedSectionPath(locale, 'projects')} className="mt-8">
            {dictionary.projectPage.back}
          </Button>
        </Container>
      </SiteShell>
    );
  }

  return (
    <SiteShell locale={locale} dictionary={dictionary} mode="project" slug={slug}>
      <section className="border-b border-border/50">
        <Container className="py-12 lg:py-16">
          <Reveal>
            <Link href={getLocalizedSectionPath(locale, 'projects')} className="text-xs uppercase tracking-[0.35em] text-muted transition hover:text-ink">
              {dictionary.projectPage.back}
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted">{dictionary.projectPage.overview}</p>
                <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tighter sm:text-7xl">{project.title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{project.description}</p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">{dictionary.projectPage.detail}</p>
              </div>
              <div className="grid gap-4 border border-border/70 bg-surface/60 p-6 backdrop-blur-sm sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">{dictionary.projectPage.facts}</p>
                </div>
                <Fact label={dictionary.projectPage.location} value={project.location} />
                <Fact label={dictionary.projectPage.year} value={project.year} />
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">{dictionary.projectPage.tags}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[16/9]">
                <Image src={meta.cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{dictionary.projectPage.gallery}</p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {meta.gallery.map((image, index) => (
              <Reveal key={image} delay={0.04 * index}>
                <Card className="overflow-hidden p-0">
                  <div className="relative aspect-[4/5]">
                    <Image src={image} alt={`${project.title} gallery ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/60 pb-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

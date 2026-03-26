"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { getLocalizedProjectPath, getLocalizedSectionPath } from '@/lib/i18n';
import { SiteShell } from '@/components/site-shell';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { projectMeta } from '@/data/projects';

type HomePageProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HomePage({ locale, dictionary }: HomePageProps) {
  const heroImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80';
  const portfolioItems = dictionary.portfolio.projects;

  return (
    <SiteShell locale={locale} dictionary={dictionary} mode="home">
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.78)_0%,rgba(10,10,10,0.42)_42%,rgba(10,10,10,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,170,125,0.18),transparent_38%)]" />
        </div>
        <Container className="relative z-10 flex min-h-[100svh] items-end pb-16 pt-24 sm:pb-20 lg:pb-24">
          <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal className="max-w-3xl text-white">
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/75">{dictionary.hero.eyebrow}</p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tighter sm:text-7xl lg:text-[6.5rem]">
                {dictionary.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{dictionary.hero.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={getLocalizedSectionPath(locale, 'projects')}>{dictionary.hero.cta}</Button>
                <Button
                  href={getLocalizedSectionPath(locale, 'contact')}
                  variant="secondary"
                  className="border-white/30 bg-white/10 text-white hover:border-white hover:text-white"
                >
                  {dictionary.hero.secondaryCta}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:justify-self-end">
              <div className="max-w-md border border-white/15 bg-white/8 p-6 text-white backdrop-blur-sm sm:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">{dictionary.about.label}</p>
                <p className="mt-4 text-lg leading-8 text-white/85">{dictionary.about.bio}</p>
                <div className="mt-6 h-px bg-white/20" />
                <p className="mt-6 text-sm leading-7 text-white/70">{dictionary.about.philosophy}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section id="about" label={dictionary.about.label} title={dictionary.about.title} intro={dictionary.about.bio}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <Card className="overflow-hidden p-0">
              <div className="relative min-h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80"
                  alt={dictionary.about.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-6">
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{dictionary.about.philosophy}</p>
              <div className="grid gap-3">
                {dictionary.about.principles.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 border-t border-border/60 py-4">
                    <span className="font-serif text-2xl text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <p className="max-w-xl text-sm leading-7 text-ink sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="projects"
        label={dictionary.portfolio.label}
        title={dictionary.portfolio.title}
        intro={dictionary.portfolio.intro}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {portfolioItems.map((project, index) => {
            const meta = projectMeta.find((item) => item.slug === project.slug)!;
            return (
              <Reveal key={project.slug} delay={0.04 * index}>
                <Link href={getLocalizedProjectPath(locale, project.slug)} className="group block">
                  <Card className="overflow-hidden transition duration-500 group-hover:-translate-y-1 group-hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={meta.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,10,0.75)_100%)]" />
                    </div>
                    <div className="grid gap-5 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-medium tracking-tighter">{project.title}</h3>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">{project.description}</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.28em] text-muted">{project.year}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="services" label={dictionary.services.label} title={dictionary.services.title}>
        <div className="grid gap-6 lg:grid-cols-2">
          {dictionary.services.items.map((service, index) => (
            <Reveal key={service.title} delay={0.05 * index}>
              <Card className="p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/70 text-xs font-semibold tracking-[0.25em] text-accent">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tighter">{service.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">{service.description}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="testimonials" label={dictionary.testimonials.label} title={dictionary.testimonials.title}>
        <div className="grid gap-6 lg:grid-cols-3">
          {dictionary.testimonials.items.map((item, index) => (
            <Reveal key={item.name} delay={0.04 * index}>
              <Card className="h-full p-6 sm:p-8">
                <p className="text-3xl leading-none text-accent">"</p>
                <p className="mt-4 text-base leading-8 text-ink">{item.quote}</p>
                <div className="mt-8 border-t border-border/60 pt-5">
                  <p className="text-sm font-medium tracking-tight">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted">{item.role}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="contact" label={dictionary.contact.label} title={dictionary.contact.title} intro={dictionary.contact.intro}>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div className="grid gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted">{dictionary.contact.emailLabel}</p>
                <a href="mailto:studio@aureline.com" className="mt-3 block text-2xl font-medium tracking-tighter transition hover:text-accent">
                  studio@aureline.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted">{dictionary.contact.socialLabel}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink">
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-accent">
                    LinkedIn
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-accent">
                    Instagram
                  </a>
                </div>
              </div>
              <div className="max-w-md text-sm leading-7 text-muted">
                <p>{dictionary.contact.note}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm dictionary={dictionary} />
          </Reveal>
        </div>
      </Section>
    </SiteShell>
  );
}

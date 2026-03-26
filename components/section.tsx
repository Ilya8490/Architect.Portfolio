"use client";

import type { ReactNode } from 'react';
import { Container } from '@/components/container';
import { cn } from '@/lib/cn';

type SectionProps = {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  eyebrowClassName?: string;
};

export function Section({ id, label, title, intro, children, className, eyebrowClassName }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-28 py-20 sm:py-24 lg:py-28', className)}>
      <Container>
        {(label || title || intro) && (
          <div className="mb-10 max-w-3xl">
            {label ? <p className={cn('mb-3 text-xs uppercase tracking-[0.35em] text-muted', eyebrowClassName)}>{label}</p> : null}
            {title ? <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">{title}</h2> : null}
            {intro ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{intro}</p> : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

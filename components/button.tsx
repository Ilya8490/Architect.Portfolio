"use client";

import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Shared = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

type ButtonAsButton = Shared & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function styles(variant: NonNullable<Shared['variant']>) {
  switch (variant) {
    case 'secondary':
      return 'border border-border/80 bg-surface/70 text-ink hover:border-accent hover:text-accent';
    case 'ghost':
      return 'border border-transparent bg-transparent text-ink hover:border-border/70 hover:bg-surface/50';
    default:
      return 'border border-ink bg-ink text-paper hover:translate-y-[-1px] hover:bg-accent hover:border-accent';
  }
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, className, variant = 'primary', ...rest } = props;
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium tracking-[0.18em] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper';
  const classes = cn(base, styles(variant), className);

  if ('href' in props && typeof props.href === 'string') {
    return (
      <Link className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

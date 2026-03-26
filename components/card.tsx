"use client";

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-[1.75rem] border border-border/70 bg-surface/60 backdrop-blur-sm', className)}>{children}</div>;
}

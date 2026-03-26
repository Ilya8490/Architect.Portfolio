import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import { HomePage } from '@/components/home-page';

export const metadata: Metadata = {
  title: 'Aureline Studio | Home',
  description: 'Modern architectural portfolio with selected projects, services, testimonials, and a premium contact flow.'
};

export default function Page() {
  const dictionary = getDictionary('en');
  return <HomePage locale="en" dictionary={dictionary} />;
}

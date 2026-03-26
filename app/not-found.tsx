import { getDictionary } from '@/lib/i18n';
import { Container } from '@/components/container';
import { Button } from '@/components/button';

export default function NotFound() {
  const dictionary = getDictionary('en');

  return (
    <Container className="flex min-h-[70svh] items-center py-24">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tighter">{dictionary.ui.notFoundTitle}</h1>
        <p className="mt-5 text-base leading-8 text-muted">{dictionary.ui.notFoundDescription}</p>
        <Button href="/" className="mt-8">
          {dictionary.ui.notFoundAction}
        </Button>
      </div>
    </Container>
  );
}

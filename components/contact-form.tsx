"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { cn } from '@/lib/cn';
import type { Dictionary } from '@/lib/i18n';

type ContactFormProps = {
  dictionary: Dictionary;
};

type State = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof State, string>>;

const emptyState: State = {
  name: '',
  email: '',
  message: ''
};

export function ContactForm({ dictionary }: ContactFormProps) {
  const [form, setForm] = useState<State>(emptyState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate(values: State) {
    const nextErrors: Errors = {};
    if (!values.name.trim()) nextErrors.name = dictionary.contact.requiredName;
    if (!values.email.trim()) {
      nextErrors.email = dictionary.contact.requiredEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = dictionary.contact.invalidEmail;
    }
    if (!values.message.trim()) nextErrors.message = dictionary.contact.requiredMessage;
    return nextErrors;
  }

  function handleChange(field: keyof State, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrors({});
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
    setForm(emptyState);
  }

  return (
    <Card className="p-6 sm:p-8">
      <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={dictionary.contact.name}
            value={form.name}
            error={errors.name}
            onChange={(value) => handleChange('name', value)}
            placeholder={dictionary.contact.placeholders.name}
          />
          <Field
            label={dictionary.contact.email}
            value={form.email}
            error={errors.email}
            onChange={(value) => handleChange('email', value)}
            placeholder={dictionary.contact.placeholders.email}
            type="email"
          />
        </div>
        <Field
          label={dictionary.contact.message}
          value={form.message}
          error={errors.message}
          onChange={(value) => handleChange('message', value)}
          placeholder={dictionary.contact.placeholders.message}
          textarea
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? dictionary.contact.sending : dictionary.contact.submit}
          </Button>
          <p
            aria-live="polite"
            className={cn(
              'text-sm',
              status === 'success' ? 'text-accent' : status === 'error' ? 'text-red-500' : 'text-muted'
            )}
          >
            {status === 'success' ? dictionary.contact.success : status === 'error' ? dictionary.contact.error : ''}
          </p>
        </div>
      </form>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  textarea = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    'mt-2 w-full rounded-[1.25rem] border border-border/70 bg-paper/75 px-4 py-3 text-sm text-ink placeholder:text-muted transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

  return (
    <label className="block text-sm font-medium text-ink">
      <span className="text-xs uppercase tracking-[0.28em] text-muted">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={6}
          className={cn(base, 'resize-none')}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          className={base}
          aria-invalid={Boolean(error)}
        />
      )}
      <span className="mt-2 block min-h-5 text-xs text-red-500" aria-live="polite">
        {error ?? ''}
      </span>
    </label>
  );
}

# Aureline Studio

Premium architect portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and static export.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build the static export:

```bash
npm run build
```

With `output: "export"` enabled in `next.config.mjs`, `next build` outputs the static site to `out/`.

If you prefer a separate alias, `npm run export` runs the same static build.

## Routes

- `/` - English home page
- `/ru` - Russian home page
- `/uk` - Ukrainian home page
- `/projects/[slug]` - English project detail page
- `/ru/projects/[slug]` - Russian project detail page
- `/uk/projects/[slug]` - Ukrainian project detail page

## Notes

- Translation files live in `locales/`.
- Project image metadata lives in `data/projects.ts`.
- The contact form is fully mocked on the client and does not require a backend.
- Dark mode is persisted in `localStorage`.

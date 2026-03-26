import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Aureline Studio',
  description: 'Premium architecture portfolio with multilingual content and refined editorial styling.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} bg-paper font-sans text-ink antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => { try { const stored = localStorage.getItem('theme'); const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const theme = stored || (systemDark ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; } catch (error) { document.documentElement.dataset.theme = 'light'; } })();`}
        </Script>
        {children}
      </body>
    </html>
  );
}

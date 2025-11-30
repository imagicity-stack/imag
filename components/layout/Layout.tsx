import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Admin', href: '/admin/login' }
];

export default function Layout({ children, title = 'IMAGICITY', description = 'Imagination-first agency building brand experiences.' }: LayoutProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
      </Head>
      <div className="min-h-screen flex flex-col bg-night text-white">
        <header className="sticky top-0 z-50 backdrop-blur bg-night/70 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-aurum">
              IMAGICITY
            </Link>
            <nav className="flex items-center gap-6 text-sm font-semibold">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-aurum">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 bg-gradient-to-b from-night via-plum/40 to-night">{children}</main>
        <footer className="border-t border-gray-800 bg-plum/40">
          <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>© {new Date().getFullYear()} IMAGICITY. Crafted for brands that dare.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms-and-conditions">Terms</Link>
              <Link href="/return-and-refund-policy">Refunds</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

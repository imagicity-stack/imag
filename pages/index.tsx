import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout
      title="IMAGICITY — Imagination-first agency"
      description="IMAGICITY builds brands, campaigns, and experiences that convert attention into momentum."
    >
      <Head>
        <meta property="og:title" content="IMAGICITY — Imagination-first agency" />
        <meta
          property="og:description"
          content="IMAGICITY builds brands, campaigns, and experiences that convert attention into momentum."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      </Head>
      <section className="max-w-6xl mx-auto px-6 py-20 grid gap-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="uppercase tracking-[0.3em] text-sm text-aurum">Imagination → Impact</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              We build brands, content, and launches that make audiences stop, stare, and act.
            </h1>
            <p className="text-gray-300 text-lg">
              IMAGICITY is a multidisciplinary agency blending strategy, design, production, and growth engineering.
              This site now includes a full-featured blog system powered by Firebase so you can publish thought leadership
              without breaking your flow.
            </p>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="px-5 py-3 rounded-full bg-aurum text-black font-semibold hover:shadow-[0_10px_60px_-15px_rgba(255,211,71,0.8)]"
              >
                Read the blog
              </Link>
              <Link
                href="/admin/login"
                className="px-5 py-3 rounded-full border border-aurum text-aurum font-semibold hover:bg-aurum/10"
              >
                Admin access
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-scarlet/50 via-plum to-night p-10 shadow-2xl">
            <p className="text-sm uppercase text-gray-300 mb-4">What we build</p>
            <ul className="space-y-3 text-lg">
              <li>• Brand systems that feel inevitable</li>
              <li>• Campaigns designed for momentum</li>
              <li>• Landing pages engineered for conversion</li>
              <li>• Content engines that keep audiences hooked</li>
              <li>• Analytics and growth loops that scale</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 flex flex-col gap-3">
              <p className="text-sm uppercase tracking-widest text-gray-400">Launch Story {i}</p>
              <h3 className="text-xl font-semibold">From spark to spotlight</h3>
              <p className="text-gray-400">
                We choreograph research, narrative, visuals, and growth to give every release a cinematic debut.
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

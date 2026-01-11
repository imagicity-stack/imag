'use client';

const navItems = ['Home', 'About', 'Services', 'Contact', 'Project', 'Project Details', 'Blog', 'Blog Details'];

const quickStats = [
  { label: 'Research & Development', value: '265K+', tone: 'bg-[#efe0ff]' },
  { label: 'Employees', value: '120+', tone: 'bg-[#ffe4bf]' },
  { label: 'Community', value: '18 Cities', tone: 'bg-[#d8f2ff]' }
];

const serviceCards = [
  { title: 'Website & App', desc: 'Modern, responsive experiences that turn visitors into loyal fans.', tone: 'bg-[#f7d1d6]' },
  { title: 'Marketing', desc: 'Campaigns that feel human and still hit the metrics.', tone: 'bg-[#ffe6c7]' },
  { title: 'Branding Strategy', desc: 'Names, voice, and visual systems crafted for longevity.', tone: 'bg-[#d9d9f9]' },
  { title: 'Digital Experience', desc: 'From touchpoints to flows, we choreograph the journey.', tone: 'bg-[#f8efb8]' }
];

const insightCards = [
  { title: 'Save 15%', note: 'Conversion uplift', tone: 'bg-[#fdf3cf]' },
  { title: '+260K', note: 'New subscribers', tone: 'bg-[#f0dcff]' }
];

function DotIcon({ className }) {
  return (
    <svg viewBox="0 0 8 8" className={className} aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  );
}

function FlowerIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="10" fill="#1f1f1f" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="10"
          rx="10"
          ry="16"
          fill="#ff9f5a"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  );
}

function RibbonIcon({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 4l5 11 12 2-9 9 2 13-10-6-10 6 2-13-9-9 12-2 5-11z" fill="#1f1f1f" />
    </svg>
  );
}

function ArrowBadge({ className }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="16" fill="#1f1f1f" />
      <path d="M12 18h12m-4-4 4 4-4 4" stroke="#fbe8a2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PreviewCard({ title, subtitle, className, children }) {
  return (
    <article className={`rounded-[28px] p-6 shadow-[0_18px_0_rgba(0,0,0,0.08)] ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/60">{title}</p>
          {subtitle && <h3 className="mt-2 text-xl font-semibold text-[#1f1f1f]">{subtitle}</h3>}
        </div>
        <ArrowBadge className="h-10 w-10" />
      </div>
      <div className="mt-6">{children}</div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2f3b1f] px-4 py-10 text-[#1f1f1f] md:px-10">
      <header className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-black uppercase tracking-tight text-[#f6e7c1] sm:text-5xl md:text-6xl">
          Full web page preview
        </h1>
        <nav className="mt-4 flex flex-wrap gap-4 text-sm text-[#d4c4a2]">
          {navItems.map((item) => (
            <a key={item} className="flex items-center gap-2" href="#">
              <DotIcon className="h-2 w-2 text-[#d4c4a2]" />
              <span className="uppercase tracking-[0.22em]">{item}</span>
            </a>
          ))}
        </nav>
      </header>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <PreviewCard title="Home" subtitle="Co.mind" className="bg-[#f2d6d4]">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-4xl font-black tracking-tight text-[#1f1f1f]">CO.MIND</h2>
                  <p className="mt-2 max-w-xs text-sm text-black/70">
                    Co.mind is a creative agency specializing in web, branding, and digital marketing.
                  </p>
                </div>
                <FlowerIcon className="h-12 w-12" />
              </div>
              <div className="rounded-2xl bg-[#3a0f1a] p-5 text-white">
                <p className="text-sm font-semibold">We work with people from all over the world.</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <RibbonIcon className="h-5 w-5" /> Architect
                  </div>
                  <div className="flex items-center gap-2">
                    <RibbonIcon className="h-5 w-5" /> Marketly
                  </div>
                  <div className="flex items-center gap-2">
                    <RibbonIcon className="h-5 w-5" /> Natural
                  </div>
                  <div className="flex items-center gap-2">
                    <RibbonIcon className="h-5 w-5" /> Studio
                  </div>
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard title="Experience" subtitle="Your trusted partner" className="bg-[#a9c8f7]">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-sm text-black/80">
                  Global experience and human-first strategy for teams building bold digital products.
                </p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#f6e7c1]">
                  Get started
                  <ArrowBadge className="h-6 w-6" />
                </button>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">Insights</p>
                <div className="mt-3 flex flex-col gap-2">
                  {insightCards.map((card) => (
                    <div key={card.title} className={`rounded-xl p-3 ${card.tone}`}>
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="text-xs text-black/60">{card.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard title="What we do" subtitle="We create beautiful, practical work" className="bg-white">
            <div className="grid gap-4 md:grid-cols-2">
              {serviceCards.map((card) => (
                <div key={card.title} className={`rounded-2xl p-4 ${card.tone}`}>
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="mt-2 text-xs text-black/60">{card.desc}</p>
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard title="Portfolio" subtitle="Comprehensive solutions" className="bg-[#f8c9d9]">
            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold">Adaptogenic Brownie</p>
                <p className="mt-2 text-xs text-black/60">
                  A full brand system and digital launch plan for a wellness snack.
                </p>
                <button className="mt-3 rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
                  View project
                </button>
              </div>
              <div className="rounded-2xl bg-[#ffe6f1] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">Case study</p>
                <p className="mt-2 text-lg font-semibold">Global experience with local nuance.</p>
                <div className="mt-4 flex items-center gap-2">
                  <FlowerIcon className="h-8 w-8" />
                  <span className="text-xs text-black/60">Brand expansion toolkit</span>
                </div>
              </div>
            </div>
          </PreviewCard>
        </div>

        <div className="space-y-6">
          <PreviewCard title="About" subtitle="It all started with a simple truth" className="bg-[#a7c8f1]">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm text-black/70">
                  Co.mind builds creative ecosystems for startups, founders, and ambitious teams.
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                  <div className="h-10 w-10 rounded-full bg-[#ffd86f]" />
                  <div>
                    <p className="text-sm font-semibold">Cameron Williamson</p>
                    <p className="text-xs text-black/60">Creative Director</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-[#ffe48e] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/60">What we have</p>
                <div className="mt-4 space-y-3">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className={`rounded-xl p-3 ${stat.tone}`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-black/50">{stat.label}</p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard title="Communication" subtitle="Communication is key to our success" className="bg-[#f4e3b3]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#541019] p-4 text-white">
                <p className="text-sm font-semibold">Work smarter, save faster.</p>
                <ul className="mt-3 space-y-2 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <DotIcon className="h-2 w-2 text-[#f4e3b3]" />
                    Daily strategy check-ins
                  </li>
                  <li className="flex items-center gap-2">
                    <DotIcon className="h-2 w-2 text-[#f4e3b3]" />
                    Campaign to conversion alignment
                  </li>
                  <li className="flex items-center gap-2">
                    <DotIcon className="h-2 w-2 text-[#f4e3b3]" />
                    Clear project milestones
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">Testimonial</p>
                <p className="mt-3 text-sm text-black/70">
                  “We finally have a brand voice that matches the energy of our product.”
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#ffd86f]" />
                  <div>
                    <p className="text-sm font-semibold">Product Lead</p>
                    <p className="text-xs text-black/60">Series B SaaS</p>
                  </div>
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard title="Results" subtitle="We believe in the power of data" className="bg-[#cdb7ef]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">Growth</p>
                <p className="mt-2 text-2xl font-semibold">+260K</p>
                <p className="text-xs text-black/60">New subscribers in 60 days.</p>
              </div>
              <div className="rounded-2xl bg-[#f6f1ff] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-black/50">Data mix</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-xl bg-[#ffd86f]" />
                  <div className="h-16 rounded-xl bg-[#a7c8f1]" />
                  <div className="h-16 rounded-xl bg-[#f2d6d4]" />
                </div>
              </div>
            </div>
          </PreviewCard>

          <PreviewCard title="Latest" subtitle="The latest from Co.mind" className="bg-white">
            <div className="grid gap-3 md:grid-cols-3">
              {['Swiss Template', 'Stress Template', 'UX Research'].map((item) => (
                <div key={item} className="rounded-2xl bg-[#eef0ff] p-4 text-center">
                  <FlowerIcon className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-xs font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </PreviewCard>

          <PreviewCard title="CTA" subtitle="Let us create spaces that inspire" className="bg-[#f7d45c]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-sm text-sm text-black/70">
                Tell us about your product, your mission, and the moment you want to create.
              </p>
              <button className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#f7d45c]">
                Get started
                <ArrowBadge className="h-6 w-6" />
              </button>
            </div>
          </PreviewCard>
        </div>
      </section>
    </main>
  );
}

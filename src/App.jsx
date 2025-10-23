import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const rotatingWords = ['Design', 'Strategy', 'Growth', 'Reality'];

const portfolioFilters = ['all', 'tech', 'retail', 'education', 'lifestyle'];

const portfolioItems = [
  {
    title: 'NeuroPulse Labs',
    category: 'tech',
    description: 'AI-driven health diagnostics reimagined as a cultural movement.'
  },
  {
    title: 'Velvet Alley',
    category: 'retail',
    description: 'Luxury streetwear that bleeds rebellion into every seam.'
  },
  {
    title: 'MindSpring Academy',
    category: 'education',
    description: 'A digital campus launch that made learning feel like a premiere night.'
  },
  {
    title: 'PulseFuel',
    category: 'lifestyle',
    description: 'Clean energy drinks with a cult-worthy identity and launch playbook.'
  },
  {
    title: 'Circuit Society',
    category: 'tech',
    description: 'From stealth startup to spotlight darling in six incendiary weeks.'
  },
  {
    title: 'Bloom District',
    category: 'retail',
    description: 'Repositioned a boutique chain into a modern ritual for self-expression.'
  }
];

const faqItems = [
  { q: 'What exactly does IMAGICITY do?', a: 'We architect brand ecosystems—strategy, identity, campaigns, digital experiences, and the launch fuel to light them on fire.' },
  { q: 'Do you only work with startups?', a: 'Startups, scaleups, rebels in disguise. If you want growth and a brand that actually converts, we talk.' },
  { q: 'How fast can you build a brand?', a: 'Strategy sprints in 3 weeks. Full identity in 6. Go-to-market playbook in 8. Momentum? Continuous.' },
  { q: 'Will you just make us a logo?', a: 'We could, but why waste our collective potential on a sticker when you need a movement?' },
  { q: 'Do you offer retainers?', a: 'Yes. We become your fractional creative and growth command center when you want us around.' },
  { q: 'How involved do we need to be?', a: 'We expect decision-makers in the room. Ghost clients get ghost results.' },
  { q: 'Do you run ads too?', a: 'We plan, build, and optimize campaigns. Performance meets brand—because one without the other is just noise.' },
  { q: 'Can you help us fundraise?', a: 'We craft decks, narratives, and launch sequences that make investors lean forward.' },
  { q: 'Do you work internationally?', a: 'Yes. Cities, time zones, planets—it’s all remote anyway.' },
  { q: 'What industries do you specialize in?', a: 'Tech, retail, education, lifestyle, and any space where imagination creates unfair advantage.' },
  { q: 'What does collaboration look like?', a: 'Weekly war-room reviews, async updates, and a shared roadmap that keeps momentum ruthless.' },
  { q: 'Can we hire you just for strategy?', a: 'Absolutely. Strategy first, execution if you want to keep the fire burning.' },
  { q: 'Who will we be working with?', a: 'A core team of brand strategists, designers, growth engineers, and campaign producers.' },
  { q: 'How do you measure success?', a: 'Pipeline growth, conversion lifts, product adoption, cultural impact. Vanity metrics go in the shredder.' },
  { q: 'What does onboarding look like?', a: 'A diagnostic sprint that dissects your market, your product, and your customers’ psychology.' },
  { q: 'How custom is the work?', a: 'No templates. Each build is engineered around your positioning, product, and north-star metrics.' },
  { q: 'Do you integrate with in-house teams?', a: 'We embed as partners—Slack, Notion, Figma, whatever keeps collaboration ferocious.' },
  { q: 'What tools do you use?', a: 'From Figma to Webflow to custom stacks. The tool is irrelevant; the outcome isn’t.' },
  { q: 'What if we already have a brand?', a: 'Perfect. We audit, evolve, and reignite. Legacy is only useful if it still bites.' },
  { q: 'Can you fix our website?', a: 'We can overhaul it into an experience that actually sells. Otherwise, keep the digital brochure.' },
  { q: 'Do you handle content?', a: 'Yes—campaign scripts, social narratives, launch stories that cut through feed fatigue.' },
  { q: 'What’s your communication style?', a: 'Radically honest, relentlessly constructive, always aligned to outcomes.' },
  { q: 'Are we a good fit?', a: 'If you’re ambitious, resilient, and allergic to average—yes. If you just want a logo, probably not.' },
  { q: 'What happens after launch?', a: 'Optimization sprints, performance tracking, iteration loops. Launch day is the starting line.' },
  { q: 'How do we start?', a: 'Fill out the form below. We’ll respond with a diagnostic call invite within 48 hours.' }
];

const entrySteps = [
  {
    id: 'instagram',
    question: 'Or you just want something that looks cool on Instagram?',
    options: [
      { label: 'I just want it to look cool.', value: 'cool' },
      { label: 'I actually want to build something real.', value: 'real' }
    ],
    responses: {
      cool: 'Cool doesn\'t convert, bugger.',
      real: 'Finally, someone who gets it.'
    }
  },
  {
    id: 'plan',
    question: 'Do you have a real plan?',
    options: [
      { label: 'Kinda.', value: 'kinda' },
      { label: 'No idea.', value: 'none' },
      { label: 'I\'m here to figure that out.', value: 'figure' }
    ],
    responses: {
      kinda: 'Kinda isn\'t a strategy.',
      none: 'Then why are you here?',
      figure: 'Good. That\'s where we come in.'
    }
  }
];

const glitchFrames = [
  'drop-shadow(0 0 12px rgba(165, 0, 0, 0.6))',
  'drop-shadow(0 0 18px rgba(165, 0, 0, 0.8))',
  'drop-shadow(0 0 24px rgba(255, 255, 255, 0.4))'
];

function TypewriterText({ text, delay = 0, className = '' }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let interval;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        setDisplayed((prev) => {
          const next = text.slice(0, index + 1);
          return next;
        });
        index += 1;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 25);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={`tracking-tight ${className}`}>{displayed}</span>;
}

function EntryGate({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (stepIndex === 0) {
      const timer = setTimeout(() => setShowSecondLine(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [stepIndex]);

  const handleOptionClick = (value) => {
    if (isLocked) return;
    setIsLocked(true);
    const current = entrySteps[stepIndex - 1];
    setFeedback(current.responses[value]);
    setTimeout(() => {
      setFeedback('');
      setIsLocked(false);
      setStepIndex((prev) => prev + 1);
    }, 1700);
  };

  const handleEnter = () => {
    if (glitching) return;
    setGlitching(true);
    setTimeout(() => {
      onComplete();
    }, 750);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle at top left, rgba(165,0,0,0.35), transparent 55%)' }} />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),rgba(0,0,0,0))] opacity-40" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        <AnimatePresence mode="wait">
          {stepIndex === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-3xl font-semibold md:text-5xl">
                <TypewriterText text="Hold up." />
              </p>
              {showSecondLine && (
                <p className="text-xl text-neutral-300 md:text-2xl">
                  <TypewriterText text="You think you’re ready to build a brand?" />
                </p>
              )}
              {showSecondLine && (
                <motion.button
                  onClick={() => setStepIndex(1)}
                  className="mt-6 rounded-full border border-cardinal px-6 py-3 text-sm uppercase tracking-[0.3em] text-neutral-200 transition"
                  whileHover={{ backgroundColor: '#A50000', color: '#000', scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Continue
                </motion.button>
              )}
            </motion.div>
          )}

          {stepIndex > 0 && stepIndex <= entrySteps.length && (
            <motion.div
              key={entrySteps[stepIndex - 1].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl space-y-8"
            >
              <p className="text-2xl font-semibold md:text-4xl">
                <TypewriterText key={entrySteps[stepIndex - 1].question} text={entrySteps[stepIndex - 1].question} />
              </p>
              <div className="flex flex-col items-center gap-4">
                {entrySteps[stepIndex - 1].options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className="w-full max-w-md rounded-full border border-neutral-700 px-6 py-4 text-lg font-medium text-neutral-200 transition hover:border-cardinal hover:text-white"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(165,0,0,0.18)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {feedback && (
                  <motion.p
                    key={feedback}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg text-cardinal"
                  >
                    <TypewriterText text={feedback} />
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stepIndex > entrySteps.length && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <p className="text-xl uppercase tracking-[0.35em] text-neutral-500">You survived the audit.</p>
              <p className="text-3xl font-semibold md:text-5xl">Now enter the city where brands are imagined.</p>
              <motion.button
                onClick={handleEnter}
                className="relative overflow-hidden rounded-full border border-cardinal px-8 py-4 text-lg font-semibold uppercase tracking-[0.3em]"
                animate={
                  glitching
                    ? { filter: glitchFrames, scale: [1, 1.04, 0.98, 1.02, 1] }
                    : { filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))', scale: 1 }
                }
                transition={{ duration: glitching ? 0.6 : 0.3, repeat: glitching ? Infinity : 0, repeatType: 'mirror' }}
                whileHover={{ backgroundColor: '#A50000', color: '#000', scale: 1.05 }}
              >
                Enter IMAGICITY
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RotatingWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 overflow-hidden text-2xl font-medium sm:text-3xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 text-cardinal"
        >
          {rotatingWords[index]}.
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function ServiceCard({ title, description, index }) {
  return (
    <motion.div
      className="group flex flex-col gap-3 rounded-3xl border border-neutral-800 bg-neutral-950/40 p-8 backdrop-blur transition"
      whileHover={{ rotateX: 4, rotateY: -4, translateY: -6 }}
      style={{ transformOrigin: 'center center' }}
      transition={{ type: 'spring', stiffness: 200, damping: 16 }}
    >
      <span className="text-sm uppercase tracking-[0.35em] text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-neutral-300">{description}</p>
      <span className="mt-auto text-xs uppercase tracking-[0.3em] text-cardinal opacity-0 transition-opacity group-hover:opacity-100">Unpack →</span>
    </motion.div>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(index < 2);

  return (
    <div className="border-b border-neutral-800 py-6">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left text-lg font-semibold text-white"
      >
        <span>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-cardinal"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-neutral-300"
          >
            {item.a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainSite() {
  const [filter, setFilter] = useState('all');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const filteredPortfolio = useMemo(
    () =>
      portfolioItems.filter((item) => filter === 'all' || item.category === filter),
    [filter]
  );

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="relative bg-black text-white">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-0 hidden md:block"
        animate={{ x: cursor.x - 110, y: cursor.y - 110 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }}
        style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(165,0,0,0.45) 0%, rgba(165,0,0,0) 60%)',
          mixBlendMode: 'screen',
          filter: 'blur(0px)'
        }}
      />

      <div className="relative z-10">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(165,0,0,0.25),rgba(0,0,0,0.9))]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(120deg, rgba(165,0,0,0.2), transparent 60%)' }} />
          <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center gap-10 px-6 py-24">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-sm uppercase tracking-[0.4em] text-neutral-500"
            >
              IMAGICITY / Brand Strategy Lab
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl font-semibold md:text-6xl lg:text-7xl"
            >
              We Build Brands That Scale.
            </motion.h1>
            <RotatingWords />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-lg text-neutral-300"
            >
              Strategy as weaponry, design as hypnosis, growth as the inevitable outcome. Welcome to the city where imagination compounds into market share.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(165,0,0,0.2)', color: '#fff' }}
              whileTap={{ scale: 0.96 }}
              className="group relative w-fit overflow-hidden rounded-full border border-cardinal px-10 py-4 text-sm uppercase tracking-[0.35em] text-white transition"
            >
              <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(165,0,0,0.35),rgba(0,0,0,0.8))] opacity-0 transition group-hover:opacity-100" />
              Let’s Build Together
            </motion.button>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,0,0,0.35),transparent_70%)] opacity-40" />
            <div className="relative aspect-video w-full bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">About</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              IMAGICITY started as a design agency. Now, it’s a startup powerhouse that turns ideas into funded, scalable realities.
            </h2>
            <p className="text-neutral-300">
              We architect end-to-end brand systems—defining positioning, crafting immersive identities, producing launch campaigns, and engineering the digital experiences that make believers out of buyers.
            </p>
            <p className="text-neutral-300">
              The result? Brands that perform like growth machines and feel like cults. If that sounds dramatic, good. Drama gets remembered.
            </p>
          </motion.div>
        </section>

        <section className="bg-neutral-950/30 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Core Services</p>
                <h2 className="text-3xl font-semibold md:text-4xl">What we weaponize for your launch.</h2>
              </div>
              <p className="max-w-xl text-neutral-400">
                Insight-led strategy, high-conversion design, and campaigns with teeth. Each engagement is engineered around your next milestone—raise, launch, scale, or domination.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Go-To-Market Strategy',
                  description: 'Narrative positioning, market mapping, channel design, and momentum plans that make noise with purpose.'
                },
                {
                  title: 'Brand Identity Design',
                  description: 'Visual systems that seduce and convert—logo, typography, motion, sonic cues, the whole cinematic package.'
                },
                {
                  title: 'Campaign Planning',
                  description: 'Big-idea storytelling with tactical choreography across earned, owned, and paid channels.'
                },
                {
                  title: 'Digital Marketing',
                  description: 'Lifecycle strategies, performance funnels, and creative that keeps your CAC civilised.'
                },
                {
                  title: 'UI/UX + Web Development',
                  description: 'Interfaces engineered for desire and conversion with motion systems that feel alive.'
                }
              ].map((service, index) => (
                <ServiceCard key={service.title} title={service.title} description={service.description} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/30 p-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Pricing</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Let’s talk about money without killing the vibe.</h2>
            <p className="mt-4 text-neutral-300">
              Transparency matters. But so does context. We price based on outcomes, not outputs.
            </p>
            <PricingModal />
          </div>
        </section>

        <section className="bg-neutral-950/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Work</p>
                <h2 className="text-3xl font-semibold md:text-4xl">Proof that rebellion scales.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {portfolioFilters.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.35em] transition ${
                      filter === item ? 'border-cardinal text-white' : 'border-neutral-700 text-neutral-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
              <AnimatePresence>
                {filteredPortfolio.map((item) => (
                  <motion.div
                    layout
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/30"
                  >
                    <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1100&q=80')] bg-cover bg-center" />
                    <div className="p-6">
                      <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">{item.category}</p>
                      <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-300">{item.description}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-cardinal/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                      <p className="text-lg font-semibold uppercase tracking-[0.4em]">View Case</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Questions</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Here’s the part where we overshare.</h2>
          <div className="mt-10 divide-y divide-neutral-900">
            {faqItems.map((item, index) => (
              <FAQItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="bg-neutral-950/50 py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-neutral-800 bg-black/60 p-10 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Ready to build the thing everyone will pretend they believed in from day one?</h2>
              <form className="mt-8 grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-base text-white focus:border-cardinal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-base text-white focus:border-cardinal focus:outline-none"
                  />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Company
                  <input
                    type="text"
                    name="company"
                    placeholder="What are we building?"
                    className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-base text-white focus:border-cardinal focus:outline-none"
                  />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Message
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Pitch us the dream. We’ll sharpen it."
                    className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-base text-white focus:border-cardinal focus:outline-none"
                  />
                </label>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="md:col-span-2 rounded-full border border-cardinal px-10 py-4 text-sm uppercase tracking-[0.35em] text-white transition"
                >
                  Send Transmission
                </motion.button>
              </form>
              <div className="mt-8 flex flex-wrap gap-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
                {['LinkedIn', 'Behance', 'Dribbble', 'Instagram'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="group relative overflow-hidden rounded-full border border-neutral-800 px-4 py-2 transition"
                  >
                    <span className="absolute inset-0 -z-10 scale-0 bg-cardinal/70 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-white group-hover:text-black">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-900 bg-black py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
            <p>If you made it this far, you’re one of us.</p>
            <a href="#pricing" className="text-cardinal transition hover:text-white">
              Still looking for a price list? Fine. Click here.
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PricingModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 space-y-4">
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="rounded-full border border-neutral-700 px-6 py-3 text-xs uppercase tracking-[0.35em] text-neutral-200 transition hover:border-cardinal hover:text-white"
      >
        Ask About Pricing
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-md rounded-2xl border border-neutral-800 bg-black/80 p-6 text-left shadow-lg"
          >
            <p className="text-lg font-semibold text-cardinal">Bugger, pricing already? Let’s talk first.</p>
            <p className="mt-4 text-sm text-neutral-300">
              Every engagement is tailored. Give us the context, and we’ll build an investment that earns itself back.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-xs uppercase tracking-[0.4em] text-neutral-500 transition hover:text-white"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-sm text-neutral-400">
        Still curious?{' '}
        <a href="#" className="text-cardinal underline-offset-4 transition hover:underline">
          Download PDF price list
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">{!entered ? <EntryGate key="entry" onComplete={() => setEntered(true)} /> : <MainSite key="main" />}</AnimatePresence>
    </div>
  );
}

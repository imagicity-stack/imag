import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import DotGrid from './components/DotGrid';

const rotatingWords = ['Design', 'Strategy', 'Growth', 'Reality'];

const portfolioItems = [
  {
    title: 'NeuroPulse Labs',
    description: 'AI-driven health diagnostics reimagined as a cultural movement.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Velvet Alley',
    description: 'Luxury streetwear that bleeds rebellion into every seam.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'MindSpring Academy',
    description: 'A digital campus launch that made learning feel like a premiere night.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'PulseFuel',
    description: 'Clean energy drinks with a cult-worthy identity and launch playbook.',
    image:
      'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Circuit Society',
    description: 'From stealth startup to spotlight darling in six incendiary weeks.',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Bloom District',
    description: 'Repositioned a boutique chain into a modern ritual for self-expression.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80'
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
  'drop-shadow(0 0 12px rgba(165, 0, 0, 0.65))',
  'drop-shadow(0 0 18px rgba(165, 0, 0, 0.85))',
  'drop-shadow(0 0 24px rgba(255, 211, 71, 0.5))'
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
];

const socialPlatforms = [
  { name: 'LinkedIn', href: '#', icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm.02 6.5h4v11h-4V10Z" />
        <path d="M14 10h3.64v1.71h.05c.51-.96 1.76-1.96 3.63-1.96 3.88 0 4.6 2.45 4.6 5.63V21h-4v-4.91c0-1.17-.02-2.68-1.63-2.68-1.63 0-1.88 1.27-1.88 2.58V21h-4V10Z" />
      </svg>
    ) },
  { name: 'Behance', href: '#', icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M5.3 7.2H9c2 0 3.4 1 3.4 2.7 0 1.1-.6 1.9-1.6 2.2v.1c1.3.2 2.2 1.2 2.2 2.6 0 2-1.7 3.3-4.3 3.3H2V7.2h3.3Zm-.1 4.1h3.1c1 0 1.6-.5 1.6-1.3 0-.9-.6-1.3-1.6-1.3H5.2v2.6Zm0 4.8h3.3c1.1 0 1.8-.5 1.8-1.5s-.7-1.5-1.8-1.5H5.2v3Zm12.6-9.1c2.7 0 4.2 1.5 4.4 3.2h-3.1c-.2-.7-.7-1.2-1.3-1.2-1.2 0-1.8 1.1-1.8 2.6 0 1.6.7 2.7 1.8 2.7.8 0 1.3-.5 1.5-1.3h3.1c-.3 1.9-1.9 3.3-4.6 3.3-3 0-4.9-2-4.9-4.8 0-2.8 1.8-4.8 4.9-4.8Zm-2.4-.9h4.9V8h-4.9V6.1Z" />
      </svg>
    ) },
  { name: 'Dribbble', href: '#', icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 6.4a7.5 7.5 0 0 1-3.4 1.2c-.3-.6-.7-1.3-1.1-1.9 1.6-.6 3-.7 4.5-.7ZM9.2 3.7c1 .1 2 .4 3 .9-.4.2-1.6.7-3 1.1a30 30 0 0 1-1.5-2c.5-.1 1-.1 1.5 0ZM6.4 4.7c.6.8 1.2 1.7 1.8 2.6-1.5.4-3 .6-4.3.6a7.5 7.5 0 0 1 2.5-3.2ZM4 12v-.3c1.7 0 3.6-.3 5.4-.8.2.4.5.9.7 1.3-2.3.7-4.3 1.8-5.6 3.3A7.4 7.4 0 0 1 4 12Zm3 5.4c1.1-1.3 2.6-2.3 4.6-2.9.6 1.6 1 3.5 1.3 5.6a7.5 7.5 0 0 1-5.9-2.7Zm7.8 2.2c-.3-1.8-.7-3.5-1.2-4.9 1.5-.2 3.2-.2 5 .3a7.5 7.5 0 0 1-3.8 4.6Zm-2.4-6.6-.4-1c1.6-.2 3-.6 4.2-1.1.3.6.6 1.2.8 1.8-1.6-.3-3.2-.2-4.6.3Z" />
      </svg>
    ) },
  { name: 'Instagram', href: '#', icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.5A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 17 4.5H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6.2-3.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
      </svg>
    ) }
];

const CONTACT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycby389hHjfwyYjceNjIw4PsFZiHoXL4NB0rPVfLZh2c0Mpxu42CWRA7ws5aCoeJ9zT06PA/exec';

function TypewriterText({ text, delay = 0, className = '' }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let interval;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, index + 1));
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

function DotBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-black">
      <DotGrid
        className="h-full w-full"
        style={{ width: '100%', height: '100%' }}
        dotSize={6}
        gap={18}
        baseColor="#A50000"
        activeColor="#FFD347"
        proximity={140}
        shockRadius={220}
        shockStrength={6}
        returnDuration={1.4}
      />
    </div>
  );
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
    <div className="relative z-10 min-h-screen w-full overflow-hidden text-white">
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
                <p className="text-xl text-white/80 md:text-2xl">
                  <TypewriterText text="You think you’re ready to build a brand?" />
                </p>
              )}
              {showSecondLine && (
                <motion.button
                  onClick={() => setStepIndex(1)}
                  className="mt-6 rounded-full border border-scarlet px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/80 transition-colors"
                  whileHover={{ backgroundColor: '#FFD347', color: '#000000', scale: 1.05 }}
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
                    className="w-full max-w-md rounded-full border border-white/20 px-6 py-4 text-lg font-medium text-white/80 transition-colors hover:border-aurum"
                    whileHover={{ scale: 1.02, backgroundColor: '#FFD347', color: '#000000' }}
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
                    className="text-lg text-aurum"
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
              <p className="text-xl uppercase tracking-[0.35em] text-white/60">You survived the audit.</p>
              <p className="text-3xl font-semibold md:text-5xl">Now enter the city where brands are imagined.</p>
              <motion.button
                onClick={handleEnter}
                className="relative overflow-hidden rounded-full border border-scarlet px-8 py-4 text-lg font-semibold uppercase tracking-[0.3em] transition-colors"
                animate={
                  glitching
                    ? { filter: glitchFrames, scale: [1, 1.04, 0.98, 1.02, 1] }
                    : { filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))', scale: 1 }
                }
                transition={{ duration: glitching ? 0.6 : 0.3, repeat: glitching ? Infinity : 0, repeatType: 'mirror' }}
                whileHover={{ backgroundColor: '#FFD347', color: '#000000', scale: 1.05 }}
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
          className="absolute inset-x-0 text-aurum"
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
      className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-plum/20 p-8 backdrop-blur transition"
      whileHover={{ rotateX: 4, rotateY: -4, translateY: -6 }}
      style={{ transformOrigin: 'center center' }}
      transition={{ type: 'spring', stiffness: 200, damping: 16 }}
    >
      <span className="text-sm uppercase tracking-[0.35em] text-white/50">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
      <span className="mt-auto text-xs uppercase tracking-[0.3em] text-aurum opacity-0 transition-opacity group-hover:opacity-100">Unpack →</span>
    </motion.div>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(index < 2);

  return (
    <div className="group border-b border-white/10 py-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-lg font-semibold text-white transition-colors hover:bg-aurum hover:text-black"
      >
        <span>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-aurum transition-colors group-hover:text-black"
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
            className="mt-4 text-sm text-white/70"
          >
            {item.a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(true);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
      <div className="rounded-3xl border border-white/10 p-10 backdrop-blur">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="group flex w-full items-center justify-between rounded-full px-4 py-2 text-left text-sm uppercase tracking-[0.35em] text-white/70 transition-colors hover:bg-aurum hover:text-black"
        >
          <span>Faq — the answers you asked for (and some you didn’t)</span>
          <motion.span animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.3 }} className="text-aurum transition-colors group-hover:text-black">
            ⇲
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="faq-group"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 divide-y divide-white/10"
            >
              {faqItems.map((item, index) => (
                <FAQItem key={item.q} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function PricingModal() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setRevealed(true);
  };

  return (
    <div className="mt-8 space-y-4">
      <motion.button
        onClick={handleOpen}
        whileTap={{ scale: 0.96 }}
        className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition-colors hover:border-aurum"
        whileHover={{ scale: 1.05, backgroundColor: '#FFD347', color: '#000000' }}
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
            className="mx-auto max-w-md rounded-2xl border border-white/10 bg-plum/50 p-6 text-left shadow-lg"
          >
            <p className="text-lg font-semibold text-aurum">Bugger, pricing already? Let’s talk first.</p>
            <p className="mt-4 text-sm text-white/70">
              Every engagement is tailored. Give us the context, and we’ll build an investment that earns itself back.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70 transition-colors hover:bg-aurum hover:text-black"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {revealed && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
          Still curious?{' '}
          <a href="#" className="rounded-full px-3 py-1 text-aurum transition-colors hover:bg-aurum hover:text-black">
            Download PDF price list
          </a>
        </div>
      )}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-sm font-semibold uppercase tracking-[0.4em] text-aurum transition-colors hover:text-white">
          Imagicity
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 transition-colors hover:bg-aurum hover:text-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-scarlet px-5 py-2 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-aurum hover:text-black"
          >
            Engage
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 text-white transition-colors hover:bg-aurum hover:text-black md:hidden"
        >
          <span className="h-0.5 w-6 bg-white transition-colors group-hover:bg-black" />
          <span className="h-0.5 w-6 bg-white transition-colors group-hover:bg-black" />
          <span className="h-0.5 w-6 bg-white transition-colors group-hover:bg-black" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-plum/95 p-8 text-right shadow-2xl md:hidden"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1 text-sm uppercase tracking-[0.3em] text-white/70 transition-colors hover:bg-aurum hover:text-black"
              >
                Close
              </button>
            </div>
            <div className="mt-10 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="rounded-full px-4 py-2 text-sm uppercase tracking-[0.4em] text-white transition-colors hover:bg-aurum hover:text-black"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="rounded-full border border-aurum px-5 py-2 text-xs uppercase tracking-[0.35em] text-aurum transition-colors hover:bg-aurum hover:text-black"
              >
                Engage
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MainSite() {
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleContactSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');
    setSubmissionMessage('');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const messageInput = document.getElementById('message');

    if (!nameInput || !emailInput || !companyInput || !messageInput) {
      setSubmissionStatus('error');
      setSubmissionMessage('The contact form failed to initialize. Refresh and try again.');
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      company: companyInput.value.trim(),
      message: messageInput.value.trim()
    };

    if (!payload.name || !payload.email || !payload.company || !payload.message) {
      setSubmissionStatus('error');
      setSubmissionMessage('All fields are required before we make contact.');
      return;
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      const resultText = await response.text();
      console.log('Server response:', resultText);

      if (!response.ok) {
        const statusMessage =
          response.status === 403
            ? 'The Apps Script returned HTTP 403. Ensure the deployment access level is set to "Anyone with the link".'
            : `Received HTTP ${response.status} from the submission endpoint.`;
        throw new Error(resultText || statusMessage);
      }

      setSubmissionStatus('success');
      setSubmissionMessage(resultText || 'Transmission received. Expect a response within 48 hours.');
      e.currentTarget.reset();
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmissionStatus('error');

      const message =
        err instanceof Error && err.message.includes('Failed to fetch')
          ? 'We could not reach the Apps Script endpoint. Confirm the deployment is accessible to Anyone with the link and that your network allows the request.'
          : err instanceof Error
          ? err.message
          : 'An unknown error disrupted the signal.';

      setSubmissionMessage(`Submission failed: ${message}`);
    }
  }, []);

  return (
    <div className="relative z-10 text-white">
      <Navigation />
      <div className="relative z-10">
        <header id="hero" className="relative overflow-hidden pt-24">
          <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center gap-10 px-6 py-24">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-sm uppercase tracking-[0.4em] text-white/60"
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
              className="max-w-xl text-lg text-white/70"
            >
              Strategy as weaponry, design as hypnosis, growth as the inevitable outcome. Welcome to the city where imagination compounds into market share.
            </motion.p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: '#FFD347', color: '#000000' }}
              whileTap={{ scale: 0.96 }}
              className="relative w-fit overflow-hidden rounded-full border border-scarlet px-10 py-4 text-sm uppercase tracking-[0.35em] text-white transition-colors"
            >
              Let’s Build Together
            </motion.a>
          </div>
        </header>

        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-plum/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,211,71,0.3),transparent_70%)] opacity-40" />
            <video
              className="relative z-10 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">About</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              IMAGICITY started as a design agency. Now, it’s a startup powerhouse that turns ideas into funded, scalable realities.
            </h2>
            <p className="text-base text-white/70">
              We weaponize insight, aesthetics, and momentum. The playbook is surgical: diagnose, design, deploy, dominate. If you want a pretty logo, hire a freelancer. If you want a movement, enter the city.
            </p>
          </motion.div>
        </section>

        <section id="services" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Core Services</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Choose your weapons.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  title: 'Go-To-Market Strategy',
                  description: 'Market mapping, positioning, and launch sequencing engineered for traction.'
                },
                {
                  title: 'Brand Identity Design',
                  description: 'Systems, story, and style so consistent it hurts your competitors.'
                },
                {
                  title: 'Campaign Planning',
                  description: 'Narratives, activations, and media orchestration tuned for obsession.'
                },
                {
                  title: 'Digital Marketing',
                  description: 'Full-funnel acquisition sprints that trade impressions for conversions.'
                },
                {
                  title: 'UI/UX + Web Development',
                  description: 'Immersive product and web experiences that guide behaviour.'
                },
                {
                  title: 'Growth Advisory',
                  description: 'On-call partnership aligning teams, tooling, and velocity.'
                }
              ].map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-4xl px-6 py-24">
          <div className="rounded-3xl border border-white/10 p-10 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Pricing</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">You want numbers. We want context.</h2>
            <PricingModal />
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-3xl border border-white/10 p-10 backdrop-blur">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Where imagination hit the market.</h2>
              <p className="mt-4 text-sm text-white/60">
                No filters, no fluff—just a taste of the builds that lit up their sectors.
              </p>
            </div>
            <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-plum/40"
                >
                  <div
                    className="aspect-square w-full bg-cover bg-center opacity-80 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-aurum/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em]">View Case</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <FAQSection />

        <section id="contact" className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-white/10 p-10 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Ready to build the thing everyone will pretend they believed in from day one?</h2>
              <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={handleContactSubmit}>
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                  Name
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className="rounded-lg border border-white/15 bg-black/70 px-4 py-3 text-base text-white focus:border-aurum focus:outline-none"
                    />
                </label>
                <label className="flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="rounded-lg border border-white/15 bg-black/70 px-4 py-3 text-base text-white focus:border-aurum focus:outline-none"
                  />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                  Company
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="What are we building?"
                    className="rounded-lg border border-white/15 bg-black/70 px-4 py-3 text-base text-white focus:border-aurum focus:outline-none"
                  />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                  Message
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    placeholder="Pitch us the dream. We’ll sharpen it."
                    className="rounded-lg border border-white/15 bg-black/70 px-4 py-3 text-base text-white focus:border-aurum focus:outline-none"
                  />
                </label>
                <motion.button
                  type="submit"
                  whileHover={submissionStatus === 'sending' ? {} : { scale: 1.03, backgroundColor: '#FFD347', color: '#000000' }}
                  whileTap={{ scale: 0.96 }}
                  disabled={submissionStatus === 'sending'}
                  className={`md:col-span-2 rounded-full border border-scarlet px-10 py-4 text-sm uppercase tracking-[0.35em] transition-colors ${
                    submissionStatus === 'sending' ? 'cursor-not-allowed bg-black/40 text-white/50' : 'text-white'
                  }`}
                >
                  {submissionStatus === 'sending' ? 'Sending…' : 'Send Transmission'}
                </motion.button>
                {submissionMessage && (
                  <p
                    className={`md:col-span-2 text-sm ${
                      submissionStatus === 'error' ? 'text-scarlet' : 'text-aurum'
                    }`}
                  >
                    {submissionMessage}
                  </p>
                )}
              </form>
              <div className="mt-8 flex flex-wrap gap-4 text-sm uppercase tracking-[0.3em] text-white/60">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-transparent hover:bg-aurum hover:text-black"
                  >
                    {platform.icon({ className: 'h-4 w-4' })}
                    <span className="sr-only">{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>If you made it this far, you’re one of us.</p>
            <a href="#pricing" className="inline-flex items-center rounded-full px-3 py-2 text-aurum transition-colors hover:bg-aurum hover:text-black">
              Still looking for a price list? Fine. Click here.
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <DotBackdrop />
      <AnimatePresence mode="wait">
        {!entered ? <EntryGate key="entry" onComplete={() => setEntered(true)} /> : <MainSite key="main" />}
      </AnimatePresence>
    </div>
  );
}

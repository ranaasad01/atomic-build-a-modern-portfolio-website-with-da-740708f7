"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ExternalLink, Star, Code, Sparkles, CheckCircle, Download, ChevronRight } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_EMAIL,
  primaryCTA,
  socialLinks,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST APIs"] },
  { category: "Tooling", items: ["Git", "Docker", "Vercel", "Figma", "VS Code"] },
  { category: "Design", items: ["UI/UX Design", "Prototyping", "Design Systems", "Accessibility", "Motion Design"] },
];

const projects = [
  {
    title: "Luminary Dashboard",
    description: "A real-time analytics platform for SaaS companies. Built with Next.js, Recharts, and a PostgreSQL backend. Handles 50k+ daily active users with sub-100ms query times.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Recharts"],
    image: "https://i.vimeocdn.com/video/2070296830-ceeecfbc9625686542679222c41f1ccfabdc4dfc4fe6ebaa3a484e1427ba6773-d?f=webp",
    href: "https://github.com",
    live: "https://luminary.dev",
    featured: true,
  },
  {
    title: "Orbit Design System",
    description: "A comprehensive component library with 80+ accessible components, dark mode support, and full Storybook documentation. Used by 3 production apps.",
    tags: ["React", "Storybook", "Radix UI", "Tailwind"],
    image: "https://s3-alpha.figma.com/hub/file/2243587999456758553/75e4372a-8462-487a-9eef-232cbcde11ad-cover.png",
    href: "https://github.com",
    live: "https://orbit.design",
    featured: true,
  },
  {
    title: "Pulse — Health Tracker",
    description: "A mobile-first wellness app with habit tracking, sleep analysis, and personalized insights. Integrated with Apple Health and Google Fit APIs.",
    tags: ["React Native", "Expo", "Node.js", "MongoDB"],
    image: "http://www.koozo.com/cdn/shop/files/Smart_band.png?v=1763040146",
    href: "https://github.com",
    live: "https://pulse.health",
    featured: false,
  },
  {
    title: "Cartographer",
    description: "An interactive map-building tool for game designers. Features real-time collaboration, custom tile sets, and export to multiple game engines.",
    tags: ["Canvas API", "WebSockets", "React", "Rust"],
    image: "https://cdn.thecollector.com/wp-content/uploads/2024/06/famous-cartographers-know-about.jpg",
    href: "https://github.com",
    live: "https://cartographer.app",
    featured: false,
  },
];

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Vercel",
    period: "2022 — Present",
    description: "Lead the design system team, shipping Vercel's component library used across all internal and external products. Improved Core Web Vitals scores by 40% across the dashboard.",
    highlights: ["Design system architecture", "Performance optimization", "Team mentorship"],
  },
  {
    role: "Full-Stack Developer",
    company: "Linear",
    period: "2020 — 2022",
    description: "Built core product features for Linear's issue tracking platform. Owned the notification system, keyboard shortcuts engine, and real-time sync infrastructure.",
    highlights: ["Real-time collaboration", "Keyboard-first UX", "GraphQL API design"],
  },
  {
    role: "Frontend Developer",
    company: "Framer",
    period: "2018 — 2020",
    description: "Developed interactive prototyping tools and contributed to the Framer Motion open-source library. Shipped the timeline editor and component variants system.",
    highlights: ["Animation engine", "Open-source contributions", "Prototyping tools"],
  },
];

const testimonials = [
  {
    quote: "Alex has an exceptional eye for detail and a deep understanding of both design and engineering. The work on our design system was transformative.",
    author: "Asad Rana",
    role: "Head of Design, Vercel",
    avatar: "https://cdn.tatlerasia.com/tatlerasia/i/2023/10/18163147-untitled-design-4_cover_1600x938.jpg",
  },
  {
    quote: "One of the most thoughtful engineers I've worked with. Alex consistently delivers work that's both technically excellent and beautifully crafted.",
    author: "Marcus Webb",
    role: "CTO, Linear",
    avatar: "https://cdn.canvasrebel.com/wp-content/uploads/2026/02/c-1770471315967-personal_1770471315300_1770471315300_marcus_webb_pxl_20231007_132001588portrait.jpg",
  },
  {
    quote: "Alex turned our vague product vision into a polished, performant application. The attention to micro-interactions and accessibility was outstanding.",
    author: "Priya Nair",
    role: "Founder, Pulse Health",
    avatar: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202507/who-is-priya-nair-112640438-16x9_0.jpg?VersionId=i0cUqK2ez7oaBzqi6aOW7Xw7ObdhW0wt&size=690:388",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-widest uppercase">
      <Sparkles size={10} />
      {children}
    </span>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-white/50 text-xs font-medium">
      {label}
    </span>
  );
}

// ─── Contact Form State ──────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
          <CheckCircle size={28} className="text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-syne)]">Message sent.</h3>
        <p className="text-white/50 text-sm max-w-xs">Thanks for reaching out. I'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-medium text-white/40 uppercase tracking-wider">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-medium text-white/40 uppercase tracking-wider">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-medium text-white/40 uppercase tracking-wider">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 resize-none"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        Send Message
      </motion.button>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <SectionLabel>Available for work</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-syne)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[0.95] mb-6"
            >
              <span className="text-white">Creative</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Developer
              </span>
              <br />
              <span className="text-white/80">&amp; Designer</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/50 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 text-pretty"
            >
              I'm {APP_NAME}, a full-stack developer who bridges the gap between engineering precision and design craft. I build fast, accessible, and beautiful digital products.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a
                href={primaryCTA.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)]"
              >
                {primaryCTA.label}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href={`mailto:${APP_EMAIL}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Mail size={16} />
                Get in touch
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-4 mt-10">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300"
                >
                  {iconMap[s.icon]}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar / Visual */}
          <motion.div
            variants={shouldReduceMotion ? fadeIn : scaleIn}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 relative"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/20 blur-2xl scale-110" />
              {/* Image frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
                <img
                  src="https://img.magnific.com/free-photo/smiling-redhead-man-with-laptop-looking-camera-cafe_1163-5162.jpg?semt=ais_hybrid&w=740&q=80"
                  alt={`${APP_NAME} — ${APP_TAGLINE}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = "linear-gradient(135deg, #7c3aed22, #4f46e522)";
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-weight:700;color:rgba(168,85,247,0.6);font-family:var(--font-syne)">AM</div>`;
                    }
                  }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-white/80 text-xs font-medium">Open to opportunities</span>
              </motion.div>
              {/* Floating stat */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -left-4 px-4 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="text-white font-bold text-lg font-[family-name:var(--font-syne)] leading-none">6+</div>
                <div className="text-white/40 text-xs mt-0.5">Years exp.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image side */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_32px_80px_-16px_rgba(0,0,0,0.5)]">
                <img
                  src="https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/prd-league/b1gpqzy8vusgdihnvmzs.png"
                  alt="Alex Morgan at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
              </div>
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "12", label: "Clients" },
                  { value: "6+", label: "Years" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-[#0f0f0f]/80 backdrop-blur-md border border-white/10 p-3 text-center"
                  >
                    <div className="text-white font-bold text-xl font-[family-name:var(--font-syne)] leading-none">{stat.value}</div>
                    <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <SectionLabel>About me</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-6"
              >
                I craft experiences that live at the intersection of code and design.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-5 text-pretty">
                With over six years in the industry, I've shipped products used by millions of people. My background spans frontend engineering, full-stack development, and product design — which means I think holistically about every problem I tackle.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-8 text-pretty">
                I'm drawn to the details: the 200ms transition that makes an interaction feel alive, the component API that makes a team more productive, the accessibility fix that opens a product to more people. I believe great software is invisible — it just works, beautifully.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  Work with me
                  <ChevronRight size={15} />
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Download size={15} />
                  Download CV
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <SectionLabel>Skills</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance"
            >
              Tools of the trade
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/40 mt-4 max-w-xl mx-auto text-pretty">
              A curated set of technologies I use to build fast, scalable, and beautiful products from concept to deployment.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                    <Code size={14} className="text-purple-400" />
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] font-semibold text-white text-sm">
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                      <span className="w-1 h-1 rounded-full bg-purple-500/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 relative">
        <div className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/6 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <SectionLabel>Projects</SectionLabel>
            </motion.div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance"
              >
                Selected work
              </motion.h2>
              <motion.a
                variants={fadeInUp}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 group flex-shrink-0"
              >
                View all on GitHub
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
            </div>
          </motion.div>

          {/* Featured projects — large */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {projects.filter((p) => p.featured).map((project, i) => (
              <motion.div
                key={project.title}
                variants={i === 0 ? slideInLeft : slideInRight}
                {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-3xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-purple-500/30 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-[#0f0f0f]/20 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-9 h-9 rounded-xl bg-[#0f0f0f]/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                    >
                      <Github size={15} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live site"
                      className="w-9 h-9 rounded-xl bg-[#0f0f0f]/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-white mb-2">{project.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <TagPill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Smaller projects */}
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {projects.filter((p) => !p.featured).map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-purple-500/30 transition-all duration-300 flex flex-col sm:flex-row shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
              >
                <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f0f]/40" />
                </div>
                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-base text-white">{project.title}</h3>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/30 hover:text-white transition-colors duration-200">
                          <Github size={14} />
                        </a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-white/30 hover:text-white transition-colors duration-200">
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed mb-3 text-pretty">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <TagPill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <SectionLabel>Experience</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance"
            >
              Where I've worked
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerContainer}
              {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent hidden sm:block" />

              <div className="space-y-8">
                {experience.map((job, i) => (
                  <motion.div
                    key={job.company}
                    variants={fadeInUp}
                    className="relative sm:pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.4)] hidden sm:block" />

                    <motion.div
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 hover:border-purple-500/25 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg text-white">{job.role}</h3>
                          <p className="text-purple-400 font-medium text-sm">{job.company}</p>
                        </div>
                        <span className="text-white/30 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/8 flex-shrink-0 self-start">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-4 text-pretty">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/8 border border-purple-500/15 text-purple-300/70 text-xs"
                          >
                            <CheckCircle size={10} />
                            {h}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-purple-600/6 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <SectionLabel>Testimonials</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance"
            >
              What people say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl bg-white/[0.03] border border-white/8 p-7 hover:border-purple-500/25 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] flex flex-col ${i === 1 ? "md:mt-8" : ""}`}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={13} className="text-purple-400 fill-purple-400" />
                  ))}
                </div>
                <blockquote className="text-white/60 text-sm leading-relaxed flex-1 mb-6 text-pretty">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm font-[family-name:var(--font-syne)]">{t.author}</div>
                    <div className="text-white/30 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              {...(shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <SectionLabel>Contact</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-6"
              >
                Let's build something great together.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed mb-10 text-pretty">
                Whether you have a project in mind, want to explore a collaboration, or just want to say hello — my inbox is always open. I typically respond within 24 hours.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-4">
                {[
                  { icon: <Mail size={18} />, label: "Email", value: APP_EMAIL, href: `mailto:${APP_EMAIL}` },
                  { icon: <Github size={18} />, label: "GitHub", value: "github.com/alexmorgan", href: "https://github.com" },
                  { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/alexmorgan", href: "https://linkedin.com" },
                ].map((contact) => (
                  <motion.a
                    key={contact.label}
                    variants={fadeInUp}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-white/30 text-xs mb-0.5">{contact.label}</div>
                      <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-200">{contact.value}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              {...motionProps(slideInRight)}
              className="rounded-3xl bg-white/[0.03] border border-white/8 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_32px_80px_-16px_rgba(0,0,0,0.3)]"
            >
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-white mb-6">Send a message</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
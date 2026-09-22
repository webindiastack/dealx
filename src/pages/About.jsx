import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Lock,
  Building2,
  Globe,
  Clock,
  Star,
  Check,
  TrendingUp,
  MessageSquare,
  Cpu,
  Layers,
  HeartHandshake,
  Shield,
  BadgeCheck,
  Eye,
  Target,
  Compass,
  FileCheck,
  ChevronRight,
  Mail,
} from 'lucide-react';

export const About = () => {
  const [activeTimelineYear, setActiveTimelineYear] = useState('2026');
  const [selectedTeamTab, setSelectedTeamTab] = useState('all');

  const storyTimeline = [
    {
      year: '2024',
      title: 'Platform Conception & Prototype',
      short: 'Founded to eliminate middleman inflation in high-value deals.',
      detail:
        'DealX started as a private network connecting high-net-worth vehicle enthusiasts directly to verified inventory originators without public broker markups.',
      metrics: '50 Initial Verified Listings',
    },
    {
      year: '2025',
      title: '$10M+ Traded Volume Milestone',
      short: 'Expanded into horology, superbike, and workstation verticals.',
      detail:
        'Facilitated over 500 direct transactions across San Francisco, Austin, Seattle, and Chicago with 99.8% customer satisfaction.',
      metrics: '$10.4M Total Transaction Value',
    },
    {
      year: '2026',
      title: 'DealX v2.6 Smart CRM & Local Identity Engine',
      short: 'Automated identity-bound inquiries with sub-12 min response times.',
      detail:
        'Launched local customer profile auto-attachments, zero-exposure buyer privacy protocols, and executive CRM management suite.',
      metrics: '1,200+ Verified Buyers & $18.4M Traded',
    },
  ];

  const whoWeAreCards = [
    {
      icon: <Target className="w-5 h-5 text-brand-500" />,
      title: 'What We Do',
      desc: 'Connect direct luxury buyers with originators of high-value cars, bikes, watches, and enterprise hardware.',
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      title: 'Who We Serve',
      desc: 'High-intent individuals, private collectors, and executives seeking verified authenticity and transparent dealing.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'What Makes Us Different',
      desc: 'No public broker markups. Every inquiry attaches your verified customer profile directly to dedicated deal managers.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Our Approach',
      desc: 'Privacy-first architecture. Your personal contact data is saved securely locally and never sold to third-party ad networks.',
    },
  ];

  const corePrinciples = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-500" />,
      title: 'Integrity First',
      desc: 'We enforce absolute pricing transparency and direct originator accountability on every deal.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
      title: 'Customer Centricity',
      desc: 'Your active profile & budget expectations drive instant inquiry auto-matching without repetitive paperwork.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: 'Continuous Innovation',
      desc: 'Combining cutting-edge local storage state management with real-time executive CRM tracking.',
    },
    {
      icon: <Award className="w-5 h-5 text-purple-500" />,
      title: 'Uncompromised Quality',
      desc: 'Multi-point verification on every supercar, superbike, camera body, and luxury horology item.',
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-500" />,
      title: 'Privacy & Security',
      desc: 'Encrypted client profile binding ensures your contact information remains private and secure.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-cyan-500" />,
      title: 'Sustainable Growth',
      desc: 'Building long-term relationships between luxury buyers and verified inventory managers worldwide.',
    },
  ];

  const beliefs = [
    'Good work starts with good people and honest communication.',
    'Trust is earned through consistent execution, not empty promises.',
    'Every detail matters when handling high-value luxury transactions.',
    'True platform growth must create genuine value for both buyers and sellers.',
    'Long-term client relationships matter far more than single deal results.',
  ];

  const teamMembers = [
    {
      name: 'Harpreet Singh',
      role: 'Founder & Managing Director',
      category: 'leadership',
      bio: 'Pioneered direct luxury dealing & identity-verified CRM workflows for high-net-worth buyers.',
      location: 'San Francisco, CA',
      avatar: 'H',
      color: 'from-brand-600 to-indigo-600',
    },
    {
      name: 'Sarah Connor',
      role: 'VP of Luxury Acquisitions',
      category: 'acquisitions',
      bio: '12+ years curating verified exotic automobiles, motorcycles, and horology across global markets.',
      location: 'Austin, TX',
      avatar: 'S',
      color: 'from-amber-500 to-rose-600',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      category: 'technology',
      bio: 'Architected DealX Smart Inquiry Auto-Matching engine and local storage privacy protocols.',
      location: 'Seattle, WA',
      avatar: 'M',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Alex Rivera',
      role: 'Lead Concierge & Deal Manager',
      category: 'operations',
      bio: 'Oversees sub-12 minute CRM response velocity and direct buyer-seller deal escrow workflows.',
      location: 'Chicago, IL',
      avatar: 'A',
      color: 'from-purple-600 to-indigo-600',
    },
  ];

  const stats = [
    { value: '$18.4M+', label: 'Traded Volume' },
    { value: '99.8%', label: 'Match Satisfaction' },
    { value: '1,200+', label: 'Verified Buyers' },
    { value: '< 12 Mins', label: 'CRM Velocity' },
    { value: '100%', label: 'Identity Bound' },
  ];

  const differentiators = [
    {
      title: 'Direct Originator Access',
      desc: 'Deal directly with verified asset holders without hidden broker markups or middleman commissions.',
    },
    {
      title: 'Identity-Bound Privacy',
      desc: 'Save your profile locally once; every inquiry automatically attaches your verified credentials.',
    },
    {
      title: 'Multi-Point Quality Verification',
      desc: 'Strict multi-tier physical & documentation inspection for all luxury vehicles and electronics.',
    },
    {
      title: 'Dedicated Deal Concierge',
      desc: 'Every active query is assigned to a real executive deal manager for rapid closing support.',
    },
  ];

  const testimonials = [
    {
      quote:
        'The Porsche Taycan Turbo S inquiry matched my active profile instantly. Deal manager Sarah reached out in under 10 minutes with full provenance docs.',
      author: 'Marcus Vance',
      role: 'Verified Buyer',
      item: '2026 Porsche Taycan Turbo S',
    },
    {
      quote:
        'Buying the Ducati Panigale V4 S through DealX was completely transparent. No hidden dealer markups, just direct dealing.',
      author: 'Harpreet Singh',
      role: 'Verified Buyer',
      item: 'Ducati Panigale V4 S',
    },
  ];

  const filteredTeam =
    selectedTeamTab === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.category === selectedTeamTab);

  return (
    <div className="space-y-12 py-6 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 border border-slate-800 text-white shadow-xl p-6 sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-slate-950 to-indigo-950/80 opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/20 text-brand-300 border border-brand-500/30 badge-font">
                ABOUT US
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 badge-font">
                Established 2024
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Direct Luxury Dealing & Next-Gen Executive CRM
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
              We connect high-intent luxury buyers directly to verified inventory across Supercars, Horology, & Enterprise Workstations with instant identity-bound inquiry matching and zero middleman inflation.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/products"
                className="px-5 py-2.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Verified Inventory</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
              <a
                href="#team"
                className="px-5 py-2.5 rounded-full text-xs font-black text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-brand-400" />
                <span>Meet Our Team</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 aspect-[16/10] relative group">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
                alt="DealX Executive Luxury Asset Dealing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-extrabold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Direct Origination
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story — Interactive Visual Timeline */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 badge-font">
              Our Journey
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Our Story & Evolution
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              From a private luxury matching prototype to a next-generation executive dealing platform.
            </p>
          </div>
        </div>

        {/* Timeline Buttons Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {storyTimeline.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveTimelineYear(item.year)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 ${
                activeTimelineYear === item.year
                  ? 'bg-slate-900 text-white border-brand-500 shadow-lg scale-[1.01]'
                  : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-brand-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl font-serif font-black ${
                    activeTimelineYear === item.year ? 'text-amber-300' : 'text-brand-600 dark:text-brand-400'
                  }`}
                >
                  {item.year}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold uppercase">
                  {item.metrics}
                </span>
              </div>
              <h3 className="font-extrabold text-xs">{item.title}</h3>
              <p className="text-[11px] opacity-80 line-clamp-2">{item.short}</p>
            </button>
          ))}
        </div>

        {/* Active Year Detail Box */}
        {(() => {
          const currentItem = storyTimeline.find((t) => t.year === activeTimelineYear) || storyTimeline[2];
          return (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 text-white space-y-2 backdrop-blur-xl shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="font-serif font-extrabold text-sm text-white">
                  {currentItem.year} Milestone Detail: {currentItem.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">{currentItem.detail}</p>
            </div>
          );
        })()}
      </section>

      {/* 3. Who We Are */}
      <section className="space-y-6">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 badge-font">
            Identity & Vision
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Who We Are & How We Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {whoWeAreCards.map((card, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-brand-500/40 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-serif text-sm font-black text-slate-900 dark:text-white">{card.title}</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 & 5. Our Mission & Vision Side-by-Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-900/40 via-slate-900 to-indigo-950 border border-brand-500/30 text-white space-y-3 backdrop-blur-xl shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/20 text-brand-300 border border-brand-500/40 badge-font">
            <Target className="w-3.5 h-3.5 text-brand-400" /> OUR MISSION
          </div>
          <h3 className="font-serif text-xl font-black text-white leading-snug">
            Eliminate high-value deal friction through direct identity-verified matching and zero-markup transparency.
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Our purpose is to empower buyers and asset holders with an immediate, privacy-bound CRM marketplace where inquiries are resolved with executive speed.
          </p>
        </div>

        {/* Vision Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 border border-purple-500/30 text-white space-y-3 backdrop-blur-xl shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/40 badge-font">
            <Compass className="w-3.5 h-3.5 text-purple-400" /> OUR VISION
          </div>
          <h3 className="font-serif text-xl font-black text-white leading-snug">
            Become the global benchmark for identity-verified direct luxury commerce & executive CRM workflows.
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            We envision a future where high-net-worth transactions operate seamlessly without predatory middlemen or vulnerable personal data exposure.
          </p>
        </div>
      </section>

      {/* 6. Core Principles */}
      <section className="space-y-6">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 badge-font">
            Our Values
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {corePrinciples.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-serif text-sm font-black text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. What We Believe */}
      <section className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 badge-font">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> WHAT WE BELIEVE
        </div>

        <div className="space-y-3">
          {beliefs.map((statement, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 font-serif text-xs sm:text-sm font-bold text-slate-200"
            >
              <span className="w-5 h-5 rounded-full bg-brand-500/30 text-brand-300 border border-brand-500/50 flex items-center justify-center text-[10px] shrink-0 font-sans">
                0{idx + 1}
              </span>
              <span>"{statement}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Meet Our Team */}
      <section id="team" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 badge-font">
              Leadership & Command
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Meet The People Behind DealX
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Experienced deal managers, engineers, and luxury curators.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold overflow-x-auto">
            {['all', 'leadership', 'acquisitions', 'technology', 'operations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTeamTab(cat)}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  selectedTeamTab === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTeam.map((member, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-brand-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${member.color} text-white font-serif font-black text-base flex items-center justify-center shadow-md border border-white/20`}
                  >
                    {member.avatar}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">📍 {member.location}</span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-black text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400">{member.role}</p>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-slate-400 text-xs">
                <Globe className="w-3.5 h-3.5 hover:text-brand-500 cursor-pointer transition-colors" />
                <MessageSquare className="w-3.5 h-3.5 hover:text-brand-500 cursor-pointer transition-colors" />
                <Mail className="w-3.5 h-3.5 hover:text-brand-500 cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Our Numbers */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 text-white shadow-xl space-y-4">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-brand-300 border border-white/20 badge-font">
            Track Record
          </div>
          <h2 className="font-serif text-2xl font-black text-white">Our Numbers & Metrics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 text-center">
          {stats.map((st, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
              <div className="text-2xl font-black font-serif text-amber-300">{st.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider badge-font">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Why Choose Us */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 badge-font">
            Differentiators
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Why High-Value Clients Choose DealX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {differentiators.map((diff, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-serif text-sm font-black text-slate-900 dark:text-white">{diff.title}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Behind The Scenes Image Grid */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 badge-font">
            Authenticity
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Behind the Scenes at DealX
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-[4/3] relative group">
            <img
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80"
              alt="Superbike Verification"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/40 p-3 flex items-end">
              <span className="text-[10px] font-bold text-white font-mono bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700">
                Ducati Inspection Protocol
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-[4/3] relative group">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
              alt="Workstation Verification"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/40 p-3 flex items-end">
              <span className="text-[10px] font-bold text-white font-mono bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700">
                MacBook M3 Max Benchmarking
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-[4/3] relative group">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
              alt="Horology Verification"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/40 p-3 flex items-end">
              <span className="text-[10px] font-bold text-white font-mono bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700">
                Rolex Movement Authentication
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Testimonials */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 badge-font">
            Verified Experiences
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            What Verified Buyers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between text-amber-400 text-xs">
                <div>★★★★★</div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  Verified Deal
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic font-medium">"{t.quote}"</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] flex justify-between items-center">
                <span className="font-extrabold text-slate-900 dark:text-white">{t.author}</span>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">{t.item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. Our Commitment */}
      <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
        <h3 className="font-serif text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-500" /> Our Promise & Commitment
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          We guarantee that every product inquiry raised through DealX is handled with absolute privacy, zero markup inflation, and prompt response from verified deal managers.
        </p>
      </section>

      {/* 15. Final CTA */}
      <section className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-black leading-tight">
            Let’s Build Something Meaningful Together.
          </h2>
          <p className="text-xs text-indigo-100 font-medium">
            Browse our verified inventory or set up your local customer profile for instant inquiry auto-matching.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-full font-black text-xs text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
          </Link>
          <Link
            to="/inquiry"
            className="px-5 py-2.5 rounded-full font-black text-xs text-white bg-white/20 hover:bg-white/30 border border-white/25 transition-all"
          >
            Customer Profile
          </Link>
        </div>
      </section>
    </div>
  );
};

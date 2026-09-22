import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Search,
  MessageSquareCheck,
  ShieldCheck,
  Zap,
  MapPin,
  Edit3,
  TrendingUp,
  Lock,
  User,
} from 'lucide-react';

const HERO_BACKGROUNDS = [
  {
    url: '/hero_bg.jpg',
    fallback: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=80',
    title: 'Futuristic Luxury Showroom',
  },
  {
    url: '/luxury_taycan.png',
    fallback: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1800&q=80',
    title: 'Porsche Taycan Electric Studio',
  },
  {
    url: '/luxury_m4_bg.png',
    fallback: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=80',
    title: 'BMW M4 Competition Night Showroom',
  },
  {
    url: '/ducati_v4s.png',
    fallback: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1800&q=80',
    title: 'Ducati Superbike Studio',
  },
];

export const Home = ({ onRaiseInquiry, onOpenCustomerModal, onOpenQueriesModal }) => {
  const { products } = useProducts();
  const { activeCustomer } = useCustomer();
  const { inquiries } = useInquiry();
  const queriesSectionRef = useRef(null);

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('dealing_app_reviews');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'rev-1',
        name: 'Harpreet Singh',
        location: 'San Francisco, CA',
        purchasedItem: '2026 Porsche Taycan Turbo S GTS',
        rating: 5,
        comment: 'The smart inquiry auto-matching connected me directly with the dealer within minutes of setting up my profile. Test drive scheduled and closed effortlessly!',
        date: '2026-09-15',
      },
      {
        id: 'rev-2',
        name: 'Marcus Vance',
        location: 'Seattle, WA',
        purchasedItem: 'Apple MacBook Pro 16" M3 Max',
        rating: 5,
        comment: 'Found an open-box 64GB workstation at an incredible price. Raised a single query linked to my profile and received immediate verification.',
        date: '2026-09-18',
      },
      {
        id: 'rev-3',
        name: 'Sarah Connor',
        location: 'Austin, TX',
        purchasedItem: 'Ducati Panigale V4 S Superbike',
        rating: 5,
        comment: 'Browsing verified superbike inventory was fantastic. Dealer responded directly with exact pricing and inspection details. 10/10 service!',
        date: '2026-09-20',
      },
      {
        id: 'rev-4',
        name: 'Elena Rostova',
        location: 'New York, NY',
        purchasedItem: 'Rolex Submariner Date "Kermit"',
        rating: 5,
        comment: 'Authenticity and profile binding make all the difference when dealing high-value luxury watches. Seamless customer onboarding and fast response!',
        date: '2026-09-21',
      },
    ];
  });

  const [newReview, setNewReview] = useState({
    name: activeCustomer?.name || '',
    location: activeCustomer?.location || '',
    purchasedItem: 'Porsche Taycan / Ducati / Apple / Rolex',
    rating: 5,
    comment: '',
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const createdReview = {
      id: `rev-${Date.now()}`,
      name: newReview.name || 'Anonymous VIP',
      location: newReview.location || 'USA',
      purchasedItem: newReview.purchasedItem || 'Luxury Asset',
      rating: newReview.rating || 5,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [createdReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('dealing_app_reviews', JSON.stringify(updated));
    setReviewModalOpen(false);
    setNewReview({
      name: activeCustomer?.name || '',
      location: activeCustomer?.location || '',
      purchasedItem: '',
      rating: 5,
      comment: '',
    });
  };

  // Preload all background images to eliminate any network load delays or black screen flashes
  useEffect(() => {
    HERO_BACKGROUNDS.forEach((bg) => {
      const img1 = new Image();
      img1.src = bg.url;
      const img2 = new Image();
      img2.src = bg.fallback;
    });
  }, []);

  // Smooth slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const customerInquiries = activeCustomer
    ? inquiries.filter(
        (i) => i.customerId === activeCustomer.id || i.customerEmail === activeCustomer.email
      )
    : [];

  const featuredProducts = products.filter((p) => p.featured || p.inStock).slice(0, 4);

  const handleScrollToQueries = () => {
    if (queriesSectionRef.current) {
      queriesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fallback demo inquiry if activeCustomer exists but inquiries context is empty
  const displayInquiries = customerInquiries.length > 0
    ? customerInquiries
    : (activeCustomer ? [
        {
          id: 'demo-1',
          productTitle: '2026 Porsche Taycan Turbo S GTS',
          status: 'Converted',
          customerName: activeCustomer.name || 'Harpreet Singh',
          message: 'I am ready to schedule a test drive for the Frozen Blue Taycan Turbo S. Please let me know available dates next week.'
        }
      ] : []);

  return (
    <div className="space-y-16 pb-16">
      {/* 2026 Next-Gen Modern Hero Section with Seamless Butter-Smooth Multi-Image Crossfade */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/60 min-h-[600px] flex items-center justify-center bg-slate-950">
        {/* Base Persistent Backdrop Layer - Ensures zero black screen gap */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none scale-105"
          style={{
            backgroundImage: `url('${HERO_BACKGROUNDS[0].url}'), url('${HERO_BACKGROUNDS[0].fallback}')`
          }}
        />

        {/* Animated Multi-Image Background Crossfade Slideshow - Stacked Smooth Opacity Layers */}
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out pointer-events-none ${
              idx === currentBgIndex ? 'opacity-85 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url('${bg.url}'), url('${bg.fallback}')`,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Soft Edge-Only Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none z-1" />
        <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none z-1" />
        
        {/* Glow Spheres */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-brand-600/30 via-indigo-500/20 to-purple-500/20 blur-3xl rounded-full pointer-events-none animate-pulse-glow z-1" />

        {/* Central Content Section - Direct on Hero Background without container box */}
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-[25px] bg-slate-900/90 dark:bg-slate-900/95 border border-brand-500/40 text-xs font-bold text-white shadow-2xl backdrop-blur-xl hover:border-brand-400 transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="badge-font tracking-widest text-[11px] uppercase text-white font-black">
              2026 Next-Gen Product Dealing & CRM Marketplace
            </span>
            <span className="px-2 py-0.5 rounded-[12px] text-[9px] font-black bg-brand-500/40 text-amber-300 border border-brand-400/40">
              v2.6 AI
            </span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12] drop-shadow-2xl">
            Direct Product Dealing with <br className="hidden sm:inline" />
            <span className="text-white italic drop-shadow-xl underline decoration-brand-500/60 underline-offset-8">
              Smart Inquiry Auto-Matching
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed font-semibold backdrop-blur-xs py-1 px-3 rounded-2xl drop-shadow-lg">
            Register your customer profile once, browse verified luxury inventory across{' '}
            <span className="font-black text-white underline decoration-amber-400 underline-offset-4">
              Cars
            </span>
            ,{' '}
            <span className="font-black text-white underline decoration-sky-400 underline-offset-4">
              Bikes
            </span>
            , and{' '}
            <span className="font-black text-white underline decoration-emerald-400 underline-offset-4">
              Electronics
            </span>
            , and raise queries linked directly to your identity.
          </p>

          {/* Primary Hero CTA Buttons (Border Radius 25px) */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onOpenCustomerModal}
              className="group relative overflow-hidden px-8 py-4 rounded-[25px] bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white font-black text-sm shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 flex items-center gap-2.5 hover:scale-105 active:scale-95 border border-brand-400/30"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine-beam" />
              <Edit3 className="w-4 h-4 text-amber-300" />
              <span>Edit Profile</span>
            </button>

            <Link
              to="/products"
              className="px-8 py-4 rounded-[25px] bg-white/95 dark:bg-slate-900/95 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-extrabold text-sm shadow-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105 backdrop-blur-md"
            >
              <Search className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Explore Catalog</span>
            </Link>

            <button
              onClick={onOpenQueriesModal || handleScrollToQueries}
              className="px-8 py-4 rounded-[25px] bg-slate-900/90 dark:bg-slate-800/90 text-amber-300 dark:text-amber-300 font-extrabold text-sm shadow-xl border border-amber-500/40 hover:border-amber-400 hover:bg-slate-800 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <MessageSquareCheck className="w-4 h-4 text-amber-400" />
              <span>Query ({displayInquiries.length})</span>
            </button>
          </div>

          {/* Connected Customer Status Pill */}
          {activeCustomer && (
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-medium shadow-md backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-500 dark:text-slate-400">Active Customer:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {activeCustomer.name} ({activeCustomer.location})
                  </span>
                </div>
                <button
                  onClick={onOpenCustomerModal}
                  className="text-brand-600 dark:text-brand-400 font-bold hover:underline text-[11px] ml-1"
                >
                  Change
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Animated Background Slideshow Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBgIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentBgIndex
                  ? 'w-8 bg-amber-400 shadow-lg shadow-amber-400/50'
                  : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              title={`Switch background to ${bg.title}`}
            />
          ))}
        </div>
      </section>

      {/* 2nd: Featured Inventory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 badge-font">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Trending Inventory
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Deals Ready for Inquiry
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm hover:shadow-md"
          >
            <span>Browse Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Featured Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onRaiseInquiry={onRaiseInquiry} />
          ))}
        </div>
      </section>

      {/* 3rd: Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="badge-font text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
              Browse Categories
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Curated Deal Marketplace
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return <CategoryCard key={cat.id} category={cat} productCount={count} />;
          })}
        </div>
      </section>

      {/* 4th: How DEALX 2026 Works Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950/95 dark:from-slate-900/95 dark:to-slate-950/95 rounded-[32px] p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-2xl overflow-hidden group">
          {/* Ambient Glowing Spheres inside banner */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-500/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

          <div className="text-center space-y-3 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-[10px] badge-font uppercase font-black tracking-widest bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Workflow Guide
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
              How DEALX 2026 Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium">
              Streamlined customer inquiry to seller CRM deal pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-4 relative z-10">
            {/* Step 01 */}
            <div className="group/step relative p-6 rounded-2xl bg-slate-800/60 dark:bg-slate-950/70 border border-slate-700/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 hover:border-brand-400/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md group-hover/step:scale-110 transition-transform duration-300 border border-white/20">
                  01
                </div>
                <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">Step 1</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold font-serif text-white group-hover/step:text-brand-300 transition-colors">
                  Customer Registration
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Provide your Name, Email, Phone, Location & Budget into local storage.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group/step relative p-6 rounded-2xl bg-slate-800/60 dark:bg-slate-950/70 border border-slate-700/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-400/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md group-hover/step:scale-110 transition-transform duration-300 border border-white/20">
                  02
                </div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Step 2</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold font-serif text-white group-hover/step:text-indigo-300 transition-colors">
                  Explore Product Catalog
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Filter verified Cars, Bikes, Electronics, and luxury assets with spec breakdowns.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group/step relative p-6 rounded-2xl bg-slate-800/60 dark:bg-slate-950/70 border border-slate-700/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md group-hover/step:scale-110 transition-transform duration-300 border border-white/20">
                  03
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Step 3</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold font-serif text-white group-hover/step:text-amber-300 transition-colors">
                  Raise Query
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Your customer identity is automatically attached to the deal inquiry note.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group/step relative p-6 rounded-2xl bg-slate-800/60 dark:bg-slate-950/70 border border-slate-700/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-400/80 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md group-hover/step:scale-110 transition-transform duration-300 border border-white/20">
                  04
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Step 4</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold font-serif text-white group-hover/step:text-emerald-300 transition-colors">
                  Admin CRM Response
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Admin tracks deal stages from New to Contacted to Converted in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5th: Trust & Platform Performance Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900/90 via-slate-900 to-indigo-950/90 rounded-[28px] p-8 border border-brand-500/30 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-800/80">
            <div className="space-y-1 p-2">
              <div className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-white">
                $18.4M+
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider badge-font">
                Luxury Inventory Traded
              </p>
            </div>

            <div className="space-y-1 p-2">
              <div className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-white">
                99.8%
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider badge-font">
                Verified Identity Match Rate
              </p>
            </div>

            <div className="space-y-1 p-2">
              <div className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-200 to-white">
                4.95 / 5.0
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider badge-font">
                Average Customer Rating
              </p>
            </div>

            <div className="space-y-1 p-2">
              <div className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-indigo-200 to-white">
                &lt; 12 Mins
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider badge-font">
                Executive CRM Response Time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6th: Verified Customer Reviews & Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 badge-font">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Verified VIP Feedback
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Customer Reviews & Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl">
              Real feedback from verified buyers across Porsche, Ducati, Apple, and Rolex deals.
            </p>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all border border-brand-400/30"
          >
            <Edit3 className="w-4 h-4 text-amber-300" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-[28px] bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 backdrop-blur-xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 badge-font">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified Deal
                  </span>
                </div>

                {/* Review Message */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-serif font-black text-sm flex items-center justify-center shadow-md border border-white/20">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {rev.location} • Deal: <strong className="text-brand-600 dark:text-brand-400">{rev.purchasedItem}</strong>
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7th: Interactive Platform FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 badge-font">
            Frequently Asked Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'How does Smart Inquiry Auto-Matching work?',
              a: 'When you set up your Customer Profile once, your name, email, phone, location, and purchase budget are securely stored in your browser. Every product inquiry you raise instantly attaches this identity to the seller CRM pipeline without re-entering data.',
            },
            {
              q: 'Are all luxury inventory listings verified?',
              a: 'Yes! All Cars, Bikes, Electronics, and collector items listed in DEALX undergo luxury asset verification, spec authentication, and direct seller authorization.',
            },
            {
              q: 'How do I track my active queries?',
              a: 'Click the "Queries" button in the navigation bar at any time to view all your open deal inquiries, status stages (New, In Progress, Converted), and seller response notes.',
            },
            {
              q: 'Can I switch or update my active customer profile?',
              a: 'Yes! Click "Edit Profile" or "Change Profile" anywhere on the platform to update your budget, location, or contact info.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-all hover:border-brand-500/40"
            >
              <h4 className="font-serif font-black text-slate-900 dark:text-white text-sm flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-brand-500 font-sans font-bold">+</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 animate-pop-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[32px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-w-lg w-full relative">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-black text-slate-900 dark:text-white">
                Submit Customer Review
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Share your deal experience with the luxury marketplace community.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Harpreet Singh"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Purchased Item
                  </label>
                  <input
                    type="text"
                    value={newReview.purchasedItem}
                    onChange={(e) => setNewReview({ ...newReview, purchasedItem: e.target.value })}
                    placeholder="e.g. Porsche Taycan"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rating Stars
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                  <option value={4}>★★★★☆ (4 Stars - Great)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Review Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share details about your purchase and CRM experience..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-black shadow-md hover:scale-105 transition-all"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

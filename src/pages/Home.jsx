import React from 'react';
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
} from 'lucide-react';

export const Home = ({ onRaiseInquiry, onOpenCustomerModal }) => {
  const { products } = useProducts();
  const { activeCustomer } = useCustomer();
  const { inquiries } = useInquiry();

  const customerInquiries = activeCustomer
    ? inquiries.filter(
        (i) => i.customerId === activeCustomer.id || i.customerEmail === activeCustomer.email
      )
    : [];

  const featuredProducts = products.filter((p) => p.featured || p.inStock).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-bold shadow-sm badge-font uppercase">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>2026 Next-Gen Product Dealing & CRM Marketplace</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Direct Product Dealing with <br className="hidden sm:inline" />
            <span className="text-brand-600 italic">
              Smart Inquiry Auto-Matching
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Register your customer profile once, browse verified luxury inventory across Cars, Bikes, and Electronics, and raise queries linked directly to your identity.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            {!activeCustomer ? (
              <button
                onClick={onOpenCustomerModal}
                className="px-8 py-4 rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-lg hover:bg-slate-900 transition-all flex items-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                Fill Details / Register Profile
              </button>
            ) : (
              <div className="px-6 py-3 rounded-2xl bg-white border border-blue-200 text-blue-950 text-xs font-bold flex items-center gap-3 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse" />
                <span>Active Customer: <strong>{activeCustomer.name}</strong> ({activeCustomer.city || 'Profile Saved'})</span>
                <button
                  onClick={onOpenCustomerModal}
                  className="ml-2 text-brand-600 hover:underline text-[11px] font-extrabold"
                >
                  Edit Profile
                </button>
              </div>
            )}

            <Link
              to="/products"
              className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-600" />
              Explore Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Raised Queries Banner if customer submitted queries */}
      {activeCustomer && customerInquiries.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <MessageSquareCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-extrabold text-white">
                    You Have {customerInquiries.length} Active Product Queries Raised
                  </h3>
                  <p className="text-xs text-blue-300 font-medium">
                    All inquiries are linked to your profile: <strong>{activeCustomer.email}</strong>
                  </p>
                </div>
              </div>

              <Link
                to="/products"
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors self-start sm:self-auto"
              >
                Browse Catalog & Add More Queries
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {customerInquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-extrabold text-white truncate">{inq.productTitle}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 badge-font uppercase">
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1 italic font-normal">"{inq.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4-Step Customer Workflow Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">How DEALX 2026 Works</h2>
            <p className="text-xs text-slate-500 font-medium">Streamlined customer inquiry to seller CRM deal pipeline</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-blue-400 font-mono font-bold text-sm flex items-center justify-center border border-slate-800">
                01
              </div>
              <h3 className="text-sm font-bold font-serif text-slate-900">Customer Registration</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Provide your Name, Email, Phone, Location & Budget into local storage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-blue-400 font-mono font-bold text-sm flex items-center justify-center border border-slate-800">
                02
              </div>
              <h3 className="text-sm font-bold font-serif text-slate-900">Explore Product Catalog</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Filter verified Cars, Bikes, Electronics, and luxury assets with spec breakdowns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-blue-400 font-mono font-bold text-sm flex items-center justify-center border border-slate-800">
                03
              </div>
              <h3 className="text-sm font-bold font-serif text-slate-900">Raise Query</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Your customer identity is automatically attached to the deal inquiry note.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-blue-400 font-mono font-bold text-sm flex items-center justify-center border border-slate-800">
                04
              </div>
              <h3 className="text-sm font-bold font-serif text-slate-900">Admin CRM Response</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Admin tracks deal stages from New to Contacted to Converted in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="badge-font text-xs uppercase tracking-wider text-brand-600 font-bold">
              Browse Categories
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 mt-1">
              Curated Deal Marketplace
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
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

      {/* Featured Inventory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="badge-font text-xs uppercase tracking-wider text-brand-600 font-bold">
              Trending Inventory
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-slate-900 mt-1">
              Featured Deals Ready for Inquiry
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Browse Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onRaiseInquiry={onRaiseInquiry} />
          ))}
        </div>
      </section>
    </div>
  );
};

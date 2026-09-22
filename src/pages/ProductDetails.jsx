import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { formatCurrency, formatDate } from '../utils/localStorage';
import {
  ArrowLeft,
  MapPin,
  MessageSquarePlus,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';

export const ProductDetails = ({ onRaiseInquiry }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { activeCustomer } = useCustomer();
  const { inquiries } = useInquiry();

  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 text-brand-400 border border-slate-800 flex items-center justify-center mx-auto shadow-xl">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-2xl font-black text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">
          The luxury asset you are looking for may have been updated or removed from the marketplace catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-black rounded-[20px] shadow-lg shadow-brand-500/20 hover:scale-[1.02] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Full Catalog
        </Link>
      </div>
    );
  }

  // Check if active customer has submitted a query for this item
  const existingInquiry = activeCustomer
    ? inquiries.find(
        (inq) =>
          inq.productId === product.id &&
          (inq.customerId === activeCustomer.id || inq.customerEmail === activeCustomer.email)
      )
    : null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Top Header Row: Compact Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to previous page</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 badge-font">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Listing
          </span>
        </div>
      </div>

      {/* Query Raised Active Banner */}
      {existingInquiry && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-brand-500/10 to-indigo-500/10 border border-emerald-500/30 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                Query Active for this Deal!
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">
                Submitted on {formatDate(existingInquiry.createdAt)} • Pipeline Stage:{' '}
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase text-[9px]">
                  {existingInquiry.status}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => onRaiseInquiry(product)}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-slate-900 dark:bg-brand-500 dark:hover:bg-brand-600 text-white text-xs font-black shadow-sm transition-all"
          >
            Send Additional Note
          </button>
        </div>
      )}

      {/* Main Grid: Gallery vs Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-7 space-y-3">
          <div className="group relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/10] max-h-[440px] shadow-xl backdrop-blur-xl">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.onerror = null;
                const fallbackMap = {
                  cars: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
                  bikes: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
                  electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
                  other: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
                };
                e.currentTarget.src = fallbackMap[product.category] || fallbackMap.cars;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-950/80 text-brand-300 border border-brand-500/30 shadow-md backdrop-blur-md badge-font">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-950/80 text-slate-200 border border-slate-700 shadow-md backdrop-blur-md badge-font">
                {product.condition}
              </span>
            </div>

            {product.featured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-slate-950/90 text-amber-300 border border-amber-500/40 shadow-md backdrop-blur-md flex items-center gap-1 badge-font">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                  Featured Deal
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? 'border-brand-500 ring-2 ring-brand-500/30 scale-95 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Compact Specifications & Deal CTAs */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 backdrop-blur-2xl">
            {/* Title & Price Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  <span>{product.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Listed {formatDate(product.createdDate)}</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                {product.title}
              </h1>

              <div>
                <p className="text-2xl sm:text-3xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300 tracking-tight">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/80 pt-3">
              {product.description}
            </p>

            {/* Technical Specifications - 2 Column Compact Grid */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="space-y-2 pt-1">
                <h3 className="text-[11px] font-mono uppercase tracking-widest text-slate-900 dark:text-slate-200 font-black flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-500" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 p-3 text-[11px]">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-between"
                    >
                      <span className="text-slate-400 dark:text-slate-400 text-[10px] font-medium leading-none">
                        {key}
                      </span>
                      <span className="text-slate-900 dark:text-white font-extrabold font-mono mt-1 line-clamp-1">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Action CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onRaiseInquiry(product)}
                className="w-full py-3 px-5 rounded-[20px] bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-brand-500/20 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide"
              >
                <MessageSquarePlus className="w-4 h-4 text-amber-300" />
                <span>{existingInquiry ? 'Raise Additional Query' : "Raise Inquiry / I'm Interested"}</span>
              </button>
              <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 font-medium">
                Your registered customer information will be automatically attached.
              </p>
            </div>

            {/* Compact Deal Assurance Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3 shadow-inner">
              <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 border border-brand-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
              </div>
              <div className="text-[11px] leading-tight">
                <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  Verified Marketplace Asset
                  <Award className="w-3 h-3 text-amber-400" />
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Direct deal manager verification & transparent terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

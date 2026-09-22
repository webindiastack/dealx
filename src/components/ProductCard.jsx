import React from 'react';
import { Link } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { formatCurrency } from '../utils/localStorage';
import { MapPin, Sparkles, MessageSquarePlus, Eye, CheckCircle2 } from 'lucide-react';

export const ProductCard = ({ product, onRaiseInquiry }) => {
  const { activeCustomer } = useCustomer();
  const { inquiries } = useInquiry();

  // Check if current active customer has raised an inquiry for this specific product
  const existingInquiry = activeCustomer
    ? inquiries.find(
        (inq) =>
          inq.productId === product.id &&
          (inq.customerId === activeCustomer.id || inq.customerEmail === activeCustomer.email)
      )
    : null;

  const primaryImage =
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

  const categoryBadgeStyle =
    product.category === 'cars'
      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
      : product.category === 'bikes'
      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
      : product.category === 'electronics'
      ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
      : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  return (
    <div className="group bg-white dark:bg-slate-900/90 rounded-[28px] border border-slate-200 dark:border-slate-800/90 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-500/15 hover:border-brand-500/50 dark:hover:border-brand-500/50 relative backdrop-blur-xl">
      {/* Product Image Container (Left Side on Desktop) */}
      <div className="relative w-full sm:w-[260px] md:w-[280px] shrink-0 overflow-hidden bg-slate-900 min-h-[220px] sm:min-h-full">
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="eager"
          onError={(e) => {
            e.currentTarget.onerror = null;
            const fallbackMap = {
              cars: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
              bikes: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
              electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
              other: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            };
            e.currentTarget.src = fallbackMap[product.category] || fallbackMap.cars;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black border backdrop-blur-md badge-font uppercase tracking-widest shadow-md ${categoryBadgeStyle}`}
            >
              {product.category}
            </span>
            {product.featured && (
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-slate-950/80 text-amber-300 border border-amber-500/40 shadow-md flex items-center gap-1 badge-font backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Featured
              </span>
            )}
          </div>

          <div className="pointer-events-auto">
            {existingInquiry ? (
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-950/90 text-emerald-300 shadow-md border border-emerald-500/40 flex items-center gap-1.5 badge-font backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Query Raised
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md badge-font uppercase tracking-wider">
                {product.condition}
              </span>
            )}
          </div>
        </div>

        {/* Location & Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white z-10">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-slate-300 font-medium mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>{product.location}</span>
            </div>
            <p className="text-2xl font-black font-serif drop-shadow-md text-white tracking-tight">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link
            to={`/products/${product.id}`}
            className="text-base font-extrabold font-serif text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-1 leading-snug"
          >
            {product.title}
          </Link>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specs Preview Chips */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {Object.entries(product.specs)
                .slice(0, 3)
                .map(([key, val]) => (
                  <span
                    key={key}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-[10px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 font-semibold"
                  >
                    <span className="text-slate-400 dark:text-slate-400 font-normal">{key}:</span> {val}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Query Status Banner & Action Buttons */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2.5">
          {existingInquiry && (
            <div className="p-2.5 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/30 flex items-center justify-between text-xs text-brand-700 dark:text-brand-300 font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-extrabold">
                  Inquiry Active ({existingInquiry.status})
                </span>
              </div>
              <button
                onClick={() => onRaiseInquiry(product)}
                className="text-[10px] font-black uppercase text-brand-600 dark:text-brand-400 hover:underline tracking-wider"
              >
                Send Note
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRaiseInquiry(product)}
              className={`flex-1 py-2.5 px-4 rounded-[20px] text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 ${
                existingInquiry
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                  : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-brand-500/20 hover:scale-[1.02] active:scale-95'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              {existingInquiry ? 'Raise Another Query' : 'Raise Inquiry'}
            </button>
            <Link
              to={`/products/${product.id}`}
              className="p-2.5 rounded-[20px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 flex items-center justify-center"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

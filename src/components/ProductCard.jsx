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

  const categoryColor =
    product.category === 'cars'
      ? 'bg-blue-100 text-blue-950 border-blue-300'
      : product.category === 'bikes'
      ? 'bg-slate-900 text-white border-slate-700'
      : product.category === 'electronics'
      ? 'bg-blue-600 text-white border-blue-500'
      : 'bg-slate-100 text-slate-900 border-slate-300';

  return (
    <div className="group bg-white rounded-3xl border border-slate-300 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-400 relative">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border backdrop-blur-md badge-font uppercase tracking-wider ${categoryColor}`}
          >
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-900 text-white border border-slate-700 shadow-sm flex items-center gap-1 badge-font">
              <Sparkles className="w-3 h-3 text-blue-400" /> Featured
            </span>
          )}
        </div>

        {/* "Query Raised" Badge Overlay if active customer submitted query */}
        {existingInquiry && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-slate-900 text-white shadow-lg border border-slate-700 flex items-center gap-1.5 badge-font">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Query Raised
            </span>
          </div>
        )}

        {/* Condition Badge if not query raised */}
        {!existingInquiry && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white text-slate-950 border border-slate-300 shadow-sm backdrop-blur-md badge-font uppercase">
              {product.condition}
            </span>
          </div>
        )}

        {/* Location & Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-white font-bold mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-300" />
              <span>{product.location}</span>
            </div>
            <p className="text-xl font-extrabold font-serif drop-shadow-md text-white">
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
            className="text-base font-extrabold font-serif text-slate-950 hover:text-brand-600 transition-colors line-clamp-1 leading-snug"
          >
            {product.title}
          </Link>
          <p className="text-xs text-slate-800 font-medium mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specs preview chips */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.entries(product.specs)
                .slice(0, 3)
                .map(([key, val]) => (
                  <span
                    key={key}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-900 border border-slate-300 font-bold"
                  >
                    <span className="text-slate-600">{key}:</span> {val}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Query Status Banner or Action CTAs */}
        <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
          {existingInquiry ? (
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-950">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="font-extrabold text-[11px]">
                  Inquiry Active ({existingInquiry.status})
                </span>
              </div>
              <button
                onClick={() => onRaiseInquiry(product)}
                className="text-[10px] font-extrabold text-brand-700 hover:underline"
              >
                Send Note
              </button>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRaiseInquiry(product)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                existingInquiry
                  ? 'bg-slate-200 text-slate-950 hover:bg-slate-300 border border-slate-300'
                  : 'bg-brand-600 hover:bg-slate-900 text-white'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              {existingInquiry ? 'Raise Another Query' : 'Raise Inquiry'}
            </button>
            <Link
              to={`/products/${product.id}`}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-950 hover:bg-slate-200 border border-slate-300 transition-colors"
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

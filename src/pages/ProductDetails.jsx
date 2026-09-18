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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="heading-font text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500">The product you are looking for may have been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
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

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to previous page
      </button>

      {/* Query Raised Banner if submitted */}
      {existingInquiry && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0" />
            <div className="text-xs">
              <h4 className="font-extrabold text-blue-950">Query Raised for this Item!</h4>
              <p className="text-blue-800">
                Submitted on {formatDate(existingInquiry.createdAt)} • Current Status: <strong>{existingInquiry.status}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => onRaiseInquiry(product)}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm hover:bg-slate-900"
          >
            Send Additional Note
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 aspect-[16/10] bg-slate-100 relative shadow-sm">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white border border-slate-800 shadow-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-md">
                {product.condition}
              </span>
            </div>
          </div>

          {/* Thumbnail list if multiple */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? 'border-brand-600 scale-95 shadow-md'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>{product.location}</span>
                <span>•</span>
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Listed {formatDate(product.createdDate)}</span>
              </div>
              <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-3xl font-black text-brand-600 heading-font mt-3">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-slate-100 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-4">
                      <span className="text-slate-500 font-medium">{key}</span>
                      <span className="text-slate-900 font-bold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onRaiseInquiry(product)}
                className="w-full py-4 px-6 rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-5 h-5" />
                {existingInquiry ? 'Raise Additional Query' : 'Raise Inquiry / I\'m Interested'}
              </button>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                Your registered customer information will be automatically attached.
              </p>
            </div>

            {/* Deal Assurance */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-bold text-blue-950">Verified Marketplace Asset</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Direct deal manager verification. Clean title, inspection ready, and transparent terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

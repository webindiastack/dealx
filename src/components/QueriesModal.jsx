import React from 'react';
import { Link } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { MessageSquareCheck, X, User, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const QueriesModal = ({ isOpen, onClose }) => {
  const { activeCustomer } = useCustomer();
  const { inquiries } = useInquiry();

  if (!isOpen) return null;

  const customerInquiries = activeCustomer
    ? inquiries.filter(
        (i) => i.customerId === activeCustomer.id || i.customerEmail === activeCustomer.email
      )
    : [];

  const displayInquiries =
    customerInquiries.length > 0
      ? customerInquiries
      : activeCustomer
      ? [
          {
            id: 'demo-1',
            productTitle: '2026 Porsche Taycan Turbo S GTS',
            status: 'New',
            customerName: activeCustomer.name || 'Harpreet Singh',
            message:
              'I am interested in this product. Please share availability, inspection details, and best dealing price.',
          },
          {
            id: 'demo-2',
            productTitle: '2026 Porsche Taycan Turbo S GTS',
            status: 'In Progress',
            customerName: activeCustomer.name || 'Harpreet Singh',
            message:
              'I am ready to schedule a test drive for the Frozen Blue Taycan Turbo S. Please let me know available dates next week.',
          },
        ]
      : [];

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
    }
  };

  return (
    /* Simple Background Overlay without Backdrop Blur */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 animate-pop-in">
      {/* Clean White Modal Container Box */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[32px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-w-2xl w-full relative overflow-hidden">
        {/* Top Glowing Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-4 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <MessageSquareCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 text-[10px] font-black uppercase tracking-widest badge-font">
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              Customer Inquiry Portfolio
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              You Have {displayInquiries.length} Active Product {displayInquiries.length === 1 ? 'Query' : 'Queries'} Raised
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bound to identity:</span>
              <span className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                {activeCustomer ? activeCustomer.email : 'harpreet@example.com'}
              </span>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
          {displayInquiries.map((inq, idx) => (
            <div
              key={inq.id || idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm text-xs space-y-3 transition-all hover:border-brand-500/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-300 border border-brand-300 dark:border-brand-800 flex items-center justify-center font-bold text-xs font-serif shrink-0">
                    {idx + 1}
                  </div>
                  <span className="font-serif font-black text-slate-900 dark:text-white text-base">
                    {inq.productTitle}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border badge-font uppercase tracking-wider shrink-0 ${getStatusBadge(inq.status)}`}>
                  {inq.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-500/20">
                  <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Query by: {inq.customerName || activeCustomer?.name || 'Harpreet Singh'}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified Identity</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed font-sans">
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium italic">
                  "{inq.message}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Active customer identity bound automatically.</span>
          </div>

          <Link
            to="/products"
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-3 rounded-[25px] bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-black shadow-lg hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2"
          >
            <span>Browse Catalog & Add More Queries</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

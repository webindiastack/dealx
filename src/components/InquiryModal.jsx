import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { formatCurrency } from '../utils/localStorage';
import {
  X,
  Send,
  UserCheck,
  Calendar,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

export const InquiryModal = ({ product, isOpen, onClose, onOpenCustomerModal }) => {
  const { activeCustomer } = useCustomer();
  const { createInquiry } = useInquiry();

  const [message, setMessage] = useState(
    'I am interested in this product. Please share availability, inspection details, and best dealing price.'
  );
  const [targetDate, setTargetDate] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeCustomer) {
      onOpenCustomerModal();
      return;
    }

    createInquiry({
      product,
      customer: activeCustomer,
      message,
      targetDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100/90 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-brand-600 border border-slate-800 flex items-center justify-center text-blue-400 dark:text-amber-300 shadow-sm">
              <Send className="w-5 h-5 text-blue-400 dark:text-amber-300" />
            </div>
            <div>
              <h3 className="heading-font text-lg font-extrabold text-slate-950 dark:text-white">Raise Product Inquiry</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Connect directly with the deal manager for this item.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {/* Target Product Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 flex items-center gap-4">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80'}
              alt={product.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-900 dark:bg-slate-800 text-white uppercase tracking-wider badge-font">
                {product.category}
              </span>
              <h4 className="text-sm font-serif font-extrabold text-slate-950 dark:text-white truncate mt-1">{product.title}</h4>
              <p className="text-sm font-extrabold text-brand-600 dark:text-brand-400 font-serif">{formatCurrency(product.price)}</p>
            </div>
          </div>

          {/* Customer Attachment Status Banner */}
          {activeCustomer ? (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-950 dark:text-blue-200">
                  <UserCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Customer Details Auto-Attached</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenCustomerModal}
                  className="text-[11px] text-brand-700 dark:text-brand-300 hover:underline font-extrabold"
                >
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-slate-950 dark:text-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block">Name</span>
                  <span className="font-bold truncate block">{activeCustomer.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block">Email</span>
                  <span className="font-bold truncate block">{activeCustomer.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block">Phone</span>
                  <span className="font-bold truncate block">{activeCustomer.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block">City/State</span>
                  <span className="font-bold truncate block">
                    {activeCustomer.city}, {activeCustomer.state}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-200">
                <AlertCircle className="w-5 h-5 text-slate-500 shrink-0" />
                <span>No customer profile found in local session. Please register first.</span>
              </div>
              <button
                type="button"
                onClick={onOpenCustomerModal}
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-extrabold shrink-0 hover:bg-slate-900 transition-colors shadow-sm"
              >
                Register Profile
              </button>
            </div>
          )}

          {/* Custom Message */}
          <div>
            <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
              Inquiry Note / Custom Requirements
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about availability, inspection, financing, or price negotiation..."
                className="w-full pl-9 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
              />
            </div>
          </div>

          {/* Target Date */}
          <div>
            <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
              Target Deal / Inspection Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-950 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!activeCustomer}
              className={`px-6 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2 ${
                activeCustomer
                  ? 'bg-brand-600 dark:bg-brand-500 hover:bg-slate-900 dark:hover:bg-brand-600'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              Submit Product Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

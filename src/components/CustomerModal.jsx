import React, { useState, useEffect } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { X, User, Mail, Phone, MapPin, DollarSign, Sparkles, CheckCircle, Lightbulb } from 'lucide-react';

export const CustomerModal = ({ isOpen, onClose, isFirstVisit = false }) => {
  const { activeCustomer, saveCustomer } = useCustomer();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    category: 'all',
    budget: '$50,000 - $100,000',
    details: '',
  });

  useEffect(() => {
    if (activeCustomer) {
      setFormData({
        name: activeCustomer.name || '',
        email: activeCustomer.email || '',
        phone: activeCustomer.phone || '',
        city: activeCustomer.city || '',
        state: activeCustomer.state || '',
        category: activeCustomer.category || 'all',
        budget: activeCustomer.budget || '$50,000 - $100,000',
        details: activeCustomer.details || '',
      });
    }
  }, [activeCustomer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    saveCustomer(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100/90 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-brand-600 border border-slate-800 flex items-center justify-center text-blue-400 dark:text-amber-300 shadow-sm">
              <User className="w-5 h-5 text-blue-400 dark:text-amber-300" />
            </div>
            <div>
              <h3 className="heading-font text-lg font-extrabold text-slate-950 dark:text-white">
                {isFirstVisit
                  ? 'Welcome! Register Your Customer Profile'
                  : activeCustomer
                  ? 'Edit Customer Profile'
                  : 'Customer Registration'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Your profile stays attached to every product inquiry you raise.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* First Visit Alert Banner */}
        {isFirstVisit && (
          <div className="px-6 pt-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center gap-3 text-xs text-slate-950 dark:text-blue-200 font-bold shadow-sm">
              <Lightbulb className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
              <span>
                <strong>First Time Visitor:</strong> Please fill in your details below so every product inquiry you submit is linked to you!
              </span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
                Full Name <span className="text-brand-600 dark:text-brand-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Harpreet Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
                Email Address <span className="text-brand-600 dark:text-brand-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">State</label>
              <input
                type="text"
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interested Category */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
                Primary Interested Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
              >
                <option value="all">All Categories</option>
                <option value="cars">Cars & Automobiles</option>
                <option value="bikes">Bikes & Motorcycles</option>
                <option value="electronics">Electronics & Gadgets</option>
                <option value="other">Other Luxury Goods</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
                Target Budget Range
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
                >
                  <option value="Under $10,000">Under $10,000</option>
                  <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                  <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                  <option value="$250,000+">$250,000+</option>
                  <option value="Flexible">Flexible / Custom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-xs font-extrabold text-slate-950 dark:text-slate-200 mb-1.5">
              Preferences & Additional Details
            </label>
            <textarea
              rows={3}
              placeholder="Specify requirements, preferred model years, financing options, or delivery location..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400"
            />
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-950 dark:text-slate-200">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
            <span>Saved in local storage so every product inquiry you raise auto-attaches this data!</span>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-950 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-600 dark:bg-brand-500 hover:bg-slate-900 dark:hover:bg-brand-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

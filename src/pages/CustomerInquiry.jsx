import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  UserCheck,
} from 'lucide-react';

export const CustomerInquiry = () => {
  const navigate = useNavigate();
  const { activeCustomer, saveCustomer, customers, switchCustomer } = useCustomer();

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
  }, [activeCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCustomer(formData);
    navigate('/products');
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-6">
      {/* Page Title & Pill Tag */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[25px] bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-xs font-black uppercase tracking-widest badge-font">
          <User className="w-3.5 h-3.5 text-brand-500" />
          <span>Step 1: Customer Onboarding</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Customer Inquiry & Profile Setup
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
          Save your contact details & purchase budget into local storage. Every product inquiry you raise in the catalog will automatically attach this information.
        </p>
      </div>

      {/* Customer Profile Quick Switcher */}
      {customers.length > 0 && (
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-900 dark:text-slate-200 font-extrabold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-brand-500" />
              Saved Local Profiles ({customers.length}):
            </span>
            <span className="text-brand-600 dark:text-brand-400 font-bold text-[11px]">
              Click to select active profile
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {customers.map((c) => {
              const isActive = activeCustomer?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => switchCustomer(c)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold border transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-transparent ring-2 ring-brand-500/40 shadow-brand-500/20'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                  <span>{c.name}</span>
                  <span className="text-[10px] font-mono opacity-80">({c.city || 'USA'})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Registration Form */}
      <div className="bg-white dark:bg-slate-900/90 rounded-[32px] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                Full Name <span className="text-brand-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Harpreet Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                Email Address <span className="text-brand-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="harpreet@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Phone */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                Primary Interested Category
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5 pointer-events-none" />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-medium"
                >
                  <option value="all">All Categories (Cars, Bikes, Electronics)</option>
                  <option value="cars">Cars & Automobiles</option>
                  <option value="bikes">Bikes & Motorcycles</option>
                  <option value="electronics">Electronics & Gadgets</option>
                  <option value="other">Other Luxury Goods</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
                Budget Range
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 top-3.5 pointer-events-none" />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-medium"
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

          {/* Details */}
          <div>
            <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-200 mb-2">
              Specific Requirements or Notes
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Interested in high-performance electric vehicles for daily commute and weekend trips..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 font-medium leading-relaxed"
            />
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Data saved in browser LocalStorage</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-[25px] bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-brand-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 tracking-wide"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>Save Profile & Browse Catalog</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

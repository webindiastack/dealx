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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold shadow-sm">
          <User className="w-3.5 h-3.5 text-brand-600" />
          <span>Step 1: Customer Onboarding</span>
        </div>
        <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-slate-900">
          Customer Inquiry & Profile Setup
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal">
          Save your contact details & purchase budget into local storage. Every product inquiry you raise in the catalog will automatically attach this information.
        </p>
      </div>

      {/* Customer Switcher if existing profiles exist */}
      {customers.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-bold">Saved Local Profiles ({customers.length}):</span>
            <span className="text-brand-600 font-bold">Click to select active profile</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {customers.map((c) => (
              <button
                key={c.id}
                onClick={() => switchCustomer(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  activeCustomer?.id === c.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[10px] opacity-80">({c.city || 'USA'})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Registration Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Full Name <span className="text-brand-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Harpreet Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email Address <span className="text-brand-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="harpreet@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">State</label>
              <input
                type="text"
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Primary Interested Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Categories (Cars, Bikes, Electronics)</option>
                <option value="cars">Cars & Automobiles</option>
                <option value="bikes">Bikes & Motorcycles</option>
                <option value="electronics">Electronics & Gadgets</option>
                <option value="other">Other Luxury Goods</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Budget Range</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-500"
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
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Specific Requirements or Notes
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Prefer electric vehicles with low mileage, warranty included, immediate delivery..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Data saved in browser LocalStorage</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-slate-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Profile & Browse Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  User,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Sliders,
  MessageSquareCheck,
  Menu,
  X,
} from 'lucide-react';

export const Navbar = ({ onOpenCustomerModal }) => {
  const location = useLocation();
  const { activeCustomer, customers, switchCustomer, logoutCustomer } = useCustomer();
  const { inquiries } = useInquiry();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Count active customer's raised inquiries
  const customerInquiries = activeCustomer
    ? inquiries.filter(
        (i) => i.customerId === activeCustomer.id || i.customerEmail === activeCustomer.email
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-blue-400 shadow-md group-hover:scale-105 transition-transform duration-300 border border-slate-800">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="font-serif text-2xl font-extrabold tracking-tight text-slate-900">
              DEAL<span className="text-brand-600 font-sans">X</span>
            </span>
            <span className="block badge-font text-[9px] uppercase tracking-widest text-slate-500 font-extrabold">
              2026 Luxury Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200">
          <Link
            to="/"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isActive('/')
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isActive('/products')
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Catalog
          </Link>
          <Link
            to="/inquiry"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isActive('/inquiry')
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Customer Form
          </Link>
        </nav>

        {/* Right Section: Customer Profile & Admin Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Active Customer Profile Widget */}
          {activeCustomer ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-left hover:border-brand-400 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm font-serif border border-slate-700">
                  {activeCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 truncate max-w-[110px]">
                      {activeCustomer.name}
                    </span>
                    {customerInquiries.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                        {customerInquiries.length} Queries
                      </span>
                    )}
                  </div>
                  <span className="block text-[10px] text-slate-500 truncate max-w-[120px]">
                    {activeCustomer.city || 'Profile Active'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl p-3 shadow-2xl z-50 border border-slate-200 animate-pop-in"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-slate-100 bg-slate-50/80 rounded-xl mb-2">
                    <p className="badge-font text-[9px] uppercase text-slate-400 font-bold">Active Customer Profile</p>
                    <p className="font-serif text-sm font-extrabold text-slate-900 truncate">{activeCustomer.name}</p>
                    <p className="text-xs text-brand-600 truncate font-semibold">{activeCustomer.email}</p>
                  </div>

                  {/* Customer Inquiries Summary Box */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 mb-2 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                      <span className="flex items-center gap-1">
                        <MessageSquareCheck className="w-4 h-4 text-brand-600" />
                        Queries Raised
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold">
                        {customerInquiries.length} Total
                      </span>
                    </div>
                    {customerInquiries.length > 0 ? (
                      <div className="text-[11px] text-blue-900 space-y-1 pt-1">
                        {customerInquiries.slice(0, 2).map((inq) => (
                          <div key={inq.id} className="truncate border-t border-blue-200/60 pt-1">
                            • <strong>{inq.productTitle}</strong> ({inq.status})
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-blue-800">No product queries raised yet.</p>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenCustomerModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                    >
                      <Sliders className="w-4 h-4 text-brand-600" />
                      Edit Customer Profile
                    </button>
                  </div>

                  {customers.length > 1 && (
                    <div className="border-t border-slate-100 pt-2 mt-1">
                      <p className="badge-font px-3 py-1 text-[9px] uppercase text-slate-400 font-bold">
                        Switch Local Profile
                      </p>
                      {customers.map((cust) => (
                        <button
                          key={cust.id}
                          onClick={() => {
                            switchCustomer(cust);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                            activeCustomer.id === cust.id
                              ? 'bg-brand-50 text-brand-700 font-bold'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{cust.name}</span>
                          {activeCustomer.id === cust.id && (
                            <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-2 mt-1">
                    <button
                      onClick={() => {
                        logoutCustomer();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-slate-500" />
                      End Customer Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenCustomerModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-brand-600 text-white shadow-md hover:bg-slate-900 transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Fill Details / Register
            </button>
          )}

          {/* Admin Button */}
          <Link
            to={isAdmin ? '/admin' : '/admin/login'}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${
              isAdmin
                ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-100"
          >
            Home Marketplace
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-100"
          >
            Product Catalog
          </Link>
          <Link
            to="/inquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-100"
          >
            Customer Registration Form
          </Link>
          <Link
            to={isAdmin ? '/admin' : '/admin/login'}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-white bg-slate-900 border border-slate-800 font-bold"
          >
            {isAdmin ? 'Admin Dashboard' : 'Admin Login Portal'}
          </Link>

          <div className="pt-3 border-t border-slate-100">
            {activeCustomer ? (
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="badge-font text-[9px] text-slate-400 font-bold uppercase">Active Profile</p>
                  <p className="font-serif text-sm font-extrabold text-slate-900">{activeCustomer.name}</p>
                  <p className="text-xs text-brand-600 font-semibold">
                    Queries Raised: {customerInquiries.length}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onOpenCustomerModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-brand-600 text-white text-xs font-bold rounded-lg"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenCustomerModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-brand-600 text-white text-xs font-bold rounded-lg"
              >
                Register Customer Profile
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

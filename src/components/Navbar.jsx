import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { useInquiry } from '../context/InquiryContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
  Sun,
  Moon,
} from 'lucide-react';

export const Navbar = ({ onOpenCustomerModal, onOpenQueriesModal }) => {
  const location = useLocation();
  const { activeCustomer, customers, switchCustomer, logoutCustomer } = useCustomer();
  const { inquiries } = useInquiry();
  const { isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [hoveredNav, setHoveredNav] = useState(null);
  const navRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const getActiveNavIndex = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/products') return 1;
    if (location.pathname === '/inquiry') return 2;
    return 0;
  };

  const currentNavIndex = hoveredNav !== null ? hoveredNav : getActiveNavIndex();

  useEffect(() => {
    const targetEl = navRefs.current[currentNavIndex];
    if (targetEl) {
      setSliderStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [currentNavIndex, location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Count active customer's raised inquiries
  const customerInquiries = activeCustomer
    ? inquiries.filter(
        (i) => i.customerId === activeCustomer.id || i.customerEmail === activeCustomer.email
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-brand-600 flex items-center justify-center text-blue-400 dark:text-white shadow-md group-hover:scale-105 transition-transform duration-300 border border-slate-800 dark:border-brand-500">
            <Sparkles className="w-5 h-5 text-blue-400 dark:text-amber-300" />
          </div>
          <div>
            <span className="font-serif text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              DEAL<span className="text-brand-600 dark:text-brand-400 font-sans">X</span>
            </span>
            <span className="block badge-font text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-extrabold">
              Luxury Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Perfect Centered Sliding Indicator */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 relative"
        >
          {/* Glass Sliding Highlight Pill - Pixel-Perfect Measured Fit */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-brand-500/20 dark:bg-white/10 backdrop-blur-md border border-brand-500/30 dark:border-white/20 shadow-sm transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity,
            }}
          />

          <Link
            to="/"
            ref={(el) => (navRefs.current[0] = el)}
            onMouseEnter={() => setHoveredNav(0)}
            className={`relative z-10 px-5 py-2 rounded-full text-xs font-black text-center flex items-center justify-center transition-colors duration-200 ${
              currentNavIndex === 0
                ? 'text-brand-600 dark:text-amber-300 font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            ref={(el) => (navRefs.current[1] = el)}
            onMouseEnter={() => setHoveredNav(1)}
            className={`relative z-10 px-5 py-2 rounded-full text-xs font-black text-center flex items-center justify-center transition-colors duration-200 ${
              currentNavIndex === 1
                ? 'text-brand-600 dark:text-amber-300 font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Catalog
          </Link>
          <Link
            to="/inquiry"
            ref={(el) => (navRefs.current[2] = el)}
            onMouseEnter={() => setHoveredNav(2)}
            className={`relative z-10 px-5 py-2 rounded-full text-xs font-black text-center flex items-center justify-center transition-colors duration-200 ${
              currentNavIndex === 2
                ? 'text-brand-600 dark:text-amber-300 font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Customer Form
          </Link>
          <button
            onClick={onOpenQueriesModal}
            ref={(el) => (navRefs.current[3] = el)}
            onMouseEnter={() => setHoveredNav(3)}
            className={`relative z-10 px-4 py-2 rounded-full text-xs font-black text-center flex items-center justify-center gap-1.5 transition-colors duration-200 ${
              currentNavIndex === 3
                ? 'text-amber-600 dark:text-amber-300 font-extrabold'
                : 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300'
            }`}
          >
            <MessageSquareCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Queries ({customerInquiries.length > 0 ? customerInquiries.length : 1})</span>
          </button>
        </nav>

        {/* Right Section: Customer Profile, Dark Mode Toggle & Admin Button */}
        <div className="hidden md:flex items-center gap-3">

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Active Customer Profile Widget */}
          {activeCustomer ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-brand-400 dark:hover:border-brand-500 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-sm font-serif border border-slate-700 dark:border-brand-500">
                  {activeCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 truncate max-w-[110px]">
                      {activeCustomer.name}
                    </span>
                    {customerInquiries.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                        {customerInquiries.length} Queries
                      </span>
                    )}
                  </div>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                    {activeCustomer.city || 'Profile Active'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-2xl z-50 border border-slate-200 dark:border-slate-800 animate-pop-in"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 rounded-xl mb-2">
                    <p className="badge-font text-[9px] uppercase text-slate-400 font-bold">Active Customer Profile</p>
                    <p className="font-serif text-sm font-extrabold text-slate-900 dark:text-white truncate">{activeCustomer.name}</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 truncate font-semibold">{activeCustomer.email}</p>
                  </div>

                  {/* Customer Inquiries Summary Box */}
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-slate-950/80 border border-blue-200 dark:border-blue-900/50 mb-2 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-950 dark:text-blue-200">
                      <span className="flex items-center gap-1">
                        <MessageSquareCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        Queries Raised
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 dark:bg-brand-600 text-white text-[10px] font-mono font-bold">
                        {customerInquiries.length} Total
                      </span>
                    </div>
                    {customerInquiries.length > 0 ? (
                      <div className="text-[11px] text-blue-900 dark:text-blue-300 space-y-1 pt-1">
                        {customerInquiries.slice(0, 2).map((inq) => (
                          <div key={inq.id} className="truncate border-t border-blue-200/60 dark:border-slate-800 pt-1">
                            • <strong>{inq.productTitle}</strong> ({inq.status})
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-blue-800 dark:text-blue-400">No product queries raised yet.</p>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenCustomerModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                    >
                      <Sliders className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      Edit Customer Profile
                    </button>
                  </div>

                  {customers.length > 1 && (
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-1">
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
                              ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{cust.name}</span>
                          {activeCustomer.id === cust.id && (
                            <UserCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-1">
                    <button
                      onClick={() => {
                        logoutCustomer();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      End Customer Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenCustomerModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-brand-600 dark:bg-brand-500 text-white shadow-md hover:bg-slate-900 dark:hover:bg-brand-600 transition-all flex items-center gap-2"
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
                ? 'bg-slate-900 dark:bg-slate-800 border-slate-800 dark:border-slate-700 text-white hover:bg-slate-800'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
          </Link>
        </div>

        {/* Mobile Controls Container (Dark Toggle + Menu Button) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Home Marketplace
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Product Catalog
          </Link>
          <Link
            to="/inquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Customer Registration Form
          </Link>
          <Link
            to={isAdmin ? '/admin' : '/admin/login'}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-white bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 font-bold"
          >
            {isAdmin ? 'Admin Dashboard' : 'Admin Login Portal'}
          </Link>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {activeCustomer ? (
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="badge-font text-[9px] text-slate-400 font-bold uppercase">Active Profile</p>
                  <p className="font-serif text-sm font-extrabold text-slate-900 dark:text-white">{activeCustomer.name}</p>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Lock, Layers, ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300 border-t border-slate-800/80 mt-auto overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          
          {/* Brand Col - Spans 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 border border-white/20 flex items-center justify-center text-amber-300 shadow-lg shadow-brand-500/20">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <span className="font-serif text-2xl font-black text-white tracking-tight">
                DEAL<span className="text-brand-400 font-sans">X</span>
                <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-wider font-bold">
                  2026 NEXT-GEN
                </span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 font-medium max-w-sm">
              Next-generation product dealing and customer inquiry marketplace. Connecting high-intent buyers directly to verified luxury inventory.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-2 shadow-inner">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Direct Deals</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-2 shadow-inner">
                <Shield className="w-3.5 h-3.5 text-brand-400" />
                <span>Zero Commission</span>
              </div>
            </div>
          </div>

          {/* Categories - Spans 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              Marketplace Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/products?category=cars"
                  className="group flex items-center justify-between text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <span>Cars & Automobiles</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=bikes"
                  className="group flex items-center justify-between text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <span>Bikes & Motorcycles</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=electronics"
                  className="group flex items-center justify-between text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <span>Electronics & Gadgets</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=other"
                  className="group flex items-center justify-between text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <span>Other Luxury Goods</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Features - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/inquiry"
                  className="group flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  <span>Customer Inquiry Registration</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="group flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  <span>Full Inventory Catalog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="group flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin CRM Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech & Privacy Card - Spans 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Technology & Privacy
            </h4>
            
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Cpu className="w-4 h-4 text-brand-400" />
                <span>LocalStorage Client Engine</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>2026 Adaptive Dark/Light UX</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal pt-1 border-t border-slate-800/80">
                Designed for customer inquiry auto-attachment and deal pipeline tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-600" />
            <p>© 2026 DEALX Marketplace Inc. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors hover:underline">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors hover:underline">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors hover:underline">
              Security Protocol
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

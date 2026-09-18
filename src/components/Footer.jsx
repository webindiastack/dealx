import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Lock, Layers } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-auto text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <span className="heading-font text-lg font-bold text-slate-900 tracking-tight">
                DEAL<span className="text-brand-600">X</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Next-generation product dealing and customer inquiry marketplace. Connecting high-intent buyers directly to verified inventory.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Marketplace Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=cars" className="hover:text-brand-600 transition-colors font-medium">
                  Cars & Automobiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=bikes" className="hover:text-brand-600 transition-colors font-medium">
                  Bikes & Motorcycles
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-brand-600 transition-colors font-medium">
                  Electronics & Gadgets
                </Link>
              </li>
              <li>
                <Link to="/products?category=other" className="hover:text-brand-600 transition-colors font-medium">
                  Other Luxury Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/inquiry" className="hover:text-brand-600 transition-colors font-medium">
                  Customer Inquiry Registration
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-600 transition-colors font-medium">
                  Full Inventory Catalog
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-brand-600 transition-colors flex items-center gap-1 font-medium">
                  <Shield className="w-3 h-3 text-brand-600" /> Admin CRM Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Technology & Privacy
            </h4>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <Lock className="w-4 h-4 text-brand-600" />
                <span>LocalStorage Client Engine</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Layers className="w-4 h-4 text-brand-600" />
                <span>2026 Glassmorphic Light UX</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 leading-tight">
                Designed for customer inquiry auto-attachment and deal pipeline tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 DEALX Marketplace Inc. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

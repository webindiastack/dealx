import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Bike, Smartphone, Package, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Car,
  Bike,
  Smartphone,
  Package,
};

const BADGE_COLOR_MAP = {
  Popular: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40',
  Trending: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/40',
  'Hot Deals': 'from-rose-500/20 to-red-500/20 text-rose-300 border-rose-500/40',
  Exclusive: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40',
};

export const CategoryCard = ({ category, productCount = 0 }) => {
  const IconComponent = ICON_MAP[category.iconName] || Package;
  const badgeStyle =
    BADGE_COLOR_MAP[category.badgeText] ||
    'from-blue-500/20 to-brand-500/20 text-blue-300 border-blue-500/40';

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative bg-slate-900/90 dark:bg-slate-950/90 rounded-[28px] p-6 border border-slate-700/80 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between min-h-[270px] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-brand-500/20 hover:border-brand-400/80 backdrop-blur-xl"
    >
      {/* Glow ambient background aura */}
      <div className="absolute -right-12 -top-12 w-44 h-44 bg-gradient-to-br from-brand-500/20 via-indigo-500/15 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      {/* Background Image Overlay with Shimmer */}
      <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-85 transition-opacity duration-500 overflow-hidden">
        <img
          src={category.bannerImg}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.onerror = null;
            const categoryFallbackMap = {
              cars: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
              bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
              electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
              other: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            };
            e.currentTarget.src = categoryFallbackMap[category.id] || categoryFallbackMap.cars;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 text-brand-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-brand-400/50 transition-all duration-300">
          <IconComponent className="w-7 h-7" />
        </div>

        <span
          className={`px-3.5 py-1 rounded-full text-[10px] badge-font uppercase font-black tracking-widest bg-gradient-to-r ${badgeStyle} border backdrop-blur-md shadow-sm`}
        >
          {category.badgeText}
        </span>
      </div>

      {/* Content Section */}
      <div className="relative z-10 space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-black text-white group-hover:text-brand-300 transition-colors tracking-tight">
            {category.name}
          </h3>
          <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-400 group-hover:scale-110 transition-all duration-300 shadow-md">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
          {category.description}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{productCount} Verified Items Available</span>
          </div>

          <span className="text-[10px] font-extrabold text-slate-400 group-hover:text-brand-300 transition-colors uppercase tracking-wider">
            Explore Deals →
          </span>
        </div>
      </div>
    </Link>
  );
};


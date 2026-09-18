import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Bike, Smartphone, Package, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Car,
  Bike,
  Smartphone,
  Package,
};

export const CategoryCard = ({ category, productCount = 0 }) => {
  const IconComponent = ICON_MAP[category.iconName] || Package;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative bg-white rounded-3xl p-6 border border-slate-300 overflow-hidden flex flex-col justify-between h-64 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-brand-400"
    >
      {/* Background Banner Blur Image */}
      <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500 overflow-hidden">
        <img
          src={category.bannerImg}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="px-3 py-1 rounded-full text-[9px] badge-font uppercase font-extrabold tracking-wider bg-slate-100 text-slate-950 border border-slate-300">
          {category.badgeText}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-extrabold text-slate-950 group-hover:text-brand-600 transition-colors">
            {category.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-950 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all shadow-sm">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
        <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed font-semibold">
          {category.description}
        </p>
        <div className="pt-2 text-[11px] font-extrabold text-slate-950 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-600" />
          <span>{productCount} Verified Items Available</span>
        </div>
      </div>
    </Link>
  );
};

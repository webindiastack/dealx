import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { formatCurrency } from '../utils/localStorage';
import { Search, ArrowUpDown, X } from 'lucide-react';

export const Products = ({ onRaiseInquiry }) => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(250000);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    if (categorySlug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categorySlug });
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        if (p.price > maxPrice) {
          return false;
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const titleMatch = p.title.toLowerCase().includes(q);
          const descMatch = p.description.toLowerCase().includes(q);
          const locationMatch = p.location.toLowerCase().includes(q);
          const categoryMatch = p.category.toLowerCase().includes(q);
          return titleMatch || descMatch || locationMatch || categoryMatch;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
            Live Inventory
          </span>
          <h1 className="heading-font text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Product Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse items and click "Raise Inquiry" to submit a customer inquiry directly.
          </p>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-sm self-start md:self-auto font-medium">
          Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> of{' '}
          <strong className="text-slate-900 dark:text-white">{products.length}</strong> items
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by title, specifications, brand, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Max Price Filter */}
          <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold shrink-0">
              Max: {formatCurrency(maxPrice)}
            </span>
            <input
              type="range"
              min={1000}
              max={250000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-600 dark:accent-brand-400 cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3 relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
            >
              <option value="newest">Sort by: Newest Listed</option>
              <option value="price-asc">Sort by: Price Low to High</option>
              <option value="price-desc">Sort by: Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-600 dark:bg-brand-500 text-white border-brand-600 dark:border-brand-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Categories ({products.length})
          </button>

          {CATEGORIES.map((cat) => {
            const catCount = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-brand-600 dark:bg-brand-500 text-white border-brand-600 dark:border-brand-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name} ({catCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid - Wide Horizontal Layout for Proper Page Alignment */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onRaiseInquiry={onRaiseInquiry} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="heading-font text-lg font-bold text-slate-900 dark:text-white">No Matching Products Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms, price filter slider, or category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMaxPrice(250000);
            }}
            className="px-4 py-2 rounded-xl bg-brand-600 dark:bg-brand-500 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

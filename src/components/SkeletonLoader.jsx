import React from 'react';

export const SkeletonCard = () => (
  <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-96 animate-pulse">
    <div className="h-48 bg-slate-800/60" />
    <div className="p-5 flex-1 space-y-4">
      <div className="h-4 bg-slate-800/80 rounded w-3/4" />
      <div className="h-3 bg-slate-800/50 rounded w-full" />
      <div className="h-3 bg-slate-800/50 rounded w-2/3" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-slate-800/60 rounded w-16" />
        <div className="h-6 bg-slate-800/60 rounded w-20" />
      </div>
      <div className="pt-4 border-t border-slate-800/80 flex gap-2">
        <div className="h-9 bg-slate-800/80 rounded-xl flex-1" />
        <div className="h-9 bg-slate-800/80 rounded-xl w-10" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, idx) => (
      <SkeletonCard key={idx} />
    ))}
  </div>
);

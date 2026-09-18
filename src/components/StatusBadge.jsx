import React from 'react';

const STATUS_CONFIG = {
  New: {
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-600 animate-pulse',
    label: 'New Inquiry',
  },
  Contacted: {
    color: 'bg-slate-900 text-white border-slate-800',
    dot: 'bg-blue-400',
    label: 'Contacted',
  },
  'In Progress': {
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    dot: 'bg-blue-600 animate-ping',
    label: 'In Progress',
  },
  Converted: {
    color: 'bg-blue-600 text-white border-blue-700',
    dot: 'bg-white',
    label: 'Converted',
  },
  Closed: {
    color: 'bg-slate-100 text-slate-600 border-slate-300',
    dot: 'bg-slate-400',
    label: 'Closed',
  },
};

export const StatusBadge = ({ status = 'New', className = '' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['New'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm transition-all ${config.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

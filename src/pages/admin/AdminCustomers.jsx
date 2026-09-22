import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { useInquiry } from '../../context/InquiryContext';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate, formatCurrency } from '../../utils/localStorage';
import { Search, MapPin, X, Eye } from 'lucide-react';

export const AdminCustomers = () => {
  const { customers } = useCustomer();
  const { inquiries } = useInquiry();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Customer Directory & Profiles
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
          Registered customer identities linked to incoming deal inquiries.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search customers by name, email, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">
          Registered Customers: <strong className="text-slate-900 dark:text-white">{customers.length}</strong>
        </span>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Interested Category & Budget</th>
                <th className="py-3.5 px-4">Queries Raised</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCustomers.map((c) => {
                const customerInquiries = inquiries.filter(
                  (i) => i.customerId === c.id || i.customerEmail === c.email
                );

                return (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-brand-600 border border-slate-800 flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-md">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 dark:text-white">{c.name}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">ID: {c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold">{c.email}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.phone || 'No phone'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        <span>
                          {c.city || 'N/A'}, {c.state || ''}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 dark:bg-slate-800 text-white border border-slate-800 dark:border-slate-700">
                        {c.category || 'All'}
                      </span>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono font-bold">{c.budget}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-700 dark:text-brand-300">
                        {customerInquiries.length} Queries
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer({ ...c, inquiries: customerInquiries })}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-brand-500 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        View Queries
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Inquiries Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-pop-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-brand-600 text-white border border-slate-800 flex items-center justify-center font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="heading-font text-lg font-extrabold text-slate-900 dark:text-white">
                    {selectedCustomer.name}'s Queries Raised
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCustomer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedCustomer.inquiries.length > 0 ? (
                selectedCustomer.inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          Product Inquiry
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{inq.productTitle}</h4>
                        <p className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400">
                          {formatCurrency(inq.productPrice)}
                        </p>
                      </div>
                      <StatusBadge status={inq.status} />
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic font-medium">
                      "{inq.message}"
                    </p>

                    {inq.adminNotes && (
                      <div className="text-xs text-blue-950 dark:text-blue-200 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 font-medium">
                        <strong className="block text-[10px] uppercase font-mono text-brand-600 dark:text-brand-400">
                          Admin Notes:
                        </strong>
                        {inq.adminNotes}
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between pt-1 font-medium">
                      <span>Submitted: {formatDate(inq.createdAt)}</span>
                      {inq.targetDate && <span>Target Date: {inq.targetDate}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
                  No product queries raised yet by this customer.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

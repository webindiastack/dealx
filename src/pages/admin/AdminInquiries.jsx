import React, { useState } from 'react';
import { useInquiry } from '../../context/InquiryContext';
import { StatusBadge } from '../../components/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/localStorage';
import {
  Search,
  Trash2,
  X,
} from 'lucide-react';

const STAGES = ['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

export const AdminInquiries = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useInquiry();

  const [selectedStage, setSelectedStage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [modalStatusInput, setModalStatusInput] = useState('New');

  const openDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotesInput(inquiry.adminNotes || '');
    setModalStatusInput(inquiry.status || 'New');
  };

  const saveInquiryModal = () => {
    if (selectedInquiry) {
      updateInquiryStatus(selectedInquiry.id, modalStatusInput, adminNotesInput);
      setSelectedInquiry(null);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (selectedStage !== 'All' && inq.status !== selectedStage) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const cName = inq.customerName.toLowerCase().includes(q);
      const cEmail = inq.customerEmail.toLowerCase().includes(q);
      const pTitle = inq.productTitle.toLowerCase().includes(q);
      const city = inq.customerCity.toLowerCase().includes(q);
      return cName || cEmail || pTitle || city;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Inquiry Pipeline Management
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
          Manage customer deal inquiries from lead generation to conversion.
        </p>
      </div>

      {/* Stage Tab Filters */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-wrap gap-1">
        {STAGES.map((stage) => {
          const count =
            stage === 'All' ? inquiries.length : inquiries.filter((i) => i.status === stage).length;
          const isSelected = selectedStage === stage;
          return (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{stage}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by customer name, email, product, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">
          Inquiries: <strong className="text-slate-900 dark:text-white">{filteredInquiries.length}</strong>
        </span>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Inquiry Note</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">{inq.customerName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{inq.customerEmail}</div>
                    <div className="text-[10px] text-brand-600 dark:text-brand-400 font-bold">
                      {inq.customerPhone} • {inq.customerCity}, {inq.customerState}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{inq.productTitle}</div>
                    <div className="text-[11px] font-mono text-brand-600 dark:text-brand-400 font-bold">
                      {formatCurrency(inq.productPrice)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-2 text-[11px] italic font-medium">
                      "{inq.message}"
                    </p>
                    {inq.adminNotes && (
                      <span className="inline-block mt-1 text-[10px] text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">
                        Notes: {inq.adminNotes}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px] font-mono font-medium">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openDetailModal(inq)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-brand-500 text-xs font-bold transition-colors"
                    >
                      Manage & Notes
                    </button>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500 transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-pop-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="heading-font text-lg font-extrabold text-slate-900 dark:text-white">
                  Inquiry Details & CRM Action
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Inquiry ID: {selectedInquiry.id}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                Customer Identity Details
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Name</span>
                  <strong className="text-slate-900 dark:text-white">{selectedInquiry.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Email</span>
                  <strong className="text-slate-900 dark:text-white truncate block">
                    {selectedInquiry.customerEmail}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Phone</span>
                  <strong className="text-slate-900 dark:text-white">{selectedInquiry.customerPhone}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Location</span>
                  <strong className="text-slate-900 dark:text-white">
                    {selectedInquiry.customerCity}, {selectedInquiry.customerState}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Customer Budget</span>
                  <strong className="text-brand-600 dark:text-brand-400">{selectedInquiry.customerBudget}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Target Date</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {selectedInquiry.targetDate || 'Flexible'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Product Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <img
                src={
                  selectedInquiry.productImage ||
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80'
                }
                alt=""
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0 text-xs">
                <span className="text-[10px] uppercase font-mono text-brand-600 dark:text-brand-400 font-bold">
                  {selectedInquiry.productCategory}
                </span>
                <h4 className="font-extrabold text-slate-900 dark:text-white truncate">{selectedInquiry.productTitle}</h4>
                <p className="font-mono font-extrabold text-brand-600 dark:text-brand-400">
                  {formatCurrency(selectedInquiry.productPrice)}
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Customer Note</label>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic font-medium">
                "{selectedInquiry.message}"
              </div>
            </div>

            {/* Status Changer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Update Pipeline Stage
                </label>
                <select
                  value={modalStatusInput}
                  onChange={(e) => setModalStatusInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Internal Admin CRM Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Test drive scheduled for Friday..."
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveInquiryModal}
                className="px-6 py-2.5 rounded-xl bg-brand-600 dark:bg-brand-500 text-white text-xs font-bold hover:bg-slate-900 dark:hover:bg-brand-600 shadow-md"
              >
                Save CRM Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

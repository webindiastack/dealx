import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../utils/localStorage';
import { INITIAL_INQUIRIES } from '../data/seedInquiries';
import { useToast } from './ToastContext';

const InquiryContext = createContext(null);

export const InquiryProvider = ({ children }) => {
  const { addToast } = useToast();

  const [inquiries, setInquiries] = useState(() => {
    const saved = getStoredData(STORAGE_KEYS.INQUIRIES, null);
    if (!saved || saved.length === 0) {
      setStoredData(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
      return INITIAL_INQUIRIES;
    }
    return saved;
  });

  useEffect(() => {
    setStoredData(STORAGE_KEYS.INQUIRIES, inquiries);
  }, [inquiries]);

  const createInquiry = ({ product, customer, message, targetDate }) => {
    if (!customer || !customer.name || !customer.email) {
      addToast('Customer profile is required to raise an inquiry.', 'error', 'Inquiry Failed');
      return null;
    }

    const newInquiry = {
      id: `inq-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
      productCategory: product.category,
      productImage: product.images?.[0] || '',
      customerId: customer.id || `cust-${Date.now()}`,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone || 'N/A',
      customerCity: customer.city || 'N/A',
      customerState: customer.state || 'N/A',
      customerBudget: customer.budget || 'Flexible',
      message: message || 'Interested in learning more about this item.',
      status: 'New', // New, Contacted, In Progress, Converted, Closed
      targetDate: targetDate || '',
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    addToast(
      `Your inquiry for "${product.title}" has been submitted! An admin will contact you shortly.`,
      'success',
      'Inquiry Submitted'
    );

    return newInquiry;
  };

  const updateInquiryStatus = (id, newStatus, adminNotes = null) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          return {
            ...inq,
            status: newStatus,
            adminNotes: adminNotes !== null ? adminNotes : inq.adminNotes,
            updatedAt: new Date().toISOString(),
          };
        }
        return inq;
      })
    );

    addToast(`Inquiry status updated to "${newStatus}"`, 'info', 'Pipeline Updated');
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    addToast('Inquiry has been deleted.', 'warning', 'Inquiry Removed');
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        createInquiry,
        updateInquiryStatus,
        deleteInquiry,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from '../utils/localStorage';
import { INITIAL_CUSTOMERS } from '../data/seedCustomers';
import { useToast } from './ToastContext';

const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const { addToast } = useToast();
  
  const [customers, setCustomers] = useState(() => {
    const saved = getStoredData(STORAGE_KEYS.CUSTOMERS, null);
    if (!saved || saved.length === 0) {
      setStoredData(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
      return INITIAL_CUSTOMERS;
    }
    return saved;
  });

  const [activeCustomer, setActiveCustomer] = useState(() => {
    const savedActive = getStoredData(STORAGE_KEYS.ACTIVE_CUSTOMER, null);
    if (savedActive) return savedActive;
    // Default fallback to first customer if available, or null
    return customers.length > 0 ? customers[0] : null;
  });

  useEffect(() => {
    setStoredData(STORAGE_KEYS.CUSTOMERS, customers);
  }, [customers]);

  useEffect(() => {
    if (activeCustomer) {
      setStoredData(STORAGE_KEYS.ACTIVE_CUSTOMER, activeCustomer);
    } else {
      removeStoredData(STORAGE_KEYS.ACTIVE_CUSTOMER);
    }
  }, [activeCustomer]);

  const saveCustomer = (data) => {
    const isUpdate = activeCustomer && activeCustomer.id;
    const customerId = isUpdate ? activeCustomer.id : `cust-${Date.now()}`;

    const newCustomerObj = {
      id: customerId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      category: data.category || 'all',
      budget: data.budget || 'Flexible',
      details: data.details || '',
      createdAt: isUpdate ? activeCustomer.createdAt : new Date().toISOString(),
    };

    // Update customers list
    setCustomers((prev) => {
      const exists = prev.some((c) => c.id === customerId);
      if (exists) {
        return prev.map((c) => (c.id === customerId ? newCustomerObj : c));
      }
      return [newCustomerObj, ...prev];
    });

    setActiveCustomer(newCustomerObj);

    addToast(
      isUpdate ? 'Your customer profile has been updated!' : 'Customer registration complete! Welcome to DealingApp.',
      'success',
      isUpdate ? 'Profile Saved' : 'Welcome!'
    );

    return newCustomerObj;
  };

  const switchCustomer = (customer) => {
    setActiveCustomer(customer);
    addToast(`Switched profile to ${customer.name}`, 'info', 'Profile Changed');
  };

  const logoutCustomer = () => {
    setActiveCustomer(null);
    removeStoredData(STORAGE_KEYS.ACTIVE_CUSTOMER);
    addToast('Customer session ended', 'info', 'Logged Out');
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        activeCustomer,
        saveCustomer,
        switchCustomer,
        logoutCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

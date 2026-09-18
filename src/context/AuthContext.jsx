import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, setStoredData, removeStoredData, STORAGE_KEYS } from '../utils/localStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [isAdmin, setIsAdmin] = useState(() => {
    return getStoredData(STORAGE_KEYS.ADMIN_AUTH, false);
  });

  const [adminUser, setAdminUser] = useState(() => {
    return isAdmin
      ? { email: 'admin@dealing.com', name: 'Executive Admin', role: 'Super Admin' }
      : null;
  });

  const loginAdmin = (email, password) => {
    if (email === 'admin@dealing.com' && password === 'admin123') {
      setIsAdmin(true);
      const user = { email, name: 'Executive Admin', role: 'Super Admin' };
      setAdminUser(user);
      setStoredData(STORAGE_KEYS.ADMIN_AUTH, true);
      addToast('Welcome back, Executive Admin!', 'success', 'Admin Portal Access');
      return true;
    } else {
      addToast('Invalid admin credentials. Use admin@dealing.com / admin123', 'error', 'Login Failed');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    removeStoredData(STORAGE_KEYS.ADMIN_AUTH);
    addToast('Admin session ended.', 'info', 'Logged Out');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminUser, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

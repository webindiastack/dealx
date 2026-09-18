import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { ProductProvider } from './context/ProductContext';
import { InquiryProvider } from './context/InquiryContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomerModal } from './components/CustomerModal';
import { InquiryModal } from './components/InquiryModal';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { CustomerInquiry } from './pages/CustomerInquiry';

import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminInquiries } from './pages/admin/AdminInquiries';

import { ShieldCheck, LayoutDashboard, Package, Users, MessageSquare, LogOut } from 'lucide-react';

// Protected Admin Layout component
const AdminLayout = ({ children }) => {
  const { isAdmin, logoutAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Top Navigation Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <span className="heading-font text-sm font-bold text-slate-900">Executive CRM Admin</span>
        </div>

        {/* Sub-nav tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <Link
            to="/admin"
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isActive('/admin')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Overview
          </Link>
          <Link
            to="/admin/products"
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isActive('/admin/products')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Products
          </Link>
          <Link
            to="/admin/customers"
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isActive('/admin/customers')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Customers
          </Link>
          <Link
            to="/admin/inquiries"
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isActive('/admin/inquiries')
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Inquiries
          </Link>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" /> Exit Admin
        </button>
      </div>

      {children}
    </div>
  );
};

export function AppContent() {
  const { activeCustomer } = useCustomer();
  const location = useLocation();

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  // First load popup trigger logic
  useEffect(() => {
    const hasSeenPop = sessionStorage.getItem('dealing_app_has_seen_pop');
    if (!hasSeenPop && location.pathname === '/') {
      const timer = setTimeout(() => {
        setIsFirstVisit(true);
        setCustomerModalOpen(true);
        sessionStorage.setItem('dealing_app_has_seen_pop', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleRaiseInquiry = (product) => {
    setInquiryProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar
        onOpenCustomerModal={() => {
          setIsFirstVisit(false);
          setCustomerModalOpen(true);
        }}
      />

      <main className="flex-1">
        <Routes>
          {/* Customer Routes */}
          <Route
            path="/"
            element={
              <Home
                onRaiseInquiry={handleRaiseInquiry}
                onOpenCustomerModal={() => {
                  setIsFirstVisit(false);
                  setCustomerModalOpen(true);
                }}
              />
            }
          />
          <Route path="/inquiry" element={<CustomerInquiry />} />
          <Route
            path="/products"
            element={<Products onRaiseInquiry={handleRaiseInquiry} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails onRaiseInquiry={handleRaiseInquiry} />}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <AdminLayout>
                <AdminCustomers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <CustomerModal
        isOpen={customerModalOpen}
        isFirstVisit={isFirstVisit}
        onClose={() => setCustomerModalOpen(false)}
      />

      <InquiryModal
        product={inquiryProduct}
        isOpen={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        onOpenCustomerModal={() => {
          setInquiryProduct(null);
          setIsFirstVisit(false);
          setCustomerModalOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CustomerProvider>
          <ProductProvider>
            <InquiryProvider>
              <AppContent />
            </InquiryProvider>
          </ProductProvider>
        </CustomerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

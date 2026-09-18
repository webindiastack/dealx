import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, Key } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const [email, setEmail] = useState('admin@dealing.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mx-auto shadow-sm">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="heading-font text-2xl font-extrabold text-slate-900">Admin CRM Portal</h1>
          <p className="text-xs text-slate-500 font-medium">Enter executive credentials to manage products and inquiries.</p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>Default Prototype Credentials:</span>
          </div>
          <p className="text-[11px] font-mono font-semibold text-blue-300">Email: admin@dealing.com</p>
          <p className="text-[11px] font-mono font-semibold text-blue-300">Password: admin123</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-slate-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Authenticate Admin Session
          </button>
        </form>
      </div>
    </div>
  );
};

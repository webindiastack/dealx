import React from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../../context/InquiryContext';
import { useCustomer } from '../../context/CustomerContext';
import { useProducts } from '../../context/ProductContext';
import { StatusBadge } from '../../components/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/localStorage';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  MessageSquare,
  DollarSign,
  ArrowRight,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';

const COLORS = ['#0284c7', '#0f172a', '#64748b', '#0369a1', '#94a3b8'];

export const Dashboard = () => {
  const { inquiries, updateInquiryStatus } = useInquiry();
  const { customers } = useCustomer();
  const { products, resetAllData } = useProducts();

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const convertedInquiries = inquiries.filter((i) => i.status === 'Converted').length;
  const inProgressInquiries = inquiries.filter((i) => i.status === 'In Progress').length;

  const conversionRate = totalInquiries > 0 ? ((convertedInquiries / totalInquiries) * 100).toFixed(1) : 0;
  const totalRevenuePotential = inquiries.reduce((sum, i) => sum + (Number(i.productPrice) || 0), 0);

  const statusCounts = {
    New: inquiries.filter((i) => i.status === 'New').length,
    Contacted: inquiries.filter((i) => i.status === 'Contacted').length,
    'In Progress': inquiries.filter((i) => i.status === 'In Progress').length,
    Converted: inquiries.filter((i) => i.status === 'Converted').length,
    Closed: inquiries.filter((i) => i.status === 'Closed').length,
  };

  const statusChartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const categoryCounts = {
    cars: inquiries.filter((i) => i.productCategory === 'cars').length,
    bikes: inquiries.filter((i) => i.productCategory === 'bikes').length,
    electronics: inquiries.filter((i) => i.productCategory === 'electronics').length,
    other: inquiries.filter((i) => i.productCategory === 'other').length,
  };

  const categoryChartData = [
    { name: 'Cars', value: categoryCounts.cars },
    { name: 'Bikes', value: categoryCounts.bikes },
    { name: 'Electronics', value: categoryCounts.electronics },
    { name: 'Other', value: categoryCounts.other },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-font text-2xl sm:text-3xl font-extrabold text-slate-900">
            CRM Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time analytics for customer deal inquiries and inventory pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products?add=true"
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Add Product
          </Link>
          <button
            onClick={resetAllData}
            title="Reset LocalStorage to fresh demo data"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Total Inquiries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">Total Deal Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-600 border border-blue-200 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 heading-font">{totalInquiries}</p>
          <div className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
            <span className="text-brand-600 font-bold">{newInquiries} New</span>
            <span>•</span>
            <span className="text-slate-700 font-bold">{inProgressInquiries} Active</span>
          </div>
        </div>

        {/* Stat 2: Active Customers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">Registered Customers</span>
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 heading-font">{customers.length}</p>
          <p className="text-[11px] text-brand-600 font-bold">100% Attached to Inquiries</p>
        </div>

        {/* Stat 3: Pipeline Value */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">Pipeline Value</span>
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 heading-font">
            {formatCurrency(totalRevenuePotential)}
          </p>
          <p className="text-[11px] text-slate-600 font-bold">Total Deal Interest Sum</p>
        </div>

        {/* Stat 4: Conversion Rate */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">Conversion Rate</span>
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 heading-font">{conversionRate}%</p>
          <p className="text-[11px] text-brand-600 font-bold">{convertedInquiries} Deals Converted</p>
        </div>
      </div>

      {/* Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-slate-900">Inquiry Pipeline Stages</h3>
            <p className="text-xs text-slate-500">Distribution of customer deal progress</p>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-slate-900">Inquiries by Category</h3>
            <p className="text-xs text-slate-500">Buyer demand per product segment</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            {categoryChartData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-slate-700 font-bold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Feed */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="heading-font text-lg font-bold text-slate-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-slate-500">Latest activity linked to registered customers</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs text-brand-600 hover:underline font-bold flex items-center gap-1"
          >
            <span>Manage All Pipeline Inquiries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 uppercase font-mono tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Date Submitted</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900">{inq.customerName}</div>
                    <div className="text-[11px] text-slate-500">{inq.customerEmail}</div>
                    <div className="text-[10px] text-brand-600 font-semibold">{inq.customerCity}, {inq.customerState}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-800 truncate">{inq.productTitle}</div>
                    <div className="text-[11px] text-cyan-700 font-mono font-bold">
                      {formatCurrency(inq.productPrice)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-800 focus:outline-none focus:border-brand-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

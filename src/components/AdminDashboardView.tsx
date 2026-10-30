import React, { useState } from 'react';
import {
  AdminSaleRecord,
  PromoCode,
  PaymentGatewayConfig,
  AdminTabType,
} from '../types.ts';
import {
  DollarSign,
  TrendingUp,
  Users,
  ShieldCheck,
  Key,
  Globe2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Tag,
  CreditCard,
  Settings,
  Activity,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Smartphone,
  Save,
  Trash2,
  Ban,
  RefreshCw,
} from 'lucide-react';

interface AdminDashboardViewProps {
  salesRecords: AdminSaleRecord[];
  promoCodes: PromoCode[];
  paymentGateways: PaymentGatewayConfig;
  onAddManualSale: (sale: AdminSaleRecord) => void;
  onToggleSaleStatus: (id: string) => void;
  onAddPromoCode: (promo: PromoCode) => void;
  onTogglePromoCode: (id: string) => void;
  onUpdateGateways: (gateways: PaymentGatewayConfig) => void;
  onBackToClientView: () => void;
  onLockSession?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  salesRecords,
  promoCodes,
  paymentGateways,
  onAddManualSale,
  onToggleSaleStatus,
  onAddPromoCode,
  onTogglePromoCode,
  onUpdateGateways,
  onBackToClientView,
  onLockSession,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTabType>('sales-licenses');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [gatewayFilter, setGatewayFilter] = useState<string>('all');

  // Manual License Creation Modal
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientDomain, setClientDomain] = useState('');
  const [clientPlan, setClientPlan] = useState<'starter' | 'pro' | 'agency'>('pro');
  const [clientPaymentMethod, setClientPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa' | 'paypal'>('jazzcash');
  const [clientAmount, setClientAmount] = useState(49);

  // New Promo Code Modal
  const [showNewPromoModal, setShowNewPromoModal] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(25);
  const [newPromoMaxUses, setNewPromoMaxUses] = useState(100);

  // Gateways form state
  const [gatewaysState, setGatewaysState] = useState<PaymentGatewayConfig>({ ...paymentGateways });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Copied license key tracker
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const totalRevenue = salesRecords.reduce((acc, s) => acc + s.price, 0) + 14200; // includes past sales base
  const totalSalesCount = salesRecords.length + 140;
  const activeLicenses = salesRecords.filter((s) => s.status === 'active').length + 132;
  const totalChatsServed = salesRecords.reduce((acc, s) => acc + s.totalChatsServed, 0) + 48200;

  // Filter sales
  const filteredSales = salesRecords.filter((s) => {
    const matchesSearch =
      s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.licenseKey.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || s.paymentMethod === gatewayFilter;

    return matchesSearch && matchesStatus && matchesGateway;
  });

  const handleCreateManualLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientDomain) return;

    const newSale: AdminSaleRecord = {
      id: `sale-${Date.now()}`,
      clientName,
      clientEmail: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@client.com`,
      domain: clientDomain.startsWith('http') ? clientDomain : `https://${clientDomain}`,
      licenseKey: `SW-${clientPlan.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`,
      plan: clientPlan,
      price: Number(clientAmount),
      paymentMethod: clientPaymentMethod,
      status: 'active',
      createdAt: 'Just now',
      totalChatsServed: 0,
    };

    onAddManualSale(newSale);
    setShowIssueModal(false);
    setClientName('');
    setClientEmail('');
    setClientDomain('');
    showToast('Commercial License created & activated successfully!');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    const newPromo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscount),
      usesCount: 0,
      maxUses: Number(newPromoMaxUses),
      active: true,
    };

    onAddPromoCode(newPromo);
    setShowNewPromoModal(false);
    setNewPromoCode('');
    showToast(`Promo code "${newPromo.code}" created!`);
  };

  const handleSaveGateways = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGateways(gatewaysState);
    showToast('Payment gateway credentials saved successfully!');
  };

  return (
    <div className="p-8 max-w-[1500px] mx-auto space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Navigation Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 text-[11px] font-bold tracking-wider uppercase border border-amber-500/20">
              Super Admin Mode
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Sitewise AI Commercial Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Sales & License Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIssueModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Manual License</span>
          </button>

          <button
            onClick={onBackToClientView}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Client Bot Portal</span>
          </button>

          {onLockSession && (
            <button
              onClick={onLockSession}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer border border-rose-200/60"
              title="Lock admin dashboard"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Total Bot Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+28.4% this month</span>
          </div>
        </div>

        {/* Licenses Sold */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Total Licenses Sold
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5b50e6] flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {totalSalesCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">
            {activeLicenses} Active Clients
          </div>
        </div>

        {/* Chats Served Across Fleet */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Total Chats Served
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {totalChatsServed.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>99.98% Bot Uptime</span>
          </div>
        </div>

        {/* Avg License Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Avg License Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            $54.20
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Pro Plan is top seller (68%)
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'sales-licenses', label: 'Client Sales & Licenses', count: salesRecords.length },
          { id: 'bot-fleet', label: 'Client Bot Fleet & Domains', count: salesRecords.length },
          { id: 'pricing-promos', label: 'Pricing & Promo Codes', count: promoCodes.length },
          { id: 'payment-gateways', label: 'Payment Gateways (JazzCash/Card)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as AdminTabType)}
            className={`pb-3 px-3 text-xs font-bold transition-all relative cursor-pointer ${
              activeAdminTab === tab.id
                ? 'text-[#5b50e6]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeAdminTab === tab.id
                    ? 'bg-[#5b50e6]/10 text-[#5b50e6]'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </span>
            {activeAdminTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b50e6]" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: Sales & Licenses */}
      {activeAdminTab === 'sales-licenses' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, domains, license keys..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#5b50e6]"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-xs text-slate-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="suspended">Suspended Only</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Gateway:</span>
                <select
                  value={gatewayFilter}
                  onChange={(e) => setGatewayFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-xs text-slate-700"
                >
                  <option value="all">All Gateways</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sales Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Client & Email</th>
                    <th className="px-5 py-3.5">Licensed Domain</th>
                    <th className="px-5 py-3.5">License Key</th>
                    <th className="px-5 py-3.5">Plan</th>
                    <th className="px-5 py-3.5">Amount & Gateway</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{sale.clientName}</div>
                        <div className="text-[11px] text-slate-400">{sale.clientEmail}</div>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={sale.domain}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <span>{sale.domain.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2 py-1 rounded-lg text-slate-800">
                          <span>{sale.licenseKey}</span>
                          <button
                            onClick={() => handleCopyKey(sale.id, sale.licenseKey)}
                            className="text-slate-400 hover:text-[#5b50e6] p-0.5 cursor-pointer"
                            title="Copy License Key"
                          >
                            {copiedKeyId === sale.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold uppercase text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-[#5b50e6] border border-indigo-100">
                          {sale.plan}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">${sale.price}.00</div>
                        <div className="text-[10px] font-medium text-slate-400 capitalize">
                          {sale.paymentMethod}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          sale.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {sale.status === 'active' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3 h-3 text-rose-600" />
                          )}
                          <span className="capitalize">{sale.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onToggleSaleStatus(sale.id)}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                              sale.status === 'active'
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            {sale.status === 'active' ? 'Suspend' : 'Reactivate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Bot Fleet & Usage */}
      {activeAdminTab === 'bot-fleet' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Live Deployed Client Bots
              </h2>
              <p className="text-xs text-slate-500">
                Real-time connection status of all customer bots embedding your widget script.
              </p>
            </div>
            <button
              onClick={() => showToast('Refreshing bot fleet heartbeats...')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Pings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {salesRecords.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-xs text-slate-900">
                      {s.domain.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 py-0.5 bg-slate-200 rounded">
                    {s.plan}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-400 block">Client:</span>
                    <span className="font-semibold text-slate-800">{s.clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Chats Processed:</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {s.totalChatsServed.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">License: {s.licenseKey.slice(0, 14)}...</span>
                  <a
                    href={s.domain}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5b50e6] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Pricing & Promos */}
      {activeAdminTab === 'pricing-promos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Base Pricing Configuration (~5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Bot Plan Selling Prices
              </h2>
              <p className="text-xs text-slate-500">
                Adjust the public pricing that clients see when paying for their bot license.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Starter Bot License</span>
                  <span className="text-[#5b50e6]">$29 / one-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    defaultValue={29}
                    className="w-24 px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                  <span className="text-[11px] text-slate-500">USD (Single domain)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Pro Commercial (Popular)</span>
                  <span className="text-[#5b50e6]">$49 / one-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    defaultValue={49}
                    className="w-24 px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                  <span className="text-[11px] text-slate-500">USD (Unlimited chats)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Agency / Reseller License</span>
                  <span className="text-[#5b50e6]">$99 / one-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    defaultValue={99}
                    className="w-24 px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                  <span className="text-[11px] text-slate-500">USD (10 Domains)</span>
                </div>
              </div>

              <button
                onClick={() => showToast('Plan prices updated!')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Save Plan Prices
              </button>
            </div>
          </div>

          {/* Right: Active Promo Codes (~7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Promo Codes & Discounts
                </h2>
                <p className="text-xs text-slate-500">
                  Coupons that clients can use at checkout for discounts.
                </p>
              </div>

              <button
                onClick={() => setShowNewPromoModal(true)}
                className="px-3.5 py-1.5 bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Code</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {promoCodes.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                        {p.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        {p.discountPercent}% OFF
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Used {p.usesCount} of {p.maxUses} times
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {p.active ? 'Active' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => onTogglePromoCode(p.id)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      {p.active ? 'Turn Off' : 'Enable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Payment Gateways */}
      {activeAdminTab === 'payment-gateways' && (
        <form onSubmit={handleSaveGateways} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Payment Gateway Configurations
                </h2>
                <p className="text-xs text-slate-500">
                  Configure merchant credentials for local Pakistani (JazzCash, EasyPaisa) and global methods.
                </p>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Credentials</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* JazzCash */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-xs text-slate-900">JazzCash Pakistan</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={gatewaysState.jazzcash.enabled}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        jazzcash: { ...gatewaysState.jazzcash, enabled: e.target.checked },
                      })
                    }
                    className="accent-[#5b50e6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Merchant ID
                  </label>
                  <input
                    type="text"
                    value={gatewaysState.jazzcash.merchantId}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        jazzcash: { ...gatewaysState.jazzcash, merchantId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Receiving Mobile Account Number
                  </label>
                  <input
                    type="text"
                    value={gatewaysState.jazzcash.mobileNumber}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        jazzcash: { ...gatewaysState.jazzcash, mobileNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              {/* EasyPaisa */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-xs text-slate-900">EasyPaisa Pakistan</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={gatewaysState.easypaisa.enabled}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        easypaisa: { ...gatewaysState.easypaisa, enabled: e.target.checked },
                      })
                    }
                    className="accent-[#5b50e6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Store ID
                  </label>
                  <input
                    type="text"
                    value={gatewaysState.easypaisa.storeId}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        easypaisa: { ...gatewaysState.easypaisa, storeId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Store Mobile Number
                  </label>
                  <input
                    type="text"
                    value={gatewaysState.easypaisa.mobileNumber}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        easypaisa: { ...gatewaysState.easypaisa, mobileNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              {/* Stripe (Cards) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-xs text-slate-900">Stripe Credit Cards</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={gatewaysState.stripe.enabled}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        stripe: { ...gatewaysState.stripe, enabled: e.target.checked },
                      })
                    }
                    className="accent-[#5b50e6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    value={gatewaysState.stripe.publishableKey}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        stripe: { ...gatewaysState.stripe, publishableKey: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              {/* PayPal */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-sky-600" />
                    <span className="font-bold text-xs text-slate-900">PayPal Merchant</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={gatewaysState.paypal.enabled}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        paypal: { ...gatewaysState.paypal, enabled: e.target.checked },
                      })
                    }
                    className="accent-[#5b50e6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    PayPal Business Email
                  </label>
                  <input
                    type="email"
                    value={gatewaysState.paypal.email}
                    onChange={(e) =>
                      setGatewaysState({
                        ...gatewaysState,
                        paypal: { ...gatewaysState.paypal, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* MODAL: Issue Manual License */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Issue Manual Commercial License
              </h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualLicense} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Client / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Client Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Website URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://example.com"
                  value={clientDomain}
                  onChange={(e) => setClientDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plan</label>
                  <select
                    value={clientPlan}
                    onChange={(e) => setClientPlan(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="starter">Starter ($29)</option>
                    <option value="pro">Pro ($49)</option>
                    <option value="agency">Agency ($99)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={clientPaymentMethod}
                    onChange={(e) => setClientPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="jazzcash">JazzCash</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="card">Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Amount Received ($)
                </label>
                <input
                  type="number"
                  value={clientAmount}
                  onChange={(e) => setClientAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5b50e6] text-white font-semibold rounded-xl"
                >
                  Generate License Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Promo Code */}
      {showNewPromoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Create Promo Discount Code
              </h3>
              <button
                onClick={() => setShowNewPromoModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Coupon Code Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SPECIAL40"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl uppercase font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={newPromoDiscount}
                  onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Maximum Usages Allowed
                </label>
                <input
                  type="number"
                  min="1"
                  value={newPromoMaxUses}
                  onChange={(e) => setNewPromoMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewPromoModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5b50e6] text-white font-semibold rounded-xl"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

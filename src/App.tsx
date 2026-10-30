import React, { useState } from 'react';
import {
  TabType,
  ChatbotConfig,
  CrawledWebsite,
  AnalyticsMetric,
  BotLicense,
  AppRole,
  AdminSaleRecord,
  PromoCode,
  PaymentGatewayConfig,
} from './types.ts';
import {
  initialChatbotConfig,
  initialWebsites,
  initialAnalytics,
  initialConversations,
  initialSalesRecords,
  initialPromoCodes,
  initialPaymentGateways,
} from './data/mockData.ts';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { WebsitesView } from './components/WebsitesView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { InstallWidgetView } from './components/InstallWidgetView.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { WebsiteLiveModal } from './components/WebsiteLiveModal.tsx';
import { PaymentModal } from './components/PaymentModal.tsx';
import { AdminDashboardView } from './components/AdminDashboardView.tsx';
import { AdminLoginModal } from './components/AdminLoginModal.tsx';

export default function App() {
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  const getInitialRole = (): AppRole => {
    if (typeof window !== 'undefined') {
      const isAuthed = sessionStorage.getItem('sitewise_admin_auth') === 'true';
      const params = new URLSearchParams(window.location.search);
      if ((params.get('admin') === 'true' || window.location.hash === '#admin') && isAuthed) {
        return 'admin';
      }
    }
    return 'client';
  };

  const [role, setRoleState] = useState<AppRole>(getInitialRole);

  const handleSetRole = (newRole: AppRole) => {
    if (newRole === 'admin') {
      const isAuthed = sessionStorage.getItem('sitewise_admin_auth') === 'true';
      if (!isAuthed) {
        setIsAdminAuthModalOpen(true);
        return;
      }
    }

    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newRole === 'admin') {
        url.searchParams.set('admin', 'true');
      } else {
        url.searchParams.delete('admin');
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthModalOpen(false);
    setRoleState('admin');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('admin', 'true');
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleLockAdminSession = () => {
    sessionStorage.removeItem('sitewise_admin_auth');
    handleSetRole('client');
  };

  React.useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || window.location.hash === '#admin') {
        setRoleState('admin');
      } else {
        setRoleState('client');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [config, setConfig] = useState<ChatbotConfig>(initialChatbotConfig);
  const [websites, setWebsites] = useState<CrawledWebsite[]>(initialWebsites);
  const [metrics, setMetrics] = useState<AnalyticsMetric>(initialAnalytics);
  const [conversations, setConversations] = useState(initialConversations);
  
  // Admin Data State
  const [salesRecords, setSalesRecords] = useState<AdminSaleRecord[]>(initialSalesRecords);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(initialPromoCodes);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewayConfig>(initialPaymentGateways);

  // Bot Commercial License State (Selling the bot)
  const [license, setLicense] = useState<BotLicense>({
    isPurchased: false,
    licenseKey: '',
    plan: 'pro',
    buyerName: 'Demo Client',
    buyerEmail: 'client@example.com',
    targetDomain: 'https://www.example.com',
    amountPaid: 0,
    purchaseDate: '',
    paymentMethod: 'card',
  });

  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddWebsite = (newSite: CrawledWebsite) => {
    setWebsites([newSite, ...websites]);
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites(websites.filter((s) => s.id !== id));
  };

  const handleReindex = (id: string) => {
    setWebsites(
      websites.map((s) =>
        s.id === id
          ? {
              ...s,
              lastIndexed: 'Just now',
              contentChunks: s.contentChunks + Math.floor(Math.random() * 8) + 2,
            }
          : s
      )
    );
  };

  // Quick toggle between demo paid and unpaid state for client testing
  const handleToggleLicenseTest = () => {
    if (license.isPurchased) {
      setLicense({
        ...license,
        isPurchased: false,
        licenseKey: '',
      });
    } else {
      setLicense({
        isPurchased: true,
        licenseKey: 'SW-PRO-8942-X9B2-2026',
        plan: 'pro',
        buyerName: 'Ahmed Khan',
        buyerEmail: 'ahmed@example.com',
        targetDomain: 'https://www.example.com',
        amountPaid: 49,
        purchaseDate: new Date().toLocaleDateString('en-US'),
        paymentMethod: 'jazzcash',
      });
    }
  };

  // When client completes payment in the modal, sync with client license and admin sales records!
  const handlePaymentSuccess = (newLicense: BotLicense) => {
    setLicense(newLicense);

    // Auto record in Admin Sales
    const newSaleRecord: AdminSaleRecord = {
      id: `sale-${Date.now()}`,
      clientName: newLicense.buyerName,
      clientEmail: newLicense.buyerEmail,
      domain: newLicense.targetDomain,
      licenseKey: newLicense.licenseKey,
      plan: newLicense.plan,
      price: newLicense.amountPaid,
      paymentMethod: newLicense.paymentMethod,
      status: 'active',
      createdAt: 'Just now',
      totalChatsServed: 0,
    };

    setSalesRecords([newSaleRecord, ...salesRecords]);
  };

  // Admin Actions
  const handleAddManualSale = (sale: AdminSaleRecord) => {
    setSalesRecords([sale, ...salesRecords]);
  };

  const handleToggleSaleStatus = (id: string) => {
    setSalesRecords(
      salesRecords.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' }
          : s
      )
    );
  };

  const handleAddPromoCode = (promo: PromoCode) => {
    setPromoCodes([promo, ...promoCodes]);
  };

  const handleTogglePromoCode = (id: string) => {
    setPromoCodes(
      promoCodes.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row antialiased">
      {/* Left Sidebar Navigation with Admin Console Link */}
      <Sidebar
        activeTab={activeTab}
        role={role}
        onSelectTab={setActiveTab}
        onToggleRole={handleSetRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          role={role}
          onToggleRole={handleSetRole}
          onOpenLivePreview={() => setIsLiveModalOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {/* SUPER ADMIN CONSOLE */}
          {role === 'admin' ? (
            <AdminDashboardView
              salesRecords={salesRecords}
              promoCodes={promoCodes}
              paymentGateways={paymentGateways}
              onAddManualSale={handleAddManualSale}
              onToggleSaleStatus={handleToggleSaleStatus}
              onAddPromoCode={handleAddPromoCode}
              onTogglePromoCode={handleTogglePromoCode}
              onUpdateGateways={setPaymentGateways}
              onBackToClientView={() => handleSetRole('client')}
              onLockSession={handleLockAdminSession}
            />
          ) : (
            /* CLIENT CHATBOT BUILDER */
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  config={config}
                  license={license}
                  onUpdateConfig={setConfig}
                  onNavigateTab={setActiveTab}
                  onOpenLiveModal={() => setIsLiveModalOpen(true)}
                  onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                  onToggleLicenseTest={handleToggleLicenseTest}
                />
              )}

              {activeTab === 'websites' && (
                <WebsitesView
                  websites={websites}
                  onAddWebsite={handleAddWebsite}
                  onDeleteWebsite={handleDeleteWebsite}
                  onReindex={handleReindex}
                />
              )}

              {activeTab === 'chatbot-settings' && (
                <SettingsView config={config} onUpdateConfig={setConfig} />
              )}

              {activeTab === 'install-widget' && (
                <InstallWidgetView
                  config={config}
                  license={license}
                  onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView
                  metrics={metrics}
                  conversations={conversations}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Interactive Full Live Browser Modal */}
      <WebsiteLiveModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        config={config}
        url={websites[0]?.url || 'https://www.example.com'}
      />

      {/* Bot Purchase & Payment Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        initialDomain={websites[0]?.url || 'https://www.example.com'}
      />

      {/* Master Admin PIN Security Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { ChatbotConfig, BotLicense, TabType } from '../types.ts';
import {
  Lock,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Tag,
  Globe2,
  Code2,
  ArrowLeft,
  Info,
  DollarSign,
  User,
  Mail,
  Smartphone,
  ArrowRight,
  Download,
} from 'lucide-react';

interface BuyAndInstallPageProps {
  config: ChatbotConfig;
  license: BotLicense;
  onNavigateTab: (tab: TabType) => void;
  onPaymentSuccess: (license: BotLicense) => void;
  onToggleLicenseTest: () => void;
}

type PlatformTab = 'html' | 'react' | 'wordpress' | 'webflow' | 'shopify';

export const BuyAndInstallPage: React.FC<BuyAndInstallPageProps> = ({
  config,
  license,
  onNavigateTab,
  onPaymentSuccess,
  onToggleLicenseTest,
}) => {
  // Plan Selection
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'agency'>(license.plan || 'pro');
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa' | 'paypal'>('jazzcash');

  // Customer Form
  const [clientName, setClientName] = useState(license.buyerName || 'Ahmed Khan');
  const [clientEmail, setClientEmail] = useState(license.buyerEmail || 'ahmed@example.com');
  const [targetDomain, setTargetDomain] = useState(license.targetDomain || 'https://www.example.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [mobileWalletNumber, setMobileWalletNumber] = useState('0300 1234567');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<PlatformTab>('html');

  // Allowed domains
  const [allowedDomains, setAllowedDomains] = useState([
    'https://www.example.com',
    'https://acmecorp.com',
  ]);
  const [newDomain, setNewDomain] = useState('');

  const planPrices = {
    starter: { 'one-time': 29, monthly: 19 },
    pro: { 'one-time': 49, monthly: 39 },
    agency: { 'one-time': 99, monthly: 79 },
  };

  const basePrice = planPrices[selectedPlan][billingCycle];
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = Math.max(basePrice - discountAmount, 0);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SITEWISE50' || code === 'SAVE50') {
      setDiscountPercent(50);
      setPromoMessage('50% Discount applied! 🎉');
    } else if (code === 'PROMO20' || code === 'OFFER20') {
      setDiscountPercent(20);
      setPromoMessage('20% Discount applied! 🎉');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code. Try "SITEWISE50"');
    }
  };

  const handlePayAndUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedKey = `SW-${selectedPlan.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      
      const newLicense: BotLicense = {
        isPurchased: true,
        licenseKey: generatedKey,
        plan: selectedPlan,
        buyerName: clientName,
        buyerEmail: clientEmail,
        targetDomain,
        amountPaid: finalPrice,
        purchaseDate: new Date().toLocaleDateString('en-US'),
        paymentMethod,
      };

      setIsProcessing(false);
      onPaymentSuccess(newLicense);
    }, 1200);
  };

  const botId = 'sb-bot-98421b8';
  const cdnUrl = 'https://cdn.sitewise.ai/widget.v1.js';
  const activeKey = license.isPurchased ? license.licenseKey : 'PURCHASE_REQUIRED';

  const snippets: Record<PlatformTab, string> = {
    html: `<!-- Sitewise AI Chatbot Widget (License: ${activeKey}) -->
<script
  src="${cdnUrl}"
  data-chatbot-id="${botId}"
  data-license-key="${activeKey}"
  data-domain="${license.targetDomain || targetDomain}"
  data-theme="${config.themeColor}"
  data-position="${config.chatPosition.toLowerCase().replace(' ', '-')}"
  defer
></script>`,
    react: `// In your React / Next.js root layout (app/layout.tsx or _app.tsx)
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="${cdnUrl}"
          data-chatbot-id="${botId}"
          data-license-key="${activeKey}"
          data-theme="${config.themeColor}"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}`,
    wordpress: `<!-- 1. Go to WordPress Admin -> Appearance -> Theme File Editor
     2. Open footer.php and paste right before </body> -->
<script
  src="${cdnUrl}"
  data-chatbot-id="${botId}"
  data-license-key="${activeKey}"
  defer
></script>`,
    webflow: `<!-- 1. Go to Project Settings -> Custom Code -> Footer Code
     2. Paste the snippet below and Publish -->
<script
  src="${cdnUrl}"
  data-chatbot-id="${botId}"
  data-license-key="${activeKey}"
  data-theme="${config.themeColor}"
  defer
></script>`,
    shopify: `<!-- 1. Go to Online Store -> Themes -> Actions -> Edit Code
     2. In theme.liquid, paste directly before </body> -->
<script
  src="${cdnUrl}"
  data-chatbot-id="${botId}"
  data-license-key="${activeKey}"
  defer
></script>`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activePlatform]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#5b50e6]/10 text-[#5b50e6] text-[11px] font-bold uppercase tracking-wider">
              Page 3 of 3: Checkout & Embed Center
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Buy Chatbot License & Install Widget
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Choose your commercial plan, pay via JazzCash, EasyPaisa or Card, and unlock your production embed script.
          </p>
        </div>

        {/* Demo Toggle & Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLicenseTest}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Toggle between paid and unpaid state for client demonstration"
          >
            {license.isPurchased ? '🧪 Test: Reset to Unpaid' : '🧪 Test: Preview Paid Mode'}
          </button>

          <button
            onClick={() => onNavigateTab('preview')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Preview (Page 2)</span>
          </button>
        </div>
      </div>

      {/* SECTION A: PAYMENT REQUIRED & CHECKOUT (If Not Purchased) */}
      {!license.isPurchased ? (
        <div className="space-y-6">
          {/* Status Alert Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Embed Code is Currently Locked — Payment Required
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Complete the purchase form below to instantly generate your verified commercial License Key and embed script.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Locked
              </span>
            </div>
          </div>

          {/* Main 2-Column Checkout Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Payment Form (~7 cols) */}
            <form
              onSubmit={handlePayAndUnlock}
              className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-6"
            >
              {/* Step 1: Plan Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    1. Select Chatbot Plan
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('one-time')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        billingCycle === 'one-time'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Lifetime
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Starter */}
                  <div
                    onClick={() => setSelectedPlan('starter')}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlan === 'starter'
                        ? 'border-[#5b50e6] bg-[#5b50e6]/5 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">Starter Bot</div>
                      <div className="text-[11px] text-slate-500">1 Website</div>
                      <div className="text-lg font-extrabold text-slate-900 mt-2">
                        ${planPrices.starter[billingCycle]}
                        <span className="text-[10px] font-normal text-slate-500">
                          {billingCycle === 'monthly' ? '/mo' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2">
                      5,000 chats/mo · Embed script
                    </div>
                  </div>

                  {/* Pro */}
                  <div
                    onClick={() => setSelectedPlan('pro')}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedPlan === 'pro'
                        ? 'border-[#5b50e6] bg-indigo-50/50 shadow-xs ring-1 ring-[#5b50e6]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-2.5 bg-[#5b50e6] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                      Popular
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Pro Commercial</div>
                      <div className="text-[11px] text-slate-500">Production bot</div>
                      <div className="text-lg font-extrabold text-[#5b50e6] mt-2">
                        ${planPrices.pro[billingCycle]}
                        <span className="text-[10px] font-normal text-slate-500">
                          {billingCycle === 'monthly' ? '/mo' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-700 font-semibold mt-2">
                      Unlimited chats · No branding
                    </div>
                  </div>

                  {/* Agency */}
                  <div
                    onClick={() => setSelectedPlan('agency')}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlan === 'agency'
                        ? 'border-[#5b50e6] bg-[#5b50e6]/5 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">Agency Reseller</div>
                      <div className="text-[11px] text-slate-500">Multi-domain</div>
                      <div className="text-lg font-extrabold text-slate-900 mt-2">
                        ${planPrices.agency[billingCycle]}
                        <span className="text-[10px] font-normal text-slate-500">
                          {billingCycle === 'monthly' ? '/mo' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2">
                      10 Websites · Whitelabel
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Customer Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Customer & Domain
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Website URL to Embed *
                    </label>
                    <input
                      type="text"
                      required
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Payment Method
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'jazzcash', label: 'JazzCash', sub: 'Pakistan' },
                    { id: 'easypaisa', label: 'EasyPaisa', sub: 'Pakistan' },
                    { id: 'card', label: 'Credit Card', sub: 'Visa/Master' },
                    { id: 'paypal', label: 'PayPal', sub: 'Global' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'border-[#5b50e6] bg-[#5b50e6]/5 text-slate-900 font-semibold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{m.label}</div>
                      <div className="text-[9px] text-slate-400">{m.sub}</div>
                    </button>
                  ))}
                </div>

                {/* Method Specific Form */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Expiry</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">CVC</label>
                        <input
                          type="password"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-xs space-y-2">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      <span>{paymentMethod === 'jazzcash' ? 'JazzCash Mobile Account' : 'EasyPaisa Wallet'}</span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Enter your mobile number to authorize the instant transaction.
                    </p>
                    <input
                      type="text"
                      required
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-mono text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Promo Code & Total */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-64">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon (e.g. SITEWISE50)"
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div className={`text-[10px] mt-1 font-semibold ${discountPercent > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {promoMessage}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Total Price:</div>
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {discountPercent > 0 && (
                      <span className="text-sm line-through text-slate-400 font-normal mr-2">
                        ${basePrice}
                      </span>
                    )}
                    ${finalPrice}.00 USD
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#5b50e6] hover:bg-[#4d42d4] disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ${finalPrice}.00 & Unlock Official Embed Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Right: Locked Code Box Preview (~5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Code2 className="w-4 h-4 text-[#5b50e6]" />
                <span>Locked Embed Code Preview</span>
              </div>
              <p className="text-xs text-slate-500">
                This official embed script will be unlocked and personalized with your license key right after payment.
              </p>

              {/* Locked code container */}
              <div className="relative rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-400 overflow-hidden shadow-inner select-none">
                <div className="opacity-25 filter blur-[1px]">
                  &lt;!-- Sitewise AI Chatbot (LOCKED) --&gt;<br />
                  &lt;script<br />
                  &nbsp;&nbsp;src="https://cdn.sitewise.ai/widget.v1.js"<br />
                  &nbsp;&nbsp;data-chatbot-id="sb-bot-98421b8"<br />
                  &nbsp;&nbsp;data-license-key="PURCHASE_REQUIRED"<br />
                  &nbsp;&nbsp;data-domain="{targetDomain}"<br />
                  &nbsp;&nbsp;defer<br />
                  &gt;&lt;/script&gt;
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-2xs p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    Embed Script Hidden
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1 max-w-xs">
                    Pay via the form on the left to unlock instant copy & paste integration.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
                <div className="font-bold">What you get after payment:</div>
                <div className="text-[11px] text-indigo-900">• Unique verified License Key</div>
                <div className="text-[11px] text-indigo-900">• Clean script with zero Sitewise branding</div>
                <div className="text-[11px] text-indigo-900">• Integrations for HTML, React, WordPress & Webflow</div>
                <div className="text-[11px] text-indigo-900">• Domain whitelist security authorization</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SECTION B: LICENSED & UNLOCKED VIEW */
        <div className="space-y-6">
          {/* Active License Banner */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Commercial License Active & Verified!
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {license.plan} Plan
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Licensed to <strong className="text-slate-900">{license.buyerName}</strong> ({license.buyerEmail}) for domain <code className="font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">{license.targetDomain}</code>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono font-bold text-xs bg-white border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl shadow-2xs">
                Key: {license.licenseKey}
              </span>
            </div>
          </div>

          {/* Unlocked Embed Snippet Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5b50e6] flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Official Embed Script Code
                  </h2>
                  <p className="text-xs text-slate-500">
                    Paste this snippet before the closing &lt;/body&gt; tag on your website.
                  </p>
                </div>
              </div>

              {/* Platform Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                {(
                  [
                    { id: 'html', label: 'HTML / JS' },
                    { id: 'react', label: 'React / Next.js' },
                    { id: 'wordpress', label: 'WordPress' },
                    { id: 'webflow', label: 'Webflow' },
                    { id: 'shopify', label: 'Shopify' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePlatform(tab.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activePlatform === tab.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-slate-950 text-slate-200 p-5 font-mono text-xs overflow-x-auto shadow-inner">
              <pre className="text-slate-300 leading-relaxed text-[11.5px]">
                <code>{snippets[activePlatform]}</code>
              </pre>

              <button
                onClick={handleCopyCode}
                className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-900 leading-relaxed">
              <Info className="w-4 h-4 text-[#5b50e6] shrink-0 mt-0.5" />
              <span>
                Make sure your site is served over HTTPS for the widget to connect and load properly.
              </span>
            </div>
          </div>

          {/* Security Allowed Domains Whitelist */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Authorized Domains Whitelist
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Only websites listed below are authorized to load this licensed chatbot widget.
              </p>
            </div>

            <div className="space-y-2">
              {allowedDomains.map((domain, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-mono text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#5b50e6]" />
                    <span>{domain}</span>
                  </div>
                  <button
                    onClick={() =>
                      setAllowedDomains(allowedDomains.filter((_, i) => i !== idx))
                    }
                    className="text-slate-400 hover:text-rose-600 text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="https://yourclientdomain.com"
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                />
                <button
                  onClick={() => {
                    if (newDomain.trim()) {
                      setAllowedDomains([...allowedDomains, newDomain.trim()]);
                      setNewDomain('');
                    }
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Add Domain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

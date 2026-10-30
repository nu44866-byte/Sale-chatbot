import React, { useState } from 'react';
import { BotLicense } from '../types.ts';
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Mail,
  User,
  ArrowRight,
  X,
  Copy,
  Check,
  DollarSign,
  Tag,
  Download,
  AlertCircle,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (license: BotLicense) => void;
  initialDomain?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialDomain = 'https://www.example.com',
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'agency'>('pro');
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa' | 'paypal'>('card');
  
  // Customer details
  const [fullName, setFullName] = useState('Ahmed Khan');
  const [email, setEmail] = useState('ahmed@example.com');
  const [websiteUrl, setWebsiteUrl] = useState(initialDomain);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [mobileWalletNumber, setMobileWalletNumber] = useState('0300 1234567');
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedLicense, setCompletedLicense] = useState<BotLicense | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

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

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedKey = `SW-${selectedPlan.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      
      const newLicense: BotLicense = {
        isPurchased: true,
        licenseKey: generatedKey,
        plan: selectedPlan,
        buyerName: fullName,
        buyerEmail: email,
        targetDomain: websiteUrl,
        amountPaid: finalPrice,
        purchaseDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        paymentMethod,
      };

      setIsProcessing(false);
      setCompletedLicense(newLicense);
      onSuccess(newLicense);
    }, 1400);
  };

  const unlockedSnippet = completedLicense
    ? `<!-- Licensed Sitewise AI Chatbot (Key: ${completedLicense.licenseKey}) -->
<script
  src="https://cdn.sitewise.ai/widget.v1.js"
  data-chatbot-id="sb-bot-98421b8"
  data-license-key="${completedLicense.licenseKey}"
  data-domain="${completedLicense.targetDomain}"
  defer
></script>`
    : '';

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(unlockedSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl my-6 shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5b50e6] flex items-center justify-center text-white shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">
                {completedLicense ? 'Payment Successful! License Activated' : 'Buy Chatbot License & Unlock Embed Code'}
              </div>
              <div className="text-[11px] text-slate-300">
                {completedLicense ? 'Your embed code is now ready to paste on your website' : 'Instant activation · Remove watermarks · Commercial use allowed'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-Purchase Success View */}
        {completedLicense ? (
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Thank You for Your Purchase!
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Your chatbot has been licensed for <span className="font-semibold text-slate-800">{completedLicense.targetDomain}</span>.
              </p>
            </div>

            {/* License details card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">License Key:</span>
                <span className="font-mono font-bold text-[#5b50e6]">{completedLicense.licenseKey}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Plan:</span>
                <span className="font-semibold text-slate-800 uppercase">{completedLicense.plan} Commercial</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Licensed Domain:</span>
                <span className="font-mono text-slate-700">{completedLicense.targetDomain}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-slate-900">${completedLicense.amountPaid}.00 ({completedLicense.paymentMethod.toUpperCase()})</span>
              </div>
            </div>

            {/* Unlocked Code Snippet */}
            <div className="text-left max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Your Official Embed Code:</span>
                <span className="text-emerald-600 font-medium text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Activated & Verified
                </span>
              </div>

              <div className="relative rounded-xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <pre className="text-slate-300 leading-relaxed text-[11px]">
                  <code>{unlockedSnippet}</code>
                </pre>

                <button
                  onClick={handleCopySnippet}
                  className="absolute top-3 right-3 px-3.5 py-1.5 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Payment Checkout Form */
          <form onSubmit={handleProcessPayment} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Plan */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Choose Chatbot Plan
                </label>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('one-time')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      billingCycle === 'one-time'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Lifetime (One-Time)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Monthly Subscription
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Starter */}
                <div
                  onClick={() => setSelectedPlan('starter')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPlan === 'starter'
                      ? 'border-[#5b50e6] bg-[#5b50e6]/5 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Starter Bot</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Single website</div>
                    <div className="text-xl font-extrabold text-slate-900 mt-2">
                      ${planPrices.starter[billingCycle]}
                      <span className="text-[11px] font-normal text-slate-500">
                        {billingCycle === 'monthly' ? '/mo' : ' one-time'}
                      </span>
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 mt-3">
                    <li className="flex items-center gap-1">✓ 5,000 chats/mo</li>
                    <li className="flex items-center gap-1">✓ Full embed code</li>
                    <li className="flex items-center gap-1">✓ Standard support</li>
                  </ul>
                </div>

                {/* Pro (Recommended) */}
                <div
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                    selectedPlan === 'pro'
                      ? 'border-[#5b50e6] bg-indigo-50/50 shadow-md ring-1 ring-[#5b50e6]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 bg-[#5b50e6] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Pro Business</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Production commercial</div>
                    <div className="text-xl font-extrabold text-[#5b50e6] mt-2">
                      ${planPrices.pro[billingCycle]}
                      <span className="text-[11px] font-normal text-slate-500">
                        {billingCycle === 'monthly' ? '/mo' : ' one-time'}
                      </span>
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 mt-3">
                    <li className="flex items-center gap-1 font-semibold text-slate-800">✓ Unlimited chats</li>
                    <li className="flex items-center gap-1 font-semibold text-slate-800">✓ Remove branding</li>
                    <li className="flex items-center gap-1">✓ Lead capture form</li>
                    <li className="flex items-center gap-1">✓ 24/7 priority SLA</li>
                  </ul>
                </div>

                {/* Agency */}
                <div
                  onClick={() => setSelectedPlan('agency')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPlan === 'agency'
                      ? 'border-[#5b50e6] bg-[#5b50e6]/5 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Agency / Reseller</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Multi-client sites</div>
                    <div className="text-xl font-extrabold text-slate-900 mt-2">
                      ${planPrices.agency[billingCycle]}
                      <span className="text-[11px] font-normal text-slate-500">
                        {billingCycle === 'monthly' ? '/mo' : ' one-time'}
                      </span>
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 mt-3">
                    <li className="flex items-center gap-1">✓ 10 Websites included</li>
                    <li className="flex items-center gap-1">✓ 100% White-label</li>
                    <li className="flex items-center gap-1">✓ Reseller API access</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Customer & Website Info */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                2. Customer & Licensed Website
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email for License & Receipt *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Website URL to Embed *
                  </label>
                  <div className="relative">
                    <Globe2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6] font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method & Details */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                3. Payment Method
              </label>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', label: 'Credit / Debit Card', badge: 'Visa/Master' },
                  { id: 'jazzcash', label: 'JazzCash', badge: 'Pakistan' },
                  { id: 'easypaisa', label: 'EasyPaisa', badge: 'Pakistan' },
                  { id: 'paypal', label: 'PayPal', badge: 'Global' },
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
                    <div className="text-xs font-medium">{m.label}</div>
                    <div className="text-[9.5px] text-slate-400 font-normal">{m.badge}</div>
                  </button>
                ))}
              </div>

              {/* Payment Inputs */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                <div className="p-4 bg-amber-50/50 border border-amber-200/70 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-amber-900">
                    {paymentMethod === 'jazzcash' ? 'JazzCash Mobile Account' : 'EasyPaisa Wallet'}
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Enter your {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} registered mobile number. An instant MPIN prompt will be sent to your phone for confirmation.
                  </p>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Account Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="03XX XXXXXXX"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-sky-50/50 border border-sky-200/70 rounded-2xl text-xs text-sky-950 space-y-1">
                  <div className="font-bold">PayPal Express Checkout</div>
                  <p className="text-[11px] text-sky-800">
                    You will be authenticated securely via PayPal to finalize the payment and generate your license.
                  </p>
                </div>
              )}
            </div>

            {/* Promo Code & Order Summary */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-72">
                <div className="flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. SITEWISE50)"
                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-xl uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-[10px] mt-1 font-medium ${discountPercent > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {promoMessage}
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto text-right">
                <div className="text-[11px] text-slate-500">
                  Total Due Today:
                </div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-baseline justify-end gap-1.5">
                  {discountPercent > 0 && (
                    <span className="text-sm line-through text-slate-400 font-normal">
                      ${basePrice}
                    </span>
                  )}
                  <span>${finalPrice}.00</span>
                  <span className="text-xs font-normal text-slate-500">USD</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#5b50e6] hover:bg-[#4d42d4] disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${finalPrice}.00 & Unlock Embed Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-3 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>Instant Code Delivery</span>
                <span>•</span>
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChatbotConfig, BotLicense } from '../types.ts';
import {
  Code2,
  Copy,
  Check,
  CheckCircle2,
  Globe2,
  Lock,
  Sparkles,
  Info,
  CreditCard,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

interface InstallWidgetViewProps {
  config: ChatbotConfig;
  license: BotLicense;
  onOpenPaymentModal: () => void;
}

type PlatformTab = 'html' | 'react' | 'wordpress' | 'webflow' | 'shopify';

export const InstallWidgetView: React.FC<InstallWidgetViewProps> = ({
  config,
  license,
  onOpenPaymentModal,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformTab>('html');
  const [copied, setCopied] = useState(false);
  const [allowedDomains, setAllowedDomains] = useState([
    'https://www.example.com',
    'https://acmecorp.com',
  ]);
  const [newDomain, setNewDomain] = useState('');

  const botId = 'sb-bot-98421b8';
  const cdnUrl = 'https://cdn.sitewise.ai/widget.v1.js';
  const activeKey = license.isPurchased ? license.licenseKey : 'PURCHASE_REQUIRED';

  const snippets: Record<PlatformTab, string> = {
    html: `<!-- Sitewise AI Chatbot Widget (License: ${activeKey}) -->
<script
  src="${cdnUrl}"
  data-chatbot-id="${botId}"
  data-license-key="${activeKey}"
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

  const handleCopy = () => {
    if (!license.isPurchased) {
      onOpenPaymentModal();
      return;
    }
    navigator.clipboard.writeText(snippets[activePlatform]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;
    setAllowedDomains([...allowedDomains, newDomain.trim()]);
    setNewDomain('');
  };

  const handleRemoveDomain = (idx: number) => {
    setAllowedDomains(allowedDomains.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Install Widget
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Embed your custom AI chatbot on any platform with a single line of script.
          </p>
        </div>

        {/* License Pill */}
        <div className="flex items-center gap-2">
          {license.isPurchased ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Licensed ({license.plan.toUpperCase()})</span>
            </div>
          ) : (
            <button
              onClick={onOpenPaymentModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Buy Bot License ($49)</span>
            </button>
          )}
        </div>
      </div>

      {/* Paywall Banner if unpaid */}
      {!license.isPurchased && (
        <div className="bg-gradient-to-r from-indigo-900 via-[#5b50e6] to-indigo-900 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span>Commercial License Required</span>
            </div>
            <h2 className="text-lg font-bold">
              Want to sell or deploy this chatbot on your client's website?
            </h2>
            <p className="text-xs text-indigo-100 max-w-xl">
              Pay the license fee to unlock clean embed scripts, remove Sitewise watermarks, enable lead capture forms, and allow live website traffic.
            </p>
          </div>

          <button
            onClick={onOpenPaymentModal}
            className="px-5 py-2.5 bg-white text-[#5b50e6] hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay & Unlock Code</span>
          </button>
        </div>
      )}

      {/* Main Snippet Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5b50e6] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Embed Script Code
              </h2>
              <p className="text-xs text-slate-500">
                Choose your CMS or framework below for tailored installation instructions.
              </p>
            </div>
          </div>

          {/* Platform Tabs */}
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
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Preview */}
        <div className="relative rounded-xl bg-slate-950 text-slate-200 p-5 font-mono text-xs overflow-x-auto shadow-inner">
          <pre className="text-slate-300 leading-relaxed">
            <code>{snippets[activePlatform]}</code>
          </pre>

          <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
              license.isPurchased ? 'bg-[#5b50e6] hover:bg-[#4d42d4]' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {license.isPurchased ? (
              copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied Code</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Script</span>
                </>
              )
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Buy to Unlock Code</span>
              </>
            )}
          </button>
        </div>

        {/* Requirements info */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3 text-xs text-indigo-950">
          <Info className="w-4 h-4 text-[#5b50e6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Important Installation Notes:</div>
            <div>• The widget script is loaded asynchronously with <code className="bg-indigo-100/70 px-1 py-0.5 rounded text-[11px]">defer</code> and does not block page load speeds.</div>
            <div>• Ensure your website operates on HTTPS. Localhost and staging domains are enabled by default for testing.</div>
          </div>
        </div>
      </div>

      {/* Domain Whitelist & Allowed Origins */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Allowed Domains & Security Whitelist
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Only websites listed below are authorized to load your chatbot widget, preventing cross-domain hijacking.
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
                onClick={() => handleRemoveDomain(idx)}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer text-xs"
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
              placeholder="https://yournewdomain.com"
              className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
            />
            <button
              onClick={handleAddDomain}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChatbotConfig } from '../types.ts';
import {
  Settings,
  Shield,
  Sliders,
  Mail,
  UserCheck,
  CheckCircle2,
  Bot,
  HelpCircle,
  Save,
} from 'lucide-react';

interface SettingsViewProps {
  config: ChatbotConfig;
  onUpdateConfig: (config: ChatbotConfig) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState<ChatbotConfig>({ ...config });
  const [toast, setToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6">
      {toast && (
        <div className="fixed top-20 right-8 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Chatbot Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure system behavior, AI persona, response constraints, and lead capture.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: System Persona & Tone */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5b50e6]/10 text-[#5b50e6] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Behavior & Persona
              </h2>
              <p className="text-xs text-slate-500">
                Instruct the LLM on how to behave, what tone to adopt, and how strictly to adhere to the indexed knowledge base.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                System Prompt Instructions
              </label>
              <textarea
                rows={4}
                value={formData.systemPrompt}
                onChange={(e) =>
                  setFormData({ ...formData, systemPrompt: e.target.value })
                }
                className="w-full p-3 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6] leading-relaxed font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                This prompt controls the model grounding, preventing hallucination beyond indexed content.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Creativity / Temperature ({formData.temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formData.temperature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      temperature: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-[#5b50e6]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.0 (Precise / Factual)</span>
                  <span>1.0 (Creative)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Response Language
                </label>
                <select className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]">
                  <option>Auto-detect (Match visitor language)</option>
                  <option>English only</option>
                  <option>Spanish only</option>
                  <option>French only</option>
                  <option>German only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Lead Generation */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Lead Capture & Contact Form
              </h2>
              <p className="text-xs text-slate-500">
                Prompt visitors for their email or phone number during relevant purchase intent questions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <div className="font-semibold text-xs text-slate-800">
                  Enable In-Chat Lead Collection
                </div>
                <div className="text-[11px] text-slate-500">
                  Ask for an email address after answering high-intent inquiries (pricing, contact, booking).
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.leadCaptureEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadCaptureEnabled: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-[#5b50e6] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notification Webhook / Email
                </label>
                <input
                  type="email"
                  defaultValue="leads@acmecorp.com"
                  placeholder="alerts@yourdomain.com"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sync with CRM
                </label>
                <select className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]">
                  <option>Supabase Database (Default)</option>
                  <option>HubSpot CRM</option>
                  <option>Salesforce</option>
                  <option>Zapier Webhook</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Security & Privacy */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Security & Data Compliance
              </h2>
              <p className="text-xs text-slate-500">
                GDPR privacy banner, rate limiting, and session retention.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 rounded-xl border border-slate-200">
              <div className="font-semibold text-xs text-slate-800">
                Max Messages per IP / Hour
              </div>
              <div className="text-[11px] text-slate-500 mb-2">
                Prevent automated scraping and abuse
              </div>
              <input
                type="number"
                defaultValue={60}
                className="w-24 px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200">
              <div className="font-semibold text-xs text-slate-800">
                Chat History Retention
              </div>
              <div className="text-[11px] text-slate-500 mb-2">
                GDPR compliance log expiration
              </div>
              <select className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg">
                <option>30 Days (Recommended)</option>
                <option>90 Days</option>
                <option>365 Days</option>
                <option>Indefinite</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

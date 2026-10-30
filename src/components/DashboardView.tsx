import React, { useState } from 'react';
import {
  ChatbotConfig,
  ThemeColor,
  ChatPosition,
  ChatMessage,
  TabType,
  BotLicense,
} from '../types.ts';
import { themeColorMap } from '../data/mockData.ts';
import { WebsiteMockup } from './WebsiteMockup.tsx';
import {
  Link2,
  Sparkles,
  CheckCircle2,
  Database,
  Settings,
  Bot,
  Send,
  X,
  Copy,
  Check,
  ExternalLink,
  Info,
  RotateCw,
  Plus,
  Trash2,
  Eye,
  MessageSquare,
  Zap,
  Lock,
  Unlock,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  config: ChatbotConfig;
  license: BotLicense;
  onUpdateConfig: (config: ChatbotConfig) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenLiveModal: () => void;
  onOpenPaymentModal: () => void;
  onToggleLicenseTest: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  config,
  license,
  onUpdateConfig,
  onNavigateTab,
  onOpenLiveModal,
  onOpenPaymentModal,
  onToggleLicenseTest,
}) => {
  const [urlInput, setUrlInput] = useState('https://www.example.com');
  const [analyzedUrl, setAnalyzedUrl] = useState('https://www.example.com');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(4); // 4 = completed
  const [pagesCrawled, setPagesCrawled] = useState(1);
  const [contentChunks, setContentChunks] = useState(42);

  // Chat preview state in Column C
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: config.welcomeMessage,
      time: 'Just now',
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Suggested questions editing
  const [newQuestionInput, setNewQuestionInput] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  // Code snippet copy state
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Avatar selection modal
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const activeTheme = themeColorMap[config.themeColor] || themeColorMap.indigo;

  // Handle URL Analysis Simulation
  const handleAnalyzeWebsite = () => {
    if (!urlInput.trim()) return;
    setIsAnalyzing(true);
    setCurrentStep(1);

    // Simulate multi-step crawler progress
    setTimeout(() => {
      setCurrentStep(2);
    }, 1200);

    setTimeout(() => {
      setCurrentStep(3);
    }, 2800);

    setTimeout(() => {
      setCurrentStep(4);
      setIsAnalyzing(false);
      setAnalyzedUrl(urlInput);
      setPagesCrawled(Math.floor(Math.random() * 3) + 1);
      setContentChunks(Math.floor(Math.random() * 25) + 38);
    }, 4500);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || messageInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setMessageInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = text.toLowerCase();
      if (q.includes('service') || q.includes('offer')) {
        reply =
          'We offer full-stack Web Development, scalable Cloud Solutions, and customized AI Integrations for enterprise operations.';
      } else if (q.includes('start') || q.includes('how can i')) {
        reply =
          'You can get started right away by scheduling a 15-minute consultation through our contact form or clicking "Get Started"!';
      } else if (q.includes('pricing') || q.includes('cost') || q.includes('plan')) {
        reply =
          'Our plans start at $2,500/month for startups, with tailored enterprise pricing for larger custom integrations.';
      } else {
        reply = `I found information on ${analyzedUrl} relevant to "${text}". Would you like me to connect you with a representative or show our technical documentation?`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsBotTyping(false);
    }, 600);
  };

  const handleAddQuestion = () => {
    if (!newQuestionInput.trim()) return;
    onUpdateConfig({
      ...config,
      suggestedQuestions: [...config.suggestedQuestions, newQuestionInput.trim()],
    });
    setNewQuestionInput('');
    setShowAddQuestion(false);
  };

  const handleRemoveQuestion = (idx: number) => {
    const updated = config.suggestedQuestions.filter((_, i) => i !== idx);
    onUpdateConfig({
      ...config,
      suggestedQuestions: updated,
    });
  };

  const handleSaveSettings = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2400);
  };

  const widgetSnippet = license.isPurchased
    ? `<!-- Licensed Sitewise AI Bot (Key: ${license.licenseKey}) -->\n<script\n  src="https://cdn.sitewise.ai/widget.v1.js"\n  data-chatbot-id="sb-bot-98421b8"\n  data-license-key="${license.licenseKey}"\n  data-domain="${license.targetDomain || analyzedUrl}"\n  defer\n></script>`
    : `<!-- Sitewise AI Chatbot (Locked) -->\n<script\n  src="https://cdn.sitewise.ai/widget.v1.js"\n  data-chatbot-id="sb-bot-98421b8"\n  data-license-key="PURCHASE_REQUIRED"\n  defer\n></script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(widgetSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-8 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Chatbot settings saved successfully!</span>
        </div>
      )}

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls, Crawler, & Customizer (~60%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Welcome Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Welcome back, User</span>
              <span>👋</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              Turn any website into an AI-powered chatbot in minutes.
            </p>
          </div>

          {/* Section 1: Enter Website URL */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#5b50e6]/10 text-[#5b50e6] flex items-center justify-center shrink-0">
                <Link2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-slate-900">
                  1. Enter Website URL
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add the URL of the website you want to analyze and create a chatbot for.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1">
              <div className="flex-1 relative">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://www.example.com"
                  className="w-full h-11 px-4 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b50e6]/20 focus:border-[#5b50e6] transition-all"
                />
              </div>
              <button
                onClick={handleAnalyzeWebsite}
                disabled={isAnalyzing}
                className="h-11 px-5 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20 stroke-white" />
                    <span>Analyze Website</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Info className="w-3.5 h-3.5" />
              <span>Supports single page URL (e.g. https://www.example.com)</span>
            </div>
          </div>

          {/* Section 2: Website Analysis Progress */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Website Analysis Progress
                </h3>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                {isAnalyzing ? 'Processing...' : 'Completed'}
              </span>
            </div>

            {/* Stepper horizontal line */}
            <div className="relative pt-2 pb-1">
              {/* Connector line */}
              <div className="absolute top-[22px] left-[6%] right-[6%] h-[2px] bg-indigo-100" />

              <div className="grid grid-cols-4 relative text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white z-10 transition-colors ${
                      currentStep >= 1 ? 'bg-[#5b50e6]' : 'bg-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2">
                    Fetching page
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">1.2s</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white z-10 transition-colors ${
                      currentStep >= 2 ? 'bg-[#5b50e6]' : 'bg-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2">
                    Extracting content
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">3.4s</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white z-10 transition-colors ${
                      currentStep >= 3 ? 'bg-[#5b50e6]' : 'bg-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2">
                    Creating embeddings
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">5.1s</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white z-10 transition-colors ${
                      currentStep >= 4 ? 'bg-[#5b50e6]' : 'bg-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 mt-2">
                    Storing in database
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">2.3s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Website Indexed Successfully */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-600">
                  Website Indexed Successfully!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The content has been extracted, processed and is now ready for AI-powered answers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <div className="border border-slate-200 rounded-xl px-4 py-2 min-w-[90px] text-left bg-slate-50/50">
                <div className="text-[11px] text-slate-500 font-medium">
                  Pages Crawled
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  {pagesCrawled}
                </div>
              </div>
              <div className="border border-slate-200 rounded-xl px-4 py-2 min-w-[90px] text-left bg-slate-50/50">
                <div className="text-[11px] text-slate-500 font-medium">
                  Content Chunks
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  {contentChunks}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Chatbot Customization */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5b50e6]/10 text-[#5b50e6] flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Chatbot Customization
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize your chatbot's appearance and behavior.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Save Settings
              </button>
            </div>

            {/* 3-Column Customizer Sub-grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
              {/* Column A: Bot Name, Welcome, Suggested (~4 cols) */}
              <div className="md:col-span-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Bot Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Welcome Message
                  </label>
                  <textarea
                    rows={3}
                    value={config.welcomeMessage}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, welcomeMessage: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6] resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Suggested Questions
                  </label>
                  <div className="space-y-1.5">
                    {config.suggestedQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center justify-between gap-1 text-[11px] text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-lg px-2.5 py-1.5 transition-colors"
                      >
                        <span className="truncate">{q}</span>
                        <button
                          onClick={() => handleRemoveQuestion(idx)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-0.5"
                          title="Remove question"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {showAddQuestion ? (
                      <div className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newQuestionInput}
                          onChange={(e) => setNewQuestionInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddQuestion();
                          }}
                          placeholder="e.g. Do you support integrations?"
                          className="flex-1 text-[11px] px-2.5 py-1 border border-slate-300 rounded-lg focus:outline-none focus:border-[#5b50e6]"
                          autoFocus
                        />
                        <button
                          onClick={handleAddQuestion}
                          className="px-2.5 py-1 bg-[#5b50e6] text-white text-[11px] font-medium rounded-lg hover:bg-[#4d42d4]"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddQuestion(false)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddQuestion(true)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5b50e6] hover:text-[#4d42d4] mt-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Question</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Column B: Appearance (~3.5 cols) */}
              <div className="md:col-span-3 space-y-4">
                <div className="text-xs font-bold text-slate-900">Appearance</div>

                {/* Theme Color */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-2">
                    Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    {(
                      [
                        { id: 'indigo', color: '#5b50e6' },
                        { id: 'blue', color: '#0284c7' },
                        { id: 'emerald', color: '#10b981' },
                        { id: 'orange', color: '#f97316' },
                        { id: 'pink', color: '#ec4899' },
                      ] as const
                    ).map((item) => {
                      const isSelected = config.themeColor === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            onUpdateConfig({ ...config, themeColor: item.id })
                          }
                          className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'ring-2 ring-offset-2 ring-slate-400 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.id}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Chat Position */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                    Chat Position
                  </label>
                  <select
                    value={config.chatPosition}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        chatPosition: e.target.value as ChatPosition,
                      })
                    }
                    className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6] cursor-pointer"
                  >
                    <option value="Bottom Right">Bottom Right</option>
                    <option value="Bottom Left">Bottom Left</option>
                  </select>
                </div>

                {/* Bot Avatar */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1.5">
                    Bot Avatar
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${activeTheme.primary} text-white flex items-center justify-center shadow-xs`}
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20 stroke-white" />
                    </div>
                    <button
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {showAvatarPicker && (
                    <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                      <button
                        onClick={() => {
                          onUpdateConfig({ ...config, avatarIcon: 'message' });
                          setShowAvatarPicker(false);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-[#5b50e6]"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateConfig({ ...config, avatarIcon: 'bot' });
                          setShowAvatarPicker(false);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-[#5b50e6]"
                      >
                        <Bot className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateConfig({ ...config, avatarIcon: 'sparkles' });
                          setShowAvatarPicker(false);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-[#5b50e6]"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onUpdateConfig({ ...config, avatarIcon: 'zap' });
                          setShowAvatarPicker(false);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-[#5b50e6]"
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Column C: Preview (~4.5 cols) */}
              <div className="md:col-span-5 space-y-1.5">
                <div className="text-xs font-bold text-slate-900">Preview</div>
                {/* Simulated Widget Box */}
                <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs flex flex-col h-[350px]">
                  {/* Widget Bar */}
                  <div
                    className={`px-3.5 py-2.5 ${activeTheme.primary} text-white flex items-center justify-between shrink-0`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5 fill-white/20 stroke-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs leading-none">
                          {config.name}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span className="text-[9.5px] text-white/80 font-medium">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50/60 text-xs">
                    {/* Welcome message */}
                    <div className="flex gap-2 justify-start">
                      <div
                        className={`w-5 h-5 rounded-md ${activeTheme.primary} text-white flex items-center justify-center shrink-0 text-[10px]`}
                      >
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="p-2.5 rounded-xl max-w-[82%] text-[11px] leading-relaxed shadow-2xs bg-white text-slate-800 border border-slate-100 rounded-tl-none whitespace-pre-line">
                        {config.welcomeMessage}
                      </div>
                    </div>

                    {/* Chat messages */}
                    {chatMessages.slice(1).map((m) => (
                      <div
                        key={m.id}
                        className={`flex gap-2 ${
                          m.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {m.sender === 'bot' && (
                          <div
                            className={`w-5 h-5 rounded-md ${activeTheme.primary} text-white flex items-center justify-center shrink-0 text-[10px]`}
                          >
                            <Bot className="w-3 h-3" />
                          </div>
                        )}
                        <div
                          className={`p-2.5 rounded-xl max-w-[82%] text-[11px] leading-relaxed shadow-2xs ${
                            m.sender === 'user'
                              ? `${activeTheme.primary} text-white rounded-br-none`
                              : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none whitespace-pre-line'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}

                    {/* Suggested Question Chips inside preview */}
                    {config.suggestedQuestions.length > 0 &&
                      chatMessages.length <= 1 && (
                        <div className="space-y-1.5 pt-1 pl-7">
                          {config.suggestedQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="block w-full text-left text-[10px] text-indigo-700 bg-white hover:bg-indigo-50/90 border border-indigo-100 rounded-lg px-2.5 py-1.5 transition-colors line-clamp-1 cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}

                    {isBotTyping && (
                      <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-100 w-fit text-[10px] text-slate-400 ml-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]"></span>
                      </div>
                    )}
                  </div>

                  {/* Input bottom */}
                  <div className="p-2 bg-white border-t border-slate-200/80 flex items-center gap-1.5">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                      placeholder="Type your message..."
                      className="flex-1 text-[11px] px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#5b50e6]"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className={`w-7 h-7 rounded-lg ${activeTheme.primary} text-white flex items-center justify-center hover:opacity-90 cursor-pointer shrink-0`}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Website Preview & Install Widget (~40%) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Your Website Preview */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>Your Website Preview</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </h2>

              <button
                onClick={onOpenLiveModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5b50e6] border border-[#5b50e6]/30 hover:bg-[#5b50e6]/10 rounded-lg transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live</span>
              </button>
            </div>

            {/* The browser preview frame */}
            <WebsiteMockup
              config={config}
              url={analyzedUrl}
              onOpenLiveModal={onOpenLiveModal}
            />
          </div>

          {/* Card 2: Install Widget (With Payment Paywall) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  license.isPurchased ? 'bg-indigo-50 text-[#5b50e6]' : 'bg-amber-50 text-amber-600'
                }`}>
                  {license.isPurchased ? (
                    <span className="font-mono text-xs font-bold">&lt;/&gt;</span>
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Install Widget
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      license.isPurchased
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {license.isPurchased ? `✓ ${license.plan.toUpperCase()} LICENSE` : '🔒 PAYMENT REQUIRED'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {license.isPurchased
                      ? 'Copy and paste this code before the closing </body> tag on your website.'
                      : 'Purchase a commercial license for this bot to unlock your verified embed code.'}
                  </p>
                </div>
              </div>

              {/* Developer / Demo Quick Switch */}
              <button
                onClick={onToggleLicenseTest}
                className="text-[10px] text-slate-400 hover:text-slate-700 hover:underline shrink-0"
                title="Toggle purchase state for testing"
              >
                {license.isPurchased ? 'Reset to Unpaid' : 'Quick Preview Paid'}
              </button>
            </div>

            {/* Code Box Area */}
            {license.isPurchased ? (
              /* UNLOCKED CODE BOX */
              <div className="space-y-3">
                <div className="relative rounded-xl bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                  <pre className="text-[11px] leading-relaxed text-slate-300">
                    <code>{widgetSnippet}</code>
                  </pre>

                  <button
                    onClick={handleCopySnippet}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Licensed to <strong className="font-semibold">{license.buyerName}</strong> for <code className="font-mono text-[11px]">{license.targetDomain}</code>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white/70 px-2 py-0.5 rounded border border-emerald-200">
                    {license.licenseKey}
                  </span>
                </div>
              </div>
            ) : (
              /* LOCKED PAYWALL BOX */
              <div className="relative rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-inner p-6 text-center space-y-4">
                {/* Background blurred faux snippet */}
                <div className="absolute inset-0 opacity-15 filter blur-xs p-4 select-none pointer-events-none font-mono text-[10px] text-slate-400 text-left">
                  &lt;script src="https://cdn.sitewise.ai/widget.js" data-chatbot-id="YOUR_ID" data-license-key="LOCKED_PAYMENT_REQUIRED"&gt;&lt;/script&gt;
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#5b50e6]/20 border border-[#5b50e6]/30 text-[#5b50e6] flex items-center justify-center mb-2 shadow-inner">
                    <Lock className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">
                    Unlock Chatbot Embed Code
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
                    Make a one-time payment or monthly subscription to unlock the live embed script, remove watermarks, and deploy on your site.
                  </p>

                  <div className="flex items-center gap-2 mt-4 w-full sm:w-auto">
                    <button
                      onClick={onOpenPaymentModal}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#5b50e6] hover:bg-[#4d42d4] text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-[#5b50e6]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Buy Chatbot License ($49)</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-3 font-medium">
                    <span>✓ Lifetime License</span>
                    <span>•</span>
                    <span>✓ JazzCash / Card / PayPal</span>
                    <span>•</span>
                    <span>✓ Instant Code Delivery</span>
                  </div>
                </div>
              </div>
            )}

            {/* HTTPS Warning Callout */}
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-900 leading-relaxed">
              <Info className="w-4 h-4 text-[#5b50e6] shrink-0 mt-0.5" />
              <span>
                Make sure your site is served over HTTPS for the widget to work properly.
              </span>
            </div>

            {/* View Installation Guide Link */}
            <div className="pt-1 flex items-center justify-between">
              <button
                onClick={() => onNavigateTab('install-widget')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#5b50e6] hover:text-[#4d42d4] hover:underline cursor-pointer"
              >
                <span>View Full Installation Guide</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              {!license.isPurchased && (
                <button
                  onClick={onOpenPaymentModal}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Pay & Get Code ↗
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

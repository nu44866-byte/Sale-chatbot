import React, { useState } from 'react';
import { ChatbotConfig, TabType } from '../types.ts';
import { themeColorMap } from '../data/mockData.ts';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  Sparkles,
  Code2,
  Cloud,
  Cpu,
  MessageSquare,
  Bot,
  Send,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface WebsitePreviewPageProps {
  config: ChatbotConfig;
  url: string;
  onNavigateTab: (tab: TabType) => void;
  onOpenLiveModal: () => void;
}

export const WebsitePreviewPage: React.FC<WebsitePreviewPageProps> = ({
  config,
  url,
  onNavigateTab,
  onOpenLiveModal,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>
  >([
    {
      id: 'init-1',
      sender: 'bot',
      text: config.welcomeMessage,
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeTheme = themeColorMap[config.themeColor] || themeColorMap.indigo;
  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'www.example.com';

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();
      if (lower.includes('service') || lower.includes('offer')) {
        botResponse =
          'AcmeCorp provides three core services: 1. Full-Stack Web Development, 2. Scalable Cloud Solutions, and 3. Enterprise AI Integrations with customized LLMs.';
      } else if (lower.includes('start') || lower.includes('get started')) {
        botResponse =
          'You can get started right away! Click the "Get Started" button in the hero section or drop us an email at contact@acmecorp.com for a free architectural consultation.';
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('price')) {
        botResponse =
          'Our transparent pricing tiers start at $2,500/month for startups up to bespoke enterprise contracts with dedicated engineers. Visit our pricing section or book a demo call!';
      } else {
        botResponse = `Thanks for asking about "${text}"! AcmeCorp's team is ready to assist. Would you like to schedule an introductory call or leave your email address?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const getContainerWidth = () => {
    if (device === 'mobile') return 'max-w-[400px]';
    if (device === 'tablet') return 'max-w-[768px]';
    return 'w-full max-w-5xl';
  };

  return (
    <div className="p-6 sm:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              Page 2 of 3: Live Simulator
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Your Website Preview & Bot Simulator
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Interact with the simulated site and test the live floating chatbot widget across different device viewports.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Viewport switchers */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'desktop'
                  ? 'bg-slate-100 text-[#5b50e6]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'tablet'
                  ? 'bg-slate-100 text-[#5b50e6]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                device === 'mobile'
                  ? 'bg-slate-100 text-[#5b50e6]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenLiveModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Fullscreen Mode</span>
          </button>

          <button
            onClick={() => onNavigateTab('install')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white transition-colors cursor-pointer shadow-xs"
          >
            <span>Proceed to Buy & Install ➔</span>
          </button>
        </div>
      </div>

      {/* The Central Browser Mockup Frame */}
      <div className="flex justify-center transition-all">
        <div
          className={`${getContainerWidth()} rounded-3xl border border-slate-300/80 bg-white shadow-xl overflow-hidden flex flex-col h-[650px] relative transition-all duration-300`}
        >
          {/* Browser Navigation Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
            </div>

            {/* Address bar */}
            <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 flex items-center justify-between text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">https://{displayUrl}</span>
              </div>
              <span title="Reload" className="shrink-0 ml-2">
                <RotateCw className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </span>
            </div>
          </div>

          {/* Website Canvas Viewport */}
          <div className="flex-1 overflow-y-auto relative text-slate-800 text-xs bg-white">
            {/* Nav inside preview */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm tracking-tight">
                <span className="w-6 h-6 rounded-lg bg-[#5b50e6] text-white flex items-center justify-center text-xs font-bold">
                  A
                </span>
                <span>AcmeCorp</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="hover:text-slate-900 cursor-pointer">Home</span>
                <span className="hover:text-slate-900 cursor-pointer">About</span>
                <span className="hover:text-slate-900 cursor-pointer">Services</span>
                <span className="hover:text-slate-900 cursor-pointer">Case Studies</span>
                <span className="hover:text-slate-900 cursor-pointer">Contact</span>
              </div>
              <button
                onClick={() => setWidgetOpen(true)}
                className="px-3 py-1.5 bg-[#5b50e6] hover:bg-[#4d42d4] text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </header>

            {/* Hero Section */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b50e6] bg-[#5b50e6]/10 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  <span>Build Better Solutions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Modern Solutions <br />for Your Business
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                  We help businesses scale with innovative web technology, cloud architectures, and AI customer support automation.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setWidgetOpen(true)}
                    className="bg-[#5b50e6] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-[#4d42d4] transition-colors cursor-pointer"
                  >
                    Test Assistant
                  </button>
                  <button className="bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 relative shadow-xs">
                  <img
                    src="/src/assets/images/acmecorp_modern_office_1793336244518.jpg"
                    alt="AcmeCorp headquarters"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Our Services Section */}
            <div className="px-6 sm:px-8 pb-10">
              <div className="text-sm font-bold text-slate-900 mb-3">Our Core Services</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#5b50e6] flex items-center justify-center mb-2">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-800 text-xs">
                    Web Development
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Custom responsive websites and scalable modern web apps for your business.
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-800 text-xs">
                    Cloud Solutions
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Scalable, multi-region and secure enterprise cloud infrastructure.
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-800 text-xs">
                    AI Integration
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Bring the power of RAG embeddings and custom AI chatbots to your site.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Widget Launcher on Website */}
          <div
            className={`absolute bottom-5 ${
              config.chatPosition === 'Bottom Left' ? 'left-5' : 'right-5'
            } z-20`}
          >
            <button
              onClick={() => setWidgetOpen(!widgetOpen)}
              className={`w-13 h-13 rounded-full ${activeTheme.primary} text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer`}
              title="Chat with Assistant"
            >
              {widgetOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MessageSquare className="w-6 h-6 fill-white/20 stroke-white" />
              )}
            </button>
          </div>

          {/* Floating Chatbot Overlay window */}
          {widgetOpen && (
            <div
              className={`absolute bottom-20 ${
                config.chatPosition === 'Bottom Left' ? 'left-5' : 'right-5'
              } w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-30 overflow-hidden flex flex-col h-[420px] animate-in fade-in zoom-in-95 duration-150`}
            >
              {/* Header */}
              <div
                className={`px-4 py-3 ${activeTheme.primary} text-white flex items-center justify-between shrink-0`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-none">
                      {config.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-[10px] text-white/90 font-medium">
                        Online · Ready
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setWidgetOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages container */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/70 text-xs">
                {messages.map((m) => (
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

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-100 w-fit text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                )}

                {/* Suggestions */}
                {messages.length <= 2 && config.suggestedQuestions.length > 0 && (
                  <div className="pt-1 space-y-1.5">
                    <div className="text-[10px] text-slate-400 font-medium">
                      Suggested Questions:
                    </div>
                    {config.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left text-[10.5px] text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1.5 transition-colors line-clamp-1 cursor-pointer shadow-2xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 text-[11px] px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#5b50e6]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className={`w-8 h-8 rounded-lg ${activeTheme.primary} text-white flex items-center justify-center hover:opacity-90 cursor-pointer shrink-0`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Banner */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <button
          onClick={() => onNavigateTab('builder')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bot Studio (Page 1)</span>
        </button>

        <button
          onClick={() => onNavigateTab('install')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <span>Go to Buy License & Install (Page 3)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

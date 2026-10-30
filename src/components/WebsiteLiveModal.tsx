import React, { useState } from 'react';
import { ChatbotConfig } from '../types.ts';
import { themeColorMap } from '../data/mockData.ts';
import {
  X,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Code2,
  Cloud,
  Cpu,
  MessageSquare,
  Bot,
  Send,
  ExternalLink,
} from 'lucide-react';

interface WebsiteLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChatbotConfig;
  url: string;
}

export const WebsiteLiveModal: React.FC<WebsiteLiveModalProps> = ({
  isOpen,
  onClose,
  config,
  url,
}) => {
  const [widgetOpen, setWidgetOpen] = useState(true);
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>
  >([
    {
      id: 'init-1',
      sender: 'bot',
      text: config.welcomeMessage,
      time: '10:00 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const activeTheme = themeColorMap[config.themeColor] || themeColorMap.indigo;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text,
        time: 'Just now',
      },
    ]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('service') || lower.includes('offer')) {
        reply =
          'AcmeCorp delivers 3 core pillars: Custom Web Development, Scalable Multi-Cloud Infrastructure, and Enterprise AI Integrations with vector search.';
      } else if (lower.includes('start') || lower.includes('how')) {
        reply =
          'You can get started in minutes! Click "Get Started" on the page or book an intro meeting with our solutions engineering team.';
      } else if (lower.includes('pricing') || lower.includes('cost')) {
        reply =
          'We offer flexible monthly retainers starting at $2,500/mo, as well as dedicated enterprise plans with customized SLAs.';
      } else {
        reply = `Thanks for asking about that! Our team at AcmeCorp is specialized in solving this. Would you like to schedule an introductory call?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-700/30">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80"
                title="Close"
              />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400 ml-4">
              <ArrowLeft className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              <ArrowRight className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              <RotateCw className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Address bar */}
          <div className="flex-1 max-w-md mx-4 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 flex items-center gap-2 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">https://{url.replace(/^https?:\/\//, '')}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Website Window Content */}
        <div className="flex-1 overflow-y-auto relative bg-white text-slate-900">
          {/* Top navigation */}
          <header className="px-8 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-xs z-10">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <span className="w-7 h-7 rounded-lg bg-[#5b50e6] text-white flex items-center justify-center text-xs">
                A
              </span>
              <span>AcmeCorp</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
              <span className="hover:text-slate-900 cursor-pointer">Home</span>
              <span className="hover:text-slate-900 cursor-pointer">About Us</span>
              <span className="hover:text-slate-900 cursor-pointer">Services</span>
              <span className="hover:text-slate-900 cursor-pointer">Case Studies</span>
              <span className="hover:text-slate-900 cursor-pointer">Contact</span>
            </nav>

            <button
              onClick={() => setWidgetOpen(true)}
              className="px-4 py-2 bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Get Started
            </button>
          </header>

          {/* Hero Banner */}
          <section className="px-8 py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b50e6] bg-[#5b50e6]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Better Solutions</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Modern Solutions <br />for Your Business
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                We help businesses grow with innovative technology, dedicated full-stack engineering, and AI chatbot automation.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setWidgetOpen(true)}
                  className="px-5 py-2.5 bg-[#5b50e6] text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-[#4d42d4] transition-colors"
                >
                  Talk with Assistant
                </button>
                <button className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                  Explore Platform
                </button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="/src/assets/images/acmecorp_modern_office_1793336244518.jpg"
                  alt="AcmeCorp headquarters"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="px-8 py-8 max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Our Core Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5b50e6] flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900">
                  Web Development
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Custom responsive websites and high-performance cloud applications engineered for speed.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Cloud className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900">
                  Cloud Solutions
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Scalable and secure multi-region cloud infrastructure on Supabase, AWS, and GCP.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900">
                  AI Integration
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bring the power of retrieval-augmented generation and natural language bots to your users.
                </p>
              </div>
            </div>
          </section>

          {/* Floating Widget Launcher on live page */}
          <div
            className={`fixed bottom-8 ${
              config.chatPosition === 'Bottom Left' ? 'left-8' : 'right-8'
            } z-40`}
          >
            <button
              onClick={() => setWidgetOpen(!widgetOpen)}
              className={`w-14 h-14 rounded-full ${activeTheme.primary} text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer`}
            >
              {widgetOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MessageSquare className="w-6 h-6 fill-white/20 stroke-white" />
              )}
            </button>
          </div>

          {/* Floating Widget Window */}
          {widgetOpen && (
            <div
              className={`fixed bottom-24 ${
                config.chatPosition === 'Bottom Left' ? 'left-8' : 'right-8'
              } w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-5 duration-200`}
            >
              <div
                className={`px-4 py-3 ${activeTheme.primary} text-white flex items-center justify-between shrink-0`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">
                      {config.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-[11px] text-white/90">
                        Online · Ready to help
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setWidgetOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${
                      m.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {m.sender === 'bot' && (
                      <div
                        className={`w-6 h-6 rounded-lg ${activeTheme.primary} text-white flex items-center justify-center shrink-0 text-xs`}
                      >
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl max-w-[82%] text-xs leading-relaxed shadow-xs ${
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
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-xl border border-slate-100 w-fit text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                )}

                {/* Suggested prompt chips */}
                {messages.length <= 2 && config.suggestedQuestions.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[11px] text-slate-400 font-medium">
                      Suggested Questions:
                    </div>
                    {config.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="w-full text-left text-xs text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 transition-colors cursor-pointer shadow-2xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Ask a question about this site..."
                  className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                />
                <button
                  onClick={() => handleSend()}
                  className={`w-9 h-9 rounded-xl ${activeTheme.primary} text-white flex items-center justify-center hover:opacity-90 cursor-pointer shrink-0`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

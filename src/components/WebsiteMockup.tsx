import React, { useState } from 'react';
import { ChatbotConfig } from '../types.ts';
import { themeColorMap } from '../data/mockData.ts';
import {
  Code2,
  Cloud,
  Cpu,
  Send,
  X,
  MessageSquare,
  Sparkles,
  Bot,
  User,
  Zap,
} from 'lucide-react';

interface WebsiteMockupProps {
  config: ChatbotConfig;
  url: string;
  onOpenLiveModal?: () => void;
}

export const WebsiteMockup: React.FC<WebsiteMockupProps> = ({
  config,
  url,
  onOpenLiveModal,
}) => {
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
      } else if (lower.includes('ai') || lower.includes('chatbot') || lower.includes('model')) {
        botResponse =
          'Our AI Integration service allows you to train customized conversational agents directly on your company documentation, APIs, and product catalogs with guaranteed data privacy.';
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
    }, 650);
  };

  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'www.example.com';

  return (
    <div className="relative rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs flex flex-col h-[530px]">
      {/* Browser Top Navigation Bar */}
      <div className="bg-slate-100/90 border-b border-slate-200/70 px-4 py-2.5 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Address bar */}
        <div className="flex-1 bg-white border border-slate-200/80 rounded-md px-3 py-1 text-[11px] text-slate-500 font-mono truncate text-center">
          https://{displayUrl}
        </div>
      </div>

      {/* Website Body Preview Scroll Container */}
      <div className="flex-1 overflow-y-auto relative text-slate-800 text-xs bg-white">
        {/* Nav inside preview */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm tracking-tight">
            <span className="w-5 h-5 rounded-md bg-[#5b50e6] text-white flex items-center justify-center text-[10px]">
              A
            </span>
            <span>AcmeCorp</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span className="hover:text-slate-800 cursor-pointer">Home</span>
            <span className="hover:text-slate-800 cursor-pointer">About</span>
            <span className="hover:text-slate-800 cursor-pointer">Services</span>
            <span className="hover:text-slate-800 cursor-pointer">Contact</span>
            <span className="text-slate-400">&gt;</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#5b50e6] bg-[#5b50e6]/10 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Build Better Solutions</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
              Modern Solutions <br />for Your Business
            </h2>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We help businesses grow with innovative technology and expert support.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setWidgetOpen(true)}
                className="bg-[#5b50e6] text-white font-medium text-[11px] px-3 py-1.5 rounded-lg shadow-xs hover:bg-[#4d42d4] transition-colors"
              >
                Get Started
              </button>
              <button className="bg-slate-100 text-slate-700 font-medium text-[11px] px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200/80 aspect-4/3 relative shadow-xs group">
              <img
                src="/src/assets/images/acmecorp_modern_office_1793336244518.jpg"
                alt="AcmeCorp modern office"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="px-5 pb-6">
          <div className="text-xs font-bold text-slate-900 mb-2.5">Our Services</div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 text-[#5b50e6] flex items-center justify-center mb-1.5">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                Web Development
              </div>
              <div className="text-[9.5px] text-slate-500 mt-1 leading-snug">
                Custom websites and web apps for your business.
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-1.5">
                <Cloud className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                Cloud Solutions
              </div>
              <div className="text-[9.5px] text-slate-500 mt-1 leading-snug">
                Scalable and secure cloud infrastructure.
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                AI Integration
              </div>
              <div className="text-[9.5px] text-slate-500 mt-1 leading-snug">
                Bring the power of AI to your business.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Widget Launcher Button on the Website Preview */}
      <div
        className={`absolute bottom-4 ${
          config.chatPosition === 'Bottom Left' ? 'left-4' : 'right-4'
        } z-10`}
      >
        <button
          onClick={() => setWidgetOpen(!widgetOpen)}
          className={`w-11 h-11 rounded-full ${activeTheme.primary} text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer`}
          title="Chat with Sitewise Assistant"
        >
          {widgetOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageSquare className="w-5 h-5 fill-white/20 stroke-white" />
          )}
        </button>
      </div>

      {/* Floating Chatbot Overlay inside Preview when opened */}
      {widgetOpen && (
        <div
          className={`absolute bottom-16 ${
            config.chatPosition === 'Bottom Left' ? 'left-4' : 'right-4'
          } w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-20 overflow-hidden flex flex-col h-[380px] animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div
            className={`px-3.5 py-3 ${activeTheme.primary} text-white flex items-center justify-between shrink-0`}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
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
            <button
              onClick={() => setWidgetOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50/60 text-xs">
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

            {/* Quick suggested chips */}
            {messages.length <= 2 && config.suggestedQuestions.length > 0 && (
              <div className="pt-1 space-y-1.5">
                <div className="text-[9.5px] text-slate-400 font-medium">
                  Suggested Questions:
                </div>
                {config.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left text-[10px] text-indigo-700 bg-white hover:bg-indigo-50/80 border border-indigo-100 rounded-lg px-2.5 py-1.5 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-2.5 bg-white border-t border-slate-200/80 flex items-center gap-1.5">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
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
      )}
    </div>
  );
};

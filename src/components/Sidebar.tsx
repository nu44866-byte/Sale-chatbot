import React from 'react';
import { TabType, AppRole } from '../types.ts';
import {
  LayoutDashboard,
  Globe2,
  Settings,
  Code2,
  BarChart2,
  Zap,
  MessageSquare,
  Shield,
  Key,
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  role: AppRole;
  onSelectTab: (tab: TabType) => void;
  onToggleRole: (role: AppRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  role,
  onSelectTab,
  onToggleRole,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'websites', label: 'Websites', icon: Globe2 },
    { id: 'chatbot-settings', label: 'Chatbot Settings', icon: Settings },
    { id: 'install-widget', label: 'Install Widget', icon: Code2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <aside className="w-64 bg-[#fbfbfe] border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen select-none">
      {/* Brand Top Header */}
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#5b50e6] flex items-center justify-center text-white shadow-sm shadow-[#5b50e6]/25">
            <MessageSquare className="w-5 h-5 fill-white/20 stroke-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-lg tracking-tight leading-tight">
              Sitewise AI
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Website Chatbot Builder
            </div>
          </div>
        </div>

        {/* Client Navigation Items */}
        <div className="p-4 space-y-1.5">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Bot Builder Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = role === 'client' && activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onToggleRole('client');
                  onSelectTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5b50e6]/10 text-[#5b50e6] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#5b50e6]' : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Admin Navigation Section */}
        <div className="px-4 pt-2 space-y-1.5 border-t border-slate-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600/90 flex items-center justify-between">
            <span>Commercial Admin</span>
            <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-bold">
              SELLER
            </span>
          </div>

          <button
            onClick={() => onToggleRole('admin')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-amber-500 text-white font-semibold shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-amber-50/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className={`w-4 h-4 ${role === 'admin' ? 'text-white' : 'text-amber-600'}`} />
              <span>Admin Dashboard</span>
            </div>
            <Key className={`w-3.5 h-3.5 ${role === 'admin' ? 'text-white/80' : 'text-slate-400'}`} />
          </button>
        </div>
      </div>

      {/* Footer Branding Card */}
      <div className="p-5">
        <div className="p-3.5 rounded-xl border border-indigo-100/80 bg-white/80 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#5b50e6] shrink-0">
            <Zap className="w-4 h-4 fill-[#5b50e6]/30" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] text-slate-400 font-medium">
              Powered by
            </div>
            <div className="text-xs font-semibold text-slate-800 truncate">
              Supabase + OpenAI
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-[11px] text-slate-400 font-medium">
          Build smarter. Answer faster.
        </div>
      </div>
    </aside>
  );
};

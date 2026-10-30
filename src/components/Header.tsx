import React, { useState } from 'react';
import { AppRole } from '../types.ts';
import {
  ChevronDown,
  ExternalLink,
  HelpCircle,
  LogOut,
  ShieldCheck,
  User,
  Shield,
  Layers,
  DollarSign,
} from 'lucide-react';

interface HeaderProps {
  role: AppRole;
  onToggleRole: (role: AppRole) => void;
  onOpenLivePreview?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onToggleRole,
  onOpenLivePreview,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-xs flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Subtle breadcrumb indicator */}
        <span className="text-xs font-medium text-slate-400">Workspace</span>
        <span className="text-slate-300">/</span>
        {role === 'admin' ? (
          <span className="text-xs font-bold text-amber-900 bg-amber-100/80 border border-amber-200/70 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-amber-600" />
            <span>Super Admin Dashboard (Seller Mode)</span>
          </span>
        ) : (
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
            Production Bot (AcmeCorp)
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Mode Switcher Button */}
        {role === 'client' ? (
          <button
            onClick={() => onToggleRole('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-500/30 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Open Admin Dashboard</span>
          </button>
        ) : (
          <button
            onClick={() => onToggleRole('client')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Switch to Bot Builder</span>
          </button>
        )}

        {role === 'client' && onOpenLivePreview && (
          <button
            onClick={onOpenLivePreview}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#5b50e6] hover:text-[#4d42d4] bg-[#5b50e6]/10 hover:bg-[#5b50e6]/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test Live Bot</span>
          </button>
        )}

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 py-1 pl-1 pr-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs text-white ${
              role === 'admin' ? 'bg-amber-500' : 'bg-[#5b50e6]'
            }`}>
              {role === 'admin' ? 'A' : 'U'}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {role === 'admin' ? 'Admin' : 'User'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs font-medium text-slate-700 animate-in fade-in duration-150">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-900">
                  {role === 'admin' ? 'Platform Administrator' : 'Client Account'}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  admin@sitewise.ai
                </div>
              </div>

              <button
                onClick={() => {
                  onToggleRole(role === 'admin' ? 'client' : 'admin');
                  setDropdownOpen(false);
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-amber-50 flex items-center gap-2 text-amber-800 font-semibold"
              >
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>Switch to {role === 'admin' ? 'Bot Builder View' : 'Admin Dashboard'}</span>
              </button>

              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Profile</span>
              </button>
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Security & API Keys</span>
              </button>
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Documentation</span>
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

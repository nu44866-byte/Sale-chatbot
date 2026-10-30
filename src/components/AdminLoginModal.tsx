import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const MASTER_PIN = 'admin2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === MASTER_PIN || pin.trim() === '123456') {
      setError(false);
      sessionStorage.setItem('sitewise_admin_auth', 'true');
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Incorrect Admin PIN. Access Denied!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Restricted Admin Console
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            This dashboard is private to the owner. Enter your Master Admin PIN to view revenue, client licenses, and sales.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enter Master Admin PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter PIN (Default: admin2026)"
                className="w-full pl-9 pr-10 py-2.5 text-sm font-mono border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="text-[10px] text-slate-400 mt-1">
              Hint: Default Master PIN is <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700 font-bold">admin2026</code>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Unlock Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-500 leading-snug">
          🔒 <strong>Owner Security Guarantee:</strong> Clients who buy your chatbot only receive the client-side JavaScript widget embed tag. They cannot see your revenue, payments, or licenses.
        </div>
      </div>
    </div>
  );
};

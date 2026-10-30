import React, { useState } from 'react';
import { AnalyticsMetric, ConversationLog } from '../types.ts';
import {
  BarChart2,
  TrendingUp,
  MessageSquare,
  Users,
  Clock,
  ThumbsUp,
  CheckCircle2,
  Calendar,
  Search,
  Bot,
  User,
  ArrowUpRight,
} from 'lucide-react';

interface AnalyticsViewProps {
  metrics: AnalyticsMetric;
  conversations: ConversationLog[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  metrics,
  conversations,
}) => {
  const [selectedLog, setSelectedLog] = useState<ConversationLog | null>(null);
  const [searchLog, setSearchLog] = useState('');

  const filteredLogs = conversations.filter(
    (c) =>
      c.user.toLowerCase().includes(searchLog.toLowerCase()) ||
      c.snippet.toLowerCase().includes(searchLog.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(searchLog.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Chatbot Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry, user query satisfaction, resolution rate, and lead conversion.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Last 30 Days (Oct 1 - Oct 30)</span>
        </div>
      </div>

      {/* KPI 4-Card Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Total Conversations
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5b50e6] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {metrics.totalConversations.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Resolution Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {metrics.resolutionRate}%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+3.2% satisfaction</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Avg Response Time
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 font-mono tabular-nums">
            {metrics.avgResponseTime}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Supabase pgvector index
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Leads Captured
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 tabular-nums">
            {metrics.leadsCollected}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>18.5% conversion rate</span>
          </div>
        </div>
      </div>

      {/* Middle row: Popular Queries & Weekly Volume Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Traffic Simulated Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Conversations Over Time
            </h2>
            <div className="text-xs text-slate-500 font-medium">Daily Active Chats</div>
          </div>

          <div className="h-52 flex items-end justify-between gap-3 pt-6 pb-2">
            {[
              { day: 'Mon', count: 180, height: '60%' },
              { day: 'Tue', count: 240, height: '80%' },
              { day: 'Wed', count: 210, height: '70%' },
              { day: 'Thu', count: 310, height: '100%' },
              { day: 'Fri', count: 260, height: '85%' },
              { day: 'Sat', count: 120, height: '40%' },
              { day: 'Sun', count: 95, height: '32%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.count}
                </div>
                <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end h-36">
                  <div
                    className="w-full bg-[#5b50e6] hover:bg-[#4d42d4] rounded-t-lg transition-all"
                    style={{ height: bar.height }}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Queried Topics */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Top Inquired Topics
          </h2>

          <div className="space-y-3">
            {[
              { label: 'Web Development Services', count: 420, pct: '48%' },
              { label: 'Pricing & Packages', count: 315, pct: '36%' },
              { label: 'AI Integrations & LLMs', count: 290, pct: '32%' },
              { label: 'Onboarding & Contact Form', count: 180, pct: '21%' },
              { label: 'Cloud Architecture SLAs', count: 95, pct: '11%' },
            ].map((topic, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate">{topic.label}</span>
                  <span className="text-slate-400 font-mono tabular-nums">{topic.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5b50e6] rounded-full"
                    style={{ width: topic.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation History Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Visitor Conversations
            </h2>
            <p className="text-xs text-slate-500">
              Click any conversation to inspect the full interactive transcript.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchLog}
              onChange={(e) => setSearchLog(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Visitor</th>
                <th className="px-4 py-3">Summary Snippet</th>
                <th className="px-4 py-3">Topics</th>
                <th className="px-4 py-3">Messages</th>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3 text-right">Transcript</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedLog(c)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                    {c.user}
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                    {c.snippet}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {c.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700 tabular-nums">
                    {c.messagesCount}
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {c.startedAt}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs font-semibold text-[#5b50e6] hover:underline">
                      View Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedLog.user}
                </h3>
                <div className="text-[11px] text-slate-400">
                  Started {selectedLog.startedAt} · {selectedLog.history.length} messages
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto p-1 text-xs">
              {selectedLog.history.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-lg bg-[#5b50e6] text-white flex items-center justify-center shrink-0 text-[10px]">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[80%] text-xs leading-relaxed whitespace-pre-line ${
                      m.sender === 'user'
                        ? 'bg-[#5b50e6] text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                    <div
                      className={`text-[9.5px] mt-1 ${
                        m.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

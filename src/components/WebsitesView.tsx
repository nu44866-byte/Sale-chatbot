import React, { useState } from 'react';
import { CrawledWebsite } from '../types.ts';
import {
  Globe2,
  Plus,
  RotateCw,
  Search,
  ExternalLink,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
  Layers,
} from 'lucide-react';

interface WebsitesViewProps {
  websites: CrawledWebsite[];
  onAddWebsite: (site: CrawledWebsite) => void;
  onDeleteWebsite: (id: string) => void;
  onReindex: (id: string) => void;
}

export const WebsitesView: React.FC<WebsitesViewProps> = ({
  websites,
  onAddWebsite,
  onDeleteWebsite,
  onReindex,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [selectedInspectSite, setSelectedInspectSite] = useState<CrawledWebsite | null>(null);

  const filtered = websites.filter(
    (w) =>
      w.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const newSite: CrawledWebsite = {
      id: `site-${Date.now()}`,
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      title: newTitle || newUrl.replace(/^https?:\/\//, ''),
      status: 'indexed',
      pagesCrawled: Math.floor(Math.random() * 5) + 1,
      contentChunks: Math.floor(Math.random() * 40) + 15,
      lastIndexed: 'Just now',
      size: `${Math.floor(Math.random() * 300) + 80} KB`,
      sampleSnippets: [
        'Extracted page headers, company overview, and product specifications.',
        'Customer FAQ answers automatically indexed for vector search retrieval.',
      ],
    };

    onAddWebsite(newSite);
    setNewUrl('');
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Indexed Websites
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage domains, crawled pages, and content embeddings used by your chatbot.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5b50e6] hover:bg-[#4d42d4] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Website URL</span>
        </button>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indexed domains..."
            className="w-full pl-9 pr-4 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
          />
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 font-medium self-end sm:self-auto">
          <div>
            Total Sites: <span className="font-bold text-slate-900 tabular-nums">{websites.length}</span>
          </div>
          <div>
            Total Pages: <span className="font-bold text-slate-900 tabular-nums">{websites.reduce((acc, s) => acc + s.pagesCrawled, 0)}</span>
          </div>
          <div>
            Total Chunks: <span className="font-bold text-slate-900 tabular-nums">{websites.reduce((acc, s) => acc + s.contentChunks, 0)}</span>
          </div>
        </div>
      </div>

      {/* Websites Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3.5">Website & Domain</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Pages</th>
                <th className="px-6 py-3.5">Chunks</th>
                <th className="px-6 py-3.5">Size</th>
                <th className="px-6 py-3.5">Last Crawled</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#5b50e6] flex items-center justify-center shrink-0">
                        <Globe2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">
                          {site.title}
                        </div>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-400 hover:text-[#5b50e6] flex items-center gap-1 font-mono truncate"
                        >
                          <span>{site.url}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Ready</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 tabular-nums">
                    {site.pagesCrawled}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 tabular-nums">
                    {site.contentChunks}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono tabular-nums">
                    {site.size}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{site.lastIndexed}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInspectSite(site)}
                        className="p-1.5 text-slate-500 hover:text-[#5b50e6] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Inspect Chunks"
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReindex(site.id)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Re-index site"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteWebsite(site.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete site"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Index New Website URL
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Label / Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp Knowledge Base"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#5b50e6]"
                />
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-900">
                Our automated spider will scrape HTML copy, remove boilerplate tags, generate OpenAI text embeddings, and store them securely.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#5b50e6] hover:bg-[#4d42d4] rounded-xl shadow-xs"
                >
                  Start Crawling
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Chunks Modal */}
      {selectedInspectSite && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Extracted Content Chunks
                </h3>
                <p className="text-xs text-slate-500 font-mono truncate max-w-sm">
                  {selectedInspectSite.url}
                </p>
              </div>
              <button
                onClick={() => setSelectedInspectSite(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {selectedInspectSite.sampleSnippets.map((snippet, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-700 leading-relaxed font-mono"
                >
                  <div className="text-[10px] font-bold text-indigo-600 mb-1">
                    Chunk #{idx + 1} · 1536-dim Embedding Vector
                  </div>
                  {snippet}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedInspectSite(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { AppState, LegalSection } from '../types.ts';

interface LegalTabProps {
  legal: AppState['legal'];
  updateLegal: (page: 'privacy' | 'terms', field: string, value: any) => void;
  updateSection: (page: 'privacy' | 'terms', id: string, field: keyof LegalSection, value: string) => void;
  addSection: (page: 'privacy' | 'terms') => void;
  deleteSection: (page: 'privacy' | 'terms', id: string) => void;
}

const LegalTab: React.FC<LegalTabProps> = ({ legal, updateLegal, updateSection, addSection, deleteSection }) => {
  const handleDeleteSection = (page: 'privacy' | 'terms', id: string, title: string) => {
    if (window.confirm(`Delete section "${title}" from ${page}?`)) deleteSection(page, id);
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {(['privacy', 'terms'] as const).map(page => (
        <div key={page} className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <div className="flex justify-between items-center border-b border-slate-700 pb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight capitalize">{page}</h2>
            <button onClick={() => addSection(page)} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-xl text-xs font-black shadow-lg">ADD SECTION</button>
          </div>
          <div className="space-y-6">
            {legal[page].sections.map((section, idx) => (
              <div key={section.id} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative group">
                <button onClick={() => handleDeleteSection(page, section.id, section.title)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"><i className="fa-solid fa-trash text-[10px]"></i></button>
                <input value={section.title} onChange={e => updateSection(page, section.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-slate-700 text-white font-black mb-4 outline-none" placeholder="Title" />
                <textarea value={section.content} onChange={e => updateSection(page, section.id, 'content', e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 resize-none" placeholder="Content" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegalTab;

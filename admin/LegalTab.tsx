
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
    if (window.confirm(`Are you sure you want to permanently delete the legal section "${title || 'Untitled'}" from the ${page} page?`)) {
      deleteSection(page, id);
    }
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {(['privacy', 'terms'] as const).map(page => (
        <div key={page} className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <div className="flex justify-between items-center border-b border-slate-700 pb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight capitalize">{page.replace(/([A-Z])/g, ' $1')} Content</h2>
            <button onClick={() => addSection(page)} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95">ADD SECTION</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Page Title</label>
              <input value={legal[page].title} onChange={e => updateLegal(page, 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Page Subtitle</label>
              <input value={legal[page].subtitle} onChange={e => updateLegal(page, 'subtitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-medium" />
            </div>
          </div>

          <div className="space-y-6">
            {legal[page].sections.map((section, idx) => (
              <div key={section.id} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative group">
                <button onClick={() => handleDeleteSection(page, section.id, section.title)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-xl z-10"><i className="fa-solid fa-trash text-[10px]"></i></button>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded bg-slate-900 text-emerald-500 flex items-center justify-center font-black text-xs">{idx + 1}</span>
                    <input value={section.title} onChange={e => updateSection(page, section.id, 'title', e.target.value)} className="flex-grow bg-transparent border-b border-slate-700 text-white font-black outline-none focus:border-emerald-500" placeholder="Section Title" />
                  </div>
                  <textarea value={section.content} onChange={e => updateSection(page, section.id, 'content', e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 font-medium resize-none outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Section content..." />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegalTab;

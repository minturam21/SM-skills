
import React from 'react';
import { SiteConfig } from '../types.ts';

interface FooterTabProps {
  footer: SiteConfig['footer'];
  updateFooterField: (field: string, value: any) => void;
  addSupportLink: () => void;
  updateSupportLink: (index: number, field: 'label' | 'path', value: string) => void;
  deleteSupportLink: (index: number) => void;
}

const FooterTab: React.FC<FooterTabProps> = ({ 
  footer, 
  updateFooterField, 
  addSupportLink, 
  updateSupportLink, 
  deleteSupportLink 
}) => {
  const handleDeleteLink = (idx: number, label: string) => {
    if (window.confirm(`Are you sure you want to delete the support link "${label}"?`)) {
      deleteSupportLink(idx);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Footer Content</h2>
        <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-font"></i> LABELS</h3>
          <div className="space-y-6">
            <textarea value={footer.brandDescription} onChange={e => updateFooterField('brandDescription', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" rows={3} placeholder="Brand Description" />
            <div className="grid grid-cols-2 gap-4">
              <input value={footer.quickLinksLabel} onChange={e => updateFooterField('quickLinksLabel', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" placeholder="Quick Links Title" />
              <input value={footer.supportLinksLabel} onChange={e => updateFooterField('supportLinksLabel', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" placeholder="Support Title" />
            </div>
            <input value={footer.bottomText} onChange={e => updateFooterField('bottomText', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" placeholder="Copyright Text" />
          </div>
        </div>

        <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <div className="flex justify-between items-center">
            <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-link"></i> SUPPORT LINKS</h3>
            <button onClick={addSupportLink} className="bg-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all shadow-lg">ADD LINK</button>
          </div>
          <div className="space-y-4">
            {footer.supportLinks.map((link, idx) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 group">
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Link #{idx+1}</span>
                   <button onClick={() => handleDeleteLink(idx, link.label)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-trash-can text-xs"></i></button>
                </div>
                <input value={link.label} onChange={e => updateSupportLink(idx, 'label', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white" placeholder="Label" />
                <input value={link.path} onChange={e => updateSupportLink(idx, 'path', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-emerald-500 font-mono" placeholder="Path" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTab;

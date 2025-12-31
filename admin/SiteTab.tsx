
import React from 'react';
import { AppState } from '../types.ts';

interface SiteTabProps {
  data: AppState['site'];
  updateField: (field: string, value: any) => void;
  onLogoUploadClick: () => void;
}

const SiteTab: React.FC<SiteTabProps> = ({ data, updateField, onLogoUploadClick }) => (
  <div className="space-y-12 animate-fade-in">
    <div className="flex items-center gap-6 mb-8">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Brand Identity</h2>
      <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
    </div>
    
    <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-700">
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-10">
        <div className="space-y-4 text-center md:text-left">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Institutional Logo</label>
          <div 
            onClick={onLogoUploadClick}
            className="w-48 h-32 bg-white rounded-3xl border-2 border-slate-700 hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-center p-4 overflow-hidden group relative"
          >
            <img 
              src={data.logo || "https://lwfiles.mycourse.app/62a6cd5-public/6efdd5e.png"} 
              alt="Logo Preview" 
              className="max-w-full max-h-full object-contain transition-opacity group-hover:opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <span className="text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600 px-3 py-1.5 rounded-full shadow-2xl">
                Update PNG
              </span>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Best with transparent background PNG</p>
        </div>

        <div className="flex-grow space-y-8 w-full">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Institute Name</label>
            <input 
              value={data.name} 
              onChange={e => updateField('name', e.target.value)} 
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white font-black focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Brand Tagline</label>
            <input 
              value={data.tagline} 
              onChange={e => updateField('tagline', e.target.value)} 
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white font-black focus:border-emerald-500 outline-none transition-colors" 
            />
          </div>
        </div>
      </div>
    </div>

    <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center gap-6">
      <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shrink-0">
        <i className="fa-solid fa-wand-magic-sparkles"></i>
      </div>
      <div>
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Live Preview Enabled</p>
        <p className="text-emerald-200/70 text-xs font-medium italic">
          Changes to the logo and name will reflect immediately in the site header after you press "Save All Changes" at the top.
        </p>
      </div>
    </div>
  </div>
);

export default SiteTab;

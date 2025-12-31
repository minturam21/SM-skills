
import React from 'react';
import { AppState } from '../types.ts';

interface SiteTabProps {
  data: AppState['site'];
  updateField: (field: string, value: any) => void;
  onLogoClick: () => void;
}

const SiteTab: React.FC<SiteTabProps> = ({ data, updateField, onLogoClick }) => (
  <div className="space-y-12 animate-fade-in">
    <div className="flex items-center gap-6 mb-8">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Global Brand Settings</h2>
      <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
    </div>
    
    <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-700 text-center">
      <div className="relative inline-block group mb-6">
        <div className="w-40 h-40 rounded-full border-8 border-slate-800 overflow-hidden bg-slate-800 flex items-center justify-center transition-all group-hover:border-emerald-500/50 shadow-2xl">
          {data.logo ? <img src={data.logo} className="w-full h-full object-cover" /> : <i className="fa-solid fa-building-columns text-5xl text-slate-700"></i>}
        </div>
        <button onClick={onLogoClick} className="absolute bottom-1 right-1 w-12 h-12 bg-emerald-600 rounded-full border-4 border-slate-800 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors shadow-xl">
          <i className="fa-solid fa-camera text-lg"></i>
        </button>
      </div>
      <h4 className="text-sm font-black text-white uppercase tracking-widest">{data.name || 'Your Institute'}</h4>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Institute Official Name</label>
        <input 
          value={data.name} 
          onChange={e => updateField('name', e.target.value)} 
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" 
        />
      </div>
      <div className="space-y-3">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Brand Tagline</label>
        <input 
          value={data.tagline} 
          onChange={e => updateField('tagline', e.target.value)} 
          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" 
        />
      </div>
    </div>
  </div>
);

export default SiteTab;

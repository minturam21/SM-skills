
import React from 'react';
import { AppState } from '../types.ts';

interface HomeTabProps {
  data: AppState['home'];
  updateNestedField: (parent: string, field: string, value: any) => void;
  updateHomeSubField: (parent: string, field: string, value: any) => void;
  onHeroBgClick: () => void;
  onShowcaseImgClick: () => void;
  addHighlight: () => void;
  updateHighlight: (index: number, field: string, value: string) => void;
  deleteHighlight: (index: number) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ 
  data, 
  updateNestedField, 
  updateHomeSubField, 
  onHeroBgClick,
  onShowcaseImgClick,
  addHighlight, 
  updateHighlight, 
  deleteHighlight 
}) => (
  <div className="space-y-16 animate-fade-in">
    <div className="flex items-center gap-6 mb-8">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Home Experience</h2>
      <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
    </div>

    {/* Section Visibility Controls */}
    <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
      <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-layer-group"></i> SECTION VISIBILITY</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: 'Notices Board', key: 'notices' },
          { label: 'Featured Courses', key: 'featuredCourses' },
          { label: 'Gallery Preview', key: 'gallery' },
          { label: 'Industry Tie-ups', key: 'industryTieups' },
          { label: 'Placement Reviews', key: 'placementReviews' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.label}</span>
            <button 
              onClick={() => updateHomeSubField('sections', item.key, !(data.sections as any)[item.key])} 
              className={`w-12 h-6 rounded-full transition-all relative ${ (data.sections as any)[item.key] ? 'bg-emerald-600' : 'bg-slate-600' }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ (data.sections as any)[item.key] ? 'right-1' : 'left-1' }`}></div>
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Hero Controls */}
    <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
      <div className="flex justify-between items-center">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-wand-magic-sparkles"></i> HERO BANNER</h3>
        <button onClick={() => updateNestedField('hero', 'visible', !data.hero.visible)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${data.hero.visible ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>
          {data.hero.visible ? 'VISIBLE' : 'HIDDEN'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Background Image</label>
          <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 group cursor-pointer" onClick={onHeroBgClick}>
            <img src={data.hero.bgImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-black text-xs uppercase">
              <i className="fa-solid fa-camera mr-2 text-xl"></i> Change Image
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <input value={data.hero.title} onChange={e => updateNestedField('hero', 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white font-black" placeholder="Main Headline" />
          <textarea value={data.hero.subtitle} onChange={e => updateNestedField('hero', 'subtitle', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-slate-300 font-medium resize-none" placeholder="Description/Subtitle" />
        </div>
      </div>
    </div>

    {/* Big Showcase Section Management */}
    <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
      <div className="flex justify-between items-center">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-panorama"></i> INSTITUTIONAL SHOWCASE</h3>
        <button onClick={() => updateNestedField('bigShowcase', 'visible', !data.bigShowcase.visible)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${data.bigShowcase.visible ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>
          {data.bigShowcase.visible ? 'VISIBLE' : 'HIDDEN'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Wide Rectangle Photo (Staff/Achievement)</label>
          <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 group cursor-pointer" onClick={onShowcaseImgClick}>
            <img src={data.bigShowcase.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-black text-xs uppercase">
              <i className="fa-solid fa-camera mr-2 text-xl"></i> Upload Wide Image
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Section Title</label>
            <input value={data.bigShowcase.title} onChange={e => updateNestedField('bigShowcase', 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white font-bold" placeholder="Showcase Title" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Short Description</label>
            <textarea value={data.bigShowcase.subtitle} onChange={e => updateNestedField('bigShowcase', 'subtitle', e.target.value)} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-300 text-sm resize-none font-medium" placeholder="Describe this photo..." />
          </div>
        </div>
      </div>
    </div>

    {/* Labels Controls */}
    <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
      <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-heading"></i> SECTION LABELS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notices Header</h4>
          <input value={data.sectionLabels.noticesTitle} onChange={e => updateHomeSubField('sectionLabels', 'noticesTitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Courses Header</h4>
          <input value={data.sectionLabels.coursesTitle} onChange={e => updateHomeSubField('sectionLabels', 'coursesTitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Placement Section Title</h4>
          <input value={data.sectionLabels.placementsTitle} onChange={e => updateHomeSubField('sectionLabels', 'placementsTitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Placement Label (Branding)</h4>
          <input value={data.sectionLabels.placementMainLabel} onChange={e => updateHomeSubField('sectionLabels', 'placementMainLabel', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-emerald-400 font-black uppercase tracking-widest" placeholder="e.g. Placement, Careers, Success" />
        </div>
        <div className="space-y-4 md:col-span-2">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Placement Section Subtitle</h4>
          <textarea value={data.sectionLabels.placementsSubtitle} onChange={e => updateHomeSubField('sectionLabels', 'placementsSubtitle', e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-medium resize-none" />
        </div>
      </div>
    </div>

    {/* Highlights Controls */}
    <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
      <div className="flex justify-between items-center">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-list-check"></i> HIGHLIGHT CARDS</h3>
        <button onClick={addHighlight} className="text-xs font-black bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-full shadow-lg transition-all active:scale-95">ADD HIGHLIGHT</button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {data.highlights.map((item, idx) => (
          <div key={idx} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4 group relative hover:border-emerald-500/30 transition-all">
            <button onClick={() => deleteHighlight(idx)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-xl z-10 hover:bg-red-500 transition-all"><i className="fa-solid fa-xmark"></i></button>
            <input value={item.title} onChange={e => updateHighlight(idx, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-black" placeholder="Highlight Title" />
            <textarea value={item.description} onChange={e => updateHighlight(idx, 'description', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-400 resize-none" placeholder="Short description..." />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-black uppercase">Icon:</span>
              <input value={item.icon} onChange={e => updateHighlight(idx, 'icon', e.target.value)} className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-3 py-1 text-[10px] font-mono text-emerald-500" placeholder="fa-icon-name" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeTab;

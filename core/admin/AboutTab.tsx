
import React from 'react';
import { AppState, TeamMember, AchievementStat, ExtraChapter } from '../types.ts';

interface AboutTabProps {
  data: AppState['about'];
  updateChapter: (chapter: string, field: string, value: any) => void;
  triggerUpload: (path: string) => void;
  addTeamMember: () => void;
  updateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  removeTeamMember: (id: string) => void;
  updateStats: (id: string, field: keyof AchievementStat, value: string) => void;
  addStat: () => void;
  removeStat: (id: string) => void;
  updateValues: (index: number, value: string) => void;
  addValue: () => void;
  removeValue: (index: number) => void;
  addExtraChapter: () => void;
  updateExtraChapter: (id: string, field: keyof ExtraChapter, value: string) => void;
  removeExtraChapter: (id: string) => void;
}

const AboutTab: React.FC<AboutTabProps> = ({ 
  data, 
  updateChapter,
  triggerUpload,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
  updateStats,
  addStat,
  removeStat,
  updateValues,
  addValue,
  removeValue,
  addExtraChapter,
  updateExtraChapter,
  removeExtraChapter
}) => {
  return (
    <div className="space-y-16 animate-fade-in pb-20">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Story Management</h2>
        <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
      </div>

      {/* Chapter 1: Beginning */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-1"></i> CHAPTER: THE BEGINNING</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual Story</label>
              <div onClick={() => triggerUpload('about.beginning.image')} className="aspect-video rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group relative">
                 {data.beginning.image ? <img src={data.beginning.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" /> : <i className="fa-solid fa-image text-3xl text-slate-700"></i>}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 font-black text-[10px] text-white uppercase">Upload Wide Scene</div>
              </div>
           </div>
           <div className="lg:col-span-2 space-y-4">
              <input value={data.beginning.label} onChange={e => updateChapter('beginning', 'label', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-[10px] text-emerald-500 font-black uppercase tracking-widest" placeholder="Section Tag" />
              <input value={data.beginning.title} onChange={e => updateChapter('beginning', 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold" placeholder="Chapter Title" />
              <textarea value={data.beginning.story} onChange={e => updateChapter('beginning', 'story', e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-300 resize-none" placeholder="The founding narrative..." />
           </div>
        </div>
      </div>

      {/* Chapter 2: Learning */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-2"></i> CHAPTER: METHODOLOGY</h3>
        <div className="space-y-4">
           <input value={data.learning.label} onChange={e => updateChapter('learning', 'label', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-[10px] text-emerald-500 font-black uppercase tracking-widest" />
           <input value={data.learning.title} onChange={e => updateChapter('learning', 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold" />
           <textarea value={data.learning.description} onChange={e => updateChapter('learning', 'description', e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-300 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-2">
             <div onClick={() => triggerUpload('about.learning.image1')} className="h-40 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group relative">
                {data.learning.image1 ? <img src={data.learning.image1} className="w-full h-full object-cover" /> : <i className="fa-solid fa-plus"></i>}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-black text-white uppercase">Action Photo 1</div>
             </div>
             <input value={data.learning.caption1} onChange={e => updateChapter('learning', 'caption1', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-slate-400" placeholder="Caption 1" />
           </div>
           <div className="space-y-2">
             <div onClick={() => triggerUpload('about.learning.image2')} className="h-40 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group relative">
                {data.learning.image2 ? <img src={data.learning.image2} className="w-full h-full object-cover" /> : <i className="fa-solid fa-plus"></i>}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-black text-white uppercase">Action Photo 2</div>
             </div>
             <input value={data.learning.caption2} onChange={e => updateChapter('learning', 'caption2', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-slate-400" placeholder="Caption 2" />
           </div>
        </div>
      </div>

      {/* Chapter 3: Mentors */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <div className="flex justify-between items-center">
           <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-3"></i> CHAPTER: THE MENTORS</h3>
           <button onClick={addTeamMember} className="bg-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">ADD FACULTY</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {data.faculty.members.map(member => (
              <div key={member.id} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 relative group">
                 <button onClick={() => removeTeamMember(member.id)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-xl"><i className="fa-solid fa-trash-can text-[10px]"></i></button>
                 <div className="flex gap-4">
                    <div onClick={() => triggerUpload(`about.faculty.members.${member.id}`)} className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden cursor-pointer shrink-0 relative group/p">
                       <img src={member.image} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/p:opacity-100 flex items-center justify-center text-[6px] font-black text-white uppercase text-center">Update Portrait</div>
                    </div>
                    <div className="flex-grow space-y-2">
                       <input value={member.name} onChange={e => updateTeamMember(member.id, 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-bold" placeholder="Full Name" />
                       <input value={member.role} onChange={e => updateTeamMember(member.id, 'role', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-emerald-400 font-black uppercase" placeholder="Job Role" />
                    </div>
                 </div>
                 <textarea value={member.bio} onChange={e => updateTeamMember(member.id, 'bio', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-[11px] text-slate-400 mt-4 resize-none" placeholder="Short bio..." />
              </div>
           ))}
        </div>
      </div>

      {/* Chapter 4: Vision & Values */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-4"></i> CHAPTER: VISION & VALUES</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-4">
              <input value={data.vision.title} onChange={e => updateChapter('vision', 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold" />
              <textarea value={data.vision.content} onChange={e => updateChapter('vision', 'content', e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-300 resize-none" />
           </div>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Institutional Values</span>
                 <button onClick={addValue} className="text-xs text-emerald-500 font-black">+ ADD VALUE</button>
              </div>
              <div className="space-y-2">
                 {data.vision.values.map((v, idx) => (
                    <div key={idx} className="flex gap-2">
                       <input value={v} onChange={e => updateValues(idx, e.target.value)} className="flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white" />
                       <button onClick={() => removeValue(idx)} className="text-red-500 p-2"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Chapter 5: Achievements */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <div className="flex justify-between items-center">
           <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-5"></i> CHAPTER: ACHIEVEMENTS</h3>
           <button onClick={addStat} className="bg-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">ADD STAT</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-6">
              <input value={data.achievements.title} onChange={e => updateChapter('achievements', 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold" />
              <div onClick={() => triggerUpload('about.achievements.image')} className="aspect-video rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group relative">
                 {data.achievements.image ? <img src={data.achievements.image} className="w-full h-full object-cover" /> : <i className="fa-solid fa-image"></i>}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center font-black text-[10px] text-white uppercase">Upload Image</div>
              </div>
           </div>
           <div className="space-y-4">
              <div className="space-y-4">
                 {(data.achievements.stats || []).map((stat) => (
                    <div key={stat.id} className="grid grid-cols-12 gap-4 p-4 bg-slate-800 rounded-2xl border border-slate-700 group/stat relative">
                       <button onClick={() => removeStat(stat.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover/stat:opacity-100 transition-all flex items-center justify-center shadow-xl z-10"><i className="fa-solid fa-xmark text-[10px]"></i></button>
                       <div className="col-span-4">
                         <label className="text-[8px] font-black text-slate-500 uppercase mb-1 block">Value</label>
                         <input value={stat.value} onChange={e => updateStats(stat.id, 'value', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-black" placeholder="94%" />
                       </div>
                       <div className="col-span-8">
                         <label className="text-[8px] font-black text-slate-500 uppercase mb-1 block">Label</label>
                         <input value={stat.label} onChange={e => updateStats(stat.id, 'label', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-[10px] text-slate-500 uppercase font-black" placeholder="Placement Rate" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Extra Chapters Builder */}
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <div className="flex justify-between items-center border-b border-slate-700 pb-6">
           <div>
             <h3 className="text-emerald-500 font-black text-xl flex items-center gap-3">
               <i className="fa-solid fa-folder-plus"></i> EXTRA CHAPTERS
             </h3>
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Append custom chapters to the story</p>
           </div>
           <button 
             onClick={addExtraChapter}
             className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-[10px] font-black shadow-xl transition-all active:scale-95"
           >
             <i className="fa-solid fa-plus mr-2"></i> ADD NEW CHAPTER
           </button>
        </div>

        <div className="space-y-10">
          {(data.extraChapters || []).map((ch, idx) => (
            <div key={ch.id} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/30 transition-all group relative">
              <button 
                onClick={() => removeExtraChapter(ch.id)} 
                className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl"
              >
                <i className="fa-solid fa-trash text-sm"></i>
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div 
                    onClick={() => triggerUpload(`about.extraChapters.${ch.id}`)}
                    className="aspect-square bg-slate-900 rounded-2xl overflow-hidden cursor-pointer group/img border border-slate-700 relative"
                  >
                    {ch.image ? <img src={ch.image} className="w-full h-full object-cover group-hover/img:opacity-40" /> : <div className="w-full h-full flex items-center justify-center text-slate-700 text-3xl"><i className="fa-solid fa-image"></i></div>}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/40 text-white font-black text-[10px] uppercase">Upload Feature Image</div>
                  </div>
                </div>
                <div className="lg:col-span-9 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-600 uppercase">Label (Chapter Num)</label>
                      <input value={ch.label} onChange={e => updateExtraChapter(ch.id, 'label', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-[10px] text-emerald-500 font-black uppercase" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-600 uppercase">Headline</label>
                      <input value={ch.title} onChange={e => updateExtraChapter(ch.id, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white font-bold" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-600 uppercase">Chapter Narrative</label>
                    <textarea value={ch.story} onChange={e => updateExtraChapter(ch.id, 'story', e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-xs text-slate-300 font-medium resize-none" placeholder="Narrative story..." />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;

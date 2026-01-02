
import React from 'react';
import { AppState, CareerService } from '../types.ts';

interface CareerTabProps {
  career: AppState['career'];
  updateHero: (field: string, value: string) => void;
  updateCta: (field: string, value: string) => void;
  updateService: (id: string, field: keyof CareerService, value: string) => void;
  addService: () => void;
  deleteService: (id: string) => void;
  onHeroBgClick: () => void;
  onServiceImageClick: (id: string) => void;
}

const CareerTab: React.FC<CareerTabProps> = ({ 
  career, 
  updateHero, 
  updateCta, 
  updateService, 
  addService, 
  deleteService,
  onHeroBgClick,
  onServiceImageClick
}) => {
  const handleDeleteService = (id: string, title: string) => {
    if (window.confirm(`Delete service "${title}"?`)) deleteService(id);
  };

  return (
    <div className="space-y-16 animate-fade-in">
      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-rocket"></i> HERO</h3>
        <div onClick={onHeroBgClick} className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-800 cursor-pointer group mb-4">
          {career.hero.bgImage ? <img src={career.hero.bgImage} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" /> : <div className="w-full h-full flex items-center justify-center text-slate-600"><i className="fa-solid fa-image text-3xl"></i></div>}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-camera text-white text-xl"></i></div>
        </div>
        <input value={career.hero.title} onChange={e => updateHero('title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-black mb-4" placeholder="Title" />
        <textarea value={career.hero.subtitle} onChange={e => updateHero('subtitle', e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 font-medium resize-none" placeholder="Subtitle" />
      </div>

      <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
        <div className="flex justify-between items-center">
          <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-list-stars"></i> SERVICES</h3>
          <button onClick={addService} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-xl text-xs font-black shadow-lg">ADD SERVICE</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {career.services.map(service => (
            <div key={service.id} className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 relative group">
              <button onClick={() => handleDeleteService(service.id, service.title)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center"><i className="fa-solid fa-trash text-[10px]"></i></button>
              <div onClick={() => onServiceImageClick(service.id)} className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-500 border border-slate-700 overflow-hidden cursor-pointer group/icon relative mb-4">
                {service.image ? <img src={service.image} className="w-full h-full object-cover group-hover/icon:opacity-40 transition-opacity" /> : <i className={`fa-solid ${service.icon || 'fa-star'} text-2xl`}></i>}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/icon:opacity-100 transition-opacity"><i className="fa-solid fa-camera text-white text-xs"></i></div>
              </div>
              <input value={service.title} onChange={e => updateService(service.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-slate-700 text-white font-black mb-2 outline-none" placeholder="Title" />
              <textarea value={service.description} onChange={e => updateService(service.id, 'description', e.target.value)} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-400 resize-none" placeholder="Description" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTab;

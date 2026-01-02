
import React from 'react';
import { SiteConfig, SocialLink } from '../types.ts';

interface ContactTabProps {
  contact: SiteConfig['contact'];
  social: SiteConfig['social'];
  updateContactField: (field: string, value: any) => void;
  addSocialLink: () => void;
  updateSocialLink: (id: string, field: keyof SocialLink, value: string) => void;
  removeSocialLink: (id: string) => void;
}

const ContactTab: React.FC<ContactTabProps> = ({ 
  contact, 
  social, 
  updateContactField, 
  addSocialLink, 
  updateSocialLink, 
  removeSocialLink 
}) => {
  const handleRemoveSocial = (id: string, platform: string) => {
    if (window.confirm(`Remove ${platform} link?`)) {
      removeSocialLink(id);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">Contact & Social</h2>
        <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-envelope-open-text"></i> CORE CONTACT</h3>
          <div className="space-y-6">
            <textarea value={contact.address} onChange={e => updateContactField('address', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" rows={3} placeholder="Address" />
            <input value={contact.phone} onChange={e => updateContactField('phone', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" placeholder="Phone" />
            <input value={contact.email} onChange={e => updateContactField('email', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200" placeholder="Email" />
            <input value={contact.mapUrl} onChange={e => updateContactField('mapUrl', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-emerald-400 font-mono" placeholder="Map URL" />
          </div>
        </div>

        <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
          <div className="flex justify-between items-center">
            <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-share-nodes"></i> SOCIAL MEDIA</h3>
            <button onClick={addSocialLink} className="px-4 py-1.5 bg-emerald-600 rounded-full text-[10px] font-black uppercase transition-all shadow-lg">ADD SOCIAL</button>
          </div>
          <div className="space-y-4">
            {social.map((s) => (
              <div key={s.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 relative group">
                <button onClick={() => handleRemoveSocial(s.id, s.platform)} className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-trash-can text-xs"></i></button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input value={s.platform} onChange={e => updateSocialLink(s.id, 'platform', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white" placeholder="Platform" />
                  <input value={s.icon} onChange={e => updateSocialLink(s.id, 'icon', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-emerald-500 font-mono" placeholder="Icon" />
                </div>
                <input value={s.url} onChange={e => updateSocialLink(s.id, 'url', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300" placeholder="URL" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;

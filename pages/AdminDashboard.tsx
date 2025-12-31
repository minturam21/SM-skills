
import React, { useState, useRef } from 'react';
import { AppState, Course, Notice, GalleryItem, FormField } from '../types.ts';

interface AdminDashboardProps {
  content: AppState;
  onUpdate: (newContent: AppState) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'site' | 'home' | 'courses' | 'notices' | 'gallery' | 'form' | 'contact'>('site');
  const [localContent, setLocalContent] = useState(content);
  const [statusMsg, setStatusMsg] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);
  const heroBgInputRef = useRef<HTMLInputElement>(null);
  
  const activeUploadCategory = useRef<string>('General');
  const activeThumbnailCategory = useRef<string | null>(null);
  const activeCourseId = useRef<string | null>(null);

  const handleSave = () => {
    onUpdate(localContent);
    setStatusMsg('Changes saved successfully! All updates are now live.');
    setTimeout(() => setStatusMsg(''), 5000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('site', 'logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateNestedField('home', 'hero', 'bgImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerGalleryUpload = (category: string) => {
    activeUploadCategory.current = category;
    galleryInputRef.current?.click();
  };

  const triggerThumbnailUpload = (category: string) => {
    activeThumbnailCategory.current = category;
    thumbnailInputRef.current?.click();
  };

  const triggerCourseUpload = (id: string) => {
    activeCourseId.current = id;
    courseInputRef.current?.click();
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const category = activeThumbnailCategory.current;
    if (file && category) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalContent(prev => ({
          ...prev,
          galleryMetadata: {
            ...(prev.galleryMetadata || {}),
            [category]: reader.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCourseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = activeCourseId.current;
    if (file && id) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCourseItem(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          url: reader.result as string,
          category: activeUploadCategory.current,
          title: ''
        };
        setLocalContent(prev => ({
          ...prev,
          gallery: [newItem, ...prev.gallery]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (section: keyof AppState, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const updateNestedField = (section: keyof AppState, parent: string, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [parent]: {
          ...(prev[section] as any)[parent],
          [field]: value
        }
      }
    }));
  };

  const updateHomeSubField = (parent: string, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        [parent]: {
          ...(prev.home as any)[parent],
          [field]: value
        }
      }
    }));
  };

  const updateContactField = (field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      site: {
        ...prev.site,
        contact: {
          ...prev.site.contact,
          [field]: value
        }
      }
    }));
  };

  const updateSocialField = (field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      site: {
        ...prev.site,
        social: {
          ...prev.site.social,
          [field]: value
        }
      }
    }));
  };

  const updateGalleryItem = (id: string, field: keyof GalleryItem, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      gallery: prev.gallery.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const updateCourseItem = (id: string, field: keyof Course, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      courses: prev.courses.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const updateNoticeItem = (id: string, field: keyof Notice, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      notices: prev.notices.map(n => n.id === id ? { ...n, [field]: value } : n)
    }));
  };

  const addHighlight = () => {
    setLocalContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        highlights: [{ icon: 'fa-star', title: 'New Highlight', description: 'Brief description...' }, ...prev.home.highlights]
      }
    }));
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        highlights: prev.home.highlights.map((h, i) => i === index ? { ...h, [field]: value } : h)
      }
    }));
  };

  const deleteHighlight = (index: number) => {
    setLocalContent(prev => ({
      ...prev,
      home: {
        ...prev.home,
        highlights: prev.home.highlights.filter((_, i) => i !== index)
      }
    }));
  };

  const addFormField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: 'New Field Label',
      type: 'text',
      placeholder: 'Enter placeholder...',
      required: false,
      options: []
    };
    setLocalContent(prev => ({
      ...prev,
      enrollmentForm: {
        ...prev.enrollmentForm,
        fields: [newField, ...prev.enrollmentForm.fields]
      }
    }));
  };

  const updateFormField = (id: string, updates: Partial<FormField>) => {
    setLocalContent(prev => ({
      ...prev,
      enrollmentForm: {
        ...prev.enrollmentForm,
        fields: prev.enrollmentForm.fields.map(f => f.id === id ? { ...f, ...updates } : f)
      }
    }));
  };

  const deleteFormField = (id: string) => {
    setLocalContent(prev => ({
      ...prev,
      enrollmentForm: {
        ...prev.enrollmentForm,
        fields: prev.enrollmentForm.fields.filter(f => f.id !== id)
      }
    }));
  };

  const addItem = (section: 'courses' | 'notices', item: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: [{ ...item, id: Date.now().toString() }, ...(prev[section] as any[])]
    }));
  };

  const deleteItem = (section: 'courses' | 'notices' | 'gallery', id: string) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const galleryCategories = Array.from(new Set([
    'Campus', 'Events', 'Classroom', 'Achievement', 'Project', 
    ...localContent.gallery.map(item => item.category)
  ]));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <input type="file" ref={galleryInputRef} className="hidden" accept="image/*" onChange={handleGalleryUpload} />
      <input type="file" ref={thumbnailInputRef} className="hidden" accept="image/*" onChange={handleThumbnailUpload} />
      <input type="file" ref={courseInputRef} className="hidden" accept="image/*" onChange={handleCourseImageUpload} />
      <input type="file" ref={heroBgInputRef} className="hidden" accept="image/*" onChange={handleHeroBgUpload} />

      {/* Admin Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              <i className="fa-solid fa-gauge-high text-emerald-500"></i>
              INSTITUTE ADMIN
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-60">Creative Control Suite</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-black shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <i className="fa-solid fa-check mr-2"></i> SAVE ALL CHANGES
            </button>
          </div>
        </div>
        {statusMsg && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-lg text-center text-xs font-black animate-pulse">
            {statusMsg}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {(['site', 'home', 'courses', 'notices', 'gallery', 'form', 'contact'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-4 rounded-2xl font-black transition-all capitalize flex items-center gap-3 border ${
                activeTab === tab 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl translate-x-1' 
                  : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <i className={`fa-solid fa-${
                tab === 'site' ? 'globe' : 
                tab === 'home' ? 'house' : 
                tab === 'courses' ? 'graduation-cap' : 
                tab === 'notices' ? 'bullhorn' : 
                tab === 'gallery' ? 'images' : 
                tab === 'contact' ? 'address-book' : 'wpforms'
              } text-lg`}></i>
              {tab === 'form' ? 'Apply Form' : tab === 'contact' ? 'Contact Info' : tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-3xl overflow-hidden min-h-[70vh]">
          
          {/* SITE TAB */}
          {activeTab === 'site' && (
            <div className="space-y-12 animate-fade-in">
              <SectionHeader title="Global Brand Settings" />
              <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-700 text-center">
                 <div className="relative inline-block group mb-6">
                   <div className="w-40 h-40 rounded-full border-8 border-slate-800 overflow-hidden bg-slate-800 flex items-center justify-center transition-all group-hover:border-emerald-500/50 shadow-2xl">
                      {localContent.site.logo ? <img src={localContent.site.logo} className="w-full h-full object-cover" /> : <i className="fa-solid fa-building-columns text-5xl text-slate-700"></i>}
                   </div>
                   <button onClick={() => logoInputRef.current?.click()} className="absolute bottom-1 right-1 w-12 h-12 bg-emerald-600 rounded-full border-4 border-slate-800 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors shadow-xl">
                     <i className="fa-solid fa-camera text-lg"></i>
                   </button>
                   <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 </div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">{localContent.site.name || 'Your Institute'}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Institute Official Name</label>
                  <input value={localContent.site.name} onChange={e => updateField('site', 'name', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Brand Tagline</label>
                  <input value={localContent.site.tagline} onChange={e => updateField('site', 'tagline', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-12 animate-fade-in">
              <SectionHeader title="Contact & Reachability" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
                  <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3">
                    <i className="fa-solid fa-envelope-open-text"></i> CORE CONTACT
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Physical Address</label>
                      <textarea value={localContent.site.contact.address} onChange={e => updateContactField('address', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium resize-none" rows={3} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                        <input value={localContent.site.contact.phone} onChange={e => updateContactField('phone', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                        <input value={localContent.site.contact.email} onChange={e => updateContactField('email', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
                  <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3">
                    <i className="fa-solid fa-map-location-dot"></i> MAPS & SOCIAL
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Google Maps Embed URL</label>
                      <input value={localContent.site.contact.mapUrl} onChange={e => updateContactField('mapUrl', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-emerald-400 font-mono" placeholder="Paste iframe src..." />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <input value={localContent.site.social.facebook} onChange={e => updateSocialField('facebook', e.target.value)} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200" placeholder="Facebook Profile Link" />
                      <input value={localContent.site.social.linkedin} onChange={e => updateSocialField('linkedin', e.target.value)} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200" placeholder="LinkedIn Profile Link" />
                      <input value={localContent.site.social.twitter} onChange={e => updateSocialField('twitter', e.target.value)} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200" placeholder="Twitter/X Profile Link" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="space-y-16 animate-fade-in">
              <SectionHeader title="Home Experience" />
              <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
                <div className="flex justify-between items-center">
                   <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-wand-magic-sparkles"></i> HERO BANNER</h3>
                   <button onClick={() => updateNestedField('home', 'hero', 'visible', !localContent.home.hero.visible)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${localContent.home.hero.visible ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>
                    {localContent.home.hero.visible ? 'VISIBLE' : 'HIDDEN'}
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Background Image</label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 group">
                      <img src={localContent.home.hero.bgImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                      <button onClick={() => heroBgInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-black text-xs uppercase">
                        <i className="fa-solid fa-camera mr-2 text-xl"></i> Change Image
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    <input value={localContent.home.hero.title} onChange={e => updateNestedField('home', 'hero', 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white font-black" placeholder="Main Headline" />
                    <textarea value={localContent.home.hero.subtitle} onChange={e => updateNestedField('home', 'hero', 'subtitle', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-slate-300 font-medium resize-none" placeholder="Description/Subtitle" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
                <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-heading"></i> SECTION LABELS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notices Header</h4>
                    <input value={localContent.home.sectionLabels.noticesTitle} onChange={e => updateHomeSubField('sectionLabels', 'noticesTitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Courses Header</h4>
                    <input value={localContent.home.sectionLabels.coursesTitle} onChange={e => updateHomeSubField('sectionLabels', 'coursesTitle', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-bold" />
                  </div>
                </div>
              </div>

              <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-emerald-500 font-black text-lg flex items-center gap-3"><i className="fa-solid fa-list-check"></i> HIGHLIGHT CARDS</h3>
                  <button onClick={addHighlight} className="text-xs font-black bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-full shadow-lg transition-all active:scale-95">ADD HIGHLIGHT</button>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {localContent.home.highlights.map((item, idx) => (
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
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-center">
                <SectionHeader title="Program Management" />
                <button onClick={() => addItem('courses', { name: 'New Program', duration: '0 Months', mode: 'Hybrid', description: 'Description...', status: 'Active', image: 'https://picsum.photos/800/600', price: '$0' })} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-xs font-black shadow-xl flex items-center gap-2 transition-all active:scale-95">
                  <i className="fa-solid fa-plus"></i> ADD PROGRAM
                </button>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {localContent.courses.map(course => (
                  <div key={course.id} className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-700 group transition-all hover:border-emerald-500/30">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      <div className="lg:col-span-1">
                         <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-800 group/img cursor-pointer" onClick={() => triggerCourseUpload(course.id)}>
                            <img src={course.image} className="w-full h-full object-cover transition-opacity group-hover/img:opacity-50" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"><i className="fa-solid fa-upload text-white text-2xl"></i></div>
                         </div>
                      </div>
                      <div className="lg:col-span-3 space-y-4">
                        <div className="flex justify-between items-center">
                          <input value={course.name} onChange={e => updateCourseItem(course.id, 'name', e.target.value)} className="text-xl font-black bg-transparent border-b border-slate-700 text-white w-full mr-4 outline-none focus:border-emerald-500 transition-colors" placeholder="Course Name" />
                          <button onClick={() => deleteItem('courses', course.id)} className="text-red-500 hover:text-red-400 p-2"><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           <input value={course.duration} onChange={e => updateCourseItem(course.id, 'duration', e.target.value)} className="bg-slate-800 p-2 rounded text-sm text-white" placeholder="Duration" />
                           <input value={course.price} onChange={e => updateCourseItem(course.id, 'price', e.target.value)} className="bg-slate-800 p-2 rounded text-sm text-white" placeholder="Price Tag" />
                           <select value={course.status} onChange={e => updateCourseItem(course.id, 'status', e.target.value)} className="bg-slate-800 p-2 rounded text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500">
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                           </select>
                        </div>
                        <textarea value={course.description} onChange={e => updateCourseItem(course.id, 'description', e.target.value)} className="w-full bg-slate-800 p-3 rounded text-sm text-slate-300 resize-none outline-none focus:ring-1 focus:ring-emerald-500" rows={2} placeholder="Course summary..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-center">
                <SectionHeader title="Notice Board" />
                <button onClick={() => addItem('notices', { date: new Date().toISOString().split('T')[0], title: 'New Notice', description: 'Notice text...', isImportant: false, category: 'General' })} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-xs font-black shadow-xl flex items-center gap-2 transition-all active:scale-95">
                  <i className="fa-solid fa-plus"></i> NEW NOTICE
                </button>
              </div>
              <div className="space-y-6">
                {localContent.notices.map(notice => (
                  <div key={notice.id} className="bg-slate-900/50 p-6 rounded-[1.5rem] border border-slate-700 flex gap-4 hover:border-emerald-500/30 transition-all">
                    <div className="flex-grow space-y-4">
                      <div className="flex flex-col md:row gap-4">
                        <input value={notice.title} onChange={e => updateNoticeItem(notice.id, 'title', e.target.value)} className="bg-transparent border-b border-slate-700 font-bold text-white flex-grow outline-none focus:border-emerald-500 transition-colors" placeholder="Notice Headline" />
                        <div className="flex gap-2">
                           <input type="date" value={notice.date} onChange={e => updateNoticeItem(notice.id, 'date', e.target.value)} className="bg-slate-800 text-xs p-2 rounded text-slate-300" />
                           <select value={notice.category} onChange={e => updateNoticeItem(notice.id, 'category', e.target.value)} className="bg-slate-800 text-xs p-2 rounded text-slate-300">
                              <option value="General">General</option>
                              <option value="Urgent">Urgent</option>
                              <option value="New">New</option>
                              <option value="Holiday">Holiday</option>
                              <option value="Event">Event</option>
                           </select>
                        </div>
                      </div>
                      <textarea value={notice.description} onChange={e => updateNoticeItem(notice.id, 'description', e.target.value)} className="w-full bg-slate-800 p-3 rounded-lg text-xs h-20 text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Notice details..." />
                    </div>
                    <button onClick={() => deleteItem('notices', notice.id)} className="text-red-500 self-center p-3 hover:bg-red-500/10 rounded-xl transition-colors"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <SectionHeader title="Media Albums" />
                <div className="flex gap-2">
                  <input placeholder="New Album Name..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none" />
                  <button onClick={() => { if(newCategoryName.trim()) { triggerGalleryUpload(newCategoryName.trim()); setNewCategoryName(''); } }} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95">CREATE</button>
                </div>
              </div>
              {galleryCategories.map(category => {
                const items = localContent.gallery.filter(item => item.category === category);
                const thumbnail = localContent.galleryMetadata?.[category];
                return (
                  <div key={category} className="space-y-6 bg-slate-900/20 p-6 rounded-[2rem] border border-slate-700/30">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                      <div className="flex items-center gap-4">
                        <div onClick={() => triggerThumbnailUpload(category)} className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer flex items-center justify-center overflow-hidden hover:border-emerald-500 transition-all group relative">
                          {thumbnail ? <img src={thumbnail} className="w-full h-full object-cover group-hover:opacity-50" /> : <i className="fa-solid fa-image text-slate-700"></i>}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] font-black text-white uppercase text-center p-1">Change Cover</div>
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-white">{category}</h3>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{items.length} Images</p>
                        </div>
                      </div>
                      <button onClick={() => triggerGalleryUpload(category)} className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">Add Photo</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      {items.map(item => (
                        <div key={item.id} className="relative group bg-slate-900/40 p-4 rounded-2xl border border-slate-700/50 transition-all hover:border-emerald-500/20">
                          <div className="aspect-square rounded-xl overflow-hidden border border-slate-800 relative">
                             <img src={item.url} className="w-full h-full object-cover" />
                             <button onClick={() => deleteItem('gallery', item.id)} className="absolute top-2 right-2 bg-red-600 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-red-500"><i className="fa-solid fa-trash-can text-xs text-white"></i></button>
                          </div>
                          {/* OPTIONAL CAPTION FIELD */}
                          <div className="mt-3">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Caption (Optional)</label>
                            <input 
                              value={item.title || ''} 
                              onChange={e => updateGalleryItem(item.id, 'title', e.target.value)} 
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500 transition-colors" 
                              placeholder="Add a caption..." 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {galleryCategories.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-[3rem]">
                   <i className="fa-solid fa-images text-5xl text-slate-700 mb-4 block"></i>
                   <p className="text-slate-500 font-black uppercase tracking-widest">No albums created</p>
                </div>
              )}
            </div>
          )}

          {/* FORM TAB */}
          {activeTab === 'form' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-center">
                <SectionHeader title="Admission Form Builder" />
                <button onClick={addFormField} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-3 rounded-full text-xs font-black shadow-xl transition-all flex items-center gap-2 active:scale-95"><i className="fa-solid fa-plus"></i> ADD FIELD</button>
              </div>
              <div className="space-y-4">
                {localContent.enrollmentForm.fields.map((field, idx) => (
                  <div key={field.id} className="bg-slate-900/50 p-6 rounded-[1.5rem] border border-slate-700 flex gap-4 items-center group hover:border-emerald-500/30 transition-all">
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-emerald-500 border border-slate-700">{idx + 1}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-grow">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Label</label>
                        <input value={field.label} onChange={e => updateFormField(field.id, { label: e.target.value })} className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-sm text-white" placeholder="Field Label" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Type</label>
                        <select value={field.type} onChange={e => updateFormField(field.id, { type: e.target.value as any })} className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-sm text-slate-300">
                            <option value="text">Short Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="course-select">Course Dropdown</option>
                            <option value="textarea">Large Message</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Placeholder</label>
                        <input value={field.placeholder} onChange={e => updateFormField(field.id, { placeholder: e.target.value })} className="w-full bg-slate-800 border border-slate-700 p-2 rounded-lg text-sm text-white" placeholder="Placeholder..." />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <button onClick={() => updateFormField(field.id, { required: !field.required })} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${field.required ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {field.required ? 'REQUIRED' : 'OPTIONAL'}
                       </button>
                       <button onClick={() => deleteFormField(field.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-colors"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-6 mb-8">
    <h2 className="text-2xl font-black text-white uppercase tracking-tight shrink-0">{title}</h2>
    <div className="flex-grow h-px bg-slate-700 opacity-50"></div>
  </div>
);

export default AdminDashboard;

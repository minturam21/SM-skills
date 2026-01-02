
import React, { useState, useRef, useEffect } from 'react';
import { AppState, Course, Notice, GalleryItem, FormField, SocialLink, PlacementStat, StudentReview, IndustryPartner, LegalSection, CareerService, FAQItem } from '../types.ts';
import { INITIAL_CONTENT } from '../data/defaultContent.ts';
import { optimizeImage } from '../utils/imageOptimizer.ts';

// Modular Sections
import SiteTab from '../admin/SiteTab.tsx';
import HomeTab from '../admin/HomeTab.tsx';
import CoursesTab from '../admin/CoursesTab.tsx';
import NoticesTab from '../admin/NoticesTab.tsx';
import GalleryTab from '../admin/GalleryTab.tsx';
import FAQTab from '../admin/FAQTab.tsx';
import FormTab from '../admin/FormTab.tsx';
import ContactTab from '../admin/ContactTab.tsx';
import FooterTab from '../admin/FooterTab.tsx';
import PlacementsTab from '../admin/PlacementsTab.tsx';
import LegalTab from '../admin/LegalTab.tsx';
import CareerTab from '../admin/CareerTab.tsx';

interface AdminDashboardProps {
  content: AppState;
  onUpdate: (newContent: AppState) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'site' | 'home' | 'courses' | 'notices' | 'gallery' | 'faq' | 'form' | 'contact' | 'footer' | 'placements' | 'legal' | 'career'>('site');
  const [localContent, setLocalContent] = useState(content);
  const [statusMsg, setStatusMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);
  const heroBgInputRef = useRef<HTMLInputElement>(null);
  const showcaseImgInputRef = useRef<HTMLInputElement>(null);
  const reviewInputRef = useRef<HTMLInputElement>(null);
  const partnerInputRef = useRef<HTMLInputElement>(null);
  const careerHeroBgInputRef = useRef<HTMLInputElement>(null);
  const careerServiceInputRef = useRef<HTMLInputElement>(null);
  
  const activeUploadCategory = useRef<string>('General');
  const activeThumbnailCategory = useRef<string | null>(null);
  const activeCourseId = useRef<string | null>(null);
  const activeReviewId = useRef<string | null>(null);
  const activePartnerId = useRef<string | null>(null);
  const activeCareerServiceId = useRef<string | null>(null);

  const handleSave = async () => {
    setIsProcessing(true);
    setStatusMsg('Saving changes...');
    await new Promise(r => setTimeout(r, 600)); 
    onUpdate(localContent);
    setStatusMsg('Changes saved successfully!');
    setIsProcessing(false);
    setTimeout(() => setStatusMsg(''), 5000);
  };

  const handleDiscard = () => {
    if (window.confirm("Discard all unsaved changes?")) {
      setLocalContent(content);
      setStatusMsg('Changes discarded.');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm("RESTORE FACTORY SETTINGS?")) {
      setLocalContent(INITIAL_CONTENT);
      onUpdate(INITIAL_CONTENT);
      setStatusMsg('Site has been reset.');
      setTimeout(() => setStatusMsg(''), 5000);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const optimizedUrl = await optimizeImage(file);
        callback(optimizedUrl);
      } catch (err) {
        console.error("Optimization failed", err);
        setStatusMsg("Error: Image invalid.");
      } finally {
        setIsProcessing(false);
        e.target.value = '';
      }
    }
  };

  const updateField = (section: keyof AppState, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    }));
  };

  const updateNestedField = (section: keyof AppState, parent: string, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [parent]: { ...(prev[section] as any)[parent], [field]: value } }
    }));
  };

  const updateHomeSubField = (parent: string, field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      home: { ...prev.home, [parent]: { ...(prev.home as any)[parent], [field]: value } }
    }));
  };

  const updateContactField = (field: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      site: { ...prev.site, contact: { ...prev.site.contact, [field]: value } }
    }));
  };

  // Add missing course item update handler
  const updateCourseItem = (id: string, field: keyof Course, value: any) => {
    setLocalContent(prev => ({ ...prev, courses: prev.courses.map(c => c.id === id ? { ...c, [field]: value } : c) }));
  };

  // Add missing notice item update handler
  const updateNoticeItem = (id: string, field: keyof Notice, value: any) => {
    setLocalContent(prev => ({ ...prev, notices: prev.notices.map(n => n.id === id ? { ...n, [field]: value } : n) }));
  };

  // Generic List Handlers
  const addItem = (section: 'courses' | 'notices' | 'gallery', item: any) => {
    setLocalContent(prev => ({ ...prev, [section]: [{ ...item, id: Date.now().toString() }, ...(prev[section] as any[])] }));
  };

  const deleteItem = (section: 'courses' | 'notices' | 'gallery' | 'faqs', id: string) => {
    setLocalContent(prev => ({ ...prev, [section]: (prev[section] as any[]).filter((item: any) => item.id !== id) }));
  };

  // FAQ Handlers
  const updateFAQItem = (id: string, field: keyof FAQItem, value: string) => {
    setLocalContent(prev => ({ ...prev, faqs: prev.faqs.map(f => f.id === id ? { ...f, [field]: value } : f) }));
  };

  const addFAQItem = () => {
    const newFaq: FAQItem = { id: Date.now().toString(), question: 'New Question?', answer: 'Answer text here...', category: 'General' };
    setLocalContent(prev => ({ ...prev, faqs: [newFaq, ...prev.faqs] }));
  };

  // Added reorderFAQs logic to fix TypeScript prop error in FAQTab
  const reorderFAQs = (startIndex: number, endIndex: number) => {
    if (endIndex < 0 || endIndex >= localContent.faqs.length) return;
    setLocalContent(prev => {
      const result = Array.from(prev.faqs);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, faqs: result };
    });
  };

  // Enrollment Page Handlers
  const updateEnrollmentPage = (field: string, value: any) => {
    setLocalContent(prev => ({ ...prev, enrollmentForm: { ...prev.enrollmentForm, [field]: value } }));
  };

  const updateFormField = (id: string, updates: Partial<FormField>) => {
    setLocalContent(prev => ({ ...prev, enrollmentForm: { ...prev.enrollmentForm, fields: prev.enrollmentForm.fields.map(f => f.id === id ? { ...f, ...updates } : f) } }));
  };

  const addFormField = () => {
    const newField: FormField = { id: Date.now().toString(), label: 'New Field Label', type: 'text', placeholder: 'Enter placeholder...', required: false, options: [] };
    setLocalContent(prev => ({ ...prev, enrollmentForm: { ...prev.enrollmentForm, fields: [...prev.enrollmentForm.fields, newField] } }));
  };

  // Placements Handlers
  const updateStatItem = (id: string, field: keyof PlacementStat, value: string) => {
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, stats: prev.placements.stats.map(s => s.id === id ? { ...s, [field]: value } : s) } }));
  };

  const addStatItem = () => {
    const newStat: PlacementStat = { id: Date.now().toString(), label: 'New Stat', value: '0%', icon: 'fa-chart-line' };
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, stats: [...prev.placements.stats, newStat] } }));
  };

  const updateReviewItem = (id: string, field: keyof StudentReview, value: string) => {
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, reviews: prev.placements.reviews.map(r => r.id === id ? { ...r, [field]: value } : r) } }));
  };

  const addReviewItem = () => {
    const newReview: StudentReview = { id: Date.now().toString(), name: 'Student Name', course: 'Program Name', company: 'Google', companyIcon: 'fa-google', image: 'https://i.pravatar.cc/150', text: 'Success story...', salaryIncrease: '+50% Hike' };
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, reviews: [newReview, ...prev.placements.reviews] } }));
  };

  const updatePartnerItem = (id: string, field: keyof IndustryPartner, value: string) => {
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, partners: prev.placements.partners.map(p => p.id === id ? { ...p, [field]: value } : p) } }));
  };

  const addPartnerItem = () => {
    const newPartner: IndustryPartner = { id: Date.now().toString(), name: 'New Partner', icon: 'fa-building' };
    setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, partners: [...prev.placements.partners, newPartner] } }));
  };

  // Legal & Career Handlers
  const updateLegal = (page: 'privacy' | 'terms', field: string, value: any) => {
    setLocalContent(prev => ({ ...prev, legal: { ...prev.legal, [page]: { ...prev.legal[page], [field]: value } } }));
  };

  const updateLegalSection = (page: 'privacy' | 'terms', id: string, field: keyof LegalSection, value: string) => {
    setLocalContent(prev => ({ ...prev, legal: { ...prev.legal, [page]: { ...prev.legal[page], sections: prev.legal[page].sections.map(s => s.id === id ? { ...s, [field]: value } : s) } } }));
  };

  const addLegalSection = (page: 'privacy' | 'terms') => {
    const newSection: LegalSection = { id: Date.now().toString(), title: 'New Section', content: '' };
    setLocalContent(prev => ({ ...prev, legal: { ...prev.legal, [page]: { ...prev.legal[page], sections: [...prev.legal[page].sections, newSection] } } }));
  };

  const updateCareerHero = (field: string, value: string) => {
    setLocalContent(prev => ({ ...prev, career: { ...prev.career, hero: { ...prev.career.hero, [field]: value } } }));
  };

  const updateCareerService = (id: string, field: keyof CareerService, value: string) => {
    setLocalContent(prev => ({ ...prev, career: { ...prev.career, services: prev.career.services.map(s => s.id === id ? { ...s, [field]: value } : s) } }));
  };

  const addCareerService = () => {
    const newService: CareerService = { id: Date.now().toString(), title: 'New Guidance Service', description: 'Description...', icon: 'fa-compass' };
    setLocalContent(prev => ({ ...prev, career: { ...prev.career, services: [...prev.career.services, newService] } }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => updateField('site', 'logo', url))} />
      <input type="file" ref={heroBgInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => updateNestedField('home', 'hero', 'bgImage', url))} />
      <input type="file" ref={showcaseImgInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => updateNestedField('home', 'bigShowcase', 'image', url))} />
      <input type="file" ref={courseInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => activeCourseId.current && setLocalContent(prev => ({ ...prev, courses: prev.courses.map(c => c.id === activeCourseId.current ? { ...c, image: url } : c) })))} />
      <input type="file" ref={galleryInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => setLocalContent(prev => ({ ...prev, gallery: [{ id: Date.now().toString(), url, category: activeUploadCategory.current, title: '' }, ...prev.gallery] })))} />
      <input type="file" ref={thumbnailInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => activeThumbnailCategory.current && setLocalContent(prev => ({ ...prev, galleryMetadata: { ...(prev.galleryMetadata || {}), [activeThumbnailCategory.current!]: url } })))} />
      <input type="file" ref={reviewInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => activeReviewId.current && updateReviewItem(activeReviewId.current, 'image', url))} />
      <input type="file" ref={partnerInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => activePartnerId.current && updatePartnerItem(activePartnerId.current, 'image', url))} />
      <input type="file" ref={careerHeroBgInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => updateCareerHero('bgImage', url))} />
      <input type="file" ref={careerServiceInputRef} className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (url) => activeCareerServiceId.current && updateCareerService(activeCareerServiceId.current, 'image', url))} />
      
      <div className="bg-slate-800 border-b border-slate-700 p-6 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              <i className="fa-solid fa-gauge-high text-emerald-500"></i>
              INSTITUTE ADMIN
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDiscard} className="px-5 py-2 text-slate-400 hover:text-white text-xs font-black transition-all border border-slate-700 rounded-lg">DISCARD</button>
            <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-black transition-all active:scale-95 shadow-lg">SAVE ALL CHANGES</button>
            <div className="w-px h-8 bg-slate-700 mx-2"></div>
            <button onClick={handleFactoryReset} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><i className="fa-solid fa-trash-arrow-up"></i></button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {(['site', 'home', 'courses', 'notices', 'gallery', 'faq', 'placements', 'career', 'legal', 'form', 'contact', 'footer'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-4 rounded-2xl font-black transition-all capitalize flex items-center gap-3 border ${
                activeTab === tab ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl translate-x-1' : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <i className={`fa-solid fa-${tab === 'site' ? 'globe' : tab === 'home' ? 'house' : tab === 'courses' ? 'graduation-cap' : tab === 'notices' ? 'bullhorn' : tab === 'gallery' ? 'images' : tab === 'faq' ? 'circle-question' : tab === 'contact' ? 'address-book' : tab === 'footer' ? 'shoe-prints' : tab === 'placements' ? 'briefcase' : tab === 'career' ? 'user-graduate' : tab === 'legal' ? 'scale-balanced' : 'wpforms'} text-lg`}></i>
              {tab === 'form' ? 'Enroll Page' : tab}
            </button>
          ))}
        </div>

        <div className="flex-grow bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-700 shadow-3xl min-h-[70vh]">
          {activeTab === 'site' && <SiteTab data={localContent.site} updateField={(f, v) => updateField('site', f, v)} onLogoUploadClick={() => logoInputRef.current?.click()} updateNavigation={(idx, f, v) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, navigation: prev.site.navigation.map((n, i) => i === idx ? { ...n, [f]: v } : n) } }))} addNavigation={() => setLocalContent(prev => ({ ...prev, site: { ...prev.site, navigation: [...prev.site.navigation, { label: 'New Link', path: '/' }] } }))} removeNavigation={(idx) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, navigation: prev.site.navigation.filter((_, i) => i !== idx) } }))} />}
          {activeTab === 'home' && <HomeTab data={localContent.home} updateNestedField={(p, f, v) => updateNestedField('home', p, f, v)} updateHomeSubField={updateHomeSubField} onHeroBgClick={() => heroBgInputRef.current?.click()} onShowcaseImgClick={() => showcaseImgInputRef.current?.click()} addHighlight={() => setLocalContent(prev => ({ ...prev, home: { ...prev.home, highlights: [...prev.home.highlights, { icon: 'fa-star', title: 'New Detail', description: 'Brief info...' }] } }))} updateHighlight={(idx, f, v) => setLocalContent(prev => ({ ...prev, home: { ...prev.home, highlights: prev.home.highlights.map((h, i) => i === idx ? { ...h, [f]: v } : h) } }))} deleteHighlight={(idx) => setLocalContent(prev => ({ ...prev, home: { ...prev.home, highlights: prev.home.highlights.filter((_, i) => i !== idx) } }))} />}
          {activeTab === 'courses' && <CoursesTab courses={localContent.courses} updateCourseItem={updateCourseItem} onCourseImageClick={(id) => { activeCourseId.current = id; courseInputRef.current?.click(); }} addItem={() => addItem('courses', { name: 'New Track', duration: '6 Months', mode: 'Hybrid', description: 'Program details...', status: 'Active', image: 'https://picsum.photos/800/600', price: '$1,000' })} deleteItem={(id) => deleteItem('courses', id)} />}
          {activeTab === 'notices' && <NoticesTab notices={localContent.notices} updateNoticeItem={updateNoticeItem} addItem={() => addItem('notices', { date: new Date().toISOString().split('T')[0], title: 'New Notice', description: 'Official text...', isImportant: false, category: 'General' })} deleteItem={(id) => deleteItem('notices', id)} />}
          {activeTab === 'gallery' && <GalleryTab gallery={localContent.gallery} galleryMetadata={localContent.galleryMetadata} updateGalleryItem={(id, f, v) => setLocalContent(prev => ({ ...prev, gallery: prev.gallery.map(i => i.id === id ? { ...i, [f]: v } : i) }))} deleteItem={(id) => deleteItem('gallery', id)} triggerUpload={(cat) => { activeUploadCategory.current = cat; galleryInputRef.current?.click(); }} triggerThumbnailUpload={(cat) => { activeThumbnailCategory.current = cat; thumbnailInputRef.current?.click(); }} />}
          {/* Fixed FAQTab missing reorderFAQs prop */}
          {activeTab === 'faq' && <FAQTab faqs={localContent.faqs} updateFAQ={updateFAQItem} addFAQ={addFAQItem} deleteFAQ={(id) => deleteItem('faqs', id)} reorderFAQs={reorderFAQs} />}
          {activeTab === 'form' && <FormTab formData={localContent.enrollmentForm} addField={addFormField} updateField={updateFormField} deleteField={(id) => setLocalContent(prev => ({ ...prev, enrollmentForm: { ...prev.enrollmentForm, fields: prev.enrollmentForm.fields.filter(f => f.id !== id) } }))} updatePageInfo={updateEnrollmentPage} />}
          {activeTab === 'contact' && <ContactTab contact={localContent.site.contact} social={localContent.site.social} updateContactField={updateContactField} addSocialLink={() => setLocalContent(prev => ({ ...prev, site: { ...prev.site, social: [...prev.site.social, { id: Date.now().toString(), platform: 'New', url: '#', icon: 'fa-globe' }] } }))} updateSocialLink={(id, f, v) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, social: prev.site.social.map(s => s.id === id ? { ...s, [f]: v } : s) } }))} removeSocialLink={(id) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, social: prev.site.social.filter(s => s.id !== id) } }))} />}
          {activeTab === 'footer' && <FooterTab footer={localContent.site.footer} updateFooterField={(f, v) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, footer: { ...prev.site.footer, [f]: v } } }))} addSupportLink={() => setLocalContent(prev => ({ ...prev, site: { ...prev.site, footer: { ...prev.site.footer, supportLinks: [...prev.site.footer.supportLinks, { label: 'New Link', path: '#' }] } } }))} updateSupportLink={(idx, f, v) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, footer: { ...prev.site.footer, supportLinks: prev.site.footer.supportLinks.map((l, i) => i === idx ? { ...l, [f]: v } : l) } } }))} deleteSupportLink={(idx) => setLocalContent(prev => ({ ...prev, site: { ...prev.site, footer: { ...prev.site.footer, supportLinks: prev.site.footer.supportLinks.filter((_, i) => i !== idx) } } }))} />}
          {activeTab === 'placements' && <PlacementsTab stats={localContent.placements.stats} reviews={localContent.placements.reviews} partners={localContent.placements.partners} pageDescription={localContent.placements.pageDescription} updateStat={updateStatItem} addStat={addStatItem} deleteStat={(id) => setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, stats: prev.placements.stats.filter(s => s.id !== id) } }))} updateReview={updateReviewItem} addReview={addReviewItem} deleteReview={(id) => setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, reviews: prev.placements.reviews.filter(r => r.id !== id) } }))} updatePartner={updatePartnerItem} addPartner={addPartnerItem} deletePartner={(id) => setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, partners: prev.placements.partners.filter(p => p.id !== id) } }))} updatePageDescription={(v) => setLocalContent(prev => ({ ...prev, placements: { ...prev.placements, pageDescription: v } }))} onReviewImageClick={(id) => { activeReviewId.current = id; reviewInputRef.current?.click(); }} onPartnerImageClick={(id) => { activePartnerId.current = id; partnerInputRef.current?.click(); }} label={localContent.home.sectionLabels.placementMainLabel} />}
          {/* Fix: changed 'page' to 'p' to resolve 'Cannot find name page' error */}
          {activeTab === 'legal' && <LegalTab legal={localContent.legal} updateLegal={updateLegal} updateSection={updateLegalSection} addSection={addLegalSection} deleteSection={(p, id) => setLocalContent(prev => ({ ...prev, legal: { ...prev.legal, [p]: { ...prev.legal[p], sections: prev.legal[p].sections.filter(s => s.id !== id) } } }))} />}
          {activeTab === 'career' && <CareerTab career={localContent.career} updateHero={updateCareerHero} updateCta={(f, v) => setLocalContent(prev => ({ ...prev, career: { ...prev.career, cta: { ...prev.career.cta, [f]: v } } }))} updateService={updateCareerService} addService={addCareerService} deleteService={(id) => setLocalContent(prev => ({ ...prev, career: { ...prev.career, services: prev.career.services.filter(s => s.id !== id) } }))} onHeroBgClick={() => careerHeroBgInputRef.current?.click()} onServiceImageClick={(id) => { activeCareerServiceId.current = id; careerServiceInputRef.current?.click(); }} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_CONTENT } from './data/defaultContent.ts';
import { AppState } from './types.ts';

// Components
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

// Pages
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import CoursesPage from './pages/CoursesPage.tsx';
import NoticesPage from './pages/NoticesPage.tsx';
import GalleryPage from './pages/GalleryPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import EnrollmentPage from './pages/EnrollmentPage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import TermsOfServicePage from './pages/TermsOfServicePage.tsx';
import CareerGuidancePage from './pages/CareerGuidancePage.tsx';
import PlacementReviewPage from './pages/PlacementReviewPage.tsx';

const App: React.FC = () => {
  const [content, setContent] = useState<AppState>(() => {
    const saved = localStorage.getItem('edu_insta_content');
    if (!saved) return INITIAL_CONTENT;
    
    try {
      const parsed = JSON.parse(saved);
      
      const mergedState: AppState = {
        ...INITIAL_CONTENT,
        ...parsed,
        site: { 
          ...INITIAL_CONTENT.site, 
          ...parsed.site,
          contact: { ...INITIAL_CONTENT.site.contact, ...(parsed.site?.contact || {}) },
          footer: { ...INITIAL_CONTENT.site.footer, ...(parsed.site?.footer || {}) }
        },
        home: { 
          ...INITIAL_CONTENT.home, 
          ...parsed.home,
          sectionLabels: { ...INITIAL_CONTENT.home.sectionLabels, ...(parsed.home?.sectionLabels || {}) }
        },
        about: { ...INITIAL_CONTENT.about, ...parsed.about },
        placements: { ...INITIAL_CONTENT.placements, ...(parsed.placements || {}) },
        legal: { ...INITIAL_CONTENT.legal, ...(parsed.legal || {}) },
        career: { ...INITIAL_CONTENT.career, ...(parsed.career || {}) }
      };

      if (!Array.isArray(mergedState.site.social)) mergedState.site.social = INITIAL_CONTENT.site.social;
      if (!Array.isArray(mergedState.notices)) mergedState.notices = INITIAL_CONTENT.notices;
      if (!Array.isArray(mergedState.courses)) mergedState.courses = INITIAL_CONTENT.courses;
      if (!mergedState.placements.stats) mergedState.placements.stats = INITIAL_CONTENT.placements.stats;
      if (!mergedState.placements.reviews) mergedState.placements.reviews = INITIAL_CONTENT.placements.reviews;
      if (!mergedState.career.services) mergedState.career.services = INITIAL_CONTENT.career.services;

      return mergedState;
    } catch (e) {
      console.error("Educational CMS: Error restoring state from localStorage.", e);
      return INITIAL_CONTENT;
    }
  });

  const updateContent = (newContent: AppState) => {
    setContent(newContent);
    try {
      localStorage.setItem('edu_insta_content', JSON.stringify(newContent));
    } catch (err) {
      console.error("Educational CMS: Failed to save to localStorage", err);
    }
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header config={content.site} />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage content={content} />} />
            <Route path="/about" element={<AboutPage content={content.about} siteName={content.site.name} />} />
            <Route path="/courses" element={<CoursesPage courses={content.courses} />} />
            <Route path="/notices" element={<NoticesPage notices={content.notices} />} />
            <Route path="/gallery" element={<GalleryPage content={content} />} />
            <Route path="/contact" element={<ContactPage config={content.site.contact} social={content.site.social} />} />
            <Route path="/admin" element={<AdminDashboard content={content} onUpdate={updateContent} />} />
            <Route path="/enroll" element={<EnrollmentPage content={content} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage siteName={content.site.name} data={content.legal.privacy} />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage data={content.legal.terms} />} />
            <Route path="/career-guidance" element={<CareerGuidancePage data={content.career} />} />
            <Route path="/placement-review" element={<PlacementReviewPage placements={content.placements} label={content.home.sectionLabels.placementMainLabel} />} />
          </Routes>
        </main>

        <Footer config={content.site} />
      </div>
    </HashRouter>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;

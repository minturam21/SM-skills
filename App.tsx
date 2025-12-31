
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

const App: React.FC = () => {
  const [content, setContent] = useState<AppState>(() => {
    const saved = localStorage.getItem('edu_insta_content');
    if (!saved) return INITIAL_CONTENT;
    
    try {
      const parsed = JSON.parse(saved);
      // Merge INITIAL_CONTENT with saved to ensure new keys like 'enrollmentForm' exist
      return {
        ...INITIAL_CONTENT,
        ...parsed,
        // Deeply merge specific objects if necessary, or just ensure keys exist
        site: { ...INITIAL_CONTENT.site, ...parsed.site },
        home: { ...INITIAL_CONTENT.home, ...parsed.home },
        enrollmentForm: parsed.enrollmentForm || INITIAL_CONTENT.enrollmentForm,
        about: { ...INITIAL_CONTENT.about, ...parsed.about }
      };
    } catch (e) {
      return INITIAL_CONTENT;
    }
  });

  const updateContent = (newContent: AppState) => {
    setContent(newContent);
    localStorage.setItem('edu_insta_content', JSON.stringify(newContent));
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header config={content.site} />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage content={content} />} />
            <Route path="/about" element={<AboutPage content={content.about} siteName={content.site.name} />} />
            <Route path="/courses" element={<CoursesPage courses={content.courses} />} />
            <Route path="/notices" element={<NoticesPage notices={content.notices} />} />
            <Route path="/gallery" element={<GalleryPage content={content} />} />
            <Route path="/contact" element={<ContactPage config={content.site.contact} />} />
            <Route path="/admin" element={<AdminDashboard content={content} onUpdate={updateContent} />} />
            <Route path="/enroll" element={<EnrollmentPage content={content} />} />
          </Routes>
        </main>

        <Footer config={content.site} />
      </div>
    </HashRouter>
  );
};

// Helper component to reset scroll on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;

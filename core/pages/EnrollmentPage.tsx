import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppState } from '../types.ts';

interface EnrollmentPageProps {
  content: AppState;
}

const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ content }) => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const { 
    enrollmentForm = { title: 'Enrollment Form', description: '', roadmapTitle: 'Flow', roadmapSteps: [], fields: [], successTitle: 'Thank You', successMessage: 'We received your application.' }, 
    courses = [], 
    site = { contact: { phone: 'N/A' } } 
  } = content || {};

  useEffect(() => {
    const initialData: Record<string, string> = {};
    enrollmentForm.fields.forEach(field => { initialData[field.id] = ''; });
    const courseFromUrl = searchParams.get('course');
    if (courseFromUrl) {
      const courseField = enrollmentForm.fields.find(f => f.type === 'course-select');
      if (courseField) initialData[courseField.id] = decodeURIComponent(courseFromUrl);
    }
    setFormData(initialData);
  }, [enrollmentForm, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full bg-white p-12 md:p-16 rounded-[3.5rem] shadow-3xl text-center border border-slate-100">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-10 shadow-2xl animate-bounce">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">{enrollmentForm.successTitle}</h2>
          <p className="text-slate-600 mb-12 text-lg font-medium">{enrollmentForm.successMessage}</p>
          <Link to="/courses" className="inline-block px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all uppercase tracking-widest text-[11px]">
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Institutional Enrollment</span>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">{enrollmentForm.title}</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">{enrollmentForm.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-32">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-3xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="bg-slate-900 lg:w-96 p-10 md:p-14 text-white shrink-0 relative">
            <h3 className="text-xl font-black mb-12 text-white uppercase tracking-tighter border-b border-white/5 pb-6">
              {enrollmentForm.roadmapTitle}
            </h3>
            <div className="space-y-12">
              {enrollmentForm.roadmapSteps.map((step, idx) => (
                <div key={step.id} className="relative flex gap-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-tight text-white">{step.title}</h4>
                    <p className="text-sm text-slate-400 mt-2 font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-grow p-10 md:p-16 lg:p-20">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {enrollmentForm.fields.map(field => (
                  <div key={field.id} className={`space-y-3 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                    <label className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] ml-1 block">
                      {field.label} {field.required && <span className="text-emerald-600">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea required={field.required} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none transition-all resize-none" placeholder={field.placeholder} />
                    ) : (
                      <input required={field.required} type={field.type === 'course-select' ? 'text' : field.type} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none transition-all" placeholder={field.placeholder} />
                    )}
                  </div>
                ))}
              </div>
              <button type="submit" className="w-full py-6 bg-emerald-600 text-white font-black text-lg rounded-3xl hover:bg-emerald-700 transition-all shadow-2xl active:scale-[0.98] uppercase tracking-[0.2em]">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
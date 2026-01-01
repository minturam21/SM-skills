
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

  const { enrollmentForm = { title: 'Application Form', description: '', fields: [] }, courses = [], site } = content;

  useEffect(() => {
    if (!enrollmentForm?.fields) return;
    const initialData: Record<string, string> = {};
    enrollmentForm.fields.forEach(field => { initialData[field.id] = ''; });
    const courseFromUrl = searchParams.get('course');
    if (courseFromUrl) {
      const courseField = enrollmentForm.fields.find(f => f.type === 'course-select');
      if (courseField) { initialData[courseField.id] = decodeURIComponent(courseFromUrl); }
    }
    setFormData(initialData);
  }, [enrollmentForm, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (id: string, value: string) => { setFormData(prev => ({ ...prev, [id]: value })); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full bg-white p-16 rounded-[3.5rem] shadow-3xl text-center border border-slate-100" role="alert">
          <div className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-12 shadow-2xl animate-bounce">
            <i className="fa-solid fa-check" aria-hidden="true"></i>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Application Sent</h2>
          <p className="text-slate-500 mb-16 text-xl font-medium leading-relaxed">
            Your registration is being processed. An institutional registrar will review your application and contact you within 48 business hours.
          </p>
          <Link to="/courses" className="inline-block px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 transition-all shadow-3xl active:scale-95 uppercase tracking-widest text-[11px]">
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Official Enrollment 2024</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">{enrollmentForm.title}</h1>
          <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">{enrollmentForm.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
        <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-3xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Side Roadmap */}
          <div className="bg-slate-900 md:w-96 p-16 text-white shrink-0">
            <h3 className="text-2xl font-black mb-12 text-emerald-400 uppercase tracking-tighter">Process Steps</h3>
            <ul className="space-y-12">
              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg shrink-0 border border-emerald-500/30">1</div>
                <div>
                  <h4 className="font-black text-lg uppercase tracking-tight">Identity Details</h4>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Provide verifiable academic and personal records.</p>
                </div>
              </li>
              <li className="flex gap-6 opacity-50">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center font-black text-lg shrink-0">2</div>
                <div>
                  <h4 className="font-black text-lg uppercase tracking-tight">Advisor Review</h4>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Institutional vetting and program alignment.</p>
                </div>
              </li>
              <li className="flex gap-6 opacity-50">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center font-black text-lg shrink-0">3</div>
                <div>
                  <h4 className="font-black text-lg uppercase tracking-tight">Admission Offer</h4>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Official confirmation via counselor session.</p>
                </div>
              </li>
            </ul>

            <div className="mt-24 p-10 bg-white/5 rounded-3xl border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4">Admissions Desk</p>
              <p className="text-2xl font-black text-white">{site.contact.phone}</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-grow p-12 md:p-20">
            <form onSubmit={handleSubmit} className="space-y-10">
              {enrollmentForm.fields?.map(field => (
                <div key={field.id} className="space-y-3">
                  <label htmlFor={`field-${field.id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 block">
                    {field.label} {field.required && <span className="text-red-500 font-black" aria-hidden="true">*</span>}
                    {field.required && <span className="sr-only">(Required)</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea 
                      id={`field-${field.id}`}
                      required={field.required}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      rows={5}
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-emerald-500/10 focus:outline-none focus:border-emerald-500 transition-all font-medium text-slate-900 resize-none"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'course-select' ? (
                    <select 
                      id={`field-${field.id}`}
                      required={field.required}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:outline-none focus:border-emerald-500 transition-all font-black text-[11px] text-slate-900 uppercase tracking-widest appearance-none"
                    >
                      <option value="">{field.placeholder || 'Select Track'}</option>
                      {courses.filter(c => c.status === 'Active').map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      id={`field-${field.id}`}
                      required={field.required}
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:outline-none focus:border-emerald-500 transition-all font-medium text-slate-900"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <button type="submit" className="w-full py-8 bg-emerald-600 text-white font-black text-lg rounded-3xl hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 transition-all shadow-3xl shadow-emerald-600/20 active:scale-[0.98] uppercase tracking-[0.2em] mt-12">
                Submit Admission Request <i className="fa-solid fa-arrow-right ml-4" aria-hidden="true"></i>
              </button>

              <div className="pt-10 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  Formal Submission Secured by SM Skills Protocols
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;

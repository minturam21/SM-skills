
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppState } from '../types.ts';

interface EnrollmentPageProps {
  content: AppState;
}

const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ content }) => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    qualification: '',
    message: ''
  });

  useEffect(() => {
    const courseFromUrl = searchParams.get('course');
    if (courseFromUrl) {
      setFormData(prev => ({ ...prev, course: decodeURIComponent(courseFromUrl) }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment Application:', formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Sent!</h2>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">
            Thank you for applying to <strong>{formData.course}</strong>. Our admissions team will review your profile and contact you within 48 hours via phone or email.
          </p>
          <a 
            href="#/courses" 
            className="inline-block px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
          >
            Explore More Courses
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Admission 2024-25</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Begin Your Application</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Fill out the form below to apply for your preferred professional program. Our advisors are here to support your journey.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-3xl border border-slate-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar Info */}
              <div className="bg-slate-900 md:w-80 p-12 text-white shrink-0">
                <h3 className="text-xl font-black mb-8 text-emerald-400">Application Guide</h3>
                <ul className="space-y-8">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xs shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-sm">Course Selection</h4>
                      <p className="text-xs text-slate-400 mt-1">Pick your program of choice.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xs shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-sm">Personal Details</h4>
                      <p className="text-xs text-slate-400 mt-1">Enter your valid contact info.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xs shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-sm">Interview</h4>
                      <p className="text-xs text-slate-400 mt-1">Our team will call for a chat.</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-20 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Need Assistance?</p>
                  <p className="text-xs text-slate-300">Call admissions at <br/><span className="text-white font-bold">{content.site.contact.phone}</span></p>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex-grow p-12 md:p-16">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Legal Name</label>
                      <input 
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all font-medium"
                        placeholder="e.g. Michael Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all font-medium"
                        placeholder="mike@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Contact Number</label>
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all font-medium"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Program of Interest</label>
                      <select 
                        required
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all font-bold text-slate-700"
                      >
                        <option value="">Select a Program</option>
                        {content.courses.map(course => (
                          <option key={course.id} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Highest Qualification</label>
                    <input 
                      required
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all font-medium"
                      placeholder="e.g. Bachelor in Computer Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Additional Information (Optional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all resize-none font-medium"
                      placeholder="Any specific goals or questions?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-6 bg-emerald-600 text-white font-black text-lg rounded-[2rem] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] uppercase tracking-widest"
                  >
                    Submit Application <i className="fa-solid fa-paper-plane ml-3"></i>
                  </button>

                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    By submitting, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;

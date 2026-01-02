import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  content: {
    intro: string;
    mission: string;
    vision: string;
    timeline: Array<{ year: string; event: string; }>;
  };
  siteName: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ content, siteName }) => {
  const btnSecondary = "inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 text-[11px] uppercase tracking-widest";

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Foundation & Heritage</span>
          <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">Our Institute</h1>
          <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-emerald-600 p-16 rounded-[2.5rem] text-white relative overflow-hidden group shadow-3xl">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full group-hover:scale-125 transition-transform"></div>
              <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center text-3xl mb-10 shadow-inner">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">Our Mission</h2>
              <p className="text-emerald-50 leading-relaxed text-xl font-medium">{content.mission}</p>
            </div>
            <div className="bg-slate-900 p-16 rounded-[2.5rem] text-white relative overflow-hidden group shadow-3xl">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full group-hover:scale-125 transition-transform"></div>
              <div className="w-20 h-20 bg-emerald-500/20 rounded-[1.5rem] flex items-center justify-center text-3xl mb-10 shadow-inner text-emerald-400">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white">Our Vision</h2>
              <p className="text-slate-400 leading-relaxed text-xl font-medium">{content.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Milestones</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">Journey of Excellence</h2>
            <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-8"></div>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-10">
            {content.timeline.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-10 group">
                <div className="md:w-32 shrink-0">
                  <div className="w-20 h-20 bg-white border-2 border-emerald-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xl">
                    {item.year}
                  </div>
                </div>
                <div className="bg-white p-10 rounded-[2rem] border border-slate-100 flex-grow shadow-sm group-hover:shadow-3xl transition-all border-l-8 border-l-emerald-600">
                  <p className="text-slate-800 font-black text-2xl tracking-tight leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/courses" className={btnSecondary}>
              Start Your Journey <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
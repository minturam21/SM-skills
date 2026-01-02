import React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../types.ts';

interface PrivacyPolicyPageProps {
  siteName: string;
  data: AppState['legal']['privacy'];
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ siteName, data }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Official Documents</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">{data.title}</h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">{data.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="space-y-12 text-slate-700 leading-relaxed">
          {data.sections.map((section, idx) => (
            <section key={section.id} className={`${idx % 2 === 0 ? 'bg-slate-50 p-10 rounded-[2.5rem]' : 'p-10'}`}>
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black">{(idx + 1).toString().padStart(2, '0')}</span>
                {section.title}
              </h2>
              <p className="whitespace-pre-line">{section.content.replace('{siteName}', siteName)}</p>
            </section>
          ))}
          <div className="pt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all text-xs uppercase tracking-[0.2em]">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
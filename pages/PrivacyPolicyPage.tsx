import React from 'react';
import { Link } from 'react-router-dom';

interface PrivacyPolicyPageProps {
  siteName: string;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ siteName }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative Header */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Official Documents</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Privacy and Policy</h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Our commitment to your privacy and the security of your data is at the core of our educational values.
          </p>
        </div>
      </section>

      {/* Content Body */}
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="prose prose-slate lg:prose-lg mx-auto space-y-12 text-slate-700 leading-relaxed">
          
          <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">01</span>
              Information Collection
            </h2>
            <p>
              Welcome to the official <strong>Privacy and Policy</strong> portal for {siteName}. We collect information that you provide directly to us through the enrollment forms, newsletter signups, and contact requests. This may include your name, email address, phone number, and academic history. We also collect automated usage data to improve your experience on our portal.
            </p>
          </section>

          <section className="p-10 border border-transparent">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">02</span>
              How We Use Data
            </h2>
            <p>
              Your data allows us to process applications, provide academic support, and send relevant updates about your programs. We do not sell your personal information to third parties. We use industry-standard encryption to protect all sensitive information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                "Facilitating course enrollments",
                "Improving user experience",
                "Sending institutional news",
                "Academic tracking & records"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <i className="fa-solid fa-circle-check text-emerald-500"></i>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">03</span>
              Cookie Policy
            </h2>
            <p>
              Our website uses "cookies" to enhance the user experience. Cookies are small files placed on your device that help us understand how you interact with our site. You can choose to disable cookies in your browser settings, though some features of the site may function improperly as a result.
            </p>
          </section>

          <section className="p-10 border border-transparent">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">04</span>
              Security Measures
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your data. We use secure servers and SSL technology to ensure that all data is encrypted and transferred safely.
            </p>
          </section>

          <div className="pt-12 border-t border-slate-100 flex flex-col items-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Ready to proceed?</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 text-xs uppercase tracking-[0.2em]"
            >
              <i className="fa-solid fa-house"></i> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
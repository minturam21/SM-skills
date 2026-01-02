
import React from 'react';
import { FAQItem } from '../types.ts';

interface FAQTabProps {
  faqs: FAQItem[];
  updateFAQ: (id: string, field: keyof FAQItem, value: string) => void;
  addFAQ: () => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (startIndex: number, endIndex: number) => void;
}

const FAQTab: React.FC<FAQTabProps> = ({ faqs, updateFAQ, addFAQ, deleteFAQ, reorderFAQs }) => {
  const handleDelete = (id: string, question: string) => {
    if (window.confirm(`Permanently remove FAQ: "${question.substring(0, 30)}..."?`)) {
      deleteFAQ(id);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-700 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Help Center Database</h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Manage institutional knowledge base</p>
        </div>
        <button 
          onClick={addFAQ}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-xs font-black shadow-xl flex items-center gap-2 transition-all active:scale-95"
        >
          <i className="fa-solid fa-plus"></i> ADD NEW ENTRY
        </button>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-700 group hover:border-emerald-500/40 transition-all flex gap-8">
            
            {/* Position Controls Sidebar */}
            <div className="flex flex-col gap-2 shrink-0">
              <button 
                onClick={() => reorderFAQs(idx, idx - 1)}
                disabled={idx === 0}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  idx === 0 
                    ? 'border-slate-800 text-slate-700 cursor-not-allowed opacity-20' 
                    : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-emerald-500'
                }`}
                title="Move Up"
              >
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-[10px] font-black text-emerald-500 shadow-inner">
                {idx + 1}
              </div>

              <button 
                onClick={() => reorderFAQs(idx, idx + 1)}
                disabled={idx === faqs.length - 1}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  idx === faqs.length - 1 
                    ? 'border-slate-800 text-slate-700 cursor-not-allowed opacity-20' 
                    : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-emerald-500'
                }`}
                title="Move Down"
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>

            {/* Main Content Fields */}
            <div className="flex-grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Knowledge Question</label>
                  <input 
                    value={faq.question} 
                    onChange={e => updateFAQ(faq.id, 'question', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Classification Category</label>
                  <input 
                    value={faq.category} 
                    onChange={e => updateFAQ(faq.id, 'category', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-emerald-500 font-black uppercase tracking-widest outline-none"
                    placeholder="e.g. ADMISSIONS"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Verified Answer</label>
                <textarea 
                  value={faq.answer} 
                  onChange={e => updateFAQ(faq.id, 'answer', e.target.value)}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 font-medium resize-none focus:border-emerald-500 outline-none transition-colors"
                  placeholder="Draft institutional response..."
                />
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="flex flex-col justify-start pt-2">
              <button 
                onClick={() => handleDelete(faq.id, faq.question)}
                className="w-12 h-12 flex items-center justify-center text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                title="Remove Entry"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-32 border-4 border-dashed border-slate-800 rounded-[4rem]">
          <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-5xl text-slate-700 mx-auto mb-8">
            <i className="fa-solid fa-circle-question"></i>
          </div>
          <h3 className="text-xl font-black text-slate-600 uppercase tracking-widest">No FAQ content deployed</h3>
          <button onClick={addFAQ} className="mt-8 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Initialize First Question</button>
        </div>
      )}
    </div>
  );
};

export default FAQTab;

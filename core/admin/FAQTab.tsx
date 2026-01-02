
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
            <div className="flex flex-col gap-2 shrink-0">
              <button 
                onClick={() => reorderFAQs(idx, idx - 1)}
                disabled={idx === 0}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  idx === 0 
                    ? 'border-slate-800 text-slate-700 cursor-not-allowed opacity-20' 
                    : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-emerald-500'
                }`}
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
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>

            <div className="flex-grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Knowledge Question</label>
                  <input value={faq.question} onChange={e => updateFAQ(faq.id, 'question', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                  <input value={faq.category} onChange={e => updateFAQ(faq.id, 'category', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-emerald-500 font-black uppercase tracking-widest" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Answer</label>
                <textarea value={faq.answer} onChange={e => updateFAQ(faq.id, 'answer', e.target.value)} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 font-medium resize-none" />
              </div>
            </div>

            <button onClick={() => handleDelete(faq.id, faq.question)} className="text-red-500 self-start p-2"><i className="fa-solid fa-trash-can"></i></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQTab;

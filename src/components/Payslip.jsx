import React from 'react';

function Payslip({ showSlipPrint, printData, setShowSlipPrint, config, triggerPrint }) {
  if (!showSlipPrint || !printData) return null;

  const mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = mNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-[300] animate-fadeIn">
      
      {/* 💳 Digital Glassmorphism Slip Container */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row print:shadow-none print:rounded-none print:w-full print:max-w-none">
        
        {/* 1. Left Dark Accent Panel (सिर्फ UI में दिखेगा, प्रिंट में भी प्रीमियम लुक देगा) */}
        <div className="bg-[#0f172a] md:w-1/3 p-8 text-white flex flex-col justify-between relative overflow-hidden print:bg-[#0f172a] print:text-white">
          {/* Abstract Design Shape */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full -z-10"></div>
          
          <div>
            <div className="bg-teal-600/20 text-teal-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block mb-3">
              Official Document
            </div>
            <h1 className="text-3xl font-black italic text-teal-400 tracking-tight">{config.org}</h1>
            <p className="text-xs text-slate-400 font-bold mt-1">{config.addr}</p>
          </div>

          <div className="mt-10 md:mt-0">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Statement For</p>
            <h2 className="text-2xl font-black text-white mt-1">{currentMonth}, {currentYear}</h2>
            <div className="w-12 h-1 bg-teal-500 mt-3 rounded-full"></div>
          </div>
          
          <div className="hidden md:block mt-auto text-[10px] font-bold text-slate-600">
            This is a computer-generated payslip and does not require a physical signature.
          </div>
        </div>

        {/* 2. Right White Data Panel */}
        <div className="flex-1 p-6 md:p-10 bg-white relative">
          
          {/* Action Buttons (UI Only) */}
          <div className="flex justify-end gap-3 mb-6 print:hidden">
            <button 
              onClick={() => { triggerPrint(); }} 
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              Print Now
            </button>
            <button 
              onClick={() => setShowSlipPrint(false)} 
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Close
            </button>
          </div>

          {/* Employee Header Info */}
          <div className="flex flex-col md:flex-row justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Employee Name</p>
              <h3 className="text-xl font-black text-slate-800 mt-0.5">{printData.e.name}</h3>
              <span className="text-xs font-black text-teal-600 uppercase mt-1 inline-block">{printData.e.empID}</span>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Department</p>
              <h3 className="text-lg font-black text-slate-700 mt-0.5 uppercase">{printData.e.dept}</h3>
            </div>
          </div>

          {/* 📊 Earnings vs Deductions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Earnings (Left) */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="text-[11px] font-black uppercase text-emerald-600 mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Earnings
              </h4>
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-600">Basic Salary</p>
                <p className="font-black text-slate-800">{config.cur}{printData.e.salary.toLocaleString()}</p>
              </div>
              <div className="border-t border-slate-200/50 my-3"></div>
              <div className="flex justify-between items-center font-black text-slate-800">
                <p className="text-sm">Gross Total</p>
                <p>{config.cur}{printData.e.salary.toLocaleString()}</p>
              </div>
            </div>

            {/* Deductions (Right) */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="text-[11px] font-black uppercase text-red-500 mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span> Deductions
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-slate-600">Leave Deductions</p>
                  <p className="font-black text-slate-800">-{config.cur}{printData.l_ded.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-slate-600">Absent Deductions</p>
                  <p className="font-black text-slate-800">-{config.cur}{printData.a_ded.toLocaleString()}</p>
                </div>
              </div>
              <div className="border-t border-slate-200/50 my-3"></div>
              <div className="flex justify-between items-center font-black text-red-500">
                <p className="text-sm">Total Ded.</p>
                <p>-{config.cur}{(printData.l_ded + printData.a_ded).toLocaleString()}</p>
              </div>
            </div>

          </div>

          {/* 💰 NET PAYOUT (The Grand Total) */}
          <div className="bg-gradient-to-br from-[#0f172a] to-slate-800 p-6 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden print:bg-[#0f172a] print:text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full -z-10"></div>
            <div>
              <p className="text-[10px] font-black uppercase text-teal-400 tracking-wider">Net Payout</p>
              <p className="text-xs text-slate-400 font-bold mt-0.5">Amount credited to account</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-white tracking-tight">{config.cur}{printData.net.toLocaleString()}</h2>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Payslip;
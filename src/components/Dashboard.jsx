import React from 'react';

function Dashboard({ totalStaff, lToday, totalPayroll, cur }) {
  
  // 🧠 डमी डेटा (इसे आप बाद में असली API डेटा से बदल सकती हैं)
  const efficiency = 87; // कंपनी 87% परफेक्ट चल रही है
  const salaryBurnRate = 34; // 34% सैलरी पर खर्च हो रहा है (रिस्क कम है)

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* 🌟 Top Welcome & Stats Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Company Overview
          </h1>
          <p className="text-sm text-slate-400 font-bold mt-1">
            Here's what's happening with your workspace today.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border shadow-sm flex items-center gap-2 max-w-fit">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <p className="text-xs font-black text-slate-600 uppercase tracking-wider">Live System</p>
        </div>
      </div>

      {/* 📊 Modern Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Total Staff */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl text-white shadow-lg shadow-teal-100">
              <i className="fas fa-users text-2xl"></i>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Total Staff</p>
              <h3 className="text-3xl font-black text-slate-800 mt-0.5">{totalStaff}</h3>
            </div>
          </div>
          <div className="mt-5 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <i className="fas fa-arrow-trend-up"></i> +12% this month
          </div>
        </div>

        {/* Card 2: Leaves Today */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl text-white shadow-lg shadow-amber-100">
              <i className="fas fa-calendar-day text-2xl"></i>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Leaves Today</p>
              <h3 className="text-3xl font-black text-slate-800 mt-0.5">{lToday}</h3>
            </div>
          </div>
          <div className="mt-5 text-xs font-bold text-slate-500 flex items-center gap-1">
            <i className="fas fa-info-circle text-amber-500"></i> Requires Attention
        </div>
        </div>

        {/* Card 3: Estimated Payroll */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-2xl text-white shadow-lg shadow-purple-100">
              <i className="fas fa-coins text-2xl"></i>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Est. Monthly Payroll</p>
              <h3 className="text-3xl font-black text-slate-800 mt-0.5">{cur}{totalPayroll.toLocaleString()}</h3>
            </div>
          </div>
          <div className="mt-5 text-xs font-bold text-rose-500 flex items-center gap-1">
            <i className="fas fa-arrow-trend-up"></i> 5% higher than last month
          </div>
        </div>
      </div>

      {/* 📉 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Doughnut Chart Box */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h5 className="text-sm font-black uppercase text-slate-700 tracking-wide">Staff Analytics</h5>
              <p className="text-xs text-slate-400 font-bold">Distribution by department</p>
            </div>
            <span className="p-3 bg-slate-50 rounded-full text-slate-400"><i className="fas fa-chart-pie"></i></span>
          </div>
          <div className="h-[260px] md:h-[280px] flex items-center justify-center">
            <canvas id="c1"></canvas>
          </div>
        </div>

        {/* Bar Chart Box */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h5 className="text-sm font-black uppercase text-slate-700 tracking-wide">Budgeting Scale</h5>
              <p className="text-xs text-slate-400 font-bold">Salary split per department</p>
            </div>
            <span className="p-3 bg-slate-50 rounded-full text-slate-400"><i className="fas fa-chart-bar"></i></span>
          </div>
          <div className="h-[260px] md:h-[280px] flex items-center justify-center">
            <canvas id="c2"></canvas>
          </div>
        </div>
      </div>

      {/* 🚀 🆕 [नया सेक्शन] Company Health & Trends (पानी में है या परफेक्ट) */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all mt-8">
        <div className="mb-6">
          <h5 className="text-sm font-black uppercase text-slate-700 tracking-wide">Company Health Status</h5>
          <p className="text-xs text-slate-400 font-bold">Real-time stability and growth index</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* मीटर १: कंपनी कितनी परफेक्ट है (Efficiency) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-600 uppercase">⚡ Workspace Perfection Meter</span>
              <span className="text-sm font-black text-emerald-600">{efficiency}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${efficiency}%` }}
              ></div>
            </div>
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <i className="fas fa-check-circle text-emerald-500"></i> High efficiency: Tasks and staff are perfectly balanced.
            </div>
          </div>

          {/* मीटर २: कंपनी कितने पानी में है (Burn Rate / Financial Risk) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-600 uppercase">💧 Financial   Meter (Risk)</span>
              <span className="text-sm font-black text-amber-600">{salaryBurnRate}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-1000"
                style={{ width: `${salaryBurnRate}%` }}
              ></div>
            </div>
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <i className="fas fa-shield-halved text-emerald-500"></i> Under Safe Zone: The company is generating good profit.
            </div>
          </div>

        </div>

        {/* क्विक ओवरव्यू ट्रेंड्स */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><i className="fas fa-arrow-up-right-dots text-sm"></i></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Growth Rate</p>
              <p className="text-sm font-black text-slate-700">+23.5%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 rounded-xl text-rose-600"><i className="fas fa-arrow-down-wide-short text-sm"></i></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Employee Attrition</p>
              <p className="text-sm font-black text-slate-700">-4.2%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600"><i className="fas fa-bolt text-sm"></i></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Project Success</p>
              <p className="text-sm font-black text-slate-700">92%</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
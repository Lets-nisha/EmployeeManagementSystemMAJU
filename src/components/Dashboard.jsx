import React from 'react';

function Dashboard({ totalStaff, lToday, totalPayroll, cur }) {
 

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

       

    </div>
  );
}

export default Dashboard;
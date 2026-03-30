import React from 'react';

function Settings({ config, setConfig, saveSettings }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      {/* 🌟 Header Section */}
      <div className="text-center md:text-left mb-2">
        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-wide">Organization Settings</h3>
        <p className="text-xs font-bold text-slate-400 mt-1">Manage your company details and preferences</p>
      </div>

      {/* 🏢 Main Settings Card */}
      <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm backdrop-blur-md">
        <div className="space-y-6">
          
          {/* 1. Company Name Input */}
          <div className="group">
            <label className="text-[11px] font-black uppercase text-slate-400 block mb-2 tracking-wider group-focus-within:text-teal-600 transition-colors">Company Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                <i className="fas fa-building text-sm"></i>
              </span>
              <input 
                type="text" 
                value={config.org} 
                onChange={(e) => setConfig({ ...config, org: e.target.value })} 
                placeholder="Enter company name"
                className="w-full p-4 pl-11 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold text-slate-700 focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all duration-300" 
              />
            </div>
          </div>
          
          {/* 2. Currency Symbol Input */}
          <div className="group">
            <label className="text-[11px] font-black uppercase text-slate-400 block mb-2 tracking-wider group-focus-within:text-teal-600 transition-colors">Currency Symbol</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                <i className="fas fa-coins text-sm"></i>
              </span>
              <input 
                type="text" 
                value={config.cur} 
                onChange={(e) => setConfig({ ...config, cur: e.target.value })} 
                placeholder="e.g., $, ₹, £"
                className="w-full p-4 pl-11 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold text-slate-700 focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all duration-300" 
              />
            </div>
          </div>
          
          {/* 3. Address Input */}
          <div className="group">
            <label className="text-[11px] font-black uppercase text-slate-400 block mb-2 tracking-wider group-focus-within:text-teal-600 transition-colors">Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                <i className="fas fa-map-marker-alt text-sm"></i>
              </span>
              <input 
                type="text" 
                value={config.addr} 
                onChange={(e) => setConfig({ ...config, addr: e.target.value })} 
                placeholder="Enter company address"
                className="w-full p-4 pl-11 bg-slate-50 border border-transparent rounded-2xl outline-none font-bold text-slate-700 focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all duration-300" 
              />
            </div>
          </div>

          {/* 🚀 Advanced Update Button */}
          <button 
            onClick={saveSettings} 
            className="w-full relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 text-white p-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <i className="fas fa-save"></i>
              Update Settings
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Settings;
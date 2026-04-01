import React from 'react';

// 🆕 १. ऊपर props में isOpen और setIsOpen को रिसीव किया
function Sidebar({ org, view, setView, logout, pendingLeavesCount, isOpen, setIsOpen }) {

  const menuItems = [
    { id: "dash", name: "Dashboard", icon: "fa-chart-pie" },
    { id: "emp", name: "Staff", icon: "fa-users" },
    { id: "dept", name: "Departments", icon: "fa-sitemap" },
    { id: "leave", name: "Leaves", icon: "fa-calendar-minus" },
    { id: "att", name: "Attendance", icon: "fa-fingerprint" },
    { id: "rep", name: "Reports", icon: "fa-file-contract" },
    { id: "sal", name: "Salary", icon: "fa-wallet" },
    { id: "set", name: "Settings", icon: "fa-cog" },
  ];

  return (
    <>
      {/* 🌑 डार्क ओवरले: मोबाइल पर बैकग्राउंड धुंधला करने के लिए */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[140] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ➡️ Sidebar Container   */}
      <aside className={`w-72 fixed lg:sticky top-0 h-screen bg-[#0f172a] p-6 flex flex-col z-[150] border-r border-slate-800 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* 🏢 Top Logo Section */}
        <div className="flex justify-between items-center mb-10 px-4 mt-4 lg:mt-0">
          <h2 className="text-2xl font-black italic text-teal-400 tracking-wide">{org}</h2>
        </div>

        {/* 🧭 Navigation Links */}
        <nav className="space-y-1 flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false); // क्लिक करते ही बंद होगा
              }}
              className={`w-full flex items-center justify-between p-3.5 font-semibold rounded-xl transition-colors ${
                view === item.id ? "bg-teal-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {/* लेफ्ट साइड: आइकॉन और नाम */}
              <div className="flex items-center gap-3">
                <i className={`fas ${item.icon} text-sm w-5`}></i>
                <span className="text-xs font-black uppercase tracking-wider">{item.name}</span>
              </div>

              {/* 🔴 राइट साइड: लीव्स काउंट */}
              {item.id === 'leave' && pendingLeavesCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  {pendingLeavesCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* 🚪 Logout Button */}
        <div className="border-t border-slate-800 pt-4 mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 p-3.5 font-semibold rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <i className="fas fa-sign-out-alt text-sm w-5"></i>
            <span className="text-xs font-black uppercase tracking-wider">Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
import React from 'react';

function Departments({ newDeptName, setNewDeptName, saveDept, db, deleteDept }) {
  
  // डिपार्टमेंट डिलीट करने से पहले कन्फर्मेशन
  const handleDelete = (idx, name) => {
    if (window.confirm(`Are you sure you want to delete the ${name} department? This will affect staff assignments.`)) {
      deleteDept(idx);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 🔍 New Dept Input Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Enter new Department Name..."
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
          className="w-full md:max-w-md p-4 bg-white border rounded-2xl font-bold outline-none shadow-sm focus:border-teal-500 transition-colors"
        />
        <button 
          onClick={saveDept} 
          className="w-full md:w-auto bg-teal-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-teal-700 transition-colors text-sm uppercase tracking-wider"
        >
          Add Dept
        </button>
      </div>

      {/* 📊 Dept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {db.d.map((d, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center relative overflow-hidden group">
            {/* 🌑 डार्क पैच डिजाइन */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            
            <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">{d}</h3>
            
            <p className="text-sm text-slate-400 font-bold mt-2">
              Staff: {db.e.filter(e => e.dept === d).length}
            </p>
            
            {/* ✅ 🗑️ Delete Button - आइकॉन हटाकर टेक्स्ट डाल दिया है और नीचे फिक्स कर दिया है ✅ */}
            <div className="mt-8">
              <button 
                onClick={() => handleDelete(idx, d)} 
                className="bg-red-50 text-red-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-red-100 transition-colors"
                title="Delete Department"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Results Fallback */}
      {db.d.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-[2rem] shadow-sm">
          <p className="text-xl font-bold text-slate-300">SITEMAP SLASH</p>
          <p className="text-sm font-bold text-slate-400 mt-3">No departments created yet.</p>
        </div>
      )}
    </div>
  );
}

export default Departments;
import React from 'react';

function RecycleBin ({ trashData, restoreEmp, deletePermanently, cur }) {
  
  // एम्प्लॉई रीस्टोर करने से पहले कन्फर्मेशन
  const handleRestore = (id, name) => {
    if (window.confirm(`Are you sure you want to restore ${name} back to staff list?`)) {
      restoreEmp(id);
    }
  };

  // हमेशा के लिए मिटाने से पहले सख्त चेतावनी
  const handlePermanentDelete = (id, name) => {
    if (window.confirm(`🚨 WARNING: Are you sure you want to delete ${name} PERMANENTLY? This action cannot be undone.`)) {
      deletePermanently(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 🗑️ Header Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Recycle Bin</h2>
          <p className="text-sm font-bold text-slate-400 mt-1">Manage deleted staff members. Restore them or wipe them forever.</p>
        </div>
        <span className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm">
          Items in Bin: {trashData.length}
        </span>
      </div>

      <hr className="border-slate-100" />

      {/* 📱 MOBILE VIEW: कार्ड्स लेआउट (डेस्कटॉप पर छुप जाएगा) */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {trashData.map((e) => (
          <div key={e.id} className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-800 text-base">{e.name}</p>
                <p className="text-[11px] font-black text-teal-600 uppercase mt-0.5">{e.empID}</p>
              </div>
              <span className="text-xs font-black uppercase px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {e.dept}
              </span>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-[10px] font-black text-slate-400 block uppercase">Basic Salary</span>
                <span className="font-black text-slate-700 text-base">{cur}{e.salary.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 border-t border-slate-50 pt-3">
              <button 
                onClick={() => handleRestore(e.id, e.name)} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase shadow-sm transition-colors"
              >
                RESTORE
              </button>
              <button 
                onClick={() => handlePermanentDelete(e.id, e.name)} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase shadow-sm transition-colors"
              >
                PURGE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP VIEW: टेबल लेआउट (मोबाइल पर छुप जाएगी) */}
      <div className="hidden lg:block bg-white rounded-[2rem] border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b">
            <tr>
              <th className="p-6">Employee Info</th>
              <th className="p-6">Department</th>
              <th className="p-6">Basic Salary</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {trashData.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div>
                    <p className="font-bold text-slate-800">{e.name}</p>
                    <p className="text-[11px] font-black text-teal-600 uppercase mt-0.5">{e.empID}</p>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-xs font-black uppercase px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                    {e.dept}
                  </span>
                </td>
                <td className="p-6 font-black text-slate-700">
                  {cur}{e.salary.toLocaleString()}
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => handleRestore(e.id, e.name)} 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-lg transition-all"
                    >
                      RESTORE
                    </button>
                    <button 
                      onClick={() => handlePermanentDelete(e.id, e.name)} 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-lg transition-all"
                    >
                      DELETE PERMANENTLY
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🍃 Empty Bin Fallback (जब बिन में कुछ न हो) */}
      {trashData.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2rem] border shadow-sm">
          <div className="text-5xl mb-4">🗑️</div>
          <p className="text-xl font-bold text-slate-300">YOUR BIN IS EMPTY</p>
          <p className="text-sm font-bold text-slate-400 mt-2">Deleted staff data will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default RecycleBin;
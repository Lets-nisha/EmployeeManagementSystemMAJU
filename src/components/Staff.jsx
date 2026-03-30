import React from 'react';

function Staff({ search, setSearch, openEmpModal, activeEmpTab, setActiveEmpTab, db, cur, deleteEmp }) {
  
  // एम्प्लॉई डिलीट करने से पहले कन्फर्मेशन पूछना
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteEmp(id);
    }
  };

  // फिल्टर्ड डेटा को एक वेरिएबल में रख लिया ताकि बार-बार कोड न लिखना पड़े
  const filteredStaff = db.e
    .filter((e) => activeEmpTab === "ALL" || e.dept === activeEmpTab)
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.empID.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 🔍 Search & Add Staff Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search staff (e.g., KH or Name)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 pl-6 bg-white border rounded-2xl font-bold outline-none shadow-sm focus:border-teal-500 transition-colors"
          />
        </div>
        <button 
          onClick={() => openEmpModal()} 
          className="w-full md:w-auto bg-teal-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-teal-700 transition-colors text-sm uppercase tracking-wider"
        >
          Add New Staff
        </button>
      </div>

      {/* 📑 Department Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
        {["ALL", ...db.d].map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveEmpTab(dept)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase whitespace-nowrap transition-all ${
              activeEmpTab === dept ? "bg-slate-800 text-white shadow-md" : "bg-white text-slate-500 border hover:bg-slate-50"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* 📱 MOBILE VIEW: कार्ड्स लेआउट (डेस्कटॉप पर छुप जाएगा) */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredStaff.map((e) => (
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
            
            <div className="flex justify-between items-center border-t border-slate-50 pt-3">
              <div>
                <span className="text-[10px] font-black text-slate-400 block uppercase">Basic Salary</span>
                <span className="font-black text-slate-700 text-base">{cur}{e.salary.toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => openEmpModal(e.id)} 
                  className="bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm"
                >
                  EDIT
                </button>
                <button 
                  onClick={() => handleDelete(e.id, e.name)} 
                  className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm"
                >
                  DELETE
                </button>
              </div>
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
            {filteredStaff.map((e) => (
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
                      onClick={() => openEmpModal(e.id)} 
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-lg transition-all"
                    >
                      EDIT
                    </button>
                    <button 
                      onClick={() => handleDelete(e.id, e.name)} 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-lg transition-all"
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results Fallback */}
      {filteredStaff.length === 0 && (
        <div className="text-center py-16 bg-white rounded-[2rem] border shadow-sm">
          <p className="text-xl font-bold text-slate-300">USER SLASH</p>
          <p className="text-sm font-bold text-slate-400 mt-3">No staff members found.</p>
        </div>
      )}
    </div>
  );
}

export default Staff;
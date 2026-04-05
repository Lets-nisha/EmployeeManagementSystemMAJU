import React from 'react';

function Modals({ 
  showEmpMod, setShowEmpMod, empFormData, setEmpFormData, db, saveEmp,
  
  showAttMod, setShowAttMod, markAttendance
}) {
  return (
    <>
      {/* 1. Employee Modal */}
    {/* ADD/EDIT EMPLOYEE MODAL */}
{showEmpMod && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative animate-fadeIn">
      <button onClick={() => setShowEmpMod(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
        <i className="fas fa-times-circle text-2xl"></i>
      </button>
      
      {/* 🏷️ Dynamic Title (Add या Update) */}
      <h3 className="text-2xl font-black mb-6 text-slate-800 uppercase">
        {empFormData.id ? "Update Staff" : "Add New Staff"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-black uppercase text-slate-400 block mb-1">Full Name</label>
          <input type="text" value={empFormData.name} onChange={(e) => setEmpFormData({ ...empFormData, name: e.target.value })} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-400 block mb-1">Department</label>
          <select value={empFormData.dept} onChange={(e) => setEmpFormData({ ...empFormData, dept: e.target.value })} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold">
            {db.d.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-black uppercase text-slate-400 block mb-1">Monthly Salary</label>
          <input type="number" value={empFormData.salary} onChange={(e) => setEmpFormData({ ...empFormData, salary: e.target.value })} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" />
        </div>
        
        
        <div>
          <label className="text-xs font-black uppercase text-slate-400 block mb-1">Joining Date</label>
          <input 
            type="date" 
            value={empFormData.joiningDate || ''} 
            onChange={(e) => setEmpFormData({ ...empFormData, joiningDate: e.target.value })} 
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold text-slate-700" 
          />
        </div>
        
        {/* 🔘 Dynamic Button Text */}
        <button onClick={saveEmp} className="w-full bg-teal-600 text-white p-4 rounded-2xl font-black shadow-lg hover:bg-teal-700 transition-colors mt-2">
          {empFormData.id ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </div>
  </div>
)}

     
      {/* 3. Attendance Modal */}
      {showAttMod && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl text-center">
            <h3 className="text-2xl font-black mb-6 text-slate-800">Action Required</h3>
            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => markAttendance("present")} className="w-full bg-emerald-50 text-emerald-600 p-4 rounded-2xl font-black">PRESENT</button>
              <button onClick={() => markAttendance("late")} className="w-full bg-amber-50 text-amber-600 p-4 rounded-2xl font-black">LATE</button>
              <button onClick={() => markAttendance("absent")} className="w-full bg-red-50 text-red-600 p-4 rounded-2xl font-black">ABSENT</button>
              <button onClick={() => setShowAttMod(false)} className="w-full text-slate-400 p-4 font-bold mt-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modals;
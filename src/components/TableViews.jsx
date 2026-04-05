import React, { useState } from 'react';

function TableViews({ view, setShowLeaveMod, db, setDb, today, setSelId, setShowAttMod, repDate, setRepDate, config, printSlip }) {
  
  // 📆 मंथली और इयरली फिल्टर के लिए लोकल स्टेट
  const [filterType, setFilterType] = useState('day'); // 'day', 'month', 'year'

  // ✅ एडमिन के लिए Accept / Reject करने और नोटिफिकेशन भेजने का फंक्शन
  const handleLeaveAction = (leaveId, status) => {
    const leave = db.l.find(x => x.id === leaveId);
    if (!leave) return;

    const updatedLeaves = db.l.map((l) => (l.id === leaveId ? { ...l, status } : l));
    
    const newNotification = {
      id: Date.now(),
      eid: leave.eid,
      message: `Your leave request for ${leave.date} has been ${status.toUpperCase()} by the Admin.`,
      status: status,
      read: false
    };

    setDb({ 
      ...db, 
      l: updatedLeaves, 
      notifications: [...(db.notifications || []), newNotification] 
    });
  };

  // 📊 डायनामिक रिपोर्ट्स ग्रुपिंग फंक्शन (Day, Month, Year के आधार पर)
  const getFilteredReports = () => {
    const grouped = {};
    
    db.a.forEach((att) => {
      const attDate = new Date(att.date);
      let key = att.date; // Default Day key: YYYY-MM-DD

      if (filterType === 'month') {
        key = attDate.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "March 2026"
      } else if (filterType === 'year') {
        key = attDate.getFullYear().toString(); // e.g., "2026"
      }

      // अगर दिन वाला फ़िल्टर है, तो सिर्फ चुनी हुई तारीख का डेटा दिखाओ
      if (filterType === 'day' && att.date !== repDate) return;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(att);
    });

    return grouped;
  };

  const groupedReports = getFilteredReports();

  return (
    <>
      {/* 📄 VIEW: LEAVES (मोबाइल पर कार्ड्स, डेस्कटॉप पर टेबल) */}
      {view === 'leave' && (
        <div className="space-y-6">

          {/* 📱 MOBILE VIEW: कार्ड्स */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {db.l.map((l) => {
              const emp = db.e.find((x) => x.id === l.eid);
              if (!emp) return null;
              return (
                <div key={l.id} className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800 text-base">{emp.name}</p>
                      <p className="text-[11px] font-black text-teal-600 uppercase">{emp.empID} — {emp.dept}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">{l.date}</p>
                    </div>
                    <span className={`uppercase text-[10px] font-black px-3 py-1 rounded-full ${l.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : l.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{l.status}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-sm font-bold text-slate-600">
                    <span className="text-[10px] uppercase font-black text-slate-400 block mb-1">Reason:</span>
                    {l.reason}
                  </div>
                  {l.status === 'pending' ? (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button onClick={() => handleLeaveAction(l.id, 'approved')} className="bg-emerald-600 text-white py-3 rounded-xl text-xs font-black uppercase shadow-sm">Accept</button>
                      <button onClick={() => handleLeaveAction(l.id, 'rejected')} className="bg-red-600 text-white py-3 rounded-xl text-xs font-black uppercase shadow-sm">Reject</button>
                    </div>
                  ) : (
                    <div className="text-center text-xs font-bold text-slate-400 py-2 border-t">Decision Made</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 💻 DESKTOP VIEW: टेबल */}
          <div className="hidden lg:block bg-white rounded-[2rem] border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b">
                <tr><th className="p-6">Employee</th><th className="p-6">Reason</th><th className="p-6 text-center">Status</th><th className="p-6 text-center">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {db.l.map((l) => {
                  const emp = db.e.find((x) => x.id === l.eid);
                  if (!emp) return null;
                  return (
                    <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div>
                          <p className="font-bold text-slate-800">{emp.name}</p>
                          <p className="text-[11px] font-black text-teal-600 uppercase">{emp.empID} — {emp.dept}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{l.date}</p>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-bold text-slate-500">{l.reason}</td>
                      <td className="p-6 text-center">
                        <span className={`uppercase text-[10px] font-black px-3 py-1 rounded-full ${l.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : l.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{l.status}</span>
                      </td>
                      <td className="p-6 text-center">
                        {l.status === 'pending' ? (
                          <div className="flex justify-center gap-3">
                            <button onClick={() => handleLeaveAction(l.id, 'approved')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-black">Accept</button>
                            <button onClick={() => handleLeaveAction(l.id, 'rejected')} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-black">Reject</button>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-slate-300">Decision Made</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📄 VIEW: ATTENDANCE */}
      {view === 'att' && (
        <div className="grid grid-cols-1 gap-4">
          {db.e.map((e) => {
            const att = db.a.find((a) => a.id === e.id && a.date === today);
            const st = att ? att.status : "unmarked";
            return (
              <div key={e.id} className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 text-base">{e.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{e.empID}</p>
                </div>
                <div>
                  {st === "unmarked" ? (
                    <button onClick={() => { setSelId(e.id); setShowAttMod(true); }} className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase shadow-sm">MARK NOW</button>
                  ) : (
                    <span className={`uppercase text-xs font-black px-4 py-2 rounded-lg ${st === "present" ? "bg-emerald-50 text-emerald-600" : st === "late" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>{st}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 📄 🆕 VIEW: REPORTS (अपग्रेडेड: Day, Month, Year फिल्टर्स के साथ) */}
      {view === 'rep' && (
        <div className="space-y-6">
          
          {/* 🎛️ फिल्टर्स वाला नया बार */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* १. क्या देखना है (Day, Month, Year) */}
            <div className="flex-1">
              <span className="text-[11px] font-black text-slate-400 uppercase block mb-1">Report View</span>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)} 
                className="p-4 bg-white border rounded-2xl font-bold w-full outline-none shadow-sm focus:border-teal-500 transition-colors"
              >
                <option value="day">By Day  </option>
                <option value="month">By Month  </option>
                <option value="year">By Year </option>
              </select>
            </div>

            {/* २. तारीख चुनने वाला बॉक्स (सिर्फ 'Day' फिल्टर में काम करेगा) */}
            <div className={`flex-1 ${filterType !== 'day' ? 'opacity-40 cursor-not-allowed' : ''}`}>
              <span className="text-[11px] font-black text-slate-400 uppercase block mb-1">Select Date</span>
              <input 
                type="date" 
                value={repDate} 
                onChange={(e) => setRepDate(e.target.value)} 
                disabled={filterType !== 'day'}
                className="p-4 bg-white border rounded-2xl font-bold w-full outline-none shadow-sm focus:border-teal-500 transition-colors" 
              />
            </div>
          </div>

          {/* 📊 रिपोर्ट कार्ड्स */}
          <div className="space-y-4">
            {Object.keys(groupedReports).sort().reverse().map((key) => (
              <div key={key} className="bg-white p-6 md:p-8 rounded-[2rem] border shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-2">
                  <h4 className="font-black text-slate-800 uppercase text-sm sm:text-base">
                    {filterType === 'day' ? `Staff Data on ${key}` : `${filterType === 'month' ? 'Month' : 'Year'} Summary: ${key}`}
                  </h4>
                  <span className="bg-teal-50 text-teal-600 px-4 py-1 rounded-full text-[10px] font-black">{groupedReports[key].length} entries</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedReports[key].map((r, idx) => {
                    const emp = db.e.find((x) => x.id === r.id);
                    if (!emp) return null;
                    return (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center hover:bg-slate-100 transition-colors">
                        <div>
                          <p className="font-bold text-sm text-slate-800">{emp.name}</p>
                          {/* मंथली और इयरली रिपोर्ट में तारीख भी साथ में दिखेगी */}
                          {filterType !== 'day' ? (
                            <p className="text-[10px] text-teal-600 font-black">{r.date}</p>
                          ) : (
                            <p className="text-[10px] text-slate-400 font-black">{emp.empID}</p>
                          )}
                        </div>
                        <span className={`uppercase text-[10px] font-black px-2 py-1 rounded-md ${r.status === 'present' ? 'bg-emerald-50 text-emerald-600' : r.status === 'late' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{r.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📄 VIEW: SALARY */}
      {view === 'sal' && (
        <div className="grid grid-cols-1 gap-4">
          {db.e.map((e) => {
            const m = new Date().getMonth();
            const lCount = db.l.filter((l) => l.eid === e.id && l.status === "approved" && new Date(l.date).getMonth() === m).length;
            const aCount = db.a.filter((a) => a.id === e.id && a.status === "absent" && new Date(a.date).getMonth() === m).length;
            const totalDed = (lCount > 2 ? (lCount - 2) * 500 : 0) + aCount * 1000;
            return (
              <div key={e.id} className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800 text-base">{e.name}</p>
                    <p className="text-xs font-black text-teal-600">{e.empID}</p>
                  </div>
                  <button onClick={() => printSlip(e.id)} className="bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm">PAYSLIP</button>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t pt-3 text-sm">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 block">BASIC</span>
                    <span className="font-black text-emerald-600">{config.cur}{e.salary.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 block">DEDUCTIONS</span>
                    <span className="font-black text-red-500">-{config.cur}{totalDed.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default TableViews;
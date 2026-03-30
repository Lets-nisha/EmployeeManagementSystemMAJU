import React, { useState } from 'react';

function EmployeeDashboard({ db, setDb, currentEmp, logout, config }) {
  const [leaveForm, setLeaveForm] = useState({ reason: "", date: "" });
  const [showNotifBox, setShowNotifBox] = useState(false); // नोटिफिकेशन बॉक्स दिखाने के लिए
  const today = new Date().toISOString().split("T")[0];

  // कर्मचारी के अनपढ़ (unread) नोटिफिकेशन्स गिनना
  const myNotifications = (db.notifications || []).filter(n => n.eid === currentEmp.id);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  const handleApplyLeave = () => {
    if (!leaveForm.reason || !leaveForm.date) {
      alert("Please fill all fields!");
      return;
    }
    const newLeave = {
      id: Date.now(),
      eid: currentEmp.id,
      reason: leaveForm.reason,
      date: leaveForm.date,
      status: "pending"
    };
    setDb({ ...db, l: [...db.l, newLeave] });
    setLeaveForm({ reason: "", date: "" });
    alert("Leave request sent to Admin!");
  };

  // नोटिफिकेशन को पढ़ा हुआ (Read) मार्क करना
  const markAsRead = () => {
    const updatedNotifs = db.notifications.map(n => n.eid === currentEmp.id ? { ...n, read: true } : n);
    setDb({ ...db, notifications: updatedNotifs });
    setShowNotifBox(!showNotifBox);
  };

  // Monthly Calculations
  const m = new Date().getMonth();
  const lCount = db.l.filter((l) => l.eid === currentEmp.id && l.status === "approved" && new Date(l.date).getMonth() === m).length;
  const aCount = db.a.filter((a) => a.id === currentEmp.id && a.status === "absent" && new Date(a.date).getMonth() === m).length;
  const totalDed = (lCount > 2 ? (lCount - 2) * 500 : 0) + aCount * 1000;
  const netPay = currentEmp.salary - totalDed;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b p-6 flex justify-between items-center sticky top-0 z-50">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase">Welcome back,</p>
          <h2 className="text-xl font-black text-slate-700">{currentEmp.name} <span className="text-sm font-bold text-teal-600">({currentEmp.empID})</span></h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* ✅ Notification Bell Icon */}
          <div className="relative">
            <button onClick={markAsRead} className="relative p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
              <i className="fas fa-bell text-lg"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Box */}
            {showNotifBox && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-2xl shadow-xl z-[200] overflow-hidden">
                <div className="p-4 border-b">
                  <h4 className="font-black text-slate-700">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {myNotifications.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-6 font-bold">No notifications yet.</p>
                  ) : (
                    myNotifications.reverse().map(n => (
                      <div key={n.id} className={`p-4 border-b text-sm font-medium ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <p className="text-slate-700">{n.message}</p>
                        <span className={`text-[10px] font-black uppercase ${n.status === 'approved' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {n.status === 'approved' ? 'Success' : 'Rejected'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button onClick={logout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm">
            Logout
          </button>
        </div>
      </header>

      <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className="p-4 bg-teal-50 rounded-2xl text-teal-600"><i className="fas fa-wallet text-2xl"></i></div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Net Salary (This Month)</p>
              <h3 className="text-2xl font-black">{config.cur}{netPay.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><i className="fas fa-calendar-minus text-2xl"></i></div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Approved Leaves</p>
              <h3 className="text-2xl font-black">{lCount}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className="p-4 bg-red-50 rounded-2xl text-red-600"><i className="fas fa-user-times text-2xl"></i></div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Total Absents</p>
              <h3 className="text-2xl font-black">{aCount}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Apply Leave Box */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border shadow-sm space-y-4">
            <h3 className="text-xl font-black text-slate-800">Request Leave</h3>
            <div>
              <label className="text-xs font-black uppercase text-slate-400 block mb-2">Reason</label>
              <input type="text" placeholder="Ex: Medical Emergency" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-400 block mb-2">Date</label>
              <input type="date" value={leaveForm.date} onChange={(e) => setLeaveForm({ ...leaveForm, date: e.target.value })} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" />
            </div>
            <button onClick={handleApplyLeave} className="w-full bg-teal-600 text-white p-4 rounded-2xl font-black shadow-lg hover:bg-teal-700">Submit Request</button>
          </div>

          {/* Leave History */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-4">My Leave History</h3>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {db.l.filter(l => l.eid === currentEmp.id).length === 0 ? (
                <p className="text-sm text-slate-400 font-bold text-center py-10">No leaves requested yet.</p>
              ) : (
                db.l.filter(l => l.eid === currentEmp.id).reverse().map(l => (
                  <div key={l.id} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{l.reason}</p>
                      <p className="text-[10px] text-slate-400 font-black">{l.date}</p>
                    </div>
                    <span className={`uppercase text-[10px] font-black px-2 py-1 rounded-md ${l.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : l.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{l.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;
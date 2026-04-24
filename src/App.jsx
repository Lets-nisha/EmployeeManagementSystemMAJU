import "./App.css";
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

// सारे Components इम्पोर्ट करना
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Staff from "./components/Staff";
import Departments from "./components/Departments";
import TableViews from "./components/TableViews";
import Settings from "./components/Settings";
import Modals from "./components/Modals";
import Payslip from "./components/Payslip";

// ✅ Employee & Bin Component
import EmployeeDashboard from "./components/EmployeeDashboard";
import RecycleBin from "./components/RecycleBin"; // 👈 यहाँ मैंने फाइल का नाम RecycleBin रखा है जो आपके Bin.jsx से आ रहा है

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserCircle, LayoutDashboard, Send } from 'lucide-react';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState("admin"); // 'admin' या 'employee'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState("");
  const [empIdInput, setEmpIdInput] = useState(""); // Employee login के लिए
  const [currentEmp, setCurrentEmp] = useState(null); // Current logged-in Employee

  // मोबाइल साइडबार को खोलने और बंद करने के लिए ये स्टेट यहाँ जोड़ें
  const [isOpen, setIsOpen] = useState(false);

  const [view, setView] = useState("dash");
  const [activeEmpTab, setActiveEmpTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selId, setSelId] = useState(null);
  const [repDate, setRepDate] = useState("");
  const [newDeptName, setNewDeptName] = useState("");

  const [showEmpMod, setShowEmpMod] = useState(false);
  const [showLeaveMod, setShowLeaveMod] = useState(false);
  const [showAttMod, setShowAttMod] = useState(false);
  const [showSlipPrint, setShowSlipPrint] = useState(false);

  const [empFormData, setEmpFormData] = useState({ id: "", name: "", dept: "", salary: "", joiningDate: "" });
  const [leaveFormData, setLeaveFormData] = useState({ eid: "", reason: "", date: "" });
  const [printData, setPrintData] = useState(null);

  // 🆕 यहाँ हमने db में 'trash: []' डिफ़ॉल्ट जोड़ दिया है
  const [db, setDb] = useState(() => {
    const savedDb = localStorage.getItem("ems_db");
    return savedDb ? JSON.parse(savedDb) : { e: [], d: ["Management", "IT", "Finance"], l: [], a: [], trash: [] };
  });

  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem("ems_config");
    return savedConfig ? JSON.parse(savedConfig) : { org: "A1 EMS", cur: "₹", addr: "Main City Hub, Sector 12" };
  });

  useEffect(() => { localStorage.setItem("ems_db", JSON.stringify(db)); }, [db]);
  useEffect(() => { localStorage.setItem("ems_config", JSON.stringify(config)); }, [config]);

  useEffect(() => {
    if (sessionStorage.getItem("auth") === "admin") setIsLoggedIn(true);
    if (sessionStorage.getItem("auth") === "employee") {
      const empData = JSON.parse(sessionStorage.getItem("currentEmp"));
      setCurrentEmp(empData);
      setIsLoggedIn(true);
      setRole("employee");
    }
  }, []);

  // Admin Chart Logic
  useEffect(() => {
    let ch1 = null; let ch2 = null;
    if (isLoggedIn && role === "admin" && view === "dash" && db.e.length > 0) {
      const deptCounts = {};
      db.e.forEach((e) => { deptCounts[e.dept] = (deptCounts[e.dept] || 0) + 1; });
      const labels = Object.keys(deptCounts);
      const counts = Object.values(deptCounts);
      const o = { maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } };
      const ctx1 = document.getElementById("c1");
      const ctx2 = document.getElementById("c2");

      if (ctx1 && ctx2) {
        ch1 = new Chart(ctx1, { type: "doughnut", data: { labels, datasets: [{ data: counts, backgroundColor: ["#0d9488", "#3b82f6", "#8b5cf6"] }] }, options: o });
        ch2 = new Chart(ctx2, { type: "bar", data: { labels, datasets: [{ label: "Staff", data: counts, backgroundColor: "#0d9488" }] }, options: o });
      }
    }
    return () => { if (ch1) ch1.destroy(); if (ch2) ch2.destroy(); };
  }, [isLoggedIn, role, view, db.e, db.d]);

  // --- LOGIN LOGIC ---
  const doLogin = () => {
    if (role === "admin") {
      if (pin === "123") {
        sessionStorage.setItem("auth", "admin");
        setIsLoggedIn(true);
      } else alert("PIN is 123");
    } else {
      const emp = db.e.find(x => x.empID.toLowerCase() === empIdInput.toLowerCase().trim());
      if (emp) {
        sessionStorage.setItem("auth", "employee");
        sessionStorage.setItem("currentEmp", JSON.stringify(emp));
        setCurrentEmp(emp);
        setIsLoggedIn(true);
      } else {
        alert("Employee ID not found! (Check Staff section in Admin for IDs)");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("currentEmp");
    setIsLoggedIn(false);
    setCurrentEmp(null);
    setPin("");
    setEmpIdInput("");
    setView("dash");
    setIsOpen(false);
  };

  // --- ADMIN METHODS ---
  const openEmpModal = (id = null) => {
    if (id) {
      const e = db.e.find((x) => x.id === id);
      // 📝 EDIT करते समय डेट भी स्टेट में आनी चाहिए
      setEmpFormData({ id: e.id, name: e.name, dept: e.dept, salary: e.salary, joiningDate: e.joiningDate || "" });
    } else {
      // ➕ NEW ADD करते समय 'joiningDate' भी खाली मिलनी चाहिए
      setEmpFormData({ id: "", name: "", dept: db.d[0] || "", salary: "", joiningDate: "" });
    }
    setShowEmpMod(true);
  };

  const saveEmp = () => {
    let updatedEmployees = [...db.e];
    if (empFormData.id) {
      const i = updatedEmployees.findIndex((x) => x.id === empFormData.id);

      updatedEmployees[i] = {
        ...updatedEmployees[i],
        name: empFormData.name,
        dept: empFormData.dept,
        salary: Number(empFormData.salary),
        joiningDate: empFormData.joiningDate
      };
    } else {

      updatedEmployees.push({
        id: Date.now(),
        empID: "KH" + Math.floor(100 + Math.random() * 900),
        name: empFormData.name,
        dept: empFormData.dept,
        salary: Number(empFormData.salary),
        joiningDate: empFormData.joiningDate
      });
    }
    setDb({ ...db, e: updatedEmployees });
    setShowEmpMod(false);
  };

  // 🗑️ १. डिलीट करने पर डेटा रीसायकल बिन (Trash) में जाएगा
  const deleteEmp = (id) => {
    const empToDelete = db.e.find((x) => x.id === id);
    if (empToDelete) {
      setDb({
        ...db,
        e: db.e.filter((x) => x.id !== id),
        trash: [...(db.trash || []), empToDelete]
      });
    }
  };

  // 🔄 २. रीसायकल बिन से डेटा वापस लाने के लिए
  const restoreEmp = (id) => {
    const empToRestore = db.trash.find((x) => x.id === id);
    if (empToRestore) {
      setDb({
        ...db,
        trash: db.trash.filter((x) => x.id !== id),
        e: [...db.e, empToRestore]
      });
    }
  };

  // 🚨 ३. रीसायकल बिन से हमेशा के लिए मिटाने के लिए
  const deletePermanently = (id) => {
    setDb({
      ...db,
      trash: db.trash.filter((x) => x.id !== id)
    });
  };

  const saveLeave = () => {
    const newLeave = { id: Date.now(), eid: parseInt(leaveFormData.eid), reason: leaveFormData.reason, date: leaveFormData.date, status: "pending" };
    setDb({ ...db, l: [...db.l, newLeave] }); setShowLeaveMod(false);
  };
  const updateLeave = (id, status) => { setDb({ ...db, l: db.l.map((l) => (l.id === id ? { ...l, status } : l)) }); };
  const saveDept = () => { if (newDeptName.trim()) { setDb({ ...db, d: [...db.d, newDeptName.trim()] }); setNewDeptName(""); } };
  const deleteDept = (idx) => { const updatedDepts = [...db.d]; updatedDepts.splice(idx, 1); setDb({ ...db, d: updatedDepts }); };
  const markAttendance = (status) => { const today = new Date().toISOString().split("T")[0]; setDb({ ...db, a: [...db.a, { date: today, id: selId, status }] }); setShowAttMod(false); };

  const printSlip = (id) => {
    const e = db.e.find((x) => x.id === id); if (!e) return;
    const m = new Date().getMonth();
    const l_ded = db.l.filter((l) => l.eid === id && l.status === "approved" && new Date(l.date).getMonth() === m).length * 500;
    const a_ded = db.a.filter((a) => a.id === id && a.status === "absent" && new Date(a.date).getMonth() === m).length * 1000;
    setPrintData({ e, leaves: 0, absents: 0, l_ded, a_ded, net: e.salary - l_ded - a_ded });
    setShowSlipPrint(true);
  };

  const triggerPrint = () => { setTimeout(() => { window.print(); }, 500); };

  const today = new Date().toISOString().split("T")[0];
  const lToday = db.l.filter((l) => l.date === today && l.status === "approved").length;
  const totalPayroll = db.e.reduce((sum, e) => sum + e.salary, 0);

  const groupedReports = db.a.reduce((acc, c) => {
    if (repDate && c.date !== repDate) return acc;
    if (!acc[c.date]) acc[c.date] = []; acc[c.date].push(c); return acc;
  }, {});

  // --- LOGIN SCREEN JSX ---
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-4 overflow-hidden">

        {/* Background Decor: EMS Professional Feel */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>

          {/* Abstract Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center border border-white/20">

            {/* Top Icon Area */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-teal-50 flex items-center justify-center rounded-2xl text-teal-600 transition-transform duration-500 hover:rotate-12">
                {role === 'admin' ? <ShieldCheck size={32} /> : <UserCircle size={32} />}
              </div>
            </div>

            {/* Role Selector with Sliding Animation */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 relative">
              <button
                onClick={() => setRole("admin")}
                className={`flex-1 py-3 text-sm font-black rounded-xl z-10 transition-colors duration-300 ${role === 'admin' ? 'text-teal-600' : 'text-slate-500'}`}
              >
                ADMIN
              </button>
              <button
                onClick={() => setRole("employee")}
                className={`flex-1 py-3 text-sm font-black rounded-xl z-10 transition-colors duration-300 ${role === 'employee' ? 'text-teal-600' : 'text-slate-500'}`}
              >
                EMPLOYEE
              </button>

              {/* Animated Background Slider */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 left-1.5 bg-white shadow-md rounded-xl"
                animate={{ x: role === 'admin' ? '0%' : '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                initial={false}
                style={{ width: 'calc(50% - 6px)' }}
              />
            </div>

            {/* Form Content with Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                  {role === "admin" ? "Management Control" : "Staff Portal"}
                </h1>

                {role === "admin" ? (
                  <input
                    type="password"
                    placeholder="Enter Admin PIN (123)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 outline-none text-center font-bold focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Emp ID (Ex: KH982)"
                    value={empIdInput}
                    onChange={(e) => setEmpIdInput(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 outline-none text-center font-bold focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Login Button with Hover Animation */}
            <button
              onClick={doLogin}
              className="w-full group relative overflow-hidden bg-teal-600 text-white p-4 rounded-2xl font-black transition-all hover:bg-teal-700 active:scale-95 flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={20} className="group-hover:rotate-12 transition-transform" />
              SECURE LOGIN
            </button>
          </div>

        </motion.div>
      </div>
    );
  }

  // ✅ --- RENDER EMPLOYEE VIEW ---
  if (role === "employee" && currentEmp) {
    return <EmployeeDashboard db={db} setDb={setDb} currentEmp={currentEmp} logout={logout} config={config} />;
  }

  // --- RENDER ADMIN VIEW ---
  return (
    <div className="flex min-h-screen text-slate-900 bg-slate-50">

      {/* 1. Sidebar Component */}
      <Sidebar
        org={config.org}
        view={view}
        setView={setView}
        logout={logout}
        pendingLeavesCount={db.l.filter(leave => leave.status === 'pending').length}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">

        {/* 2. Header Component */}
        <Header
          view={view}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="p-4 md:p-6 lg:p-10">

          {view === 'dash' && <Dashboard totalStaff={db.e.length} lToday={lToday} totalPayroll={totalPayroll} cur={config.cur} />}
          {view === 'emp' && <Staff search={search} setSearch={setSearch} openEmpModal={openEmpModal} activeEmpTab={activeEmpTab} setActiveEmpTab={setActiveEmpTab} db={db} cur={config.cur} deleteEmp={deleteEmp} />}
          {view === 'dept' && <Departments newDeptName={newDeptName} setNewDeptName={setNewDeptName} saveDept={saveDept} db={db} deleteDept={deleteDept} />}
          {['leave', 'att', 'rep', 'sal'].includes(view) && <TableViews view={view} setShowLeaveMod={setShowLeaveMod} db={db} setDb={setDb} today={today} setSelId={setSelId} setShowAttMod={setShowAttMod} repDate={repDate} setRepDate={setRepDate} groupedReports={groupedReports} config={config} printSlip={printSlip} />}
          {view === 'set' && <Settings config={config} setConfig={setConfig} saveSettings={() => alert("Updated!")} />}

          {/* 🆕 यहाँ 'bin' वाला व्यू रेंडर होगा */}
          {view === 'bin' && <RecycleBin trashData={db.trash || []} restoreEmp={restoreEmp} deletePermanently={deletePermanently} cur={config.cur} />}

        </div>
      </main>

      <Modals showEmpMod={showEmpMod} setShowEmpMod={setShowEmpMod} empFormData={empFormData} setEmpFormData={setEmpFormData} db={db} saveEmp={saveEmp} showLeaveMod={showLeaveMod} setShowLeaveMod={setShowLeaveMod} leaveFormData={leaveFormData} setLeaveFormData={setLeaveFormData} saveLeave={saveLeave} showAttMod={showAttMod} setShowAttMod={setShowAttMod} markAttendance={markAttendance} />
      <Payslip showSlipPrint={showSlipPrint} printData={printData} setShowSlipPrint={setShowSlipPrint} config={config} triggerPrint={triggerPrint} />
    </div>
  );
}

export default App;
import React from 'react';

function Header({ view, toggleSidebar, isOpen }) {
  return (
   <header className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* लेफ्ट साइड: हैमबर्गर बटन + व्यू का नाम */}
      <div className="flex items-center gap-3">
        {/* 📱 🆕 Hamburger Button (सिर्फ मोबाइल और टैबलेट पर दिखेगा) */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden text-slate-700 p-2 focus:outline-none flex items-center justify-center w-10 h-10 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
        </button>

        {/* पेज का नाम */}
        <h2 className="text-lg md:text-xl font-black text-slate-700 uppercase tracking-tighter">{view}</h2>
      </div>
     
    </header>
  );
}

export default Header;
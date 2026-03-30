import React from 'react';

function Header({ view }) {
  return (
   <header className="bg-white border-b p-4 pl-13  md:pl-13 flex justify-between items-center sticky top-0 z-50">
      <h2 className=" text-lg md:text-xl font-black text-slate-700 uppercase tracking-tighter">{view}</h2>
     
    </header>
  );
}

export default Header;
import React from 'react';

const CategoryHeader = ({ activeCat, setCat }) => (
  <div className="flex bg-black border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
    {["Technical", "Cultural"].map((cat) => (
      <button
        key={cat}
        onClick={() => setCat(cat)}
        className={`flex-1 py-4 text-sm font-black uppercase tracking-widest border-r-[5px] border-black last:border-r-0 transition-colors
          ${activeCat === cat ? 'bg-fest-lime text-black' : 'bg-[#3f267d] text-fest-lime hover:bg-[#3f267d]/80'}`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryHeader;
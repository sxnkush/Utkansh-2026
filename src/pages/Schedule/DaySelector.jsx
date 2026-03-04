import React from 'react';

const DaySelector = ({ activeDay, setDay }) => {
  const days = ["Day 1", "Day 2", "Day 3"];
  
  return (
    /* Changed grid to flex and added justify-center to align all buttons to the middle */
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 w-full">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setDay(day)}
          className={`
            /* Precise sizing to match brutalist aesthetic */
            min-w-[140px] md:min-w-[220px] 
            py-5 md:py-7 
            text-2xl md:text-4xl 
            font-black uppercase tracking-tighter 
            border-[5px] border-black transition-all duration-100
            
            /* Logic for active/inactive states based on UI images */
            ${activeDay === day 
              ? 'bg-[#cef404] text-black translate-x-1 translate-y-1 shadow-none' 
              : 'bg-white text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1'
            }
          `}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
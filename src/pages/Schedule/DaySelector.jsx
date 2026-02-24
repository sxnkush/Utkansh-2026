import React from 'react';

const DaySelector = ({ activeDay, setDay }) => {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setDay(day)}
          className={`py-8 text-3xl font-black uppercase border-[6px] border-black transition-all
            ${activeDay === day 
              ? 'bg-fest-lime text-black translate-x-2 translate-y-2' 
              : 'bg-white text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
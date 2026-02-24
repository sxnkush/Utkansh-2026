import React from 'react';
import { scheduleData } from './scheduleData';

const EventCard = ({ time, name, location, subCategory }) => (
  /* Compact but wide card with a sharp border */
  <div className="flex mb-6 border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden font-archivo">
    
    {/* 🕒 Time Sidebar: Solid Electric Lime */}
    <div className="w-28 md:w-36 bg-[#cef404] flex flex-col items-center justify-center border-r-[5px] border-black p-3 shrink-0">
      <span className="text-3xl md:text-4xl font-black text-black leading-none">{time.split(' ')[0]}</span>
      <span className="text-xs font-black text-black uppercase">{time.split(' ')[1]}</span>
    </div>

    {/* 📄 Main Content */}
    <div className="flex-1 p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start gap-4">
        {/* Event Name: Extra Bold Archivo */}
        <h3 className="text-2xl md:text-3xl font-black text-black italic leading-none uppercase tracking-tighter">
          {name}
        </h3>
        {/* High-Readability Category Tag */}
        <span className="bg-black text-white px-3 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest shrink-0">
          {subCategory}
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-end mt-6 gap-4">
        {/* Venue: Bold and Readable */}
        <p className="text-sm md:text-base font-black text-black uppercase italic">
          📍 <span className="underline decoration-4 decoration-[#cef404]">{location}</span>
        </p>
        
        {/* Action Button: Bold Sticker Style */}
       
      </div>
    </div>
  </div>
);
const Timeline = ({ selectedDay, category, subCategory }) => {
  const events = scheduleData[selectedDay]?.[category]?.[subCategory] || [];

  return (
    <div className="w-full">
      {events.map((e) => (
        <EventCard key={e.id} {...e} subCategory={subCategory} />
      ))}
    </div>
  );
};

export default Timeline;
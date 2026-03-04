import React from 'react';
import { scheduleData } from './scheduleData';

const EventCard = ({ time, name, location, subCategory, date }) => {
  // Helper to safely split time for the sidebar display
  const timeParts = time.split(' ');
  const displayTime = timeParts[0] || "TBA";
  const amPm = timeParts[1] || "";

  return (
    /* Center the card and set a max-width for better readability */
    <div className="flex w-full max-w-4xl mx-auto mb-10 border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden font-archivo">
      
      {/* 🕒 Time Sidebar: Solid Electric Lime */}
      <div className="w-28 md:w-36 bg-[#cef404] flex flex-col items-center justify-center border-r-[5px] border-black p-3 shrink-0">
        <span className="text-3xl md:text-4xl font-black text-black leading-none">{displayTime}</span>
        <span className="text-xs font-black text-black uppercase">{amPm}</span>
      </div>

      {/* 📄 Main Content */}
      <div className="flex-1 p-5 flex flex-col justify-between bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div className="space-y-1">
            {/* Event Name */}
            <h3 className="text-2xl md:text-3xl font-black text-black italic leading-none uppercase tracking-tighter">
              {name}
            </h3>
            {/* 📅 Date Display: Shows the specific date from scheduleData */}
            <p className="text-[#666] text-xs font-bold uppercase tracking-wider">
              📅 {date}
            </p>
          </div>
          
          {/* Subcategory Tag */}
          <span className="bg-black text-white px-3 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest shrink-0">
            {subCategory}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mt-4 gap-4">
          <div className="space-y-2">
            {/* Full Time Span: Shows the complete range (e.g., 9:00 AM - 1:30 PM) */}
            <p className="text-sm font-black text-black uppercase">
              ⏰ SCHEDULE: <span className="bg-[#cef404] px-1">{time}</span>
            </p>
            {/* Venue */}
            <p className="text-sm md:text-base font-black text-black uppercase italic">
              📍 <span className="underline decoration-4 decoration-[#cef404]">{location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ selectedDay, category, subCategory }) => {
  const dayData = scheduleData[selectedDay];
  const events = dayData?.[category]?.[subCategory] || [];
  const currentDate = dayData?.["Date"] || "Date TBA"; // Fetch date for the day 

  return (
    <div className="w-full px-2">
      {events.length > 0 ? (
        events.map((e) => (
          <EventCard 
            key={e.id} 
            {...e} 
            subCategory={subCategory} 
            date={currentDate} 
          />
        ))
      ) : (
        <div className="text-center p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto">
          <p className="font-black italic uppercase text-xl">No Events Scheduled</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
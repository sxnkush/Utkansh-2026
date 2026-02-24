import React from 'react';

const EventCard = ({ time, name, location, isLast }) => (
  <div className="relative flex gap-10 mb-14 group font-gulfs">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-14 h-14 bg-fest-lime border-[6px] border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10" />
      {!isLast && <div className="w-2 h-full bg-black/60 mt-[-6px]" />}
    </div>

    {/* Theme Purple Card with White Text */}
    <div className="flex-1 bg-[#3f267d] border-[6px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-tr-[4rem] rounded-bl-[4rem]">
      <div className="flex flex-col gap-3">
        <span className="text-fest-lime font-black uppercase text-base tracking-widest">{time}</span>
        <div className="flex flex-wrap items-center gap-6">
          <h3 className="text-4xl font-black text-white uppercase italic tracking-tight">{name}</h3>
          <div className="bg-fest-lime border-[3px] border-black px-5 py-1.5 text-sm font-black text-black rounded-full uppercase">
            📍 {location}
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default EventCard;
import React from 'react';
import { Link } from 'react-router-dom';
const EventCard = ({ event }) => {
  return (
    <div className="group relative bg-white border-[4px] border-black p-5 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
      
      <div className="relative w-full aspect-square bg-black border-2 border-black overflow-hidden mb-5">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-white font-black text-3xl italic uppercase">UTK26</span>
        </div>
        
        <div className="absolute inset-0 bg-yellow-400 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 border-t-2 border-black">
          <p className="font-black text-black text-[10px] border border-black px-2 bg-white mb-1 uppercase">Prize</p>
          <p className="text-4xl font-black text-black italic">₹{event.prize}</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase whitespace-nowrap">
            {event.category}
          </span>
          <span className="font-black text-[10px] text-black border-b border-black">{event.day}</span>
        </div>

        <h3 className="text-3xl font-black text-black uppercase leading-none mb-3 group-hover:text-[#FF0032] transition-colors">
          {event.title}
        </h3>

        <p className="text-black font-bold text-xs mb-8 line-clamp-3 leading-tight">
          {event.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link 
            to={`/events/${event.id}`}
            className="flex items-center justify-center bg-white border-2 border-black py-2 font-bold text-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
          >
            More Info
          </Link>
          <a 
            href="https://forms.gle/link"
            target="_blank"
            className="flex items-center justify-center bg-[#00E676] border-2 border-black py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
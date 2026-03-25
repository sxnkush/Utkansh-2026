import React from 'react';
import { Link } from 'react-router-dom';
import PausePage from './pause';

const EventCard = ({ event }) => {
  return (
    <div className="group relative z-50 bg-white border-[4px] border-black p-5 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">

      {/* IMAGE SECTION */}
      <div className="relative w-full aspect-square bg-gray-200 border-2 border-black overflow-hidden mb-5">
        {/* Actual Event Image */}
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Label (Optional: Keep or remove based on preference) */}
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-[8px] font-black italic uppercase z-10">
          UTK26
        </div>

        {/* Prize Hover Overlay */}
        <div className="absolute inset-0 bg-yellow-400 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 border-t-2 border-black">
          <p className="font-black text-black text-[10px] border border-black px-2 bg-white mb-1 uppercase">Prize</p>
          <p className="text-4xl font-black text-black italic">₹{event.prize}</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
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

        <p className="text-black font-bold text-xs mb-8 line-clamp-3 leading-tight" dangerouslySetInnerHTML={{ __html: event.description }} />

        {/* BUTTONS */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link
            to={`/events/${event.id}`}
            className="flex items-center justify-center bg-white border-2 border-black py-2 font-bold text-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
          >
            More Info
          </Link>
          {event.title === "DriftX" ? (
            <a
              href="https://pages.razorpay.com/driftx-ticket"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center bg-[#00E676] border-2 border-black py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
            >
              Register
            </a>
          ) : 
          event.title === "STEM MUN" ? <p>Registrations Closed</p> :
            <Link
              to="/paused"
              className="flex items-center justify-center bg-[#00E676] border-2 border-black py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
            >
              Register
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default EventCard;
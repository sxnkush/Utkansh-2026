import React, { useState, useRef } from 'react'; 
import { ArrowLeft, Search, X } from "lucide-react";
import { useTransition } from "../../transition/transitioncontext";
import { eventsData } from '../../data/eventdata';
import EventCard from './EventCard';

export default function Events() {
  const { startTransition } = useTransition();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const bgRef = useRef(null);

  // Removed Tilt logic for background
  const selectCategory = (title) => {
    setSelectedCategory(title);
  };

  const slices = [
    {
      title: "Cultural",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
      rotate: "-30deg",
      gradient: "linear-gradient(to bottom, rgba(138,63,245,0.18), #02040a)",
      text: "text-[#f6e9ff]",
      border: "border-[rgba(138,63,245,0.7)]",
      z: "z-[2]",
    },
    {
      title: "Technical",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      rotate: "30deg",
      gradient: "linear-gradient(to bottom, rgba(255,154,60,0.18), #020209)",
      text: "text-[#ff9a3c]",
      border: "border-[rgba(255,154,60,0.8)]",
      z: "z-[2]",
    },
  ];

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchQuery) return matchesSearch;
    if (selectedCategory) return event.category === selectedCategory;
    return true; 
  });

  return (
    <div
      className="min-h-screen relative font-['Permanent_Marker'] overflow-x-hidden bg-black"
      ref={bgRef}
    >
      {/* BACKGROUND LAYER - Tilt Removed */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-transform duration-700 ease-out pointer-events-none"
        style={{ 
          backgroundImage: "url('images/events_bg2.jpg')",
          transform: "scale(1.1)", // Static scale for depth
          zIndex: 0
        }}
      />

      {/* 1. BACK BUTTON */}
      <button
        onClick={() => {
    if (searchQuery) {
      setSearchQuery(""); // If searching, just clear the search first
    } else if (selectedCategory) {
      setSelectedCategory(null); // If a category is picked, go back to the fan/list view
    } else {
      startTransition("/"); // Only go home if we are on the main selection screen
    }
  }}
        className="absolute left-6 md:left-16 top-6 md:top-10 h-14 w-14 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all z-50"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>

      {/* 2. HEADING - Red Shadow Removed */}
      <h1 className="absolute top-10 w-full text-center text-white text-5xl md:text-8xl font-black italic uppercase drop-shadow-[8px_8px_0px_rgba(0,0,0,0.5)] z-40 tracking-tighter pointer-events-none">
        {selectedCategory ? selectedCategory : "EVENTS"}
      </h1>

      {/* 3. SEARCH BAR - Conditional Rendering added */}
      {(selectedCategory || searchQuery) && (
        <div className="absolute top-40 md:top-44 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50">
            <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-purple-600 rounded-lg blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
            
            <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-3 transition-all duration-300 group-focus-within:border-white/50 group-focus-within:bg-black/70">
                <Search className="w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
                <input 
                type="text"
                placeholder="SEARCH EVENTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent ml-3 text-base font-bold uppercase text-white placeholder:text-white/30 outline-none tracking-widest"
                />
                {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white transition-colors">
                    <X size={18} strokeWidth={3} />
                </button>
                )}
            </div>
            </div>
        </div>
      )}

      <div className="relative w-screen min-h-screen overflow-hidden flex flex-col items-center z-10">
        
        {/* 4. FAN LAYOUT & MOBILE STACK */}
        {!selectedCategory && !searchQuery && (
          <div className="relative w-full max-w-[1200px] h-screen flex flex-col md:flex-row justify-center items-center md:items-end px-4 gap-6 md:gap-0">
            
            {/* Mobile View: Simple vertical list */}
            <div className="md:hidden flex flex-col gap-6 w-full pt-40">
              {slices.map((slice, index) => (
                <div 
                  key={index} 
                  onClick={() => selectCategory(slice.title)}
                  className="relative w-full h-48 rounded-xl overflow-hidden border border-white/20"
                >
                   <img src={slice.img} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className={`text-3xl font-bold uppercase ${slice.text}`}>{slice.title}</span>
                   </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Fan Layout */}
            <div className="hidden md:block relative w-full h-full">
              {slices.map((slice, index) => (
                <div
                  key={index}
                  onClick={() => selectCategory(slice.title)}
                  className={`absolute bottom-[-200px] left-1/2 w-[420px] h-[120vh]
                    flex items-start justify-center pt-[200px]
                    border-l border-white/5 border-r border-white/5
                    ${slice.z} group cursor-pointer`}
                  style={{
                    transform: `translateX(-50%) rotate(${slice.rotate})`,
                    transformOrigin: "50% 100%",
                    clipPath: "polygon(0 0, 100% 0, 60% 100%, 40% 100%)",
                    background: slice.gradient,
                  }}
                >
                  <div className="relative w-full h-full transition-transform duration-300 group-hover:-translate-y-4">
                    <img
                      src={slice.img}
                      alt={slice.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-65 transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/90" />
                    <div className={`relative z-10 px-8 py-2 rounded-full bg-[#030910] border text-sm text-center uppercase font-medium tracking-wider ${slice.text} ${slice.border}`}>
                      {slice.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. EVENT GRID - Increased text size container */}
        {(selectedCategory || searchQuery) && (
          <div className="w-full max-w-7xl mx-auto px-6 pt-64 pb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700 text-xl">
            {filteredEvents.map((event) => (
              <div key={event.id} className="text-xl"> {/* Container to force larger font context */}
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
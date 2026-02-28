import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { eventsData } from '../../data/eventdata';
import CategoryCard from './CategoryCard';
import EventCard from './EventCard';
import { useTransition } from "../../transition/transitioncontext";

const EventsPage = () => {
  const [viewLevel, setViewLevel] = useState(1); // 1: Main Selection, 2: Event Grid
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { startTransition } = useTransition();

  // Logic: Show all if starting, or filter by category/search
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchQuery) return matchesSearch;
    if (viewLevel === 2) return event.category === selectedCategory;
    return true; // Show everything on initial scroll
  });

  return (
    <div className="relative min-h-screen w-full bg-fixed bg-cover bg-center" 
         style={{ backgroundImage: "url('/images/eventbg1.jpg')" }}>
      
      {/* Super light overlay (20%) for maximum background visibility */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 px-4 md:px-10 py-12 max-w-[1300px] mx-auto">
        
        {/* Simple Top Back Button */}
        {viewLevel === 2 && !searchQuery && (
          <button 
            onClick={() => setViewLevel(1)}
            className="mb-8 bg-white border-4 border-black px-6 py-2 font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all uppercase italic"
          >
            ← Back to Categories
          </button>
        )}
        {viewLevel === 1 && !searchQuery && (
          <button 
            onClick={() => startTransition("/")}
            className="mb-8 bg-white border-4 border-black px-6 py-2 font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all uppercase italic"
          >
            ← Back to Home
          </button>
        )}
        
        <header className="mb-4 flex flex-col items-center text-center">
           
          
          <h1 className="text-white text-7xl md:text-9xl font-black italic uppercase drop-shadow-[8px_8px_0px_#FF0032] leading-none mb-10 tracking-tighter">
            EVENTS
          </h1>

          <div className="w-full max-w-3xl">
            <input 
              type="text"
              placeholder="SEARCH ALL EVENTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-[6px] border-black p-4 text-2xl font-black uppercase text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] outline-none"
            />
          </div>
        </header>

        {/* Level 1: Main Category Selection */}
        {!searchQuery && viewLevel === 1 && (
          <div className="flex flex-wrap justify-center items-center gap-10 mb-32 pt-5">
            
            {['Technical', 'Cultural'].map((item, i) => (
              <CategoryCard 
                key={item} 
                title={item} 
                index={i}
                onClick={() => {
                  setSelectedCategory(item);
                  setViewLevel(2);
                }} 
              />
            ))}
          </div>
        )}

        {/* Scrollable Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
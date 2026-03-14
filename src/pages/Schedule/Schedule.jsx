import React, { useState } from 'react';
import DaySelector from './DaySelector';
import CategoryHeader from './CategoryHeader';
import SubCategoryList from './SubCategoryList';
import Timeline from './Timeline';
import { ArrowLeft } from "lucide-react";
import { useTransition } from "../../transition/transitioncontext";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [category, setCategory] = useState("Technical");
  const [subCat, setSubCat] = useState("Coding");
  const { startTransition } = useTransition();

  return (
    <div
      className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-y-auto overflow-x-hidden selection:bg-[#cef404] selection:text-black"
      style={{ backgroundImage: `url('/images/schedule.png')` }}
    >
      {/* 1. Main Wrapper: Centers all content horizontally */}
      <div className="w-full flex flex-col items-center p-4 md:p-8">

        <header className="relative w-full h-32 md:h-40 flex items-center justify-center mb-6">
          <button
            onClick={() => startTransition("/")}
            className="absolute left-4 md:left-12 h-14 w-14 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition z-50"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          {/* THE CLEAN WHITE FONT SCHEDULE TITLE */}
          <h1
            className="text-white text-6xl md:text-8xl font-black italic uppercase tracking-tighter z-40 ml-14 md:ml-0"
            style={{
              fontFamily: '"Permanent Marker", opacity-100', // Matches the brush style in image_4cf5a4.png
              /* Replicates the thick, hard-edged black shadow from image_4c946a.png */
              filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,1))',
              letterSpacing: "0.01em",
              transform: 'skewX(-6deg) scale(0.8)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)' // Adds slight crispness to the white edges
            }}
          >
            SCHEDULE
          </h1>
        </header>

        {/* 2. Scaled-up Day Selection: Centered flexbox */}
        <div className="w-full max-w-4xl mb-12 flex justify-center">
          <DaySelector activeDay={selectedDay} setDay={setSelectedDay} />
        </div>

        {/* 3. Main Content Grid: Balanced centering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-7xl items-start">

          {/* Side Navigation: Category and Subcategory filters */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-10">
            <CategoryHeader activeCat={category} setCat={setCategory} />
            <SubCategoryList
              activeDay={selectedDay}
              activeMainCat={category}
              selectedSub={subCat}
              onSelectSub={setSubCat}
            />
          </aside>

          {/* Timeline: Centered Event Cards */}
          <main className="lg:col-span-9 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <Timeline
                selectedDay={selectedDay}
                category={category}
                subCategory={subCat}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
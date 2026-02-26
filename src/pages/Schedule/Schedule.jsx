import React, { useState } from 'react';
import DaySelector from './DaySelector';
import CategoryHeader from './CategoryHeader';
import SubCategoryList from './SubCategoryList';
import Timeline from './Timeline';
import { ArrowLeft } from "lucide-react";
import { useTransition } from "../../transition/transitioncontext";

/**
 * Utkansh Schedule Component
 * Features: Centered Header, Large Day Navigation, and Split-Card Timeline
 */
const Schedule = () => {
  // State management for filtering even
  // ts
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [category, setCategory] = useState("Technical");
  const [subCat, setSubCat] = useState("Coding");
  const { startTransition } = useTransition();

  return (
    <div
      className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black"
      style={{ backgroundImage: `url('/images/schedule.png')` }}
    >
      {/* Main Wrapper: Centers all content horizontally */}
      <div className="w-full flex flex-col items-center p-4 md:p-8">

        <header className="relative w-full h-32 md:h-40 flex items-center justify-center">
          {/* Circular Back Button matching Gallery */}
          <button
            onClick={() => startTransition("/")}
            className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2
                       h-14 w-14 md:h-16 md:w-16
                       rounded-full flex items-center justify-center
                       border-2 border-white text-white
                       bg-white/10 backdrop-blur-sm
                       hover:bg-white/20 transition z-50"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Centered White Title Container */}
          <div className="bg-white constant-shine px-8 py-3 md:px-16 md:py-4 text-center">
            <h1 className="text-black text-3xl md:text-5xl font-black tracking-tighter leading-none">
              SCHEDULE
            </h1>
          </div>
        </header>
        {/* 2. Scaled-up Day Selection (Centered) */}
        <div className="w-full max-w-6xl mb-12">
          <DaySelector activeDay={selectedDay} setDay={setSelectedDay} />
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl items-start">

          {/* Side Navigation: Category and Subcategory filters */}
          <aside className="lg:col-span-3 space-y-8">
            <CategoryHeader activeCat={category} setCat={setCategory} />
            <SubCategoryList
              activeDay={selectedDay}
              activeMainCat={category}
              selectedSub={subCat}
              onSelectSub={setSubCat}
            />
          </aside>

          {/* Timeline: Displays EventCards with high readability */}
          <main className="lg:col-span-9">
            <Timeline
              selectedDay={selectedDay}
              category={category}
              subCategory={subCat}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
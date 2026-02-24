import React from 'react';
import { scheduleData, subCategories } from './scheduleData';

const SubCategoryList = ({ activeDay, activeMainCat, selectedSub, onSelectSub }) => {
  const allSubCats = subCategories[activeMainCat] || [];
  
  // Logic: Filter to only show subcategories with events on the selected day
  const availableSubCats = allSubCats.filter(sub => 
    scheduleData[activeDay]?.[activeMainCat]?.[sub]?.length > 0
  );

  return (
    <div className="flex flex-col border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {availableSubCats.map((sub) => (
        <button
          key={sub}
          onClick={() => onSelectSub(sub)}
          className={`w-full py-5 px-6 text-left text-xl font-black uppercase border-b-[5px] border-black last:border-b-0 transition-all
            ${selectedSub === sub 
              ? 'bg-fest-lime text-black translate-x-1 translate-y-1 shadow-none' 
              : 'bg-[#3f267d] text-fest-lime hover:bg-[#3f267d]/80'}`}
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubCategoryList;
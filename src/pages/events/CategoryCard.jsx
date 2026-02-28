import React from 'react';

const CategoryCard = ({ title, index, onClick }) => {
  const rotations = ['-rotate-3', 'rotate-3'];
  const rotation = rotations[index % 2];
  
  const cardImage = title.toLowerCase() === 'technical' ? '/images/technical.png' : '/images/cultural.png';

  return (
    <div 
      onClick={onClick}
      className={`relative w-[250px] h-auto border-[5px] border-black cursor-pointer transform ${rotation} 
                 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 
                 hover:rotate-0 hover:z-50 hover:-translate-y-4 hover:shadow-[18px_18px_0px_0px_rgba(0,0,0,1)]
                 flex items-center justify-center overflow-hidden group bg-transparent`}
    >
      <img 
        src={cardImage} 
        alt={title} 
        // Using object-contain with full width/height avoids stretching
        // bg-transparent ensures no colored bars appear if the aspect ratio differs
        className="w-full h-full object-contain select-none pointer-events-none group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
};

export default CategoryCard;
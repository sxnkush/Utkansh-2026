import React from "react";
import { useTransition } from "../../transition/transitioncontext";
import { ArrowLeft, Hotel, Star } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: 1,
    pack: "2 Days Accommodation",
    subTitle: "WITH FOOD",
    cost: "1499",
  },
  {
    id: 2,
    pack: "2 Days Accommodation",
    subTitle: "WITHOUT FOOD",
    cost: "1249",
  },
  {
    id: 3,
    pack: "3 Days Accommodation",
    subTitle: "WITH FOOD",
    cost: "1999",
  },
  {
    id: 4,
    pack: "3 Days Accommodation",
    subTitle: "WITHOUT FOOD",
    cost: "1749",
  },
];

function Accommodation() {
  const { startTransition } = useTransition();

  return (
    // <div
    //   className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black pb-10"
    //   style={{ backgroundImage: `url('/images/accomodation 2.webp')` }}
    // >
    //   <div className="flex flex-col items-center px-6 mt-12 relative z-10">
    //     <button
    //       onClick={() => startTransition("/")}
    //       className="absolute left-6 md:left-16 top-0 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 z-50"
    //     >
    //       <ArrowLeft size={24} strokeWidth={2.5} />
    //     </button>

    //     <h1
    //       className="text-white text-center mb-12 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-3xl sm:text-5xl md:text-6xl lg:text-6xl translate-x-9 md:translate-x-0"
    //       style={{ fontFamily: "Permanent Marker", margin: "0" }}
    //     >
    //       Accommodation
    //     </h1>

    //     {/* Adjusted grid for 2x2 layout to match image */}
    //     <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 pb-20 justify-items-center mt-20">
    //       {sections.map((item) => (
    //         <div key={item.id} className="relative w-full max-w-[400px]">
    //           {/* Card Header Ribbon */}
    //           <div
    //             className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-[105%] bg-[#cef404] py-3 px-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black flex items-center justify-center gap-3"
    //             style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }}
    //           >
    //             {item.icon}
    //             <h3 className="text-center font-black text-black italic uppercase text-lg leading-tight tracking-wider">
    //               {item.pack}
    //             </h3>
    //           </div>

    //           {/* Main Card */}
    //           <div className="bg-white border-[4px] border-black p-8 pt-14 flex flex-col items-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden h-full">
    //             <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

    //             {/* With/Without Food Badge */}
    //             <div
    //               className="bg-black text-[#cef404] px-6 py-1 font-black italic text-sm mb-6 border-2 border-[#cef404]"
    //               style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)' }}
    //             >
    //               {item.subTitle}
    //             </div>

    //             {/* Price Section */}
    //             <div className="flex items-baseline gap-2 mb-10">
    //               <span className="text-5xl font-black text-black tracking-tighter">
    //                 ₹{item.cost}
    //               </span>
    //               <span className="text-black/60 font-black text-sm italic">/PERSON</span>
    //             </div>

    //             {/* Footer Button */}
    //             <div className="w-full mt-auto">
    //               <button className="relative group/btn w-full block">
    //                 <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5"></div>
    //                 <Link to="https://v1.nitj.ac.in/events_registration/utkansh_2026/login">
    //                   <div className="relative bg-[#cef404] border-[3px] border-black py-4 font-black text-black text-base uppercase italic transition-all duration-100 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 text-center">
    //                     Register Now
    //                   </div>
    //                 </Link>
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <div
        className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black pb-10"
        style={{ backgroundImage: `url('/images/accomodation 2.webp')` }}
      >
        <div className="flex flex-col items-center px-6 mt-12 relative z-10">
          <button
            onClick={() => startTransition("/")}
            className="absolute left-6 md:left-16 top-0 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 z-50"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          <h1
            className="text-white text-center mb-12 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-3xl sm:text-5xl md:text-6xl lg:text-6xl translate-x-9 md:translate-x-0"
            style={{ fontFamily: "Permanent Marker", margin: "0" }}
          >
            Accommodation
          </h1>
        </div>
        <h4>Coming Soon...</h4>
      </div>
    </>
  );
}

export default Accommodation;

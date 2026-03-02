import React from "react";
import Navbar from "../components/navbar/navbar.jsx";
import Footer from "../components/footer/footer.jsx";
import { useTransition } from "../../transition/transitioncontext";
import { ArrowLeft } from "lucide-react";

const sections = [
  { id: 1, pack: "One Day Pack", cost: "300", duration: "1 Day" },
  { id: 2, pack: "Two Day Pack", cost: "500", duration: "2 Days" },
  { id: 3, pack: "Three Day Pack", cost: "700", duration: "3 Days" },
];

function Accommodation() {
    const { startTransition } = useTransition();
    
  return (
    <div
      className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black"
      style={{ backgroundImage: `url('/images/accomodation 2.jpg')` }}
    >

      <div className="flex flex-col items-center px-6 mt-20">
        <button
        onClick={() => startTransition("/")}
        className="absolute left-6 md:left-16 top-6 md:top-10 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 z-50"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>
        <h1
          className="text-white text-center mb-16"
          style={{
            fontFamily: "Permanent Marker",
            fontSize: "3vw",
            margin: "0",
          }}
        >
          Accommodation
        </h1>

        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-20 mt-10">
          {sections.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border-[4px] border-black p-5 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {/* Top Visual Block */}
              <div className="relative w-full aspect-square bg-black border-2 border-black overflow-hidden mb-5">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-white font-black text-3xl italic uppercase">
                    UTK26
                  </span>
                </div>

                {/* Hover Price Reveal */}
                <div className="absolute inset-0 bg-yellow-400 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 border-t-2 border-black">
                  <p className="font-black text-black text-[10px] border border-black px-2 bg-white mb-1 uppercase">
                    Price
                  </p>
                  <p className="text-4xl font-black text-black italic">
                    ₹{item.cost}
                  </p>
                  <p className="text-xs font-bold text-black">/ Person</p>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase whitespace-nowrap">
                    Combined Rooms
                  </span>
                  <span className="font-black text-[10px] text-black border-b border-black">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-black uppercase leading-none mb-3 group-hover:text-[#FF0032] transition-colors">
                  {item.pack}
                </h3>

                <p className="text-black font-bold text-xs mb-8 leading-tight">
                  Affordable shared accommodation with essential facilities,
                  safe campus environment, and comfortable stay during the fest.
                </p>

                {/* Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center bg-white border-2 border-black py-2 font-bold text-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    Details
                  </a>
                  <a
                    href="https://forms.gle/link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-[#00E676] border-2 border-black py-2 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Accommodation;
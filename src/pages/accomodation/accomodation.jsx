import React, { useState } from "react";
import Navbar from "../components/navbar/navbar.jsx";
import Footer from "../components/footer/footer.jsx";
import { useTransition } from "../../transition/transitioncontext";
import { ArrowLeft, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: 1,
    pack: "Full Fest Pass",
    cost: "3500",
    features: [
      { text: "Access to all Club Events.", included: true },
      { text: "Accommodation provided for all 3 days.", included: true },
      { text: "Participation in any ONE Flagship Event.", included: true }
    ]
  },
  {
    id: 2,
    pack: "Day 1 Accommodation Pass",
    cost: "1500",
    features: [
      { text: "Accommodation provided for Day 1", included: true },
      { text: "Access to all Club Events (Day 1).", included: true }
    ]
  },
  {
    id: 3,
    pack: "Day 2 + Day 3 Accommodation Pass",
    cost: "2800",
    features: [
      { text: "Accommodation for Day 2 & Day 3.", included: true },
      { text: "Access to all Club Events (Both days)", included: true },
      { text: "Participation in any ONE Flagship Event.", included: true }
    ]
  },

  {
    id: 7,
    pack: "Day 3 Event Pass",
    cost: "1000",
    features: [
      { text: "Access to all Club Events.", included: true },
      { text: "Participation in any ONE Flagship Event.", included: true },
      { text: "No accommodation.", included: false }
    ]
  },
];

function Accommodation() {
  const { startTransition } = useTransition();

  return (
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
          className="text-white text-center mb-12 drop-shadow-[0_4px_10px_rgba(0,0,0,1)]
text-3xl sm:text-5xl md:text-6xl lg:text-6xl translate-x-9 md:translate-x-0"
          style={{
            fontFamily: "Permanent Marker",
            margin: "0",
          }}
        >
          Accommodation
        </h1>

        {/* Coming Soon Section */}
        <div className="flex items-center justify-center w-full h-[60vh]">
          <h2
            className="text-white text-center drop-shadow-[0_4px_10px_rgba(0,0,0,1)]"
            style={{
              fontFamily: "Permanent Marker",
              fontSize: "clamp(3rem,6vw,5rem)",
            }}
          >
            Coming Soon
          </h2>
        </div>

        {/*<div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 pb-20 justify-items-center mt-10">
          {sections.map((item) => (
            <div
              key={item.id}
              className={`relative w-full max-w-[360px] ${item.id === 7 ? "md:col-span-2 lg:col-start-2 lg:col-span-1" : ""
                }`}
            >
              
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-[110%] bg-[#cef404] py-2 px-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black"
                style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }}
              >
                <h3 className="text-center font-black text-black italic uppercase text-lg leading-tight tracking-wider">
                  {item.pack}
                </h3>
              </div>

             
              <div className="bg-white border-[4px] border-black p-6 pt-10 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden h-full">
                <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

                <div className="flex items-baseline gap-1 mb-6 mt-2">
                  <span className="text-4xl font-black text-black">
                    ₹{item.cost}
                  </span>
                  <span className="text-black/60 font-black text-sm tracking-tighter italic">/PERSON</span>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="bg-[#cef404] border-2 border-black p-0.5 rounded-sm">
                          <Check className="text-black shrink-0" size={16} strokeWidth={4} />
                        </div>
                      ) : (
                        <X className="text-red-500 shrink-0 mt-1" size={20} strokeWidth={3} />
                      )}
                      <p className={`font-black text-sm italic leading-tight ${feature.included ? 'text-black' : 'text-gray-400 line-through'}`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <button className="relative group/btn w-full block">
                    <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5"></div>
                    <Link to="">
                      <div className="relative bg-[#cef404] border-[3px] border-black py-3 font-black text-black text-sm uppercase italic transition-all duration-100 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 text-center shadow-none">
                        Register Now
                      </div>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Accommodation;
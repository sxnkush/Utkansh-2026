import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";

const EventDetails = () => {
  const { eventId } = useParams();
  const { eventsData } = useContext(Context);

  if (!eventsData) return <p>Loading...</p>;

  const foundEvent = eventsData.find((item) => item.id === eventId);

  if (!foundEvent) return <p>Event not found</p>;

  return (
  <div
    className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black"
    style={{ backgroundImage: `url('/images/accomodation 2.jpg')` }}
  >
    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

    <div className="relative text-white min-h-screen pb-28">

      {/* ================= HERO SECTION ================= */}
      <section className="relative border-b-[6px] border-white">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* CATEGORY + DATE */}
          <div className="flex flex-wrap gap-4 mb-8">
            {foundEvent.category && (
              <span className="bg-pink-500 text-black px-4 py-1 text-xs font-black uppercase rotate-[-3deg] shadow-[4px_4px_0px_0px_#000]">
                {foundEvent.category}
              </span>
            )}

            {foundEvent.day && (
              <span className="bg-yellow-400 text-black px-4 py-1 text-xs font-black uppercase rotate-2 shadow-[4px_4px_0px_0px_#000]">
                {foundEvent.day}
              </span>
            )}
          </div>

          {/* TITLE (Graffiti style impact) */}
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-6 text-white drop-shadow-[6px_6px_0px_black]">
            {foundEvent.title}
          </h1>

          {/* Subtitle */}
          {foundEvent.subtitle && (
            <p className="text-xl md:text-2xl font-bold italic text-yellow-300 mb-10 max-w-3xl">
              {foundEvent.subtitle}
            </p>
          )}

          {/* PRIZE SPLASH CARD */}
          {foundEvent.prize && (
            <div className="inline-block bg-lime-400 text-black px-8 py-5 border-[5px] border-black rotate-[-2deg] shadow-[10px_10px_0px_0px_#000]">
              <p className="text-sm font-black uppercase">Prize Pool</p>
              <p className="text-4xl md:text-5xl font-black italic">
                ₹{foundEvent.prize}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= ABOUT + INFO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Description */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black uppercase mb-6 text-red-400 drop-shadow-[3px_3px_0px_black]">
            About The Event
          </h2>

          {foundEvent.description && (
            <p className="text-lg font-semibold leading-relaxed text-gray-200">
              {foundEvent.description}
            </p>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white text-black border-[6px] border-black p-8 rotate-[1deg] shadow-[12px_12px_0px_0px_#000] space-y-6 h-fit">

          {foundEvent.registration && (
            <div>
              <p className="text-xs font-black uppercase">Entry Fee</p>
              <p className="text-xl font-bold">{foundEvent.registration}</p>
            </div>
          )}

          {foundEvent.prize && (
            <div>
              <p className="text-xs font-black uppercase">Prize Pool</p>
              <p className="text-xl font-bold">₹{foundEvent.prize}</p>
            </div>
          )}

          {foundEvent.duration && (
            <div>
              <p className="text-xs font-black uppercase">Duration</p>
              <p className="text-xl font-bold">{foundEvent.duration}</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= RULES ================= */}
      {foundEvent.rules && foundEvent.rules.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="bg-black border-[6px] border-white p-10 shadow-[12px_12px_0px_0px_#fff]">

            <h2 className="text-3xl font-black uppercase mb-8 text-yellow-400 drop-shadow-[3px_3px_0px_black]">
              Rules & Guidelines
            </h2>

            <ul className="list-decimal ml-6 space-y-4 text-gray-200 font-semibold text-lg">
              {foundEvent.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= DISCLAIMER ================= */}
      {foundEvent.disclaimer && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="text-sm text-gray-400 font-semibold border-t-2 border-gray-600 pt-8">
            <p className="uppercase font-black text-white mb-3">
              Disclaimer
            </p>
            <p>{foundEvent.disclaimer}</p>
          </div>
        </section>
      )}

      {/* ================= REGISTER BUTTON ================= */}

      {/* Mobile Sticky */}
      {foundEvent.link && (
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-black border-t-[5px] border-white p-4">
          <a
            href={foundEvent.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-red-600 border-[5px] border-black py-4 font-black uppercase text-white text-lg shadow-[8px_8px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
          >
            Register Now
          </a>
        </div>
      )}

      {/* Desktop Button */}
      {foundEvent.link && (
        <div className="hidden md:flex justify-center pb-24">
          <a
            href={foundEvent.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 border-[6px] border-black px-14 py-5 font-black uppercase text-white text-xl shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all"
          >
            Register Now
          </a>
        </div>
      )}

    </div>
  </div>
);
};

export default EventDetails;

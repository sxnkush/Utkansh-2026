import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import { useTransition } from "../../transition/transitioncontext";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  const [showRulebook, setShowRulebook] = useState(false);
  const { eventsData } = useContext(Context);
  const { startTransition } = useTransition();

  if (!eventsData) return <p>Loading...</p>;

  const foundEvent = eventsData.find((item) => item.id === eventId);

  if (!foundEvent) return <p>Event not found</p>;

  return (
    <div
      className="fixed inset-0 z-50 min-h-screen w-full bg-fixed bg-cover bg-center font-archivo overflow-x-hidden selection:bg-[#cef404] selection:text-black"
      style={{ backgroundImage: `url('/images/accomodation 2.webp')` }}
    >
      {/* Dark overlay for readability */}

      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] -z-10" />

      <div className="relative z-10 min-h-screen overflow-y-auto text-white">
        <button
          onClick={() => startTransition("/events")}
          className="absolute left-6 md:left-16 top-6 md:top-10 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 z-50"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
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
              {foundEvent.rulebook && (
                <button
                  onClick={() => setShowRulebook(true)}
                  className="absolute top-4 right-4 z-50 flex items-center justify-center 
                  bg-yellow-300 text-black font-extrabold text-sm uppercase tracking-wider
                  px-6 py-3 rounded-lg 
                  border-2 border-black 
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                  hover:scale-110 hover:rotate-1 hover:-translate-y-1
                  hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  transition-all duration-300"
                >
                  Rulebook
                </button>
              )}
            </div>

            {/* TITLE (Graffiti style impact) */}
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight mb-6 text-white drop-shadow-[6px_6px_0px_black]">
              {foundEvent.title}
            </h1>

            {/* subCategory */}
            {foundEvent.subCategory && (
              <p className="text-xl md:text-2xl font-bold italic text-yellow-300 mb-10 max-w-3xl">
                {foundEvent.subCategory}
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
              <p
                className="text-lg font-semibold leading-relaxed text-gray-200"
                dangerouslySetInnerHTML={{ __html: foundEvent.description }}
              />
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
              <p className="uppercase font-black text-white mb-3">Disclaimer</p>
              <p>{foundEvent.disclaimer}</p>
            </div>
          </section>
        )}

        {/* ================= REGISTER BUTTON ================= */}

        {/* Mobile Sticky */}
        {foundEvent.link && (
          <div className="fixed bottom-0 left-0 w-full md:hidden bg-black border-t-[5px] border-white p-4">
            {foundEvent.title === "DriftX" ? (
              <a
                href="https://pages.razorpay.com/driftx-ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-red-600 border-[5px] border-black py-4 font-black uppercase text-white text-lg shadow-[8px_8px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
              >
                Register Now
              </a>
            ) : foundEvent.title === "STEM MUN" ? (
              <h4>Registrations Closed for this event</h4>
            ) : (
              <Link
                to="/paused"
                className="block w-full text-center bg-red-600 border-[5px] border-black py-4 font-black uppercase text-white text-lg shadow-[8px_8px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
              >
                Register Now
              </Link>
            )}
          </div>
        )}

        {/* Desktop Button */}
        {foundEvent.link && (
          <div className="hidden md:flex justify-center pb-24">
            {foundEvent.title === "DriftX" ? (
              <a
                href="https://pages.razorpay.com/driftx-ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 border-[6px] border-black px-14 py-5 font-black uppercase text-white text-xl shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all"
              >
                Register Now
              </a>
            ) : foundEvent.title === "STEM MUN" ? (
              <h4>Registrations Closed for this event</h4>
            ) : (
              <Link
                to="/paused"
                className="block w-full text-center bg-red-600 border-[5px] border-black py-4 font-black uppercase text-white text-lg shadow-[8px_8px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
              >
                Register Now
              </Link>
            )}
          </div>
        )}
      </div>
      {showRulebook && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
          <div className="w-full max-w-5xl h-[85vh] bg-white relative border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowRulebook(false)}
              className="absolute top-3 right-3 bg-black text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-red-500 transition-all z-10"
            >
              CLOSE
            </button>

            {/* PDF VIEWER */}
            <iframe
              src={foundEvent.rulebook?.replace("/view", "/preview")}
              className="w-full h-full"
              title="Rulebook"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;

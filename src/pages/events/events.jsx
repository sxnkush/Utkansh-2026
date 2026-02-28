export default function Events() {
  const slices = [
    {
      title: "Dance",
      img: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop",
      rotate: "-60deg",
      gradient: "linear-gradient(to bottom, rgba(41,210,138,0.18), #02060a)",
      text: "text-[#29d28a]",
      border: "border-[rgba(41,210,138,0.7)]",
      z: "z-[1]",
    },
    {
      title: "Music",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
      rotate: "-30deg",
      gradient: "linear-gradient(to bottom, rgba(138,63,245,0.18), #02040a)",
      text: "text-[#f6e9ff]",
      border: "border-[rgba(138,63,245,0.7)]",
      z: "z-[2]",
    },
    {
      title: "Photography",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
      rotate: "0deg",
      gradient: "linear-gradient(to bottom, rgba(0,225,255,0.2), #02040a)",
      text: "text-[#00e1ff]",
      border: "border-[rgba(0,225,255,0.9)]",
      z: "z-[3]",
    },
    {
      title: "Technical",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      rotate: "30deg",
      gradient: "linear-gradient(to bottom, rgba(255,154,60,0.18), #020209)",
      text: "text-[#ff9a3c]",
      border: "border-[rgba(255,154,60,0.8)]",
      z: "z-[2]",
    },
    {
      title: "Street Art",
      img: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=600&auto=format&fit=crop",
      rotate: "60deg",
      gradient: "linear-gradient(to bottom, rgba(255,92,92,0.18), #020208)",
      text: "text-[#ff5c5c]",
      border: "border-[rgba(255,92,92,0.8)]",
      z: "z-[1]",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-['Permanent_Marker']"
      style={{ backgroundImage: "url('images/events_bg2.jpg')" }}
    >
      <div
        className="relative w-screen min-h-screen overflow-hidden flex items-end justify-center"
      >
        {/* Heading */}
        <h1 className="absolute bottom-8 text-white text-5xl md:text-7xl font-bold tracking-widest z-50">
          EVENTS
        </h1>

        <div className="relative w-full max-w-[1200px] h-screen flex justify-center items-end">
          {/* DESKTOP FAN LAYOUT */}
          <div className="hidden md:block relative w-full h-full">
            {slices.map((slice, index) => (
              <div
                key={index}
                className={`absolute bottom-[-200px] left-1/2 w-[420px] h-[120vh]
              flex items-start justify-center pt-[200px]
              border-l border-white/5 border-r border-white/5
              ${slice.z} group`}
                style={{
                  transform: `translateX(-50%) rotate(${slice.rotate})`,
                  transformOrigin: "50% 100%",
                  clipPath: "polygon(0 0, 100% 0, 60% 100%, 40% 100%)",
                  background: slice.gradient,
                }}
              >
                <div className="relative w-full h-full transition-transform duration-300 group-hover:-translate-y-4">
                  <img
                    src={slice.img}
                    alt={slice.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-65 transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/90" />

                  <div
                    className={`relative z-10 px-8 py-2 rounded-full bg-[#030910] border text-sm
                  uppercase font-medium tracking-wider
                  ${slice.text} ${slice.border}`}
                  >
                    {slice.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE STACKED TILTED CARDS */}
          <div className="md:hidden flex flex-col items-start gap-8 px-6 py-20 w-full">
            {slices.map((slice, index) => (
              <div
                key={index}
                className="w-full h-52 rounded-2xl overflow-hidden relative shadow-xl"
                style={{
                  transform: "rotate(60deg)",
                }}
              >
                <img
                  src={slice.img}
                  alt={slice.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div
                  className={`absolute bottom-4 left-4 px-4 py-1 rounded-full border text-xs uppercase
                ${slice.text} ${slice.border}`}
                  style={{ transform: "rotate(-60deg)" }}
                >
                  {slice.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

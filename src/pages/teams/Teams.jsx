import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTransition } from "../../transition/transitioncontext";

/* ================= DATA ================= */

const developers = [
  { id: "dev-1", name: "Jayant Joshi", role: "Full Stack Developer" },
  {
    id: "dev-2",
    name: "Kushagra Saxena",
    role: "Frontend Developer",
    image: "/images/PP.png",
  },
  { id: "dev-3", name: "Aman Verma", role: "Frontend Developer" },
  { id: "dev-3", name: "Aman Verma", role: "Frontend Developer" },
];

const team = [
  { id: "team-1", name: "Neha Sharma", role: "Backend Developer" },
  { id: "team-2", name: "Rohit Kumar", role: "Designer" },
];

const faculty = [
  { id: "fac-1", name: "Dr. Ramesh Kumar", department: "Computer Science" },
  { id: "fac-2", name: "Prof. Anjali Mehta", department: "Data Science" },
];

/* ================= HANGING CARD ================= */

const HangingCard = ({
  image,
  title,
  description,
  icon1,
  icon2,
  delay = 0,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = -((y - midY) / midY) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex justify-center pt-6 perspective-[1000px] ">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.25, delay }}
        className="absolute -top-[50px] flex gap-[10px]"
      >
        <div className="h-24 w-[3px] bg-red-800 rotate-[-10deg]" />
        <div className="h-24 w-[3px] bg-red-900" />
        <div className="h-24 w-[3px] bg-red-800 rotate-[10deg]" />
      </motion.div>

      <motion.div
        initial={{ y: -420 }}
        animate={{ y: 0, rotate: [0, 10, -6, 3, -1, 0] }}
        transition={{
          y: { type: "spring", stiffness: 180, damping: 20, delay },
          rotate: { duration: 2, ease: "easeOut", delay },
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 26px 42px rgba(0,0,0,0.4)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          transition: "transform 0.12s ease-out",
        }}
        className="mt-5 w-72 bg-white rounded-sm shadow-xl border border-black/20 relative"
      >
        {/* PIN */}
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20" />
        {/* CARD BACKGROUND TEXTURE */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.5]"
          style={{
            backgroundImage: "url('/images/card_bg.jpg')",
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
            mixBlendMode: "multiply",
          }}
        />

        {/* POLAROID FRAME */}
        <div className="p-4 pb-8">
          {/* PHOTO */}
          <div className="bg-black">
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover transition-transform duration-300"
              style={{
                transform:
                  rotate.x !== 0 || rotate.y !== 0
                    ? "translateZ(40px) scale(1.08)"
                    : "translateZ(0) scale(1)",
                transformStyle: "preserve-3d",
              }}
            />
          </div>

          {/* CAPTION */}
          <div className="mt-4 text-center">
            <h3
              className="text-lg font-semibold text-[#2a1a10]"
            >
              {title}
            </h3>
            <p className="text-sm text-[#4a382a] mt-1">{description}</p>

            <div className="mt-4 flex justify-center gap-5 text-lg">
              <span className="cursor-pointer hover:text-[#a33b2b] transition">
                {icon1}
              </span>
              <span className="cursor-pointer hover:text-[#a33b2b] transition">
                {icon2}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= PAGE ================= */

export default function DevelopersPage() {
  const [selectedCategory, setSelectedCategory] = useState("team");
  const { startTransition } = useTransition();

  const data =
    selectedCategory === "developers"
      ? developers
      : selectedCategory === "team"
        ? team
        : faculty;

  return (
    <div className="relative z-50 min-h-screen bg-cover bg-center p-8 font-['Permanent_Marker']"
      style={{ backgroundImage: "url('images/team_bg.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 container mx-auto my-24">
        <header className="relative h-32 md:h-40 flex items-center justify-center">
          <button
            onClick={() => startTransition("/")}
            className="absolute left-16 top-1/2 -translate-y-1/2 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          <h1
            className="text-white select-none"
            style={{
              fontSize: "4vw",
              textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            Meet Our Team
          </h1>
        </header>

        <div className="flex justify-center gap-6 mb-20">
          {["developers", "team", "faculty"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`px-6 py-3 rounded-lg transition ${selectedCategory === type
                ? "bg-[#f5e6c8] text-black shadow-xl font-semibold"
                : "bg-white/10 text-[#f5e6c8] border border-white/20 hover:bg-white/20"
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-32">
          {Array.from({ length: Math.ceil(data.length / 3) }).map((_, row) => (
            <div key={row}>
              <div className="relative w-full flex justify-center mb-12 z-50">
                <div className="w-[90%] h-5 rounded-full bg-gradient-to-b from-[#7a4a1d] to-[#3e210e] shadow-[0_6px_18px_rgba(0,0,0,0.7)] border border-black/40" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 max-w-6xl mx-auto">
                {data.slice(row * 3, row * 3 + 3).map((item) => (
                  <HangingCard
                    key={`${selectedCategory}-${item.id}`}
                    image={item.image || "/avatar.jpeg"}
                    title={item.name}
                    description={item.role || item.department}
                    icon1={
                      selectedCategory === "faculty" ? (
                        <FaEnvelope />
                      ) : (
                        <FaGithub />
                      )
                    }
                    icon2={
                      selectedCategory === "faculty" ? (
                        <FaUser />
                      ) : (
                        <FaLinkedin />
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

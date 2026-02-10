import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

/* ================= DATA ================= */

const developers = [
  { id: "dev-1", name: "Jayant Joshi", role: "Full Stack Developer" },
  { id: "dev-2", name: "Aman Verma", role: "Frontend Developer" },
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

const HangingCard = ({ image, title, description, icon1, icon2, delay = 0 }) => {
  return (
    <div className="relative flex justify-center pt-6">
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
        animate={{ y: 0, rotate: [0, 12, -8, 4, -2, 0] }}
        transition={{
          y: { type: "spring", stiffness: 180, damping: 20, delay },
          rotate: { duration: 2.1, ease: "easeOut", delay },
        }}
        whileHover={{
          y: -3,
          boxShadow: "0 22px 36px rgba(0,0,0,0.35)",
        }}
        style={{ transformOrigin: "top center" }}
        className="mt-5 w-80 bg-[#efe0c2] rounded-md shadow-xl border border-black/20 relative"
      >
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20" />
        <div className="p-6 text-center">
          <img
            src={image}
            alt={title}
            className="mx-auto w-20 h-20 rounded-full object-cover border-2 border-black/30 mb-3"
          />

          <h3 className="text-lg font-bold font-serif text-[#2a1a10]">
            {title}
          </h3>

          <p className="text-sm text-[#4a382a] mt-1">{description}</p>

          <div className="mt-4 flex justify-center gap-4 text-lg">
            <span className="cursor-pointer hover:text-[#a33b2b] transition">
              {icon1}
            </span>
            <span className="cursor-pointer hover:text-[#a33b2b] transition">
              {icon2}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= PAGE ================= */

export default function DevelopersPage() {
  const [selectedCategory, setSelectedCategory] = useState("team");

  const data =
    selectedCategory === "developers"
      ? developers
      : selectedCategory === "team"
      ? team
      : faculty;

  return (
    <div className="min-h-screen bg-[url('images/wooden_bg.jpg')] bg-cover bg-center relative p-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      <div className="relative z-10 container mx-auto my-24">
        <h1
          className="text-center select-none text-[#f5e6c8] mb-12"
          style={{
            fontFamily: "Selima",
            fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          MEET OUR TEAM
        </h1>

        {/* FILTERS */}
        <div className="flex justify-center gap-6 mb-20 backdrop-blur-sm">
          {["developers", "team", "faculty"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedCategory === type
                  ? "bg-[#f5e6c8] text-black shadow-xl"
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
              {/* WOODEN STICK FOR EACH ROW */}
              <div className="relative w-full flex justify-center mb-12 z-50">
                <div className="w-[90%] h-5 rounded-full bg-gradient-to-b from-[#7a4a1d] to-[#3e210e] shadow-[0_6px_18px_rgba(0,0,0,0.7)] border border-black/40" />
              </div>

              {/* CARDS ROW */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 max-w-6xl mx-auto">
                {data.slice(row * 3, row * 3 + 3).map((item) => (
                  <HangingCard
                    key={`${selectedCategory}-${item.id}`}
                    image="/avatar.jpeg"
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

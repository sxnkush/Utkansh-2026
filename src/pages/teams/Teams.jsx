import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTransition } from "../../transition/transitioncontext";

/* ================= DATA ================= */

const developers = [
  {
    id: "dev-1",
    name: "Vaibhav Verma",
    role: "Web Dev Lead",
    linkedin: "https://www.linkedin.com/in/vaibhav-verma-907054288/",
    github: "https://www.github.com/vaibhav0047",
    image: "https://avatars.githubusercontent.com/u/148982988?v=4",
  },
  {
    id: "dev-2",
    name: "Kushagra Saxena",
    role: "Full Stack Developer",
    image: "https://avatars.githubusercontent.com/u/154624873?v=4",
    linkedin: "https://www.linkedin.com/in/kushagrasaxena198/",
    github: "https://github.com/sxnkush",
  },
  {
    id: "dev-3",
    name: "Sritiz Sahu",
    role: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/sritiz-sahu-9ab4802b5/",
    github: "https://github.com/sritixz",
    image: "https://avatars.githubusercontent.com/u/185574499?v=4",
  },
];

const team = ["COMING SOON..."];

const faculty = [
  {
    id: "fac-1",
    name: "Dr. Indu Saini",
    position: "ADSW-I",
    rank: "Convener",
    image: "https://nitj.ac.in/files/1757757569769-Indu-Photo%20(1).jpg",
    profile: "https://departments.nitj.ac.in/dept/ece/Faculty/6430445538bff038a7805caf",
  },
  {
    id: "fac-2",
    name: "Dr. Anee Mohanty",
    position: "ADSW-II",
    rank: "Convener",
    image: "https://www.nitj.ac.in/images/faculty/22092713867.jpg",
    profile: "https://departments.nitj.ac.in/dept/bt/Faculty/6430446038bff038a7807202",
  },
  {
    id: "fac-3",
    name: "Dr. Nitai Basak",
    position: "ADRC-I",
    rank: "Convener",
    profile: "https://departments.nitj.ac.in/dept/bt/Faculty/6430445038bff038a78046a4",
    image: "https://www.nitj.ac.in/images/faculty/16061460015.JPG",
  },
  {
    id: "fac-4",
    name: "Dr. Anurag Tiwari",
    position: "ADRC-II",
    rank: "Convener",
    profile: "https://departments.nitj.ac.in/dept/ch/Faculty/6430446838bff038a7807d7f",
    image: "https://nitj.ac.in/files/1724257451890-Picture1.jpg",
  },
  {
    id: "fac-5",
    name: "Dr. Afzal Sikander",
    position: "",
    rank: "Coordinator",
    profile: "https://departments.nitj.ac.in/dept/ice/Faculty/6430446838bff038a7807deb",
    image: "https://nitj.ac.in/files/1768233764657-Afzal-pp25.png",
  },
  {
    id: "fac-6",
    name: "Dr. Ashish Raman",
    position: "",
    rank: "Coordinator",
    profile: "https://departments.nitj.ac.in/dept/ece/Faculty/6430445538bff038a7805aea",
    image: "https://www.nitj.ac.in/images/faculty/23022129330.JPG",
  },
  {
    id: "fac-7",
    name: "Dr. Sumit Sharma",
    position: "",
    rank: "Coordinator",
    profile: "https://departments.nitj.ac.in/dept/me/Faculty/6430446738bff038a7807cbb",
    image: "https://nitj.ac.in/files/1752666445121-_16A0510%20-%20Copy.JPG",
  },
  {
    id: "fac-8",
    name: "Dr. Narendra Kumar",
    position: "",
    rank: "Coordinator",
    profile: "https://departments.nitj.ac.in/dept/ipe/Faculty/6430446d38bff038a780895c",
    image: "https://v1.nitj.ac.in/nitj_files/links/Photo_69247.jpeg",
  },
  {
    id: "fac-9",
    name: "Dr. Arvind Kumar",
    position: "",
    rank: "Co-Coordinator",
    profile: "https://departments.nitj.ac.in/dept/ph/Faculty/6430445b38bff038a7806bc5",
    image: "https://www.nitj.ac.in/images/faculty/19080476425.jpg",
  },
  {
    id: "fac-10",
    name: "Dr. Jaspal Kaur",
    position: "",
    rank: "Co-Coordinator",
    profile: "https://departments.nitj.ac.in/dept/it/Faculty/65938d96633ad4665fa38509",
    image: "https://nitj.ac.in/files/1708510831263-unnamed.jpg",
  },
  {
    id: "fac-11",
    name: "Dr. Neelam Rani",
    position: "",
    rank: "Co-Coordinator",
    image:
      "https://nitj.ac.in/files/1752737883183-c9117487-5079-411b-be99-3f53cd94622a.jpg",
    profile: "https://departments.nitj.ac.in/dept/ce/Faculty/6430446d38bff038a7808929",
  },
  {
    id: "fac-12",
    name: "Dr. Priyanka Gupta",
    position: "",
    rank: "Co-Coordinator",
    profile: "https://departments.nitj.ac.in/dept/tt/Faculty/65602b97d02be846b64e7b6c",
    image: "https://nitj.ac.in/files/1709620892714-Priyanka.jpg",
  },
];

const facultySenior = [
  {
    id: "facs-1",
    name: "Prof. B K Kanaujia",
    position: "Director, NITJ",
    rank: "Patron",
    image: "https://nitj.ac.in/files/1715231314602-Director1.jpg",
    profile: "https://departments.nitj.ac.in/dept/ece/Faculty/6430446f38bff038a7808ab6"
  },
  {
    id: "facs-2",
    name: "Prof. Ajay Bansal",
    position: "Registrar, NITJ",
    rank: "Patron",
    profile: "https://departments.nitj.ac.in/dept/cee/Faculty/6430445038bff038a780495f",
    image: "https://nitj.ac.in/files/1717741345401-Passport%20Pic.jpg",
  },
  {
    id: "facs-3",
    name: "Prof. Anish Sachdeva",
    position: "DSW",
    rank: "Chairperson",
    profile: "https://departments.nitj.ac.in/dept/ipe/Faculty/6430445738bff038a780609d",
    image: "https://www.nitj.ac.in/images/faculty/18030537513.jpg",
  },
  {
    id: "facs-2",
    name: "Prof. Rohit Mehra",
    position: "DRC",
    rank: "Chairperson",
    profile: "https://departments.nitj.ac.in/dept/ph/Faculty/6430445b38bff038a7806a5a",
    image: "https://www.nitj.ac.in/images/faculty/20050251101.jpg",
  },
];
/* ================= HANGING CARD ================= */

const HangingCard = ({
  image,
  title,
  description,
  position,
  rank,
  icon1,
  icon2,
  github,
  profile,
  linkedin,
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
    <div className="relative flex justify-center pt-6 perspective-[1000px]">
      <div className="relative flex flex-col items-center">
        {/* WOODEN STICK */}
        <div
          className="sm:w-92 w-full h-10 z-20 rounded-full"
          style={{
            backgroundImage: "url('/images/woodenStick.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* STRINGS */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.25, delay }}
          className="absolute top-4 flex gap-[10px] -z-10"
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
          className="mt-[70px] w-72 bg-white rounded-sm shadow-xl border border-black/20 relative"
        >
          {/* PIN */}
          <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20" />
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
          <div className="p-4 pb-8 flex flex-col items-center justify-center">
            {/* PHOTO */}
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={image || "/avatar.jpeg"}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-300 ease-out"
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
              <h3 className="text-lg font-semibold text-[#2a1a10]">{title}</h3>
              <p className="text-sm text-[#4a382a] mt-1">{description}</p>
              {position && (
                <p className="text-sm text-[#4a382a] mt-1">{position}</p>
              )}
              {rank && <p className="text-sm text-[#4a382a] mt-1">{rank}</p>}
              <div className="mt-4 flex justify-center gap-5 text-lg">
                <span className="cursor-pointer hover:text-[#a33b2b] transition">
                  <a href={github || profile} target="_blank">
                    {icon1}
                  </a>
                </span>
                <span className="cursor-pointer hover:text-[#a33b2b] transition">
                  <a href={linkedin} target="_blank">
                    {icon2}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
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
    <div className="relative z-50 min-h-screen bg-cover bg-center p-8 font-['Permanent_Marker']">
      <div
        className="fixed top-0 left-0 w-full -z-10 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('images/team_bg.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 container mx-auto">
        <header className="relative h-32 md:h-40 flex items-center justify-center">
          <button
            onClick={() => startTransition("/")}
            className="absolute sm:left-16 left-0 top-0 sm:top-1/2 -translate-y-1/2 h-10 w-10 sm:h-16 sm:w-16 rounded-full flex items-center justify-center border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          <h1
            className="text-white select-none sm:text-6xl text-3xl"
            style={{
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
              className={`sm:px-6 sm:py-3 px-3 py-2 rounded-lg transition ${
                selectedCategory === type
                  ? "bg-[#f5e6c8] text-black shadow-xl font-semibold"
                  : "bg-white/10 text-[#f5e6c8] border border-white/20 hover:bg-white/20"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {data[0] === "COMING SOON..." ? (
          <p className="text-center text-5xl text-white">COMING SOON...</p>
        ) : (
          <div className="space-y-32">
            {selectedCategory === "faculty" &&
              Array.from({ length: Math.ceil(facultySenior.length / 2) }).map(
                (_, row) => (
                  <div key={`senior-${row}`}>
                    <div className="grid md:grid-cols-2 max-w-6xl mx-auto gap-y-20 items-center justify-center">
                      {facultySenior.slice(row * 2, row * 2 + 2).map((item) => (
                        <HangingCard
                          key={`senior-${item.id}`}
                          image={item.image || "/avatar.jpeg"}
                          title={item.name}
                          description={item.role}
                          position={item.position}
                          rank={item.rank}
                          icon1={<FaUser />}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            {Array.from({ length: Math.ceil(data.length / 3) }).map(
              (_, row) => (
                <div key={row}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 max-w-6xl mx-auto items-center justify-center">
                    {data.slice(row * 3, row * 3 + 3).map((item) => (
                      <HangingCard
                        key={`${selectedCategory}-${item.id}`}
                        image={item.image || "/avatar.jpeg"}
                        title={item.name}
                        description={item.role}
                        position={item.position}
                        rank={item.rank}
                        linkedin={item.linkedin}
                        github={item.github}
                        profile={item.profile}
                        icon1={
                          selectedCategory === "faculty" ? (
                            <FaUser />
                          ) : (
                            <FaGithub />
                          )
                        }
                        icon2={
                          selectedCategory !== "faculty" ? <FaLinkedin /> : ""
                        }
                      />
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

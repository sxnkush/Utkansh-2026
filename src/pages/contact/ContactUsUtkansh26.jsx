import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Phone, Mail, Users, Home, MapPin, ArrowLeft } from 'lucide-react';
import { useTransition } from '../../transition/transitioncontext';

/**
 * 3D Tilt Card Component - Balanced Width for Viewport Fit
 */
const TiltCard = ({ children, onClick, position, delay = 0, isFullImage = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className={`relative w-full flex justify-center ${position === 'center' ? 'z-20' : 'z-10'}`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileHover={{ y: -8 }}
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
          transformStyle: "preserve-3d"
        }}
        className={`
          relative cursor-pointer bg-white p-0.5 md:p-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-[4px] border-white
          w-full group max-w-[310px] overflow-hidden
          hover:shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_25px_rgba(139,92,246,0.5)] 
          hover:border-[#FFD700] transition-all duration-300
        `}
      >
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 80%)`
          }}
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <div
          className={`
            w-full h-full flex flex-col items-center justify-center relative
            ${isFullImage ? 'bg-transparent' : 'bg-[#1a0b45] p-3 md:p-5'} 
            min-h-[110px] md:min-h-[140px]
            group-hover:bg-[#25135a] transition-colors duration-500
          `}
          style={{ transform: "translateZ(40px)" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactUsUtkansh26 = () => {
  const navigate = useNavigate();
  const { startTransition } = useTransition();
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black font-sans flex flex-col items-center">
      {/* Background Graffiti */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/eventbg1.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/25" />
      </div>
      {/*  BACK BUTTON */}
      <button
        onClick={() => startTransition("/")}
        className="absolute left-6 md:left-16 top-6 md:top-10
        h-14 w-14 md:h-16 md:w-16
        rounded-full flex items-center justify-center
        border-2 border-white text-white
        bg-white/10 backdrop-blur-sm
        hover:bg-white/20 hover:scale-105
        transition-all duration-300
        z-50"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
      </button>

      {/* Main Content: Using py-4 and justify-center to fit fold */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center min-h-screen justify-center py-4">

        {/* Compact Heading Section */}
        <div className="flex flex-col items-center mb-4 md:mb-8">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-center tracking-wide italic uppercase leading-none"
            style={{
              fontFamily: "'Permanent Marker', cursive",
            }}
          >
            Contact Us
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isLoaded ? { width: '80%', opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="h-1.5 md:h-2 bg-white mt-1 shadow-[0_0_15px_rgba(255,255,255,0.9)] rounded-full"
          />
        </div>

        {/* 5-Card Grid: max-w-4xl is the 'sweet spot' for width vs height */}
        <div className="relative w-full max-w-4xl mb-2">
          {/* Connector Lines */}
          <svg className="absolute inset-0 w-full h-full hidden md:block z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.line
              initial={{ pathLength: 0 }} animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              x1="18" y1="18" x2="50" y2="50" stroke="white" strokeWidth="1.2"
            />
            <motion.line
              initial={{ pathLength: 0 }} animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              x1="82" y1="18" x2="50" y2="50" stroke="white" strokeWidth="1.2"
            />
            <motion.line
              initial={{ pathLength: 0 }} animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1 }}
              x1="18" y1="82" x2="50" y2="50" stroke="white" strokeWidth="1.2"
            />
            <motion.line
              initial={{ pathLength: 0 }} animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1 }}
              x1="82" y1="82" x2="50" y2="50" stroke="white" strokeWidth="1.2"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-x-12 md:gap-y-4 w-full relative z-10">

            {/* Locate Us */}
            <div className="md:col-start-1 flex justify-center">
              <TiltCard onClick={scrollToMap} position="top-left" delay={0.1}>
                <img
                  src="/images/nitjlogo.jpg"
                  alt="NITJ Logo"
                  className="w-full h-16 md:h-20 object-contain brightness-110 contrast-125 mb-1"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=NITJ"; }}
                />
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#C4B5FD] group-hover:text-[#FFD700]" />
                  <span className="text-white font-black text-[10px] md:text-xs tracking-widest uppercase">Locate Us</span>
                </div>
              </TiltCard>
            </div>

            <div className="hidden md:block"></div>

            {/* Contacts */}
            <div className="md:col-start-3 flex justify-center">
              <TiltCard onClick={() => window.location.href = 'tel:+918529083160'} position="top-right" delay={0.2}>
                <Phone className="w-5 h-5 text-[#C4B5FD] mb-2" />
                <span className="text-white font-black text-[12px] md:text-base tracking-tighter">+91-9041522905</span>
                <span className="text-white font-black text-[12px] md:text-base tracking-tighter">+91-7978147562</span>
              </TiltCard>
            </div>

            {/* Center: Core Team */}
            <div className="md:col-start-2 flex justify-center">
              <TiltCard onClick={() => navigate('/teams')} position="center" delay={0.3}>
                <Users className="w-8 h-8 text-[#C4B5FD] mb-2" />
                <h3 className="text-white font-black text-lg md:text-2xl text-center leading-none uppercase">
                  CORE TEAM
                </h3>
              </TiltCard>
            </div>

            {/* Email */}
            <div className="md:col-start-1 flex justify-center">
              <TiltCard onClick={() => window.location.href = 'mailto:nitj.utk.accounts@nitj.ac.in'} position="bottom-left" delay={0.4}>
                <Mail className="w-5 h-5 text-[#C4B5FD] mb-2" />
                <span className="text-white font-bold text-[9px] md:text-xs break-all text-center">nitj.utk.accounts@nitj.ac.in</span>
                <div className="w-full h-1 bg-[#FFD700] mt-2 shadow-[0_0_8px_#FFD700]"></div>
              </TiltCard>
            </div>

            <div className="hidden md:block"></div>

            {/* Gallery */}
            <div className="md:col-start-3 flex justify-center">
              <TiltCard onClick={() => navigate('/gallery')} position="bottom-right" delay={0.5} isFullImage={true}>
                <div className="relative w-full h-full flex items-center justify-center min-h-[110px] md:min-h-[140px]">
                  <img
                    src="/images/herobg.png"
                    alt="Gallery"
                    className="w-full h-full object-cover brightness-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=UTKANSH"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center justify-end pb-3">
                    <span className="text-white font-black text-xs uppercase tracking-widest">Gallery</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Minimized View Map Trigger */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/40 cursor-pointer flex flex-col items-center gap-1 mt-2"
          onClick={scrollToMap}
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.4em]">View Map</span>
          <div className="w-0.5 h-4 bg-gradient-to-b from-white/30 to-transparent"></div>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="w-full flex flex-col items-center py-12 bg-black/70 backdrop-blur-xl relative z-20 border-t border-white/10">
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl px-4"
        >
          <div className="relative group border-[6px] md:border-[10px] border-white shadow-2xl overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-black/60 group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none flex flex-col items-center justify-center">
              <h2 className="text-white text-xl md:text-4xl font-black text-center uppercase tracking-tighter border-y-2 border-white py-2 px-6">
                NIT JALANDHAR
              </h2>
              <p className="text-[#FFD700] font-black mt-3 text-xs md:text-lg uppercase tracking-[0.4em]">PIN - 144008</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.663184698305!2d75.53326897532395!3d31.39304995330364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a51d30c180edf%3A0x5b7633718d17ef33!2sDr.%20B.%20R.%20Ambedkar%20National%20Institute%20of%20Technology%20Jalandhar!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-[300px] md:h-[500px] filter grayscale brightness-50 transition-all duration-700 group-hover:filter-none group-hover:brightness-100"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>

      <div className="py-8 text-white font-black text-[9px] tracking-[0.6em] opacity-30 uppercase">
        Utkansh '26 • NIT Jalandhar
      </div>


    </div>
  );
};

export default ContactUsUtkansh26;
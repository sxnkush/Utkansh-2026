import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Phone, Mail, Users, Home,MapPin } from 'lucide-react';

/**
 * 3D Tilt Card Component
 */
const TiltCard = ({ children, onClick, position, delay = 0, isFullImage = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // The 3D rotation values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);
  
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className={`relative w-full flex justify-center ${position === 'center' ? 'z-20' : 'z-10'}`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        // Combined Hover Lift + 3D Rotation
        whileHover={{ y: -15 }} 
        style={{ 
          rotateX, 
          rotateY, 
          perspective: 1000,
          transformStyle: "preserve-3d" 
        }}
        className={`
          relative cursor-pointer bg-white p-0.5 md:p-1 shadow-[0_10px_40px_rgba(0,0,0,0.9)] border-[5px] border-white
          w-full group max-w-[280px] overflow-hidden
          hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.6)] 
          hover:border-[#FFD700] transition-all duration-300
        `}
      >
        {/* Dynamic Glare Effect */}
        <motion.div 
          style={{ 
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 80%)` 
          }}
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity" 
        />

        <div 
          className={`
            w-full h-full flex flex-col items-center justify-center relative
            ${isFullImage ? 'bg-transparent' : 'bg-[#1a0b45] p-3 md:p-6'} 
            min-h-[120px] md:min-h-[150px]
            group-hover:bg-[#25135a] transition-colors duration-500
          `}
          // This creates the internal 3D depth (content pops out)
          style={{ transform: "translateZ(50px)" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
const ContactUsUtkansh26 = () => {
  const navigate = useNavigate();
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
        style={{ backgroundImage: `url('/images/ContactusBG.png')` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-2 md:py-4 flex flex-col items-center min-h-screen justify-center">
        
        {/* Title: CONTACT US (Reduced Size) */}
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          className="text-4xl md:text-10xl lg:text-7xl font-black text-[#FFD700] mb-4 md:mb-8 text-center tracking-tighter italic uppercase leading-none"
        style={{
  textShadow: `
    0 0 20px rgba(255, 255, 255, 0.3), /* White glow */
    2px 2px 0px #FF0000, 
    4px 4px 0px #FF0000,
    6px 6px 0px #AA0000
  `,
  WebkitTextStroke: '1.2px #FF0000'
}}
        >
          CONTACT US
        </motion.h1>

        {/* 5-Card Grid with Connector Lines */}
        <div className="relative w-full max-w-4xl mb-6">
          {/* SVG White Thick Lines connecting corners to center */}
          <svg className="absolute inset-0 w-full h-full hidden md:block z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              x1="18" y1="18" x2="50" y2="50" stroke="white" strokeWidth="1.5"
            />
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              x1="82" y1="18" x2="50" y2="50" stroke="white" strokeWidth="1.5"
            />
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
              x1="18" y1="82" x2="50" y2="50" stroke="white" strokeWidth="1.5"
            />
            <motion.line 
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
              x1="82" y1="82" x2="50" y2="50" stroke="white" strokeWidth="1.5"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-12 md:gap-y-6 w-full relative z-10">
            
            <div className="md:col-start-1 flex justify-center">
              <TiltCard onClick={scrollToMap} position="top-left" delay={0.1}>
                <img 
                  src="/images/nitjlogo.jpg" 
                  alt="NITJ Logo" 
                  className="w-full h-20 md:h-24 object-contain brightness-110 contrast-125"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=NITJ"; }}
                />
                <MapPin size={14} className="text-[#C4B5FD] group-hover:text-[#FFD700] group-hover:animate-bounce" />
                <span className="text-white font-black text-[10px] md:text-xs tracking-widest uppercase mt-2">Locate Us</span>
              </TiltCard>
            </div>

            <div className="hidden md:block"></div>

            <div className="md:col-start-3 flex justify-center">
              <TiltCard onClick={() => window.location.href = 'tel:+91XXXXXXXXXX'} position="top-right" delay={0.2}>
                <Phone className="w-6 h-6 text-[#C4B5FD] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white font-black text-[11px] md:text-sm tracking-tighter">+91-8529083160</span>
                <span className="text-white font-black text-[11px] md:text-sm tracking-tighter">+91-7726973154</span>
                
              </TiltCard>
            </div>

            <div className="md:col-start-2 flex justify-center">
              <TiltCard onClick={() => navigate('/teams')} position="center" delay={0.3}>
                <Users className="w-8 h-8 text-[#C4B5FD] mb-2 group-hover:rotate-6 transition-transform" />
                <h3 className="text-white font-black text-base md:text-xl text-center leading-none uppercase">TEAM<br/>UTKANSH</h3>
                
              </TiltCard>
            </div>

            <div className="md:col-start-1 flex justify-center">
              <TiltCard onClick={() => window.location.href = 'mailto:nitj.utk.accounts@nitj.ac.in'} position="bottom-left" delay={0.4}>
                <Mail className="w-6 h-6 text-[#C4B5FD] mb-2 group-hover:translate-y-[-3px] transition-transform" />
                <span className="text-white font-bold text-[9px] md:text-xs break-all">nitj.utk.accounts@nitj.ac.in</span>
                <div className="w-full h-1 bg-[#FFD700] mt-2 shadow-[0_0_8px_#FFD700]"></div>
              </TiltCard>
            </div>

            <div className="hidden md:block"></div>

            <div className="md:col-start-3 flex justify-center">
              <TiltCard onClick={() => navigate('/')} position="bottom-right" delay={0.5} isFullImage={true}>
                <div className="relative w-full h-full flex items-center justify-center min-h-[120px] md:min-h-[140px]">
                  <img 
                    src="/images/herobg.png" 
                    alt="Utkansh Logo" 
                    className="w-full h-full object-cover brightness-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=UTKANSH"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end pb-2">
                     <div className="bg-white/95 backdrop-blur-md px-3 py-1 flex items-center gap-1 shadow-xl border border-black/5">
                        <Home size={10} className="text-[#1a0b45]" />
                       
                     </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/40 cursor-pointer flex flex-col items-center gap-1 mt-2"
          onClick={scrollToMap}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">View Map</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent"></div>
        </motion.div>
      </div>

      <div className="w-full flex flex-col items-center py-20 bg-black/60 backdrop-blur-md relative z-20 border-t border-white/5">
         <motion.div 
          ref={mapRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl px-4"
        >
          <div className="relative group border-[10px] border-white shadow-2xl overflow-hidden">
            {/* Overlay: Disappears on hover */}
            <div className="absolute inset-0 bg-black/60 group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none flex flex-col items-center justify-center">
              <div className="border-y-2 border-white py-4 px-12">
                <h2 className="text-white text-2xl md:text-5xl font-black text-center uppercase tracking-tighter">
                  NIT JALANDHAR
                </h2>
              </div>
              <p className="text-[#FFD700] font-black mt-4 text-sm md:text-xl bg-black/50 px-6 py-2 uppercase tracking-[0.4em]">PIN - 144008</p>
            </div>
            
            <iframe 
              src="https://www.google.com/maps?q=NIT%20Jalandhar&output=embed"
              className="w-full h-[400px] md:h-[600px] filter grayscale brightness-75 contrast-125 transition-all duration-700 group-hover:filter-none group-hover:grayscale-0 group-hover:brightness-100"
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="py-12 text-white font-black text-[10px] tracking-[0.5em] opacity-40 uppercase">
        Utkansh '26 • NIT Jalandhar
      </div>

      <style>{`
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 5px; }
  body { background-color: black; margin: 0; padding: 0; overflow-x: hidden; }

  @keyframes shinyMove {
    0% { background-position: -150% center; }
    100% { background-position: 150% center; }
  }

  .shiny-text {
    background: linear-gradient(
      110deg, 
      #FFD700 30%, 
      #FFFFFF 45%, 
      #FFFFFF 55%, 
      #FFD700 70%
    );
    background-size: 200% auto;
    color: #FFD700;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shinyMove 3s linear infinite;
  }
`}</style>
    </div>
  );
};

export default ContactUsUtkansh26;
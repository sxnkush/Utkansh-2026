import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const AboutUs = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [renderVideo, setRenderVideo] = useState(false);
    const [startImageReveal, setStartImageReveal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "80% start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 18,
        mass: 0.35,
    });

    /* 🟢 PAINT REVEAL */
    const revealProgress = useTransform(smoothProgress, [0, 0.45], [0, 1]);
    const scale = useTransform(smoothProgress, [0, 0.45], [0.6, 4.2]);
    const xTranslate = useTransform(smoothProgress, [0, 0.45], ["-15%", "10%"]);
    const yTranslate = useTransform(smoothProgress, [0, 0.45], ["35%", "-35%"]);

    const videos = [
        "https://www.youtube.com/watch?v=IYFe17EnAP8",
        "https://youtu.be/EV8FtjjpgLU?si=rzgP-obNgBDJoMH_",
    ];

    const getEmbedUrl = (url) => {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
            if (u.searchParams.get("v")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
            return "";
        } catch { return ""; }
    };

    const embedUrl = getEmbedUrl(videos[currentIndex]);
    const togglePlayPause = () => setIsPlaying((prev) => !prev);
    const playNext = () => { setCurrentIndex((prev) => (prev + 1) % videos.length); setIsPlaying(true); };
    const playPrev = () => { setCurrentIndex((prev) => prev === 0 ? videos.length - 1 : prev - 1); setIsPlaying(true); };

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }
    }, []);

    /* 🎥 VIDEO VISIBILITY */
    const transitionProgress = useTransform(smoothProgress, [0.48, 0.58], [0, 1]);
    const smoothTransition = useSpring(transitionProgress, { stiffness: 120, damping: 20, mass: 0.4 });

    const greenOpacity = useTransform(smoothProgress, [0.38, 0.45, 0.65], [0, 1, 1]);
    const greenScale = useTransform(smoothProgress, [0.38, 0.45, 0.65], [1, 1.12, 1.15]);
    const greenY = useTransform(smoothProgress, [0.42, 0.65], [0, -80]);
    const greenBrightness = useTransform(smoothProgress, [0.42, 0.65], ["brightness(1)", "brightness(0.82)"]);

    const videoOpacity = useTransform(smoothProgress, [0.52, 0.57, 0.62], [0, 0.6, 1]);
    const videoY_smooth = useTransform(smoothProgress, [0.52, 0.62], [140, 0]);
    const videoScale_smooth = useTransform(smoothProgress, [0.52, 0.58, 0.62], [0.85, 1.05, 1]);
    const videoBlur_smooth = useTransform(smoothProgress, [0.52, 0.58, 0.62], ["blur(20px)", "blur(6px)", "blur(0px)"]);

    useEffect(() => {
        const unsub = smoothProgress.on("change", (v) => {
            if (v >= 0.48 && !startImageReveal) setStartImageReveal(true);
            if (v < 0.45 && startImageReveal) setStartImageReveal(false);
            if (v >= 0.55) setRenderVideo(true);
            else if (v < 0.52) setRenderVideo(false);
        });
        return () => unsub();
    }, [smoothProgress, startImageReveal]);

    const aboutUsOpacity = useTransform(smoothProgress, [0.42, 0.48, 0.52], [0, 1, 1]);
    const aboutUsY = useTransform(smoothProgress, [0.42, 0.48], [60, 0]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-slate-900">
            <section className="sticky top-0 w-full h-screen overflow-hidden">
                <img src="/images/hero/herobg.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-85" />

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                        <filter id="paint-drizzle">
                            <feTurbulence type="turbulence" baseFrequency="0.015 0" numOctaves="1" seed="2" />
                            <feDisplacementMap in="SourceGraphic" scale="120" />
                        </filter>
                        <mask id="paint-mask">
                            <motion.circle cx="8%" cy="95%" r="35%" fill="white" filter="url(#paint-drizzle)" style={{ scale, x: xTranslate, y: yTranslate }} />
                        </mask>
                    </defs>
                    <motion.rect width="100%" height="100%" fill="#d1f903" mask="url(#paint-mask)" style={{ opacity: revealProgress }} />
                </svg>

                <motion.div className="absolute inset-0 bg-[#d1f903] z-20" style={{ opacity: greenOpacity, y: greenY, scale: greenScale, filter: greenBrightness }} />

                <motion.div className="absolute inset-0 z-25" style={{ opacity: aboutUsOpacity, y: aboutUsY }}>
                    <img src="/images/aboutus/aboutus.png" alt="Graffiti Background" className="w-full h-full object-cover" />
                </motion.div>

                <AnimatePresence>
                    (
                    <motion.div className="absolute inset-0 z-30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ perspective: "1200px" }}>

                        {/* 📺 YOUTUBE PLAYER SECTION */}
                        <motion.div className="absolute left-[7%] top-[54%] w-[43%] -translate-y-1/2 pointer-events-auto" initial={{ x: -100, rotateY: 35, rotateZ: 2, opacity: 0 }} animate={{ x: 0, rotateY: 18, rotateZ: 1, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                            <div className="relative w-full aspect-video rounded-[1.2vw] overflow-hidden bg-[#d1f903]" style={{ boxShadow: "15px 30px 60px rgba(0,0,0,0.5)", border: "3px solid rgba(209, 249, 3, 0.3)" }}>
                                <iframe key={currentIndex} className="w-full h-full" src={`${embedUrl}?autoplay=${isPlaying ? 1 : 0}&mute=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                            </div>

                            {/* 🎮 PLAYER CONTROLS (SKEWED AS PER IMAGE) */}
                            <div className="flex justify-center mt-[2.5vw] items-center gap-[0.5vw]">
                                <button onClick={playPrev} className="bg-[#1a1a1a] text-[#d1f903] p-[1.2vw] hover:bg-[#d1f903] hover:text-[#1a1a1a] transition-colors" style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}>
                                    <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" /></svg>
                                </button>
                                <button onClick={togglePlayPause} className="bg-[#d1f903] text-[#1a1a1a] px-[2.5vw] py-[1.2vw] hover:scale-105 transition-transform" style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}>
                                    {isPlaying ? <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
                                </button>
                                <button onClick={playNext} className="bg-[#1a1a1a] text-[#d1f903] p-[1.2vw] hover:bg-[#d1f903] hover:text-[#1a1a1a] transition-colors" style={{ clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)" }}>
                                    <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor" className="rotate-180"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" /></svg>
                                </button>
                            </div>
                        </motion.div>

                        {/* 📄 ABOUT US CARD SECTION */}
                        <motion.div className="absolute right-[7%] top-[54%] w-[43%] -translate-y-1/2" initial={{ x: 100, rotateY: -34, rotateZ: -2, opacity: 0 }} animate={{ x: 0, rotateY: -20, rotateZ: 1, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

                            {/* 🏷️ ABOUT US TAB (ANCHORED) */}
                            <div className="absolute -top-[12%] right-[15%] w-[45%] z-10" style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.2))" }}>
                                <div className="bg-[#d1f903] px-[2vw] py-[0.8vw] flex items-center justify-center border-l-[3px] border-white/20" style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}>
                                    <span className="text-[#1a1a1a] font-black text-[1.8vw] tracking-tighter uppercase italic">About Us</span>
                                </div>
                                <div className="absolute left-[-1.5vw] top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
                                    {[...Array(3)].map((_, i) => <div key={i} className="w-[3px] h-[1.2vw] bg-[#1a1a1a]" />)}
                                </div>
                            </div>

                            <div className="relative w-full aspect-video rounded-[1.3vw] overflow-hidden bg-[#d1f904]" style={{ boxShadow: "-15px 30px 60px rgba(0,0,0,0.5)", border: "3px solid rgba(209, 249, 3, 0.3)" }}>
                                <img src="/images/aboutus/abtus.png" alt="Card Texture" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center p-[12%]">
                                    <p className="text-[#1a1a1a] text-[1.4vw] leading-[1.6] font-serif text-center italic font-medium opacity-90">
                                        Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science, Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed entirely by students, it's a dazzling showcase of talent...
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                    )
                </AnimatePresence>

                {renderVideo && (
                    <motion.div className="absolute inset-0 z-40" style={{ opacity: videoOpacity, y: videoY_smooth, scale: videoScale_smooth, filter: videoBlur_smooth }}>
                        <video ref={videoRef} src="/videos/hero.mp4" loop playsInline muted autoPlay className="w-full h-full object-cover bg-black" />
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default AboutUs;
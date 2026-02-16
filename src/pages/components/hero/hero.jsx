import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const Hero = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
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
        "https://youtu.be/EV8FtjjpgLU?si=rzgP-obNgBDJoMH_", ,
    ];



    const getEmbedUrl = (url) => {
        try {
            const u = new URL(url);

            // youtu.be/VIDEO_ID
            if (u.hostname.includes("youtu.be")) {
                return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
            }

            // youtube.com/watch?v=VIDEO_ID
            if (u.searchParams.get("v")) {
                return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
            }

            return "";
        } catch {
            return "";
        }
    };


    const embedUrl = getEmbedUrl(videos[currentIndex]);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const playNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? videos.length - 1 : prev - 1
        );
        setIsPlaying(true);
    };


    // 🎥 CHANGE THIS TO ANY YOUTUBE LINK
    const youtubeUrl = "https://youtu.be/IYFe17EnAP8";

    useEffect(() => {
        if (window.YT) return;

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    }, []);


    /* 🎥 VIDEO VISIBILITY */
    const transitionProgress = useTransform(smoothProgress, [0.48, 0.58], [0, 1]);
    const smoothTransition = useSpring(transitionProgress, {
        stiffness: 120,
        damping: 20,
        mass: 0.4,
    });

    /*  GREEN BG STYLES */
    const greenOpacity = useTransform(smoothProgress, [0.42, 0.48, 0.6], [0, 1, 0]);
    const greenY = useTransform(smoothTransition, [0, 1], [0, -80]);
    const greenScale = useTransform(smoothProgress, [0.42, 0.48], [1, 1.12]);
    const greenBrightness = useTransform(smoothTransition, [0, 1], ["brightness(1)", "brightness(0.82)"]);

    /* 🎥 VIDEO MOTION STYLES */
    const videoY = useTransform(smoothTransition, [0, 1], [140, 0]);
    const videoScale = useTransform(smoothTransition, [0, 0.7, 1], [0.85, 1.08, 1]);
    const videoBlur = useTransform(smoothTransition, [0, 0.6, 1], ["blur(20px)", "blur(6px)", "blur(0px)"]);

    useEffect(() => {
        const unsub = smoothProgress.on("change", (v) => {
            if (v >= 0.48 && !startImageReveal) setStartImageReveal(true);
            if (v < 0.45 && startImageReveal) setStartImageReveal(false);

            if (v >= 0.55) setRenderVideo(true);
            else if (v < 0.52) setRenderVideo(false);
        });
        return () => unsub();
    }, [smoothProgress, startImageReveal]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-slate-900">
            <section className="sticky top-0 w-full h-screen overflow-hidden relative">
                {/* BASE BG */}
                <img
                    src="/images/herobg.png"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                />

                {/* 🎨 PAINT REVEAL SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                        <filter id="paint-drizzle">
                            <feTurbulence type="turbulence" baseFrequency="0.015 0" numOctaves="1" seed="2" />
                            <feDisplacementMap in="SourceGraphic" scale="120" />
                        </filter>
                        <mask id="paint-mask">
                            <motion.circle
                                cx="8%" cy="95%" r="35%" fill="white"
                                filter="url(#paint-drizzle)"
                                style={{ scale, x: xTranslate, y: yTranslate }}
                            />
                        </mask>
                    </defs>
                    <motion.rect width="100%" height="100%" fill="#d1f903" mask="url(#paint-mask)" style={{ opacity: revealProgress }} />
                </svg>

                {/* 🟢 SOLID GREEN LAYER */}
                <motion.div
                    className="absolute inset-0 bg-[#d1f903] z-20"
                    style={{ opacity: greenOpacity, y: greenY, scale: greenScale, filter: greenBrightness }}
                />

                {/* 🖼 SPRAY GRAFFITI REVEAL */}
                <AnimatePresence>
                    {startImageReveal && (
                        <motion.div
                            className="absolute inset-0 z-25"
                            initial={{ clipPath: "circle(0% at 0% 100%)", opacity: 0, filter: "blur(20px)" }}
                            animate={{ clipPath: "circle(150% at 0% 100%)", opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <img
                                src="/images/aboutus/aboutus.png"
                                alt="Graffiti Background"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 🟨 CONTENT LAYER (YouTube + About Us) */}
                <AnimatePresence>
                    {startImageReveal && (
                        <motion.div
                            className="absolute inset-0 z-30 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ perspective: "1200px" }}
                        >
                            {/* 📺 YOUTUBE PLAYER (LEFT SIDE) */}
                            <motion.div
                                className="absolute left-[7%] top-[58%] w-[43%] -translate-y-1/2 pointer-events-auto"
                                initial={{ x: -100, rotateY: 35, rotateZ: 2, opacity: 0 }}
                                animate={{ x: 0, rotateY: 18, rotateZ: 1, opacity: 1 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* THE IFRAME BOX */}
                                <div
                                    className="relative w-full aspect-video rounded-[1.2vw] overflow-hidden"
                                    style={{
                                        backgroundColor: "#d1f903", // ✅ changed from black
                                        boxShadow: "15px 30px 60px rgba(0,0,0,0.5)",
                                        border: "3px solid rgba(209, 249, 3, 0.25)",
                                    }}
                                >

                                    <iframe
                                        key={currentIndex}
                                        className="w-full h-full"
                                        src={`${embedUrl}?autoplay=${isPlaying ? 1 : 0}&mute=1`}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />


                                </div>

                                {/* PLAYER CONTROLS (MIRRORING DESIGN) */}
                                <div className="flex justify-center mt-[1.5vw]">
                                    <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[0.6vw] bg-[#0b0b0b] rounded-[0.4vw] border-x-[3px] border-[#d1f903] relative shadow-2xl">

                                        {/* Left Side Decorative Stripes */}
                                        <div className="absolute left-[-0.8vw] top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                            <div className="w-[0.4vw] h-[1.2vw] bg-[#d1f903] opacity-40"></div>
                                            <div className="w-[0.4vw] h-[0.8vw] bg-[#d1f903] opacity-20"></div>
                                        </div>

                                        {/* PREVIOUS */}
                                        <button
                                            onClick={playPrev}
                                            className="text-[#d1f903] hover:scale-110 transition-transform"
                                        >
                                            <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" />
                                            </svg>
                                        </button>

                                        {/* PLAY / PAUSE (MERGED) */}
                                        <button
                                            onClick={togglePlayPause}
                                            className="text-[#d1f903] hover:scale-110 transition-transform p-[0.4vw] bg-[#d1f903]/10 rounded-[0.2vw]"
                                        >
                                            {isPlaying ? (
                                                /* PAUSE */
                                                <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                                                </svg>
                                            ) : (
                                                /* PLAY */
                                                <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        {/* NEXT */}
                                        <button
                                            onClick={playNext}
                                            className="text-[#d1f903] hover:scale-110 transition-transform"
                                        >
                                            <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" transform="rotate(180 12 12)" />
                                            </svg>
                                        </button>

                                        {/* Right Side Decorative Stripes */}
                                        <div className="absolute right-[-0.8vw] top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                            <div className="w-[0.4vw] h-[1.2vw] bg-[#d1f903] opacity-40"></div>
                                            <div className="w-[0.4vw] h-[0.8vw] bg-[#d1f903] opacity-20"></div>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>

                            {/*  CARD (EXISTING) */}
                            <motion.div
                                className="absolute right-[7%] top-[54%] w-[43%] -translate-y-1/2"
                                initial={{ x: 100, rotateY: -34, rotateZ: -2, opacity: 0 }}
                                animate={{ x: 0, rotateY: -20, rotateZ: 1, opacity: 1 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >

                                <div
                                    className="relative w-full aspect-video rounded-[1.3vw] overflow-hidden"
                                    style={{
                                        boxShadow: "-15px 30px 60px rgba(0,0,0,0.5)",
                                        border: "3px solid rgba(209, 249, 3, 0.25)",
                                        backgroundColor: "#d1f903",
                                    }}
                                >
                                    <img
                                        src="/images/aboutus/abtus.png"
                                        alt="About Us Card"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* TEXT OVERLAY */}
                                    <div className="absolute inset-0 flex items-center justify-center p-[10%]">
                                        <p
                                            style={{
                                                color: "#1a1a1a",
                                                fontSize: "clamp(12px, 2.1vw, 32px)",
                                                width: "90%",
                                                lineHeight: "1.4",
                                                fontFamily: "'Playfair Display', serif",
                                                textAlign: "center",
                                                textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            Utkansh 2k26 | Revibing the youth
                                        </p>
                                    </div>
                                </div>
                            </motion.div>


                            {/* SVG LABEL */}
                            <motion.div
                                className="absolute right-[16%] top-[12%] w-[23%]"
                                initial={{ x: 100, rotateY: -35, rotateZ: -2, opacity: 0 }}
                                animate={{ x: 0, rotateY: -21, rotateZ: 1, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{ transformStyle: "preserve-3d", filter: "brightness(1.05)" }}
                            >
                                <img src="/svgs/aboutus/abtus.svg" alt="About Us Label" className="w-full h-auto" />
                                <svg viewBox="0 0 600 160" className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                    <text
                                        x="50%"
                                        y="55%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="#0b0b0b"
                                        fontSize="90"
                                        fontFamily="'Agbalumo', cursive"
                                        letterSpacing="4"
                                    >
                                        About Us
                                    </text>
                                </svg>
                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 🎥 FULLSCREEN VIDEO REVEAL (CONTINUES AFTER CONTENT) */}
                {renderVideo && (
                    <motion.div
                        className="absolute inset-0 z-40"
                        style={{ y: videoY, scale: videoScale, filter: videoBlur }}
                        onUpdate={() => { if (smoothTransition.get() > 0.95) videoRef.current?.play(); }}
                    >
                        <video
                            ref={videoRef}
                            src="/videos/hero.mp4"
                            loop playsInline
                            className="w-full h-full object-cover bg-black"
                        />
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Hero;
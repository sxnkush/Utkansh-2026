import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";

const Hero = ({ introDone }) => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const playerInstance = useRef(null);
    const [renderVideo, setRenderVideo] = useState(false);
    const [startImageReveal, setStartImageReveal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [introVideoEnded, setIntroVideoEnded] = useState(false);



    // --- RESPONSIVE HANDLER ---
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // --- NEW: Effect intensity to control visual entry ---
    const effectIntensity = useSpring(0, { stiffness: 60, damping: 40 });
    useEffect(() => {
        if (introDone && videoRef.current) {
            videoRef.current.play().then(() => {
                console.log("Hero video started");
            }).catch((err) => {
                console.log("Autoplay prevented:", err);
            });
        }
    }, [introDone]);
    useEffect(() => {
        if (introVideoEnded) {
            effectIntensity.set(1);
        }
    }, [introVideoEnded, effectIntensity]);

    // Tilt only background video
    const bgRotateX = useMotionValue(0);
    const bgRotateY = useMotionValue(0);

    const smoothBgRotateX = useSpring(bgRotateX, { stiffness: 60, damping: 20 });
    const smoothBgRotateY = useSpring(bgRotateY, { stiffness: 60, damping: 20 });

    // --- NEW: Apply intensity to rotation for smooth appearance ---
    const finalRotateX = useTransform([smoothBgRotateX, effectIntensity], ([rot, intensity]) => rot * intensity);
    const finalRotateY = useTransform([smoothBgRotateY, effectIntensity], ([rot, intensity]) => rot * intensity);

    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);

    const smoothGlowX = useSpring(glowX, {
        stiffness: 90,
        damping: 20,
        mass: 1.2
    });

    const smoothGlowY = useSpring(glowY, {
        stiffness: 80,
        damping: 20,
        mass: 1.2
    });

    // --- MODIFIED: Glow opacity linked to effectIntensity ---
    const glowBackground = useMotionTemplate`
    radial-gradient(
      700px circle at ${smoothGlowX}px ${smoothGlowY}px,
      rgba(63, 3, 185, ${effectIntensity}),
      transparent 70%
    )
    `;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "80% start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 18,
        mass: 0.35,
    });

    const revealProgress = useTransform(smoothProgress, [0, 0.38], [0, 1]);
    const scale = useTransform(smoothProgress, [0, 0.35], [0.6, 4.2]);
    const xTranslate = useTransform(smoothProgress, [0, 0.35], ["-15%", "10%"]);
    const yTranslate = useTransform(smoothProgress, [0, 0.35], ["35%", "-35%"]);

    const videos = [
        "https://youtu.be/IYFe17EnAP8?si=39Aj0aNseu9AhVDS",
    ];

    const getVideoId = (url) => {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
            if (u.searchParams.get("v")) return u.searchParams.get("v");
            return "";
        } catch { return ""; }
    };

    const currentVideoId = getVideoId(videos[currentIndex]);

    useEffect(() => {
        if (playerInstance.current && playerInstance.current.getPlayerState) {
            if (isPlaying) {
                playerInstance.current.playVideo();
            } else {
                playerInstance.current.pauseVideo();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!startImageReveal || !introVideoEnded) return;

        const loadPlayer = () => {
            if (!window.YT || !window.YT.Player) return;

            playerInstance.current = new window.YT.Player(`yt-player-${currentIndex}`, {
                videoId: currentVideoId,
                playerVars: {
                    autoplay: 0,
                    mute: 0,
                    controls: 0,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    showinfo: 0,
                    disablekb: 1
                },
                events: {
                    onReady: () => {
                        console.log("YT Ready");
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        }
                        if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        }
                        if (event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        }
                    }
                }
            });
        };

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = loadPlayer;
        } else {
            loadPlayer();
        }

        return () => {
            if (playerInstance.current) {
                playerInstance.current.destroy();
                playerInstance.current = null;
            }
        };

    }, [currentIndex, startImageReveal, introVideoEnded]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;

            const percentX = (e.clientX / innerWidth - 0.5);
            const percentY = (e.clientY / innerHeight - 0.5);

            bgRotateX.set(-percentY * 25);
            bgRotateY.set(percentX * 25);

            glowX.set(e.clientX);
            glowY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const togglePlayPause = () => setIsPlaying((prev) => !prev);
    const playNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsPlaying(true);
    };
    const playPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
        setIsPlaying(true);
    };

    const cardsProgress = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
    const cardsSpring = useSpring(cardsProgress, { stiffness: 120, damping: 30, mass: 0.8 });

    const leftX = useTransform(cardsSpring, [0, 1], [-120, 0]);
    const leftRotateY = useTransform(cardsSpring, [0, 1], [35, 18]);
    const leftRotateZ = useTransform(cardsSpring, [0, 1], [2, 1]);
    const leftOpacity = useTransform(cardsSpring, [0, 1], [0, 1]);

    const rightX = useTransform(cardsSpring, [0, 1], [120, 0]);
    const rightRotateY = useTransform(cardsSpring, [0, 1], [-34, -20]);
    const rightRotateZ = useTransform(cardsSpring, [0, 1], [-2, 1]);
    const rightOpacity = useTransform(cardsSpring, [0, 1], [0, 1]);

    const labelX = useTransform(cardsSpring, [0, 1], [100, 0]);
    const labelRotateY = useTransform(cardsSpring, [0, 1], [-35, -21]);
    const labelRotateZ = useTransform(cardsSpring, [0, 1], [-2, 1]);
    const labelOpacity = useTransform(cardsSpring, [0, 1], [0, 1]);

    const greenOpacity = useTransform(smoothProgress, [0.32, 0.38, 0.65], [0, 1, 1]);
    const greenScale = useTransform(smoothProgress, [0.32, 0.38, 0.65], [1, 1.08, 1.15]);
    const greenY = useTransform(smoothProgress, [0.35, 0.75], [0, -40]);
    const greenBrightness = useTransform(smoothProgress, [0.35, 0.65], ["brightness(1)", "brightness(0.82)"]);

    // --- NEW: Logo scroll transitions (Move to top right and shrink) ---
    const logoScale = useTransform(smoothProgress, [0, 0.3], [1, isMobile ? 0.35 : 0.22]);
    const logoXPos = useTransform(smoothProgress, [0, 0.3], ["0%", isMobile ? "34%" : "42%"]);
    const logoYPos = useTransform(smoothProgress, [0, 0.3], ["0%", isMobile ? "-43%" : "-42%"]);
    const logoOpacity = useTransform(smoothProgress, [0, 0.1], [1, 1]);
    useEffect(() => {
        if (!introVideoEnded) return;

        const updateStates = (v) => {
            if (v >= 0.44) setStartImageReveal(true);
            else if (v < 0.41) setStartImageReveal(false);

            if (v >= 0.62) setRenderVideo(true);
            else if (v < 0.60) setRenderVideo(false);
        };

        updateStates(smoothProgress.get());

        const unsub = smoothProgress.on("change", updateStates);
        return () => unsub();
    }, [smoothProgress, introVideoEnded]);

    const aboutUsOpacity = useTransform(smoothProgress, [0.38, 0.45, 0.52], [0, 1, 1]);
    const aboutUsY = useTransform(smoothProgress, [0.38, 0.45], [60, 0]);
    const contentParallaxY = useTransform(smoothProgress, [0.45, 0.75], [0, 80]);

    const videoOpacity = useTransform(smoothProgress, [0.70, 0.77], [0, 1]);
    const videoY_smooth = useTransform(smoothProgress, [0.70, 0.77], [140, 0]);
    const videoScale_smooth = useTransform(smoothProgress, [0.70, 0.77], [0.92, 1]);
    const videoBlur_smooth = useTransform(smoothProgress, [0.70, 0.77], ["blur(18px)", "blur(0px)"]);

    return (
        <div
            id="hero-container"
            ref={containerRef}
            className="relative h-[500vh] bg-slate-900"
        >
            <motion.div
                className="fixed inset-0 z-0 bg-black overflow-hidden"
                style={{ perspective: isMobile ? "1000px" : "1400px" }}
            >
                <div className="w-full h-full" style={{ perspective: "1900px" }}>
                    <motion.video
                        ref={videoRef}
                        src="/videos/herobg.mp4"
                        autoPlay muted playsInline
                        onLoadedMetadata={() => { if (videoRef.current) videoRef.current.playbackRate = 1.3; }}
                        onEnded={() => setIntroVideoEnded(true)}
                        className="w-full h-full object-cover object-center scale-[1.7] md:scale-[1.6]"
                        style={{
                            rotateX: finalRotateX,
                            rotateY: finalRotateY,
                            transformStyle: "preserve-3d",
                            marginTop: isMobile ? "0%" : "9%",
                            transformOrigin: isMobile ? "50% 50%" : "50% 80%",
                        }}
                    />
                </div>
                <motion.div className="pointer-events-none absolute inset-0" style={{ background: glowBackground, mixBlendMode: "screen" }} />
            </motion.div>

            <motion.section
                className="sticky top-0 w-full min-h-[100svh] md:h-screen overflow-hidden relative z-10"
                animate={{ opacity: introVideoEnded ? 1 : 0, pointerEvents: introVideoEnded ? "auto" : "none" }}
                transition={{ duration: 0.8 }}
            >

                {/* --- CENTER POP CONTAINER: Modified to stay on top and never disappear --- */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                        // Set z-index to 100 to stay above 'About Us' (z-25) and 'Cards' (z-50)
                        zIndex: 100,
                        perspective: "2200px",
                        x: logoXPos,
                        y: logoYPos,
                        scale: logoScale,
                        opacity: logoOpacity
                    }}
                >
                    <motion.div
                        style={{ transformStyle: "preserve-3d", position: "relative" }}
                        className="w-[80%] md:w-[45%] max-w-[900px]"
                    >
                        {/* Rotating Ring with shimmer */}
                        {/* <motion.div
                            initial={{ opacity: 0, scale: 0.6, rotate: -180, z: -200 }}
                            animate={introVideoEnded ? {
                                opacity: 1,
                                scale: 1.6,
                                rotate: 0,
                                z: 100
                            } : {}}
                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src="/images/hero/utkanshring.png"
                                alt="Ring"
                                className="w-full h-full object-contain"
                                style={{ filter: "drop-shadow(0 20px 50px rgba(255,255,255,0.5))" }}
                            />
                        </motion.div> */}

                        {/* Utkansh Logo */}
                        <motion.img
                            src="/images/hero/utkansh.png"
                            alt="Utkansh"
                            className="relative w-full object-contain"
                            initial={{ opacity: 0, scale: 0.5, z: -400, filter: "blur(20px)" }}
                            animate={introVideoEnded ? {
                                opacity: 1,
                                scale: 1.6,
                                marginLeft:0,
                                z: 250,
                                filter: "blur(0px)"
                            } : {}}
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                transformStyle: "preserve-3d",
                                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.8))"
                            }}
                        />
                    </motion.div>
                </motion.div>
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

                <motion.div className="absolute top-0 left-0 w-full h-[200%] bg-[#d1f903] z-20" style={{ opacity: greenOpacity, y: greenY, scale: greenScale, filter: greenBrightness }} />

                <AnimatePresence>
                    <motion.div className="absolute inset-0 z-25" style={{ opacity: aboutUsOpacity, y: aboutUsY }}>
                        <img src="/images/aboutus/aboutus.png" alt="Graffiti Background" className="w-full h-full object-cover" />
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {startImageReveal && (
                        <motion.div className="absolute inset-0 z-50 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ perspective: "1200px" }}>
                            <motion.div
                                className="absolute left-[7%] top-[58%] w-[43%] -translate-y-1/2 pointer-events-auto max-md:relative max-md:left-0 max-md:top-0 max-md:w-full  max-md:translate-y-0 max-md:px-4 max-md:mt-24"
                                style={{
                                    y: isMobile ? 0 : contentParallaxY,
                                    x: isMobile ? 0 : leftX,
                                    rotateY: isMobile ? 0 : leftRotateY,
                                    rotateZ: isMobile ? 0 : leftRotateZ,
                                    opacity: leftOpacity,
                                }}
                            >
                                <div className="relative w-full aspect-video rounded-[1.2vw] overflow-hidden bg-black" style={{ boxShadow: "15px 30px 60px rgba(0,0,0,0.5)", border: "3px solid rgba(209, 249, 3)" }}>
                                    <div id={`yt-player-${currentIndex}`} className="w-full h-full pointer-events-none" />
                                </div>

                                <div className="flex justify-center mt-[1.5vw]">
                                    <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[0.6vw] bg-[#0b0b0b] rounded-[0.4vw] border-x-[3px] border-[#d1f903] relative shadow-2xl">
                                        <div className="absolute left-[-0.8vw] top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                            <div className="w-[0.4vw] h-[1.2vw] bg-[#d1f903] opacity-40"></div>
                                            <div className="w-[0.4vw] h-[0.8vw] bg-[#d1f903] opacity-20"></div>
                                        </div>

                                        <button onClick={playPrev} className="text-[#d1f903] hover:scale-110 transition-transform">
                                            <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" /></svg>
                                        </button>

                                        <button onClick={togglePlayPause} className="text-[#d1f903] hover:scale-110 transition-transform p-[0.4vw] bg-[#d1f903]/10 rounded-[0.2vw]">
                                            {isPlaying ? (
                                                <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
                                            ) : (
                                                <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                            )}
                                        </button>

                                        <button onClick={playNext} className="text-[#d1f903] hover:scale-110 transition-transform">
                                            <svg width="1.4vw" height="1.4vw" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" transform="rotate(180 12 12)" /></svg>
                                        </button>

                                        <div className="absolute right-[-0.8vw] top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                            <div className="w-[0.4vw] h-[1.2vw] bg-[#d1f903] opacity-40"></div>
                                            <div className="w-[0.4vw] h-[0.8vw] bg-[#d1f903] opacity-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute right-[7%] top-[54%] w-[43%] -translate-y-1/2 max-md:relative max-md:right-0 max-md:top-0 max-md:w-full max-md:translate-y-0 max-md:px-4 max-md:mt-10"
                                style={{
                                    y: isMobile ? 0 : contentParallaxY,
                                    x: isMobile ? 0 : rightX,
                                    rotateY: isMobile ? 0 : rightRotateY,
                                    rotateZ: isMobile ? 0 : rightRotateZ,
                                    opacity: rightOpacity,
                                }}
                            >
                                <div className="relative w-full aspect-video rounded-[1.3vw] overflow-hidden" style={{ boxShadow: "-15px 30px 60px rgba(0,0,0,0.5)", border: "3px solid rgba(209, 249, 3, 0.25)", backgroundColor: "#d1f903" }}>
                                    <img src="/images/aboutus/abtus.png" alt="About Us Card" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center p-[10%]">
                                        <p
                                            className="text-[15px] md:text-[clamp(8px,1.5vw,25px)]"
                                            style={{
                                                color: "#1a1a1a",
                                                width: "90%",
                                                lineHeight: "1.4",
                                                fontFamily: "'Playfair Display', serif",
                                                textAlign: "center",
                                                textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            Utkansh-26 at NIT Jalandhar blends culture and technology in perfect harmony.
                                            Experience electrifying performances like Panache,BDM Night,
                                            and Star Night, alongside innovative events like Hackathons, RC Racing,
                                            NIT-yaan, Startup Mela, and Avishkar Exhibitions. Join us for an unforgettable celebration of talent, innovation, and creativity that promises to inspire and entertain.

                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="hidden md:block absolute right-[16%] top-[12%] w-[23%]" style={{ transformStyle: "preserve-3d", y: contentParallaxY, filter: "brightness(1.05)", x: labelX, rotateY: labelRotateY, rotateZ: labelRotateZ, opacity: labelOpacity }}>
                                <img src="/svgs/aboutus/abtus.svg" alt="About Us Label" className="w-full h-auto" />
                                <svg viewBox="0 0 600 160" className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                    <image href="/images/aboutus/aboutustext.png" x="44%" y="-10%" width="700" height="430" preserveAspectRatio="xMidYMid meet" style={{ transform: "translate(-50%, -50%)" }} />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {renderVideo && (
                    <motion.div
                        className="absolute inset-0 z-60 pointer-events-none"
                        style={{
                            opacity: videoOpacity,
                            y: videoY_smooth,
                            scale: videoScale_smooth,
                            filter: videoBlur_smooth
                        }}
                    >
                        <video
                            ref={videoRef}
                            src="https://res.cloudinary.com/dph7ygvuj/video/upload/v1772096483/utkanshbg_zctjyd.mp4" // <-- Replace this with your public URL
                            loop
                            playsInline
                            autoPlay
                            muted

                            className="w-full h-full object-cover bg-black"
                        />
                    </motion.div>
                )}
            </motion.section>
        </div>
    );
};

export default Hero;
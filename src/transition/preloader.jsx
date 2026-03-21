import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import DontSendText from "../../public/svgs/preloader/DontSendText";
import SVGBrandLogo from "../../public/svgs/preloader/SVGBrandLogo";
import { MouseContext } from "./MouseContext";

const IntroLoader = ({ onLoaded, audioControl }) => {
    const [loading, setLoading] = useState(0);
    const [isExploded, setIsExploded] = useState(false);
    const { cursorChangeHandler } = useContext(MouseContext);
    const commonRef = useRef({});
    const timerRef = useRef(null);
    const [skipLoader, setSkipLoader] = useState(false);


    useEffect(() => {
        const alreadyLoaded = sessionStorage.getItem("introPlayed");

        if (alreadyLoaded) {
            setSkipLoader(true);
            document.body.classList.add("page-loaded");
            onLoaded();
        }
    }, [onLoaded]);
    // Function to create the "Particle Burst" effect
    const createParticles = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const container = document.body;
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement("div");
            particle.className = "fixed z-[60] pointer-events-none bg-[#a9ff1c]";
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            container.appendChild(particle);

            gsap.to(particle, {
                x: (Math.random() - 0.5) * 500,
                y: (Math.random() - 0.5) * 500,
                opacity: 0,
                rotation: 450,
                duration: 1.2,
                ease: "power4.out",
                onComplete: () => particle.remove(),
            });
        }
    };

    const handleAction = (e) => {
        createParticles(e);
        setIsExploded(true);

        // wait for text to slide left
        setTimeout(() => {
            setLoading(1);
            initAnimation();
            startTimer();
        }, 1200);
    };

    const startTimer = () => {
        timerRef.current = window.setInterval(() => {
            setLoading((prev) => (prev >= 100 ? 100 : prev + 1));
        }, 18);
    };

    useEffect(() => {
        if (loading === 100) {
            setTimeout(() => {
                sessionStorage.setItem("introPlayed", "true"); // save session
                document.body.classList.add("page-loaded");
                onLoaded();
            }, 1200);
        }
    }, [loading, onLoaded]);

    const initAnimation = () => {
        const tl = gsap.timeline();
        tl.from(commonRef.current["welcomeMessage"].children, {
            duration: 0.8, opacity: 0, scale: 0, y: 80, rotationX: 180,
            transformOrigin: "0% 50% -50", ease: "back", stagger: 0.01,
        }).fromTo(commonRef.current["brandLogo"], { opacity: 0 }, { opacity: 1 }, "-=.5");
    };
    if (skipLoader) return null;
    return (
        <div
            className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black text-center
        transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]
        ${loading === 100 ? "-translate-y-[110%]" : "translate-y-0"}`}
        >

            {/* 2. BUTTON GLOW CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes glowing {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
        .p-btn-glow::before {
          content: "";
          background: linear-gradient(45deg, #a9ff1c, #fffb00, #48ff00, #a9ff1c, #a9ff1c);
          position: absolute; top: -2px; left: -2px; background-size: 400%; z-index: -1;
          width: calc(100% + 4px); height: calc(100% + 4px); animation: glowing 20s linear infinite;
          opacity: 0; transition: opacity 0.3s ease-in-out; filter: blur(5px);
        }
        .p-btn-glow:hover::before { opacity: 1; }
      `}} />

            {/* Default Screen */}
            <div className={`absolute inset-0 flex items-center justify-center ${loading !== 0 ? "pointer-events-none invisible" : "visible"}`}>
                <DontSendText
                    className={`absolute inset-0 m-auto -z-10 h-full tracking-[0.2em] hidden md:block
  transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]
  ${isExploded ? "-translate-x-[110%]" : "translate-x-0"}`}
                />
                {/* Mobile Background Image */}
                <div
                    className={`
    absolute inset-0 z-[-10] h-full w-full
    bg-no-repeat bg-center
    bg-[length:94%_auto] 
    transition-all duration-400 ease-[cubic-bezier(0.69,0.54,0.55,1.01)]
    md:hidden
    ${loading !== 0 ? "opacity-0" : "opacity-100"}
  `}
                />

                {!isExploded && (
                    <div
                        onClick={(e) => { handleAction(e); audioControl(); }}
                        onMouseEnter={() => cursorChangeHandler("hovered")}
                        onMouseLeave={() => cursorChangeHandler("")}
                        className={`
                            group relative cursor-pointer px-10 py-4 font-bold uppercase tracking-[3px] 
                            transition-all duration-300 
                            p-btn-glow 
                            bg-[#a9ff1c] text-black 
                            
                          `}
                    >
                        <span className="">Enter</span> Utkansh
                    </div>
                )}
            </div>

            {/* 2. LOADING SCREEN & MOVEMENT */}
            <div className={`absolute inset-0 items-center justify-center ${loading > 1 ? "flex" : "hidden"}`}>
                <div className="relative z-[3] flex h-full items-center justify-center mix-blend-exclusion flex-col md:flex-col">
                    <span
                        ref={(el) => (commonRef.current["welcomeMessage"] = el)}
                        className="inline-block flex flex-wrap justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider"
                    >
                        {"WELCOMING YOU TO ".split("").map((c, i) => (
                            <span key={i} className="min-w-[3px] sm:min-w-[4px]">{c}</span>
                        ))}
                    </span>

                    <SVGBrandLogo
                        ref={(el) => (commonRef.current["brandLogo"] = el)}
                        className="text-[#a9ff1c] mt-2 sm:mt-3 md:mt-4 w-[460px] sm:w-[460px] md:w-auto"
                    />
                </div>

                {/* The Green Progress Slide Movement */}
                <div
                    className={`absolute inset-0 bg-[#a9ff1c] transition-transform duration-[2000ms] ease-linear ${loading > 2 ? "translate-x-0" : "-translate-x-[102%]"
                        }`}
                />

                <span className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 z-[5] text-[3rem] sm:text-[4rem] md:text-[5rem] font-bold text-white mix-blend-exclusion">
                    {loading}%
                </span>
            </div>
        </div >
    );
};

export default IntroLoader;
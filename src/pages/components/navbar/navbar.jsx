import React, { useEffect, useState } from 'react';
import { useTransition } from '../../../transition/transitioncontext';

const Navbar = ({ onHamburgerClick, menuOpen }) => {
    const { startTransition } = useTransition();
    const [showNavbar, setShowNavbar] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNavbar(true);
        }, 2500); // 2.5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const scrollToAboutSection = () => {
        const container = document.getElementById("hero-container");
        if (!container) return;

        const totalScrollableHeight =
            container.offsetHeight - window.innerHeight;

        const aboutProgress = 0.52;

        const targetScroll =
            container.offsetTop +
            totalScrollableHeight * aboutProgress;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setAtTop(true);
            } else {
                setAtTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT US', action: 'scroll-about' },
        { name: 'EVENTS', path: '/events' },
        { name: 'CONTACT US', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 font-['Permanent_Marker']
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${showNavbar && atTop ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
        >

            <div className="w-full pt-10 pb-10 px-7">
                <div className="max-w-7xl mx-auto flex justify-center items-center relative">

                    {/* GLOBAL HAMBURGER */}
                    <button
                        className={`group fixed top-6 left-6 w-20 h-20 flex items-center justify-center z-[9999] outline-none
                        transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${showNavbar ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                        onClick={onHamburgerClick}
                    >
                        {/* Outer Rotating Crescent */}
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-l-white border-b-white 
                      transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                      group-hover:rotate-[360deg] group-hover:border-l-[#ccff00] group-hover:border-b-[#ccff00] group-hover:scale-110">
                        </div>

                        {/* Inner Rotating Crescent */}
                        <div className="absolute inset-3 rounded-full border-2 border-transparent border-r-white/40 border-t-white/40 
                      transition-all duration-500 ease-in-out
                      group-hover:rotate-[-360deg] group-hover:border-r-[#ccff00] group-hover:border-t-[#ccff00]">
                        </div>

                        {/* Hamburger Lines */}
                        <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-active:scale-75 z:99">
                            <span
                                className={`absolute h-[5px] w-8 rounded-sm transition-all duration-300
                                ${menuOpen ? "rotate-45 bg-[#ccff00] shadow-[0_0_15px_#ccff00]" : "-translate-y-2 bg-white -rotate-2 -skew-x-12"}`}
                            />
                            <span
                                className={`absolute h-[5px] w-7 rounded-sm transition-all duration-300
                                ${menuOpen ? "opacity-0" : "bg-white skew-x-12"}`}
                            />
                            <span
                                className={`absolute h-[5px] w-8 rounded-sm transition-all duration-300
                                ${menuOpen ? "-rotate-45 bg-[#ccff00] shadow-[0_0_15px_#ccff00]" : "translate-y-2 bg-white rotate-1 -skew-x-6"}`}
                            />
                        </div>
                    </button>

                    {/* --- MOBILE NAVIGATION: ONLY EVENTS --- */}
                    <ul
                        className={`flex md:hidden items-center justify-center transition-all duration-500 ease-in-out
  ${menuOpen
                                ? "opacity-0 translate-y-[-10px] pointer-events-none"
                                : "opacity-100 translate-y-0 pointer-events-auto"
                            }`}
                    >
                        <li className="relative group">
                            <button
                                onClick={() => startTransition("/events")}
                                className="relative inline-block text-[#d4ff00] text-3xl tracking-wider italic transition-all duration-300 ease-out 
      -skew-x-12 hover:skew-x-0 hover:-translate-y-2 hover:scale-110 
      hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.9)] 
      active:scale-90 active:translate-y-1 
      bg-transparent border-none"
                            >
                                EVENTS
                                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#d4ff00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d4ff00]" />
                            </button>
                        </li>
                    </ul>
                    {/* Desktop Navigation */}
                    <ul
                        className={`hidden md:flex items-center gap-8 lg:gap-12 transition-all duration-500 ease-in-out
  ${menuOpen
                                ? "opacity-0 translate-y-[-10px] pointer-events-none"
                                : "opacity-100 translate-y-0 pointer-events-auto"
                            }`}
                    >
                        {navLinks.map((link, index) => (
                            <React.Fragment key={link.name}>
                                <li className="relative group">
                                    {link.name === "ABOUT US" ? (
                                        <span
                                            onClick={scrollToAboutSection}
                                            className="cursor-pointer relative inline-block text-[#d4ff00] text-2xl lg:text-3xl tracking-wider italic transition-all duration-300 ease-out -skew-x-12 hover:skew-x-0 hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.9)] active:scale-90 active:translate-y-1"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#d4ff00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d4ff00]" />
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => startTransition(link.path)}
                                            className="relative inline-block text-[#d4ff00] text-2xl lg:text-3xl tracking-wider italic transition-all duration-300 ease-out -skew-x-12 hover:skew-x-0 hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.9)] active:scale-90 active:translate-y-1 bg-transparent border-none"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#d4ff00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d4ff00]" />
                                        </button>
                                    )}
                                </li>

                                {index !== navLinks.length - 1 && (
                                    <div className="h-8 w-[2px] bg-[#d4ff00] opacity-70 rotate-[15deg] mx-2 shadow-[0_0_5px_#d4ff00]" />
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Fullscreen Menu - Now synced with menuOpen prop */}
            <div
                className={`fixed inset-0 bg-background flex flex-col items-center justify-center gap-12 transition-all duration-500 z-40
                ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                {/* Full menu content goes here */}
            </div>
        </nav>
    );
};

export default Navbar;
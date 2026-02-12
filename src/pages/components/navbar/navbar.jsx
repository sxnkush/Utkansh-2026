import React, { useState } from 'react';

const Navbar = ({ onHamburgerClick, menuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);


    const navLinks = [
        { name: 'HOME', href: '#' },
        { name: 'ABOUT US', href: '#' },
        { name: 'EVENTS', href: '#' },
        { name: 'CONTACT US', href: '#' },
    ];

    return (
        <nav className="absolute top-0 left-0 w-full z-50 font-['Permanent_Marker']">

            {/* BLACK BACKGROUND */}
            <div className="w-full  pt-10 pb-10 px-7">

                <div className="max-w-7xl mx-auto flex justify-center items-center relative">

                    {/* GLOBAL HAMBURGER*/}
                    <button
                        className="group fixed top-6 left-6 w-20 h-20 flex items-center justify-center z-[9999] outline-none"
                        onClick={onHamburgerClick}
                    >
                        {/* Outer Rotating Crescent (Thick Brush Stroke) */}
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-l-white border-b-white 
                      transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                      group-hover:rotate-[360deg] group-hover:border-l-[#ccff00] group-hover:border-b-[#ccff00] group-hover:scale-110">
                        </div>

                        {/* Inner Rotating Crescent (Opposite Direction) */}
                        <div className="absolute inset-3 rounded-full border-2 border-transparent border-r-white/40 border-t-white/40 
                      transition-all duration-500 ease-in-out
                      group-hover:rotate-[-360deg] group-hover:border-r-[#ccff00] group-hover:border-t-[#ccff00]">
                        </div>

                        {/* Hamburger / Cross */}
                        <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-active:scale-75 z:99">

                            {/* TOP LINE */}
                            <span
                                className={`absolute h-[5px] w-8 rounded-sm transition-all duration-300
    ${menuOpen
                                        ? "rotate-45 bg-[#ccff00] shadow-[0_0_15px_#ccff00]"
                                        : "-translate-y-2 bg-white -rotate-2 -skew-x-12"
                                    }`}
                            />

                            {/* MIDDLE LINE */}
                            <span
                                className={`absolute h-[5px] w-7 rounded-sm transition-all duration-300
    ${menuOpen
                                        ? "opacity-0"
                                        : "bg-white skew-x-12"
                                    }`}
                            />

                            {/* BOTTOM LINE */}
                            <span
                                className={`absolute h-[5px] w-8 rounded-sm transition-all duration-300
    ${menuOpen
                                        ? "-rotate-45 bg-[#ccff00] shadow-[0_0_15px_#ccff00]"
                                        : "translate-y-2 bg-white rotate-1 -skew-x-6"
                                    }`}
                            />

                        </div>

                        {/* Center Glow Effect */}
                        <div className="absolute inset-0 bg-[#ccff00]/0 group-hover:bg-[#ccff00]/5 rounded-full blur-xl transition-all duration-500"></div>
                    </button>

                    {/* MOBILE EVENTS (CENTERED)*/}
                    <a
                        href="#"
                        className="md:hidden absolute left-1/2 -translate-x-1/2
                                   text-[#d4ff00] text-2xl italic tracking-wider
                                   -skew-x-12"
                    >
                        EVENTS
                    </a>

                    {/* Desktop Navigation (UNCHANGED) */}
                    <ul
                        className={`
    hidden md:flex items-center gap-8 lg:gap-12
    transition-all duration-500 ease-in-out
    ${menuOpen
                                ? "opacity-0 translate-y-[-10px] pointer-events-none"
                                : "opacity-100 translate-y-0 pointer-events-auto"}
  `}
                    >

                        {navLinks.map((link, index) => (
                            <React.Fragment key={link.name}>
                                <li className="relative group">
                                    <a
                                        href={link.href}
                                        className="relative inline-block text-[#d4ff00] 
                                                   text-2xl lg:text-3xl tracking-wider italic
                                                   transition-all duration-300 ease-out
                                                   -skew-x-12 hover:skew-x-0
                                                   hover:-translate-y-2 hover:scale-110
                                                   hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.9)]
                                                   active:scale-90 active:translate-y-1"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-2 left-0 w-0 h-1 
                                                         bg-[#d4ff00] transition-all duration-300
                                                         group-hover:w-full shadow-[0_0_8px_#d4ff00]" />
                                    </a>
                                </li>

                                {index !== navLinks.length - 1 && (
                                    <div className="h-8 w-[2px] bg-[#d4ff00] opacity-70 
                                                    rotate-[15deg] mx-2
                                                    shadow-[0_0_5px_#d4ff00]" />
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Fullscreen Menu*/}
            <div
                className={`fixed inset-0 bg-black/95 flex flex-col items-center 
                            justify-center gap-12 transition-all duration-500 z-40
                            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-[#d4ff00] text-5xl italic 
                                   -skew-x-12 hover:skew-x-0
                                   transition-transform active:scale-90"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

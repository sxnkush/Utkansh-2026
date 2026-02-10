import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'HOME', href: '#' },
        { name: 'ABOUT US', href: '#' },
        { name: 'EVENTS', href: '#' },
        { name: 'CONTACT US', href: '#' },
    ];

    return (
        <nav className="w-full bg-black py-4 px-6 font-['Permanent_Marker'] overflow-hidden">
            <div className="max-w-7xl mx-auto flex justify-center items-center relative">

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden absolute right-0 text-[#d4ff00] text-2xl z-50 transition-transform active:scale-75"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navLinks.map((link, index) => (
                        <React.Fragment key={link.name}>
                            <li className="relative group">
                                <a
                                    href={link.href}
                                    className="relative inline-block text-[#d4ff00] text-2xl lg:text-3xl tracking-wider italic transition-all duration-300 ease-out -skew-x-12 hover:skew-x-0 hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,255,0,0.9)] active:scale-90 active:translate-y-1"
                                >
                                    {link.name}
                                    {/* Underline Animation */}
                                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#d4ff00] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#d4ff00]"></span>
                                </a>
                            </li>

                            {/* Funky Vertical Separator */}
                            {index !== navLinks.length - 1 && (
                                <div className="h-8 w-[2px] bg-[#d4ff00] opacity-70 rotate-[15deg] mx-2 shadow-[0_0_5px_#d4ff00]"></div>
                            )}
                        </React.Fragment>
                    ))}
                </ul>        {/* Mobile Navigation Dropdown */}
                <div className={`fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-12 transition-all duration-500 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-[#d4ff00] text-5xl italic -skew-x-12 hover:skew-x-0 transition-transform active:scale-90"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
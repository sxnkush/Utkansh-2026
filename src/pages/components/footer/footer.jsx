import React from "react";
import { Link } from "react-router-dom";
import { useTransition } from "../../../transition/transitioncontext";

const Footer = () => {
    // Neon color
    const neonColor = "#d1f903";
    const { startTransition } = useTransition();

    // Navigation links
    const links = [
        { name: "Event", link: "/events" },
        { name: "Passes", link: "/accommodation" },
        { name: "Schedule", link: "/schedule" },
        { name: "Gallery", link: "/gallery" },
    ];

    return (
        <footer
            className="footer py-2 px-14 flex flex-col items-center relative overflow-hidden bg-black"
            style={{
                backgroundImage: 'url("/images/footer/footerbg.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: '"Bangers", "Permanent Marker", "Arial Black", sans-serif',
            }}
        >
            {/* Top fade transition */}
            <div className="absolute top-0 left-0 w-full h-17 bg-gradient-to-b from-black to-transparent z-[1]"></div>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10">
                {/* Left Section: Logo */}
                <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                    <img
                        src="/images/footer/mainLogo.png"
                        alt="UTKANSH '26 Logo"
                        className="w-48 h-auto mb-2 mt-9"
                    />
                </div>

                {/* Center Section: Navigation & Socials */}
                <div className="flex flex-col items-center gap-6 md:mt-12">
                    <Link
                        href=""
                        className="border-b-2 uppercase tracking-widest hover:text-white transition-all transform hover:-rotate-0"
                        style={{ color: neonColor, borderColor: neonColor }}
                    >
                        Marketing Brochure
                    </Link>

                    {/* Navigation Links (with WallTransition) */}
                    <nav className="flex flex-wrap justify-center gap-10 text-2xl font-black uppercase tracking-widest pt-4">
                        {links.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => startTransition(item.link)} // triggers wall animation
                                className="transition-all duration-300 hover:scale-90 active:scale-95"
                                style={{ color: neonColor, textShadow: "2px 2px 0px #000" }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="flex gap-6 items-center">
                        {[
                            { name: "youtube", link: "https://www.youtube.com/@UtkanshNITJalandhar", path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                            { name: "facebook", link: "https://www.facebook.com/utkansh/about/", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
                            { name: "instagram", link: "https://www.instagram.com/utkansh.nitj/", isOutline: true },
                            { name: "location", link: "https://maps.app.goo.gl/49E4vqNqmSzjxtuJ7", path: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" },
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-120 transition-transform p-2 rounded-full border-2"
                                style={{ borderColor: neonColor, color: neonColor, boxShadow: `0 0 10px ${neonColor}` }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={social.isOutline ? "none" : "currentColor"}
                                    stroke={social.isOutline ? "currentColor" : "none"}
                                    strokeWidth="2"
                                >
                                    {social.isOutline ? (
                                        <>
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </>
                                    ) : (
                                        <path d={social.path}></path>
                                    )}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Section: Contact */}
                <div className="flex flex-col items-center md:items-end gap-3 min-w-[280px] w-full md:w-auto md:mt-12">
                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-3xl font-black uppercase italic tracking-widest" style={{ color: neonColor }}>
                            Contact Us
                        </h3>
                        <div className="w-full h-[4px] bg-white transform -rotate-1 mt-3" style={{ backgroundColor: neonColor }}></div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={neonColor}>
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929l11.444 9.215 11.444-9.215h-22.888zm13.154 10.641l2.364 1.902 2.364-1.902 5.614 6.929h-15.955l5.613-6.929zm5.741-2.712l4.623-3.746v9.458l-4.623-5.712z" />
                        </svg>
                        <a href="mailto:nitj.utk.accounts@nitj.ac.in" className="text-sm md:text-base hover:brightness-125 transition-all lowercase" style={{ color: neonColor }}>
                            nitj.utk.accounts@nitj.ac.in
                        </a>
                    </div>

                    <div className="flex flex-col items-start w-full mt-0 text-lg tracking-widest" style={{ color: neonColor }}>
                        {["+917726983748"].map((num) => (
                            <div key={num} className="flex items-center gap-2 ml-15">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.509-8.954.058-.028 2.022-1.01 2.022-1.011l-3.522-6.872s-2.149 1.066-2.152 1.068c-1.468.74-2.257 2.115-2.257 3.737 0 3.702 1.636 7.643 4.864 12.016 3.018 4.075 6.069 5.86 9.471 5.86 1.487 0 3.016-.279 3.568-1.523.003-.004 2.142-1.066 2.142-1.068z" />
                                </svg>
                                <span>{num}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Footer Credits */}
            <div className="w-full max-w-6xl mt-6 pt-6 border-t-2 text-center relative z-10" style={{ borderColor: `${neonColor}44` }}>
                <p className="text-sm uppercase tracking-widest" style={{ color: neonColor }}>
                    Created with 🤍 by{" "}
                    <Link
                        to="/teams"
                        className="no-underline hover:brightness-125"
                        style={{ color: neonColor }}
                    >
                        Developers
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
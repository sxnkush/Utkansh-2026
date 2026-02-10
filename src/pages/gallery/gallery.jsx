import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/* ================= CARD FINAL POSITIONS ================= */

const CARD_LAYOUT = [
    { top: "18%", left: "35%", rotate: "0deg", className: "w-[23rem] md:w-[23rem]" },
    { top: "22%", left: "50%", rotate: "0deg", className: "w-[25rem] md:w-[25rem]" },
    { top: "35%", left: "42%", rotate: "2deg", className: "w-[24rem] md:w-[24rem]" },
    { top: "30%", left: "58%", rotate: "0deg", className: "w-[19rem] md:w-[20rem]" },
    { top: "45%", left: "30%", rotate: "0deg", className: "w-[26rem] md:w-[26rem]" },
    { top: "48%", left: "52%", rotate: "1deg", className: "w-[23rem] md:w-[23rem]" },
    { top: "20%", left: "62%", rotate: "0deg", className: "w-[26rem] md:w-[26rem]" },
    { top: "55%", left: "40%", rotate: "2deg", className: "w-[23rem] md:w-[23rem]" },
    { top: "50%", left: "48%", rotate: "0deg", className: "w-[24rem] md:w-[24rem]" },
];

const images = [
    "/images/gallery/gallery-3.heic",
    "/images/gallery/gallery-6.JPG",
    "/images/gallery/gallery-7.JPG",
    "/images/gallery/gallery-9.JPG",
    "/images/gallery/gallery-4.jpg",
    "/images/gallery/gallery-5.jpg",
    "/images/gallery/gallery-11.jpg",
    "/images/gallery/gallery-10.jpg",
    "/images/gallery/gallery-1.heic",
];

/* ================= MAIN COMPONENT ================= */

const Gallery = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    return (
        <div
            className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('images/gallery/gallery.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

            {/* ================= HEADER ================= */}
            <header className="relative h-32 md:h-40 flex items-center justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-16 top-1/2 -translate-y-1/2
          h-14 w-14 md:h-16 md:w-16
          rounded-full flex items-center justify-center
          border-2 border-white text-white
          bg-white/10 backdrop-blur-sm
          hover:bg-white/20 transition"
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <h1
                    className="text-white select-none"
                    style={{
                        fontFamily: "Selima",
                        fontSize: "4vw",
                        textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
                    }}
                >
                    GALLERY
                </h1>
            </header>

            {/* ================= GALLERY ================= */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-visible">
                <div
                    ref={containerRef}
                    className="relative w-[90%] max-w-6xl h-full overflow-visible"
                >
                    {images.map((src, index) => (
                        <Card
                            key={src}
                            src={src}
                            index={index}
                            containerRef={containerRef}
                            onOpen={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </section>

            {/* ================= LIGHTBOX ================= */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <Lightbox
                        images={images}
                        index={activeIndex}
                        setIndex={setActiveIndex}
                        onClose={() => setActiveIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

/* ================= CARD ================= */

const Card = ({ src, index, containerRef, onOpen }) => {
    const [zIndex, setZIndex] = useState(index + 1);
    const layout = CARD_LAYOUT[index % CARD_LAYOUT.length];

    return (
        <motion.img
            src={src}
            drag
            dragConstraints={containerRef}
            dragElastic={0.6}
            onMouseDown={() => setZIndex(9999)}
            onDoubleClick={onOpen}
            className={`absolute ${layout.className} bg-neutral-200 p-1 pb-4 cursor-grab`}
            style={{ zIndex }}
            initial={{ top: "40%", left: "45%", rotate: 0, scale: 0.9, opacity: 0 }}
            animate={{
                top: layout.top,
                left: layout.left,
                rotate: layout.rotate,
                scale: 1,
                opacity: 1,
            }}
            transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.12 }}
        />
    );
};

/* ================= LIGHTBOX ================= */

const Lightbox = ({ images, index, setIndex, onClose }) => {
    const prev = () => setIndex((index - 1 + images.length) % images.length);
    const next = () => setIndex((index + 1) % images.length);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [index]);

    return (
        <motion.div
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 h-14 w-14 rounded-full border-2 border-white text-white
        flex items-center justify-center hover:bg-white/20 transition"
            >
                ✕
            </button>

            <button
                onClick={prev}
                className="absolute left-8 text-white text-5xl hover:scale-110 transition"
            >
                ‹
            </button>

            <motion.img
                src={images[index]}
                className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            />

            <button
                onClick={next}
                className="absolute right-8 text-white text-5xl hover:scale-110 transition"
            >
                ›
            </button>
        </motion.div>
    );
};

export default Gallery;

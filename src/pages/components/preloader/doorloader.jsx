import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

import WallLeft from "/images/loader/left.jpg";   // your image
import WallRight from "/images/loader/right.jpg"; // your image
import CloseSound from "/sounds/door-close.mp3"; // optional

const START = {
    left: "-100%",
    right: "100%",
};

export default function WallTransition({
    phase,            // "idle" | "closing" | "opening"
    onClosed,
    onOpened,
}) {
    const leftControl = useAnimation();
    const rightControl = useAnimation();
    const soundRef = useRef(null);
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {
        if (phase !== "idle") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [phase]);

    useEffect(() => {
        const audio = new Audio(CloseSound);
        audio.load();
        soundRef.current = audio;
    }, []);

    useEffect(() => {
        let cancelled = false;

        const runClosing = async () => {
            soundRef.current?.play();

            setShowLoading(false);

            // Reset walls position instantly
            await Promise.all([
                leftControl.set({ x: START.left }),
                rightControl.set({ x: START.right }),
            ]);

            // Animate closing
            await Promise.all([
                leftControl.start({
                    x: "0%",
                    transition: { duration: 0.8, ease: "easeInOut" },
                }),
                rightControl.start({
                    x: "0%",
                    transition: { duration: 0.8, ease: "easeInOut" },
                }),
            ]);

            if (cancelled) return;

            // 👉 SHOW LOADING AFTER WALLS FULLY CLOSE
            setShowLoading(true);

            // Keep it visible properly
            await new Promise((res) => setTimeout(res, 800));

            setShowLoading(false);

            if (!cancelled) onClosed?.();
        };

        const runOpening = async () => {
            setShowLoading(false); // Ensure it's hidden during opening
            setTimeout(async () => {
                soundRef.current?.play();

                await Promise.all([
                    leftControl.start({
                        x: START.left,
                        transition: { duration: 0.8, ease: "easeInOut" },
                    }),
                    rightControl.start({
                        x: START.right,
                        transition: { duration: 0.8, ease: "easeInOut" },
                    }),
                ]);

                if (!cancelled) onOpened?.();
            }, 500);
        };

        if (phase === "closing") runClosing();
        if (phase === "opening") runOpening();

        return () => {
            cancelled = true;
        };
    }, [phase, leftControl, rightControl, onClosed, onOpened]);

    if (phase === "idle") return null;

    return (
        <div style={containerStyle}>
            <motion.img
                src={WallLeft}
                alt="left-wall"
                style={leftStyle}
                animate={leftControl}
            />
            <motion.img
                src={WallRight}
                alt="right-wall"
                style={rightStyle}
                animate={rightControl}
            />

            {/* --- GRAFFITI FLASH LOADING --- */}
            <AnimatePresence>
                {showLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.85, rotate: 6 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={loadingBoxStyle}
                    >
                        {/* Decorative Spray/Bolts dots */}
                        <div style={{ ...dot, top: 4, left: 4 }} />
                        <div style={{ ...dot, bottom: 4, right: 4 }} />

                        <span style={textStyle}>LOADING...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ---------- Styles ---------- */

const containerStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    pointerEvents: "none",
    overflow: "hidden",
};

const leftStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "50vw",
    objectFit: "cover",
};

const rightStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh",
    width: "50vw",
    objectFit: "cover",
};

const loadingBoxStyle = {
    position: "absolute",
    bottom: "60px",
    right: "60px",
    backgroundColor: "#d1f903", // Vibrant yellow-green from image
    padding: "10px 25px",
    border: "4px solid black",
    boxShadow: "10px 10px 0px 0px black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
};

const textStyle = {
    fontFamily: "'Permanent Marker', cursive", // Assuming this is loaded, otherwise use any marker font
    fontSize: "32px",
    color: "black",
    fontWeight: "900",
    letterSpacing: "2px",
    textTransform: "uppercase"
};

const dot = {
    position: "absolute",
    width: "6px",
    height: "6px",
    backgroundColor: "black",
    borderRadius: "50%"
};
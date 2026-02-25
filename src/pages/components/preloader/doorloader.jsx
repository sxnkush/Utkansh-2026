import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

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

    useEffect(() => {
        const audio = new Audio(CloseSound);
        audio.load();
        soundRef.current = audio;
    }, []);

    useEffect(() => {
        let cancelled = false;

        const runClosing = async () => {
            soundRef.current?.play();

            // Set start position
            await Promise.all([
                leftControl.set({ x: START.left }),
                rightControl.set({ x: START.right }),
            ]);

            if (cancelled) return;

            // Close animation
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

            if (!cancelled) onClosed?.();
        };

        const runOpening = async () => {
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
            }, 500); // delay before opening
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
import { useEffect, useRef, useState } from "react";
import SprayCan from "./spraycan";

const SprayReveal = ({ trigger }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioCtxRef = useRef(null);
    const bufferRef = useRef(null);
    const sourceRef = useRef(null);

    const [showGalleries, setShowGalleries] = useState(false);
    const galleryTriggeredRef = useRef(false);
    const SPRAY_DONE_KEY = "spray_done_once";
    const stateRef = useRef({
        phase: "IDLE",
        progress: 0,
        fallVelocity: 0,
        fallRotation: 0,
        currentPos: { x: 0, y: 0, angle: 0 },
        landedTime: 0,
        itemDrips: {} // Tracks drip progress per gallery item
    });

    const [sprayHead, setSprayHead] = useState({ x: 0, y: 0, angle: 0 });

    const GALLERY_ITEMS = [
        { id: 1, src: "/images/navreveal/schedule.png", x: "27%", y: "32%", link: "/schedule", delay: 200 },
        { id: 2, src: "/images/navreveal/accomodation.png", x: "45%", y: "82%", link: "/accomodation", delay: 300 },
        { id: 3, src: "/images/navreveal/gallery.png", x: "66%", y: "23%", link: "/gallery", delay: 400 },
        { id: 4, src: "/images/navreveal/team.png", x: "82%", y: "73%", link: "/teams", delay: 500 }
    ];

    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        fetch("/sounds/spray.mp3")
            .then(res => res.arrayBuffer())
            .then(data => ctx.decodeAudioData(data))
            .then(buffer => bufferRef.current = buffer)
            .catch(e => console.error("Audio failed", e));

        const resumeAudio = () => ctx.state === "suspended" && ctx.resume();
        window.addEventListener("click", resumeAudio, { once: true });
        return () => window.removeEventListener("click", resumeAudio);
    }, []);

    const playSpraySound = async () => {
        if (!bufferRef.current || !audioCtxRef.current || sourceRef.current) return;
        if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.loop = true;
        const gain = audioCtxRef.current.createGain();
        gain.gain.value = 0.6;
        source.connect(gain).connect(audioCtxRef.current.destination);
        source.start(0);
        sourceRef.current = source;
    };

    const stopSpraySound = () => {
        if (sourceRef.current) {
            sourceRef.current.stop();
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        if (!trigger) {
            stopSpraySound();
            setShowGalleries(false);
            galleryTriggeredRef.current = false;
            stateRef.current.phase = "IDLE";
            stateRef.current.itemDrips = {};
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationRef.current);
            return;
        }


        const segments = [
            [{ x: canvas.width * 0.15, y: canvas.height * 0.7 }, { x: canvas.width * 0.2, y: canvas.height * 0.2 }, { x: canvas.width * 0.3, y: canvas.height * 0.2 }, { x: canvas.width * 0.35, y: canvas.height * 0.5 }],
            [{ x: canvas.width * 0.35, y: canvas.height * 0.5 }, { x: canvas.width * 0.4, y: canvas.height * 0.9 }, { x: canvas.width * 0.5, y: canvas.height * 0.9 }, { x: canvas.width * 0.55, y: canvas.height * 0.5 }],
            [{ x: canvas.width * 0.55, y: canvas.height * 0.5 }, { x: canvas.width * 0.6, y: canvas.height * 0.1 }, { x: canvas.width * 0.7, y: canvas.height * 0.1 }, { x: canvas.width * 0.75, y: canvas.height * 0.5 }],
            [{ x: canvas.width * 0.75, y: canvas.height * 0.5 }, { x: canvas.width * 0.8, y: canvas.height * 0.8 }, { x: canvas.width * 0.85, y: canvas.height * 0.8 }, { x: canvas.width * 0.9, y: canvas.height * 0.4 }]
        ];

        const getBezierPoint = (t, p0, p1, p2, p3) => {
            const cx = 3 * (p1.x - p0.x);
            const bx = 3 * (p2.x - p1.x) - cx;
            const ax = p3.x - p0.x - cx - bx;
            const cy = 3 * (p1.y - p0.y);
            const by = 3 * (p2.y - p1.y) - cy;
            const ay = p3.y - p0.y - cy - by;
            return {
                x: ax * t ** 3 + bx * t ** 2 + cx * t + p0.x,
                y: ay * t ** 3 + by * t ** 2 + cy * t + p0.y
            };
        };

        const drawSpray = (x, y) => {
            ctx.fillStyle = "rgba(209,249,3, 0.9)";
            for (let i = 0; i < 1600; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = Math.random() * Math.random() * 80;
                ctx.beginPath();
                ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, Math.random() * 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawSplat = (x, y) => {
            ctx.fillStyle = "rgba(209,249,3, 0.95)";
            for (let i = 0; i < 2000; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = Math.random() * Math.random() * 75;
                ctx.beginPath();
                ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, Math.random() * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const createDripData = (x, y) => {
            const numDrips = 4 + Math.floor(Math.random() * 5);
            return Array.from({ length: numDrips }, () => ({
                x: x + (Math.random() - 0.5) * 80,
                currentY: y + (Math.random() * 20),
                targetY: y + 60 + Math.random() * 160,
                speed: 0.8 + Math.random() * 1.5,
                width: 2.5 + Math.random() * 3
            }));
        };

        stateRef.current = {
            phase: "SPRAY",
            progress: 0,
            fallVelocity: 0,
            fallRotation: 0,
            currentPos: { x: segments[0][0].x, y: segments[0][0].y, angle: 0 },
            landedTime: 0,
            itemDrips: {}
        };

        playSpraySound();

        const animate = () => {
            const state = stateRef.current;
            let { x, y, angle } = state.currentPos;

            if (state.phase === "SPRAY") {
                const idx = Math.floor(state.progress);
                if (idx >= segments.length) {
                    state.phase = "FALL";
                    stopSpraySound();
                } else {
                    const t = state.progress - idx;
                    const [p0, p1, p2, p3] = segments[idx];
                    const pos = getBezierPoint(t, p0, p1, p2, p3);
                    x = pos.x;
                    y = pos.y;
                    angle = Math.atan2(p3.y - p0.y, p3.x - p0.x) * (180 / Math.PI);
                    drawSpray(x, y);
                    state.progress += 0.022;
                }
            } else if (state.phase === "FALL") {
                state.fallVelocity += 0.8;
                y += state.fallVelocity;
                angle += (95 - angle) * 0.1;

                if (y > canvas.height + 300) {
                    state.phase = "LANDED";
                    state.landedTime = Date.now();
                }
            } else if (state.phase === "LANDED") {
                const elapsed = Date.now() - state.landedTime;

                GALLERY_ITEMS.forEach((item, idx) => {
                    // Start individual splat and drips after item's specific delay
                    if (elapsed > item.delay && !state.itemDrips[idx]) {
                        const px = (parseFloat(item.x) / 100) * canvas.width;
                        const py = (parseFloat(item.y) / 100) * canvas.height;
                        drawSplat(px, py);
                        state.itemDrips[idx] = createDripData(px, py);

                        // Show gallery items only after drips start
                        if (!galleryTriggeredRef.current && idx === GALLERY_ITEMS.length - 1) {
                            galleryTriggeredRef.current = true;
                            setShowGalleries(true);
                        }
                    }
                });

                // Render ongoing drips
                Object.values(state.itemDrips).forEach(drips => {
                    drips.forEach(drip => {
                        if (drip.currentY < drip.targetY) {
                            const nextY = drip.currentY + drip.speed;
                            ctx.fillStyle = "rgba(209,249,3, 0.9)";
                            ctx.beginPath();
                            ctx.arc(drip.x, nextY, drip.width, 0, Math.PI * 2);
                            ctx.fill();
                            // Rectangle fills the gap between frames for a smooth line
                            ctx.fillRect(drip.x - drip.width, drip.currentY, drip.width * 2, nextY - drip.currentY);
                            drip.currentY = nextY;
                        }
                    });
                });
            }

            state.currentPos = { x, y, angle };
            setSprayHead({ x, y, angle });
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            stopSpraySound();
        };
    }, [trigger]);

    return (
        <>
            <style>{`
                @keyframes formIn {
                    0% {
                        opacity: 0;
                        filter: blur(25px) brightness(2);
                        transform: translate(-50%, -50%) scale(0.6);
                    }
                    60% {
                        opacity: 0.8;
                        filter: blur(5px) brightness(1.2);
                    }
                    100% {
                        opacity: 1;
                        filter: blur(0) brightness(1);
                        transform: translate(-50%, -50%) scale(2);
                    }
                }

                .gallery-item {
                    position: fixed;
                    z-index: 50;
                    display: block;
                    width: fit-content;
                    opacity: 0;
                    animation: formIn 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), filter 0.5s ease;
                }

                .gallery-item:hover {
                    transform: translate(-50%, -50%) scale(2.2) !important;
                    filter: drop-shadow(0 0 25px rgba(209, 249, 3, 0.6));
                }

                .gallery-item img {
                    display: block;
                    pointer-events: none;
                }
            `}</style>

            <canvas ref={canvasRef} className="fixed inset-0 z-40 pointer-events-none" />

            <SprayCan
                x={sprayHead.x}
                y={sprayHead.y}
                angle={sprayHead.angle}
                visible={trigger && stateRef.current.phase !== "LANDED"}
            />

            {showGalleries &&
                GALLERY_ITEMS.map(item => (
                    <a
                        key={item.id}
                        href={item.link}
                        className="gallery-item"
                        style={{
                            left: item.x,
                            top: item.y,
                            animationDelay: `${item.delay + 300}ms` // Delay appearance until drips start moving
                        }}
                    >
                        <img src={item.src} alt="nav item" />
                    </a>
                ))}
        </>
    );
};

export default SprayReveal;
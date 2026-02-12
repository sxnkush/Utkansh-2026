import { useEffect, useRef, useState } from "react";
import SprayCan from "./spraycan";

const SprayReveal = ({ trigger }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioCtxRef = useRef(null);
    const bufferRef = useRef(null);
    const sourceRef = useRef(null);

    // Persistent lists for "new things": drips and mist particles
    const dripsRef = useRef([]);
    const particlesRef = useRef([]);

    const stateRef = useRef({
        phase: "IDLE",
        progress: 0,
        shakeFrames: 0,
        fallVelocity: 0,
        fallRotation: 0,
        currentPos: { x: 0, y: 0, angle: 0 }
    });

    const [sprayHead, setSprayHead] = useState({ x: 0, y: 0, angle: 0 });

    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        fetch("/sounds/spray.mp3")
            .then(res => res.arrayBuffer())
            .then(data => ctx.decodeAudioData(data))
            .then(buffer => bufferRef.current = buffer)
            .catch(console.error);

        // Optional: resume audio context on first user interaction
        const resumeAudio = () => ctx.state === "suspended" && ctx.resume();
        window.addEventListener("click", resumeAudio, { once: true });

        return () => {
            window.removeEventListener("click", resumeAudio);
        };
    }, []);

    const playSpraySound = async () => {
        if (!bufferRef.current || !audioCtxRef.current || sourceRef.current) return;

        if (audioCtxRef.current.state === "suspended") {
            await audioCtxRef.current.resume(); // ensures it starts immediately
        }

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

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const w = canvas.width;
        const h = canvas.height;

        if (!trigger) {
            // Stop spray sound
            stopSpraySound();

            // Reset state
            stateRef.current.phase = "IDLE";
            dripsRef.current = [];
            particlesRef.current = [];
            setSprayHead({ x: 0, y: 0, angle: 0 }); // Hide SprayCan

            // Clear canvas immediately
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Stop any running animation
            cancelAnimationFrame(animationRef.current);

            return;
        }



        const segments = [
            [{ x: w * 0.15, y: h * 0.7 }, { x: w * 0.2, y: h * 0.2 }, { x: w * 0.3, y: h * 0.2 }, { x: w * 0.35, y: h * 0.5 }],
            [{ x: w * 0.35, y: h * 0.5 }, { x: w * 0.4, y: h * 0.9 }, { x: w * 0.5, y: h * 0.9 }, { x: w * 0.55, y: h * 0.5 }],
            [{ x: w * 0.55, y: h * 0.5 }, { x: w * 0.6, y: h * 0.1 }, { x: w * 0.7, y: h * 0.1 }, { x: w * 0.75, y: h * 0.5 }],
            [{ x: w * 0.75, y: h * 0.5 }, { x: w * 0.8, y: h * 0.8 }, { x: w * 0.85, y: h * 0.8 }, { x: w * 0.9, y: h * 0.4 }]
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

        const createDrip = (x, y) => {
            if (Math.random() > 0.05) return; // Rare drips
            dripsRef.current.push({ x, y, length: 0, maxLen: 40 + Math.random() * 60, speed: 0.5 + Math.random() });
        };

        const drawSprayHead = (x, y) => {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(209,249,3, 0.8)";
            ctx.fillStyle = "rgba(209,249,3, 0.35)";

            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 45;
                ctx.beginPath();
                ctx.arc(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, Math.random() * 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
            createDrip(x, y);
            createParticles(x, y);
        };
        const sprayDensity = 1600; // desity (thickness) //
        const sprayRadius = 80; // radius ( no of dots per frame) // 

        const drawSpray = (x, y) => {
            ctx.fillStyle = "rgba(209,249,3)";
            for (let i = 0; i < sprayDensity; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * Math.random() * sprayRadius;
                ctx.beginPath();
                ctx.arc(
                    x + Math.cos(angle) * radius,
                    y + Math.sin(angle) * radius,
                    Math.random() * 2.5,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            // keep drips from 2nd code
            createDrip(x, y);
        };

        const drawVisuals = () => {
            // Draw Particles (Mist)


            // Draw Drips
            ctx.strokeStyle = "rgba(209,249,3, 0.6)";
            ctx.lineCap = "round";
            dripsRef.current.forEach(d => {
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.length);
                ctx.stroke();
                if (d.length < d.maxLen) d.length += d.speed;
            });
        };


        stateRef.current = {
            phase: "SHAKE",
            progress: 0,
            shakeFrames: 45,
            fallVelocity: 0,
            fallRotation: 0,
            currentPos: { x: segments[0][0].x, y: segments[0][0].y, angle: 0 }
        };

        const animate = () => {
            const state = stateRef.current;
            let { x, y, angle } = state.currentPos;

            // Update persistent visuals every frame
            drawVisuals();

            if (state.phase === "SHAKE") {
                x = segments[0][0].x + Math.sin(state.shakeFrames * 0.8) * 8;
                y = segments[0][0].y + Math.cos(state.shakeFrames * 0.8) * 4;
                angle = Math.sin(state.shakeFrames * 0.5) * 15;
                state.shakeFrames--;
                if (state.shakeFrames <= 0) {
                    state.phase = "SPRAY";
                    playSpraySound();
                }
            }
            else if (state.phase === "SPRAY") {
                const segmentIndex = Math.floor(state.progress);

                if (segmentIndex >= segments.length) {
                    state.phase = "FALL";
                    stopSpraySound();
                } else {
                    const localT = state.progress - segmentIndex;
                    const [p0, p1, p2, p3] = segments[segmentIndex];

                    const pos = getBezierPoint(localT, p0, p1, p2, p3);
                    x = pos.x;
                    y = pos.y;


                    const dx = p3.x - p0.x;
                    const dy = p3.y - p0.y;
                    angle = Math.atan2(dy, dx) * (180 / Math.PI);

                    drawSpray(x, y);

                    state.progress += 0.025;
                }
            }

            else if (state.phase === "FALL") {
                state.fallVelocity += 0.8;
                y += state.fallVelocity;
                const targetAngle = 95;
                angle += (targetAngle - angle) * 0.1;

                // Change: Let it fall until it's completely past the height 'h'
                if (y >= h + 300) {
                    state.phase = "LANDED"; // Stop animation once it's fully off-screen
                }
            }
            state.currentPos = { x, y, angle };
            setSprayHead({ x, y, angle });

            if (state.phase !== "LANDED") {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            stopSpraySound();
        };
    }, [trigger]);

    return (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 z-40 pointer-events-none" />
            <SprayCan
                x={sprayHead.x}
                y={sprayHead.y}
                angle={sprayHead.angle}
                visible={trigger}
            />
        </>
    );
};

export default SprayReveal;
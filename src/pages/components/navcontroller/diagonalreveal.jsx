import { motion } from "framer-motion";

const DiagonalReveal = ({ open, onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-30"
            style={{
                backgroundImage: " linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(/images/navreveal/navreveals.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                background: "opaque",
            }}
            initial={{ clipPath: "circle(0% at 0% 0%)", opacity: 0 }}
            animate={
                open
                    ? {
                        clipPath: "circle(150% at 0% 0%)",
                        opacity: 1
                    }
                    : {
                        opacity: 0   // fast fade out
                    }
            }
            transition={
                open
                    ? {
                        duration: 1.1,
                        ease: "easeInOut"
                    }
                    : {
                        duration: 0.35,   // faster close
                        ease: "easeOut"
                    }
            }
            onAnimationComplete={() => {
                if (open && onComplete) {
                    onComplete();
                }
            }}
        />
    );
};

export default DiagonalReveal;
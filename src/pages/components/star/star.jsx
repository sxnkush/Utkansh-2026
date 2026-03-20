import React from "react";

const Star = () => {
    return (
        <section className="w-full relative z-[20] -mt-32">

            {/* Image */}
            <img
                src="/images/mohit.png"
                alt="Star Performers"
                className="w-full h-auto object-contain md:object-cover"
            />

            {/* Top fade (blends into video) */}
            <div
                className="absolute top-0 left-0 w-full h-40 pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 75%, transparent 100%)"
                }}
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-2 sm:h-24 md:h-32 lg:h-35  bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

        </section>
    );
};
export default Star;
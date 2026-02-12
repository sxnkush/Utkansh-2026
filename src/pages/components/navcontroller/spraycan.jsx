const SprayCan = ({ x, y, angle, visible }) => {
    if (!visible) return null;

    return (
        <img
            src="/images/navreveal/spraybottle.png"
            draggable="false"
            alt="spray can"
            className="fixed z-[9999] pointer-events-none select-none w-[90px]"
            style={{
                transform: `
            translate(${x}px, ${y}px)
            rotate(${angle}deg) scale(1.10)
          `,
                transformOrigin: "20% 50%", // nozzle pivot
            }}
        />
    );
};

export default SprayCan;

const Hero = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden">

            {/* Background Image*/}
            <img
                src="/images/herobg.png"
                alt="Hero Background"
                className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    scale-[1]
                "
            />

        </section>
    );
};

export default Hero;

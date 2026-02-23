import React from "react";
import Marquee from "react-fast-marquee";

const sponsors = [
    { id: 1, img: "cocacola.png", link: "www.cocacola.com" },
    { id: 2, img: "cocacola.png", link: "www.cocacola.com" },
    { id: 3, img: "cocacola.png", link: "www.cocacola.com" },
    { id: 4, img: "cocacola.png", link: "www.cocacola.com" },
];
export default function Sponsors() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-white bg-black z-10 text-6xl font-semibold py-4 w-full text-center">
                Our Sponsors
            </h1>

            <Marquee
                speed={50}
                pauseOnHover={true}
                className="bg-black w-full overflow-hidden"
            >
                <div className="flex gap-16 py-4">
                    {sponsers.map((item, index) => (
                        <a key={index} href={item.link} className="w-56">
                            <img src={item.img} alt="" className="w-56" />
                        </a>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}

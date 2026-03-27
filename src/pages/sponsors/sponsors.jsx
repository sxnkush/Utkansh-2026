import React from "react";
import Marquee from "react-fast-marquee";

const sponsors = [
        {
        id: 8,
        img: "/images/sponsors/plam.png",
        link: "https://plumgoodness.com/?utm_source=google_search&utm_medium=brandsearch&utm_campaign=TP_Plum_Brand_Search_IS_Jan24_Brand_Skincare_Jan26&gad_source=1&gad_campaignid=20945206455&gbraid=0AAAAADoQ5k3GXTlMPimsSMZugL3H1VBr-&gclid=Cj0KCQjw1ZjOBhCmARIsADDuFTBirGHdF4G03356ah9x0yLt1zLibyoWRuofuZWl-bT8C4i7s55tF1oaArj9EALw_wcB",
    },
    {
        id: 9,
        img: "/images/sponsors/kotak.png",
        link: "https://www.kotak.bank.in/en/home.html",
    },
    {
        id: 10,
        img: "/images/sponsors/verka.png",
        link: "https://verka.coop/",
    },
    {
        id: 11,
        img: "/images/sponsors/HP.png",
        link: "https://www.hindustanpetroleum.com/",
    },
    {
        id: 12,
        img: "/images/sponsors/amul.png",
        link: "https://amul.com/index.php",
    },
    {
        id: 13,
        img: "/images/sponsors/krafton.png",
        link: "https://esports.battlegroundsmobileindia.com/",
    },
    {
        id: 1,
        img: "/images/sponsors/canara.png",
        link: "https://canarabank.com/",
    },
    {
        id: 2,
        img: "/images/sponsors/hdfc.png",
        link: "https://www.hdfcbank.com/",
    },
    {
        id: 3,
        img: "/images/sponsors/icici.png",
        link: "https://www.icicibank.com/",
    },
    {
        id: 4,
        img: "/images/sponsors/monotech.png",
        link: "https://monotech.in/",
    },
    {
        id: 5,
        img: "/images/sponsors/ntpc.png",
        link: "https://ntpc.co.in/",
    },
    {
        id: 6,
        img: "/images/sponsors/noscars.png",
        link: "https://noscar.co.in/",
    },
    {
        id: 7,
        img: "/images/sponsors/jiosaavn.png",
        link: "https://jiosaavn.com/",
    },

];

export default function Sponsors() {
    return (
        <div className="w-full flex flex-col items-center justify-center relative z-10">

            {/* Top fade overlapping previous section */}
            <div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none"></div>


            <h1
                className="text-white bg-black text-6xl py-6 w-full text-center tracking-widest mb-0"
                style={{ fontFamily: "Permanent Marker, cursive" }}
            >
                Past Sponsors
            </h1>

            <Marquee
                speed={50}
                pauseOnHover={true}
                className="bg-black w-full overflow-hidden"
            >
                <div className="flex gap-16 py-6">
                    {sponsors.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-56 flex items-center justify-center"
                        >
                            <img
                                src={item.img}
                                alt="sponsor"
                                className="w-[164px] object-contain"
                            />
                        </a>
                    ))}
                </div>
            </Marquee>
        </div>
    );
}
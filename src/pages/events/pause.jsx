import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const PausePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

const contactGroups = [
    {
        title: "For all Registrations",
        people: [
            { name: "Niraj Kumar", phone: "+91 7978147562" },
            { name: "Sarvesh Singh", phone: "+91 8085384184" },
            { name: "Preeti Sharma", phone: "+91 8791703200" },
        ],
    },
    {
        title: "Fine Arts Society",
        people: [
            { name: "Komal", phone: "+91 7814322180" },
            { name: "Himanshu", phone: "+91 7033279285" },
            { name: "Abhijeet", phone: "+91 9873565723" },
        ],
    },
    {
        title: "Dance",
        people: [
            { name: "Khusi", phone: "+91 9255194145" },
            { name: "Kajal", phone: "+91 8302707716" },
            { name: "Bartika", phone: "+91 9650100419" },
        ],
    },
    {
        title: "Bhangra",
        people: [
            { name: "Nihal", phone: "+91 9463413023" },
            { name: "Gunroop", phone: "+91 7973826168" },
            { name: "Baaj ", phone: "+91  7696264208" },
        ],
    },
    {
        title: "Music",
        people: [
            { name: "Arnav", phone: "+91 9958857603" },
            { name: "Raghunandan", phone: "+91 8728821256" },
            { name: "Anupam", phone: "+91 79738 57686" },
        ],
    },
    {
        title: "Fashion",
        people: [
            { name: "Tiyas", phone: "+91 9832603861" },
            { name: "Abhinandan", phone: "+91 6280493065" },
        ],
    },
    {
        title: "Cybernauts",
        people: [
            { name: "Manan", phone: "+91 9990833513" },
            { name: "Mahir", phone: "+91 94173 87948" },
        ],
    },
    {
        title: "SPICE",
        people: [
            { name: "Sarvesh", phone: "+91 8085384184" },
            { name: "Ayush", phone: "+91 7201050327" },
        ],
    },
    {
        title: "Sober (The Human Hunt / Who Killed the Cell)",
        people: [
            { name: "Jaya", phone: "+91 63677 16310" },
            { name: "Neha", phone: "+91 78220 70166" },
        ],
    },
    {
        title: "TIES",
        people: [
            { name: "Alok", phone: "+91 6283524987" },
            { name: "Ruchir", phone: "+91 9431645370" },
        ],
    },
    {
        title: "Matwars",
        people: [
            { name: "Shrey", phone: "+91 7351510532" },
            { name: "Harshit", phone: "+91 7009743448" },
        ],
    },
    {
        title: "Seed (Power Arena, Rapid Wire, Grid Collapse)",
        people: [
            { name: "Rinku Diwakar", phone: "+91 9137438718" },
            { name: "Ripudaman", phone: "+91 89685 21134" },
        ],
    },
];
    return (
        <div className="relative z-10 text-white min-h-screen flex items-center justify-center px-4 py-20 overflow-y-auto">

            {/* 🔥 Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/events_bg2.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 🔥 Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* 🔙 Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-4 md:left-12 h-14 w-14 rounded-full flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition z-50"
            >
                <ArrowLeft size={24} strokeWidth={2.5} />
            </button>

            {/* 🔥 Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 overflow-y-auto">
                <div className="max-w-xl w-full">

                    {/* Heading */}
                    <h1 className="text-center text-4xl md:text-5xl font-black mb-4">
                        Registrations Diverted
                    </h1>

                    <p className="text-center text-gray-300 text-lg mb-10">
                        <span className="font-semibold underline">For external students:</span> Registrations are done by the designated coordinators.
                        Please contact the relevant coordinators below.
                    </p>
                    <p className="text-center text-gray-300 text-lg mb-10">
                        <span className="font-semibold underline">For internal students (via NITJ Wi-Fi):</span> <a href="https://v1.nitj.ac.in/events_registration/utkansh_2026/login" target="_blank" className="text-amber-300"> Click Here</a>
                    </p>
                    {/* 🔥 Categories */}
                    <div className="space-y-8">
                        {contactGroups.map((group, idx) => (
                            <div key={idx}>

                                {/* Category Title */}
                                <h2 className="text-lg font-black uppercase mb-3 border-l-4 border-yellow-400 pl-3">
                                    {group.title}
                                </h2>

                                {/* People */}
                                <div className="space-y-3">
                                    {group.people.map((person, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/10 border border-white/20 rounded-xl p-4 flex justify-between items-center backdrop-blur-md"
                                        >
                                            <span className="font-medium">{person.name}</span>
                                            <span className="text-yellow-300">{person.phone}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 mt-10">
                        We’ll resume registrations soon. Stay tuned!
                    </p>
                    <p className="text-center text-sm text-gray-400 mt-10">
                        *T&C- Once registration is completed, no refund will be initiated from institute.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PausePage;
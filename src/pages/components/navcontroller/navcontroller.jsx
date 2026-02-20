import { useState } from "react";
import Navbar from "../navbar/navbar";
import DiagonalReveal from "./diagonalreveal";
import SprayReveal from "./SprayReveal";


const NavController = () => {
    const [open, setOpen] = useState(false);
    const [startSpray, setStartSpray] = useState(false);

    const handleRevealComplete = () => {
        setStartSpray(true);
    };
    return (
        <>
            <Navbar
                menuOpen={open}
                onHamburgerClick={() => {
                    setOpen(prev => !prev);
                    setStartSpray(false); // reset spray when reopening
                }}
            />

            {/* KEEP MOUNTED so close animation runs */}
            <DiagonalReveal
                open={open}
                onComplete={handleRevealComplete}
            />

            {/* Spray animation layered above */}
            <SprayReveal trigger={startSpray} />

        </>
    );
};

export default NavController;
import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sprayStarted, setSprayStarted] = useState(false);
    const [galleriesVisible, setGalleriesVisible] = useState(false);

    return (
        <NavContext.Provider value={{
            menuOpen, setMenuOpen,
            sprayStarted, setSprayStarted,
            galleriesVisible, setGalleriesVisible
        }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNav = () => useContext(NavContext);
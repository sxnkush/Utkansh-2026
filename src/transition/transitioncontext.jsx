import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
    const [phase, setPhase] = useState("idle");
    const [targetPath, setTargetPath] = useState(null);

    const startTransition = (path) => {
        setTargetPath(path);
        setPhase("closing");
    };

    return (
        <TransitionContext.Provider
            value={{ phase, setPhase, startTransition, targetPath }}
        >
            {children}
        </TransitionContext.Provider>
    );
}

export const useTransition = () => useContext(TransitionContext);
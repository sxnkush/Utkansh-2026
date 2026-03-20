import { Suspense, lazy } from "react";

// Lazy load components
const Hero = lazy(() => import("./pages/components/hero/hero"));
const Footer = lazy(() => import("./pages/components/footer/footer"));
const Sponsors = lazy(() => import("./pages/sponsors/sponsors"));
const Star = lazy(() => import("./pages/components/star/star"));

const Home = ({ introDone }) => {
    return (
        <>
            {introDone && (
                <Suspense fallback={null}>
                    <Hero introDone={introDone} />
                    <Star introDone={introDone} />
                    <Sponsors introDone={introDone} />
                    <Footer introDone={introDone} />
                </Suspense>
            )}
        </>
    );
};

export default Home;
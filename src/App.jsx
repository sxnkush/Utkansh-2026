import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import Gallery from "./pages/gallery/gallery";
import DevelopersPage from "./pages/teams/Teams";
import ContactUsUtkansh26 from "./pages/contact/ContactUsUtkansh26";
import Schedule from "./pages/Schedule/Schedule";
import NavController from "./pages/components/navcontroller/navcontroller";
import IntroLoader from "./transition/preloader";
import WallTransition from "./pages/components/preloader/doorloader";
import { useTransition } from "./transition/transitioncontext";
import Events from "./pages/events/events";
import EventsPage from "./pages/events";
import Accomodation from "./pages/accomodation/accomodation";
import EventDetails from "./pages/Schedule/EventDetails";
import PausePage from "./pages/events/pause";

function App() {
  const [introDone, setIntroDone] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { phase, setPhase, targetPath } = useTransition();

  //  Hide on contact page
  const hideNavRoutes = ["/contact", "/events", "/paused"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <NavController />}

      <WallTransition
        phase={phase}
        onClosed={() => {
          if (targetPath) navigate(targetPath);
          setPhase("opening");
        }}
        onOpened={() => {
          setPhase("idle");
        }}
      />

      <Routes>
        <Route path="schedule" element={<Schedule />} />
        <Route path="/" element={<Homepage introDone={introDone} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teams" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactUsUtkansh26 />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:eventId' element={<EventDetails />} />
        <Route path='/accomodation' element={<Accomodation />} />
        <Route path="/paused" element={<PausePage />} />
      </Routes>
      {/* LOADER ON TOP */}
      {!introDone && (
        <IntroLoader onLoaded={() => setIntroDone(true)} />
      )}
    </>
  );
}

export default App;
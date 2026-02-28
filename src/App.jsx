import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import Gallery from "./pages/gallery/gallery";
import DevelopersPage from "./pages/teams/Teams";
import ContactUsUtkansh26 from "./pages/contact/ContactUsUtkansh26";
import Schedule from "./pages/Schedule/Schedule";
import NavController from "./pages/components/navcontroller/navcontroller";

import WallTransition from "./pages/components/preloader/doorloader";
import { useTransition } from "./transition/transitioncontext";
import Events from "./pages/events/events";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phase, setPhase, targetPath } = useTransition();

  //  Hide on contact page
  const hideNavRoutes = ["/contact"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render */}
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
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teams" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactUsUtkansh26 />} />
        <Route path="/events" element={<Events/>} />
      </Routes>
    </>
  );
}

export default App;
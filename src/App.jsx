import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Gallery from "./pages/gallery/gallery";
import DevelopersPage from "./pages/teams/Teams";
import ContactUsUtkansh26 from "./pages/contact/ContactUsUtkansh26";
import Schedule from "./pages/Schedule/Schedule";



function App() {
  return (
    <>
      <Routes>
        <Route path ="schedule" element ={<Schedule/>}/>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teams" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactUsUtkansh26 />} />
      </Routes>
    </>
  );
}

export default App;
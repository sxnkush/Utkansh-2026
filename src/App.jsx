import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Gallery from "./pages/gallery/gallery";
import DevelopersPage from "./pages/teams/Teams";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/teams" element={<DevelopersPage/>} />
      </Routes>
    </>
  );
}

export default App;

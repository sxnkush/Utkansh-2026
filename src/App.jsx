import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Gallery from "./pages/gallery/gallery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;

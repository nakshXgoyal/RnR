import Home from "./pages/Home/Home";
import SpotDetail from "./pages/SpotDetail/SpotDetail";
import Spots from "./pages/Spots/Spots";
import GuideRequest from "./pages/GuideRequest/GuideRequest";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/spots" element={<Spots />}/>
        <Route path="/guide-request" element={<PrivateRoute><GuideRequest /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/spots/:spotId" element={<SpotDetail />} />
        <Route path="/about" element={<About />}/>   
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

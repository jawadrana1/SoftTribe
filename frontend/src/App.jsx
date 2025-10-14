import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  
  const hideLayout = window.location.pathname.includes("/admin") || window.location.pathname.includes("/dashboard");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<AdminLogin onLogin={setIsLoggedIn} />} />
  {isLoggedIn && (
    <Route path="/dashboard" element={<AdminDashboard />} />
  )}
      </Routes>
      
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;

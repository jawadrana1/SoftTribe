import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" },
  ];
  return (
    <nav className="bg-white/95 backdrop-blur fixed top-0 w-full z-50 shadow border-b border-gray-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SoftTribe Logo" className="h-9 w-9" />
          <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">SoftTribe</h1>
        </div>
        {/* Desktop Nav */}
  <ul className="hidden md:flex space-x-8 text-indigo-700 font-semibold text-lg">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link to={link.to} className="hover:text-indigo-500 transition-colors duration-200">
                {link.label}
                <span className="block h-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span className={`block w-7 h-1 rounded bg-indigo-700 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-1 rounded bg-indigo-700 transition-all ${open ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-1 rounded bg-indigo-700 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white/95 shadow border-b border-gray-100 flex flex-col items-center py-6 md:hidden animate-fade-in z-50">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 px-6 text-lg font-semibold text-indigo-700 hover:bg-indigo-50 rounded transition-all w-full text-center"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

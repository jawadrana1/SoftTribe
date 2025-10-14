import { motion } from "framer-motion";
import heroBg from "../assets/hero-bg.jpg";
import { clientLogos, services, testimonials } from "../assets/homepageData";
import { useState, useRef, useEffect } from "react";


export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const heroRef = useRef(null);

  // Parallax effect for hero background
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section with animated gradient overlay */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-indigo-700/80 via-indigo-500/60 to-indigo-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-xl tracking-tight font-sans" style={{letterSpacing: "-0.03em"}}>
            We Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500">Digital Experiences</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow font-medium">
            SoftTribe is a creative software agency offering web, app, design & marketing solutions.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
            className="bg-white/80 text-indigo-700 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white/100 transition-all text-lg backdrop-blur-md border border-white/30"
            style={{backdropFilter: "blur(8px)"}}
          >
            Get Started
          </motion.a>
        </motion.div>
        {/* Floating CTA - now links to contact page */}
        <a href="/contact?startProject=true" className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg hover:scale-105 transition-all animate-bounce hidden md:inline-block">
          Start a Project
        </a>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {clientLogos.map((logo, i) => (
            <img key={i} src={logo} alt="Client logo" className="h-12 w-auto grayscale opacity-80 hover:opacity-100 transition" loading="lazy" />
          ))}
        </div>
      </section>

      {/* Services Section with glassmorphism */}
      <section id="services" className="py-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-700 tracking-tight">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all border border-white/30" style={{boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)"}}>
                <span className="text-5xl mb-4 drop-shadow-lg">{s.icon}</span>
                <h3 className="font-bold text-xl mb-2 text-indigo-700 tracking-tight">{s.title}</h3>
                <p className="text-gray-700 text-base font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with glassmorphism */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 tracking-tight">What Our Clients Say</h2>
          <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10 flex flex-col items-center border border-white/30" style={{boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)"}}>
            <button onClick={prevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-700 text-2xl bg-white/60 rounded-full px-2 py-1 shadow transition-all">&#8592;</button>
            <div>
              <p className="text-xl text-gray-700 mb-4 font-medium italic">“{testimonials[testimonialIdx].text}”</p>
              <div className="font-bold text-indigo-700 text-lg">{testimonials[testimonialIdx].name}</div>
              <div className="text-gray-500 text-base">{testimonials[testimonialIdx].company}</div>
            </div>
            <button onClick={nextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-700 text-2xl bg-white/60 rounded-full px-2 py-1 shadow transition-all">&#8594;</button>
          </div>
        </div>
      </section>

      {/* Project Inquiry Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-indigo-600 to-pink-500 text-white text-center">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <span className="text-5xl mb-2 animate-pulse">�</span>
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Start Your Project</h2>
            <p className="mb-4 text-indigo-100 font-medium">Ready to build something amazing? Tell us about your project and let's get started!</p>
          </div>
          <a href="/contact?startProject=true" className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 text-lg shadow-lg">
            <span>Contact Us &rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}


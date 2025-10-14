
import { motion } from "framer-motion";
import contact from "../assets/contact.jpg";
import { useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();
  const isProjectInquiry = location.search.includes("startProject=true");

  // const recaptchaRef = useRef();
  // const [recaptchaToken, setRecaptchaToken] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", project: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // const handleRecaptcha = useCallback((token) => {
  //   setRecaptchaToken(token);
  // }, []);

  const handleChange = useCallback((e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFeedback("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", message: "" });
      setRecaptchaToken("");
    }, 1200);
  };

  return (
    <section
      className="relative py-24 text-white text-center mt-20 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500"
      style={{
        backgroundImage: `url(${contact})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        className="relative z-10 px-6 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">{isProjectInquiry ? "Start a Project" : "Get In Touch"}</h2>
        <p className="mb-8 text-gray-200">
          {isProjectInquiry
            ? "Tell us about your project and our team will get in touch to help you bring it to life."
            : "Have a project in mind? Let’s build something great together."}
        </p>
        <div className="mb-8 flex flex-col items-center gap-2 text-indigo-100 text-base">
          <span>Email: <a href="mailto:jawad.softwareengineer@gmail.com" className="underline hover:text-white">jawad.softwareengineer@gmail.com</a></span>
          <span>Phone: <a href="https://wa.me/923183695232" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">+92 318 3695232 (WhatsApp)</a></span>
        </div>
        <form className="flex flex-col space-y-4 bg-white/80 p-6 rounded-2xl shadow-xl" autoComplete="off" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {isProjectInquiry && (
            <textarea
              name="project"
              placeholder="Tell us about your project (goals, timeline, budget, etc.)"
              rows={4}
              className="p-3 rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={form.project}
              onChange={handleChange}
              required
            />
          )}
          <textarea
            name="message"
            placeholder={isProjectInquiry ? "Additional Message (optional)" : "Your Message"}
            rows={isProjectInquiry ? 3 : 4}
            className="p-3 rounded-lg text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={form.message}
            onChange={handleChange}
            required={!isProjectInquiry}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center"
            disabled={loading}
            type="submit"
          >
            {loading ? <span className="loader mr-2"></span> : null} {isProjectInquiry ? "Start Project" : "Send Message"}
          </motion.button>
          {feedback && <div className="text-green-700 font-semibold mt-2">{feedback}</div>}
        </form>
      </motion.div>
    </section>
  );
}

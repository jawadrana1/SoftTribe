import { motion } from "framer-motion";
import team from "../assets/team.jpg";

export default function About() {
  return (
    <section className="py-24 mt-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src={team}
          alt="SoftTribe Team"
          className="rounded-2xl shadow-lg"
          loading="lazy"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-lg">About SoftTribe</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are a digital software agency passionate about creating impactful digital products.<br/>
            Our team of designers, developers, and marketers collaborate to bring your ideas to life —
            ensuring quality, creativity, and innovation at every step.
          </p>
          <a href="/contact" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition-all">Contact Us</a>
        </motion.div>
      </div>
    </section>
  );
}

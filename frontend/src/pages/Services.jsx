import { motion } from "framer-motion";
import webDev from "../assets/web-dev.jpg";
import appDev from "../assets/app-dev.jpg";
import design from "../assets/graphic-design.jpg";
import marketing from "../assets/marketing.jpg";

const services = [
  { title: "Web Development", img: webDev, desc: "Modern and responsive websites built with the latest tech." },
  { title: "App Development", img: appDev, desc: "Cross-platform mobile applications with clean UI/UX." },
  { title: "Graphic Design", img: design, desc: "Creative visuals that make your brand stand out." },
  { title: "Digital Marketing", img: marketing, desc: "Boost your business with smart marketing strategies." },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50 text-center mt-20">
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <img src={s.img} alt={s.title} className="h-40 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

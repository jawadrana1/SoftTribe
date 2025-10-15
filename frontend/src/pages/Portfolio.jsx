import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiBase";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
  const res = await axios.get(`${API_BASE_URL}/api/portfolio`);
        setProjects(res.data.data); // matches backend response
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-white text-center px-10">
      <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Portfolio</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={p.image ? `${API_BASE_URL}/${p.image}` : "/fallback.jpg"}
                alt={p.title}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.description}</p>
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 mt-3 hover:underline"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

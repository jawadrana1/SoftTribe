import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      await axios.post("http://localhost:5000/api/portfolio", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Project uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        techStack: "",
        liveLink: "",
        githubLink: "",
        image: null,
      });
    } catch (err) {
      setMessage("Error uploading project.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
      {message && (
        <p className="text-center mb-4 text-green-600 font-medium">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border p-2 rounded-md"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="Tech Stack (comma separated)"
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          placeholder="Live Link"
          className="w-full border p-2 rounded-md"
        />
        <input
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          placeholder="GitHub Link"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Upload Project
        </button>
      </form>
    </div>
  );
}

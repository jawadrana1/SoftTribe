import express from "express";
import Portfolio from "../models/Portfolio.js";
import upload from "../middleware/uploadMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images statically
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// @desc   Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Portfolio.find();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// @desc   Add new project with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, techStack, liveLink, githubLink } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.png";


    const newProject = await Portfolio.create({
      title,
      description,
      techStack: Array.isArray(techStack)
  ? techStack
  : techStack
  ? techStack.split(",")
  : [],

      liveLink,
      githubLink,
      image: imagePath,
    });

    res.json({ success: true, data: newProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;


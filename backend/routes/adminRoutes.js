import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Dummy admin credentials
const ADMIN_EMAIL = "admin@softtribe.com";
const ADMIN_PASSWORD = "SoftTribe@123";

// POST /api/admin/login
router.post("/admin", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "softtribe_secret", {
      expiresIn: "1h",
    });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;

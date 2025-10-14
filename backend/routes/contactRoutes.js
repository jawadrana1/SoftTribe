
import express from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { submitContact, getContacts } from "../controllers/contactController.js";
import { markContactRead } from "../controllers/markContactReadController.js";
import { deleteContact, archiveContact } from "../controllers/deleteArchiveContactController.js";
import { replyToContact } from "../controllers/replyToContactController.js";

const router = express.Router();

// Rate limiting: 5 requests per hour per IP
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: "Too many contact form submissions from this IP, please try again after an hour." },
});

// POST /api/contact/:id/reply
router.post(":id/reply", replyToContact);
// DELETE /api/contact/:id
router.delete(":id", deleteContact);
// PATCH /api/contact/:id/archive
router.patch(":id/archive", archiveContact);

// Validation middleware for contact form
const validateContact = [
	body("name").trim().notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("message").trim().notEmpty().withMessage("Message is required"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, errors: errors.array() });
		}
		next();
	},
];

router.post("/", contactRateLimiter, validateContact, submitContact); // POST /api/contact
router.get("/", getContacts);    // GET /api/contact

// PATCH /api/contact/:id/read
router.patch("/:id/read", markContactRead);

export default router;

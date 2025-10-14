import Contact from "../models/Contact.js";
import { sendAdminNotification } from "../utils/mailer.js";
import { verifyRecaptcha } from "../utils/recaptcha.js";

// @desc    Save contact form submission
// @route   POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message, recaptchaToken } = req.body;

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ success: false, message: "reCAPTCHA verification failed" });
    }

    const contact = await Contact.create({ name, email, message });
    // Send email notification to admin
    try {
      await sendAdminNotification({ name, email, message });
    } catch (mailErr) {
      console.error("Failed to send admin notification email:", mailErr);
    }
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (for admin view)
// @route   GET /api/contact
export const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

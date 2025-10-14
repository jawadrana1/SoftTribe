import Contact from "../models/Contact.js";
import { sendContactReply } from "../utils/mailer.js";

// @desc    Admin replies to a contact message
// @route   POST /api/contact/:id/reply
export const replyToContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    await sendContactReply({
      to: contact.email,
      subject: subject || "Reply from SoftTribe Admin",
      message,
    });
    res.status(200).json({ success: true, message: "Reply sent successfully" });
  } catch (error) {
    next(error);
  }
};

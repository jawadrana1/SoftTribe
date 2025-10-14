import Contact from "../models/Contact.js";

// @desc    Mark a contact message as read/unread
// @route   PATCH /api/contact/:id/read
export const markContactRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read: !!read },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

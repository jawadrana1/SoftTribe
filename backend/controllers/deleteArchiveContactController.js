import Contact from "../models/Contact.js";

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive a contact message
// @route   PATCH /api/contact/:id/archive
export const archiveContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { archived: true },
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

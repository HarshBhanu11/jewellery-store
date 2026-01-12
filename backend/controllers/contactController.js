import ContactMessage from "../models/ContactMessage.js";

// Save message (from website)
export const addMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all messages (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read/unread
export const markMessage = async (req, res) => {
  try {
    const { isRead } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

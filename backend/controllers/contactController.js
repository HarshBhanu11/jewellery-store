import ContactMessage from "../models/ContactMessage.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log("Contact form error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

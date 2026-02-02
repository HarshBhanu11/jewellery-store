import ContactMessage from "../models/ContactMessage.js";
import { sendCustomerMail, sendOwnerMail } from "../utils/mailer.js";

// Save message (from website) + send emails
export const addMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save to DB
    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      message
    });

    await newMessage.save();

    // Send emails
    try {
      await sendCustomerMail({ name, email });
      console.log("Customer email sent to", email);
      await sendOwnerMail({ name, email, phone, message });
      console.log("Owner email sent");
    } catch (mailError) {
      console.error("Email error:", mailError);
    }
    

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

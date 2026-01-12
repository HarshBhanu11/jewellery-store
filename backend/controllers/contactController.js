import Contact from "../models/Contact.js";

// Save message (from website)
export const addMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({success:true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

// Get all messages (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

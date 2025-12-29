import Contact from "../models/ContactMessage.js";

export const addMessage = async (req, res) => {
  const message = new Contact(req.body);
  await message.save();
  res.json({ message: "Message received" });
};

export const getMessages = async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
};

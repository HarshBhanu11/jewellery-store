import nodemailer from "nodemailer";
console.log("SMTP HOST:", process.env.SMTP_HOST);
console.log("SMTP PORT:", process.env.SMTP_PORT);
console.log("SMTP USER:", process.env.SMTP_USER);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendCustomerMail = async ({ name, email }) => {
  await transporter.sendMail({
    from: `"Jewellery Store" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "We received your message 💍",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
      <p>— Jewellery Store Team</p>
    `
  });
};

export const sendOwnerMail = async ({ name, email, phone, message }) => {
  await transporter.sendMail({
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: "📩 New Contact Message Received",
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  });
};

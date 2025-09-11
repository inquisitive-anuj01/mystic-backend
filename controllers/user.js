import User from "../schema/userSchema.js"
import { sendMail } from "../utils/mailer.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate
    if (!name || !email)
      return res.status(400).json({ message: "Name and Email required" });

    // Save to DB
    const user = await User.create({ name, email });

    // Admin Email
    const adminMsg = `
      <h2>New Registration for Healing</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p>This person has registered for healing via Mystic Healers Landing page.</p>
    `;

    // User Email
    const userMsg = `
      <h2>Thank You for Your Interest!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for showing interest in our healing process. We will get in touch with you shortly!</p>
      <p>Warm Regards,<br/>Mystic Healers Team</p>
    `;

    // Send both emails in parallel
    await Promise.all([
      sendMail(`anujgupta1532003@gmail.com`, "New Healing Registration", adminMsg),
      sendMail(email, "Thank You for Registering!", userMsg)
    ]);

    // Respond immediately
    res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

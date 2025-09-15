import User from "../schema/userSchema.js";
import { sendMail } from "../utils/mailer.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email required" });
    }

    // Save to DB
    const user = await User.create({ name, email });

    res.status(201).json({ message: "Registration successful!" });

    const userMsg = `
      <div style="
          font-family: Arial, sans-serif;
          background:#ffffff;
          color:#333;
          padding:40px;
          margin:0;
          font-size:15px;
          line-height:1.6;
          text-align:left;
          max-width:700px;
          margin:0 auto;
      ">
          <p>Dear ${name},</p>

          <p>
            Thank you for sharing your email with us and taking the first step toward your healing journey!
          </p>

          <p>
            We’re creating a space where you’ll be able to connect with trusted spiritual healers and explore powerful modalities like 
            <b>Reiki, Pranic Healing, Akashic Records, Past Life Regression, Tarot, and more.</b>
          </p>

          <p>
            Whether you’re seeking <b>clarity, peace, or emotional balance</b>, our upcoming platform will give you access to sessions designed to help you heal, grow, and transform.
          </p>

          <p>
            You’ll be among the first to know the moment our website goes live so you can book your healing sessions with ease. Until then, stay tuned for updates from us!
          </p>

          <br/>
          <p><b>With Love and Gratitude,<br/>The Mystic Healers Team</b></p>
      </div>
    `;

    sendMail(
      email,
      "Thank you for joining our Healing Community",
      userMsg
    ).catch((err) => console.error("Mail sending failed:", err));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

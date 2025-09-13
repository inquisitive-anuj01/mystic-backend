import User from "../schema/userSchema.js";
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


const userMsg = `
  <table width="100%" cellspacing="0" cellpadding="0" border="0" 
    style="background-color:#ffffff; padding:40px; font-family: Arial, sans-serif; color:#333;">
    <tr>
      <td align="center">
        <table width="600" cellspacing="0" cellpadding="0" border="0" 
          style="background-color:#ffffff; border-radius:12px; padding:30px; 
                 background-image: url('https://res.cloudinary.com/dzvwqhzgf/image/upload/v1757405404/Untitled_design_58_udmbsi.png');
                 background-repeat: no-repeat;
                 background-position: center center;
                 background-size: 120px; /* smaller logo */">
          
          <tr>
            <td style="color:#333; font-size:15px; line-height:1.6;">
              
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

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;



    // Send both emails in parallel
    await Promise.all([
      sendMail(
        `anujgupta1532003@gmail.com`,
        "New Healing Registration",
        adminMsg
      ),
      sendMail(email, "Thank you for joining our Healing Community", userMsg),
    ]);

    // Respond immediately
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

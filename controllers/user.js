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
// Admin Email
const adminMsg = `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; color:#333; padding:20px;">
    
    <!-- Header -->
    <div style="text-align:center; padding:15px; background:#4B0082; color:#fff; border-radius:6px;">
      <h2 style="margin:0;">✨ New Healing Registration ✨</h2>
    </div>
    
    <!-- Body -->
    <div style="margin-top:20px; font-size:15px; line-height:1.6;">
      <p>Hello <b>Sagar Banerjee</b>,</p>
      
      <p>A new user has just registered for healing through the <b>Mystic Healers Landing Page</b>.  
      Here are the details:</p>
      
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      
      <p style="margin-top:20px;">Please reach out to them if necessary, or keep this record for future sessions.</p>
    </div>
    
    <!-- Footer -->
    <div style="margin-top:30px; text-align:center; font-size:13px; color:#666;">
      <p>— Mystic Healers Admin Notification System —</p>
    </div>
    
  </div>
`;


const userMsg = `
  <div style="font-family: Arial, sans-serif; background:#ffffff; color:#333; padding:0; margin:0;">

    <!-- Banner with Logo -->
    <div style="width:100%; background:#f4f4f4; text-align:center; padding:20px 0;">
      <img src="https://res.cloudinary.com/dzvwqhzgf/image/upload/v1757405404/Untitled_design_58_udmbsi.png" 
           alt="The Mystic Healers Logo" 
           style="max-width:150px; height:auto;" />
    </div>

    <!-- Message Body -->
    <div style="padding:30px; font-size:15px; line-height:1.6;">
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

  </div>
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

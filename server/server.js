const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/register", async (req, res) => {
  const { fullName, email, phone } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New User Registration: ${fullName}`,
      text: `
        New registration received:
        
        Full Name: ${fullName}
        Email: ${email}
        Phone Number: ${phone}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Registration Successful & Email Sent" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Error sending email. Please check server configuration." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

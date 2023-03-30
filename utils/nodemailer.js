const nodemailer = require("nodemailer");
const generateToken = require("./../helper/token");

module.exports = sendMail = async (email, tokenLength) => {
  const token = generateToken(tokenLength);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Account verification code",
      text: token,
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

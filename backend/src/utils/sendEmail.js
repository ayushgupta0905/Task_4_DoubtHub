
const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "DoubtHub OTP Verification",
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    });
};

module.exports = sendEmail;
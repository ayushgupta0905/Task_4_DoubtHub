const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "DoubtHub OTP Verification",
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`
        });

        console.log("OTP email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("OTP email failed:", error.code, error.message);
        throw error;
    } finally {
        transporter.close();
    }
};

module.exports = sendEmail;
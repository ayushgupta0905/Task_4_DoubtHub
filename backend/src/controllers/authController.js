
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            college,
            branch,
            password,
            confirmPassword,
            year,
            graduationYear,
            domain
        } = req.body;

        if (
            !name ||
            !email ||
            !college ||
            !branch ||
            !password ||
            !confirmPassword ||
            !year ||
            !graduationYear ||
            !domain
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const user = await User.create({
            name,
            email: normalizedEmail,
            college,
            branch,
            password: hashedPassword,
            year,
            graduationYear,
            domain,
            otp,
            otpExpires: new Date(Date.now() + 10 * 60 * 1000)
        });

        try {
            await sendEmail(normalizedEmail, otp);
        } catch (emailError) {
            await User.findByIdAndDelete(user._id);

            console.error("OTP email error:", emailError);

            return res.status(500).json({
                message: "Failed to send OTP email. Please try again."
            });
        }

        return res.status(201).json({
            message: "OTP sent to your email. Verify it to complete signup."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found. Please sign up again."
            });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({
                message: "No active OTP found. Please sign up again."
            });
        }

        if (user.otpExpires.getTime() < Date.now()) {
            return res.status(400).json({
                message: "OTP expired. Please sign up again."
            });
        }

        if (user.otp !== String(otp).trim()) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Email verified and signup successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                graduationYear: user.graduationYear,
                points: user.points,
                domain: user.domain
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, domain } = req.body;

        if (!email || !password || !domain) {
            return res.status(400).json({
                message: "Email, password and domain are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // OTP pending hone par login allow mat karo.
        if (user.otp && user.otpExpires) {
            return res.status(403).json({
                message: "Please verify your email OTP before logging in"
            });
        }

        if (user.domain !== domain) {
            return res.status(401).json({
                message: "Selected domain does not match your account"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                graduationYear: user.graduationYear,
                domain: user.domain,
                points: user.points
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


const getProfile = async (req, res) => {
    return res.status(200).json({
        user: req.user
    });
};


module.exports = {
    signup,
    verifyOTP,
    login,
    getProfile
};


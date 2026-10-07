const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const otp = generateOTP();

        await User.updateOne(
            { email },
            {
                otp: otp,
                otpExpires: new Date(Date.now() + 10 * 60 * 1000)
            }
        );

        await sendEmail(
            email,
            "DoubtHub OTP Verification",
            `Your OTP for DoubtHub is ${otp}. This OTP is valid for 10 minutes.`
        );

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.log("FULL OTP ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message
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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({
                message: "No OTP requested"
            });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        if (user.otp !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        await User.updateOne(
            { _id: user._id },
            {
                $unset: {
                    otp: "",
                    otpExpires: ""
                }
            }
        );

        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        res.status(500).json({
            message: "Failed to verify OTP"
        });
    }
};


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

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            college,
            branch,
            password: hashedPassword,
            year,
            graduationYear,
            domain
        });

        const token = generateToken(user._id);

        res.status(201).json({
            message: "Signup successful",
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

        res.status(500).json({
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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
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

        res.status(200).json({
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

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getProfile = async (req, res) => {
    res.status(200).json({
        user: req.user
    });
};


module.exports = {
    signup,
    login,
    getProfile,
    sendOTP,
    verifyOTP
};
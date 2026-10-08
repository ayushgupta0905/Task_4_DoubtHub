const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


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
    
};
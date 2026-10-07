const mongoose = require("mongoose");

const domains = [
    "AI/ML",
    "DSA",
    "Python",
    "Frontend",
    "Backend",
    "Cyber Security",
    "ML",
    "Web Development"
];

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        points: {
            type: Number,
            default: 0
        },

        otp: {
            type: String
        },

        otpExpires: {
            type: Date
        },

        college: {
            type: String,
            required: true,
            trim: true
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: String,
            required: true
        },

        graduationYear: {
            type: String,
            required: true
        },

        domain: {
            type: String,
            required: true,
            enum: domains
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
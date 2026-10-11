
const mongoose = require("mongoose");

const domain = [
    "Backend",
    "Frontend",
    "AI/ML",
    "DSA",
    "Python",
    "Cyber Security",
    "Machine Learning"
];

// User Schema
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
        college: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        graduationYear: {
            type: Number,
            required: true
        },
        domain: {
            type: String,
            enum: domain,
            required: true
        },
        points: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);

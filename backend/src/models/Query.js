const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        domain: {
            type: String,
            required: true,
            enum: [
                "AI/ML",
                "DSA",
                "Python",
                "Frontend",
                "Backend",
                "Cyber Security",
                "ML",
                "Web Devlopment"

            ]
        },

        tags: {
            type: [String],
            default: []
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open"
        },

        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Query", querySchema);
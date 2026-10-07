const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },

        queryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Query",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isAccepted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Answer", answerSchema);
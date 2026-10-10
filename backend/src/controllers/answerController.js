const Answer = require("../models/Answer");
const Query = require("../models/Query");


const createAnswer = async (req, res) => {
    try {
        const { content } = req.body;
        const { queryId } = req.params;

        if (!content || !content.trim()) {
            return res.status(400).json({
                message: "Answer content is required"
            });
        }

        const query = await Query.findById(queryId);

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        const answer = await Answer.create({
            content: content.trim(),
            queryId,
            userId: req.user._id
        });

        const populatedAnswer = await Answer.findById(answer._id)
            .populate("userId", "name");

        res.status(201).json({
            message: "Answer posted successfully",
            answer: populatedAnswer
        });

    } catch (error) {
        console.error("Create answer error:", error);

        res.status(500).json({
            message: "Failed to post answer"
        });
    }
};



const getAnswersByQuery = async (req, res) => {
    try {
        const { queryId } = req.params;

        const answers = await Answer.find({ queryId })
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: answers.length,
            answers
        });

    } catch (error) {
        console.error("Get answers error:", error);

        res.status(500).json({
            message: "Failed to fetch answers"
        });
    }
};



const getMyAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({
            userId: req.user._id
        })
            .populate("queryId", "title")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: answers.length,
            answers
        });

    } catch (error) {
        console.error("Get my answers error:", error);

        res.status(500).json({
            message: "Failed to fetch your answers"
        });
    }
};



const deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({
                message: "Answer not found"
            });
        }

        if (answer.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can delete only your own answer"
            });
        }

        await answer.deleteOne();

        res.status(200).json({
            message: "Answer deleted successfully"
        });

    } catch (error) {
        console.error("Delete answer error:", error);

        res.status(500).json({
            message: "Failed to delete answer"
        });
    }
};



const acceptAnswer = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json({
                message: "Answer not found"
            });
        }

        const query = await Query.findById(answer.queryId);

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        // Only question owner can accept an answer
        if (query.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Only the question owner can accept an answer"
            });
        }

        // Remove accepted status from other answers
        await Answer.updateMany(
            { queryId: query._id },
            { isAccepted: false }
        );

        answer.isAccepted = true;
        await answer.save();

        res.status(200).json({
            message: "Answer accepted successfully",
            answer
        });

    } catch (error) {
        console.error("Accept answer error:", error);

        res.status(500).json({
            message: "Failed to accept answer"
        });
    }
};


module.exports = {
    createAnswer,
    getAnswersByQuery,
    getMyAnswers,
    deleteAnswer,
    acceptAnswer
};
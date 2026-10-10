const Query = require("../models/Query");
const User = require("../models/User");

const {
    getPrediction,
    getRecommendations
} = require("../services/mlService");


// Create new query
const createQuery = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        // Model 1 predicts the domain
        const prediction = await getPrediction(
            title + " " + description
        );

        const query = await Query.create({
            title,
            description,
            domain: prediction,
            userId: req.user._id
        });

        res.status(201).json({
            message: "Question posted successfully",
            query
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create question"
        });
    }
};


// Get all questions
const getQueries = async (req, res) => {
    try {
        const queries = await Query.find()
            .populate("userId", "name email domain")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: queries.length,
            queries
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch questions"
        });
    }
};


// Get questions from user's domain
const getInbox = async (req, res) => {
    try {
        const queries = await Query.find({
            domain: req.user.domain,
            userId: { $ne: req.user._id }
        })
            .populate("userId", "name email domain")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: queries.length,
            domain: req.user.domain,
            queries
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch inbox"
        });
    }
};


// Get current user's questions
const getMyQueries = async (req, res) => {
    try {
        const queries = await Query.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: queries.length,
            queries
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch your questions"
        });
    }
};


// Get single question
const getQueryById = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
            .populate("userId", "name email domain")
            .populate("resolvedBy", "name email");

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.status(200).json({
            query
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch question"
        });
    }
};


// Resolve question
const resolveQuery = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        if (query.status === "resolved") {
            return res.status(400).json({
                message: "Question is already resolved"
            });
        }

        if (query.userId.toString() === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot resolve your own question"
            });
        }

        query.status = "resolved";
        query.resolvedBy = req.user._id;
        query.resolvedAt = new Date();

        await query.save();

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $inc: { points: 10 }
            }
        );

        res.status(200).json({
            message: "Question resolved successfully",
            pointsEarned: 10,
            query
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to resolve question"
        });
    }
};


// Get similar questions from ML model
const getSimilarQueries = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        const similarQueries = await getRecommendations(
            query.title + " " + query.description
        );

        res.status(200).json({
            count: similarQueries.length,
            queries: similarQueries
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to find similar questions"
        });
    }
};


// Model 1 - Predict domain
const predictDomain = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                message: "Query is required"
            });
        }

        const prediction = await getPrediction(query);

        res.status(200).json({
            prediction
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to predict domain"
        });
    }
};


// Model 2 - Recommend questions
const recommendQueries = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                message: "Query is required"
            });
        }

        const recommendations = await getRecommendations(query);

        res.status(200).json({
            count: recommendations.length,
            recommendations
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get recommendations"
        });
    }
};


module.exports = {
    createQuery,
    getQueries,
    getInbox,
    getMyQueries,
    getQueryById,
    resolveQuery,
    getSimilarQueries,
    predictDomain,
    recommendQueries
};
const Bookmark = require("../models/Bookmark");
const Query = require("../models/Query");

// Add bookmark
const addBookmark = async (req, res) => {
    try {
        const { queryId } = req.params;

        const query = await Query.findById(queryId);

        if (!query) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        const existingBookmark = await Bookmark.findOne({
            userId: req.user._id,
            queryId
        });

        if (existingBookmark) {
            return res.status(400).json({
                message: "Question already bookmarked"
            });
        }

        const bookmark = await Bookmark.create({
            userId: req.user._id,
            queryId
        });

        res.status(201).json({
            message: "Question bookmarked successfully",
            bookmark
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to bookmark question"
        });
    }
};


// Remove bookmark
const removeBookmark = async (req, res) => {
    try {
        const { queryId } = req.params;

        const bookmark = await Bookmark.findOneAndDelete({
            userId: req.user._id,
            queryId
        });

        if (!bookmark) {
            return res.status(404).json({
                message: "Bookmark not found"
            });
        }

        res.status(200).json({
            message: "Bookmark removed successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to remove bookmark"
        });
    }
};


// Get my bookmarks
const getMyBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({
            userId: req.user._id
        })
            .populate("queryId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: bookmarks.length,
            bookmarks
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch bookmarks"
        });
    }
};


module.exports = {
    addBookmark,
    removeBookmark,
    getMyBookmarks
};
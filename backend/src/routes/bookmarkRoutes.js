const express = require("express");

const {
    addBookmark,
    removeBookmark,
    getMyBookmarks
} = require("../controllers/bookmarkController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add bookmark
router.post("/:queryId", authMiddleware, addBookmark);

// Remove bookmark
router.delete("/:queryId", authMiddleware, removeBookmark);

// Get my bookmarks
router.get("/", authMiddleware, getMyBookmarks);


module.exports = router;
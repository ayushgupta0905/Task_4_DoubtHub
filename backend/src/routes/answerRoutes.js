const express = require("express");

const {
    createAnswer,
    getAnswersByQuery,
    getMyAnswers,
    deleteAnswer,
    acceptAnswer
} = require("../controllers/answerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:queryId", authMiddleware, createAnswer);

router.get("/my", authMiddleware, getMyAnswers);

router.get("/:queryId", getAnswersByQuery);

router.delete("/:id", authMiddleware, deleteAnswer);

router.patch("/:id/accept", authMiddleware, acceptAnswer);

module.exports = router;
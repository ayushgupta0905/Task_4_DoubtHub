const express = require("express");

const {
    createQuery,
    getQueries,
    getInbox,
    getMyQueries,
    getQueryById,
    resolveQuery,
    getSimilarQueries,
    predictDomain,
    recommendQueries
} = require("../controllers/queryControllers");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createQuery);

router.get("/", getQueries);

router.post("/predict", authMiddleware, predictDomain);

router.post("/recommend", authMiddleware, recommendQueries);

router.get("/inbox", authMiddleware, getInbox);

router.get("/my", authMiddleware, getMyQueries);

router.get("/:id/similar", authMiddleware, getSimilarQueries);

router.patch("/:id/resolve", authMiddleware, resolveQuery);

router.get("/:id", getQueryById);

module.exports = router;
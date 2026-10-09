const express = require("express");

const {
    signup,
    verifyOTP,
    login,
    getProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;

const express = require("express");

const {
    getDomains,
    getDomain
} = require("../controllers/domainControllers");

const router = express.Router();

router.get("/", getDomains);

router.get("/:name", getDomain);

module.exports = router;
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const queryRoutes = require("./src/routes/queryRoutes");
const domainRoutes = require("./src/routes/domainroutes");
const bookmarkRoutes = require("./src/routes/bookmarkRoutes");
const answerRoutes = require("./src/routes/answerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "DoubtHub backend is running"
    });
});

module.exports = app;
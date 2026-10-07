const Domain = require("../models/Domain");

//  all domains
const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find().sort({ name: 1 });

        res.status(200).json({
            domains
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch domains"
        });
    }
};


//  one domain
const getDomain = async (req, res) => {
    try {
        const domain = await Domain.findOne({
            name: req.params.name
        });

        if (!domain) {
            return res.status(404).json({
                message: "Domain not found"
            });
        }

        res.status(200).json({
            domain
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch domain"
        });
    }
};


module.exports = {
    getDomains,
    getDomain
};
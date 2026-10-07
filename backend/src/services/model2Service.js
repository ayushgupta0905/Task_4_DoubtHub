const getRecommendations = async (query) => {
    try {
        const response = await fetch(
            "https://task-4-doubthub.onrender.com/recommend",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Query: query
                })
            }
        );

        if (!response.ok) {
            throw new Error("Recommendation API failed");
        }

        const data = await response.json();

        return data.recommendations;

    } catch (error) {
        console.error("Model 2 error:", error);
        throw error;
    }
};

module.exports = getRecommendations;
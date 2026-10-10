const getPrediction = async (query) => {
    try {
        const response = await fetch(
            "https://task-4-doubthub.onrender.com/predict",
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
            throw new Error("Prediction API failed");
        }

        const data = await response.json();

        return data.prediction;

    } catch (error) {
        console.error("Model 1 error:", error);
        throw error;
    }
};

module.exports = getPrediction;
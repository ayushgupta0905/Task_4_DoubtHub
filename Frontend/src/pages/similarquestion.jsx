import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { predictDomain, getMLRecommendations } from "../api/api";

function SimilarQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "How to reverse a binary tree";

  const [queryText, setQueryText] = useState(initialQuery);
  const [predictedDomain, setPredictedDomain] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRunMlClustering = async (targetQuery) => {
    const q = targetQuery || queryText;
    if (!q.trim()) return;

    try {
      setLoading(true);
      setError("");

      // 1. ML Model 1: Domain Classification
      const domain = await predictDomain(q);
      setPredictedDomain(domain);

      // 2. ML Model 2: Similar Queries Clustering
      const recs = await getMLRecommendations(q);
      setRecommendations(recs);
    } catch (err) {
      setError(err.message || "Failed to fetch ML recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRunMlClustering(initialQuery);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRunMlClustering(queryText);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#fef3c7",
              color: "#b45309",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            ⚡ Machine Learning Service
          </div>
          <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#0f172a", margin: "4px 0" }}>
            AI/ML Doubt Classifier & Clustering Engine
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "600px", margin: "8px auto 0" }}>
            Enter any programming doubt or question to run Model 1 (Domain Classification) and Model 2 (Similar Queries Recommender).
          </p>
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            gap: "12px",
            maxWidth: "760px",
            margin: "0 auto 36px",
          }}
        >
          <input
            type="text"
            placeholder="Type your question (e.g. Binary Search Tree, JWT tokens, React hooks)..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1.5px solid #cbd5e1",
              fontSize: "15px",
              outline: "none",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Analyzing..." : "Analyze with ML 🤖"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "14px 20px",
              borderRadius: "12px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Results Overview */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🤖</div>
            <p>Running FastAPI ML Models (Domain Classifier & Clustering)...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "28px" }}>
            {/* Left Card: Model 1 Details */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
                height: "fit-content",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
                Model 1: Domain Classification
              </h3>

              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", color: "#64748b", display: "block" }}>
                  Analyzed Query:
                </span>
                <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                  "{queryText}"
                </strong>
              </div>

              <div
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#1d4ed8", fontWeight: "600" }}>
                  Predicted Technical Domain:
                </span>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#1e40af", marginTop: "4px" }}>
                  {predictedDomain || "General"}
                </div>
              </div>

              <button
                onClick={() => navigate(`/askquestion`)}
                style={{
                  width: "100%",
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Post This Doubt
              </button>
            </div>

            {/* Right Card: Model 2 Clustering Recommendations */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  Model 2: Similar Queries Cluster
                </h3>
                <span
                  style={{
                    backgroundColor: "#f0fdf4",
                    color: "#166534",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {recommendations.length} Matches Found
                </span>
              </div>

              {recommendations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                  No similar queries returned for this prompt.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/searchresults?q=${encodeURIComponent(rec)}`)}
                    >
                      <div>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
                          {rec}
                        </span>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                          Clustered in: <strong>{predictedDomain || "General"}</strong>
                        </div>
                      </div>

                      <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700", flexShrink: 0 }}>
                        Search Doubts →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimilarQuestion;
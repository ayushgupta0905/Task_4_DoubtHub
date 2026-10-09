import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  createQuery,
  predictDomain,
  getMLRecommendations,
  getAuthToken,
} from "../api/api";

function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [predictedDomain, setPredictedDomain] = useState("");
  const [predicting, setPredicting] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check login status
  const token = getAuthToken();

  // Auto predict domain with debounce when user types title and description
  useEffect(() => {
    const combined = `${title} ${description}`.trim();
    if (combined.length < 5) {
      setPredictedDomain("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setPredicting(true);
        const domain = await predictDomain(combined);
        setPredictedDomain(domain);
      } catch {
        // silent
      } finally {
        setPredicting(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [title, description]);

  // Fetch ML recommendations
  const handleGetRecommendations = async () => {
    const combined = `${title} ${description}`.trim();
    if (!combined) {
      setError("Please write a title or description first to find similar questions.");
      return;
    }

    try {
      setLoadingRecommendations(true);
      setError("");
      const recs = await getMLRecommendations(combined);
      setRecommendations(recs);
    } catch (err) {
      setError(err.message || "Failed to load ML recommendations.");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Submit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to post a question. Please login first.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Please fill out both the title and detailed description.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await createQuery({
        title: title.trim(),
        description: description.trim(),
      });

      setSuccess("Question posted successfully! Domain assigned by ML model.");
      setTimeout(() => {
        if (res?.query?._id) {
          navigate(`/questiondetail?id=${res.query._id}`);
        } else {
          navigate("/question");
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to post question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Ask a Public Doubt
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            Be specific and imagine you're asking a question to another student. Our AI/ML classifier will automatically tag your technical domain.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "28px", alignItems: "start" }}>
          {/* Main Form */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
                  Be specific and imagine you are asking a question to another student.
                </p>
                <input
                  type="text"
                  placeholder="e.g. How to implement JWT authentication in Node.js Express backend?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              {/* Description Input */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
                  Detailed Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
                  Introduce the problem, share what code you tried, error messages, and expected outcome.
                </p>
                <textarea
                  rows={8}
                  placeholder="Explain your doubt in detail. Include any relevant error messages or code snippets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                  required
                />
              </div>

              {/* ML Domain Prediction Badge */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "12px",
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>🤖</span>
                    <strong style={{ fontSize: "14px", color: "#166534" }}>
                      AI/ML Model 1 (Domain Classifier):
                    </strong>
                  </div>
                  <span style={{ fontSize: "12px", color: "#15803d" }}>
                    {predicting
                      ? "Analyzing text and predicting domain..."
                      : predictedDomain
                      ? `Classified into: `
                      : "Type your query above to see live ML prediction."}
                  </span>
                  {predictedDomain && !predicting && (
                    <span
                      style={{
                        marginLeft: "6px",
                        backgroundColor: "#166534",
                        color: "#ffffff",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      {predictedDomain}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleGetRecommendations}
                  disabled={loadingRecommendations}
                  style={{
                    backgroundColor: "#0284c7",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {loadingRecommendations ? "Searching..." : "🔍 Check Similar (ML)"}
                </button>
              </div>

              {/* Error & Success */}
              {error && (
                <div
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    marginBottom: "20px",
                    fontWeight: "500",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    marginBottom: "20px",
                    fontWeight: "500",
                  }}
                >
                  ✓ {success}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "14px 28px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  {submitting ? "Posting Doubt..." : "Publish Doubt 🚀"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/question")}
                  style={{
                    backgroundColor: "transparent",
                    color: "#64748b",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "13px 20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar Tips & ML Recommendations */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* ML Recommendations Card */}
            {recommendations.length > 0 && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #e0f2fe",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span>🎯</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0369a1", margin: 0 }}>
                    Similar Doubts (Model 2)
                  </h3>
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                  Check these similar questions before posting, they might already have the answer you need:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "10px 12px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "8px",
                        fontSize: "13px",
                        color: "#0369a1",
                        border: "1px solid #bae6fd",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/searchresults?q=${encodeURIComponent(rec)}`);
                      }}
                    >
                      • {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Writing Good Questions Tips */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "14px" }}>
                💡 Tips for Getting Quick Answers
              </h3>
              <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
                <li>Summarize the specific problem in the title</li>
                <li>Describe what you expected vs what happened</li>
                <li>Include code snippets or stack traces</li>
                <li>Keep code brief and reproducible</li>
                <li>AI/ML classifier will tag the domain automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
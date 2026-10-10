import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import girlWithBook from "../assets/girlwithbook.png";
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
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = getAuthToken();

  // Auto predict domain with debounce as user types
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

  // Fetch ML Model 2 recommendations
  const handleRecommend = async () => {
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
      setShowRecommendations(true);
    } catch (err) {
      setError(err.message || "Failed to load ML recommendations.");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Submit question to backend
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
    <div className="ask-question-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Shared Active Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="ask-question-layout" style={{ maxWidth: "1280px", margin: "24px auto", padding: "0 16px" }}>
        {/* Left Sidebar */}
        <aside className="ask-question-left-sidebar">
          <div className="ask-question-menu">
            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <span>⌂</span>
              Home
            </a>

            <a onClick={() => navigate("/question")} style={{ cursor: "pointer" }}>
              <span>⌕</span>
              Questions
            </a>

            <a
              onClick={() => navigate("/askquestion")}
              className="selected"
              style={{ cursor: "pointer" }}
            >
              <span>⊕</span>
              Ask a Question
            </a>

            <a onClick={() => navigate("/trending")} style={{ cursor: "pointer" }}>
              <span>♨</span>
              Trending
            </a>

            <a onClick={() => navigate("/bookmarks")} style={{ cursor: "pointer" }}>
              <span>♡</span>
              Bookmarks
            </a>

            <a onClick={() => navigate("/myanswers")} style={{ cursor: "pointer" }}>
              <span>▤</span>
              My Answers
            </a>

            <a onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
              <span>♙</span>
              Profile
            </a>
          </div>

          {/* Need Help Card */}
          <div className="ask-question-help-card">
            <div className="ask-question-help-content">
              <h2>Need Help?</h2>
              <p>
                Ask the community and get answers from other college students.
              </p>
              <button onClick={() => navigate("/question")}>
                Browse Questions
              </button>
            </div>

            <img
              src={girlWithBook}
              alt="Student with books"
              className="ask-question-student-image"
            />
          </div>
        </aside>

        {/* Center Main Form */}
        <main className="ask-question-main">
          <div className="ask-question-card">
            <div className="ask-question-heading">
              <h1>Ask a Question</h1>
              <p>
                Get help from the CampusDoubt community. Be clear, detailed, and specific to get the best answers.
              </p>
            </div>

            {/* Error & Success alerts */}
            {error && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginBottom: "16px",
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
                  fontSize: "13px",
                  marginBottom: "16px",
                  fontWeight: "500",
                }}
              >
                ✓ {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="ask-question-field">
                <div className="ask-question-label-row">
                  <label>
                    Title <span>*</span>
                  </label>
                  <small>{title.length}/150</small>
                </div>

                <input
                  type="text"
                  value={title}
                  maxLength={150}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="e.g. How to implement JWT authentication in Node.js Express backend?"
                  required
                />

                <p className="field-help">
                  Be specific and imagine you are asking a doubt to another student.
                </p>
              </div>

              {/* Description Field */}
              <div className="ask-question-field">
                <label>
                  Description <span>*</span>
                </label>

                <div className="description-editor">
                  <div className="editor-toolbar">
                    <select defaultValue="normal">
                      <option value="normal">Normal</option>
                      <option value="heading">Heading</option>
                    </select>

                    <button type="button">
                      <strong>B</strong>
                    </button>
                    <button type="button">
                      <em>I</em>
                    </button>
                    <button type="button">
                      <u>U</u>
                    </button>

                    <span className="toolbar-divider"></span>

                    <button type="button">☷</button>
                    <button type="button">≡</button>

                    <span className="toolbar-divider"></span>

                    <button type="button">🔗</button>
                    <button type="button">&lt;/&gt;</button>
                  </div>

                  <textarea
                    value={description}
                    maxLength={2000}
                    rows={8}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Provide detailed information about your doubt, including what code you tried and any error messages..."
                    required
                  />
                </div>

                <div className="description-counter">
                  {description.length}/2000
                </div>
              </div>

              {/* AI/ML Model 1 Real-time Domain Predictor Badge */}
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>🤖</span>
                    <strong style={{ fontSize: "13px", color: "#166534" }}>
                      AI/ML Model 1 Domain Classifier:
                    </strong>
                  </div>
                  <span style={{ fontSize: "12px", color: "#15803d" }}>
                    {predicting
                      ? "Classifying doubt in real-time..."
                      : predictedDomain
                      ? `Classified into domain: `
                      : "Type title or description to see automatic ML domain tag."}
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
              </div>

              {/* Bottom Actions */}
              <div className="ask-question-actions">
                <button
                  type="button"
                  className="recommend-button"
                  onClick={handleRecommend}
                  disabled={loadingRecommendations}
                >
                  ✦ &nbsp; {loadingRecommendations ? "Searching..." : "Recommend (ML Model 2)"}
                </button>

                <button
                  type="button"
                  className="preview-question-button"
                  onClick={() => {
                    if (title || description) {
                      alert(`Preview:\n\nTitle: ${title}\nDomain: ${predictedDomain || "Auto"}\n\nDescription:\n${description}`);
                    } else {
                      alert("Please type a title and description first.");
                    }
                  }}
                >
                  ◉ &nbsp; Preview
                </button>

                <button
                  type="submit"
                  className="post-question-button"
                  disabled={submitting}
                >
                  ➤ &nbsp; {submitting ? "Posting..." : "Post Question"}
                </button>
              </div>
            </form>
          </div>

          {/* ML Recommendations Card */}
          {showRecommendations && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px 24px",
                borderRadius: "14px",
                border: "1px solid #bae6fd",
                marginTop: "20px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>🎯</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0369a1", margin: 0 }}>
                    Similar Doubts Clustered by ML Model 2
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRecommendations(false)}
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "16px" }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "14px" }}>
                Similar questions already asked by peers. Check if an answer already exists before posting:
              </p>

              {recommendations.length === 0 ? (
                <p style={{ fontSize: "13px", color: "#64748b", fontStyle: "italic" }}>
                  No similar doubts found for this prompt.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/searchresults?q=${encodeURIComponent(rec)}`)}
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "8px",
                        border: "1px solid #e0f2fe",
                        fontSize: "13px",
                        color: "#0369a1",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>• {rec}</span>
                      <span style={{ fontSize: "12px", color: "#0284c7", fontWeight: "600" }}>
                        View Doubts →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="ask-question-right-sidebar">
          {/* Tips */}
          <div className="ask-question-right-card">
            <div className="right-card-title yellow-title">
              <span>💡</span>
              <h2>Tips for a Good Question</h2>
            </div>

            <ul className="tips-list">
              <li>Be clear and specific</li>
              <li>Provide enough context</li>
              <li>Include relevant code snippets</li>
              <li>Mention what you have tried</li>
              <li>Specify the expected output</li>
              <li>AI/ML classifier will tag the domain automatically</li>
            </ul>
          </div>

          {/* Community Guidelines */}
          <div className="ask-question-right-card">
            <div className="right-card-title yellow-title">
              <span>📖</span>
              <h2>Community Guidelines</h2>
            </div>

            <ul className="guidelines-list">
              <li>Search existing questions first</li>
              <li>Be respectful and kind</li>
              <li>Ask one question at a time</li>
              <li>Provide meaningful details</li>
              <li>Follow our college code of conduct</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AskQuestion;
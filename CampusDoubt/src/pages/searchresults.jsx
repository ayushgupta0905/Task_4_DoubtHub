import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getQueries, getMLRecommendations } from "../api/api";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [questions, setQuestions] = useState([]);
  const [mlRecommendations, setMlRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchInput(query);
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const runSearch = async () => {
      try {
        setLoading(true);

        // 1. Fetch live questions from backend
        const qRes = await getQueries().catch(() => null);
        const allQuestions = qRes?.queries || [];

        // Match against title, description, or domain
        const lowerQ = query.toLowerCase();
        const matches = allQuestions.filter((item) => {
          return (
            item.title?.toLowerCase().includes(lowerQ) ||
            item.description?.toLowerCase().includes(lowerQ) ||
            item.domain?.toLowerCase().includes(lowerQ)
          );
        });
        setQuestions(matches);

        // 2. Fetch ML Model 2 recommendations
        const recs = await getMLRecommendations(query).catch(() => []);
        setMlRecommendations(recs || []);
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/searchresults?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        {/* Search Header */}
        <div style={{ marginBottom: "28px" }}>
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", maxWidth: "640px" }}>
            <input
              type="text"
              placeholder="Search doubts across all domains..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: "10px",
                border: "1.5px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 22px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>

          <p style={{ marginTop: "12px", color: "#64748b", fontSize: "14px" }}>
            Results for: <strong style={{ color: "#0f172a" }}>"{query}"</strong>
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            Searching database and running ML recommender...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "28px", alignItems: "start" }}>
            {/* Matching Questions List */}
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
                Matching Doubts ({questions.length})
              </h2>

              {questions.length === 0 ? (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    padding: "48px 24px",
                    textAlign: "center",
                    border: "1px dashed #cbd5e1",
                  }}
                >
                  <p style={{ color: "#64748b", margin: "0 0 16px 0", fontSize: "15px" }}>
                    No exact questions matched "{query}".
                  </p>
                  <button
                    onClick={() => navigate("/askquestion")}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 18px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    + Ask This Question Now
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {questions.map((q) => (
                    <div
                      key={q._id}
                      onClick={() => navigate(`/questiondetail?id=${q._id}`)}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "20px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
                          {q.title}
                        </h3>
                        {q.domain && (
                          <span
                            style={{
                              backgroundColor: "#eff6ff",
                              color: "#1d4ed8",
                              padding: "2px 8px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: "600",
                            }}
                          >
                            🏷️ {q.domain}
                          </span>
                        )}
                      </div>

                      <p style={{ color: "#475569", fontSize: "13px", lineHeight: "1.5", margin: "0 0 10px 0" }}>
                        {q.description?.slice(0, 140)}...
                      </p>

                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        Asked by {q.userId?.name || "Student"} • {new Date(q.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar ML Suggestions */}
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span>🤖</span>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    ML Related Queries (Model 2)
                  </h3>
                </div>

                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                  Clustered related search queries:
                </p>

                {mlRecommendations.length === 0 ? (
                  <p style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>
                    No ML recommendations for this search term.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {mlRecommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/searchresults?q=${encodeURIComponent(rec)}`)}
                        style={{
                          padding: "8px 10px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "6px",
                          fontSize: "12px",
                          color: "#0369a1",
                          border: "1px solid #e2e8f0",
                          cursor: "pointer",
                        }}
                      >
                        • {rec}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
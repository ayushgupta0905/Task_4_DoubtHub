import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getQueries,
  getInboxQueries,
  getMyQueries,
  getAuthToken,
  getStoredUser,
} from "../api/api";

function Questions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Latest");
  const [search, setSearch] = useState("");

  const token = getAuthToken();
  const user = getStoredUser();

  const categories = [
    "All",
    "DSA",
    "AI/ML",
    "Machine Learning",
    "Frontend",
    "Backend",
    "Python",
    "Cyber Security",
  ];

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      let res;
      if (activeTab === "My Domain Inbox") {
        if (!token) {
          setError("Please login to view your domain inbox.");
          setQuestions([]);
          setLoading(false);
          return;
        }
        res = await getInboxQueries();
      } else if (activeTab === "My Doubts") {
        if (!token) {
          setError("Please login to view your questions.");
          setQuestions([]);
          setLoading(false);
          return;
        }
        res = await getMyQueries();
      } else {
        res = await getQueries();
      }

      const list = res?.queries || [];
      setQuestions(list);
    } catch (err) {
      console.error("Fetch questions error:", err);
      setError(err.message || "Failed to load questions from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [activeTab]);

  // Filter by category, search, and resolved tab
  const filteredQuestions = questions.filter((q) => {
    const titleMatch = q.title?.toLowerCase().includes(search.toLowerCase());
    const descMatch = q.description?.toLowerCase().includes(search.toLowerCase());
    const domainMatch = q.domain?.toLowerCase().includes(search.toLowerCase());
    const matchesSearch = !search || titleMatch || descMatch || domainMatch;

    const matchesCategory =
      activeCategory === "All" ||
      q.domain?.toLowerCase() === activeCategory.toLowerCase();

    const matchesResolved =
      activeTab !== "Resolved" || q.status === "resolved";

    return matchesSearch && matchesCategory && matchesResolved;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 20px" }}>
        {/* Top Header & Ask Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              All Campus Doubts
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}>
              Explore, discuss and solve engineering & programming doubts.
            </p>
          </div>

          <button
            onClick={() => navigate("/askquestion")}
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "12px 22px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
            }}
          >
            + Ask Question
          </button>
        </div>

        {/* View Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "16px",
            overflowX: "auto",
          }}
        >
          {["Latest", "My Domain Inbox", "My Doubts", "Resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2.5px solid #f59e0b" : "2.5px solid transparent",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: activeTab === tab ? "700" : "500",
                color: activeTab === tab ? "#f59e0b" : "#64748b",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab === "My Domain Inbox" && user?.domain
                ? `📥 Inbox (${user.domain})`
                : tab}
            </button>
          ))}
        </div>

        {/* Domain Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
                border: activeCategory === cat ? "1px solid #f59e0b" : "1px solid #e2e8f0",
                backgroundColor: activeCategory === cat ? "#fef3c7" : "#ffffff",
                color: activeCategory === cat ? "#b45309" : "#475569",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search doubts by title, keyword, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "10px",
              border: "1.5px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
            }}
          />
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Question Cards List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>⏳</div>
            <p>Loading questions from backend...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "60px 20px",
              textAlign: "center",
              border: "1px dashed #cbd5e1",
            }}
          >
            <span style={{ fontSize: "40px" }}>🔍</span>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "12px 0 6px" }}>
              No doubts found
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "400px", margin: "0 auto 16px" }}>
              {activeTab === "My Domain Inbox"
                ? "No questions currently pending in your technical domain."
                : "No questions match your current filters or search query."}
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
              Ask the first question
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredQuestions.map((q) => (
              <div
                key={q._id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/questiondetail?id=${q._id}`)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: "0 0 8px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {q.title}
                  </h3>

                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    {q.status === "resolved" ? (
                      <span
                        style={{
                          backgroundColor: "#dcfce7",
                          color: "#15803d",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        ✓ Resolved
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#b45309",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Open
                      </span>
                    )}

                    {q.domain && (
                      <span
                        style={{
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        🏷️ {q.domain}
                      </span>
                    )}
                  </div>
                </div>

                <p
                  style={{
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    margin: "0 0 16px 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {q.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "12px",
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>👤</span>
                    <span style={{ fontWeight: "600", color: "#334155" }}>
                      {q.userId?.name || "Student"}
                    </span>
                    <span>•</span>
                    <span>{formatDate(q.createdAt)}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#f59e0b", fontWeight: "600" }}>
                      View Details & Answers →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;
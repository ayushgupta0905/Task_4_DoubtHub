import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyAnswers, deleteAnswer, getAuthToken } from "../api/api";

function MyAnswers() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const loadAnswers = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getMyAnswers();
      setAnswers(res?.answers || []);
    } catch (err) {
      setError(err.message || "Failed to load your answers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnswers();
  }, [token]);

  const handleDelete = async (e, ansId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this answer?")) return;

    try {
      await deleteAnswer(ansId);
      setAnswers((prev) => prev.filter((a) => a._id !== ansId));
    } catch (err) {
      alert("Failed to delete answer: " + err.message);
    }
  };

  if (!token) {
    return (
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: "500px", margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>💬</div>
          <h2>Please Login to View Your Answers</h2>
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "16px",
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login to Account
          </button>
        </div>
      </div>
    );
  }

  const filtered = answers.filter((a) => {
    if (filter === "accepted") return a.isAccepted;
    return true;
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              My Posted Answers
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}>
              Answers you have contributed to help campus peers.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: filter === "all" ? "1px solid #f59e0b" : "1px solid #cbd5e1",
                backgroundColor: filter === "all" ? "#fef3c7" : "#ffffff",
                color: filter === "all" ? "#b45309" : "#475569",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              All ({answers.length})
            </button>
            <button
              onClick={() => setFilter("accepted")}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: filter === "accepted" ? "1px solid #22c55e" : "1px solid #cbd5e1",
                backgroundColor: filter === "accepted" ? "#dcfce7" : "#ffffff",
                color: filter === "accepted" ? "#166534" : "#475569",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Accepted Solutions ({answers.filter((a) => a.isAccepted).length})
            </button>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            Loading your answers...
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "60px 20px",
              textAlign: "center",
              border: "1px dashed #cbd5e1",
            }}
          >
            <span style={{ fontSize: "40px" }}>✍️</span>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "12px 0 6px" }}>
              No answers posted yet
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "16px" }}>
              Browse the campus questions feed to answer doubts and earn reputation points!
            </p>
            <button
              onClick={() => navigate("/question")}
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
              Browse Questions Feed
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((ans) => {
              const q = ans.queryId;
              const qId = q?._id || ans.queryId;

              return (
                <div
                  key={ans._id}
                  onClick={() => {
                    if (qId) navigate(`/questiondetail?id=${qId}`);
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    padding: "22px 26px",
                    border: ans.isAccepted ? "2px solid #22c55e" : "1px solid #e2e8f0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Doubt:</span>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0284c7", margin: "2px 0 0" }}>
                        {q?.title || "View Question Details →"}
                      </h3>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      {ans.isAccepted && (
                        <span
                          style={{
                            backgroundColor: "#dcfce7",
                            color: "#166534",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          ✓ Accepted Solution
                        </span>
                      )}

                      <button
                        onClick={(e) => handleDelete(e, ans._id)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#ef4444",
                          border: "1px solid #fca5a5",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#334155",
                      fontSize: "14px",
                      lineHeight: "1.7",
                      whiteSpace: "pre-wrap",
                      margin: "0 0 12px 0",
                    }}
                  >
                    "{ans.content}"
                  </p>

                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Answered on {new Date(ans.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAnswers;
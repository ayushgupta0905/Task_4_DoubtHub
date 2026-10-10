import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getQueries } from "../api/api";

function Trending() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQueries()
      .then((res) => {
        setQuestions(res?.queries || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "28px" }}>
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            🔥 Trending Topics
          </span>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "8px 0 4px" }}>
            Trending Doubts on Campus
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Most discussed queries and active problem-solving sessions right now.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            Loading trending doubts...
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {questions.map((q, idx) => (
              <div
                key={q._id || idx}
                onClick={() => navigate(`/questiondetail?id=${q._id}`)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: idx < 3 ? "#f59e0b" : "#94a3b8",
                    width: "32px",
                    textAlign: "center",
                  }}
                >
                  #{idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
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
                  <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
                    {q.description?.slice(0, 140)}...
                  </p>
                </div>

                <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700" }}>
                  View →
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trending;

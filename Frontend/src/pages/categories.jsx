import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getQueries } from "../api/api";

const defaultDomains = [
  {
    name: "DSA",
    desc: "Data Structures & Algorithms, Arrays, Trees, Graphs, Dynamic Programming & Big-O.",
    icon: "⚡",
    color: "#f59e0b",
  },
  {
    name: "AI/ML",
    desc: "Artificial Intelligence, Neural Networks, Computer Vision & Deep Learning.",
    icon: "🤖",
    color: "#8b5cf6",
  },
  {
    name: "Machine Learning",
    desc: "Supervised & Unsupervised Learning, Regression, Classification, Scikit-Learn & Models.",
    icon: "🧠",
    color: "#ec4899",
  },
  {
    name: "Frontend",
    desc: "HTML, CSS, React, Next.js, Vue, responsive styling, state management & UI/UX.",
    icon: "🎨",
    color: "#06b6d4",
  },
  {
    name: "Backend",
    desc: "Node.js, Express, REST APIs, GraphQL, Databases, MongoDB, PostgreSQL & Authentication.",
    icon: "⚙️",
    color: "#10b981",
  },
  {
    name: "Python",
    desc: "Core Python, scripting, automation, Pandas, NumPy, Django & Flask frameworks.",
    icon: "🐍",
    color: "#3b82f6",
  },
  {
    name: "Cyber Security",
    desc: "Network security, cryptography, vulnerability testing, ethical hacking & web security.",
    icon: "🛡️",
    color: "#ef4444",
  },
];

function Categories() {
  const navigate = useNavigate();
  const [queryCounts, setQueryCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // Fetch queries to compute live counts
      const qRes = await getQueries().catch(() => null);
      const counts = {};
      if (qRes?.queries) {
        qRes.queries.forEach((q) => {
          const d = q.domain || "Other";
          counts[d] = (counts[d] || 0) + 1;
        });
      }
      setQueryCounts(counts);
    };

    fetchData();
  }, []);

  const handleSelectDomain = (domainName) => {
    navigate(`/question?category=${encodeURIComponent(domainName)}`);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" }}>
            Technical Domains & Categories
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "600px", margin: "0 auto" }}>
            Browse doubts and discussions categorized by subject domain.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {defaultDomains.map((dom) => {
            const count = queryCounts[dom.name] || 0;

            return (
              <div
                key={dom.name}
                onClick={() => handleSelectDomain(dom.name)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
                  cursor: "pointer",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      {dom.icon}
                    </div>

                    <span
                      style={{
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {count} {count === 1 ? "Doubt" : "Doubts"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
                    {dom.name}
                  </h3>

                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                    {dom.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: dom.color,
                    fontWeight: "700",
                    fontSize: "13px",
                    borderTop: "1px solid #f8fafc",
                    paddingTop: "12px",
                  }}
                >
                  <span>Explore Doubts in {dom.name}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
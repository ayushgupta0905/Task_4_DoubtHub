import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/studentphoto.png";
import yellowBackground from "../assets/yellowbackground.png";
import Navbar from "../components/Navbar";
import { getQueries } from "../api/api";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(120);

  useEffect(() => {
    getQueries()
      .then((data) => {
        if (data?.queries && data.queries.length > 0) {
          setTotalQuestions(data.queries.length);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchresults?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagSearch = (tag) => {
    navigate(`/searchresults?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${yellowBackground})`, minHeight: "100vh" }}
    >
      {/* Shared Active Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <p className="small-title">A COLLEGE COMMUNITY</p>

          <h1>
            Every Doubt
            <br />
            Deserves an <span>Answer.</span>
          </h1>

          <p className="hero-description">
            Ask doubts, get verified answers from fellow students, explore similar
            questions with AI/ML algorithms, and build your technical reputation.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search doubts (e.g. React, DSA, Python, JWT...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="popular-tags">
            <span>Popular Domains:</span>
            <button type="button" onClick={() => handleTagSearch("DSA")}>
              DSA
            </button>
            <button type="button" onClick={() => handleTagSearch("Python")}>
              Python
            </button>
            <button type="button" onClick={() => handleTagSearch("Frontend")}>
              Frontend
            </button>
            <button type="button" onClick={() => handleTagSearch("Backend")}>
              Backend
            </button>
            <button type="button" onClick={() => handleTagSearch("AI/ML")}>
              AI/ML
            </button>
          </div>

          <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/askquestion")}
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(245, 158, 11, 0.35)",
              }}
            >
              ✍️ Ask a Question
            </button>
            <button
              onClick={() => navigate("/question")}
              style={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                border: "1.5px solid #cbd5e1",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Browse Questions →
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Students studying together" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div>
          <h2>{totalQuestions}+</h2>
          <p>Questions Asked</p>
        </div>

        <div>
          <h2>5K+</h2>
          <p>Active Students</p>
        </div>

        <div>
          <h2>98%</h2>
          <p>Doubts Resolved</p>
        </div>

        <div>
          <h2>7</h2>
          <p>Tech Domains</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
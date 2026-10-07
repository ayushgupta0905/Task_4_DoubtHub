import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/studentphoto.png";
import yellowBackground from "../assets/yellowbackground.png";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="nav-links">
          <a className="active" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</a>
          <a onClick={() => navigate("/question")} style={{ cursor: "pointer" }}>Questions</a>
          <a onClick={() => navigate("/categories")} style={{ cursor: "pointer" }}>Categories</a>
          <a onClick={() => navigate("/question")} style={{ cursor: "pointer" }}>Community</a>
          <a style={{ cursor: "pointer" }}>About</a>
        </div>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

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
            Ask questions, get answers, explore similar doubts,
            and grow together with the power of AI/ML.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search doubts (e.g. React, DSA, Python...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <div className="popular-tags">
            <span>Popular Tags:</span>
            <button onClick={() => handleTagSearch("DSA")}>DSA</button>
            <button onClick={() => handleTagSearch("Python")}>Python</button>
            <button onClick={() => handleTagSearch("Frontend")}>Frontend</button>
            <button onClick={() => handleTagSearch("Backend")}>Backend</button>
            <button onClick={() => handleTagSearch("AI/ML")}>AI/ML</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Students studying" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div>
          <h2>10K+</h2>
          <p>Questions Asked</p>
        </div>

        <div>
          <h2>5K+</h2>
          <p>Students</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Topics</p>
        </div>

        <div>
          <h2>24/7</h2>
          <p>Community Support</p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="section-title">
          <h2>Explore by Category</h2>
          <p>
            Choose a domain to explore questions related to your interest.
          </p>
        </div>

        <div className="category-list">
          {[
            { emoji: "🤖", label: "AI / ML", tag: "AI/ML" },
            { emoji: "🧠", label: "DSA", tag: "DSA" },
            { emoji: "🐍", label: "Python", tag: "Python" },
            { emoji: "💻", label: "Frontend", tag: "Frontend" },
            { emoji: "⚙️", label: "Backend", tag: "Backend" },
            { emoji: "🔐", label: "Cyber Security", tag: "Cyber Security" },
            { emoji: "📊", label: "ML", tag: "ML" },
          ].map(({ emoji, label, tag }) => (
            <div
              key={tag}
              className="category-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/question?category=${encodeURIComponent(tag)}`)}
            >
              <div>{emoji}</div>
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Questions and Sidebar */}
      <section className="bottom-section">
        <div className="latest-questions">

          <div className="section-heading">
            <div>
              <h2>Latest Questions</h2>
              <p>Explore the newest questions from the community.</p>
            </div>

            <button onClick={() => navigate("/question")}>View All →</button>
          </div>

          {/* Question 1 */}
          <div
            className="question-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/questiondetail")}
          >
            <div className="votes">
              <strong>24</strong>
              <span>votes</span>
            </div>

            <div className="question-content">
              <h3>
                How to implement JWT authentication in backend?
              </h3>

              <div className="tags">
                <span>Backend</span>
                <span>Authentication</span>
                <span>Node.js</span>
              </div>

              <p>asked 2 hours ago by Rahul Sharma</p>
            </div>

            <div className="bookmark">🔖</div>
          </div>

          {/* Question 2 */}
          <div
            className="question-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/questiondetail")}
          >
            <div className="votes">
              <strong>18</strong>
              <span>votes</span>
            </div>

            <div className="question-content">
              <h3>
                Best way to learn Python for web development?
              </h3>

              <div className="tags">
                <span>Python</span>
                <span>Web Development</span>
              </div>

              <p>asked 4 hours ago by Neha Gupta</p>
            </div>

            <div className="bookmark">🔖</div>
          </div>

          {/* Question 3 */}
          <div
            className="question-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/questiondetail")}
          >
            <div className="votes">
              <strong>12</strong>
              <span>votes</span>
            </div>

            <div className="question-content">
              <h3>
                Difference between supervised and unsupervised learning?
              </h3>

              <div className="tags">
                <span>ML</span>
                <span>AI/ML</span>
              </div>

              <p>asked 5 hours ago by Aman Verma</p>
            </div>

            <div className="bookmark">🔖</div>
          </div>

        </div>

        {/* Right Side */}
        <div className="side-content">

          {/* Trending */}
          <div className="side-card">
            <div className="side-title">
              <h2>🔥 Trending Topics</h2>
              <button onClick={() => navigate("/question")}>View All →</button>
            </div>

            {[
              { name: "Python", count: "1.2K questions" },
              { name: "DSA", count: "980 questions" },
              { name: "AI/ML", count: "860 questions" },
              { name: "Web Development", count: "720 questions" },
              { name: "Cyber Security", count: "650 questions" },
            ].map((topic, i) => (
              <div
                key={topic.name}
                className="trend"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/question?category=${encodeURIComponent(topic.name)}`)}
              >
                <strong>{i + 1}</strong>
                <div>
                  <h3>{topic.name}</h3>
                  <p>{topic.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Top Contributors */}
          <div className="side-card">
            <div className="side-title">
              <h2>🏆 Top Contributors</h2>
              <button onClick={() => navigate("/question")}>View All →</button>
            </div>

            {[
              { name: "Aman Verma", rep: "1.2K reputation", initial: "A" },
              { name: "Priya Singh", rep: "980 reputation", initial: "P" },
              { name: "Karan Patel", rep: "860 reputation", initial: "K" },
              { name: "Neha Sharma", rep: "720 reputation", initial: "N" },
            ].map((person) => (
              <div key={person.name} className="contributor">
                <div className="avatar">{person.initial}</div>
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.rep}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            🎓 <strong>CampusDoubt</strong>
          </div>

          <p>Ask. Learn. Solve. Grow together.</p>

          <span>© 2026 CampusDoubt</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
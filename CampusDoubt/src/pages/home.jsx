import heroImage from "../assets/studentphoto.png";
import yellowBackground from "../assets/yellowbackground.png";

function Home() {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="nav-links">
          <a className="active">Home</a>
          <a>Questions</a>
          <a>Categories</a>
          <a>Community</a>
          <a>About</a>
        </div>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
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

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search doubts (e.g. React, DSA, Python...)"
            />

            <button>Search</button>
          </div>

          <div className="popular-tags">
            <span>Popular Tags:</span>
            <button>DSA</button>
            <button>Python</button>
            <button>Frontend</button>
            <button>Backend</button>
            <button>AI/ML</button>
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
          <div className="category-card">
            <div>🤖</div>
            <h3>AI / ML</h3>
          </div>

          <div className="category-card">
            <div>🧠</div>
            <h3>DSA</h3>
          </div>

          <div className="category-card">
            <div>🐍</div>
            <h3>Python</h3>
          </div>

          <div className="category-card">
            <div>💻</div>
            <h3>Frontend</h3>
          </div>

          <div className="category-card">
            <div>⚙️</div>
            <h3>Backend</h3>
          </div>

          <div className="category-card">
            <div>🔐</div>
            <h3>Cyber Security</h3>
          </div>

          <div className="category-card">
            <div>📊</div>
            <h3>ML</h3>
          </div>
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

            <button>View All →</button>
          </div>

          {/* Question 1 */}
          <div className="question-card">
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
          <div className="question-card">
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
          <div className="question-card">
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
              <button>View All →</button>
            </div>

            <div className="trend">
              <strong>1</strong>
              <div>
                <h3>Python</h3>
                <p>1.2K questions</p>
              </div>
            </div>

            <div className="trend">
              <strong>2</strong>
              <div>
                <h3>DSA</h3>
                <p>980 questions</p>
              </div>
            </div>

            <div className="trend">
              <strong>3</strong>
              <div>
                <h3>AI/ML</h3>
                <p>860 questions</p>
              </div>
            </div>

            <div className="trend">
              <strong>4</strong>
              <div>
                <h3>Web Development</h3>
                <p>720 questions</p>
              </div>
            </div>

            <div className="trend">
              <strong>5</strong>
              <div>
                <h3>Cyber Security</h3>
                <p>650 questions</p>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="side-card">
            <div className="side-title">
              <h2>🏆 Top Contributors</h2>
              <button>View All →</button>
            </div>

            <div className="contributor">
              <div className="avatar">A</div>

              <div>
                <h3>Aman Verma</h3>
                <p>1.2K reputation</p>
              </div>
            </div>

            <div className="contributor">
              <div className="avatar">P</div>

              <div>
                <h3>Priya Singh</h3>
                <p>980 reputation</p>
              </div>
            </div>

            <div className="contributor">
              <div className="avatar">K</div>

              <div>
                <h3>Karan Patel</h3>
                <p>860 reputation</p>
              </div>
            </div>

            <div className="contributor">
              <div className="avatar">N</div>

              <div>
                <h3>Neha Sharma</h3>
                <p>720 reputation</p>
              </div>
            </div>
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
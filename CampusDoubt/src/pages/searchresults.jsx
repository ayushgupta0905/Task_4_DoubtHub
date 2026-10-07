import { useState } from "react";
import { Link } from "react-router-dom";

import girlwithbook from "../assets/girlwithbook.png";
import studentphoto from "../assets/studentphoto.png";



const questions = [
  {
    votes: 125,
    answers: 8,
    title: "How does React useEffect hook work?",
    description:
      "I am trying to understand how the useEffect hook works in React. When exactly does it run and how can we control its dependencies?",
    tags: ["react", "javascript", "hooks", "frontend"],
    author: "Priya Sharma",
    time: "2 hours ago",
    accepted: true,
  },
  {
    votes: 87,
    answers: 5,
    title: "Conditional rendering in React",
    description:
      "What is the best way to do conditional rendering in React? Should I use ternary operator or logical &&?",
    tags: ["react", "javascript", "conditional-rendering"],
    author: "Arjun Mehta",
    time: "5 hours ago",
    accepted: false,
  },
  {
    votes: 64,
    answers: 3,
    title: "How to pass data between components in React?",
    description:
      "I am new to React and confused about the different ways to pass data between components. Can someone explain with examples?",
    tags: ["react", "components", "props", "state"],
    author: "Sneha Verma",
    time: "1 day ago",
    accepted: false,
  },
  {
    votes: 53,
    answers: 4,
    title: "React Router not working in production",
    description:
      "My React Router works fine in development but shows 404 error in production. How can I fix this issue?",
    tags: ["react", "react-router", "deployment", "vite"],
    author: "Rohan Gupta",
    time: "1 day ago",
    accepted: false,
  },
  {
    votes: 41,
    answers: 2,
    title: "Difference between useState and useRef in React",
    description:
      "What is the difference between useState and useRef in React? When should we use each of them?",
    tags: ["react", "usestate", "useref", "hooks"],
    author: "Neha Singh",
    time: "2 days ago",
    accepted: false,
  },
];

const relatedTags = [
  "react",
  "javascript",
  "hooks",
  "frontend",
  "components",
  "usestate",
  "react-router",
  "vite",
];

function SearchResults() {
  const [search, setSearch] = useState("React");
  const [activeTab, setActiveTab] = useState("All");

  const filteredQuestions = questions.filter((question) => {
    const text =
      `${question.title} ${question.description} ${question.tags.join(" ")}`
        .toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="search-results-page">

      {/* NAVBAR */}
      <header className="search-navbar">

        <Link to="/" className="search-logo">
          <div className="logo-icon">🎓</div>
          <span>Smart College</span>
        </Link>

        <div className="top-search">
          <span>⌕</span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
          />

          <button>Search</button>
        </div>

        <div className="navbar-right">

          <div className="notification">
            🔔
            <span></span>
          </div>

          <div className="profile-mini">
            <img src={studentphoto} alt="Profile" />
            <strong>Vishal</strong>
            <span>⌄</span>
          </div>

        </div>

      </header>

      <div className="search-layout">

        {/* SIDEBAR */}
        <aside className="search-sidebar">

          <nav>

            <Link to="/" className="side-link">
              <span>⌂</span>
              Home
            </Link>

            <Link to="/ask-question" className="side-link">
              <span>?</span>
              Ask Question
            </Link>

            <Link to="/questions" className="side-link">
              <span>▣</span>
              Questions
            </Link>

            <Link to="/my-answers" className="side-link">
              <span>☑</span>
              My Answers
            </Link>

            <Link to="/bookmarks" className="side-link">
              <span>♡</span>
              Bookmarks
            </Link>

            <Link to="/categories" className="side-link">
              <span>⊞</span>
              Categories
            </Link>

            <Link to="/trending" className="side-link">
              <span>⌁</span>
              Trending
            </Link>

            <Link
              to="/search-results"
              className="side-link active"
            >
              <span>⌕</span>
              Search Results
            </Link>

            <Link to="/profile" className="side-link">
              <span>♙</span>
              Profile
            </Link>

          </nav>

          <div className="sidebar-student">
            <img
              src={girlwithbook}
              alt="Student"
            />
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="search-main">

          <div className="search-heading">

            <div>
              <h1>Search Results</h1>

              <p>
                {filteredQuestions.length > 0
                  ? "128 results found for"
                  : "No results found for"}{" "}
                <strong>"{search}"</strong>
              </p>
            </div>

          </div>

          {/* TABS */}
          <div className="search-tabs">

            {[
              "All",
              "Questions",
              "Users",
              "Tags",
              "Categories",
            ].map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "tab-active"
                    : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}

                {tab === "All" && " (128)"}
                {tab === "Questions" && " (102)"}
                {tab === "Users" && " (12)"}
                {tab === "Tags" && " (8)"}
                {tab === "Categories" && " (6)"}
              </button>
            ))}

          </div>

          {/* RESULTS */}
          <div className="results-list">

            {filteredQuestions.length > 0 ? (

              filteredQuestions.map(
                (question, index) => (

                  <article
                    className="result-card"
                    key={index}
                  >

                    {/* VOTES */}
                    <div className="vote-box">

                      <button>⌃</button>

                      <strong>
                        {question.votes}
                      </strong>

                      <button>⌄</button>

                      <div className="answer-count">
                        {question.answers}
                        <span>answers</span>
                      </div>

                    </div>

                    {/* QUESTION */}
                    <div className="question-content">

                      <div className="question-top">

                        <Link to="/question-detail">
                          {question.title}
                        </Link>

                        {question.accepted && (
                          <span className="accepted-badge">
                            ✓ Accepted Answer
                          </span>
                        )}

                      </div>

                      <p>
                        {question.description}
                      </p>

                      <div className="question-bottom">

                        <div className="question-tags">

                          {question.tags.map(
                            (tag) => (
                              <span key={tag}>
                                {tag}
                              </span>
                            )
                          )}

                        </div>

                        <div className="question-author">

                          <img
                            src={studentphoto}
                            alt={question.author}
                          />

                          <div>
                            <strong>
                              {question.author}
                            </strong>

                            <small>
                              {question.time}
                            </small>
                          </div>

                        </div>

                      </div>

                    </div>

                  </article>

                )
              )

            ) : (

              <div className="no-results">

                <div className="no-results-icon">
                  🔍
                </div>

                <h2>No results found</h2>

                <p>
                  Try different keywords or ask
                  the community.
                </p>

                <Link to="/ask-question">
                  Ask a Question →
                </Link>

              </div>

            )}

          </div>

          {/* PAGINATION */}
          {filteredQuestions.length > 0 && (
            <div className="pagination">

              <button>‹</button>

              <button className="page-active">
                1
              </button>

              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>

              <span>...</span>

              <button>13</button>

              <button>›</button>

            </div>
          )}

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="search-right">

          {/* FILTERS */}
          <div className="right-card">

            <h2>⚱ Filters</h2>

            <label>Time</label>

            <select>
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>

            <label>Tags</label>

            <select>
              <option>All Tags</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Hooks</option>
            </select>

            <label>Category</label>

            <select>
              <option>All Categories</option>
              <option>Web Development</option>
              <option>Programming</option>
              <option>Database</option>
            </select>

          </div>

          {/* RELATED TAGS */}
          <div className="right-card">

            <div className="right-card-heading">

              <h2>
                🏷 Related Tags
              </h2>

              <a href="#">
                View All
              </a>

            </div>

            <div className="related-tags">

              {relatedTags.map(
                (tag, index) => (
                  <span key={tag}>
                    {tag}
                    <small>
                      ({342 - index * 37})
                    </small>
                  </span>
                )
              )}

            </div>

          </div>

          {/* TOP CONTRIBUTORS */}
          <div className="right-card">

            <div className="right-card-heading">

              <h2>
                🏆 Top Contributors
              </h2>

              <a href="#">
                View All
              </a>

            </div>

            <div className="contributors">

              <div className="contributor">

                <b className="rank rank-one">
                  1
                </b>

                <img
                  src={studentphoto}
                  alt="Priya"
                />

                <div>
                  <strong>
                    Priya Sharma
                  </strong>

                  <small>
                    1.2k answers
                  </small>
                </div>

              </div>

              <div className="contributor">

                <b className="rank">
                  2
                </b>

                <img
                  src={studentphoto}
                  alt="Rohan"
                />

                <div>
                  <strong>
                    Rohan Gupta
                  </strong>

                  <small>
                    980 answers
                  </small>
                </div>

              </div>

              <div className="contributor">

                <b className="rank rank-three">
                  3
                </b>

                <img
                  src={studentphoto}
                  alt="Neha"
                />

                <div>
                  <strong>
                    Neha Singh
                  </strong>

                  <small>
                    870 answers
                  </small>
                </div>

              </div>

            </div>

          </div>

          {/* NEED HELP */}
          <div className="help-card">

            <div>

              <h2>
                💡 Need Help?
              </h2>

              <p>
                Can't find what you're
                looking for? Ask the
                community!
              </p>

              <Link to="/ask-question">
                Ask a Question →
              </Link>

            </div>

            <img
              src={girlwithbook}
              alt="Need Help"
            />

          </div>

        </aside>

      </div>

    </div>
  );
}

export default SearchResults;
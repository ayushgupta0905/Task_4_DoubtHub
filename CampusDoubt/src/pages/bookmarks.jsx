import { useState } from "react";
import { Link } from "react-router-dom";
import girlWithBook from "../assets/girlwithbook.png";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";

function Bookmarks() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const bookmarks = [
    {
      id: 1,
      title: "How to connect React frontend with Django backend?",
      description:
        "I am trying to connect my React frontend with Django REST API. What is the best approach to handle authentication and API requests?",
      tags: ["react", "django", "api", "authentication"],
      votes: 24,
      answers: 5,
      views: 342,
      time: "2 days ago",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Best resources to learn DSA in 2025?",
      description:
        "What are the best free or paid resources to learn Data Structures and Algorithms for placements?",
      tags: ["dsa", "placement", "resources", "interview"],
      votes: 18,
      answers: 12,
      views: 1200,
      time: "5 days ago",
      category: "DSA",
    },
    {
      id: 3,
      title: "How to deploy a full stack project for free?",
      description:
        "I have a React frontend and Node.js backend. What are the best free platforms to deploy both?",
      tags: ["deployment", "render", "vercel", "fullstack"],
      votes: 12,
      answers: 8,
      views: 890,
      time: "1 week ago",
      category: "DevOps",
    },
    {
      id: 4,
      title: "What is the difference between useEffect and useLayoutEffect?",
      description:
        "I am confused between useEffect and useLayoutEffect in React. When should I use each one?",
      tags: ["react", "hooks", "useeffect", "uselayouteffect"],
      votes: 9,
      answers: 6,
      views: 420,
      time: "1 week ago",
      category: "React",
    },
    {
      id: 5,
      title: "How does JWT authentication work?",
      description:
        "Can someone explain how JWT authentication works in a full stack application?",
      tags: ["jwt", "authentication", "nodejs", "security"],
      votes: 7,
      answers: 9,
      views: 510,
      time: "2 weeks ago",
      category: "Web Development",
    },
  ];

  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All Categories" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="bookmarks-page"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.88)
          ),
          url(${yellowBackground})
        `,
      }}
    >
      {/* Navbar */}
      <header className="bookmarks-navbar">
        <div className="bookmarks-logo">
          <span>Smart</span>College
        </div>

        <nav className="bookmarks-nav">
          <Link to="/home">Home</Link>
          <Link to="/questions">Questions</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/ask-question">Ask Question</Link>
        </nav>

        <div className="bookmarks-search-top">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search questions, tags, or users..."
          />
        </div>

        <button className="bookmarks-notification">♧</button>

        <Link to="/profile" className="bookmarks-nav-user">
          <img src={studentPhoto} alt="Priya" />
          <span>Priya</span>
          <span>⌄</span>
        </Link>
      </header>

      <div className="bookmarks-layout">

        {/* Sidebar */}
        <aside className="bookmarks-sidebar">

          <div className="bookmarks-menu">

            <Link to="/home">
              <span>⌂</span>
              Dashboard
            </Link>

            <Link to="/questions">
              <span>▤</span>
              My Questions
            </Link>

            <Link to="/my-answers">
              <span>☷</span>
              My Answers
            </Link>

            <Link
              to="/bookmarks"
              className="active"
            >
              <span>🔖</span>
              Bookmarks
            </Link>

            <Link to="/profile">
              <span>♙</span>
              Profile
            </Link>

            <Link to="#">
              <span>⚙</span>
              Settings
            </Link>

          </div>

          {/* Need Help */}
          <div className="bookmarks-help-card">

            <div className="bookmarks-help-content">
              <h2>Need Help?</h2>

              <p>
                Get support from our
                college community.
              </p>

              <Link to="/ask-question">
                Ask Now →
              </Link>
            </div>

            <img
              src={girlWithBook}
              alt="Student with books"
              className="bookmarks-help-image"
            />

          </div>

        </aside>

        {/* Main */}
        <main className="bookmarks-main">

          {/* Page Header */}
          <section className="bookmarks-page-header">

            <div className="bookmarks-header-icon">
              🔖
            </div>

            <div>
              <h1>My Bookmarks</h1>

              <p>
                All your saved questions in one place.
                Revisit, learn and keep track of important questions.
              </p>
            </div>

            <div className="bookmarks-header-decoration">
              📚
            </div>

          </section>

          <div className="bookmarks-content-grid">

            {/* Questions Section */}
            <section className="bookmarks-question-section">

              {/* Search / Sort */}
              <div className="bookmarks-toolbar">

                <div className="bookmarks-page-search">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Search bookmarked questions..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>

                <div className="bookmarks-toolbar-actions">

                  <select defaultValue="newest">
                    <option value="newest">
                      Sort by: Newest
                    </option>

                    <option value="oldest">
                      Oldest
                    </option>

                    <option value="votes">
                      Most Votes
                    </option>

                    <option value="views">
                      Most Viewed
                    </option>
                  </select>

                  <button className="toolbar-view active">
                    ☰
                  </button>

                  <button className="toolbar-view">
                    ▦
                  </button>

                </div>

              </div>

              {/* Bookmark List */}
              <div className="bookmark-list">

                {filteredBookmarks.length === 0 ? (
                  <div className="no-bookmarks">
                    <div>🔖</div>
                    <h2>No bookmarks found</h2>
                    <p>
                      Try changing your search or category filter.
                    </p>
                  </div>
                ) : (
                  filteredBookmarks.map((question) => (

                    <article
                      className="bookmark-question-card"
                      key={question.id}
                    >

                      {/* Vote */}
                      <div className="bookmark-vote-box">
                        <span>△</span>
                        <strong>{question.votes}</strong>
                      </div>

                      {/* Question Content */}
                      <div className="bookmark-question-content">

                        <Link
                          to="/question-detail"
                          className="bookmark-question-title"
                        >
                          {question.title}
                        </Link>

                        <p className="bookmark-question-description">
                          {question.description}
                        </p>

                        {/* Tags */}
                        <div className="bookmark-tags">

                          {question.tags.map((tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          ))}

                        </div>

                        {/* Author */}
                        <div className="bookmark-author">

                          <img
                            src={studentPhoto}
                            alt="Priya"
                          />

                          <span>Priya Sharma</span>

                          <span>•</span>

                          <span>{question.time}</span>

                          <span>•</span>

                          <span>
                            in {question.category}
                          </span>

                        </div>

                      </div>

                      {/* Stats */}
                      <div className="bookmark-question-stats">

                        <div>
                          <span>▢</span>
                          <span>
                            {question.answers} answers
                          </span>
                        </div>

                        <div>
                          <span>◉</span>
                          <span>
                            {question.views >= 1000
                              ? `${(question.views / 1000).toFixed(1)}k`
                              : question.views}{" "}
                            views
                          </span>
                        </div>

                      </div>

                      {/* Bookmark Button */}
                      <button
                        className="bookmark-remove-button"
                        title="Remove bookmark"
                      >
                        🔖
                      </button>

                    </article>

                  ))
                )}

              </div>

            </section>

            {/* Right Sidebar */}
            <aside className="bookmarks-right-sidebar">

              {/* Filters */}
              <section className="bookmark-filter-card">

                <div className="bookmark-side-title">
                  <span>⚱</span>
                  <h2>Filter Bookmarks</h2>
                </div>

                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option>All Categories</option>
                  <option>Web Development</option>
                  <option>DSA</option>
                  <option>React</option>
                  <option>DevOps</option>
                </select>

                <label>Tags</label>

                <input
                  type="text"
                  placeholder="Search tags..."
                />

                <div className="bookmark-checkboxes">

                  <label>
                    <input type="checkbox" />
                    React <span>(12)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    JavaScript <span>(8)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    Python <span>(5)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    Django <span>(4)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    DSA <span>(6)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    DevOps <span>(3)</span>
                  </label>

                  <label>
                    <input type="checkbox" />
                    Others <span>(2)</span>
                  </label>

                </div>

              </section>

              {/* Stats */}
              <section className="bookmark-stats-card">

                <div className="bookmark-side-title">
                  <span>▥</span>
                  <h2>Bookmark Stats</h2>
                </div>

                <div className="bookmark-total">

                  <div>
                    <strong>
                      {bookmarks.length}
                    </strong>

                    <span>
                      Total Bookmarked
                      <br />
                      Questions
                    </span>
                  </div>

                  <div className="bookmark-big-icon">
                    🔖
                  </div>

                </div>

              </section>

            </aside>

          </div>

        </main>

      </div>
    </div>
  );
}

export default Bookmarks;
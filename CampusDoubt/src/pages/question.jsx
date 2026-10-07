import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Latest");
  const [search, setSearch] = useState("");

  const categories = [
    "AI/ML",
    "DSA",
    "Python",
    "Frontend",
    "Backend",
    "Cyber Security",
    "ML",
  ];

  const questions = [
    {
      title: "How to implement JWT authentication in backend?",
      tags: ["Backend", "Authentication", "Node.js", "JWT"],
      description:
        "I am building a backend using Node.js and Express. I want to implement JWT authentication. Can someone explain the complete flow with code example?",
      votes: 24,
      answers: 12,
      views: 456,
      author: "Rahul Sharma",
      time: "2 hours ago",
    },
    {
      title: "Difference between supervised and unsupervised learning?",
      tags: ["ML", "AI/ML", "Concepts"],
      description:
        "Can someone explain the key differences between supervised and unsupervised learning with examples?",
      votes: 18,
      answers: 6,
      views: 320,
      author: "Ananya Verma",
      time: "4 hours ago",
    },
    {
      title: "Best way to learn Python for web development?",
      tags: ["Python", "Web Development", "Roadmap"],
      description:
        "What is the best way to learn Python for web development? Any roadmap or resources?",
      votes: 30,
      answers: 18,
      views: 512,
      author: "Neha Gupta",
      time: "10 hours ago",
    },
    {
      title: "How to handle refresh tokens securely?",
      tags: ["Backend", "Security", "JWT"],
      description:
        "What are the best practices to handle refresh tokens securely in a production application?",
      votes: 12,
      answers: 8,
      views: 210,
      author: "Karan Patel",
      time: "12 hours ago",
    },
    {
      title: "Difference between SQL and NoSQL?",
      tags: ["Database", "SQL", "NoSQL"],
      description:
        "When should we use SQL vs NoSQL? What are the real world use cases?",
      votes: 15,
      answers: 10,
      views: 300,
      author: "Aman Verma",
      time: "1 day ago",
    },
  ];

  const contributors = [
    {
      name: "Aman Verma",
      reputation: "1.2k",
    },
    {
      name: "Priya Singh",
      reputation: "980",
    },
    {
      name: "Karan Patel",
      reputation: "560",
    },
    {
      name: "Neha Sharma",
      reputation: "420",
    },
    {
      name: "Abhinav Gupta",
      reputation: "310",
    },
  ];

  const trendingTopics = [
    { name: "Python", questions: "1.2K questions" },
    { name: "DSA", questions: "980 questions" },
    { name: "AI/ML", questions: "850 questions" },
    { name: "Web Development", questions: "740 questions" },
    { name: "Cyber Security", questions: "620 questions" },
  ];

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(search.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "All" ||
      question.tags.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="questions-page">

      {/* =========================
          TOP NAVBAR
      ========================= */}

      <header className="questions-navbar">

        <div className="questions-logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🎓 <span>Campus</span>Doubt
        </div>

        <nav className="questions-top-links">
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</a>

          <a onClick={() => navigate("/question")} className="active" style={{ cursor: "pointer" }}>
            Questions
          </a>

          <a onClick={() => navigate("/categories")} style={{ cursor: "pointer" }}>Categories</a>

          <a style={{ cursor: "pointer" }}>About</a>
        </nav>

        <div className="questions-top-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search questions, topics, or users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <button className="ask-top-btn" onClick={() => navigate("/askquestion")}>
          Ask Question
        </button>

        <div className="notification-icon">
          ♧
        </div>

        <div className="user-profile" style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>
          <div className="user-avatar">
            P
          </div>

          <span>Priya</span>

          <span>⌄</span>
        </div>

      </header>


      {/* =========================
          PAGE LAYOUT
      ========================= */}

      <div className="questions-layout">


        {/* =========================
            LEFT SIDEBAR
        ========================= */}

        <aside className="questions-sidebar">

          <div className="sidebar-menu">

            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <span>⌂</span>
              Home
            </a>

            <a onClick={() => navigate("/question")} className="selected" style={{ cursor: "pointer" }}>
              <span>⌕</span>
              Questions
            </a>

            <a onClick={() => navigate("/askquestion")} style={{ cursor: "pointer" }}>
              <span>⊕</span>
              Ask a Question
            </a>

            <a onClick={() => navigate("/question")} style={{ cursor: "pointer" }}>
              <span>♨</span>
              Trending
            </a>

            <a onClick={() => navigate("/bookmarks")} style={{ cursor: "pointer" }}>
              <span>♡</span>
              Bookmarks
            </a>

            <a onClick={() => navigate("/myanswer")} style={{ cursor: "pointer" }}>
              <span>♙</span>
              My Answers
            </a>

            <a onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
              <span>♙</span>
              Profile
            </a>

          </div>


          {/* Categories */}

          <div className="sidebar-categories">

            <h3>Categories</h3>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                <span>▣</span>
                {category}
              </button>
            ))}

            <button className="see-all-btn">
              See All →
            </button>

          </div>


          {/* Illustration */}

          <div className="sidebar-illustration">

            <div className="light-bulb">
              💡
            </div>

            <div className="student-illustration">
              👨‍💻
            </div>

            <p>
              Have a doubt?
              <br />
              Ask the community!
            </p>

          </div>

        </aside>


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="questions-main">


          {/* Hero */}

          <section className="questions-hero">

            <div className="hero-content">

              <h1>Questions</h1>

              <p>
                Explore questions, get answers,
                and learn with the community.
              </p>

            </div>

            <div className="hero-illustration">
              👩‍💻
            </div>

          </section>


          {/* Search */}

          <div className="questions-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search questions, tags, or users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>
              ⌕
            </button>

          </div>


          {/* Category Filters */}

          <div className="category-filters">

            <button
              className={activeCategory === "All" ? "active" : ""}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>


          {/* Tabs */}

          <div className="question-tabs">

            {[
              "Latest",
              "Most Voted",
              "Most Answered",
              "Unanswered",
            ].map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}

          </div>


          {/* Question Cards */}

          <div className="questions-list">

            {filteredQuestions.length === 0 ? (

              <div className="no-questions">
                <h3>No questions found</h3>

                <p>
                  Try another search or category.
                </p>
              </div>

            ) : (

              filteredQuestions.map((question, index) => (

                <article
                  className="question-list-card"
                  key={index}
                >

                  {/* Votes */}

                  <div className="question-votes">

                    <button>⌃</button>

                    <strong>
                      {question.votes}
                    </strong>

                    <button>⌄</button>

                  </div>


                  {/* Question Content */}

                  <div className="question-list-content">

                    <a
                      onClick={() => navigate("/questiondetail")}
                      style={{ cursor: "pointer" }}
                      className="question-title"
                    >
                      {question.title}
                    </a>


                    <div className="question-tags">

                      {question.tags.map((tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      ))}

                    </div>


                    <p className="question-description">
                      {question.description}
                    </p>


                    <div className="question-card-bottom">

                      <div className="question-stats">

                        <span>
                          ♧ {question.answers} answers
                        </span>

                        <span>
                          ◉ {question.views} views
                        </span>

                      </div>


                      <div className="question-author">

                        <div className="small-avatar">
                          {question.author.charAt(0)}
                        </div>

                        <span>
                          {question.author}
                        </span>

                        <span>
                          • {question.time}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Bookmark */}

                  <button className="question-bookmark">
                    ♡
                  </button>

                </article>

              ))

            )}

          </div>

        </main>


        {/* =========================
            RIGHT SIDEBAR
        ========================= */}

        <aside className="questions-right-sidebar">


          {/* Ask Question */}

          <div className="right-card ask-card">

            <h2>
              Ask a Question
            </h2>

            <p>
              Have a doubt? Ask the community
              and get helpful answers.
            </p>

            <button className="ask-question-btn" onClick={() => navigate("/askquestion")}>
              ⊕ &nbsp; Ask Question
            </button>

          </div>


          {/* Trending */}

          <div className="right-card">

            <div className="right-card-header">

              <h2>
                Trending Topics
              </h2>

              <a href="#">
                See All →
              </a>

            </div>


            <div className="trending-list">

              {trendingTopics.map((topic) => (

                <div
                  className="trending-item"
                  key={topic.name}
                >

                  <span className="hash">
                    #
                  </span>

                  <span className="topic-name">
                    {topic.name}
                  </span>

                  <span className="topic-count">
                    {topic.questions}
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* Contributors */}

          <div className="right-card">

            <div className="right-card-header">

              <h2>
                Top Contributors
              </h2>

              <a href="#">
                See All →
              </a>

            </div>


            <div className="contributors-list">

              {contributors.map((person, index) => (

                <div
                  className="contributor"
                  key={person.name}
                >

                  <div className="contributor-avatar">
                    {person.name.charAt(0)}
                  </div>

                  <strong>
                    {person.name}
                  </strong>

                  {index < 3 && (
                    <span className="crown">
                      ♛
                    </span>
                  )}

                  <span className="reputation">
                    {person.reputation} rep
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* Community Card */}

          <div className="community-card">

            <div>

              <h2>
                Join the Community
              </h2>

              <p>
                Ask, answer, and grow together
                with thousands of college students.
              </p>

              <button>
                Get Started
              </button>

            </div>

            <div className="community-image">
              👨‍💻
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default Questions;
import { useState } from "react";
import { Link } from "react-router-dom";

import girlWithBook from "../assets/girlwithbook.png";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";

function MyAnswers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Answers");
  const [tag, setTag] = useState("All Tags");
  const [activeTab, setActiveTab] = useState("All Answers");

  const answers = [
    {
      id: 1,
      title: "How does React's useEffect hook work?",
      answer:
        "useEffect is a React hook that lets you perform side effects in functional components. It runs after the component renders and can be used for...",
      votes: 12,
      comments: 8,
      tags: ["react", "javascript", "frontend"],
      date: "Oct 5, 2026",
      status: "Accepted",
    },
    {
      id: 2,
      title: "What is the difference between let, const and var?",
      answer:
        "The main differences are scope, hoisting, and re-assignment. var is function scoped, let and const are block scoped. const cannot...",
      votes: 5,
      comments: 4,
      tags: ["javascript", "web-development", "basics"],
      date: "Oct 3, 2026",
      status: "Not Accepted",
    },
    {
      id: 3,
      title: "How to connect React frontend with Node.js backend?",
      answer:
        "You can connect React with Node.js using REST APIs. In React, use fetch or axios to make API calls to your Express backend. Make sure CORS is...",
      votes: 18,
      comments: 12,
      tags: ["react", "nodejs", "api", "express"],
      date: "Sep 28, 2026",
      status: "Accepted",
    },
    {
      id: 4,
      title: "What are the main features of Java 17?",
      answer:
        "Java 17 is an LTS version and includes features like sealed classes, pattern matching, records, switch expressions, and improved performance...",
      votes: 7,
      comments: 3,
      tags: ["java", "oop", "programming"],
      date: "Sep 25, 2026",
      status: "Not Accepted",
    },
    {
      id: 5,
      title: "How to prepare for DSA in college?",
      answer:
        "Start with basic data structures like arrays, strings and linked lists, then move to recursion, sorting, searching, trees and graphs. Practice regularly...",
      votes: 3,
      comments: 6,
      tags: ["dsa", "placement", "coding"],
      date: "Sep 20, 2026",
      status: "Not Accepted",
    },
  ];

  const filteredAnswers = answers.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((itemTag) =>
        itemTag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus =
      status === "All Answers" || item.status === status;

    const matchesTag =
      tag === "All Tags" || item.tags.includes(tag);

    const matchesTab =
      activeTab === "All Answers" ||
      (activeTab === "Accepted" && item.status === "Accepted") ||
      (activeTab === "Not Accepted" &&
        item.status === "Not Accepted");

    return (
      matchesSearch &&
      matchesStatus &&
      matchesTag &&
      matchesTab
    );
  });

  return (
    <div
      className="my-answers-page"
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
      {/* ================= NAVBAR ================= */}

      <header className="my-answers-navbar">

        <div className="my-answers-logo">
          <span>Smart</span>College
        </div>

        <nav className="my-answers-nav">
          <Link to="/home">Home</Link>
          <Link to="/questions">Questions</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/ask-question">Ask Question</Link>
        </nav>

        <div className="my-answers-top-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search questions, topics, or users..."
          />
        </div>

        <button className="my-answers-notification">
          ♧
        </button>

        <Link
          to="/profile"
          className="my-answers-user"
        >
          <img
            src={studentPhoto}
            alt="Priya"
          />

          <span>Priya</span>

          <span>⌄</span>
        </Link>

      </header>


      {/* ================= PAGE LAYOUT ================= */}

      <div className="my-answers-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="my-answers-sidebar">

          <div className="my-answers-menu">

            <Link to="/home">
              <span>⌂</span>
              Home
            </Link>

            <Link to="/questions">
              <span>▤</span>
              Questions
            </Link>

            <Link to="/ask-question">
              <span>＋</span>
              Ask Question
            </Link>

            <Link
              to="/my-answers"
              className="active"
            >
              <span>☷</span>
              My Answers
            </Link>

            <Link to="/bookmarks">
              <span>🔖</span>
              Bookmarks
            </Link>

            <Link to="/categories">
              <span>▦</span>
              Categories
            </Link>

            <Link to="/trending">
              <span>▥</span>
              Trending
            </Link>

            <Link to="/profile">
              <span>♙</span>
              Profile
            </Link>

          </div>


          {/* Need Help */}

          <div className="my-answers-help-card">

            <div className="my-answers-help-content">

              <h2>
                Need Help
                <br />
                with a Question?
              </h2>

              <p>
                Ask the community and get
                answers from fellow students!
              </p>

              <Link to="/ask-question">
                Ask a Question →
              </Link>

            </div>

            <img
              src={girlWithBook}
              alt="Student asking a question"
              className="my-answers-help-image"
            />

          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="my-answers-main">

          <div className="my-answers-heading">

            <h1>My Answers</h1>

            <p>
              View and manage all the answers you
              have posted on SmartCollege.
            </p>

          </div>


          {/* ================= TABS ================= */}

          <div className="my-answers-controls">

            <div className="my-answers-tabs">

              <button
                className={
                  activeTab === "All Answers"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("All Answers")
                }
              >
                All Answers (12)
              </button>

              <button
                className={
                  activeTab === "Accepted"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Accepted")
                }
              >
                Accepted (5)
              </button>

              <button
                className={
                  activeTab === "Not Accepted"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Not Accepted")
                }
              >
                Not Accepted (7)
              </button>

            </div>

            <select className="my-answers-sort">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Votes</option>
            </select>

          </div>


          {/* ================= ANSWERS ================= */}

          <div className="my-answers-list">

            {filteredAnswers.length === 0 ? (

              <div className="my-answers-empty">

                <div>☷</div>

                <h2>No answers found</h2>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredAnswers.map((item) => (

                <article
                  className="my-answer-card"
                  key={item.id}
                >

                  {/* Votes */}

                  <div className="my-answer-votes">

                    <button>⌃</button>

                    <strong>
                      {item.votes}
                    </strong>

                    <button>⌄</button>

                  </div>


                  {/* Content */}

                  <div className="my-answer-content">

                    <Link
                      to="/question-detail"
                      className="my-answer-title"
                    >
                      {item.title}
                    </Link>

                    <p className="my-answer-text">
                      {item.answer}
                    </p>


                    {/* Tags */}

                    <div className="my-answer-tags">

                      {item.tags.map((itemTag) => (

                        <span key={itemTag}>
                          {itemTag}
                        </span>

                      ))}

                    </div>

                  </div>


                  {/* Right Info */}

                  <div className="my-answer-info">

                    {item.status === "Accepted" && (

                      <span className="accepted-answer">
                        ✓ Accepted Answer
                      </span>

                    )}

                    <div className="my-answer-comments">
                      <span>▢</span>
                      <span>{item.comments}</span>
                    </div>

                    <span className="my-answer-date">
                      {item.date}
                    </span>

                  </div>

                </article>

              ))

            )}

          </div>

        </main>


        {/* ================= RIGHT SIDEBAR ================= */}

        <aside className="my-answers-right">

          {/* Search */}

          <section className="my-answers-filter-card">

            <h2>Search my answers</h2>

            <div className="my-answers-search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search in your answers..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <label>
              Filter by status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Answers</option>
              <option>Accepted</option>
              <option>Not Accepted</option>
            </select>


            <label>
              Filter by tag
            </label>

            <select
              value={tag}
              onChange={(e) =>
                setTag(e.target.value)
              }
            >
              <option>All Tags</option>
              <option>react</option>
              <option>javascript</option>
              <option>nodejs</option>
              <option>java</option>
              <option>dsa</option>
              <option>placement</option>
            </select>

          </section>


          {/* Help card */}

          <section className="my-answers-community-card">

            <h2>
              Need Help
              <br />
              with a Question?
            </h2>

            <p>
              Ask the community and get
              answers from fellow students!
            </p>

            <Link to="/ask-question">
              Ask a Question →
            </Link>

            <img
              src={girlWithBook}
              alt="Student"
            />

          </section>

        </aside>

      </div>

    </div>
  );
}

export default MyAnswers;
import { useState } from "react";
import girlWithBook from "../assets/girlwithbook.png";

function QuestionDetail() {
  const [votes, setVotes] = useState(24);
  const [bookmarked, setBookmarked] = useState(false);
  const [answer, setAnswer] = useState("");

  const answers = [
    {
      name: "Aman Verma",
      avatar: "A",
      time: "1 hour ago",
      votes: 12,
      text:
        "JWT authentication usually works by generating a token after successful login and sending that token with future API requests. You can verify the token on protected routes using middleware in Express.",
      helpful: true,
    },
    {
      name: "Priya Singh",
      avatar: "P",
      time: "45 minutes ago",
      votes: 8,
      text:
        "You should also keep your JWT secret secure and use refresh tokens when you need longer sessions. It is a good practice to store refresh tokens securely.",
      helpful: false,
    },
  ];

  const relatedQuestions = [
    {
      title: "How does JWT authentication work?",
      answers: "12 answers",
    },
    {
      title: "Access token vs refresh token?",
      answers: "8 answers",
    },
    {
      title: "How to secure Node.js APIs?",
      answers: "15 answers",
    },
    {
      title: "Express authentication best practices",
      answers: "10 answers",
    },
    {
      title: "Difference between session and JWT?",
      answers: "6 answers",
    },
  ];

  return (
    <div className="question-detail-page">

      {/* Navbar */}
      <header className="question-detail-navbar">

        <div className="question-detail-logo">
          🎓 <span>Smart</span> College
        </div>

        <nav className="question-detail-nav">
          <a href="/home">Home</a>
          <a href="/questions" className="active">
            Questions
          </a>
          <a href="#">Categories</a>
          <a href="#">Trending</a>
        </nav>

        <div className="question-detail-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search questions, topics, or users..."
          />
        </div>

        <button className="question-detail-ask-button">
          Ask Question
        </button>

        <div className="question-detail-notification">
          ♧
        </div>

        <div className="question-detail-user">
          <div className="question-detail-user-avatar">
            P
          </div>
          <span>Priya</span>
          <span>⌄</span>
        </div>

      </header>

      {/* Page Layout */}
      <div className="question-detail-layout">

        {/* Left Sidebar */}
        <aside className="question-detail-left-sidebar">

          <div className="question-detail-menu">

            <a href="/home">
              <span>⌂</span>
              Home
            </a>

            <a href="/questions" className="selected">
              <span>⌕</span>
              Questions
            </a>

            <a href="#">
              <span>⊕</span>
              Ask a Question
            </a>

            <a href="#">
              <span>♨</span>
              Trending
            </a>

            <a href="#">
              <span>♡</span>
              Bookmarks
            </a>

            <a href="#">
              <span>▤</span>
              My Answers
            </a>

            <a href="#">
              <span>♙</span>
              Profile
            </a>

          </div>

          {/* Need Help Card */}
          <div className="need-help-card">

            <div className="need-help-content">
              <h2>Need Help?</h2>

              <p>
                Ask the community and get answers
                from other college students.
              </p>

              <button>
                Ask Question
              </button>
            </div>

            <img
              src={girlWithBook}
              alt="Student with books"
              className="need-help-image"
            />

          </div>

        </aside>

        {/* Main Content */}
        <main className="question-detail-main">

          <a href="/questions" className="back-to-questions">
            ← Back to Questions
          </a>

          {/* Question */}
          <article className="question-detail-card">

            <div className="question-detail-voting">

              <button
                onClick={() => setVotes(votes + 1)}
              >
                ⌃
              </button>

              <strong>{votes}</strong>

              <button
                onClick={() => setVotes(votes - 1)}
              >
                ⌄
              </button>

              <button
                className={
                  bookmarked
                    ? "detail-bookmark active"
                    : "detail-bookmark"
                }
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? "♥" : "♡"}
              </button>

            </div>

            <div className="question-detail-content">

              <div className="question-detail-top">

                <div className="question-detail-meta">
                  Asked 2 hours ago
                </div>

              </div>

              <h1>
                How to implement JWT authentication
                in backend?
              </h1>

              <div className="question-detail-tags">
                <span>Backend</span>
                <span>Authentication</span>
                <span>Node.js</span>
                <span>JWT</span>
              </div>

              <p>
                I am building a backend using Node.js
                and Express. I want to implement JWT
                authentication in my application.
              </p>

              <p>
                Can someone explain the complete JWT
                authentication flow and how I should
                securely handle access tokens and
                refresh tokens?
              </p>

              <div className="question-code-box">

                <div className="code-language">
                  js
                </div>

                <div className="code-content">
                  <div>POST /api/login</div>
                  <div>
                    Authorization: Bearer &lt;token&gt;
                  </div>
                </div>

                <button>
                  ▣
                </button>

              </div>

              <div className="question-detail-bottom">

                <div className="question-detail-stats">
                  <span>▢ 12 Answers</span>
                  <span>◉ 456 Views</span>
                </div>

                <div className="question-detail-author">

                  <div className="detail-author-avatar">
                    R
                  </div>

                  <div>
                    <strong>Rahul Sharma</strong>
                    <small>Asked 2 hours ago</small>
                  </div>

                </div>

              </div>

            </div>

          </article>

          {/* Answers */}
          <section className="question-answers-section">

            <div className="answers-section-header">

              <h2>12 Answers</h2>

              <select defaultValue="helpful">
                <option value="helpful">
                  Most Helpful
                </option>
                <option value="newest">
                  Newest
                </option>
                <option value="oldest">
                  Oldest
                </option>
              </select>

            </div>

            {answers.map((item, index) => (
              <article
                className="question-answer-card"
                key={index}
              >

                <div className="answer-voting">

                  <button>⌃</button>

                  <strong>{item.votes}</strong>

                  <button>⌄</button>

                </div>

                <div className="answer-main">

                  <div className="answer-header">

                    <div className="answer-user">

                      <div className="answer-avatar">
                        {item.avatar}
                      </div>

                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.time}</small>
                      </div>

                    </div>

                    {item.helpful && (
                      <span className="helpful-answer">
                        ✓ Helpful Answer
                      </span>
                    )}

                  </div>

                  <p>
                    {item.text}
                  </p>

                  <div className="answer-actions">

                    <button>
                      ▢ Reply
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </section>

          {/* Write Answer */}
          <section className="write-answer-section">

            <h2>Your Answer</h2>

            <p>
              Help the community by sharing your
              knowledge and experience.
            </p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here..."
            />

            <div className="write-answer-bottom">

              <span>
                ⓘ Be clear and helpful in your answer.
              </span>

              <button>
                Post Your Answer
              </button>

            </div>

          </section>

        </main>

        {/* Right Sidebar */}
        <aside className="question-detail-right-sidebar">

          {/* Stats */}
          <div className="detail-right-card stats-card">

            <h2>Question Stats</h2>

            <div className="detail-stat-row">
              <span>◉ &nbsp; Views</span>
              <strong>456</strong>
            </div>

            <div className="detail-stat-row">
              <span>▢ &nbsp; Answers</span>
              <strong>12</strong>
            </div>

            <div className="detail-stat-row">
              <span>⌃ &nbsp; Votes</span>
              <strong>{votes}</strong>
            </div>

          </div>

          {/* Related Questions */}
          <div className="detail-right-card related-card">

            <h2>Related Questions</h2>

            {relatedQuestions.map((question, index) => (
              <a href="#" key={index}>

                <span>
                  {question.title}
                </span>

                <small>
                  {question.answers}
                </small>

              </a>
            ))}

          </div>

          {/* Learn Together */}
          <div className="learn-together-card">

            <div className="learn-icon">
              💡
            </div>

            <div>
              <h2>Learn Together</h2>

              <p>
                Ask questions, share knowledge,
                and grow with your college community.
              </p>
            </div>

            <button>
              Explore Questions
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default QuestionDetail;
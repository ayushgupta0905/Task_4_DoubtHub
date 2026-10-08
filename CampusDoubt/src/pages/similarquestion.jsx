import { Link } from "react-router-dom";

import girlwithbook from "../assets/girlwithbook.png";
import studentphoto from "../assets/studentphoto.png";

import "./similarquestion.css";

const similarQuestions = [
  {
    votes: 145,
    answers: 32,
    similarity: "96% similar",
    title: "How to center a div horizontally and vertically in CSS?",
    description:
      "I want to center a div both horizontally and vertically on the page. What is the best approach using modern CSS?",
    tags: ["css", "html", "flexbox", "front-end"],
    author: "Aman Verma",
    time: "2 years ago",
  },
  {
    votes: 98,
    answers: 18,
    similarity: "92% similar",
    title: "Different ways to center a div in CSS",
    description:
      "What are the different methods to center a div in CSS? Can someone explain with examples using Flexbox, Grid and absolute positioning?",
    tags: ["css", "html", "layout", "grid", "flexbox"],
    author: "Sneha Gupta",
    time: "1 year ago",
  },
  {
    votes: 76,
    answers: 12,
    similarity: "87% similar",
    title: "Why is my div not centered even though I used margin: auto?",
    description:
      "I used margin: auto to center a div but it is not working. What could be the issue and how can I fix it?",
    tags: ["css", "html", "margin", "layout"],
    author: "Rohit Sharma",
    time: "8 months ago",
  },
  {
    votes: 54,
    answers: 10,
    similarity: "84% similar",
    title: "Center a div inside a parent div using CSS",
    description:
      "How can I center a div inside another div? I want both horizontal and vertical centering. What's the best method?",
    tags: ["css", "html", "flexbox", "parent-child"],
    author: "Neha Singh",
    time: "1 year ago",
  },
  {
    votes: 42,
    answers: 8,
    similarity: "78% similar",
    title: "Center text and div using CSS",
    description:
      "How to center both text and a div using CSS? I want it to work on all screen sizes and be responsive.",
    tags: ["css", "html", "text-align", "responsive"],
    author: "Karan Mehta",
    time: "1 year ago",
  },
];

function SimilarQuestion() {
  return (
    <div className="similar-page">

      {/* ================= NAVBAR ================= */}

      <header className="similar-navbar">

        <Link to="/" className="similar-logo">
          <div className="similar-logo-icon">
            🎓
          </div>

          <span>Smart College</span>
        </Link>


        <div className="similar-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search questions, topics or categories..."
          />

          <button>
            Search
          </button>

        </div>


        <div className="similar-navbar-right">

          <div className="similar-notification">
            🔔
            <span></span>
          </div>

          <div className="similar-profile">

            <img
              src={studentphoto}
              alt="Priya"
            />

            <strong>Priya</strong>

            <span>⌄</span>

          </div>

        </div>

      </header>


      {/* ================= PAGE LAYOUT ================= */}

      <div className="similar-layout">


        {/* ================= LEFT SIDEBAR ================= */}

        <aside className="similar-sidebar">

          <nav>

            <Link
              to="/"
              className="similar-side-link"
            >
              <span>⌂</span>
              Home
            </Link>


            <Link
              to="/ask-question"
              className="similar-side-link"
            >
              <span>?</span>
              Ask Question
            </Link>


            <Link
              to="/questions"
              className="similar-side-link"
            >
              <span>▣</span>
              Questions
            </Link>


            <Link
              to="/my-answers"
              className="similar-side-link"
            >
              <span>☑</span>
              My Answers
            </Link>


            <Link
              to="/bookmarks"
              className="similar-side-link"
            >
              <span>♡</span>
              Bookmarks
            </Link>


            <Link
              to="/categories"
              className="similar-side-link"
            >
              <span>⊞</span>
              Categories
            </Link>


            <Link
              to="/trending"
              className="similar-side-link"
            >
              <span>⌁</span>
              Trending
            </Link>


            <Link
              to="/search-results"
              className="similar-side-link"
            >
              <span>⌕</span>
              Search Results
            </Link>


            <Link
              to="/similar-questions"
              className="similar-side-link active"
            >
              <span>🔗</span>
              Similar Questions
            </Link>


            <Link
              to="/profile"
              className="similar-side-link"
            >
              <span>♙</span>
              Profile
            </Link>

          </nav>


          <div className="similar-sidebar-student">

            <img
              src={girlwithbook}
              alt="Student"
            />

          </div>

        </aside>


        {/* ================= MAIN CONTENT ================= */}

        <main className="similar-main">

          <div className="similar-heading">

            <h1>
              Similar Questions
            </h1>

            <p>
              Here are some questions similar to the one
              you're looking at. These might help you find
              the answer you need.
            </p>

          </div>


          {/* ================= ORIGINAL QUESTION ================= */}

          <div className="original-question">

            <div className="original-icon">
              📄
            </div>

            <div className="original-text">

              <span>
                Based on:
              </span>

              <strong>
                "How to center a div in CSS?"
              </strong>

            </div>

            <Link to="/question-detail">
              View Original Question →
            </Link>

          </div>


          {/* ================= SIMILAR QUESTIONS ================= */}

          <div className="similar-list">

            {similarQuestions.map(
              (question, index) => (

                <article
                  className="similar-card"
                  key={index}
                >

                  {/* VOTES */}

                  <div className="similar-votes">

                    <button>
                      ⌃
                    </button>

                    <strong>
                      {question.votes}
                    </strong>

                    <button>
                      ⌄
                    </button>

                    <div className="similar-answer-count">

                      {question.answers}

                      <span>
                        answers
                      </span>

                    </div>

                  </div>


                  {/* QUESTION CONTENT */}

                  <div className="similar-content">

                    <div className="similar-title-row">

                      <Link to="/question-detail">
                        {question.title}
                      </Link>

                      <span className="similarity-badge">
                        {question.similarity}
                      </span>

                    </div>


                    <p>
                      {question.description}
                    </p>


                    <div className="similar-bottom">

                      <div className="similar-tags">

                        {question.tags.map(
                          (tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          )
                        )}

                      </div>


                      <div className="similar-author">

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
            )}

          </div>

        </main>


        {/* ================= RIGHT HELP CARD ================= */}

        <aside className="similar-right">

          <div className="similar-help-card">

            <div className="similar-help-content">

              <h2>
                💡 Need Help?
              </h2>

              <p>
                Can't find the right answer?
                Ask the community or explore
                related questions.
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

export default SimilarQuestion;
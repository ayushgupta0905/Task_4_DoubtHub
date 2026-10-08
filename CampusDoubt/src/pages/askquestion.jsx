import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlWithBook from "../assets/girlwithbook.png";
import SimilarQuestions from "./similarquestion";
import "./similarquestion.css";

function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const recommendedQuestions = [
    {
      id: 1,
      title: "How to fix 'Module not found' error in React?",
      answers: 12,
      time: "2 days ago",
    },
    {
      id: 2,
      title: "What is the difference between useState and useEffect in React?",
      answers: 18,
      time: "4 days ago",
    },
    {
      id: 3,
      title: "How to connect React frontend with Node.js backend?",
      answers: 9,
      time: "5 days ago",
    },
    {
      id: 4,
      title: "How to handle CORS errors in React with Express backend?",
      answers: 15,
      time: "1 week ago",
    },
    {
      id: 5,
      title: "Best folder structure for a React project?",
      answers: 7,
      time: "1 week ago",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    alert(
      "Question posted successfully! Tags and category will be auto-assigned."
    );
  };

  const handleRecommend = () => {
    if (!title.trim() && !description.trim()) {
      alert("Please enter your question first.");
      return;
    }

    setShowRecommendations(true);
  };

  return (
    <div className="ask-question-page">

      {/* Navbar */}
      <header className="ask-question-navbar">

        <div className="ask-question-logo">
          🎓 <span>Smart</span> College
        </div>

        <nav className="ask-question-nav">
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</a>
          <a onClick={() => navigate("/question")} style={{ cursor: "pointer" }}>Questions</a>
          <a onClick={() => navigate("/categories")} style={{ cursor: "pointer" }}>Categories</a>
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Trending</a>
        </nav>

        <div className="ask-question-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search questions, topics, or users..."
          />
        </div>

        <button className="ask-question-top-button">
          Ask Question
        </button>

        <div className="ask-question-notification">
          ♧
        </div>

        <div className="ask-question-user">
          <div className="ask-question-user-avatar">
            P
          </div>

          <span>Priya</span>
          <span>⌄</span>
        </div>

      </header>


      {/* Main Layout */}
      <div className="ask-question-layout">

        {/* Left Sidebar */}
        <aside className="ask-question-left-sidebar">

          <div className="ask-question-menu">

            <a onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
              <span>⌂</span>
              Home
            </a>

            <a onClick={() => navigate("/questions")} style={{ cursor: "pointer" }}>
              <span>⌕</span>
              Questions
            </a>

            <a
              onClick={() => navigate("/ask-question")}
              className="selected"
              style={{ cursor: "pointer" }}
            >
              <span>⊕</span>
              Ask a Question
            </a>

            <a onClick={() => navigate("/trending")} style={{ cursor: "pointer" }}>
              <span>♨</span>
              Trending
            </a>

            <a onClick={() => navigate("/bookmarks")} style={{ cursor: "pointer" }}>
              <span>♡</span>
              Bookmarks
            </a>

            <a onClick={() => navigate("/my-answers")} style={{ cursor: "pointer" }}>
              <span>▤</span>
              My Answers
            </a>

            <a onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
              <span>♙</span>
              Profile
            </a>

          </div>


          {/* Need Help */}
          <div className="ask-question-help-card">

            <div className="ask-question-help-content">

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
              className="ask-question-student-image"
            />

          </div>

        </aside>


        {/* Center Form */}
        <main className="ask-question-main">

          <div className="ask-question-card">

            <div className="ask-question-heading">

              <h1>Ask a Question</h1>

              <p>
                Get help from the Smart College community.
                Be clear, detailed, and specific to get the best answers.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* Title */}
              <div className="ask-question-field">

                <div className="ask-question-label-row">

                  <label>
                    Title <span>*</span>
                  </label>

                  <small>
                    {title.length}/150
                  </small>

                </div>

                <input
                  type="text"
                  value={title}
                  maxLength={150}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setShowRecommendations(false);
                  }}
                  placeholder="e.g. How to implement JWT authentication in Node.js?"
                />

                <p className="field-help">
                  Be specific and clear about your question.
                </p>

              </div>


              {/* Description */}
              <div className="ask-question-field">

                <label>
                  Description <span>*</span>
                </label>

                <div className="description-editor">

                  <div className="editor-toolbar">

                    <select defaultValue="normal">
                      <option value="normal">
                        Normal
                      </option>

                      <option value="heading">
                        Heading
                      </option>
                    </select>

                    <button type="button">
                      <strong>B</strong>
                    </button>

                    <button type="button">
                      <em>I</em>
                    </button>

                    <button type="button">
                      <u>U</u>
                    </button>

                    <span className="toolbar-divider"></span>

                    <button type="button">
                      ☷
                    </button>

                    <button type="button">
                      ≡
                    </button>

                    <span className="toolbar-divider"></span>

                    <button type="button">
                      🔗
                    </button>

                    <button type="button">
                      &lt;/&gt;
                    </button>

                  </div>


                  <textarea
                    value={description}
                    maxLength={2000}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setShowRecommendations(false);
                    }}
                    placeholder="Provide more details about your question..."
                  />

                </div>

                <div className="description-counter">
                  {description.length}/2000
                </div>

              </div>


              {/* Bottom Actions */}
              <div className="ask-question-actions">

                <button
                  type="button"
                  className="recommend-button"
                  onClick={handleRecommend}
                >
                  ✦ &nbsp; Recommend
                </button>

                <button
                  type="button"
                  className="preview-question-button"
                >
                  ◉ &nbsp; Preview
                </button>

                <button
                  type="submit"
                  className="post-question-button"
                >
                  ➤ &nbsp; Post Question
                </button>

              </div>

            </form>

          </div>


          {/* Recommended Questions */}
          {showRecommendations && (
            <SimilarQuestions
              questions={recommendedQuestions}
            />
          )}

        </main>


        {/* Right Sidebar */}
        <aside className="ask-question-right-sidebar">

          {/* Tips */}
          <div className="ask-question-right-card">

            <div className="right-card-title yellow-title">

              <span>💡</span>

              <h2>
                Tips for a Good Question
              </h2>

            </div>

            <ul className="tips-list">

              <li>
                Be clear and specific
              </li>

              <li>
                Provide enough context
              </li>

              <li>
                Include relevant code snippets
              </li>

              <li>
                Mention what you have tried
              </li>

              <li>
                Specify the expected output
              </li>

              <li>
                Be respectful and follow community guidelines
              </li>

            </ul>

          </div>


          {/* Community Guidelines */}
          <div className="ask-question-right-card">

            <div className="right-card-title yellow-title">

              <span>📖</span>

              <h2>
                Community Guidelines
              </h2>

            </div>

            <ul className="guidelines-list">

              <li>
                Search existing questions first
              </li>

              <li>
                Be respectful and kind
              </li>

              <li>
                Ask one question at a time
              </li>

              <li>
                Provide meaningful details
              </li>

              <li>
                Follow our code of conduct
              </li>

            </ul>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default AskQuestion;
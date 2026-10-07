import { useState } from "react";
import girlWithBook from "../assets/girlwithbook.png";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const popularTags = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Database",
    "HTML",
    "CSS",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !tags.trim() ||
      !category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Question posted successfully!");
  };

  return (
    <div className="ask-question-page">

      {/* Navbar */}
      <header className="ask-question-navbar">

        <div className="ask-question-logo">
          🎓 <span>Smart</span> College
        </div>

        <nav className="ask-question-nav">
          <a href="/home">Home</a>
          <a href="/questions">Questions</a>
          <a href="#">Categories</a>
          <a href="/trending">Trending</a>
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

            <a href="/home">
              <span>⌂</span>
              Home
            </a>

            <a href="/questions">
              <span>⌕</span>
              Questions
            </a>

            <a
              href="/ask-question"
              className="selected"
            >
              <span>⊕</span>
              Ask a Question
            </a>

            <a href="/trending">
              <span>♨</span>
              Trending
            </a>

            <a href="/bookmarks">
              <span>♡</span>
              Bookmarks
            </a>

            <a href="/my-answers">
              <span>▤</span>
              My Answers
            </a>

            <a href="/profile">
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
                  onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Provide more details about your question..."
                  />

                </div>

                <div className="description-counter">
                  {description.length}/2000
                </div>

              </div>


              {/* Tags */}
              <div className="ask-question-field">

                <div className="ask-question-label-row">

                  <label>
                    Tags <span>*</span>
                  </label>

                  <small>
                    {tags
                      ? tags
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean).length
                      : 0}
                    /5
                  </small>

                </div>


                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags (e.g. React, Node.js, Python)"
                />

                <p className="field-help">
                  Add up to 5 relevant tags to help others find your question.
                </p>


                <div className="popular-tags">

                  <span>
                    Popular tags:
                  </span>

                  {popularTags.map((tag) => (

                    <button
                      type="button"
                      key={tag}
                      onClick={() => {

                        const currentTags = tags
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean);

                        if (
                          currentTags.length < 5 &&
                          !currentTags.includes(tag)
                        ) {
                          setTags(
                            [...currentTags, tag].join(", ")
                          );
                        }

                      }}
                    >
                      {tag}
                    </button>

                  ))}

                </div>

              </div>


              {/* Category */}
              <div className="ask-question-field">

                <label>
                  Category <span>*</span>
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option value="">
                    Select a category
                  </option>

                  <option value="AI/ML">
                    AI / ML
                  </option>

                  <option value="DSA">
                    DSA
                  </option>

                  <option value="Python">
                    Python
                  </option>

                  <option value="Frontend">
                    Frontend
                  </option>

                  <option value="Backend">
                    Backend
                  </option>

                  <option value="Cyber Security">
                    Cyber Security
                  </option>

                  <option value="Database">
                    Database
                  </option>

                </select>

              </div>


              {/* Bottom Actions */}
              <div className="ask-question-actions">

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
                Use relevant tags
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
import { Link } from "react-router-dom";

import girlwithbook from "../assets/girlwithbook.png";
import studentphoto from "../assets/studentphoto.png";

import "./categories.css";

const categories = [
  {
    icon: "💻",
    title: "Programming",
    description:
      "Questions about programming languages, problem solving and coding concepts.",
    questions: "12.4k questions",
  },
  {
    icon: "</>",
    title: "Web Development",
    description:
      "Frontend, backend, full stack development, frameworks and web technologies.",
    questions: "8.7k questions",
  },
  {
    icon: "🗄️",
    title: "Database",
    description:
      "DBMS, SQL, NoSQL, database design, optimization and related topics.",
    questions: "4.2k questions",
  },
  {
    icon: "🧠",
    title: "Data Structures & Algorithms",
    description:
      "DSA concepts, problem solving, time complexity and algorithms.",
    questions: "9.6k questions",
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence & ML",
    description:
      "Machine learning, deep learning, AI models and related concepts.",
    questions: "5.4k questions",
  },
  {
    icon: "🔐",
    title: "Cybersecurity",
    description:
      "Network security, ethical hacking, cryptography and cybersecurity topics.",
    questions: "2.9k questions",
  },
  {
    icon: "🌐",
    title: "Computer Networks",
    description:
      "Networking concepts, protocols, security and internet technologies.",
    questions: "3.1k questions",
  },
];

function Categories() {
  return (
    <div className="categories-page">

      {/* ================= NAVBAR ================= */}

      <header className="categories-navbar">

        <Link to="/" className="categories-logo">
          <div className="categories-logo-icon">
            🎓
          </div>

          <span>Smart College</span>
        </Link>

        <div className="categories-navbar-right">

          <div className="categories-notification">
            🔔
            <span></span>
          </div>

          <div className="categories-profile">

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

      <div className="categories-layout">


        {/* ================= LEFT SIDEBAR ================= */}

        <aside className="categories-sidebar">

          <nav>

            <Link
              to="/"
              className="category-side-link"
            >
              <span>⌂</span>
              Home
            </Link>


            <Link
              to="/ask-question"
              className="category-side-link"
            >
              <span>?</span>
              Ask Question
            </Link>


            <Link
              to="/questions"
              className="category-side-link"
            >
              <span>▣</span>
              Questions
            </Link>


            <Link
              to="/my-answers"
              className="category-side-link"
            >
              <span>☑</span>
              My Answers
            </Link>


            <Link
              to="/bookmarks"
              className="category-side-link"
            >
              <span>♡</span>
              Bookmarks
            </Link>


            <Link
              to="/categories"
              className="category-side-link active"
            >
              <span>⊞</span>
              Categories
            </Link>


            <Link
              to="/trending"
              className="category-side-link"
            >
              <span>⌁</span>
              Trending
            </Link>


            <Link
              to="/search-results"
              className="category-side-link"
            >
              <span>⌕</span>
              Search Results
            </Link>


            <Link
              to="/profile"
              className="category-side-link"
            >
              <span>♙</span>
              Profile
            </Link>

          </nav>


          {/* Bottom student illustration */}

          <div className="categories-sidebar-student">

            <img
              src={girlwithbook}
              alt="Student"
            />

          </div>

        </aside>



        {/* ================= MAIN CONTENT ================= */}

        <main className="categories-main">

          <div className="categories-heading">

            <h1>Categories</h1>

            <p>
              Explore questions by topic. Find what interests you
              and join the discussion.
            </p>

          </div>


          {/* CATEGORY GRID */}

          <div className="categories-grid">

            {categories.map((category, index) => (

              <div
                className={`category-card category-card-${index + 1}`}
                key={category.title}
              >

                <div className="category-icon">
                  {category.icon}
                </div>


                <div className="category-card-content">

                  <h2>
                    {category.title}
                  </h2>

                  <p>
                    {category.description}
                  </p>

                </div>


                <div className="category-card-bottom">

                  <span>
                    {category.questions}
                  </span>

                  <button>
                    →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </main>



        {/* ================= RIGHT SIDEBAR ================= */}

        <aside className="categories-right">


          {/* NEED HELP */}

          <div className="category-help-card">

            <div className="category-help-content">

              <h2>
                💡 Need Help?
              </h2>

              <p>
                Can't find the right category?
                Ask the community or explore
                the available topics.
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

export default Categories;
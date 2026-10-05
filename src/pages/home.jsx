import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-page">

      <header className="home-header">

        <div className="logo">
          🎓 DoubtHub
        </div>

        <div className="header-links">

          <Link to="/home">
            Home
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/ask-question">
            <button>Ask Question</button>
          </Link>

        </div>

      </header>

      <main className="home-content">

        <div className="welcome">
          <h1>Welcome to DoubtHub 👋</h1>
          <p>Ask questions, find answers and learn together.</p>
        </div>

        <div className="search-box">

          <Link to="/search">
            <input
              type="text"
              placeholder="Search your doubt..."
              readOnly
            />
          </Link>

        </div>

        <div className="topics">

          <button>All</button>
          <button>Programming</button>
          <button>Electronics</button>
          <button>Mathematics</button>
          <button>Physics</button>

        </div>

        <div className="question-section">

          <div className="section-heading">

            <h2>Latest Questions</h2>

            <span>View all</span>

          </div>

          <Link to="/question" className="question-link">

            <div className="question-card">

              <div className="question-info">

                <h3>
                  How does a transistor work as a switch?
                </h3>

                <p>
                  I am confused about the ON and OFF states
                  of a transistor. Can someone explain it simply?
                </p>

                <div className="tags">
                  <span>Electronics</span>
                  <span>Transistor</span>
                </div>

                <small>
                  Asked 2 hours ago • 3 answers
                </small>

              </div>

              <div className="votes">
                <strong>12</strong>
                <span>votes</span>
              </div>

            </div>

          </Link>

          <Link to="/question" className="question-link">

            <div className="question-card">

              <div className="question-info">

                <h3>
                  What is the difference between let and const?
                </h3>

                <p>
                  I am learning JavaScript and want to understand
                  when to use let and when to use const.
                </p>

                <div className="tags">
                  <span>Programming</span>
                  <span>JavaScript</span>
                </div>

                <small>
                  Asked 5 hours ago • 5 answers
                </small>

              </div>

              <div className="votes">
                <strong>8</strong>
                <span>votes</span>
              </div>

            </div>

          </Link>

        </div>

      </main>

    </div>
  )
}

export default Home
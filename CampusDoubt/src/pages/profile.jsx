import studentPhoto from "../assets/studentphoto.png";
import girlWithBook from "../assets/girlwithbook.png";

function Profile() {
  const recentQuestions = [
    {
      title: "How to connect React frontend with Django backend?",
      tags: ["React", "Django", "API"],
      answers: "5 answers",
      time: "2 days ago",
    },
    {
      title: "Best resources to learn DSA in 2025?",
      tags: ["DSA", "Placement", "Resources"],
      answers: "12 answers",
      time: "5 days ago",
    },
    {
      title: "How to deploy a full stack project for free?",
      tags: ["Deployment", "Render", "Vercel"],
      answers: "8 answers",
      time: "1 week ago",
    },
  ];

  const topTags = [
    { name: "React", count: 18 },
    { name: "JavaScript", count: 12 },
    { name: "Python", count: 10 },
    { name: "Django", count: 8 },
    { name: "HTML", count: 6 },
  ];

  const activities = [
    {
      text: "Answered a question",
      time: "2 days ago",
      type: "green",
    },
    {
      text: "Asked a question",
      time: "5 days ago",
      type: "blue",
    },
    {
      text: "Answer accepted",
      time: "1 week ago",
      type: "yellow",
    },
    {
      text: "Updated profile",
      time: "1 week ago",
      type: "yellow",
    },
    {
      text: "Bookmarked a question",
      time: "2 weeks ago",
      type: "yellow",
    },
  ];

  return (
    <div className="profile-page">

      {/* ================= NAVBAR ================= */}

      <header className="profile-navbar">

        <div className="profile-logo">
          <span>Smart</span>College
        </div>

        <nav className="profile-nav">
          <a href="/home">Home</a>
          <a href="/questions">Questions</a>
          <a href="/categories">Categories</a>
          <a href="/ask-question">Ask Question</a>
        </nav>

        <div className="profile-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search questions, topics, or users..."
          />
        </div>

        <div className="profile-notification">
          ♧
        </div>

        <div className="profile-nav-user">

          <div className="profile-nav-avatar">
            P
          </div>

          <span>Priya</span>
          <span>⌄</span>

        </div>

      </header>


      {/* ================= MAIN LAYOUT ================= */}

      <div className="profile-layout">

        {/* ================= LEFT SIDEBAR ================= */}

        <aside className="profile-sidebar">

          <div className="profile-menu">

            <a href="/home">
              <span>⌂</span>
              Dashboard
            </a>

            <a href="/questions">
              <span>▤</span>
              My Questions
            </a>

            <a href="/my-answers">
              <span>☷</span>
              My Answers
            </a>

            <a href="/bookmarks">
              <span>♡</span>
              Bookmarks
            </a>

            <a
              href="/profile"
              className="active"
            >
              <span>♙</span>
              Profile
            </a>

            <a href="#">
              <span>⚙</span>
              Settings
            </a>

          </div>


          {/* NEED HELP */}

          <div className="profile-help-card">

            <div className="profile-help-content">

              <h2>Need Help?</h2>

              <p>
                Get support from our college community.
              </p>

              <button>
                Ask Now →
              </button>

            </div>

            <img
              src={girlWithBook}
              alt="Student with books"
              className="profile-help-image"
            />

          </div>

        </aside>


        {/* ================= MAIN CONTENT ================= */}

        <main className="profile-main">

          {/* ================= PROFILE HEADER ================= */}

          <section className="profile-header-card">

            <div className="profile-header-content">

              <div className="profile-avatar-wrapper">

                <img
                  src={studentPhoto}
                  alt="Priya"
                  className="profile-avatar"
                />

                <button className="profile-camera">
                  ◉
                </button>

              </div>


              <div className="profile-basic-info">

                <div className="profile-name-row">

                  <h1>Priya</h1>

                  <button className="edit-profile-button">
                    ✎ &nbsp; Edit Profile
                  </button>

                </div>

                <p className="profile-course">
                  B.Tech CSE <span>|</span> 2nd Year
                </p>

                <div className="profile-info-row">

                  <span>
                    🏫 &nbsp;
                    Ajay Kumar Garg Engineering College, Ghaziabad
                  </span>

                  <span>
                    📍 &nbsp;
                    Ghaziabad, Uttar Pradesh
                  </span>

                </div>

                <p className="profile-bio-short">
                  Passionate about Web Development, AI/ML and solving
                  real-world problems. Love to learn and help others. ✨
                </p>


                <div className="profile-socials">

                  <button>●</button>
                  <button>in</button>
                  <button>↗</button>

                </div>

              </div>


              <div className="profile-decoration">
                🎓
              </div>

            </div>

          </section>


          {/* ================= STATS ================= */}

          <section className="profile-stats">

            <div className="profile-stat-card">

              <div className="stat-icon reputation">
                🏆
              </div>

              <div>
                <strong>1,240</strong>
                <span>Reputation</span>
              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon questions">
                ▤
              </div>

              <div>
                <strong>18</strong>
                <span>Questions Asked</span>
              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon answers">
                ●
              </div>

              <div>
                <strong>37</strong>
                <span>Answers Given</span>
              </div>

            </div>


            <div className="profile-stat-card">

              <div className="stat-icon accepted">
                ✓
              </div>

              <div>
                <strong>12</strong>
                <span>Accepted Answers</span>
              </div>

            </div>

          </section>


          {/* ================= PROFILE TABS ================= */}

          <div className="profile-tabs">

            <button className="active">
              Overview
            </button>

            <button>
              Questions
            </button>

            <button>
              Answers
            </button>

            <button>
              Bookmarks
            </button>

            <button>
              Activity
            </button>

          </div>


          {/* ================= CONTENT GRID ================= */}

          <div className="profile-content-grid">

            {/* LEFT CONTENT */}

            <div className="profile-content-left">


              {/* ABOUT */}

              <section className="profile-card about-card">

                <div className="profile-card-heading">

                  <div>
                    <span className="heading-icon">
                      ♙
                    </span>

                    <h2>About Me</h2>
                  </div>

                  <button>
                    ✎ &nbsp; Edit
                  </button>

                </div>


                <p className="about-text">
                  I am a second year B.Tech student at AKGEC,
                  Ghaziabad. I enjoy building web applications,
                  exploring AI/ML and learning new technologies.
                  I like to solve problems, help fellow students
                  and contribute to the community.
                </p>


                <div className="profile-skills">

                  <span>Web Development</span>
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Python</span>
                  <span>AI/ML</span>
                  <span>Problem Solving</span>
                  <span>UI/UX</span>

                </div>

              </section>


              {/* RECENT QUESTIONS */}

              <section className="profile-card recent-questions-card">

                <div className="profile-card-heading">

                  <div>
                    <span className="heading-icon">
                      ▤
                    </span>

                    <h2>Recent Questions</h2>
                  </div>

                  <a href="/questions">
                    View All →
                  </a>

                </div>


                <div className="recent-question-list">

                  {recentQuestions.map((question, index) => (

                    <div
                      className="recent-question"
                      key={index}
                    >

                      <div className="question-small-icon">
                        ▢
                      </div>


                      <div className="recent-question-main">

                        <h3>
                          {question.title}
                        </h3>


                        <div className="question-tags">

                          {question.tags.map((tag) => (
                            <span key={tag}>
                              {tag}
                            </span>
                          ))}

                        </div>

                      </div>


                      <div className="question-meta">

                        <strong>
                          {question.answers}
                        </strong>

                        <small>
                          {question.time}
                        </small>

                      </div>

                    </div>

                  ))}

                </div>

              </section>

            </div>


            {/* RIGHT CONTENT */}

            <aside className="profile-content-right">


              {/* REPUTATION */}

              <section className="profile-card reputation-card">

                <div className="side-card-title">

                  <span>▥</span>

                  <h2>
                    Reputation Progress
                  </h2>

                </div>


                <div className="reputation-number">

                  <strong>
                    1,240
                  </strong>

                  <span>
                    / 2,000
                  </span>

                </div>


                <div className="reputation-progress">

                  <div></div>

                </div>


                <p>
                  Next milestone: 2,000 reputation
                </p>

              </section>


              {/* TOP TAGS */}

              <section className="profile-card top-tags-card">

                <div className="side-card-title">

                  <span>◆</span>

                  <h2>
                    Top Tags
                  </h2>

                </div>


                <div className="top-tags-list">

                  {topTags.map((tag) => (

                    <div
                      className="top-tag-row"
                      key={tag.name}
                    >

                      <span>
                        {tag.name.toLowerCase()}
                      </span>

                      <strong>
                        {tag.count}
                      </strong>

                    </div>

                  ))}

                </div>

              </section>


              {/* RECENT ACTIVITY */}

              <section className="profile-card activity-card">

                <div className="side-card-title">

                  <span>ϟ</span>

                  <h2>
                    Recent Activity
                  </h2>

                </div>


                <div className="activity-list">

                  {activities.map((activity, index) => (

                    <div
                      className="activity-item"
                      key={index}
                    >

                      <span
                        className={`activity-dot ${activity.type}`}
                      ></span>

                      <span className="activity-text">
                        {activity.text}
                      </span>

                      <small>
                        {activity.time}
                      </small>

                    </div>

                  ))}

                </div>

              </section>

            </aside>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Profile;
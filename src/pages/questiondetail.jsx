function QuestionDetail() {
  return (
    <div className="detail-page">

      <aside className="detail-sidebar">

        <div className="detail-logo">
          🎓 DoubtHub
        </div>

        <nav>
          <div>⌂ Home</div>
          <div>＋ Ask Question</div>
          <div>▣ My Questions</div>
          <div>🔖 Bookmarks</div>
          <div className="active">◉ Profile</div>
        </nav>

        <div className="detail-logout">
          ↪ Logout
        </div>

      </aside>

      <main className="detail-main">

        <div className="back-link">
          ← Back
        </div>

        <div className="detail-title-row">

          <div>
            <h1>How does a capacitor work in a DC circuit?</h1>

            <div className="detail-tags">
              <span>Electronics</span>
              <span>Capacitor</span>
            </div>
          </div>

          <div className="bookmark">
            ♡
          </div>

        </div>

        <p className="detail-question">
          I'm a bit confused about how a capacitor behaves in a DC
          circuit. Can someone explain it in simple terms?
        </p>

        <div className="detail-stats">
          <span>👍 12</span>
          <span>💬 2</span>
          <span>↗ Share</span>
        </div>

        <div className="top-answers">

          <h2>Top Answers</h2>

          <div className="answer-box">

            <div className="answer-user">
              <div className="user-circle">A</div>

              <div>
                <strong>Aarav Sharma</strong>
                <small>2h ago</small>
              </div>
            </div>

            <p>
              In a DC circuit, a capacitor charges up to the supply
              voltage and then acts as an open circuit because no
              current flows once it is fully charged.
            </p>

            <div className="answer-actions">
              <span>👍 18</span>
              <span>↩ Reply</span>
            </div>

          </div>

          <div className="answer-box">

            <div className="answer-user">
              <div className="user-circle">S</div>

              <div>
                <strong>Sneha Verma</strong>
                <small>1h ago</small>
              </div>
            </div>

            <p>
              Think of it like a rechargeable battery. Initially it
              allows current to flow, but after a while it becomes
              charged and stops the current.
            </p>

            <div className="answer-actions">
              <span>👍 8</span>
              <span>↩ Reply</span>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default QuestionDetail
function SimilarQuestions() {
  return (
    <div className="similar-page">

      <aside className="similar-sidebar">

        <div className="similar-logo">
          🎓 DoubtHub
        </div>

        <nav>
          <div>⌂ Home</div>
          <div>＋ Ask Question</div>
          <div>▣ My Questions</div>
          <div>🔖 Bookmarks</div>
          <div className="active">◉ Profile</div>
        </nav>

        <div className="similar-logout">
          ↪ Logout
        </div>

      </aside>

      <main className="similar-main">

        <h1>Similar Questions</h1>

        <p className="similar-subtitle">
          You might also be interested in these
        </p>

        <div className="similar-list">

          <div className="similar-card">
            <div className="similar-icon">▣</div>

            <div className="similar-content">
              <h2>What is the formula for capacitance?</h2>

              <div>
                <span>◉ Electronics</span>
                <span>2 answers</span>
              </div>
            </div>

            <span className="similar-arrow">›</span>
          </div>

          <div className="similar-card">
            <div className="similar-icon">▣</div>

            <div className="similar-content">
              <h2>How does a capacitor affect AC circuits?</h2>

              <div>
                <span>◉ Electronics</span>
                <span>4 answers</span>
              </div>
            </div>

            <span className="similar-arrow">›</span>
          </div>

          <div className="similar-card">
            <div className="similar-icon">▣</div>

            <div className="similar-content">
              <h2>What are the types of capacitors?</h2>

              <div>
                <span>◉ Electronics</span>
                <span>6 answers</span>
              </div>
            </div>

            <span className="similar-arrow">›</span>
          </div>

          <div className="similar-card">
            <div className="similar-icon">▣</div>

            <div className="similar-content">
              <h2>What is the difference between capacitor and inductor?</h2>

              <div>
                <span>◉ Physics</span>
                <span>10 answers</span>
              </div>
            </div>

            <span className="similar-arrow">›</span>
          </div>

          <div className="similar-card">
            <div className="similar-icon">▣</div>

            <div className="similar-content">
              <h2>How to calculate charge in a capacitor?</h2>

              <div>
                <span>◉ Electronics</span>
                <span>3 answers</span>
              </div>
            </div>

            <span className="similar-arrow">›</span>
          </div>

        </div>

      </main>

    </div>
  )
}

export default SimilarQuestions
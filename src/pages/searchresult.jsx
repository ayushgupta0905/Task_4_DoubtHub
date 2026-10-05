function SearchResults() {
  return (
    <div className="search-page">

      <aside className="search-sidebar">

        <div className="search-logo">
          🎓 DoubtHub
        </div>

        <nav>
          <div>⌂ Home</div>
          <div>＋ Ask Question</div>
          <div>▣ My Questions</div>
          <div>🔖 Bookmarks</div>
          <div className="active">⌕ Search</div>
          <div>◉ Profile</div>
        </nav>

        <div className="search-logout">
          ↪ Logout
        </div>

      </aside>

      <main className="search-main">

        <div className="search-top">

          <div className="search-input-box">
            <span>⌕</span>

            <input
              type="text"
              value="capacitor"
              readOnly
            />

            <span>×</span>
          </div>

        </div>

        <h1>
          Search Results for "capacitor"
        </h1>

        <p className="search-count">
          12 results
        </p>

        <div className="search-results">

          <div className="result-card">

            <div className="result-icon">▣</div>

            <div className="result-content">
              <h2>How does a capacitor work in a DC circuit?</h2>

              <div className="result-info">
                <span>◉ Electronics</span>
                <span>2 answers</span>
                <span>12m ago</span>
              </div>
            </div>

            <div className="result-arrow">›</div>

          </div>

          <div className="result-card">

            <div className="result-icon">▣</div>

            <div className="result-content">
              <h2>
                What is the difference between electrolytic and
                ceramic capacitor?
              </h2>

              <div className="result-info">
                <span>◉ Electronics</span>
                <span>4 answers</span>
                <span>1h ago</span>
              </div>
            </div>

            <div className="result-arrow">›</div>

          </div>

          <div className="result-card">

            <div className="result-icon">▣</div>

            <div className="result-content">
              <h2>Why is a capacitor used in filtering circuits?</h2>

              <div className="result-info">
                <span>◉ Electronics</span>
                <span>3 answers</span>
                <span>1h ago</span>
              </div>
            </div>

            <div className="result-arrow">›</div>

          </div>

          <div className="result-card">

            <div className="result-icon">▣</div>

            <div className="result-content">
              <h2>Can a capacitor store infinite charge?</h2>

              <div className="result-info">
                <span>◉ Physics</span>
                <span>5 answers</span>
                <span>2h ago</span>
              </div>
            </div>

            <div className="result-arrow">›</div>

          </div>

          <div className="result-card">

            <div className="result-icon">▣</div>

            <div className="result-content">
              <h2>Capacitor in series and parallel combination</h2>

              <div className="result-info">
                <span>◉ Electronics</span>
                <span>3 answers</span>
                <span>2h ago</span>
              </div>
            </div>

            <div className="result-arrow">›</div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default SearchResults
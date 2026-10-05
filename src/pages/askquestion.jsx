function AskQuestion() {
  return (
    <div className="ask-page">

      <header className="ask-header">
        <div className="ask-logo">🎓 DoubtHub</div>

        <div className="ask-links">
          <span>Home</span>
          <span>Profile</span>
        </div>
      </header>

      <main className="ask-content">

        <h1>Ask a Question</h1>

        <p className="ask-subtitle">
          Share your doubt and get help from the community.
        </p>

        <div className="ask-box">

          <label>Question Title</label>
          <input
            type="text"
            placeholder="e.g. How does a transistor work?"
          />

          <label>Question Description</label>
          <textarea
            placeholder="Explain your question in detail..."
          ></textarea>

          <label>Category</label>
          <select>
            <option value="">Select a category</option>
            <option value="programming">Programming</option>
            <option value="electronics">Electronics</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="other">Other</option>
          </select>

          <label>Tags</label>
          <input
            type="text"
            placeholder="e.g. Electronics, Transistor"
          />

          <div className="similar-box">
            <h3>🔍 Similar Questions</h3>
            <p>
              Similar questions will appear here while you type.
            </p>
          </div>

          <button className="post-question-btn">
            Post Question
          </button>

        </div>

      </main>

    </div>
  )
}

export default AskQuestion
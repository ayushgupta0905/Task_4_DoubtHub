function Profile() {
  return (
    <div className="profile-page">

      <aside className="profile-sidebar">

        <div className="profile-logo">
          🎓 DoubtHub
        </div>

        <nav>
          <div>⌂ Home</div>
          <div>＋ Ask Question</div>
          <div>▣ My Questions</div>
          <div>🔖 Bookmarks</div>
          <div className="active">◉ Profile</div>
        </nav>

        <div className="profile-logout">
          ↪ Logout
        </div>

      </aside>

      <main className="profile-main">

        <h1>My Profile</h1>

        <div className="profile-card">

          <div className="profile-avatar">
            P
          </div>

          <div className="profile-info">
            <h2>Priyanka Pal</h2>
            <p>student@college.edu</p>
            <span>B.Tech ECE Student</span>
          </div>

          <button className="edit-profile">
            Edit Profile
          </button>

        </div>

        <div className="profile-stats">

          <div>
            <strong>24</strong>
            <span>Questions</span>
          </div>

          <div>
            <strong>38</strong>
            <span>Answers</span>
          </div>

          <div>
            <strong>126</strong>
            <span>Reputation</span>
          </div>

        </div>

        <div className="profile-section">

          <h2>Recent Activity</h2>

          <div className="activity-card">
            <strong>How does a capacitor work in a DC circuit?</strong>
            <span>Asked 2 hours ago</span>
          </div>

          <div className="activity-card">
            <strong>Difference between let and const?</strong>
            <span>Answered yesterday</span>
          </div>

          <div className="activity-card">
            <strong>How does a transistor work as a switch?</strong>
            <span>Asked 2 days ago</span>
          </div>

        </div>

      </main>

    </div>
  )
}

export default Profile
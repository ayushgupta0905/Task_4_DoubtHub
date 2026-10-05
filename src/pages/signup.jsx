function Signup() {
  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand">
          <div className="cap">🎓</div>
          <h1>DoubtHub</h1>
          <p>Ask. Learn. Grow.</p>
        </div>

        <div className="left-text">
          <p>Join our community of learners.</p>
          <span>
            Ask questions, share answers,<br />
            and learn together.
          </span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">

          <h2>Create Your Account</h2>

          <p className="login-subtitle">
            Start your learning journey with DoubtHub
          </p>

          <form>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />

            <label>College Email</label>
            <input
              type="email"
              placeholder="Enter your college email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />

            <button type="submit">
              Sign Up
            </button>

          </form>

          <div className="or">
            <span>or</span>
          </div>

          <button className="google-btn">
            <b>G</b> Continue with Google
          </button>

          <p className="signup-text">
            Already have an account?
            <a href="#"> Login</a>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Signup
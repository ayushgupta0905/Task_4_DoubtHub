function Login() {
  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand">
          <div className="cap">🎓</div>
          <h1>DoubtHub</h1>
          <p>Ask. Learn. Grow.</p>
        </div>

        <div className="left-text">
          <p>Got a doubt? You're in the right place.</p>
          <span>DoubtHub helps you get answers,<br />from a community that cares.</span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">

          <h2>Welcome Back</h2>
          <p className="login-subtitle">
            Login to continue to your account
          </p>

          <form>

            <label>College Email</label>
            <input
              type="email"
              placeholder="Enter your college email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

          </form>

          <div className="or">
            <span>or</span>
          </div>

          <button className="google-btn">
            <b>G</b> Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account?
            <a href="#"> Sign up</a>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login
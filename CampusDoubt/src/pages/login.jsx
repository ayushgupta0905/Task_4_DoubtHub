import studentPhoto from "../assets/studentphoto.png";
import yellowBackground from "../assets/yellowbackground.png";

function Login() {
  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Left Side */}
      <div className="login-left">
        <div className="login-brand">
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="login-content">
          <p className="login-small-title">
            A COLLEGE COMMUNITY
          </p>

          <h1>
            Ask. Learn.
            <br />
            Solve. Grow
            <br />
            <span>Together.</span>
          </h1>

          <p className="login-description">
            Join thousands of students, ask questions,
            get answers, and build your knowledge with
            the power of community and AI/ML.
          </p>

          <div className="login-points">
            <div>✓ Ask and solve technical doubts</div>
            <div>✓ Connect with college students</div>
            <div>✓ Improve your technical skills</div>
          </div>

          {/* Student Photo */}
          <div className="student-image">
            <img
              src={studentPhoto}
              alt="Student"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-box">

          <h2>
            Login to <span>CampusDoubt</span>
          </h2>

          <p className="login-subtitle">
            Welcome back! Continue your learning journey.
          </p>

          <form>

            {/* Email */}
            <div className="input-group">
              <label>College Email</label>

              <div className="input-wrapper">
                <span>✉</span>

                <input
                  type="email"
                  placeholder="Enter your college email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                />

                <span className="password-icon">
                  ◉
                </span>
              </div>
            </div>

            {/* Domain */}
            <div className="input-group">
              <label>Select Your Domain</label>

              <div className="input-wrapper">
                <span>▱</span>

                <select defaultValue="">
                  <option value="" disabled>
                    Choose your domain
                  </option>

                  <option value="ai-ml">
                    AI / ML
                  </option>

                  <option value="dsa">
                    DSA
                  </option>

                  <option value="python">
                    Python
                  </option>

                  <option value="frontend">
                    Frontend
                  </option>

                  <option value="backend">
                    Backend
                  </option>

                  <option value="cyber-security">
                    Cyber Security
                  </option>

                  <option value="machine-learning">
                    Machine Learning
                  </option>
                </select>

                <span>⌄</span>
              </div>
            </div>

            {/* Options */}
            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-main-btn"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Signup */}
          <p className="signup-text">
            Don't have an account?
            <a href="#"> Sign Up</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";
import { loginUser } from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password || !domain) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password, domain);

      console.log("Login successful:", data);

      // Save access token
      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }

      // Save refresh token
      if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
      }

      // If backend returns a normal token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user information
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Save selected domain
      localStorage.setItem("domain", domain);

      // Login successful
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Left Side */}
      <div className="login-left">
        <div className="login-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
          <div className="login-student-image">
            <img
              src={studentPhoto}
              alt="Students learning together"
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

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>College Email</label>

              <div className="input-wrapper">
                <span>✉</span>

                <input
                  type="email"
                  placeholder="Enter your college email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
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

            {/* Error */}
            {error && (
              <p
                style={{
                  color: "#e53935",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {error}
              </p>
            )}

            {/* Options */}
            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate("/forgotpassword"); }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-main-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate("/signup"); }}
            > Sign Up</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
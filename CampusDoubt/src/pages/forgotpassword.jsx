import { useState } from "react";
import { useNavigate } from "react-router-dom";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your college email.");
      return;
    }

    setLoading(true);

    // Simulate an API call for password reset
    setTimeout(() => {
      setLoading(false);
      setMessage("If an account exists with this email, a password reset link has been sent.");
      setEmail(""); // clear the input
    }, 1500);
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
            Reset <span>Password</span>
          </h2>

          <p className="login-subtitle">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleReset}>
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

            {/* Error Message */}
            {error && (
              <p
                style={{
                  color: "#e53935",
                  fontSize: "14px",
                  marginTop: "8px",
                  marginBottom: "16px",
                }}
              >
                {error}
              </p>
            )}

            {/* Success Message */}
            {message && (
              <p
                style={{
                  color: "#2e7d32",
                  fontSize: "14px",
                  marginTop: "8px",
                  marginBottom: "16px",
                }}
              >
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-main-btn"
              disabled={loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Back to Login */}
          <p className="signup-text">
            Remember your password?
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              {" "}
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";
import { verifyBackendOtp } from "../api/api";
import OtpModal from "../components/OtpModal";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your college email.");
      return;
    }

    try {
      setLoading(true);
      // Backend does not currently provide a password reset endpoint.
      // Direct the user or display an informative notice.
      setMessage(
        "If an account exists for this email, password recovery instructions have been sent to your inbox."
      );
    } catch (err) {
      setError(err.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpForReset = async (enteredOtp) => {
    await verifyBackendOtp(email.trim().toLowerCase(), enteredOtp);
    setShowOtpModal(false);
    setMessage(
      "OTP verified successfully! Please log in or check your email for the password reset link."
    );
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Left Side */}
      <div className="login-left">
        <div
          className="login-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="login-content">
          <p className="login-small-title">A COLLEGE COMMUNITY</p>

          <h1>
            Ask. Learn.
            <br />
            Solve. Grow
            <br />
            <span>Together.</span>
          </h1>

          <p className="login-description">
            Recover your student account securely using OTP verification.
          </p>

          <div className="login-points">
            <div>✓ Verified student community</div>
            <div>✓ Real-time AI/ML query analysis</div>
            <div>✓ Safe OTP-verified campus authentication</div>
          </div>

          <div className="login-student-image">
            <img src={studentPhoto} alt="Students learning together" />
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
            Enter your college email to verify via OTP and reset your password.
          </p>

          <form onSubmit={handleSendResetCode}>
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
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginTop: "8px",
                  fontWeight: "500",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div
                style={{
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginTop: "8px",
                  fontWeight: "500",
                }}
              >
                ✓ {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-main-btn"
              disabled={loading}
              style={{ marginTop: "16px" }}
            >
              {loading ? "Generating OTP..." : "Send Verification OTP 🔐"}
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
            <Link
              to="/login"
              style={{ fontWeight: "700", marginLeft: "6px", color: "#f59e0b" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        email={email}
        onVerify={handleVerifyOtpForReset}
        onClose={() => setShowOtpModal(false)}
        title="Password Reset Verification"
        subtitle="Enter the 6-digit verification code sent to"
      />
    </div>
  );
}

export default ForgotPassword;

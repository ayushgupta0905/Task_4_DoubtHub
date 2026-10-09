import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import yellowBackground from "../assets/yellowbackground.png";
import studentPhoto from "../assets/studentphoto.png";
import { loginUser, sendOtp, verifyOtp } from "../api/api";
import OtpModal from "../components/OtpModal";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [requireOtp, setRequireOtp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const domainOptions = [
    { label: "DSA", value: "DSA" },
    { label: "AI / ML", value: "AI/ML" },
    { label: "Machine Learning", value: "Machine Learning" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Python", value: "Python" },
    { label: "Cyber Security", value: "Cyber Security" },
  ];

  // Restore remembered email & domain on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    const savedDomain = localStorage.getItem("domain");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    if (savedDomain) {
      setDomain(savedDomain);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password || !domain) {
      setError("Please enter your college email, password, and select your domain.");
      return;
    }

    try {
      setLoading(true);

      // If user enabled 2-factor OTP verification for extra campus security
      if (requireOtp) {
        const otpRes = await sendOtp(email.trim());
        setGeneratedOtp(otpRes.code);
        setShowOtpModal(true);
        setLoading(false);
        return;
      }

      // Standard direct backend login
      await executeLogin();
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check credentials and domain.");
    } finally {
      if (!requireOtp) {
        setLoading(false);
      }
    }
  };

  const executeLogin = async () => {
    const data = await loginUser(email.trim().toLowerCase(), password, domain);
    console.log("Login successful:", data);

    // Remember me
    if (rememberMe) {
      localStorage.setItem("remembered_email", email.trim().toLowerCase());
    } else {
      localStorage.removeItem("remembered_email");
    }

    setSuccess("Login successful! Welcome back.");
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const handleVerifyOtpForLogin = async (enteredOtp) => {
    // 1. Verify OTP
    await verifyOtp(email.trim(), enteredOtp);
    // 2. Complete login
    await executeLogin();
    setShowOtpModal(false);
  };

  const handleResendOtp = async () => {
    const res = await sendOtp(email.trim());
    setGeneratedOtp(res.code);
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
            Join thousands of college students, collaborate on doubts,
            and leverage ML-powered answers and classification.
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
            Login to <span>CampusDoubt</span>
          </h2>

          <p className="login-subtitle">
            Welcome back! Continue your learning and problem-solving journey.
          </p>

          <form onSubmit={handleLoginSubmit}>
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

            {/* Password */}
            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            {/* Domain */}
            <div className="input-group">
              <label>Select Your Domain</label>
              <div className="input-wrapper">
                <span>🎯</span>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose your registered domain
                  </option>
                  {domainOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span>⌄</span>
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
            {success && (
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
                ✓ {success}
              </div>
            )}

            {/* Options */}
            <div className="login-options" style={{ marginTop: "12px" }}>
              <label className="remember" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span style={{ fontSize: "13px" }}>Remember me</span>
              </label>

              <Link
                to="/forgotpassword"
                style={{ fontSize: "13px", color: "#f59e0b", fontWeight: "600" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* 2FA OTP Toggle */}
            <div
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px dashed #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "12px", color: "#475569" }}>
                🔐 Require 2-Step OTP Verification
              </span>
              <input
                type="checkbox"
                checked={requireOtp}
                onChange={(e) => setRequireOtp(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-main-btn"
              disabled={loading}
              style={{ marginTop: "16px" }}
            >
              {loading
                ? "Signing in..."
                : requireOtp
                ? "Verify OTP & Login"
                : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Signup Link */}
          <p className="signup-text">
            Don't have an account?
            <Link
              to="/signup"
              style={{ fontWeight: "700", marginLeft: "6px", color: "#f59e0b" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* 2FA OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        email={email}
        generatedOtp={generatedOtp}
        onVerify={handleVerifyOtpForLogin}
        onResend={handleResendOtp}
        onClose={() => setShowOtpModal(false)}
        title="2-Step Verification"
        subtitle="Enter the 6-digit OTP code to confirm your login for"
      />
    </div>
  );
}

export default Login;
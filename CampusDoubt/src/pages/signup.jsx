import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import studentPhoto from "../assets/studentphoto.png";
import yellowBackground from "../assets/yellowbackground.png";
import { signupUser, verifyBackendOtp } from "../api/api";
import OtpModal from "../components/OtpModal";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    password: "",
    confirmPassword: "",
    year: "1st Year",
    graduationYear: "2027",
    domain: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // OTP State
  const [showOtpModal, setShowOtpModal] = useState(false);

  const domainOptions = [
    { label: "DSA", value: "DSA" },
    { label: "AI / ML", value: "AI/ML" },
    { label: "Machine Learning", value: "Machine Learning" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Python", value: "Python" },
    { label: "Cyber Security", value: "Cyber Security" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInitiateSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check all fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.college.trim() ||
      !formData.branch.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.year ||
      !formData.graduationYear ||
      !formData.domain
    ) {
      setError("Please fill all required fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid college email address.");
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Check terms
    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);
      // 1. Call Backend POST /api/auth/signup which creates user and sends real OTP email via nodemailer
      const res = await signupUser({
        ...formData,
        email: formData.email.trim().toLowerCase(),
      });

      console.log("Signup OTP response from backend:", res);
      // Open OTP modal with completely blank inputs
      setShowOtpModal(true);
    } catch (err) {
      setError(err.message || "Failed to initiate signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Called when user manually enters 6 digits in OtpModal
  const handleVerifyOtpAndCreateAccount = async (enteredOtp) => {
    // Call Backend POST /api/auth/verify-otp
    const data = await verifyBackendOtp(formData.email.trim().toLowerCase(), enteredOtp);

    console.log("Backend verification successful:", data);

    setShowOtpModal(false);
    setSuccess("Email verified and account created successfully! Redirecting...");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const handleResendOtp = async () => {
    await signupUser({
      ...formData,
      email: formData.email.trim().toLowerCase(),
    });
  };

  return (
    <div
      className="signup-page"
      style={{ backgroundImage: `url(${yellowBackground})` }}
    >
      {/* Left Side */}
      <div className="signup-left">
        <div
          className="signup-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="signup-left-content">
          <p className="signup-tag">A COLLEGE COMMUNITY</p>

          <h1>
            Ask. Learn.
            <br />
            Solve. Grow
            <br />
            <span>Together.</span>
          </h1>

          <p className="signup-description">
            Join thousands of college students, ask doubts, get verified answers,
            explore similar questions powered by AI/ML algorithms, and earn reputation.
          </p>

          <div className="signup-points">
            <p>✓ Ask and resolve domain-specific doubts</p>
            <p>✓ AI/ML powered automatic domain tagging & similar question clustering</p>
            <p>✓ Real OTP email verification for campus security</p>
            <p>✓ Earn points and climb the student leaderboard</p>
          </div>

          <div className="signup-student-image">
            <img src={studentPhoto} alt="Students learning together" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-right">
        <div className="signup-box" style={{ maxWidth: "520px" }}>
          <h2>
            Create Your <span>Account</span>
          </h2>

          <p className="signup-subtitle">
            Join CampusDoubt and connect with your college peers.
          </p>

          <form onSubmit={handleInitiateSignup}>
            {/* Full Name */}
            <div className="signup-input-group">
              <label>Full Name *</label>
              <div className="signup-input">
                <span>👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* College Email */}
            <div className="signup-input-group">
              <label>College Email *</label>
              <div className="signup-input">
                <span>✉</span>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. rahul@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* College Name & Branch row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="signup-input-group">
                <label>College Name *</label>
                <div className="signup-input">
                  <span>🏫</span>
                  <input
                    type="text"
                    name="college"
                    placeholder="e.g. IIT Delhi"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Branch / Department *</label>
                <div className="signup-input">
                  <span>▦</span>
                  <input
                    type="text"
                    name="branch"
                    placeholder="e.g. CSE / IT"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="signup-input-group">
                <label>Password *</label>
                <div className="signup-input">
                  <span>🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Confirm Password *</label>
                <div className="signup-input">
                  <span>🔒</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Year & Graduation Year row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="signup-input-group">
                <label>Year of Study *</label>
                <div className="signup-input">
                  <span>📚</span>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>

              <div className="signup-input-group">
                <label>Graduation Year *</label>
                <div className="signup-input">
                  <span>📅</span>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Domain */}
            <div className="signup-input-group">
              <label>Technical Domain / Specialization *</label>
              <div className="signup-input">
                <span>🎯</span>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your primary domain
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
                  marginTop: "12px",
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
                  marginTop: "12px",
                  fontWeight: "500",
                }}
              >
                ✓ {success}
              </div>
            )}

            {/* Terms checkbox */}
            <div className="signup-terms" style={{ marginTop: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span style={{ fontSize: "13px", color: "#475569" }}>
                  I agree to the Terms of Service & Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="signup-button"
              disabled={loading}
              style={{ marginTop: "16px" }}
            >
              {loading ? "Preparing Verification..." : "Verify Email & Create Account 🔐"}
            </button>
          </form>

          {/* Already have an account */}
          <p className="signup-login" style={{ marginTop: "18px" }}>
            Already have an account?
            <Link to="/login" style={{ fontWeight: "700", marginLeft: "6px" }}>
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        email={formData.email}
        onVerify={handleVerifyOtpAndCreateAccount}
        onResend={handleResendOtp}
        onClose={() => setShowOtpModal(false)}
        title="Enter Email Verification Code"
        subtitle="A 6-digit OTP code has been sent to"
      />
    </div>
  );
}

export default Signup;
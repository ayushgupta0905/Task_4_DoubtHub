import { useState } from "react";
import studentPhoto from "../assets/studentphoto.png";
import { signupUser } from "../api/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    password: "",
    confirmPassword: "",
    year: "",
    graduationYear: "",
    domain: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check all fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.college ||
      !formData.branch ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.year ||
      !formData.graduationYear ||
      !formData.domain
    ) {
      setError("Please fill all the fields.");
      return;
    }

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check terms
    if (!agreeTerms) {
      setError(
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("Sending signup data:", formData);

      const data = await signupUser(formData);

      console.log("Signup successful:", data);

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* Left Side */}
      <div className="signup-left">

        <div className="signup-brand">
          🎓 <span>Campus</span>Doubt
        </div>

        <div className="signup-left-content">

          <p className="signup-tag">
            A COLLEGE COMMUNITY
          </p>

          <h1>
            Ask. Learn.
            <br />
            Solve. Grow
            <br />
            <span>Together.</span>
          </h1>

          <p className="signup-description">
            Join thousands of students, ask questions,
            get answers, and build your knowledge with
            the power of community and AI/ML.
          </p>

          <div className="signup-points">
            <p>✓ Ask and solve technical doubts</p>
            <p>✓ Connect with college students</p>
            <p>✓ Improve your technical skills</p>
          </div>

          <div className="signup-student-image">
            <img
              src={studentPhoto}
              alt="Students learning together"
            />
          </div>

        </div>
      </div>


      {/* Right Side */}
      <div className="signup-right">

        <div className="signup-box">

          <h2>
            Create Your <span>Account</span>
          </h2>

          <p className="signup-subtitle">
            Join CampusDoubt and become part of the community.
          </p>


          <form onSubmit={handleSignup}>

            {/* Full Name */}
            <div className="signup-input-group">
              <label>Full Name</label>

              <div className="signup-input">
                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* College Email */}
            <div className="signup-input-group">
              <label>College Email</label>

              <div className="signup-input">
                <span>✉</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your college email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* College Name */}
            <div className="signup-input-group">
              <label>College Name</label>

              <div className="signup-input">
                <span>🏫</span>

                <input
                  type="text"
                  name="college"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* Branch */}
            <div className="signup-input-group">
              <label>Branch / Department</label>

              <div className="signup-input">
                <span>▦</span>

                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select your branch
                  </option>

                  <option value="cse">
                    Computer Science & Engineering
                  </option>

                  <option value="csit">
                    Computer Science & Information Technology
                  </option>

                  <option value="it">
                    Information Technology
                  </option>

                  <option value="ece">
                    Electronics & Communication
                  </option>

                  <option value="ee">
                    Electrical Engineering
                  </option>

                  <option value="me">
                    Mechanical Engineering
                  </option>

                  <option value="ce">
                    Civil Engineering
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>
            </div>


            {/* Password */}
            <div className="signup-input-group">
              <label>Password</label>

              <div className="signup-input">
                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* Confirm Password */}
            <div className="signup-input-group">
              <label>Confirm Password</label>

              <div className="signup-input">
                <span>🔒</span>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* Year */}
            <div className="signup-input-group">
              <label>Year of Study</label>

              <div className="signup-input">
                <span>📚</span>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select your year
                  </option>

                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>


            {/* Graduation */}
            <div className="signup-input-group">
              <label>Graduation Year</label>

              <div className="signup-input">
                <span>📅</span>

                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select graduation year
                  </option>

                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                </select>
              </div>
            </div>


            {/* Domain */}
            <div className="signup-input-group">
              <label>Select Your Domain</label>

              <div className="signup-input">
                <span>▱</span>

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
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


            {/* Success */}
            {success && (
              <p
                style={{
                  color: "#2e7d32",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {success}
              </p>
            )}


            {/* Terms */}
            <div className="signup-terms">
              <label>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) =>
                    setAgreeTerms(e.target.checked)
                  }
                />

                <span>
                  I agree to{" "}
                  <a href="#">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#">Privacy Policy</a>
                </span>
              </label>
            </div>


            {/* Button */}
            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* Login */}
          <p className="signup-login">
            Already have an account?
            <a href="/login">Login</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;
import studentPhoto from "../assets/studentphoto.png";

function Signup() {
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


          <form>

            {/* Full Name */}
            <div className="signup-input-group">
              <label>Full Name</label>

              <div className="signup-input">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
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
                  placeholder="Enter your college email"
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
                  placeholder="Enter your college name"
                />
              </div>
            </div>


            {/* Branch */}
            <div className="signup-input-group">
              <label>Branch / Department</label>

              <div className="signup-input">
                <span>▦</span>

                <select defaultValue="">
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
                  placeholder="Create a password"
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
                  placeholder="Confirm your password"
                />
              </div>
            </div>


            {/* Year */}
            <div className="signup-input-group">
              <label>Year of Study</label>

              <div className="signup-input">
                <span>📚</span>

                <select defaultValue="">
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

                <select defaultValue="">
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


            {/* Terms */}
            <div className="signup-terms">
              <label>
                <input type="checkbox" />

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
            >
              Create Account
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
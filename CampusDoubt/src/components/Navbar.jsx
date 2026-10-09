import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getStoredUser, logoutUser, getUserProfile } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(getStoredUser());
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Try to fetch freshest profile if token exists
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile()
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        })
        .catch(() => {
          // Keep existing cached user
        });
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/searchresults?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav className="navbar" style={{ position: "relative", zIndex: 100 }}>
      {/* Brand Logo */}
      <div
        className="logo"
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        onClick={() => navigate("/")}
      >
        <span style={{ fontSize: "24px" }}>🎓</span>
        <span>
          <span style={{ color: "#f59e0b", fontWeight: "800" }}>Campus</span>
          <span style={{ color: "#0f172a", fontWeight: "800" }}>Doubt</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/question"
          className={location.pathname === "/question" ? "active" : ""}
        >
          Questions
        </Link>
        <Link
          to="/categories"
          className={location.pathname === "/categories" ? "active" : ""}
        >
          Categories
        </Link>
        <Link
          to="/similarquestion"
          className={location.pathname === "/similarquestion" ? "active" : ""}
        >
          ML Doubts
        </Link>
        <Link
          to="/askquestion"
          className={location.pathname === "/askquestion" ? "active" : ""}
        >
          Ask Doubt
        </Link>
      </div>

      {/* Search Input */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f5f9",
          borderRadius: "999px",
          padding: "6px 14px",
          gap: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <span style={{ fontSize: "14px", color: "#64748b" }}>🔍</span>
        <input
          type="text"
          placeholder="Search doubts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "13px",
            width: "160px",
            color: "#0f172a",
          }}
        />
      </form>

      {/* Auth / User Section */}
      <div className="nav-buttons" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: "#fffbeb",
                border: "1px solid #fde68a",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {getInitial()}
              </div>

              <div style={{ textAlign: "left", lineHeight: "1.2" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  {user.name?.split(" ")[0] || "User"}
                </span>
                <span style={{ fontSize: "11px", color: "#d97706", fontWeight: "600" }}>
                  🏆 {user.points ?? 0} pts
                </span>
              </div>

              <span style={{ fontSize: "12px", color: "#64748b" }}>▾</span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "44px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
                  border: "1px solid #e2e8f0",
                  width: "200px",
                  padding: "8px 0",
                  zIndex: 200,
                  textAlign: "left",
                }}
              >
                <div style={{ padding: "8px 16px", borderBottom: "1px solid #f1f5f9" }}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
                    {user.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#64748b", wordBreak: "break-all" }}>
                    {user.email}
                  </p>
                  {user.domain && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "10px",
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "600",
                      }}
                    >
                      {user.domain}
                    </span>
                  )}
                </div>

                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "block",
                    padding: "8px 16px",
                    fontSize: "13px",
                    color: "#334155",
                    textDecoration: "none",
                  }}
                >
                  👤 My Profile
                </Link>

                <Link
                  to="/bookmarks"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "block",
                    padding: "8px 16px",
                    fontSize: "13px",
                    color: "#334155",
                    textDecoration: "none",
                  }}
                >
                  🔖 Saved Doubts
                </Link>

                <Link
                  to="/myanswers"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: "block",
                    padding: "8px 16px",
                    fontSize: "13px",
                    color: "#334155",
                    textDecoration: "none",
                  }}
                >
                  💬 My Answers
                </Link>

                <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "4px" }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                      background: "none",
                      border: "none",
                      fontSize: "13px",
                      color: "#ef4444",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

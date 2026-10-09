import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getUserProfile,
  getMyQueries,
  getMyAnswers,
  getBookmarks,
  getStoredUser,
  logoutUser,
  getAuthToken,
} from "../api/api";

function Profile() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const [profile, setProfile] = useState(getStoredUser());
  const [myQueries, setMyQueries] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadProfileData = async () => {
      try {
        setLoading(true);
        // 1. Profile
        const pRes = await getUserProfile().catch(() => null);
        if (pRes?.user) {
          setProfile(pRes.user);
        }

        // 2. My Queries
        const qRes = await getMyQueries().catch(() => null);
        setMyQueries(qRes?.queries || []);

        // 3. My Answers
        const aRes = await getMyAnswers().catch(() => null);
        setMyAnswers(aRes?.answers || []);

        // 4. Bookmarks
        const bRes = await getBookmarks().catch(() => null);
        setBookmarks(bRes?.bookmarks || []);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [token]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!token) {
    return (
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: "500px", margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a" }}>
            Login Required
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
            Please login or sign up to view your student profile and activity.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                backgroundColor: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getInitial = () => {
    return profile?.name ? profile.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        {/* Profile Card Header */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                fontSize: "30px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(245, 158, 11, 0.3)",
              }}
            >
              {getInitial()}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                  {profile?.name || "Student"}
                </h1>
                {profile?.domain && (
                  <span
                    style={{
                      backgroundColor: "#fef3c7",
                      color: "#b45309",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    🏷️ {profile.domain}
                  </span>
                )}
              </div>

              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                {profile?.email}
              </p>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px", fontSize: "13px", color: "#475569" }}>
                <span>🏫 {profile?.college || "College"}</span>
                <span>•</span>
                <span>🎓 {profile?.branch || "Branch"}</span>
                <span>•</span>
                <span>📅 Class of {profile?.graduationYear || "2027"}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                textAlign: "center",
                padding: "12px 20px",
                backgroundColor: "#fffbeb",
                borderRadius: "12px",
                border: "1px solid #fde68a",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#d97706" }}>
                🏆 {profile?.points ?? 0}
              </div>
              <span style={{ fontSize: "12px", color: "#92400e", fontWeight: "600" }}>
                Reputation Points
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                border: "1px solid #fca5a5",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => setActiveTab("questions")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "questions" ? "2.5px solid #f59e0b" : "2.5px solid transparent",
              padding: "12px 18px",
              fontSize: "15px",
              fontWeight: activeTab === "questions" ? "700" : "500",
              color: activeTab === "questions" ? "#f59e0b" : "#64748b",
              cursor: "pointer",
            }}
          >
            My Questions ({myQueries.length})
          </button>

          <button
            onClick={() => setActiveTab("answers")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "answers" ? "2.5px solid #f59e0b" : "2.5px solid transparent",
              padding: "12px 18px",
              fontSize: "15px",
              fontWeight: activeTab === "answers" ? "700" : "500",
              color: activeTab === "answers" ? "#f59e0b" : "#64748b",
              cursor: "pointer",
            }}
          >
            My Answers ({myAnswers.length})
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "bookmarks" ? "2.5px solid #f59e0b" : "2.5px solid transparent",
              padding: "12px 18px",
              fontSize: "15px",
              fontWeight: activeTab === "bookmarks" ? "700" : "500",
              color: activeTab === "bookmarks" ? "#f59e0b" : "#64748b",
              cursor: "pointer",
            }}
          >
            Bookmarks ({bookmarks.length})
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
            Loading your activity...
          </div>
        ) : activeTab === "questions" ? (
          myQueries.length === 0 ? (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "40px",
                borderRadius: "14px",
                textAlign: "center",
                border: "1px dashed #cbd5e1",
              }}
            >
              <p style={{ color: "#64748b", margin: "0 0 16px 0" }}>
                You haven't asked any doubts yet.
              </p>
              <button
                onClick={() => navigate("/askquestion")}
                style={{
                  backgroundColor: "#f59e0b",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Ask Your First Doubt
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {myQueries.map((q) => (
                <div
                  key={q._id}
                  onClick={() => navigate(`/questiondetail?id=${q._id}`)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "18px 24px",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
                      {q.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: q.status === "resolved" ? "#16a34a" : "#d97706",
                      }}
                    >
                      {q.status === "resolved" ? "✓ Resolved" : "Open"}
                    </span>
                  </div>
                  <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 8px 0" }}>
                    {q.description?.slice(0, 120)}...
                  </p>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {new Date(q.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === "answers" ? (
          myAnswers.length === 0 ? (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "40px",
                borderRadius: "14px",
                textAlign: "center",
                border: "1px dashed #cbd5e1",
              }}
            >
              <p style={{ color: "#64748b", margin: 0 }}>
                You haven't posted any answers yet. Browse questions to help peers and earn points!
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {myAnswers.map((ans) => (
                <div
                  key={ans._id}
                  onClick={() => {
                    const qId = ans.queryId?._id || ans.queryId;
                    if (qId) navigate(`/questiondetail?id=${qId}`);
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "18px 24px",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <strong style={{ fontSize: "14px", color: "#0284c7" }}>
                      Question: {ans.queryId?.title || "Doubt"}
                    </strong>
                    {ans.isAccepted && (
                      <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>
                        ✓ Accepted
                      </span>
                    )}
                  </div>
                  <p style={{ color: "#334155", fontSize: "13px", margin: 0 }}>
                    "{ans.content}"
                  </p>
                </div>
              ))}
            </div>
          )
        ) : (
          bookmarks.length === 0 ? (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "40px",
                borderRadius: "14px",
                textAlign: "center",
                border: "1px dashed #cbd5e1",
              }}
            >
              <p style={{ color: "#64748b", margin: 0 }}>
                No bookmarks saved yet.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {bookmarks.map((b) => (
                <div
                  key={b._id}
                  onClick={() => {
                    const qId = b.queryId?._id || b.queryId;
                    if (qId) navigate(`/questiondetail?id=${qId}`);
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "18px 24px",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
                    {b.queryId?.title || "Bookmarked Question"}
                  </h3>
                  <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
                    {b.queryId?.description?.slice(0, 120)}...
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;
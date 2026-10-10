import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getBookmarks, removeBookmark, getAuthToken } from "../api/api";

function Bookmarks() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadBookmarks = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getBookmarks();
      setBookmarks(res?.bookmarks || []);
    } catch (err) {
      setError(err.message || "Failed to load bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, [token]);

  const handleRemove = async (e, queryId) => {
    e.stopPropagation();
    try {
      await removeBookmark(queryId);
      setBookmarks((prev) => prev.filter((b) => (b.queryId?._id || b.queryId) !== queryId));
    } catch (err) {
      alert("Failed to remove bookmark: " + err.message);
    }
  };

  if (!token) {
    return (
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: "500px", margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔖</div>
          <h2>Please Login to View Saved Bookmarks</h2>
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "16px",
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login to Account
          </button>
        </div>
      </div>
    );
  }

  const filtered = bookmarks.filter((b) => {
    const title = b.queryId?.title || "";
    const desc = b.queryId?.description || "";
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              Saved Doubts & Bookmarks
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}>
              Questions you have bookmarked for future reference.
            </p>
          </div>

          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            {bookmarks.length} Saved
          </span>
        </div>

        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search saved doubts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "10px",
              border: "1.5px solid #cbd5e1",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            Loading bookmarks...
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "60px 20px",
              textAlign: "center",
              border: "1px dashed #cbd5e1",
            }}
          >
            <span style={{ fontSize: "40px" }}>📑</span>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "12px 0 6px" }}>
              No bookmarks found
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "16px" }}>
              Save interesting doubts from the questions feed to revisit them later.
            </p>
            <button
              onClick={() => navigate("/question")}
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Explore Questions
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((b) => {
              const q = b.queryId;
              const qId = q?._id || b.queryId;

              return (
                <div
                  key={b._id}
                  onClick={() => navigate(`/questiondetail?id=${qId}`)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
                      {q?.title || "Doubt"}
                    </h3>
                    <p style={{ color: "#475569", fontSize: "14px", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                      {q?.description?.slice(0, 160)}...
                    </p>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", color: "#64748b" }}>
                      {q?.domain && (
                        <span style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "4px", fontWeight: "600" }}>
                          🏷️ {q.domain}
                        </span>
                      )}
                      <span>Saved on {new Date(b.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleRemove(e, qId)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#ef4444",
                      border: "1px solid #fca5a5",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
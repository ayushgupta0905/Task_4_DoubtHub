import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getQueryById,
  getAnswersByQuery,
  postAnswer,
  deleteAnswer,
  acceptAnswer,
  resolveQuery,
  addBookmark,
  removeBookmark,
  getBookmarks,
  getSimilarQueriesByQueryId,
  getStoredUser,
  getAuthToken,
} from "../api/api";

function QuestionDetail() {
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryId = paramId || searchParams.get("id");

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [bookmarked, setBookmarked] = useState(false);
  const [similarQueries, setSimilarQueries] = useState([]);

  const user = getStoredUser();
  const token = getAuthToken();

  const loadQuestionData = async () => {
    if (!queryId) {
      setError("No question ID specified in URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1. Fetch Question
      const qRes = await getQueryById(queryId);
      setQuestion(qRes.query);

      // 2. Fetch Answers
      const aRes = await getAnswersByQuery(queryId);
      setAnswers(aRes.answers || []);

      // 3. Fetch Bookmarks if logged in
      if (token) {
        try {
          const bRes = await getBookmarks();
          const isSaved = bRes?.bookmarks?.some(
            (b) => b.queryId?._id === queryId || b.queryId === queryId
          );
          setBookmarked(!!isSaved);
        } catch {
          // ignore
        }
      }

      // 4. Fetch Similar Queries using ML
      try {
        const sim = await getSimilarQueriesByQueryId(queryId);
        setSimilarQueries(sim || []);
      } catch {
        // ignore
      }
    } catch (err) {
      setError(err.message || "Failed to load question details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestionData();
  }, [queryId]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Please login to post an answer.");
      return;
    }

    if (!newAnswer.trim()) {
      setError("Answer cannot be empty.");
      return;
    }

    try {
      setSubmittingAnswer(true);
      setError("");
      await postAnswer(queryId, newAnswer.trim());
      setNewAnswer("");
      setSuccess("Answer posted successfully!");
      // Reload answers
      const aRes = await getAnswersByQuery(queryId);
      setAnswers(aRes.answers || []);
    } catch (err) {
      setError(err.message || "Failed to post answer.");
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!token) {
      setError("Please login to bookmark questions.");
      return;
    }

    try {
      if (bookmarked) {
        await removeBookmark(queryId);
        setBookmarked(false);
        setSuccess("Removed from bookmarks");
      } else {
        await addBookmark(queryId);
        setBookmarked(true);
        setSuccess("Saved to bookmarks");
      }
    } catch (err) {
      setError(err.message || "Failed to update bookmark.");
    }
  };

  const handleResolveQuestion = async () => {
    if (!token) {
      setError("Please login to resolve questions.");
      return;
    }

    try {
      const res = await resolveQuery(queryId);
      setQuestion(res.query);
      setSuccess(`Question resolved successfully! Earned ${res.pointsEarned || 10} reputation points.`);
    } catch (err) {
      setError(err.message || "Failed to mark question as resolved.");
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    if (!token) {
      setError("Please login to accept an answer.");
      return;
    }

    try {
      await acceptAnswer(answerId);
      setSuccess("Answer marked as accepted!");
      const aRes = await getAnswersByQuery(queryId);
      setAnswers(aRes.answers || []);
    } catch (err) {
      setError(err.message || "Failed to accept answer.");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;

    try {
      await deleteAnswer(answerId);
      setAnswers((prev) => prev.filter((a) => a._id !== answerId));
      setSuccess("Answer deleted.");
    } catch (err) {
      setError(err.message || "Failed to delete answer.");
    }
  };

  const isOwner =
    user && question?.userId && (user.id === question.userId._id || user._id === question.userId._id);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            <p>Loading question and community answers...</p>
          </div>
        ) : error && !question ? (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "24px",
              borderRadius: "14px",
              textAlign: "center",
              margin: "40px auto",
              maxWidth: "600px",
            }}
          >
            <h3>⚠️ {error}</h3>
            <button
              onClick={() => navigate("/question")}
              style={{
                marginTop: "12px",
                backgroundColor: "#b91c1c",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Back to Questions
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "28px", alignItems: "start" }}>
            {/* Left Main Content */}
            <div>
              {/* Question Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
                  marginBottom: "28px",
                }}
              >
                {/* Title & Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
                    {question.title}
                  </h1>

                  <button
                    onClick={handleToggleBookmark}
                    style={{
                      background: bookmarked ? "#fef3c7" : "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: bookmarked ? "#d97706" : "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    {bookmarked ? "★ Saved" : "☆ Save"}
                  </button>
                </div>

                {/* Metadata Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#0f172a" }}>
                    👤 {question.userId?.name || "Student"}
                  </span>
                  <span>•</span>
                  <span>📅 {new Date(question.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  {question.domain && (
                    <span
                      style={{
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontWeight: "600",
                      }}
                    >
                      🏷️ {question.domain}
                    </span>
                  )}
                  {question.status === "resolved" ? (
                    <span
                      style={{
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontWeight: "700",
                      }}
                    >
                      ✓ Resolved
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontWeight: "600",
                      }}
                    >
                      Open
                    </span>
                  )}
                </div>

                {/* Body / Description */}
                <div
                  style={{
                    color: "#334155",
                    fontSize: "15px",
                    lineHeight: "1.8",
                    whiteSpace: "pre-wrap",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {question.description}
                </div>

                {/* Resolve Button (if not already resolved) */}
                {question.status !== "resolved" && !isOwner && token && (
                  <div
                    style={{
                      borderTop: "1px dashed #e2e8f0",
                      paddingTop: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#64748b" }}>
                      Did you help solve this doubt? Mark it resolved to earn +10 reputation points!
                    </span>
                    <button
                      onClick={handleResolveQuestion}
                      style={{
                        backgroundColor: "#16a34a",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontSize: "13px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      ✓ Mark Resolved (+10 pts)
                    </button>
                  </div>
                )}
              </div>

              {/* Alert Feedback */}
              {error && (
                <div
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "13px",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "13px",
                  }}
                >
                  ✓ {success}
                </div>
              )}

              {/* Answers Section */}
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
                  {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
                </h2>

                {answers.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      padding: "36px",
                      textAlign: "center",
                      border: "1px dashed #cbd5e1",
                      color: "#64748b",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "15px" }}>
                      No answers yet. Be the first student to answer this doubt!
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                    {answers.map((ans) => {
                      const isAnsAuthor =
                        user && ans.userId && (user.id === ans.userId._id || user._id === ans.userId._id);

                      return (
                        <div
                          key={ans._id}
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "14px",
                            padding: "24px",
                            border: ans.isAccepted ? "2px solid #22c55e" : "1px solid #e2e8f0",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                            position: "relative",
                          }}
                        >
                          {ans.isAccepted && (
                            <div
                              style={{
                                display: "inline-block",
                                backgroundColor: "#dcfce7",
                                color: "#166534",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: "700",
                                marginBottom: "12px",
                              }}
                            >
                              ✓ Accepted Solution
                            </div>
                          )}

                          <div
                            style={{
                              color: "#334155",
                              fontSize: "15px",
                              lineHeight: "1.7",
                              whiteSpace: "pre-wrap",
                              marginBottom: "16px",
                            }}
                          >
                            {ans.content}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderTop: "1px solid #f1f5f9",
                              paddingTop: "12px",
                              fontSize: "13px",
                              color: "#64748b",
                            }}
                          >
                            <div>
                              <span>Answered by </span>
                              <strong style={{ color: "#0f172a" }}>
                                {ans.userId?.name || "Student"}
                              </strong>
                              <span> • {new Date(ans.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              {/* Accept button for question owner */}
                              {isOwner && !ans.isAccepted && (
                                <button
                                  onClick={() => handleAcceptAnswer(ans._id)}
                                  style={{
                                    backgroundColor: "#22c55e",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "4px 10px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                >
                                  ✓ Accept Answer
                                </button>
                              )}

                              {/* Delete button for answer author */}
                              {isAnsAuthor && (
                                <button
                                  onClick={() => handleDeleteAnswer(ans._id)}
                                  style={{
                                    backgroundColor: "transparent",
                                    color: "#ef4444",
                                    border: "1px solid #fca5a5",
                                    borderRadius: "6px",
                                    padding: "4px 10px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Your Answer Form */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
                  Your Answer
                </h3>

                <form onSubmit={handlePostAnswer}>
                  <textarea
                    rows={6}
                    placeholder="Write your explanation or code solution here to help your classmate..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                      marginBottom: "16px",
                    }}
                    required
                  />

                  <button
                    type="submit"
                    disabled={submittingAnswer}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: submittingAnswer ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    {submittingAnswer ? "Posting Answer..." : "Post Your Answer 💬"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Sidebar - ML Model 2 Recommendations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <span>🤖</span>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    Similar Doubts (ML Model 2)
                  </h3>
                </div>

                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "14px", lineHeight: "1.5" }}>
                  Generated using machine learning query clustering:
                </p>

                {similarQueries.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic" }}>
                    No similar queries clustered yet.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {similarQueries.map((sim, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/searchresults?q=${encodeURIComponent(sim)}`)}
                        style={{
                          padding: "10px 12px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                          color: "#1e40af",
                          cursor: "pointer",
                          transition: "background 0.15s ease",
                        }}
                      >
                        • {sim}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Doubt Hub Stats Box */}
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #fde68a",
                }}
              >
                <h4 style={{ margin: "0 0 8px 0", color: "#92400e", fontSize: "15px", fontWeight: "700" }}>
                  🌟 DoubtHub Peer Learning
                </h4>
                <p style={{ margin: 0, fontSize: "12px", color: "#b45309", lineHeight: "1.6" }}>
                  Helping peers solve doubts earns you community reputation badges and ranks you up on the college leaderboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetail;
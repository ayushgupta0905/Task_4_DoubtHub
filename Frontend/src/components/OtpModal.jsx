import { useState, useEffect, useRef } from "react";

export default function OtpModal({
  isOpen,
  email,
  onVerify,
  onResend,
  onClose,
  title = "Verify Your College Email",
  subtitle = "An OTP has been sent by the server to",
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Ensure digits are completely blank on open
  useEffect(() => {
    if (isOpen) {
      setDigits(["", "", "", "", "", ""]);
      setError("");
      setSuccess("");
      setTimer(60);
      setCanResend(false);
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen, email]);

  // Countdown timer for resending
  useEffect(() => {
    if (!isOpen || timer <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const copy = [...digits];
      copy[index] = "";
      setDigits(copy);
      return;
    }

    const lastChar = cleaned.slice(-1);
    const copy = [...digits];
    copy[index] = lastChar;
    setDigits(copy);
    setError("");

    // Automatically focus next digit box
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const copy = ["", "", "", "", "", ""];
    for (let i = 0; i < pasteData.length; i++) {
      copy[i] = pasteData[i];
    }
    setDigits(copy);
    setError("");

    const targetIndex = Math.min(pasteData.length, 5);
    if (inputRefs.current[targetIndex]) {
      inputRefs.current[targetIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const fullCode = digits.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP code received on your email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onVerify(fullCode);
      setSuccess("OTP verified successfully!");
    } catch (err) {
      setError(err.message || "Invalid OTP. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendClick = async () => {
    if (!canResend || !onResend) return;
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await onResend();
      setTimer(60);
      setCanResend(false);
      setDigits(["", "", "", "", "", ""]);
      setSuccess("A new OTP has been dispatched to your email address!");
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "32px",
          position: "relative",
          border: "1px solid #f1f5f9",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#94a3b8",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Lock / Email Icon */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#fef3c7",
            color: "#d97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            margin: "0 auto 16px",
          }}
        >
          ✉️
        </div>

        <h3
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            lineHeight: "1.5",
            marginBottom: "12px",
          }}
        >
          {subtitle}{" "}
          <strong style={{ color: "#0f172a", wordBreak: "break-all" }}>
            {email}
          </strong>
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#b45309",
            backgroundColor: "#fffbeb",
            padding: "8px 12px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #fde68a",
          }}
        >
          📬 Please check your email inbox (and Spam or Promotions folder) for the 6-digit OTP code sent by DoubtHub.
        </p>

        {/* 6 Digit Inputs - Blank for manual entry */}
        <form onSubmit={handleSubmit}>
          <div
            onPaste={handlePaste}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                placeholder="-"
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                style={{
                  width: "48px",
                  height: "54px",
                  fontSize: "22px",
                  fontWeight: "700",
                  textAlign: "center",
                  borderRadius: "10px",
                  border: digit ? "2px solid #f59e0b" : "1.5px solid #cbd5e1",
                  backgroundColor: digit ? "#fffbeb" : "#ffffff",
                  color: "#0f172a",
                  outline: "none",
                  transition: "all 0.15s ease",
                }}
              />
            ))}
          </div>

          {error && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "13px",
                marginBottom: "14px",
                fontWeight: "500",
              }}
            >
              ⚠️ {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: "#16a34a",
                fontSize: "13px",
                marginBottom: "14px",
                fontWeight: "500",
              }}
            >
              ✓ {success}
            </p>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading || digits.join("").length !== 6}
            style={{
              width: "100%",
              padding: "13px 20px",
              backgroundColor:
                digits.join("").length === 6 && !loading ? "#f59e0b" : "#94a3b8",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              borderRadius: "10px",
              border: "none",
              cursor:
                digits.join("").length === 6 && !loading
                  ? "pointer"
                  : "not-allowed",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
              transition: "background 0.2s ease",
            }}
          >
            {loading ? "Verifying with Backend..." : "Verify & Complete Signup"}
          </button>
        </form>

        {/* Resend OTP */}
        {onResend && (
          <div
            style={{
              marginTop: "18px",
              fontSize: "13px",
              color: "#64748b",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Didn't receive the email?</span>
            {canResend ? (
              <button
                type="button"
                onClick={handleResendClick}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Resend OTP
              </button>
            ) : (
              <span style={{ color: "#d97706", fontWeight: "600" }}>
                Resend in {timer}s
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
